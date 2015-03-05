from motorengine import *
from .users import User
from app.helper import mongo_to_dict
from hurricane.db import Model

class Package(Model):
    __collection__ = 'packages'
    name = StringField(required=True)
    fee = IntField()
    description = StringField(required=True)
    expiration = IntField(required=False, default=30)
    credits = IntField(required=True)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)


class UserPackage(Model):
    __collection__ = 'user_packages'
    __lazy__ = False
    user_id = ReferenceField(reference_document_type=User)
    package_id = ReferenceField(reference_document_type=Package, required=False)
    credit_count = IntField()
    expiration = IntField()
    remaining_credits = IntField()
    notes = StringField()
    trans_info = StringField(default=None)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)
