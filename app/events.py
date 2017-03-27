from tornado.ioloop import PeriodicCallback

from datetime import datetime, timedelta, tzinfo
from tornado import gen

from app.models.users import User
from app.models.schedules import BookedSchedule
from app.models.packages import UserPackage
from app.helper import GMT8
from app.helper import send_push_notification
from bson.objectid import ObjectId

import tornado.escape

@gen.coroutine
def schedule_watcher():
    gmt8 = GMT8()
    now = datetime.now(tz=gmt8)
    user_packages = yield UserPackage.objects.filter(expire_date__lte=now,status__ne='Expired').find_all()
    if user_packages:
        for user_pack in user_packages:
            expire_date = user_pack.create_at + timedelta(days=user_pack.expiration)
            expire_date = expire_date.replace(tzinfo=gmt8)
            if expire_date < datetime.now(tz=gmt8):
                user_pack.status = 'Expired'
                if user_pack.user_id:
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
            sched_date = datetime.combine(sched.date, sched.schedule.end.time())
            sched_date = sched_date.replace(tzinfo=gmt8)
            if sched_date < datetime.now(tz=gmt8):
                if sched.status == 'booked':
                    sched.status = 'completed';
                    yield sched.save();
                elif sched.status == 'waitlisted':
                    sched.status = 'cancelled';
                    deduct_credits = 1
                    if sched.schedule.type == 'Electric Endurance':
                        deduct_credits = 2
                    if sched.user_package:
                        if len(sched.user_package) == 1:
                            upack = yield UserPackage.objects.get(ObjectId(sched.user_package[0]))
                            upack.remaining_credits += deduct_credits
                            yield upack.save()
                        else:
                            upack1 = yield UserPackage.objects.get(ObjectId(sched.user_package[0]))
                            upack2 = yield UserPackage.objects.get(ObjectId(sched.user_package[1]))
                            upack1.remaining_credits += 1
                            upack2.remaining_credits += 1
                            yield upack1.save()
                            yield upack2.save()
                    if sched.user_id:
                        user = yield User.objects.get(sched.user_id._id)
                        user.credits += deduct_credits
                        yield user.save()
                        yield sched.save()


@gen.coroutine
def push_notification_watcher():
    gmt8 = GMT8()
    now = datetime.now(tz=gmt8).replace(hour=0, minute=0, second=0, microsecond=0)
    schedules = yield BookedSchedule.objects.filter(date__gte=now, status='booked') \
                                            .filter(push_notification_sent=False).find_all()

    if schedules:
        for i, sched in enumerate(schedules):
            sched_start = datetime.combine(sched.date, sched.schedule.start.time())
            sched_start = sched_start.replace(tzinfo=gmt8)
            sched_before = datetime.combine(sched.date, sched.schedule.start.time()) - timedelta(hours=1)
            sched_before = sched_before.replace(tzinfo=gmt8)
            time_now = datetime.now(tz=gmt8)

            user_devices = tornado.escape.json_decode(sched.user_id.device_token) if sched.user_id.device_token else False

            if time_now > sched_before and time_now < sched_start and user_devices:
                push_title = 'Upcoming class - ' + sched.schedule.branch.name
                push_message = 'Your class starts at ' + datetime.strftime(sched_start, '%I:%M %p')
                push_payload = {
                    'type': 'UPCOMING_CLASS',
                    'scheduleId': str(sched._id)
                }
                send_push_notification(tokens=user_devices, title=push_title, message=push_message, payload=push_payload)

                sched.push_notification_sent = True
                yield sched.save();


# A function that runs before your Tornado app run.
# This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
def bootstrap(app):
    p = PeriodicCallback(schedule_watcher, 60000)
    p.start()
    PeriodicCallback(push_notification_watcher, 60000).start()
    pass


# Called at the beginning of a request before get/post/etc.
# Override this method to perform common initialization regardless of the request method.
def prepare(self):
   self.set_header('Access-Control-Allow-Origin', '*')
   self.set_header('Access-Control-Allow-Credentials', 'true')
   self.set_header('Access-Control-Max-Age', 1728000)
   self.set_header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
   self.set_header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,ES-USER-ID')

   if self.request.method == 'OPTIONS':
       return self.finish()

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
