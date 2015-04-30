from motorengine.errors import InvalidDocumentError
from app.models.admins import Admin
import tornado
import json
    
def find(self):
    administrators = yield Admin.objects.find_all()
    admins = {}
    for i, admin in enumerate(administrators):
        admins[i] = admin.to_dict()
    self.write(json.dumps(admins))
    self.finish()

def find_one(self, id):
    admin = yield Admin.objects.get(id)
    self.write(admin.to_dict())
    self.finish()

# def create(self):

#     data = tornado.escape.json_decode(self.request.body)
#     try:
#         admin = Admin(username=data['username'], 
#                           password=data['password'],
#                           name=data['name'],
#                           contact_number=data['contact_number'],
#                           access_type=data['access_type'])
#         admin = yield admin.save()
#     except InvalidDocumentError as e:
#         self.write(e)
#     self.finish()



# def update(self, id):
#     data = tornado.escape.json_decode(self.request.body)
#     try:
#         package = yield Package.objects.get(id)
#         package.name = data['name']
#         package.fee = data['fee']
#         package.description = data['description']
#         package.expiration = data['expiration']
#         package.credits = data['credits']
#         package = yield package.save()
#     except InvalidDocumentError as e:
#         self.write(e)
#     self.finish()

# def destroy(self, id):
#     del_package = yield Package.objects.get(id)
#     del_package.delete()

    self.finish()
