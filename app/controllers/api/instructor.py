
import sys
from motorengine.errors import InvalidDocumentError
from tornado.web import HTTPError
from app.models.admins import Instructor, Admin
import tornado
import json
from datetime import datetime
    
def find(self):
    instructors = yield Instructor.objects.find_all()
    intructs = {}
    for i, instructor in enumerate(instructors):
        intructs[i] = instructor.to_dict()
        admin = yield Admin.objects.get(intructs[i]['admin_id'])
        intructs[i]['admin'] = admin.to_dict()

    self.write(json.dumps(intructs))
    self.finish()

def find_one(self, id):
    instructor = yield Instructor.objects.get(id)
    if instructor:
        ins_dict = instructor.to_dict()
        admin = yield Admin.objects.get(ins_dict['admin_id'])
        ins_dict['admin'] = admin.to_dict()
        self.write()
    
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    try :
        admin = Admin(username=data['username'],
                      password=data['password'],
                      first_name=data['first_name'],
                      last_name=data['last_name'],
                      contact_number=data['contact_number'],
                      email=data['email'])
        admin = yield admin.save()
        
        instructor = Instructor(admin_id=admin._id,
                                gender=data['gender'],
                                birthdate=datetime.strptime(data['birthdate'],'%Y-%m-%d'))
        instructor = yield instructor.save()
    except :
        if admin: admin.delete()
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()



def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try :
        instructor = yield Instructor.objects.get(id)
        if instructor:
            inst_dict = instructor.to_dict()
            admin = yield Admin.objects.get(inst_dict['admin_id'])
            if admin:
                    admin.username = data['username']
                    admin.password = data['username']
                    admin.first_name = data['first_name']
                    admin.last_name = data['last_name']
                    admin.contact_number = data['contact_number']
                    admin.email = data['email']
                    admin = yield admin.save()
            instructor.gender = data['gender']
            instructor.birthdate = datetime.strptime(data['birthdate'],'%Y-%m-%d')
            instructor = yield instructor.save()
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    instructor = yield Instructor.objects.get(id)
    inst_dict = instructor.to_dict()
    admin =  yield Admin.objects.get(inst_dict['admin_id'])
    if admin:
        admin.delete()
        instructor.delete()

    self.finish()
