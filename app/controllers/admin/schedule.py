from app.models.schedules import *
from app.models.packages import *
from app.models.admins import Setting, Branch
from datetime import datetime, timedelta
from bson.objectid import ObjectId
from motorengine import DESCENDING, ASCENDING
from app.helper import send_email, send_email_cancel, send_email_template, send_email_move, check_address
from app.helper import Lock
from app.helper import GMT8
from app.settings import DEFAULT_BRANCH_ID
import tornado.escape

def find(self):
    date = self.get_query_argument('date')
    time = self.get_query_argument('time')
    sched_id = self.get_query_argument('sched_id')
    if not date:
        date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    else:
        date = datetime.strptime(date, '%Y-%m-%d')

    if self.get_query_argument('seats'):
        ins_sched = yield InstructorSchedule.objects.get(sched_id)
        scheds = yield BookedSchedule.objects.filter(status='booked', date=date, schedule=ins_sched._id).find_all()

        blocked_bikes = {}
        blocked_bikes_db = yield Setting.objects.get(key='blocked_bikes');
        if blocked_bikes_db:
            blocked_bikes = tornado.escape.json_decode(blocked_bikes_db.value)

        available_seats = []
        for seat in range(1, ins_sched.seats + 1):
            if str(seat) in blocked_bikes:
                continue;

            seat_exists = yield BookedSchedule.objects.get(seat_number=str(seat),
                                                           status='booked', date=date, schedule=ins_sched._id)
            if not seat_exists:
                available_seats.append(seat)

        self.render_json({
            'available': available_seats
        })
    else:
        schedules = yield InstructorSchedule.objects.filter(date=date).order_by('start', direction=ASCENDING).find_all()
        list_scheds = []

        branch = yield Branch.objects.get(ObjectId(DEFAULT_BRANCH_ID))

        for s in schedules:
            branch_name = branch.name if s.branch is None else s.branch.name

            list_scheds.append({
                'id': str(s._id),
                'text': s.start.strftime('%I:%M %p') + ' - ' + s.end.strftime('%I:%M %p') + ' - ' + branch_name
            })

        if schedules:
            ins_sched = schedules[0]

            if ins_sched.branch is None:
                ins_sched.branch = branch

            if time:
                time = datetime.strptime(time, '%I:%M %p')
                ins_sched = yield InstructorSchedule.objects.get(date=date, start=time)
                # if not ins_sched:
                #     ins_sched = yield InstructorSchedule.objects.get(day=date.strftime('%a').lower(), start=time)
            elif sched_id:
                ins_sched = yield InstructorSchedule.objects.get(sched_id)

            gmt8 = GMT8()
            endplus24 = datetime.combine(date, ins_sched.end.time()) + timedelta(days=1)
            endplus24 = endplus24.replace(tzinfo=gmt8)

            scheds = []
            if endplus24 > datetime.now(tz=gmt8):
                scheds = yield BookedSchedule.objects.filter(status__in=['booked','completed'], date=date, schedule=ins_sched._id).find_all()
            waitlist = yield BookedSchedule.objects.filter(status='waitlisted', date=date, schedule=ins_sched._id).find_all()

            first_timers = {}
            for b in scheds:
                book_counts = (yield BookedSchedule.objects.filter(status='completed', user_id=b.user_id, date__lte=date).count())
                if book_counts == 0:
                    first_timers[str(b.user_id._id)] = True;

            self.render_json({
                'bookings': scheds,
                'waitlist': waitlist,
                'schedule': ins_sched,
                'schedules': list_scheds,
                'first_timers': first_timers
            })
        else:
            self.render_json({
                'bookings': [],
                'waitlist': [],
                'schedule': {},
                'schedules': [],
                'first_timers':{}
            })

