from passlib.hash import bcrypt
from app.models.users import User
from app.models.packages import Package, UserPackage, GiftCertificate
from app.helper import send_email_verification, send_email
from app.models.schedules import InstructorSchedule, BookedSchedule
from app.models.admins import Instructor, Admin, Setting, Branch
from app.models.access import AccessType, Privilege
from datetime import datetime, timedelta
from bson.objectid import ObjectId
from app.settings import PDT_TOKEN
from tornado.httpclient import HTTPRequest, AsyncHTTPClient
from app.helper import GMT8

import hashlib
import sys
import tornado
import json
import base64
import urllib.parse

def index(self):
    if not self.get_secure_cookie('loginUser') and self.get_secure_cookie('loginUserID'):
        self.clear_cookie('loginUserID')

    user_credits = 0;
    if self.get_secure_cookie('loginUserID'):
        user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8')
        user = yield User.objects.get(user_id)
        user_credits = user.credits
    self.render('index', loginUser=self.get_secure_cookie('loginUser'), credits=user_credits)

def maintenance(self):
    self.render('maintenance')

def login(self):
    email = self.get_argument('email')
    passWord = self.get_argument('password')
    login_user = yield User.objects.filter(email=email.lower(), status__ne='Deactivated').find_all()
    if login_user:
        if bcrypt.verify(passWord, login_user[0].password):
            user = login_user[0]
            if user.status != 'Unverified':
                self.set_secure_cookie('loginUser', user.first_name, expires_days=None)
                self.set_secure_cookie('loginUserID', str(user._id), expires_days=None)
                self.set_header("Content-Type", "application/json")
                self.write(json.dumps({ 'success' : True, 'user' : str(user._id) }))
            else:
                self.set_status(403)
                self.write('User email is not verified, Please check your email for confirmation')
        else:
            self.set_status(403)
            self.write('Invalid Password')
    else:
        self.set_status(403)
        self.write('Account doesn\'t exist')
    self.finish()

def user_migration(self):
    i = 0
    for line in open("user-accounts.csv"):
        d = line.split(",")
        i+=1
        print(" i " + str(i) + " " + d[2])
        user = yield User.objects.get(email=d[2])
        if not user:
            user = User()
            fullname = d[0].split(" ")
            s = len(fullname)
            user.first_name = fullname[0]
            user.last_name = fullname[s -1]
            user.email = d[2]
            if d[1]:
                user.phone_number = d[1]
            user.status = d[3]
            if d[6]:
                user.credits = int(d[6])
            else:
                user.credits = 0
            user.password = bcrypt.encrypt("password")

            user = yield user.save()

            if d[4]:
                if int(d[4]) > 0:
                    package = Package.objects.get(first_timer=True)
                    transaction = UserPackage(user_id=user._id)

                    package = yield Package.objects.get(first_timer=True)
                    transaction.package_id = package._id
                    transaction.package_name = package.name
                    transaction.package_fee = package.fee
                    transaction.package_ft = package.first_timer
                    transaction.credit_count = package.credits
                    transaction.remaining_credits = package.credits
                    transaction.expiration = package.expiration   
                    yield transaction.save()
        else:
            transactions = yield UserPackage.objects.filter(user_id=user._id, status__ne='Expired').find_all()
            
            if len(transactions) > 0:
                if d[6]:
                    outstanding_credit = int(d[6])
                    for transaction in enumerate(transactions):
                        if 'remaining_credits' in transaction:
                            print("arrived here")
                            if outstanding_credit <= transaction.remaining_credits:
                                transaction.remaining_credits = transaction.remaining_credits - outstanding_credit
                            else:
                                transaction.remaining_credits = 0
                                outstanding_credit = outstanding_credit - transaction.remaining_credits
                            yield transaction.save() 
                    user.credits = int(d[6])
                else:
                    user.credits = 0
            else:
                user.credits = 0
            yield user.save()
        yield gen.sleep(0.005)
    print("Total records " + str(i))
    self.finish()

