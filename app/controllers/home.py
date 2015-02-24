from app.models.users import User

def index(self):
    self.render('index')

def classes(self):
    self.render('ng-templates/admin/class')

def package(self):
    self.render('ng-templates/admin/package')

def schedule(self):
    self.render('ng-templates/admin/schedule')

def account(self):
    self.render('ng-templates/admin/account')

def slider(self):
    self.render('ng-templates/admin/slider')

def login(self):
    if(self.request.method == 'GET'):
        self.render('login')
    else:
        self.set_secure_cookie('user', self.get_argument("name"))
        self.redirect('/')

def logout(self):
    self.clear_cookie('user')
    self.redirect('/')