def create(self):

    lock_key = None
    data = tornado.escape.json_decode(self.request.body)
    special_date = datetime.strptime(data['date'], '%Y-%m-%d')

    if not 'user_id' in data or data['user_id'] == '':
        self.set_status(400)
        self.write('Please select a rider')
        self.finish()
        return

    obj_user_id = ObjectId(data['user_id'])
    ins_sched = yield InstructorSchedule.objects.get(ObjectId(data['sched_id']))
    if not 'status' in data or data['status'] == 'booked':

        total_booked = yield BookedSchedule.objects.filter(status='booked', date=special_date, schedule=ins_sched._id).count()

        if total_booked >= ins_sched.seats:
            self.set_status(400)
            self.write('No available slots')
            self.finish()
            return

        if not 'seat_number' in data or data['seat_number'] == '':
            self.set_status(400)
            self.write('Please select a bike')
            self.finish()
            return
        else:

            lock_key = 'book.create_' + data['sched_id'] + '_' + data['seat_number']
            if Lock.is_locked(lock_key):
                self.set_status(400)
                self.write('Bike is unavailable or already being reserved')
                self.finish()
                return;

            Lock.lock(lock_key)

            seat_reserved = yield BookedSchedule.objects.filter(status='booked', seat_number=data['seat_number'], schedule=ins_sched._id).count()
            if seat_reserved > 0:
                self.set_status(400)
                self.write('Bike unavailable or reserved')
                self.finish()
                Lock.unlock(lock_key)
                return

    deduct_credits = 1
    if ins_sched.type == 'Electric Endurance':
        deduct_credits = 2

    user_packages = yield UserPackage.objects \
        .filter(user_id=obj_user_id, remaining_credits__gt=0, status__ne='Expired') \
        .order_by('expire_date', ASCENDING) \
        .find_all()

    user = yield User.objects.get(obj_user_id)
    if not len(user_packages) or (user and not user.credits):
        self.set_status(400)
        self.write('Insufficient credits')
        self.finish()
        Lock.unlock(lock_key)
        return

    sched_status = 'booked'
    if 'status' in data:
        sched_status = data['status']

    user.credits -= deduct_credits
    yield user.save()

    user_packs = []
    if user_packages[0].remaining_credits >= deduct_credits:
        user_packages[0].remaining_credits -= deduct_credits
        yield user_packages[0].save()
        user_packs.append(str(user_packages[0]._id))
    else:
        user_packages[0].remaining_credits -= 1
        user_packages[1].remaining_credits -= 1
        yield user_packages[0].save()
        yield user_packages[1].save()
        user_packs.append(str(user_packages[0]._id))
        user_packs.append(str(user_packages[1]._id))


    sched = BookedSchedule()
    sched.date = datetime.strptime(data['date'], '%Y-%m-%d')
    sched.schedule = ins_sched._id
    sched.user_package = user_packs
    sched.user_id = ObjectId(data['user_id'])
    sched.status = sched_status
    if 'seat_number' in data:
        sched.seat_number = data['seat_number']
    if 'notes' in data:
        sched.notes = data['notes']
    sched = yield sched.save()

    user = (yield User.objects.get(user._id)).serialize()

    branch = ins_sched.branch

    if ins_sched.branch is None:
        branch = yield Branch.objects.get(ObjectId(DEFAULT_BRANCH_ID))

    if sched_status == 'booked':
        context = { 'date': ins_sched.date.strftime('%A, %B %d, %Y'),
                    'type': ins_sched.type,
                    'fname': user['first_name'],
                    'lname': user['last_name'],
                    'instructor': ins_sched.instructor.admin.first_name,
                    'time': ins_sched.start.strftime('%I:%M %p'),
                    'seat_number': str(sched.seat_number),
                    'branch': check_address(branch)}
        yield self.io.async_task(send_email_template, template='booking', user=user, context=context, subject='Booked', branch=branch.name)
    elif sched_status == 'waitlisted':
        context = { 'date': ins_sched.date.strftime('%A, %B %d, %Y'),
                    'type': ins_sched.type,
                    'fname': user['first_name'],
                    'lname': user['last_name'],
                    'instructor': ins_sched.instructor.admin.first_name,
                    'time': ins_sched.start.strftime('%I:%M %p'),
                    'branch': check_address(branch)}
        yield self.io.async_task(send_email_template, template='waitlist', user=user, context=context, subject='Waitlisted', branch=branch.name)

    self.render_json(sched)

    if lock_key and Lock.is_locked(lock_key):
        Lock.unlock(lock_key)

