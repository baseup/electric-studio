from motorengine import *

class User(Document):
    __collection__ = 'users'
    id = IntField(required=True)
    first_name = StringField(required=True)
    middle_name = StringField()
    last_name = StringField(required=True)
    email = EmailField(required=True)
    password = StringField(required=True)
    gender = StringField(max_length=5)
    birthdate = DateTimeField()
    phone_number = StringField()
    emergency_contact = StringField()
    address = StringField()
    status = StringField(default='Active')
    profile_pic = URLField()
    credits = IntField(default=0)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)



