from motorengine import *
from .users import User
from app.helper import mongo_to_dict
from hurricane.db import Model

class Package(Model):
    __collection__ = 'packages'
    name = StringField()
    fee = DecimalField(required=True)
    description = StringField()
    expiration = IntField(required=False, default=30)
    credits = IntField(required=True)
    first_timer = BooleanField(default=False)
    special_package = BooleanField(default=False)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)


class UserPackage(Model):
    __collection__ = 'user_packages'
    __lazy__ = False
    user_id = ReferenceField(reference_document_type=User)
    package_id = ReferenceField(reference_document_type=Package, required=False)
    package_name = StringField(required=False)
    package_fee = DecimalField(required=False, default='0.00')
    package_ft = BooleanField(required=False, default=False)
    credit_count = IntField(required=True)
    expiration = IntField(required=True)
    expire_date = DateTimeField(required=False)
    remaining_credits = IntField(required=True)
    status = StringField(default='Active')
    notes = StringField()
    is_free = BooleanField(default=False)
    trans_info = StringField(default=None)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)

class Product(Model):
    __collection__ = 'products'
    name = StringField(required=True)
    amount = DecimalField()
    quantity = IntField(required=True)
    product_desc = StringField(default=None)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)   

class UserProduct(Model):
    __collection__ = 'user_products'
    __lazy__ = False
    user_id = ReferenceField(reference_document_type=User)
    product_id = ReferenceField(reference_document_type=Product, required=False)
    product_name = StringField(required=False)
    product_amount = DecimalField(required=False, default='0.00')
    quantity = IntField(required=True)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

    def to_dict(self):
       return mongo_to_dict(self)