def update(self, id):

    booked_schedule = yield BookedSchedule.objects.get(id)
    if not booked_schedule:
        self.set_status(404)
        self.write('Not Found')
        self.finish()
        return

    if booked_schedule.status == 'cancelled' or booked_schedule.status == 'completed' or booked_schedule.status == 'missed':
        self.set_status(400)
        self.write("Unable to update: status is already " + booked_schedule.status)
        self.finish()
        return

    data = tornado.escape.json_decode(self.request.body)

    if 'move_to_seat' in data:
        lock_key = None
        sched = yield InstructorSchedule.objects.get(booked_schedule.schedule._id)

        lock_key = 'book.create_' + str(sched._id) + '_' + str(data['move_to_seat'])
        if Lock.is_locked(lock_key):
            self.set_status(400)
            self.write('Bike is unavailable or already being reserved')
            self.finish()
            return;

        Lock.lock(lock_key)

        seat_reserved = yield BookedSchedule.objects.filter(status='booked', seat_number=data['move_to_seat'], schedule=sched._id).count()
        if seat_reserved > 0:
            self.set_status(400)
            self.write('Seat unavailable or reserved')
            self.finish()
            return

        if 'waitlist' in data:
            booked_schedule.status = 'booked'

        booked_schedule.seat_number = data['move_to_seat']
        booked_schedule = yield booked_schedule.save()

        user = (yield User.objects.get(booked_schedule.user_id._id)).serialize()

        branch = sched.branch

        if sched.branch is None:
            branch = yield Branch.objects.get(ObjectId(DEFAULT_BRANCH_ID))

        if 'waitlist' in data:
            context = { 'date': sched.date.strftime('%A, %B %d, %Y'),
                        'type': sched.type,
                        'fname': user['first_name'],
                        'lname': user['last_name'],
                        'instructor': sched.instructor.admin.first_name,
                        'time': sched.start.strftime('%I:%M %p'),
                        'seat_number': str(booked_schedule.seat_number),
                        'branch': check_address(branch)}
            yield self.io.async_task(send_email_template, template='booking', user=user, context=context, subject='Waitlist moved to class', branch=branch.name)
        else:
            context = { 'date': booked_schedule.date.strftime('%A, %B %d, %Y'),
                        'type': sched.type,
                        'fname': user['first_name'],
                        'lname': user['last_name'],
                        'instructor': sched.instructor.admin.first_name,
                        'time': sched.start.strftime('%I:%M %p'),
                        'seat_number': str(booked_schedule.seat_number),
                        'branch': check_address(branch)}
            yield self.io.async_task(send_email_template, template='moved', user=user, context=context, subject='Bike Moved', branch=branch.name)

        if lock_key and Lock.is_locked(lock_key):
            Lock.unlock(lock_key)

    else:
        special_date = datetime.strptime(data['date'], '%Y-%m-%d')
        time = datetime.strptime(data['time'], '%I:%M %p')
        ins_sched = yield InstructorSchedule.objects.get(date=special_date, start=time)
        if not ins_sched:
            ins_sched = yield InstructorSchedule.objects.get(day=special_date.strftime('%a').lower(), start=time)

        total_booked = yield BookedSchedule.objects.filter(status='booked', date=special_date, schedule=ins_sched).count()
        if total_booked >= ins_sched.seats:
            self.set_status(400)
            self.write('Not available slots')
            self.finish()
            return

        booked_schedule.date = special_date
        booked_schedule.schedule = ins_sched._id
        booked_schedule = yield booked_schedule.save()

    self.render_json(booked_schedule)

