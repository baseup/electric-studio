from app.models.admins import Admin
import json

def index(self):
    self.render('admin', user=self.get_secure_cookie('user'))

def login(self):
    if(self.request.method == 'GET'):
        self.render('login')
    else:

        user = self.get_argument('username')
        passWord = self.get_argument('password')

        login_admin = yield Admin.objects.filter(username=user).filter(password=passWord).find_all()
        if (login_admin):
            login_admin[0].password = None
            self.set_secure_cookie('user', login_admin[0].username)
        
        self.redirect('/admin')

def logout(self):
    self.clear_cookie('user')
    self.redirect('/admin')

def addSampleAdmin(self):
    admin = Admin(username="admin", password="admin", name="Sample")
    admin = yield admin.save()
    if (admin):
        self.write(admin)

