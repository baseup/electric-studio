from motorengine import ASCENDING
from datetime import datetime, timedelta
from app.models.schedules import InstructorSchedule, BookedSchedule
from app.models.admins import Setting
from app.helper import GMT8
from bson.objectid import ObjectId
from motorengine import Q
from tornado import gen
from app.settings import REDIS_HOST, REDIS_PORT
from hurricane.helpers import to_json

import redis
import tornado
import tornado.websocket

redis_db = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

clients = []

@gen.coroutine
def get_schedule(date, ins, branch):
    redis_db.set('es_schedules_loading', True)
    try:
        gmt8 = GMT8()

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

        branch_filter = Q(branch=ObjectId(branch))
        if branch == '558272c288b5c73163343c45':
            branch_filter = Q(branch=ObjectId(branch)) | Q(branch__exists=False)

        scheds = {}
        week_days = ['mon','tue','wed','thu','fri','sat','sun','nmon']
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

            scheds[day] = sched
        

        scheds['counts'] = counts
        scheds['releases'] = sched_releases
        scheds['now'] = str(now)

        scheds_data = to_json(scheds)
        redis_db.set('es_schedules', scheds_data)
        for cli in clients:
            cli.write_message(scheds_data)

    except:
        value = sys.exc_info()[1]
        print(str(value))

    redis_db.delete('es_schedules_loading')

class Handler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        print('WebSocket opened')
        clients.append(self)

        msg = '{}'
        if redis_db.exists('es_schedules') and redis_db.get('es_schedules'):
            msg = redis_db.get('es_schedules').decode('utf-8')
        self.write_message(msg)

    def on_message(self, message):
        if not redis_db.exists('es_schedules_loading'):
            params = tornado.escape.json_decode(message)
            date, ins, branch = None, None, None
            if 'date' in params:
                date = params['date']
            if 'ins' in params:
                ins = params['ins']
            if 'branch' in params:
                branch = params['branch']

            get_schedule(date, ins, branch)

        msg = '{}'
        if redis_db.exists('es_schedules') and redis_db.get('es_schedules'):
            msg = redis_db.get('es_schedules').decode('utf-8')
        self.write_message(msg)

    def on_close(self):
        print('WebSocket closed')
        clients.remove(self)