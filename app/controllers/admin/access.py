from app.models.access import AccessType
import sys
import tornado.escape

def find(self):
    accessTypes = yield AccessType.objects.find_all()
    self.render_json(accessTypes)

def find_one(self, id):
    accessType = yield AccessType.objects.get(id)
    self.write({'admin_type': accessType.admin_type})
    self.finish()
