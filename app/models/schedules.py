from motorengine import *
from .admins import Instructor
from .users import User
from .packages import UserPackage
from app.helper import mongo_to_dict
from hurricane.db import Model

class InstructorSchedule(Model):
    __collection__ = 'instructor_schedules'
    __lazy__ = False
    instructor = ReferenceField(reference_document_type=Instructor)
    type = StringField(required=True, default='regular')
    day = StringField()
    date = DateTimeField()
    start = DateTimeField()
    end = DateTimeField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)

class BookedSchedule(Model):
    __collection__ = 'booked_schedules'
    __lazy__ = False
    date = DateTimeField()
    user_id = ReferenceField(reference_document_type=User)
    schedule = ReferenceField(reference_document_type=InstructorSchedule)
    user_package = ReferenceField(reference_document_type=UserPackage)
    seat_number = IntField()
    status = StringField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)
    
    def to_dict(self):
       return mongo_to_dict(self)
    
