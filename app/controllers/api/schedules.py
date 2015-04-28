from motorengine import ASCENDING
from datetime import datetime, timedelta
from app.models.schedules import InstructorSchedule, BookedSchedule

def find(self):
    date = self.get_query_argument('date')
    if not date:
        date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    else:
        date = datetime.strptime(date, '%Y-%m-%d')

    counts = {}
    
    # monday
    mon = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for m in mon:
        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=m._id).count())
        waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=m._id).count())
        counts[str(m._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #tuesday
    date += timedelta(days=1)
    tue = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for t in tue:
        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=t._id).count())
        waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=t._id).count())
        counts[str(t._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #wednesday
    date += timedelta(days=1)
    wed = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for w in wed:
        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=w._id).count())
        waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=w._id).count())
        counts[str(w._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #thursday
    date += timedelta(days=1)
    thu = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for th in thu:
        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=th._id).count())
        waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=th._id).count())
        counts[str(th._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #friday
    date += timedelta(days=1)
    fri = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for f in fri:
        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=f._id).count())
        waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=f._id).count())
        counts[str(f._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #saturday
    date += timedelta(days=1)
    sat = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for s in sat:
        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=s._id).count())
        waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=s._id).count())
        counts[str(s._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #sunday
    date += timedelta(days=1)
    sun = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for su in sun:
        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=su._id).count())
        waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=su._id).count())
        counts[str(su._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #next moday
    date += timedelta(days=1)
    nmon = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for n in nmon:
        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=n._id).count())
        waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=n._id).count())
        counts[str(n._id)] = { 'books': book_count, 'waitlist': waitlist_count }

    scheds = { 
        'mon' : mon, 
        'tue' : tue,
        'wed' : wed,
        'thu' : thu,
        'fri' : fri,
        'sat' : sat,
        'sun' : sun,
        'nmon' : nmon,
        'counts' : counts 
    }

    self.render_json(scheds)

def find_one(self, id):
    sched = yield InstructorSchedule.objects.get(id)
    self.render_json(sched)