def logout(self):
    self.clear_cookie('loginUser')
    self.clear_cookie('loginUserID')
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
                    user = (yield User.objects.get(user._id)).serialize()
                    host = self.request.protocol + '://' + self.request.host
                    book_url = host + '/#/schedule'
                    pack_url = host + '/#/rates-and-packages'
                    content = str(self.render_string('emails/welcome', user=user, pack_url=pack_url, book_url=book_url), 'UTF-8')
                    yield self.io.async_task(send_email, user=user, content=content, subject='Welcome to Team Electric')
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
            user = yield User.objects.get(email=data['email'], status__ne='Deleted')
            if user:
                user = user.serialize()
                url = self.request.protocol + '://' + self.request.host + '/verify?ticket=%s' % user['_id']
                yield self.io.async_task(
                    send_email_verification,
                    user=user,
                    content=str(self.render_string('emails/registration', user=user, url=url), 'UTF-8')
                )
        self.finish()

def forgot_password(self):
    if self.request.method == 'GET':
        encoded_id = self.get_argument('q')
        user = None
        if encoded_id:
            pass_id = base64.b64decode(encoded_id)
            user = yield User.objects.get(password=str(pass_id, 'UTF-8'))

        self.render('chpass', user=user)

    else:
        data = tornado.escape.json_decode(self.request.body)
        if 'email' in data:
            user = yield User.objects.get(email=data['email'])
            if user:
                encoded_id = base64.b64encode(str(user.password).encode('ascii'))
                url = self.request.protocol + '://' + self.request.host + '/fpass?q=%s' % str(encoded_id, 'UTF-8')

                user = user.serialize()
                yield self.io.async_task(
                send_email,
                    user=user,
                    content=str(self.render_string('emails/resetpass', user=user, url=url), 'UTF-8'),
                    subject='Reset Password'
                )
            else: 
                self.set_status(400)
                self.write('No user found for the specified email address')
        self.finish()

def redeem_gc(self):
    data = tornado.escape.url_unescape(self.request.body)
    redeem_data = tornado.escape.json_decode(data)

    code = redeem_data['code']
    pin = redeem_data['pin']
    gift_certificate = yield GiftCertificate.objects.get(code=code, pin=pin)

    if gift_certificate:

        if gift_certificate.is_redeemed:
            self.set_status(403)
            self.write('Your gift card has already been redeemed.')
            return self.finish()

        if 'checkOnly' in redeem_data: 
            return self.render_json(gift_certificate);
    
        if not self.get_secure_cookie('loginUserID'):
            self.set_status(403)
            self.write('Please sign up or log in to your Electric account.')
            self.finish()
        else:
            try :
                # get user and package
                user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8')
                user = yield User.objects.get(user_id)
                if user.status != 'Frozen' and user.status != 'Unverified':

                    if gift_certificate.package_id.first_timer:
                        ft_package_count = (yield UserPackage.objects.filter(user_id=ObjectId(user_id), package_ft=True).count()) 
                        if ft_package_count > 0:
                            self.set_status(403)
                            self.write('Sorry, you may only avail of the First Timer Package once.')
                            return self.finish()

                    gift_certificate.redeemer_es_id = user._id
                    gift_certificate.redeem_date = datetime.now()
                    gift_certificate.is_redeemed = True
                    # # save this into user transaction
                    transaction = UserPackage()
                    transaction.user_id = user._id
                    transaction.package_id = gift_certificate.package_id._id
                    transaction.package_name = 'GC - ' + gift_certificate.package_id.name
                    transaction.package_fee = gift_certificate.amount
                    transaction.package_ft = gift_certificate.package_id.first_timer
                    transaction.credit_count = gift_certificate.credits
                    transaction.remaining_credits = gift_certificate.credits
                    transaction.expiration = gift_certificate.validity
                    transaction.expire_date = datetime.now() + timedelta(days=gift_certificate.validity)
                    if gift_certificate.pptx:
                        transaction.trans_id = gift_certificate.pptx
                    else:
                        transaction.trans_id = str(user._id) + datetime.now().strftime('%Y%m%d%H%M%S')
                    transaction.trans_info = gift_certificate.trans_info
                    user.credits += gift_certificate.credits

                    gift_certificate = yield gift_certificate.save()
                    transaction = yield transaction.save()
                    user = yield user.save()

                    gift_certificate = yield gift_certificate.save()
                    self.render_json(gift_certificate.to_dict())
                    return
                else:
                    self.set_status(403)
                    self.write("Access Denied")
                    self.finish()

            except :
                value = sys.exc_info()[1]
                str_value = str(value)
                self.write(str_value)
                self.finish()
    else:
        self.set_status(403)
        self.write('Incorrect card code or pin. Please try again.')
        self.finish()

