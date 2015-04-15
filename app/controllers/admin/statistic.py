from motorengine import ASCENDING
from app.models.schedules import *
from app.models.users import User
from datetime import datetime, timedelta
from hurricane.helpers import to_json, to_json_serializable
from bson.objectid import ObjectId

def find(self):

    startDate = self.get_query_argument('fromDate')
    endDate = self.get_query_argument('toDate')
    
    fromDate = datetime.now()
    if startDate:
        fromDate = datetime.strptime(startDate, '%Y-%m-%d')
    toDate = datetime.now() + timedelta(days=7)
    if endDate: 
        toDate = datetime.strptime(endDate, '%Y-%m-%d')

    stats = yield InstructorSchedule.objects.filter(date__gte=fromDate, date__lte=toDate).find_all()
    json_stats = to_json_serializable(stats)
    for i, stat in enumerate(json_stats): 
        books = yield BookedSchedule.objects.filter(schedule=ObjectId(stat['_id']), status__ne='cancelled').order_by('seat_number', direction=ASCENDING).filter(status__ne='waitlisted').find_all()
        waitlist = yield BookedSchedule.objects.filter(schedule=ObjectId(stat['_id']), status='waitlisted').find_all()
        json_stats[i]['books'] = to_json_serializable(books)
        json_stats[i]['waitlist'] = to_json_serializable(waitlist)

    self.write(to_json(json_stats))
    self.finish()