from motorengine import ASCENDING
from app.models.schedules import InstructorSchedule

def find(self):
    mon = yield InstructorSchedule.objects.filter(day='mon', type='regular') \
                                          .order_by('start', direction=ASCENDING).find_all()
    tue = yield InstructorSchedule.objects.filter(day='tue', type='regular') \
                                          .order_by('start', direction=ASCENDING).find_all()
    wed = yield InstructorSchedule.objects.filter(day='wed', type='regular') \
                                          .order_by('start', direction=ASCENDING).find_all()
    thu = yield InstructorSchedule.objects.filter(day='thu', type='regular') \
                                          .order_by('start', direction=ASCENDING).find_all()
    fri = yield InstructorSchedule.objects.filter(day='fri', type='regular') \
                                          .order_by('start', direction=ASCENDING).find_all()
    sat = yield InstructorSchedule.objects.filter(day='sat', type='regular') \
                                          .order_by('start', direction=ASCENDING).find_all()
    sun = yield InstructorSchedule.objects.filter(day='sun', type='regular') \
                                          .order_by('start', direction=ASCENDING).find_all()

    scheds = { 
        'mon' : mon, 
        'tue' : tue,
        'wed' : tue,
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