def buy(self):

    success = self.get_argument('success')

    if not self.get_secure_cookie('loginUserID'):
        self.set_status(403)
        self.write('Please sign up or log in to your Electric account.')
        self.redirect('/#/rates?s=error')
    else:
        if success == 'True':

            user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8')
            user = yield User.objects.get(user_id)

            pid = self.get_argument('pid');
            package = yield Package.objects.get(pid)

            pack_name = package.name;
            if not pack_name:
                pack_name = str(package.credits) + ' Ride' + ('s' if package.credits > 1 else '')

            pp_tx = self.get_query_argument('tx')
            pp_st = self.get_query_argument('st')
            pp_amt = self.get_query_argument('amt')
            pp_cc = self.get_query_argument('cc')
            pp_cm = self.get_query_argument('cm')
            pp_item = self.get_query_argument('item_number')

            if not pp_tx:
                self.set_status(403)
                self.redirect('/#/rates?s=error')
                return

            trans_filter = { '$regex' : '.*' + pp_tx + '.*', '$options' : 'i' }
            trans_exists = yield UserPackage.objects.filter(user_id=user._id, trans_info=trans_filter).count()
            has_ft = yield UserPackage.objects.filter(user_id=user._id, package_ft=True).count()

            if trans_exists > 0:
                self.redirect('/#/account?pname=' + pack_name + '&s=success#packages')
                return

            if package.first_timer and has_ft > 0:
                self.redirect('/#/account?s=exists#packages')
                return

            post_body = urllib.parse.urlencode({
                'cmd' : '_notify-synch',
                'tx' : pp_tx,
                'at' : PDT_TOKEN,
            })

            url = 'https://www.paypal.com/cgi-bin/webscr'
            pp_request = HTTPRequest(url=url, method='POST', body=post_body, validate_cert=False)
            pp_response = yield AsyncHTTPClient().fetch(pp_request)
            pp_data = pp_response.body.decode('UTF-8')
            if 'SUCCESS' in pp_data:
                pp_data = pp_data[7:]
                pp_data = pp_data.replace("'",'')
                pp_data = urllib.parse.unquote(pp_data)

                data = {
                    'transaction' : pp_tx,
                    'status' : pp_st,
                    'amount' : pp_amt,
                    'curency' : pp_cc,
                    'cm' : pp_cm,
                    'item_number' : pp_item,
                    'paypal_data' : pp_data
                }

                try: 
                    if pid:           
                        if user.status != 'Frozen' and user.status != 'Unverified':
                            transaction = UserPackage()
                            transaction.user_id = user._id
                            transaction.package_id = package._id
                            transaction.package_name = package.name
                            transaction.package_fee = package.fee
                            transaction.package_ft = package.first_timer
                            transaction.credit_count = package.credits
                            transaction.remaining_credits = package.credits
                            transaction.expiration = package.expiration
                            transaction.expire_date = datetime.now() + timedelta(days=package.expiration)
                            transaction.trans_id = pp_tx
                            transaction.trans_info = str(data)
                            user.credits += package.credits

                            transaction = yield transaction.save()
                            user = yield user.save()

                            user = (yield User.objects.get(user._id)).serialize()
                            site_url = url = self.request.protocol + '://' + self.request.host + '/#/schedule'
                            exp_date = transaction.create_at + timedelta(days=transaction.expiration)
                            content = str(self.render_string('emails/buy', user=user, site=site_url, package=pack_name, expire_date=exp_date.strftime('%B %d, %Y')), 'UTF-8')
                            yield self.io.async_task(send_email, user=user, content=content, subject='Package Purchased')

                            self.redirect('/#/account?pname=' + pack_name + '&s=success#packages')
                        else:
                            self.set_status(403)
                            self.redirect('/#/rates?s=error')
                    else:
                        self.set_status(403)
                        self.redirect('/#/rates?s=error')
                except:
                    value = sys.exc_info()[1]
                    str_value = str(value)
                    if 'The index ' in str_value and ' was violated ' in str_value:
                        self.redirect('/#/account?pname=' + pack_name + '&s=success#packages')
                    else:
                        self.redirect('/#/rates?s=error')
            else:
                self.redirect('/#/rates?s=error')
                print(pp_data)
        else:
            self.redirect('/#/rates?s=error')

