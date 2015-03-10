from app.models.schedules import *
from app.models.packages import *
from datetime import datetime
from bson.objectid import ObjectId
from motorengine import DESCENDING

import tornado.escape

def find(self):
    date = self.get_query_argument('date')
    time = self.get_query_argument('time')
    if not date:
        date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    else:
        date = datetime.strptime(date, '%Y-%m-%d')
    time = datetime.strptime(time, '%I:%M %p')
    ins_sched = yield InstructorSchedule.objects.get(date=date, start_time=time)
    if not ins_sched:
        ins_sched = yield InstructorSchedule.objects.get(day=date.strftime('%a').lower(), start=time)
    scheds = yield BookedSchedule.objects.filter(status='booked', date=date, schedule=ins_sched).find_all()
    self.render_json({
        'bookings': scheds,
        'schedule': ins_sched
    })

def create(self):
    data = tornado.escape.json_decode(self.request.body)
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

    obj_user_id = ObjectId(data['user_id'])

    user_package = yield UserPackage.objects \
        .filter(user_id=obj_user_id) \
        .order_by('create_at', DESCENDING) \
        .find_all()

    if not len(user_package):
        self.render_json({})

    user_package[0].remaining_credits -= 1
    yield user_package[0].save()

    user = yield User.objects.get(obj_user_id)
    user.credits -= 1
    yield user.save()

    sched = BookedSchedule()
    sched.date = datetime.strptime(data['date'], '%Y-%m-%d')
    sched.schedule = ins_sched._id
    sched.user_package = user_package[0]._id
    sched.user_id = ObjectId(data['user_id'])
    sched.status = 'booked'
    sched.seat_number = data['seat_number']
    sched = yield sched.save()

    self.render_json(sched)

def update(self, id):
    booked_schedule = yield BookedSchedule.objects.get(id)
    if not booked_schedule:
        self.set_status(404)
        self.write('Not Found')
        self.finish()
        return

    data = tornado.escape.json_decode(self.request.body)
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
    booked_schedule = yield BookedSchedule.objects.get(id)
    booked_schedule.user_package.remaining_credits += 1
    booked_schedule.status = 'cancelled'
    yield booked_schedule.user_package.save()

    user = yield User.objects.get(booked_schedule.user_id._id)
    user.credits += 1
    yield user.save()

    yield booked_schedule.save()
    self.render_json(booked_schedule)