from motorengine import *
from .users import User
from app.helper import mongo_to_dict

class Package(Document):
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


class UserPackage(Document):
    __collection__ = 'user_packages'
    user_id = ReferenceField(reference_document_type=User)
    package_id = ReferenceField(reference_document_type=Package, required=False)
    credit_count = IntField()
    expiration = IntField()
    remaining_credits = IntField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)