def test_waitlist(self):

    if self.get_argument('date'):
        date = datetime.strptime(self.get_argument('date'),'%Y-%m-%d');
        sched = yield InstructorSchedule.objects.get(date=date)
        if not sched:
            sched_id = ObjectId(self.get_argument('sched_id'))
            if sched_id:
                ins = yield Instructor.objects.limit(1).find_all()
                if ins:
                    sched = InstructorSchedule(instructor=ins[0], type='regular', day='mon',
                                               start=datetime.strptime('7:00 AM','%I:%M %p'), 
                                               end=datetime.strptime('9:30 AM','%I:%M %p'))
                    sched = yield sched.save()
            else:
                self.write('Please provide a date')
                self.finish()
                return

        user = yield User.objects.get(email='user@waitlist.com')
        if not user:
            user = User(first_name='user', last_name='user', password='user', email='user@waitlist.com', credits=3)
            user = yield user.save();

        yield BookedSchedule.objects.filter(user_id=user._id).delete()
        currentBooks = yield BookedSchedule.objects.filter(schedule=sched._id).find_all()

        for x in range(0, sched.seats):
            isReserved = False
            for i, book in enumerate(currentBooks):
                if (x + 1) == book.seat_number:
                    isReserved = True
                    break

            if isReserved:
                continue

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
    if user:
        yield BookedSchedule.objects.filter(user_id=user._id).delete();
        yield user.delete()
    self.finish()

def schedule_migrate(self):
    schedules = yield InstructorSchedule.objects.find_all()
    for sched in schedules:
        sched.seats = 37
        sched.save()

    schedules = yield BookedSchedule.objects.find_all();
    for sched in schedules:
        if type(sched.user_package) is not list:
            sched.user_package = [str(sched.user_package._id)]
        else: 
            upacks = []
            for upack in sched.user_package:
                upacks.append(str(upack))
            sched.user_package = upacks;
        yield sched.save()

    self.redirect('/')

def sync_package(self): 

    gmt8 = GMT8()
    users = yield User.objects.limit((yield User.objects.count())).find_all();
    now = datetime.now(tz=gmt8)
    summary = ''
    for user in users:
        user_packs = yield UserPackage.objects.filter(user_id=user._id).find_all()
        credits = 0;
        summary += 'Checking ' + user.email + '<br/>'
        summary += '-- has ' + str(len(user_packs)) + ' user_package<br/>'
        transIds = {}
        for upack in user_packs:

            if upack.package_id:
                if upack.expiration != upack.package_id.expiration:
                    summary += '--[' + str(upack._id) + '] updating expiration from ' + str(upack.expiration) + ' to ' + str(upack.package_id.expiration) + '<br/>'
                    if int(upack.expiration) <= 0:
                        upack.remaining_credits = 0
                    upack.expiration = upack.package_id.expiration

            books = yield BookedSchedule.objects.filter(status__ne="cancelled", user_package=[str(upack._id)]).find_all();
            summary += '--[' + str(upack._id) + '] has ' + str(len(books)) + ' bookings made<br/>'
            if upack.remaining_credits > upack.credit_count:
                summary += '--[' + str(upack._id) + '] updating (' + str(upack._id) + ') remaining credits from ' + str(upack.remaining_credits) + ' to ' + str(upack.credit_count - len(books)) + '<br/>'                                        
                upack.remaining_credits = upack.credit_count - len(books);

            if upack.expire_date != upack.create_at + timedelta(days=upack.expiration):
                summary += '--[' + str(upack._id) + '] updating expire date from ' + str(upack.expire_date) + ' to ' + str(upack.create_at + timedelta(days=upack.expiration)) + '<br/>'
                upack.expire_date = upack.create_at + timedelta(days=upack.expiration)

            if upack.expire_date.replace(tzinfo=gmt8) > now:
                upack.status = 'Active'

            upack = yield upack.save()

            package_deleted = False
            if upack.trans_info:
                try:
                    trans = tornado.escape.json_decode(upack.trans_info.replace('"', '').replace("'",'"'));
                    if trans['transaction'] in transIds:
                        summary += '--[' + str(upack._id) + '] deleting duplicate transaction ' + trans['transaction'] + ' with ' + str(transIds[trans['transaction']]) + '<br/>'
                        if len(books) == 0:
                            yield upack.delete()
                            package_deleted = True
                        else:
                            summary += '--[' + str(upack._id) + '] Warning duplicate transaction not deleted because it has : ' + str(len(books)) + ' booking<br>'
                    else:
                        transIds[trans['transaction']] = upack._id
                        if not upack.trans_id:
                            upack.trans_id = trans['transaction']
                            summary += '---- set transaction id: ' + str(upack.trans_id) + '<br>'
                except:
                    value = sys.exc_info()[1]
                    summary += '--[' + str(upack._id) + '] Warning error on retrieving transaction: ' + str(value) + '<br>'
                    summary += '---- transaction: ' + str(upack.trans_info) + '<br>'
            else:
                if not upack.trans_id:
                    upack.trans_id = str(upack._id)
                    summary += '---- set transaction id: ' + str(upack.trans_id) + '<br>'

            upack = yield upack.save()

            if not package_deleted and upack.status != 'Expired':
                credits += upack.remaining_credits

        if user.credits != credits:
            summary += '-- updating user credits from ' + str(user.credits) + ' to ' + str(credits) + '<br/>'                    
            user.credits = credits
            yield user.save()

    to = {
        "email" : "melvin@greenlemon.co",
        "first_name" : "melvin",
        "last_name" : "maron"
     }

    yield self.io.async_task(send_email, user=to, content=summary, subject='Sync Package Summary')

    self.write(summary);
    self.finish()

