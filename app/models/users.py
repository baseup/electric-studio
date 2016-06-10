from motorengine import *
from app.helper import mongo_to_dict
from hurricane.db import Model

class User(Model):
    __collection__ = 'users'
    first_name = StringField(required=True)
    middle_name = StringField(required=False)
    last_name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    gender = StringField(max_length=5)
    birthdate = DateTimeField(required=False)
    phone_number = StringField(required=False)
    contact_person = StringField(required=False)
    emergency_contact = StringField(required=False)
    address = StringField(required=False)
    address2 = StringField(required=False)
    billing = JsonField(required=False)
    status = StringField(default='Active')
    remarks = StringField(required=False)
    profile_pic = StringField(required=False)
    agreed_terms = BooleanField(default=False)
    credits = IntField(default=0)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)
    notes = StringField(required=False)

    def to_dict(self):
       return mongo_to_dict(self)
