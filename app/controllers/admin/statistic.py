from app.models.schedules import *
from app.models.users import User
from datetime import datetime, timedelta

def find(self):

    startDate = self.get_query_argument('fromDate')
    endDate = self.get_query_argument('toDate')
    
    fromDate = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    if startDate:
        fromDate = datetime.strptime(startDate, '%Y-%m-%d')
    toDate = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d') + timedelta(days=1)
    if endDate: 
        toDate = datetime.strptime(endDate, '%Y-%m-%d')

    stats = yield InstructorSchedule.objects.filter(date__gte=fromDate, date__lte=toDate).find_all()
    for i, stat in enumerate(stats): 
        books = yield BookedSchedule.objects.filter(schedule=stat._id, status__ne='cancelled').filter(status__ne='waitlisted').find_all()
        stats[i].books = books

    self.render_json(stats)