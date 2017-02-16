from motorengine import *
from .admins import Instructor, Branch
from .users import User
from .packages import UserPackage
from app.helper import mongo_to_dict
from app.settings import DEFAULT_BRANCH_ID
from hurricane.db import Model
from bson.objectid import ObjectId

class InstructorSchedule(Model):
    __collection__ = 'instructor_schedules'
    __lazy__ = False
    instructor = ReferenceField(reference_document_type=Instructor)
    sub_instructor = ReferenceField(reference_document_type=Instructor, required=False, default=None)
    type = StringField(required=True, default='regular')
    day = StringField()
    date = DateTimeField()
    start = DateTimeField()
    end = DateTimeField()
    seats = IntField(default=37)
    branch = ReferenceField(reference_document_type=Branch, default=ObjectId(DEFAULT_BRANCH_ID))
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
    user_package = ListField(StringField())
    seat_number = IntField()
    status = StringField()
    notes = StringField(required=False)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)
    push_notification_sent = BooleanField(default=False)

    def to_dict(self):
       return mongo_to_dict(self)

class ClassType(Model):
    __collection__ = 'class_types'
    __lazy__ = False
    name = StringField(required=True)
    description = StringField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)
