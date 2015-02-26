from motorengine import *
from .admins import Instructor
from .users import User
from app.helper import mongo_to_dict

class InstructorSchedule(Document):
    __collection__ = 'instructor_schedules'
    instructor_id = ReferenceField(reference_document_type=Instructor)
    type = StringField(required=True, default='regular')
    day = StringField()
    date = DateTimeField()
    start_time = DateTimeField()
    end_time = DateTimeField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)

class BookedSchedules(Document):
    __collection__ = 'booked_schedules'
    date = DateTimeField()
    user_id = ReferenceField(reference_document_type=User)
    instructor_schedule_id = ReferenceField(reference_document_type=InstructorSchedule)
    seat_number = IntField()
    status = StringField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)
    
    def to_dict(self):
       return mongo_to_dict(self)
    
