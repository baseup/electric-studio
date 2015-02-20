from app.models.test import User

def index(self):
    print('home.index')
    self.write('home.index')
    self.finish()

def test(self):
    self.write('home.test')

def visit(self):
    self.write('test')
    # self.finish()

def async(self):
    self.render('index')