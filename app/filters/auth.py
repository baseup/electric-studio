from tornado.web import HTTPError
from tornado.web import *

def login(self):
    if not self.get_secure_cookie('user'):
        self.redirect("/login")
        return False

    return True