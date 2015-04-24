from app.models.admins import Setting
from passlib.hash import bcrypt
import sys
import tornado.escape

def create(self):
    self.set_status(403);
    data = tornado.escape.json_decode(self.request.body)
    sudopass = data['sudopass']
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