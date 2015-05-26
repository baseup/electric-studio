from motorengine import *
# from app.models.admins import Admin
from app.helper import mongo_to_dict

class Privilege(Document):
    module = StringField(required=True)
    actions = ListField(StringField())

    def to_dict(self):
       return mongo_to_dict(self)

class AccessType(Document):
    __collection__ = 'access_types'
    admin_type = StringField(required=True)
    privileges = ListField(EmbeddedDocumentField(embedded_document_type=Privilege))
    # changeBy = ReferenceField(reference_document_type=Admin)
    create_at = DateTimeField(auto_now_on_insert=True)
    update_at = DateTimeField(auto_now_on_update=True)
    
    def to_dict(self):
       return mongo_to_dict(self)