from passlib.hash import bcrypt
from app.models.users import User
from app.models.packages import Package, UserPackage
from app.helper import send_verification
from app.models.schedules import InstructorSchedule
from app.models.admins import Instructor, Admin
from datetime import datetime

import sys
import tornado
import urllib
import json

def index(self):
    self.render('index', loginUser=self.get_secure_cookie('loginUser'))

def login(self):
    email = self.get_argument('email')
    passWord = self.get_argument('password')
    login_user = yield User.objects.filter(email=email).find_all()
    if (login_user):
        if bcrypt.verify(passWord, login_user[0].password):
            login_user[0].password = None
            user = login_user[0].to_dict()
            self.set_secure_cookie('loginUser', user['first_name'], expires_days=None)
            self.set_secure_cookie('loginUserID', user['id'], expires_days=None)
            self.set_header("Content-Type", "application/json")
            self.write(json.dumps({ 'success' : True, 'user' : user['id'] }))
        else:
            self.set_status(403)
            self.write('Invalid Password')
    else:
        self.set_status(403)
        self.write('Invalid Email Address')
    self.finish()

def logout(self):
    self.clear_cookie('loginUser')
    self.finish()

def verify(self):
    if self.request.method == 'GET':
        ticket = self.get_argument('ticket')
        if ticket:
            user = yield User.objects.get(ticket)
            if user:
                if user.status == 'Unverified':
                    user.status = 'Active';
                    user = yield user.save()
                    self.set_secure_cookie('loginUser', user.first_name, expires_days=None)
                    self.set_secure_cookie('loginUserID', str(user._id), expires_days=None)
                    self.render('verify', success=True)
                else:
                    self.render('verify', success=True, message='Account Already Verified')
            else:
                self.render('verify', success=False, message='Invalid ticket for verication')   
        else:
            self.render('verify', success=False, message='Ticket not found')
    else:
        data = tornado.escape.json_decode(self.request.body)
        if 'email' in data:
            user = (yield User.objects.get(email=data['email'])).serialize()
            url = self.request.protocol + '://' + self.request.host + '/verify?ticket=%s' % user['_id']
            yield self.io.async_task(send_verification, user=user, url=url)
            self.write(url)
        self.finish()

def buy(self):
    if self.request.method == 'GET':
        self.redirect('/#/rates')
    else:
        success = self.get_argument('success')

        if not self.get_secure_cookie('loginUserID'):
            self.set_status(403)
            self.write('User not logged in')
            self.finish()
        else:
            if success == 'True':
                data = {
                    'payment_type' : self.get_argument('payment_type'),
                    'payer_status' : self.get_argument('payer_status'),
                    'payer_id' : self.get_argument('payer_id'),
                    'payment_date' : self.get_argument('payment_date'),
                    'receiver_id' : self.get_argument('receiver_id'),
                    'verify_sign' : self.get_argument('verify_sign')
                }
                
                try: 
                    pid = self.get_argument('pid');
                    package = yield Package.objects.get(pid)
                    if pid:
                        user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8')
                        user = yield User.objects.get(user_id)

                        transaction = UserPackage()
                        transaction.user_id = user._id
                        transaction.package_id = package._id
                        transaction.credit_count = package.credits
                        transaction.remaining_credits = package.credits
                        transaction.expiration = package.expiration
                        transaction.trans_info = str(data)
                        user.credits += package.credits

                        transaction = yield transaction.save()
                        user = yield user.save()

                        self.redirect('/#/account#packages')
                    else:
                        self.set_status(403)
                        self.write('Package not found')
                        self.finish()
                except :
                    value = sys.exc_info()[1]
                    self.set_status(403)
                    self.write(str(value))  
            else:
                self.redirect('/#/rates')

def addRegularSchedule(self):

    scheds = yield InstructorSchedule.objects.find_all()
    for i, sched in enumerate(scheds):
        yield sched.delete()

    instructors = yield Instructor.objects.find_all()
    print(instructors)
    for i, instructor in enumerate(instructors):
        admin = yield Admin.objects.get(instructor._id)
        yield instructor.delete()
        if admin:
            yield admin.delete()

    adkris = Admin(username='kris', password='kris', first_name='kris', last_name='kris', email='kris@electric.com')
    adkris = yield adkris.save()
    adyessa = Admin(username='yessa', password='yessa', first_name='yessa', last_name='yessa', email='yessa@electric.com')
    adyessa = yield adyessa.save()
    admigs = Admin(username='migs', password='migs', first_name='migs', last_name='migs', email='migs@electric.com')
    admigs = yield admigs.save()
    adabel = Admin(username='abel', password='abel', first_name='abel', last_name='abel', email='abel@electric.com')
    adabel = yield adabel.save()
    admitch = Admin(username='mitch', password='mitch', first_name='mitch', last_name='mitch', email='mitch@electric.com')
    admitch = yield admitch.save()

    kris = Instructor(admin_id=adkris._id, gender='female')
    kris = yield kris.save()
    yessa = Instructor(admin_id=adyessa._id, gender='female')
    yessa = yield yessa.save()
    migs = Instructor(admin_id=admigs._id, gender='male') 
    migs = yield migs.save()
    abel = Instructor(admin_id=adabel._id, gender='male')
    abel = yield abel.save()
    mitch = Instructor(admin_id=admitch._id, gender='female')
    mitch = yield mitch.save()

    days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    times = ['7:00 AM', '9:30 AM', '1:00 PM', '3:30 PM', '5:00 PM']
    endtimes = ['9:30 AM', '1:00 PM', '3:30 PM', '5:00 PM', '7:00 PM']
    instruts = [kris._id, yessa._id, migs._id, abel._id, mitch._id]

    for d, day in enumerate(days):
        for t, time in enumerate(times):
            schedule = InstructorSchedule(instructor=instruts[t], type='regular', day=day,
                                          start=datetime.strptime(time,'%I:%M %p'), 
                                          end=datetime.strptime(endtimes[t],'%I:%M %p'))
            schedule = yield schedule.save()

    self.finish()
