from app.models.schedules import InstructorSchedule, BookedSchedule
from datetime import datetime, timedelta
from dateutil import parser
from bson.objectid import ObjectId

import tornado.escape

DEFAULT_TIME = datetime(1900, 1, 1)

def find(self):

    start_timestamp = self.get_query_argument('start')
    end_timestamp = self.get_query_argument('end')

    events = []
    start_date = datetime.fromtimestamp(int(start_timestamp))
    end_date = datetime.fromtimestamp(int(end_timestamp))
    while start_date < end_date:
        # reg_day = start_date.strftime('%a').lower()
        # reg_scheds = yield InstructorSchedule.objects.filter(day=reg_day, type='regular').find_all()
        start_date_string = start_date.strftime('%Y-%m-%d')
        start_date_filter = datetime.strptime(start_date_string, '%Y-%m-%d')
        # for sched in reg_scheds:
        #     events.append({
        #         'title': sched.instructor.admin.first_name + "'s class \n( Regular )",
        #         'start': start_date_string + sched.start.strftime(' %H:%M:%S'),
        #         'end': start_date_string + sched.end.strftime(' %H:%M:%S'),
        #         'instructor': sched.instructor,
        #         'start_time': sched.start.strftime('%I:%M %p'),
        #         'end_time': sched.end.strftime('%I:%M %p'),
        #         'id': str(sched._id),
        #         'type': 'regular',
        #         'day': reg_day,
        #         'ridersCount': (yield BookedSchedule.objects.filter(status='booked', date=start_date_filter, schedule=sched._id).count())
        #     })
        spec_scheds = yield InstructorSchedule.objects.filter(date=start_date_filter).find_all()
        for sched in spec_scheds:
            events.append({
                'title': sched.instructor.admin.first_name + "'s class",
                'start': start_date_string + sched.start.strftime(' %H:%M:%S'),
                'end': start_date_string + sched.end.strftime(' %H:%M:%S'),
                'instructor': sched.instructor,
                'start_time': sched.start.strftime('%I:%M %p'),
                'end_time': sched.end.strftime('%I:%M %p'),
                'id': str(sched._id),
                'type': 'special',
                'ridersCount': (yield BookedSchedule.objects.filter(status='booked', date=start_date_filter, schedule=sched._id).count())
            })
        start_date += timedelta(days=1)

    self.render_json(events)

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    new_sched = InstructorSchedule()
    if 'day' in data:
        new_sched.day = data['day']
    elif 'date' in data:
        new_sched.date = parser.parse(data['date'])
    new_sched.start = parser.parse(data['start'], default=DEFAULT_TIME)
    new_sched.end = parser.parse(data['end'], default=DEFAULT_TIME)
    if new_sched.start > new_sched.end:
        self.set_status(400)
        self.write('Invalid start and end time')
        self.finish()
        return
    new_sched.instructor = ObjectId(data['instructor'])
    yield new_sched.save()
    self.render_json(new_sched)

def find_one(self, id):
    sched = yield InstructorSchedule.objects.get(id)
    self.write(sched.to_dict())
    self.finish()

def destroy(self, id):
    sched = yield InstructorSchedule.objects.get(id)
    if sched:
        sched.delete()
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    sched = yield InstructorSchedule.objects.get(id)
    if 'day' in data:
        sched.day = data['day']
    sched.start = parser.parse(data['start'], default=DEFAULT_TIME)
    sched.end = parser.parse(data['end'], default=DEFAULT_TIME)
    if sched.start > sched.end:
        self.set_status(400)
        self.write('Invalid start and end time')
        self.finish()
        return
    if 'instructor' in data:
        sched.instructor = ObjectId(data['instructor'])
    yield sched.save()
    self.render_json(sched)