def package_migrate(self):

    # user_packages = yield UserPackage.objects.find_all()
    # count = 0;
    # summary = 'count ' + str(len(user_packages)) + '<br>'
    # for upack in user_packages:
        # if upack.package_id:
        #     if not upack.package_name:
        #         upack.package_name = upack.package_id.name
        #     if not upack.package_fee:
        #         upack.package_fee = upack.package_id.fee
        #     if not upack.package_ft:
        #         upack.package_ft = upack.package_id.first_timer
        # if not upack.trans_id:
        #     if upack.trans_info and not upack.is_free:
        #         try:
        #             trans = tornado.escape.json_decode(upack.trans_info.replace('"', '').replace("'",'"'));
        #             if trans['transaction']:
        #                 upack.trans_id = trans['transaction']
        #             else:
        #                 upack.trans_id = str(upack._id) + datetime.now().strftime('%Y%m%d%H%M%S')
        #         except:
        #             value = sys.exc_info()[1]
        #             print('Package Migrate Error (' + str(upack._id) + '): ' + str(value))
        #     else:    
        #         upack.trans_id = str(upack._id) + datetime.now().strftime('%Y%m%d%H%M%S')

        #     count += 1
        #     summary += str(count) + ' : ' + str(upack._id) + ' - ' + upack.trans_id + '<br>'

        # if not upack.expire_date:
        #     upack.expire_date = upack.create_at + timedelta(days=upack.expiration)
        # if not upack.status:
        #     upack.status = 'Active'
    #     yield upack.save()

    # self.write(summary)
    # self.finish()

    self.redirect('/')

def add_default_sudopass(self): 
    setting = yield Setting.objects.get(key='security_password')
    if not setting:
        setting = Setting()
        setting.key = 'security_password'
        setting.value = bcrypt.encrypt('es456')
        yield setting.save()
    self.finish()

