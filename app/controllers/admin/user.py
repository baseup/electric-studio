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
    users = yield User.objects.order_by('update_at',direction=DESCENDING).find_all()
    self.render_json(users)

def find_one(self, id):
    user = yield User.objects.get(id)
    json_user = to_json_serializable(user)

    withBooks = self.get_query_argument('books')
    if withBooks:
        startDate = self.get_query_argument('fromDate')
        endDate = self.get_query_argument('toDate')
        fromDate = datetime.now()
        if startDate:
            fromDate = datetime.strptime(startDate, '%Y-%m-%d')
        toDate = datetime.now() + timedelta(days=7)
        if endDate: 
            toDate = datetime.strptime(endDate, '%Y-%m-%d')

        books = yield BookedSchedule.objects.filter(user_id=user._id, date__gte=fromDate, date__lte=toDate).order_by('date',direction=DESCENDING).find_all()
        json_user['books'] = to_json_serializable(books)
    else:
        packages = yield UserPackage.objects.filter(user_id=user._id).find_all()
        json_user['packages'] = to_json_serializable(packages)

    self.write(to_json(json_user))
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)

    passWord = None
    if 'password' in data:
        passWord = bcrypt.encrypt(data['password'])
    try :
        user = User(first_name=data['first_name'], 
                    # middle_name=data['middle_name'],
                    last_name=data['last_name'],
                    email=data['email'],
                    password=passWord,
                    # birthdate=datetime.strptime(data['birthdate'],'%Y-%m-%d'),
                    phone_number=data['phone_number'],
                    # emergency_contact=data['emergency_contact'],
                    # address=data['address'],
                    status='Unverified',
                    # profile_pic=data['profile_pic'],
                    credits=0)
        user = yield user.save()
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        str_value = str(value)
        if 'The index "caused" was violated ' in str_value:
            str_value = 'Email already in used'
        self.write(str_value)
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try :
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

    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    user = yield User.objects.get(id)
    user.delete()
    self.finish()