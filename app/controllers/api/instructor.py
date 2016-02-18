
from motorengine.errors import InvalidDocumentError
from app.models.admins import Instructor, Admin
from app.models.schedules import InstructorSchedule
from app.models.access import AccessType
from datetime import datetime
from passlib.hash import bcrypt

import tornado
import json
import sys
    
def find(self):
    deactivated = self.get_query_argument('deactivated')
    query = Instructor.objects;
    if not deactivated:
        query.filter_not(deactivated=True)
    instructors = yield query.find_all()
    
    for i, instructor in enumerate(instructors):
        if instructor.image:
            instructor.image = self.static_url(instructor.image)
        instructor.admin.password = None

    self.render_json(instructors)

def find_one(self, id):
    instructor = yield Instructor.objects.get(id)
    instructor.admin.password = None
    if instructor.image:
        instructor.image = self.static_url(instructor.image)
    self.render_json(instructor)
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    try:
        access_type = yield AccessType.objects.get(admin_type='Instructor')
        admin = Admin(username=data['first_name'],
                      password=data['first_name'],
                      first_name=data['first_name'],
                      last_name=data['last_name'],
                      contact_number=data['contact_number'],
                      email=data['email'],
                      access_type=access_type)

        admin = yield admin.save()
        
        instructor = Instructor(admin=admin._id,
                                gender=data['gender'],
                                birthdate=datetime.strptime(data['birthdate'],'%Y-%m-%d'))
        if 'motto' in data:
            instructor.motto = data['motto']
        instructor = yield instructor.save()
        self.render_json(instructor)
    except:
        if admin: admin.delete()
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()



def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try:
        instructor = yield Instructor.objects.get(id)
        if instructor:
            admin = yield Admin.objects.get(instructor.admin._id)
            if admin:
                admin.first_name = data['first_name']
                admin.last_name = data['last_name']
                admin.contact_number = data['contact_number']
                admin.email = data['email']
                admin = yield admin.save()
            instructor.gender = data['gender']
            if not data['birthdate'] == '':
                instructor.birthdate = datetime.strptime(data['birthdate'],'%Y-%m-%d')
            if 'motto' in data:
                instructor.motto = data['motto']
            if 'deactivated' in data:
                instructor.deactivated = data['deactivated']
            instructor = yield instructor.save()
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    instructor = yield Instructor.objects.get(id)
    scheds = yield InstructorSchedule.objects.filter(instructor=instructor._id).find_all()
    if len(scheds) > 0:
        instructor.deactivated = True;
        yield instructor.save()
    else:
        admin =  yield Admin.objects.get(instructor.admin._id)
        if admin:
            admin.delete()
            instructor.delete()

    self.finish()