def destroy(self, id):
    if id != 'None':
        notes = self.get_query_argument('notes')
        missed = self.get_query_argument('missed')
        booked_schedule = yield BookedSchedule.objects.get(id)
        ref_status = booked_schedule.status

        if ref_status == 'cancelled' or (missed and ref_status == 'completed') or ref_status == 'missed':
            self.set_status(400)
            self.write("Unable to update: status is already " + ref_status)
            self.finish()
            return

        booked_schedule.status = 'cancelled'
        if missed:
            booked_schedule.status = 'missed'

        if notes:
            booked_schedule.notes = notes

        if not missed:
            restore_credits = 1
            if booked_schedule.schedule.type == 'Electric Endurance':
                restore_credits = 2

            if booked_schedule.user_package:
                if len(booked_schedule.user_package) == 1:
                    upack = yield UserPackage.objects.get(ObjectId(booked_schedule.user_package[0]))
                    upack.remaining_credits += restore_credits
                    yield upack.save()
                else:
                    upack1 = yield UserPackage.objects.get(ObjectId(booked_schedule.user_package[0]))
                    upack2 = yield UserPackage.objects.get(ObjectId(booked_schedule.user_package[1]))
                    upack1.remaining_credits += 1
                    upack2.remaining_credits += 1
                    yield upack1.save()
                    yield upack2.save()

            user = yield User.objects.get(booked_schedule.user_id._id)
            user.credits += restore_credits
            yield user.save()

        yield booked_schedule.save()

        branch = booked_schedule.schedule.branch

        if booked_schedule.schedule.branch is None:
            branch = yield Branch.objects.get(ObjectId(DEFAULT_BRANCH_ID))

        if not missed:
            if ref_status == 'waitlisted':
                context = { 'date': booked_schedule.date.strftime('%A, %B %d, %Y'),
                            'type': booked_schedule.schedule.type,
                            'fname': user.to_dict()['first_name'],
                            'lname': user.to_dict()['last_name'],
                            'instructor': booked_schedule.schedule.instructor.admin.first_name,
                            'time': booked_schedule.schedule.start.strftime('%I:%M %p'),
                            'seat_number': booked_schedule.seat_number,
                            'branch': check_address(branch) }
                yield self.io.async_task(send_email_template, template='waitlist-removed', user=user.to_dict(), context=context, subject='Removed from Waitlist', branch=branch.name)
            else:
                context = { 'instructor': booked_schedule.schedule.instructor.admin.first_name,
                            'fname': user.to_dict()['first_name'],
                            'lname': user.to_dict()['last_name'],
                            'type': booked_schedule.schedule.type,
                            'date': booked_schedule.date.strftime('%A, %B %d, %Y'),
                            'seat_number': booked_schedule.seat_number,
                            'time': booked_schedule.schedule.start.strftime('%I:%M %p'),
                            'branch': check_address(branch) }
                yield self.io.async_task(send_email_template, template='cancel', user=user.to_dict(), context=context, subject='Cancelled', branch=branch.name)

        self.render_json(booked_schedule)
    else:
        sched_id = self.get_query_argument('sched_id')
        waitlist = self.get_query_argument('waitlist')
        user_id = self.get_query_argument('user_id')
        if sched_id and waitlist:
            query = BookedSchedule.objects.filter(schedule=ObjectId(sched_id), status='waitlisted')
            if user_id:
                query.filter(user_id=ObjectId(user_id))
            scheds = yield query.find_all()
            for i, wait in enumerate(scheds):
                wait.status = 'cancelled'
                restore_credits = 1
                if wait.schedule.type == 'Electric Endurance':
                    restore_credits = 2

                if wait.user_package:
                    if len(wait.user_package) == 1:
                        wait_upack = yield UserPackage.objects.get(ObjectId(wait.user_package[0]))
                        wait_upack.remaining_credits += restore_credits
                        yield wait_upack.save()
                    else:
                        wait_upack1 = yield UserPackage.objects.get(ObjectId(wait.user_package[0]))
                        wait_upack2 = yield UserPackage.objects.get(ObjectId(wait.user_package[1]))
                        wait_upack1.remaining_credits += 1
                        wait_upack2.remaining_credits += 1
                        yield wait_upack1.save()
                        yield wait_upack2.save()

                user = yield User.objects.get(wait.user_id._id)
                user.credits += restore_credits
                yield user.save()
                yield wait.save()

                branch = wait.schedule.branch

                if wait.schedule.branch is None:
                    branch = yield Branch.objects.get(ObjectId(DEFAULT_BRANCH_ID))

                context = { 'date': wait.date.strftime('%A, %B %d, %Y'),
                            'type': wait.schedule.type,
                            'fname': user.to_dict()['first_name'],
                            'lname': user.to_dict()['last_name'],
                            'instructor': wait.schedule.instructor.admin.first_name,
                            'time': wait.schedule.start.strftime('%I:%M %p'),
                            'seat_number': wait.seat_number,
                            'branch': check_address(branch) }
                yield self.io.async_task(send_email_template, template='waitlist-removed', user=user.to_dict(), context=context, subject='Removed from Waitlist', branch=branch.name)
        self.finish()
