from passlib.hash import bcrypt
from motorengine.errors import InvalidDocumentError
from app.models.admins import Admin
from app.models.access import AccessType
import tornado
import json
import sys
    
def find(self):
    administrators = yield Admin.objects.find_all()
    # for i, admin in enumerate(administrators):
    #     administrators[i]['admin_type'] = admin.access_type.admin_type
    self.render_json(administrators)

def find_one(self, id):
    admin = yield Admin.objects.get(id)
    # admin.admin_type = admin.access_type.admin_type
    self.write(admin.to_dict())
    self.finish()

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    password = None
    if 'password' in data:
        password = bcrypt.encrypt(data['password'])

    is_exist = (yield Admin.objects.filter(email=data['email']).count())
    if is_exist > 0:
        self.set_status(400)
        self.write('Email address is already in use.')
    else:
        try:
            access_type = yield AccessType.objects.get(admin_type=data['access_type'])
            admin = Admin(username=data['username'], 
                              password=password,
                              last_name=data['last_name'],
                              first_name=data['first_name'],
                              email=data['email'], 
                              access_type=access_type)
            admin = yield admin.save()

        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            str_value = str(value)
            self.write(str_value)
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    password = None
    if 'password' in data:
        password = bcrypt.encrypt(data['password'])
    try:
        access_type = yield AccessType.objects.get(admin_type=data['admin_type'])
        admin = yield Admin.objects.get(id)
        admin.username = data['username']
        admin.email = data['email']
        # admin.password = password
        admin.first_name = data['first_name']
        admin.last_name = data['last_name']
        admin.contact_number = data['contact_number']
        admin.access_type = access_type._id
        admin = yield admin.save()
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    del_admin = yield Admin.objects.get(id)
    del_admin.delete()
    self.finish()

