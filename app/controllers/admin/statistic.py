from app.models.schedules import *
from app.models.users import User

def find(self):
    stats = yield InstructorSchedule.objects.find_all()

    for i, stat in enumerate(stats): 
        books = yield BookedSchedule.objects.filter(schedule=stat._id, status__ne='cancelled').filter(status__ne='waitlisted').find_all()
        stats[i].books = books

    self.render_json(stats)