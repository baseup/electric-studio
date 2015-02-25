from motorengine import *
from .admins import Instructor
from .users import User

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

class BookedSchedules(Document):
    __collection__ = 'booked_schedules'
    date = DateTimeField()
    user_id = ReferenceField(reference_document_type=User)
    instructor_schedule_id = ReferenceField(reference_document_type=InstructorSchedule)
    seat_number = IntField()
    status = StringField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)
    
