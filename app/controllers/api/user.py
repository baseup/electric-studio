import sys
from passlib.hash import bcrypt
from motorengine.errors import InvalidDocumentError
from app.helper import send_email_verification, send_email
from app.models.users import User
from app.models.schedules import BookedSchedule
from app.models.packages import UserPackage
from datetime import datetime
from bson.objectid import ObjectId
import tornado
import json

def find(self):
    users = yield User.objects.find_all()
    self.render_json(users)

def find_one(self, id):
    user = yield User.objects.get(id)
    if user:
        user.password = None
        self.render_json(user)
    else:
        self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)

    password = None
    if 'password' in data:
        password = bcrypt.encrypt(data['password'])

    isExist = (yield User.objects.filter(email=data['email'], status__ne='Deleted').count())
    if isExist > 0:
        self.set_status(400)
        self.write('Email address is already in use.')
    else:
        try:
            user = User(first_name=data['first_name'],
                        # middle_name=data['middle_name'],
                        last_name=data['last_name'],
                        email=data['email'].lower(),
                        password=password,
                        status='Unverified',
                        credits=0)

            if 'phone_number' in data:
                user.phone_number = data['phone_number']

            user.agreed_terms = True
            user = yield user.save()

        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            str_value = str(value)
            if 'The index ' in str_value and ' was violated ' in str_value:
                str_value = 'Email already in used'
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
        elif 'reset_password' in data:
            user.password = bcrypt.encrypt(data['reset_password'])
            user = yield user.save()
        elif 'billing' in data:
            user.billing = data['billing']
            user = yield user.save()
        elif 'agreed_terms' in data:
            user.agreed_terms = True

            if 'first_name' in data:
                user.first_name = data['first_name']
            if 'last_name' in data:
                user.last_name = data['last_name']
            if 'birthdate' in data:
                user.birthdate = datetime.strptime(data['birthdate'], '%Y-%m-%d')
            if 'address' in data:
                user.address = data['address']
            if 'address2' in data:
                user.address2 = data['address2']
            if 'phone_number' in data:
                user.phone_number = data['phone_number']
            if 'contact_person' in data:
                user.contact_person = data['contact_person']
            if 'emergency_contact' in data:
                user.emergency_contact = data['emergency_contact']

            user = yield user.save()
        else:
            user.first_name = data['first_name']
            # user.middle_name = data['middle_name']
            user.last_name = data['last_name']

            if data['birthdate'] != None:
                user.birthdate = datetime.strptime(data['birthdate'],'%Y-%m-%d')
            if data['address'] != None:
                user.address = data['address']
            if data['address2'] != None:
                user.address2 = data['address2']
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
    password = self.get_query_argument('pass');

    if password:
        if(bcrypt.verify(password, user.password)):
            scheds = yield BookedSchedule.objects.filter(user_id=user._id, status__ne='completed') \
                                                 .filter(status__ne='cancelled') \
                                                 .filter(status__ne='missed').find_all()
            if scheds:
                for i, sched in enumerate(scheds):

                    restore_credits = 1
                    if sched.schedule.type == 'Electric Endurance':
                        restore_credits = 2

                    if sched.status == 'waitlisted':
                        if sched.user_package:
                            for upack in sched.user_package:
                                user_pack = yield UserPackage.objects.get(ObjectId(upack))
                                if len(sched.user_package) == 1:
                                    user_pack.remaining_credits += restore_credits
                                    yield user_pack.save()
                                    break
                                else:
                                    user_pack.remaining_credits += 1
                                    yield user_pack.save()

                            user.credits += restore_credits

                    sched.status = 'cancelled'
                    yield sched.save()

            user.status = 'Deactivated'
            user = yield user.save()

            user = (yield User.objects.get(user._id)).serialize()
            host = self.request.protocol + '://' + self.request.host
            book_url = host + '/#/schedule'
            pack_url = host + '/#/rates-and-packages'
            content = str(self.render_string('emails/deactivate', user=user, pack_url=pack_url, book_url=book_url), 'UTF-8')
            yield self.io.async_task(send_email, user=user, content=content, subject='Account Deactivated')

        else:
            self.set_status(400);
            self.write('Invalid User Password')
    else:
        self.set_status(400);
        self.write('Invalid User Password')

    self.finish()
