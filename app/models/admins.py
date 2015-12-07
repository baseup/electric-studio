from motorengine import *
from .access import AccessType
from app.helper import mongo_to_dict
from hurricane.db import Model

class Admin(Model):
    __collection__ = 'admins'
    __lazy__ = False
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    contact_number = StringField()
    email = EmailField(required=True)
    access_type = ReferenceField(reference_document_type=AccessType)
    # access_type = StringField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)

class Instructor(Model):
    __collection__ = 'instructors'
    __lazy__ = False
    admin = ReferenceField(reference_document_type=Admin)
    gender = StringField()
    birthdate = DateTimeField()
    image = StringField()
    motto = StringField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)

class Slider(Model):
    __collection__ = 'sliders'
    image = StringField(required=True)
    text = StringField(default=None)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

class LandingPage(Model):
    __collection__ = 'landing_pages'
    image = StringField()
    text = StringField(required=True)
    button_label = StringField(default=None)
    button_link = StringField(default=None)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

class Setting(Model):
    __collection__ = 'settings'
    key = StringField(required=True)
    value = StringField(required=True)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

class Branch(Model):
    __collection__ = 'branches'
    name = StringField(required=True)
    password = StringField(required=True)
    token = StringField(required=True)
    expire_at = DateTimeField(required=True)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)