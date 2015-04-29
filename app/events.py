from tornado.ioloop import PeriodicCallback

from datetime import datetime, timedelta, tzinfo
from tornado import gen

from app.models.users import User
from app.models.schedules import BookedSchedule
from app.models.packages import UserPackage

class GMT8(tzinfo):
    def utcoffset(self, dt):
        return timedelta(hours=7) + self.dst(dt)
    def dst(self, dt):
        d = datetime(dt.year, 4, 1)
        self.dston = d - timedelta(days=d.weekday() + 1)
        d = datetime(dt.year, 11, 1)
        self.dstoff = d - timedelta(days=d.weekday() + 1)
        if self.dston <=  dt.replace(tzinfo=None) < self.dstoff:
            return timedelta(hours=1)
        else:
            return timedelta(0)
    def tzname(self,dt):
        return "GMT +8"

@gen.coroutine
def schedule_watcher():
    gmt8 = GMT8()
    now = datetime.now(tz=gmt8)
    user_packages = yield UserPackage.objects.filter(status__ne='Expired').find_all()
    if user_packages:
        for user_pack in user_packages:
            expire_date = user_pack.create_at + timedelta(days=user_pack.expiration)
            expire_date = expire_date.replace(tzinfo=gmt8)
            if expire_date < datetime.now(tz=gmt8):
                user_pack.status = 'Expired'
                user = yield User.objects.get(user_pack.user_id._id)
                user.credits -= user_pack.remaining_credits

                user.save()
                user_pack.save()

    schedules = yield BookedSchedule.objects.filter(date__lte=now, status__ne='completed') \
                                            .filter(status__ne='cancelled') \
                                            .filter(status__ne='missed') \
                                            .find_all()
    if schedules:
        for i, sched in enumerate(schedules):
            sched_date = datetime.combine(sched.date, sched.schedule.start.time())
            sched_date = sched_date.replace(tzinfo=gmt8)
            if sched_date < datetime.now(tz=gmt8):
                if sched.status == 'booked':
                    sched.status = 'completed';
                    yield sched.save();
                elif sched.status == 'waitlisted':
                    sched.status = 'cancelled';
                    if sched.user_package:
                        sched.user_package.remaining_credits += 1
                        yield sched.user_package.save()
                    user = yield User.objects.get(sched.user_id._id)
                    user.credits += 1
                    yield user.save()
                    yield sched.save()

# A function that runs before your Tornado app run.
# This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
def bootstrap(app):
    p = PeriodicCallback(schedule_watcher, 5000)
    p.start()
    pass
    

# Called at the beginning of a request before get/post/etc.
# Override this method to perform common initialization regardless of the request method.
def prepare(self):
    pass

# Called after the end of a request.
# Override this method to perform cleanup, logging, etc.
# This method is a counterpart to prepare.
# on_finish may not produce any output, as it is called after the response has been sent to the client.
def on_finish(self):
    pass

# A function that runs when your Tornado app stop running.
# It is the last opportunity to do any work before the script terminates.
def shutdown(app):
    pass