from app.models.schedules import *
from app.models.packages import *
from datetime import datetime
from bson.objectid import ObjectId
from motorengine import DESCENDING, ASCENDING
from app.helper import send_email, send_email_cancel, send_email_booking

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
        available_seats = []
        for seat in range(1, 38):
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

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    special_date = datetime.strptime(data['date'], '%Y-%m-%d')

    if not 'user_id' in data or data['user_id'] == '':
        self.set_status(400)
        self.write('Please select a rider')
        self.finish()

    obj_user_id = ObjectId(data['user_id'])
    ins_sched = ObjectId(data['sched_id'])
    if not 'status' in data or data['status'] == 'booked':
        total_booked = yield BookedSchedule.objects.filter(status='booked', date=special_date, schedule=ins_sched).count()
        if total_booked >= 37:
            self.set_status(400)
            self.write('No available slots')
            self.finish()
            return

        if not 'seat_number' in data or data['seat_number'] == '':
            self.set_status(400)
            self.write('Please select a bike')
            self.finish()

        booked_sched = yield BookedSchedule.objects.get(status='booked', date=special_date, schedule=ins_sched, user_id=obj_user_id)
        if booked_sched:
            self.set_status(400)
            self.write('Already booked on the same schedule')
            self.finish()
            return

    user_package = yield UserPackage.objects \
        .filter(user_id=obj_user_id, remaining_credits__gt=0) \
        .order_by('create_at', DESCENDING) \
        .find_all()

    user = yield User.objects.get(obj_user_id)
    if not len(user_package) or (user and not user.credits):
        self.set_status(400)
        self.write('Insufficient credits')
        self.finish()
        return

    sched_status = 'booked'
    if 'status' in data:
        sched_status = data['status']

    user.credits -= 1
    yield user.save()

    user_package[0].remaining_credits -= 1
    yield user_package[0].save()

    sched = BookedSchedule()
    sched.date = datetime.strptime(data['date'], '%Y-%m-%d')
    sched.schedule = ins_sched
    sched.user_package = user_package[0]._id
    sched.user_id = ObjectId(data['user_id'])
    sched.status = sched_status
    if 'seat_number' in data:
        sched.seat_number = data['seat_number']
    if 'notes' in data:
        sched.notes = data['notes']
    sched = yield sched.save()

    user = (yield User.objects.get(user._id)).serialize()
    ins_sched = yield InstructorSchedule.objects.get(ins_sched)
    if sched_status == 'booked':
        content = str(self.render_string('emails/booking', date=data['date'], user=user, instructor=ins_sched.instructor, time=ins_sched.start.strftime('%I:%M %p'), seat_number=str(sched.seat_number)), 'UTF-8')
        yield self.io.async_task(send_email_booking, user=user, content=content)
    elif sched_status == 'waitlisted':
        content = str(self.render_string('emails/waitlist', date=data['date'], user=user, instructor=ins_sched.instructor, time=ins_sched.start.strftime('%I:%M %p')), 'UTF-8')
        yield self.io.async_task(send_email, user=user, content=content, subject='WaitListed Schedule')

    self.render_json(sched)

def update(self, id):

    booked_schedule = yield BookedSchedule.objects.get(id)
    if not booked_schedule:
        self.set_status(404)
        self.write('Not Found')
        self.finish()
        return

    data = tornado.escape.json_decode(self.request.body)

    if 'move_to_seat' in data:
        sched = yield InstructorSchedule.objects.get(booked_schedule.schedule._id)

        booked_schedule.status = 'booked'
        booked_schedule.seat_number = data['move_to_seat']
        booked_schedule = yield booked_schedule.save()

        user = (yield User.objects.get(booked_schedule.user_id._id)).serialize()
        content = str(self.render_string('emails/waitlist_approved', date=booked_schedule.date.strftime('%Y-%m-%d'), user=user, seat_number=booked_schedule.seat_number, instructor=sched.instructor, time=sched.start.strftime('%I:%M %p')), 'UTF-8')
        yield self.io.async_task(send_email, user=user, content=content, subject='Waitlist moved to class')
    else: 
        special_date = datetime.strptime(data['date'], '%Y-%m-%d')
        time = datetime.strptime(data['time'], '%I:%M %p')
        ins_sched = yield InstructorSchedule.objects.get(date=special_date, start=time)
        if not ins_sched:
            ins_sched = yield InstructorSchedule.objects.get(day=special_date.strftime('%a').lower(), start=time)

        total_booked = yield BookedSchedule.objects.filter(status='booked', date=special_date, schedule=ins_sched).count()
        if total_booked >= 37:
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
        booked_schedule = yield BookedSchedule.objects.get(id)
        booked_schedule.status = 'cancelled'
        if booked_schedule.user_package:
            booked_schedule.user_package.remaining_credits += 1
            yield booked_schedule.user_package.save()

        user = yield User.objects.get(booked_schedule.user_id._id)
        user.credits += 1
        yield user.save()

        yield booked_schedule.save()
        yield self.io.async_task(
            send_email_cancel,
            user=user.to_dict(),
            content=str(self.render_string(
                            'emails/cancel', 
                            instructor=booked_schedule.schedule.instructor, 
                            user=user.to_dict(), 
                            date=booked_schedule.date.strftime('%Y-%m-%d'), 
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
                if wait.user_package:
                    wait.user_package.remaining_credits += 1
                    yield wait.user_package.save()
                user = yield User.objects.get(wait.user_id._id)
                user.credits += 1
                yield user.save()
                yield wait.save()
                self.io.async_task(
                    send_email_cancel,
                    user=user.to_dict(),
                    content=str(self.render_string(
                                    'emails/cancel', 
                                    instructor=wait.schedule.instructor, 
                                    user=user.to_dict(), 
                                    date=wait.date.strftime('%Y-%m-%d'), 
                                    seat_number=wait.seat_number, 
                                    time=wait.schedule.start.strftime('%I:%M %p')
                                ), 'UTF-8'))
        self.finish()