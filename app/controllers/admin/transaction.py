from motorengine import DESCENDING
from app.models.packages import UserPackage, Package
from app.models.schedules import BookedSchedule
from app.models.users import User
from app.helper import send_email
from motorengine.errors import *
from datetime import datetime, timedelta
from app.helper import create_at_gmt8
from app.helper import GMT8

import tornado.escape
import sys

def find(self):
    page_limit = 10
    page = 0
    transactions = []
    total = yield UserPackage.objects.count();
    if self.get_argument('page'):
        page = int(self.get_argument('page'))
    if(total - (page * page_limit)) > 0:
        transactions = yield UserPackage.objects.order_by('create_at', direction=DESCENDING) \
                    .skip(page * page_limit).limit(page_limit).find_all()
    transactions = create_at_gmt8(transactions)
    self.render_json(transactions)

def find_one(self, id):
    if self.get_argument('book_count'):
        book_count = (yield BookedSchedule.objects.filter(status__ne="cancelled", user_package=[str(id)]).count());
        self.write(str(book_count))
    self.finish();

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    trans = UserPackage()
    user = yield User.objects.get(data['user_id'])

    if 'package_id' in data and data['package_id'] != '':
        package = yield Package.objects.get(data['package_id'])
        trans.package_id = package._id
        trans.package_name = package.name
        trans.package_fee = package.fee
        trans.package_ft = package.first_timer
        trans.credit_count = package.credits
        trans.expiration = package.expiration
        trans.remaining_credits = package.credits
    else:
        if 'credit_count' in data:
            trans.credit_count = data['credit_count']
            trans.remaining_credits = data['credit_count']
        if 'expiration' in data:
            trans.expiration = data['expiration'] 

    if not trans.expiration:
        trans.expiration = 30

    trans.expire_date = datetime.now() + timedelta(days=int(trans.expiration))

    if 'notes' in data:
        trans.notes = data['notes']

    trans.is_free = True
    trans.user_id = user._id

    try:
        yield trans.save()
        user.credits += int(trans.credit_count)
        yield user.save()

        send_email_flag = True
        if 'no_email' in data and data['no_email'] == True:
            send_email_flag = False

        if send_email_flag:
            user = (yield User.objects.get(user._id)).serialize()
            site_url = url = self.request.protocol + '://' + self.request.host + '/#/schedule'
            content = str(self.render_string('emails/freeclass', user=user, site=site_url, expiration=trans.expiration, credits=trans.credit_count), 'UTF-8')
            yield self.io.async_task(send_email, user=user, content=content, subject='For You, On Us')

    except InvalidDocumentError:
        self.set_status(400)
        self.write(str(sys.exc_info()[1]))
        self.finish()
        return

    self.render_json(trans)


def update(self, id):

    tran = yield UserPackage.objects.get(id)
    data = tornado.escape.json_decode(self.request.body)

    if tran:
        if 'extend' in data:
            gmt8 = GMT8()
            now = datetime.now(tz=gmt8)
            tran.expiration += int(data['extend'])
            tran.expire_date = tran.create_at + timedelta(days=int(tran.expiration))
            if tran.status == 'Expired' and tran.expire_date > now:
                tran.status = 'Active'
            tran = yield tran.save()
        if 'credit_change' in data:
            newCredits = int(data['credit_change'])
            if tran.remaining_credits > newCredits:
                tran.user_id.credits -= (tran.remaining_credits - newCredits)
            else:
                tran.user_id.credits += (newCredits - tran.remaining_credits)
            tran.remaining_credits = newCredits

            yield tran.user_id.save()
            tran = yield tran.save()
            

    else:
        self.set_status(400)
        self.write('Transaction not found')

    self.finish()

