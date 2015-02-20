from motorengine import *

class User(Document):
    __collection__ = 'users'
    first_name = StringField(required=True)
    last_name = StringField(required=True)

class Employee(User):
    employee_id = IntField(required=True)