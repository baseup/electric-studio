from motorengine import *
from app.helper import mongo_to_dict

class User(Document):
    __collection__ = 'users'
    first_name = StringField(required=True)
    middle_name = StringField()
    last_name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    gender = StringField(max_length=5)
    birthdate = DateTimeField()
    phone_number = StringField()
    emergency_contact = StringField()
    address = StringField()
    status = StringField(default='Active')
    profile_pic = StringField()
    credits = IntField(default=0)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)

