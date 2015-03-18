from passlib.hash import bcrypt
from app.models.users import User
from app.models.packages import Package, UserPackage
from app.helper import send_email_verification
from app.models.schedules import InstructorSchedule, BookedSchedule
from app.models.admins import Instructor, Admin
from datetime import datetime
from bson.objectid import ObjectId
import sys
import tornado
import json

def index(self):
    self.render('index', loginUser=self.get_secure_cookie('loginUser'))

def login(self):
    email = self.get_argument('email')
    passWord = self.get_argument('password')
    login_user = yield User.objects.filter(email=email).find_all()
    if (login_user):
        if bcrypt.verify(passWord, login_user[0].password):
            user = login_user[0]
            self.set_secure_cookie('loginUser', user.first_name, expires_days=None)
            self.set_secure_cookie('loginUserID', str(user._id), expires_days=None)
            self.set_header("Content-Type", "application/json")
            self.write(json.dumps({ 'success' : True, 'user' : str(user._id) }))
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
            yield self.io.async_task(send_email_verification, user=user, url=url)
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

def test_waitlist(self):

    if self.get_argument('date'):
        date = datetime.strptime(self.get_argument('date'),'%Y-%m-%d');
        sched_id = ObjectId(self.get_argument('sched_id'))
        sched = yield InstructorSchedule.objects.get(sched_id)
        if not sched:
            ins = yield Instructor.objects.limit(1).find_all()
            if ins:
                sched = InstructorSchedule(instructor=ins[0], type='regular', day='mon',
                                           start=datetime.strptime('7:00 AM','%I:%M %p'), 
                                           end=datetime.strptime('9:30 AM','%I:%M %p'))
                sched = yield sched.save()

        user = yield User.objects.get(email='user@waitlist.com')
        if not user:
            user = User(first_name='user', last_name='user', password='user', email='user@waitlist.com', credits=3)
            user = yield user.save();

        yield BookedSchedule.objects.filter(user_id=user._id).delete()
        for x in range(0, 37):
            if user:            
                book = BookedSchedule(user_id=user._id, 
                                      date=date,
                                      schedule=sched._id,
                                      seat_number=x + 1,
                                      status='booked');
                book = yield book.save()
    else:
        self.write('Please provide a date')
    self.finish()

def remove_test_waitlist(self):
    user = yield User.objects.get(email='user@waitlist.com')
    yield BookedSchedule.objects.filter(user_id=user._id).delete();
    yield user.delete()


