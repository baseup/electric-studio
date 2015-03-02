from passlib.hash import bcrypt
from app.models.users import User
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
    if(self.request.method == 'GET'):
        ticket = self.get_argument('ticket')
        if ticket:
            print(ticket)
            user = yield User.objects.get(ticket)
            if user:
                if user.status == 'Unverified':
                    user.status = 'Active';
                    user = yield user.save()
                    self.set_secure_cookie('loginUser', user.first_name)
                    self.render('verify', success=True)
                else:
                    self.render('verify', success=True, message="Account Already Verified")
            else:
                self.render('verify', success=False, message="Invalid ticket for verication")   
        else:
            self.render('verify', success=False, message="Ticket not found")
    else:
        data = tornado.escape.json_decode(self.request.body)
        if not data:
            self.set_status('403')
            self.write('Invalid Request')
        if 'email' in data:
            users = yield User.objects.filter(email=data['email']).find_all()
            user = users[0].to_dict()
            url = '/verify?ticket=%s' % user['id']

            # send email here 

            self.set_status(403)
            self.write(url)
        self.finish()

