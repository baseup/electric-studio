from motorengine import ASCENDING
from datetime import datetime, timedelta
from app.models.schedules import InstructorSchedule, BookedSchedule
from app.models.admins import Setting
from app.helper import GMT8
import tornado

def find(self):
    gmt8 = GMT8()

    date = self.get_query_argument('date')
    if not date:
        date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    else:
        date = datetime.strptime(date, '%Y-%m-%d')

    counts = {}
    sched_releases = {}

    wr = yield Setting.objects.get(key='week_release');

    week_release = tornado.escape.json_decode(wr.value);
    week_release['date'] = datetime.strptime(week_release['date'].replace('+08:00',''),'%Y-%m-%d %H:%M:%S.%f')

    updateWeek = week_release['date'] + timedelta(days=-week_release['date'].weekday() + 6)
    updateWeek = updateWeek.replace(tzinfo=gmt8)

    days = { 'mon' : 0, 'tue': 1, 'wed': 2, 'thu': 3, 'fri': 4, 'sat': 5, 'sun': 6 }

    rtime = week_release['time'].split(':')

    now = datetime.now(tz=gmt8)
    dDay = now.weekday()
    next_mon = now + timedelta(days=-dDay + 1, weeks=1)
    next_mon = next_mon.replace(tzinfo=gmt8)

    release_date = now + timedelta(days=-dDay + days[week_release['day']])
    release_date = release_date.replace(hour=int(rtime[0]), minute=int(rtime[1]), second=0, tzinfo=gmt8)

    next_release = release_date + timedelta(weeks=1);
    
    # monday
    mon = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for m in mon:

        mon_date = date.replace(hour=m.start.hour, minute=m.start.minute, second=0, tzinfo=gmt8)
        if (mon_date < now or mon_date > next_mon):
            sched_releases[str(m._id)] = False
        elif updateWeek < now and (now < release_date and date.replace(tzinfo=gmt8) > release_date) or (now > release_date and date.replace(tzinfo=gmt8) > next_release):
            sched_releases[str(m._id)] = False
        else:
            sched_releases[str(m._id)] = True

        if mon_date > now:
            book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=m._id).count())
            waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=m._id).count())
            counts[str(m._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #tuesday
    date += timedelta(days=1)
    tue = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for t in tue:

        tue_date = date.replace(hour=t.start.hour, minute=t.start.minute, second=0, tzinfo=gmt8)
        if (tue_date < now or tue_date > next_mon):
            sched_releases[str(t._id)] = False
        elif updateWeek < now and (now < release_date and tue_date > release_date) or (now > release_date and tue_date > next_release):
            sched_releases[str(t._id)] = False
        else:
            sched_releases[str(t._id)] = True

        if tue_date > now:
            book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=t._id).count())
            waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=t._id).count())
            counts[str(t._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #wednesday
    date += timedelta(days=1)
    wed = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for w in wed:

        wednes_date = date.replace(hour=w.start.hour, minute=w.start.minute, second=0, tzinfo=gmt8)
        if (wednes_date < now or wednes_date > next_mon):
            sched_releases[str(w._id)] = False
        elif updateWeek < now and (now < release_date and wednes_date > release_date) or (now > release_date and wednes_date > next_release):
            sched_releases[str(w._id)] = False
        else:
            sched_releases[str(w._id)] = True

        if wednes_date > now:
            book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=w._id).count())
            waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=w._id).count())
            counts[str(w._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #thursday
    date += timedelta(days=1)
    thu = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for th in thu:

        thurs_date = date.replace(hour=th.start.hour, minute=th.start.minute, second=0, tzinfo=gmt8)
        if (thurs_date < now or thurs_date > next_mon):
            sched_releases[str(th._id)] = False
        elif updateWeek < now and (now < release_date and thurs_date > release_date) or (now > release_date and thurs_date > next_release):
            sched_releases[str(th._id)] = False
        else:
            sched_releases[str(th._id)] = True

        if thurs_date > now:
            book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=th._id).count())
            waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=th._id).count())
            counts[str(th._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #friday
    date += timedelta(days=1)
    fri = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for f in fri:

        fri_date = date.replace(hour=f.start.hour, minute=f.start.minute, second=0, tzinfo=gmt8)
        if (fri_date < now or fri_date > next_mon):
            sched_releases[str(f._id)] = False
        elif updateWeek < now and (now < release_date and fri_date > release_date) or (now > release_date and fri_date > next_release):
            sched_releases[str(f._id)] = False
        else:
            sched_releases[str(f._id)] = True

        if fri_date > now:
            book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=f._id).count())
            waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=f._id).count())
            counts[str(f._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #saturday
    date += timedelta(days=1)
    sat = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for s in sat:

        sat_date = date.replace(hour=s.start.hour, minute=s.start.minute, second=0, tzinfo=gmt8)
        if (sat_date < now or sat_date > next_mon):
            sched_releases[str(s._id)] = False
        elif updateWeek < now and (now < release_date and sat_date > release_date) or (now > release_date and sat_date > next_release):
            sched_releases[str(s._id)] = False
        else:
            sched_releases[str(s._id)] = True

        if sat_date > now:
            book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=s._id).count())
            waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=s._id).count())
            counts[str(s._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #sunday
    date += timedelta(days=1)
    sun = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for su in sun:

        sun_date = date.replace(hour=su.start.hour, minute=su.start.minute, second=0, tzinfo=gmt8)
        if (sun_date < now or sun_date > next_mon):
            sched_releases[str(su._id)] = False
        elif updateWeek < now and (now < release_date and sun_date > release_date) or (now > release_date and sun_date > next_release):
            sched_releases[str(su._id)] = False
        else:
            sched_releases[str(su._id)] = True

        if sun_date > now:
            book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=su._id).count())
            waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=su._id).count())
            counts[str(su._id)] = { 'books': book_count, 'waitlist': waitlist_count }
    #next moday
    date += timedelta(days=1)
    nmon = yield InstructorSchedule.objects.filter(date=date) \
                                          .order_by('start', direction=ASCENDING).find_all(lazy=True)
    for n in nmon:

        nmon_date = date.replace(hour=n.start.hour, minute=n.start.minute, second=0, tzinfo=gmt8)
        if (nmon_date < now or nmon_date > next_mon):
            sched_releases[str(n._id)] = False
        elif updateWeek < now and (now < release_date and nmon_date > release_date) or (now > release_date and nmon_date > next_release):
            sched_releases[str(n._id)] = False
        else:
            sched_releases[str(n._id)] = True

        if nmon_date > now:
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
        'counts' : counts,
        'releases' : sched_releases,
        'now' : str(now)
    }

    self.render_json(scheds)

def find_one(self, id):
    sched = yield InstructorSchedule.objects.get(id)
    self.render_json(sched)