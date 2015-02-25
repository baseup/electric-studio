from motorengine import *

class Privelege(Document):
    module = StringField(required=True)
    actions = ListField(StringField())

class AccessType(Document):
    __collection__ = 'access_types'
    admin_type = StringField(required=True)
    priveleges = EmbeddedDocumentField(embedded_document_type=Privelege)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

class Admin(Document):
    __collection__ = 'admins'
    username = StringField(required=True)
    password = StringField(required=True)
    name = StringField(required=True)
    contact_number = StringField()
    access_type = ReferenceField(reference_document_type=AccessType)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)

class Instructors(Document):
    __collection__ = 'instructors'
    admin_id = ReferenceField(reference_document_type=Admin)
    gender = StringField()
    birthdate = DateTimeField()
    address = StringField()
    image = URLField()
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)


