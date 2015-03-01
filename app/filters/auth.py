from tornado.web import HTTPError
from tornado.web import *

def admin(self):
    if not self.get_secure_cookie('admin'):
        self.redirect("/login")
        return False
    return True
