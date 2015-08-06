from app.models.schedules import *
from app.models.packages import *
from app.models.admins import Setting
from datetime import datetime
from bson.objectid import ObjectId
from motorengine import DESCENDING, ASCENDING
from app.helper import send_email, send_email_cancel, send_email_booking, send_email_move
from app.helper import Lock
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
        for s in schedules:
            list_scheds.append({
                'id': str(s._id),
                'text': s.start.strftime('%I:%M %p') + ' - ' + s.end.strftime('%I:%M %p')
            })

        if schedules:
            ins_sched = schedules[0]
            if time:
                time = datetime.strptime(time, '%I:%M %p')
                ins_sched = yield InstructorSchedule.objects.get(date=date, start=time)
                # if not ins_sched:
                #     ins_sched = yield InstructorSchedule.objects.get(day=date.strftime('%a').lower(), start=time)
            elif sched_id:
                ins_sched = yield InstructorSchedule.objects.get(sched_id)

            scheds = yield BookedSchedule.objects.filter(status='booked', date=date, schedule=ins_sched._id).find_all()
            waitlist = yield BookedSchedule.objects.filter(status='waitlisted', date=date, schedule=ins_sched._id).find_all()
            self.render_json({
                'bookings': scheds,
                'waitlist': waitlist,
                'schedule': ins_sched,
                'schedules': list_scheds
            })
        else:
            self.render_json({
                'bookings': [],
                'waitlist': [],
                'schedule': {},
                'schedules': []
            })

def create(self):

    lock_key = None
    data = tornado.escape.json_decode(self.request.body)
    special_date = datetime.strptime(data['date'], '%Y-%m-%d')

    if not 'user_id' in data or data['user_id'] == '':
        self.set_status(400)
        self.write('Please select a rider')
        self.finish()

    obj_user_id = ObjectId(data['user_id'])
    ins_sched = yield InstructorSchedule.objects.get(ObjectId(data['sched_id']))
    if not 'status' in data or data['status'] == 'booked':

        lock_key = 'book.create_' + data['sched_id']
        while Lock.is_locked(lock_key):
            yield gen.sleep(0.01)

        Lock.lock(lock_key)

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
        else:
            seat_reserved = yield BookedSchedule.objects.filter(status='booked', seat_number=data['seat_number'], schedule=ins_sched._id).count()
            if seat_reserved > 0:
                self.set_status(400)
                self.write('Seat unavailable or reserved')
                self.finish()
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
    if sched_status == 'booked':
        content = str(self.render_string('emails/booking', 
                                         date=ins_sched.date.strftime('%A, %B %d, %Y'), 
                                         type=ins_sched.type, 
                                         user=user, 
                                         instructor=ins_sched.instructor, 
                                         time=ins_sched.start.strftime('%I:%M %p'), 
                                         seat_number=str(sched.seat_number)), 'UTF-8')
        yield self.io.async_task(send_email_booking, user=user, content=content)
    elif sched_status == 'waitlisted':
        content = str(self.render_string('emails/waitlist', 
                                         date=ins_sched.date.strftime('%A, %B %d, %Y'), 
                                         type=ins_sched.type, user=user, 
                                         instructor=ins_sched.instructor, 
                                         time=ins_sched.start.strftime('%I:%M %p')), 'UTF-8')
        yield self.io.async_task(send_email, user=user, content=content, subject='Waitlisted')

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

    data = tornado.escape.json_decode(self.request.body)

    if 'move_to_seat' in data:
        lock_key = None
        sched = yield InstructorSchedule.objects.get(booked_schedule.schedule._id)

        seat_reserved = yield BookedSchedule.objects.filter(status='booked', seat_number=data['move_to_seat'], schedule=sched._id).count()
        if seat_reserved > 0:
            self.set_status(400)
            self.write('Seat unavailable or reserved')
            self.finish()
            return

        lock_key = 'book.create_' + str(sched._id)
        while Lock.is_locked(lock_key):
            yield gen.sleep(0.01)

        Lock.lock(lock_key)

        if 'waitlist' in data:
            booked_schedule.status = 'booked'

        booked_schedule.seat_number = data['move_to_seat']
        booked_schedule = yield booked_schedule.save()

        user = (yield User.objects.get(booked_schedule.user_id._id)).serialize()
        if 'waitlist' in data:
            content = str(self.render_string('emails/booking', 
                          date=booked_schedule.date.strftime('%A, %B %d, %Y'), 
                          user=user, 
                          type=sched.type,
                          seat_number=str(booked_schedule.seat_number), 
                          instructor=sched.instructor, 
                          time=sched.start.strftime('%I:%M %p')), 'UTF-8')
            yield self.io.async_task(send_email, user=user, content=content, subject='Waitlist moved to class')
        else:
            yield self.io.async_task(send_email_move,
                content=str(self.render_string('emails/moved', 
                            user=user, 
                            type=sched.type,
                            instructor=sched.instructor, 
                            date=booked_schedule.date.strftime('%A, %B %d, %Y'), 
                            seat_number=booked_schedule.seat_number, 
                            time=sched.start.strftime('%I:%M %p')), 'UTF-8'),
                user=user
            )

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

        if not missed:
            if ref_status == 'waitlisted':
                content = str(self.render_string('emails/waitlist_removed', 
                                                  date=booked_schedule.date.strftime('%A, %B %d, %Y'), 
                                                  user=user.to_dict(), 
                                                  type=booked_schedule.schedule.type,
                                                  seat_number=booked_schedule.seat_number, 
                                                  instructor=booked_schedule.schedule.instructor, 
                                                  time=booked_schedule.schedule.start.strftime('%I:%M %p')), 'UTF-8')
                yield self.io.async_task(send_email, user=user.to_dict(), content=content, subject='Removed from Waitlist')
            else:
                yield self.io.async_task(
                    send_email_cancel,
                    user=user.to_dict(),
                    content=str(self.render_string(
                                    'emails/cancel', 
                                    instructor=booked_schedule.schedule.instructor, 
                                    user=user.to_dict(),
                                    type=booked_schedule.schedule.type, 
                                    date=booked_schedule.date.strftime('%A, %B %d, %Y'), 
                                    seat_number=booked_schedule.seat_number, 
                                    time=booked_schedule.schedule.start.strftime('%I:%M %p')
                                ), 'UTF-8'))

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
                content = str(self.render_string('emails/waitlist_removed', 
                                              date=wait.date.strftime('%A, %B %d, %Y'), 
                                              user=user.to_dict(), 
                                              type=wait.schedule.type,
                                              seat_number=wait.seat_number, 
                                              instructor=wait.schedule.instructor, 
                                              time=wait.schedule.start.strftime('%I:%M %p')), 'UTF-8')
                yield self.io.async_task(send_email, user=user.to_dict(), content=content, subject='Removed from Waitlist')
        self.finish()