def add_regular_schedule(self):

    admins = yield Admin.objects.find_all()
    access = yield AccessType.objects.get(admin_type='Admin')

    for i, a in enumerate(admins):
        yield a.delete()

    admin = Admin()
    admin.username = 'admin'
    admin.password = bcrypt.encrypt('admin')
    admin.first_name = 'Admin First Name'
    admin.last_name = 'Admin Last Name'
    admin.email = 'admin@electricstudio.ph'
    admin.access_type = access._id
    yield admin.save()
    
    scheds = yield InstructorSchedule.objects.find_all()
    for i, sched in enumerate(scheds):
        yield BookedSchedule.objects.filter(schedule=sched._id).delete()
        yield sched.delete()

    instructors = yield Instructor.objects.find_all()
    for i, instructor in enumerate(instructors):
        admin = yield Admin.objects.get(instructor._id)
        yield instructor.delete()
        if admin:
            yield admin.delete()

    access = yield AccessType.objects.get(admin_type='Instructor')

    adkris = Admin(username='kris', password=bcrypt.encrypt('kris'), first_name='kris', last_name='kris', email='kris@electric.com', access_type=access._id)
    adkris = yield adkris.save()
    adyessa = Admin(username='yessa', password=bcrypt.encrypt('yessa'), first_name='yessa', last_name='yessa', email='yessa@electric.com', access_type=access._id)
    adyessa = yield adyessa.save()
    admigs = Admin(username='migs', password=bcrypt.encrypt('migs'), first_name='migs', last_name='migs', email='migs@electric.com', access_type=access._id)
    admigs = yield admigs.save()
    adabel = Admin(username='abel', password=bcrypt.encrypt('abel'), first_name='abel', last_name='abel', email='abel@electric.com', access_type=access._id)
    adabel = yield adabel.save()
    admel = Admin(username='mel', password=bcrypt.encrypt('mel'), first_name='mel', last_name='mel', email='mel@electric.com', access_type=access._id)
    admel = yield admel.save()
    adrache = Admin(username='rache', password=bcrypt.encrypt('rache'), first_name='rache', last_name='rache', email='rache@electric.com', access_type=access._id)
    adrache = yield adrache.save()
    adraisa = Admin(username='raisa', password=bcrypt.encrypt('raisa'), first_name='raisa', last_name='raisa', email='raisa@electric.com', access_type=access._id)
    adraisa = yield adraisa.save()
    adtrish = Admin(username='trish', password=bcrypt.encrypt('trish'), first_name='trish', last_name='trish', email='trish@electric.com', access_type=access._id)
    adtrish = yield adtrish.save()
    adarmand = Admin(username='armand', password=bcrypt.encrypt('armand'), first_name='armand', last_name='armand', email='armand@electric.com', access_type=access._id)
    adarmand = yield adarmand.save()
    admitch = Admin(username='mitch', password=bcrypt.encrypt('mitch'), first_name='mitch', last_name='mitch', email='mitch@electric.com', access_type=access._id)
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

    # days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    # times = ['7:00 AM', '9:30 AM', '1:00 PM', '3:30 PM', '5:00 PM']
    # endtimes = ['9:30 AM', '1:00 PM', '3:30 PM', '5:00 PM', '7:00 PM']
    # instruts = [kris._id, yessa._id, migs._id, abel._id, mitch._id]

    # for d, day in enumerate(days):
    #     for t, time in enumerate(times):
    #         schedule = InstructorSchedule(instructor=instruts[t], type='regular', day=day,
    #                                       start=datetime.strptime(time,'%I:%M %p'), 
    #                                       end=datetime.strptime(endtimes[t],'%I:%M %p'))
    #         schedule = yield schedule.save()

    self.redirect('/')

def add_branch(self):

    branches = yield Branch.objects.find_all()
    for i, a in enumerate(branches):
        yield a.delete()

    branch = Branch()
    branch.name = 'ES Sample Branch'
    branch.password = hashlib.md5('password'.encode()).hexdigest()
    token = 'password' + str(datetime.now())
    branch.token = hashlib.md5(token.encode()).hexdigest()
    branch.expire_at = datetime.now() + timedelta(days=1)

    yield branch.save()
    
    self.redirect('/')

def add_access_types(self):

    accessTypes = yield AccessType.objects.find_all()
    for i, a in enumerate(accessTypes):
        yield a.delete()

    analytics = Privilege(module='analytics', actions=['read'])
    accounts = Privilege(module='accounts', actions=['create', 'update','read', 'freeze', 'unfreeze', 'delete', 'update_expiration', 'export_data', 'manual_buy', 'complimentary_class'])
    packages = Privilege(module='packages', actions=['read', 'create','update_expiration', 'update', 'delete'])
    schedules = Privilege(module='schedules', actions=['create', 'read', 'update', 'delete', 'move_bike'])
    users = Privilege(module='users', actions=['create', 'read', 'update', 'delete'])
    instructors = Privilege(module='instructors', actions=['create', 'read', 'update', 'delete'])
    sliders = Privilege(module='sliders', actions=['read', 'update', 'create', 'delete'])
    transactions = Privilege(module='transactions', actions=['read', 'create', 'update', 'delete'])
    settings = Privilege(module='settings', actions=['read', 'block_bike'])

    staffAccessType = AccessType(admin_type='Staff')
    staffAccessType.privileges = [Privilege(module='accounts', actions=['create','update','read','manual_buy']),schedules]
    yield staffAccessType.save()

    staffAccessType = AccessType(admin_type='Instructor')
    yield staffAccessType.save()

    managerAccessType = AccessType(admin_type='Manager')
    managerAccessType.privileges = [analytics, packages, instructors, sliders, settings, transactions, schedules, accounts, settings]
    yield managerAccessType.save()

    adminAccessType = AccessType(admin_type='Admin')
    adminAccessType.privileges = [analytics, packages, instructors, sliders, settings, transactions, schedules, accounts, settings, users]
    yield adminAccessType.save()

    self.redirect('/add_regular_schedules')


