from motorengine import ASCENDING
from datetime import datetime, timedelta
from app.models.schedules import InstructorSchedule, BookedSchedule
from app.models.admins import Setting, Branch
from app.helper import GMT8
from bson.objectid import ObjectId
from motorengine import Q
from app.settings import DEFAULT_BRANCH_ID
import tornado
import re

@tornado.gen.coroutine
def query(self, date, ins, branch):
    branch = str(branch) if isinstance(branch, ObjectId) else branch
    the_date = date
    gmt8 = GMT8()

    date = datetime.strptime(datetime.now().strftime('%Y-%m-%d') if not date else date, '%Y-%m-%d')

    counts = {}
    sched_releases = {}

    wr = yield Setting.objects.get(key='week_release');

    week_release = tornado.escape.json_decode(wr.value);
    week_release['date'] = datetime.strptime(re.sub('\+\d{2}:\d{2}$', '', week_release['date']), '%Y-%m-%d %H:%M:%S.%f')

    updateWeek = week_release['date'] + timedelta(days=-week_release['date'].weekday() + 6)
    updateWeek = updateWeek.replace(tzinfo=gmt8)

    days = {'mon' : 0, 'tue': 1, 'wed': 2, 'thu': 3, 'fri': 4, 'sat': 5, 'sun': 6}

    rtime = week_release['time'].split(':')

    now = datetime.now(tz=gmt8)
    dDay = now.weekday()
    next_mon = now + timedelta(days=-dDay + 1, weeks=1)
    next_mon = next_mon.replace(tzinfo=gmt8)

    release_date = now + timedelta(days=-dDay + days[week_release['day']])
    release_date = release_date.replace(hour=int(rtime[0]), minute=int(rtime[1]), second=0, tzinfo=gmt8)

    next_release = release_date + timedelta(weeks=1);

    branch_filter = Q(branch=ObjectId(branch))
    if branch == DEFAULT_BRANCH_ID:
        branch_filter = Q(branch=ObjectId(branch)) | Q(branch__exists=False)

    scheds = {}
    week_days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'nmon']
    for day in week_days:

        sched_query = InstructorSchedule.objects.filter(date=date)

        if branch:
            sched_query.filter(branch_filter)

        if ins:
            qfilter = Q(instructor=ObjectId(ins)) | Q(sub_instructor=ObjectId(ins))
            sched_query.filter(qfilter).limit(4)

        sched = yield sched_query.order_by('start', direction=ASCENDING).find_all(lazy=True)
        if date.replace(tzinfo=gmt8) + timedelta(days=1) > now:
            for s in sched:
                sched_date = date.replace(hour=s.start.hour, minute=s.start.minute, second=0, tzinfo=gmt8)
                if (sched_date < now or sched_date > next_mon):
                    sched_releases[str(s._id)] = False
                elif updateWeek < now and (now < release_date and date.replace(tzinfo=gmt8) > release_date) or (now > release_date and date.replace(tzinfo=gmt8) > next_release):
                    sched_releases[str(s._id)] = False
                else:
                    sched_releases[str(s._id)] = True

                if sched_date > now or sched_releases[str(s._id)]:
                    waitlist_count = (yield BookedSchedule.objects.filter(status='waitlisted', schedule=s._id).count())
                    book_count = 0
                    if waitlist_count == 0:
                        book_count = (yield BookedSchedule.objects.filter(status='booked', schedule=s._id).count())
                    counts[str(s._id)] = { 'books': book_count, 'waitlist': waitlist_count }

        date += timedelta(days=1)

        if branch:
            default_branch = yield Branch.objects.get(ObjectId(branch))

            for i, s in enumerate(sched):
                if sched[i].branch is None:
                    sched[i].branch = default_branch

        scheds[day] = sched


    scheds['counts'] = counts
    scheds['releases'] = sched_releases
    scheds['now'] = str(now)
    scheds['date'] = the_date
    scheds['branch_id'] = branch

    return scheds

def find(self):
    date = self.get_query_argument('date')
    ins = self.get_query_argument('ins')
    branch = self.get_query_argument('branch')

    schedules = yield query(self, date, ins, branch)

    self.render_json(schedules)

def find_one(self, id):
    sched = yield InstructorSchedule.objects.get(id)
    self.render_json(sched)
