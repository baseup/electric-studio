from app.models.schedules import ClassType
from bson.objectid import ObjectId
import sys
import tornado.escape

def find(self):
    classtypes = yield ClassType.objects.find_all()
    return self.render_json(classtypes)

def find_one(self, id):
    classtype = yield ClassType.objects.get(id)
    return self.render_json(classtype)

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    if data:
        try:
            ct = ClassType(name=data['name'])
            if 'description' in data:
                ct.description = data['description']
            ct = yield ct.save()
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(403)
        self.write('Invalid request')
    return self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    if data:
        try:
            ct = yield ClassType.objects.get(id)
            ct.name = data['name']
            ct.description = data['description']
            ct = yield ct.save()
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(403)
        self.write('Invalid request')
    return self.finish()

def destroy(self, id):
    ct = yield ClassType.objects.get(id)
    ct.delete()
    return self.finish()