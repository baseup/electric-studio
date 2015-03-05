from app.models.schedules import *
from datetime import datetime
from bson.objectid import ObjectId

import tornado.escape

def find(self):
    date = self.get_query_argument('date')
    if not date:
        date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    scheds = yield BookedSchedule.objects.filter(date=date).find_all()
    self.render_json(scheds)

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    special_date = datetime.strptime(data['date'], '%Y-%m-%d')
    time = datetime.strptime(data['time'], '%I:%M %p')
    ins_sched = yield InstructorSchedule.objects.get(date=special_date, start=time)
    if not ins_sched:
        ins_sched = yield InstructorSchedule.objects.get(day=special_date.strftime('%a').lower(), start=time)

    total_booked = yield BookedSchedule.objects.filter(date=special_date, schedule=ins_sched).count()
    if total_booked >= 37:
        self.set_status(400)
        self.write('Not available slots')
        self.finish()
        return

    sched = BookedSchedule()
    sched.date = datetime.strptime(data['date'], '%Y-%m-%d')
    sched.schedule = ins_sched._id
    sched.user_id = ObjectId(data['user_id'])
    sched.status = 'booked'
    sched.seat_number = data['seat_number']
    sched = yield sched.save()

    self.render_json(sched)