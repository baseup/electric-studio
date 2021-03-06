from app.models.admins import Setting
from app.models.schedules import BookedSchedule
from datetime import datetime
from app.helper import GMT8
import sys
import tornado.escape


def find_one(self, id):
    self.set_status(403)
    if id == 'week_release':
        self.set_status(200)
        week_release = yield Setting.objects.get(key='week_release')
        if week_release:
            self.write(week_release.value)
        else:
            setting = Setting()
            setting.key = 'week_release'
            setting.value = '{}'
            yield setting.save()
            self.write('{}');

    elif id == 'blocked_bikes':
        self.set_status(200)
        bikes = yield Setting.objects.get(key='blocked_bikes')
        if bikes:
            self.write(bikes.value)
        else:
            setting = Setting()
            setting.key = 'blocked_bikes'
            setting.value = '{}'
            yield setting.save()
            self.write('{}');

    self.finish();

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    if id == 'week_release':
        week_release = yield Setting.objects.get(key='week_release')
        gmt8 = GMT8()
        values = { 'day' : data['day'], 'time': data['time'], 'date': str(datetime.now(tz=gmt8)) }
        week_release.value = tornado.escape.json_encode(values)
        yield week_release.save()
    elif id == 'blocked_bikes':
        bike_scheds = yield BookedSchedule.objects.filter(seat_number=data['bike'],status='booked').find_all()

        if bike_scheds and len(bike_scheds) > 0:
            self.render_json({
                'error': 'bike has schedule',
                'scheds': bike_scheds
            })
            return
        else:
            bikes = yield Setting.objects.get(key='blocked_bikes')
            if bikes:
                blocks = tornado.escape.json_decode(bikes.value)
                blocks[data['bike']] = data['reason']

                bikes.value = tornado.escape.json_encode(blocks)
                yield bikes.save()
    self.finish()

def destroy(self, id):
    if id == 'blocked_bikes':
        bike = self.get_query_argument('bike')
        bikes = yield Setting.objects.get(key='blocked_bikes')
        if bikes:
            blocks = tornado.escape.json_decode(bikes.value)
            if bike in blocks:
                del blocks[bike]

        bikes.value = tornado.escape.json_encode(blocks)
        yield bikes.save()
    self.finish()