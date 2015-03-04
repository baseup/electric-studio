from app.models.admins import Admin
from passlib.hash import bcrypt
import json

def index(self):
    self.render('admin', user=self.get_secure_cookie('user'))

def login(self):
    if self.request.method == 'GET':
        self.render('login')
    else:
        username = self.get_argument('username')
        password = self.get_argument('password')

        admin = yield Admin.objects.get(username=username)
        if not admin or not bcrypt.verify(password, admin.password):
            self.set_secure_cookie('admin_login_invalid', 'Invalid username and password')
            self.redirect('/admin/login')

        self.set_secure_cookie('admin', admin.username)
        self.redirect('/admin/')

def logout(self):
    self.clear_cookie('admin')
    self.redirect('/admin/')