def add_regular_schedule(self):

    admins = yield Admin.objects.find_all()
    for i, a in enumerate(admins):
        yield a.delete()

    admin = Admin()
    admin.username = 'admin'
    admin.password = bcrypt.encrypt('admin')
    admin.first_name = 'Admin First Name'
    admin.last_name = 'Admin Last Name'
    admin.email = 'admin@electricstudio.ph'
    yield admin.save()
    
    scheds = yield InstructorSchedule.objects.find_all()
    for i, sched in enumerate(scheds):
        yield sched.delete()

    instructors = yield Instructor.objects.find_all()
    for i, instructor in enumerate(instructors):
        admin = yield Admin.objects.get(instructor._id)
        yield instructor.delete()
        if admin:
            yield admin.delete()

    adkris = Admin(username='kris', password=bcrypt.encrypt('kris'), first_name='kris', last_name='kris', email='kris@electric.com')
    adkris = yield adkris.save()
    adyessa = Admin(username='yessa', password=bcrypt.encrypt('yessa'), first_name='yessa', last_name='yessa', email='yessa@electric.com')
    adyessa = yield adyessa.save()
    admigs = Admin(username='migs', password=bcrypt.encrypt('migs'), first_name='migs', last_name='migs', email='migs@electric.com')
    admigs = yield admigs.save()
    adabel = Admin(username='abel', password=bcrypt.encrypt('abel'), first_name='abel', last_name='abel', email='abel@electric.com')
    adabel = yield adabel.save()
    admel = Admin(username='mel', password=bcrypt.encrypt('mel'), first_name='mel', last_name='mel', email='mel@electric.com')
    admel = yield admel.save()
    adrache = Admin(username='rache', password=bcrypt.encrypt('rache'), first_name='rache', last_name='rache', email='rache@electric.com')
    adrache = yield adrache.save()
    adraisa = Admin(username='raisa', password=bcrypt.encrypt('raisa'), first_name='raisa', last_name='raisa', email='raisa@electric.com')
    adraisa = yield adraisa.save()
    adtrish = Admin(username='trish', password=bcrypt.encrypt('trish'), first_name='trish', last_name='trish', email='trish@electric.com')
    adtrish = yield adtrish.save()
    adarmand = Admin(username='armand', password=bcrypt.encrypt('armand'), first_name='armand', last_name='armand', email='armand@electric.com')
    adarmand = yield adarmand.save()
    admitch = Admin(username='mitch', password=bcrypt.encrypt('mitch'), first_name='mitch', last_name='mitch', email='mitch@electric.com')
    admitch = yield admitch.save()

    kris = Instructor(admin=adkris._id, gender='female', image='images/instructors/instructor-kris.jpg')
    kris.motto = 'Party on the bike with me for a high energy ride that will leave you feeling stronger inside and out. Together let’s push beyond the impossible while riding as one.'
    kris = yield kris.save()
    yessa = Instructor(admin=adyessa._id, gender='female', image='images/instructors/instructor-yessa.jpg')
    yessa.motto = 'Look no further, want much more. The music matters, once you walk through my door. #ridewithyu'
    yessa = yield yessa.save()
    migs = Instructor(admin=admigs._id, gender='male', image='images/instructors/instructor-migs.jpg') 
    migs.motto = "Clip in and find yourself letting everything go. My class will help you feel challenged and accomplished down to the very last energetic beat. We ride to improve and we'll do it all together."
    migs = yield migs.save()
    abel = Instructor(admin=adabel._id, gender='male', image='images/instructors/instructor-abel.jpg')
    abel.motto = 'Ride with me for a motivating workout that you can control at your own pace. It can be as easy or as challenging as you want it to be. Like many things in life, you will get what you put into it #abletoride'
    abel = yield abel.save()
    mitch = Instructor(admin=admitch._id, gender='female', image='images/instructors/instructor-mitch.jpg')
    mitch.motto = 'My ride will empower you to discover your strengths and help you forget your fears. Each pedal stroke will bring you to the next level of excitement and fitness.  Find out what you have and what you can.  Possibilities are endless.'
    mitch = yield mitch.save()
    mel = Instructor(admin=admel._id, gender='female', image='images/instructors/instructor-mel.jpg')
    mel.motto = 'Party on the bike with me for a high energy ride that will leave you feeling stronger inside and out. Together let’s push beyond the impossible while riding as one.'
    mel = yield mel.save()
    rache = Instructor(admin=adrache._id, gender='female', image='images/instructors/instructor-rachel.jpg')
    rache.motto = 'Look no further, want much more. The music matters, once you walk through my door. #ridewithyu'
    rache = yield rache.save()
    raisa = Instructor(admin=adraisa._id, gender='male', image='images/instructors/instructor-raisa.jpg') 
    raisa.motto = "Clip in and find yourself letting everything go. My class will help you feel challenged and accomplished down to the very last energetic beat. We ride to improve and we'll do it all together."
    raisa = yield raisa.save()
    trish = Instructor(admin=adtrish._id, gender='male', image='images/instructors/instructor-trish.jpg')
    trish.motto = 'Ride with me for a motivating workout that you can control at your own pace. It can be as easy or as challenging as you want it to be. Like many things in life, you will get what you put into it #abletoride'
    trish = yield trish.save()
    armand = Instructor(admin=adarmand._id, gender='female', image='images/instructors/instructor-armand.jpg')
    armand.motto = 'My ride will empower you to discover your strengths and help you forget your fears. Each pedal stroke will bring you to the next level of excitement and fitness.  Find out what you have and what you can.  Possibilities are endless.'
    armand = yield armand.save()

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
