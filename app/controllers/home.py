from passlib.hash import bcrypt
from app.models.users import User
from app.models.packages import Package, UserPackage
from app.helper import send_verification

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
            self.set_secure_cookie('loginUser', user['first_name'])
            self.set_secure_cookie('loginUserID', user['id'])
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
                    self.set_secure_cookie('loginUser', user.first_name)
                    self.set_secure_cookie('loginUserID', str(user._id))
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
        if success == 'True':

            data = {
                'payment_type' : self.get_argument('payment_type'),
                'payer_status' : self.get_argument('payer_status'),
                'payer_id' : self.get_argument('payer_id'),
                'payment_date' : self.get_argument('payment_date'),
                'receiver_id' : self.get_argument('receiver_id'),
                'verify_sign' : self.get_argument('verify_sign')
            }
            
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

                transaction = yield transaction.save()

                self.redirect('/#/account#packages')
            else:
                self.set_status(403)
                self.write('Package not found')
                self.finish()
        else:
            self.redirect('/#/rates')

