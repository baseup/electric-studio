import sys
from passlib.hash import bcrypt
from motorengine.errors import InvalidDocumentError
from app.models.users import User
from datetime import datetime
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
        else:
            user.first_name = data['first_name']
            # user.middle_name = data['middle_name']
            user.last_name = data['last_name']

            if user.email != data['email']:
                user.email = data['email']
                user.status = 'Unverified'

            if data['birthdate'] != None:
                user.birthdate = datetime.strptime(data['birthdate'],'%Y-%m-%d')

            user.phone_number = data['phone_number']
            if data['contact_person'] != None:
                user.contact_person = data['contact_person']
            if data['emergency_contact'] != None:
                user.emergency_contact = data['emergency_contact']
            # user.address = data['address']
            # user.status = data['status']
            # user.profile_pic = data['profile_pic']
            # user.credits = data['credits']
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