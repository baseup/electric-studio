import sys
from passlib.hash import bcrypt
from motorengine.errors import InvalidDocumentError
from motorengine import DESCENDING
from app.models.users import User
from app.models.packages import UserPackage
from app.models.schedules import BookedSchedule
from hurricane.helpers import to_json, to_json_serializable
from datetime import datetime, timedelta
import tornado
import json

def find(self):
    users = yield User.objects.filter(status__ne='Deleted').order_by('update_at',direction=DESCENDING).find_all()
    self.render_json(users)

def find_one(self, id):
    user = yield User.objects.get(id)
    json_user = to_json_serializable(user)

    with_books = self.get_query_argument('books')
    if with_books:
        start_date = self.get_query_argument('fromDate')
        end_date = self.get_query_argument('toDate')
        now = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
        from_date = now
        if start_date:
            from_date = datetime.strptime(start_date, '%Y-%m-%d')
        to_date = now + timedelta(days=7)
        if end_date: 
            to_date = datetime.strptime(end_date, '%Y-%m-%d')

        books = yield BookedSchedule.objects.filter(user_id=user._id, date__gte=from_date, date__lte=to_date) \
                                            .order_by('date',direction=DESCENDING).find_all()
        json_user['books'] = to_json_serializable(books)
    else:
        packages = yield UserPackage.objects.filter(user_id=user._id).order_by('expire_date').find_all()
        json_user['packages'] = to_json_serializable(packages)

    self.write(to_json(json_user))
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)

    password = None
    if 'password' in data:
        password = bcrypt.encrypt(data['password'])

    is_exist = (yield User.objects.filter(email=data['email'], status__ne='Deleted').count())
    if is_exist > 0:
        self.set_status(400)
        self.write('Email address is already in use.')
    else:
        try:
            user = User(first_name=data['first_name'], 
                        # middle_name=data['middle_name'],
                        last_name=data['last_name'],
                        email=data['email'],
                        password=password,
                        status='Unverified',
                        credits=0)

            user = yield user.save()
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            str_value = str(value)
            self.write(str_value)
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try:
        user = yield User.objects.get(id)

        if 'current_password' in data:
            if(bcrypt.verify(data['current_password'], user.password)):
                user.password = bcrypt.encrypt(data['password'])
                user = yield user.save()
            else:
                self.set_status(403)
                self.write('Current Password did not match')
        elif 'froze_account' in data:
            user.status = 'Frozen'
            user.remarks = data['froze_account']
            scheds = yield BookedSchedule.objects.filter(user_id=user._id, status='booked').find_all()
            for i, sched in enumerate(scheds):
                sched.status = 'cancelled';
                if sched.user_package:
                    sched.user_package.remaining_credits += 1
                    yield sched.user_package.save()
                user.credits += 1
                sched = yield sched.save()
            user = yield user.save()
        elif 'unfroze' in data:
            user.status = 'Active'
            user = yield user.save()
        elif 'verify' in data:
            user.status = 'Active'
            user = yield user.save()
        elif 'billing' in data:
            user.billing = data['billing']
            user = yield user.save()
        else:
            user.first_name = data['first_name']
            # user.middle_name = data['middle_name']
            user.last_name = data['last_name']
            
            if data['birthdate'] != None:
                user.birthdate = datetime.strptime(data['birthdate'],'%Y-%m-%d')
            if data['address'] != None:
                user.address = data['address']
            if data['phone_number'] != None:
                user.phone_number = data['phone_number']
            if data['contact_person'] != None:
                user.contact_person = data['contact_person']
            if data['emergency_contact'] != None:
                user.emergency_contact = data['emergency_contact']

            user = yield user.save()

    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    user = yield User.objects.get(id)

    scheds = yield BookedSchedule.objects.filter(user_id=user._id, status__ne='completed') \
                                  .filter(status__ne='cancelled') \
                                  .filter(status__ne='missed').find_all()
    if scheds:
        for i, sched in enumerate(scheds):

            if sched.user_package:
                sched.user_package.remaining_credits += 1
                yield sched.user_package.save()

            if sched.status == 'waitlisted':
                user.credits += 1

            sched.status = 'cancelled'
            yield sched.save()

    user.status = 'Deleted'
    user = yield user.save()
    self.finish()


