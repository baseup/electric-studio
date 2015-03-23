from motorengine import ASCENDING
from datetime import datetime, timedelta
from app.models.schedules import InstructorSchedule

def find(self):
    date = self.get_query_argument('date')
    if not date:
        date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    else:
        date = datetime.strptime(date, '%Y-%m-%d')
    
    mon = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    date += timedelta(days=1)
    tue = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    date += timedelta(days=1)
    wed = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    date += timedelta(days=1)
    thu = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    date += timedelta(days=1)
    fri = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    date += timedelta(days=1)
    sat = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    date += timedelta(days=1)
    sun = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)

    scheds = { 
        'mon' : mon, 
        'tue' : tue,
        'wed' : wed,
        'thu' : thu,
        'fri' : fri,
        'sat' : sat,
        'sun' : sun
    }

    self.render_json(scheds)

def find_one(self, id):
    sched = yield InstructorSchedule.objects.get(id)
    self.write(sched.to_dict())
    self.finish()