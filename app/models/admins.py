from motorengine import *
from .access import AccessType
from app.helper import mongo_to_dict
from hurricane.db import Model

class Admin(Model):
    __collection__ = 'admins'
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    contact_number = StringField()
    email = EmailField(required=True)
    access_type = ReferenceField(reference_document_type=AccessType)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)

class Instructor(Model):
    __collection__ = 'instructors'
    __lazy__ = False
    admin_id = ReferenceField(reference_document_type=Admin)
    gender = StringField()
    birthdate = DateTimeField()
    image = StringField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)


