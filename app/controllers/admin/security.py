from app.models.admins import Setting
from passlib.hash import bcrypt
import sys
import tornado.escape

def find(self):
    self.set_status(403);
    sudopass = self.get_query_argument('sudopass')
    if sudopass:
        security_password = yield Setting.objects.get(key='security_password')
        if security_password:
            if bcrypt.verify(sudopass, security_password.value):
                self.set_status(200)
                self.write('Access Granted')
            else:
                self.write('Access Denied')
        else:
            self.write('Access Denied')
    self.finish()