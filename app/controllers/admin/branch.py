from app.models.admins import Branch
from app.models.schedules import BookedSchedule
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import sys
import tornado.escape


def find(self):
    branches = yield Branch.objects.find_all()
    return self.render_json(branches)

def find_one(self, id):
    branch = yield Branch.objects.get(id)
    return self.render_json(branch)

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    if data:
        try:
            branch = Branch(name=data['name'], num_bikes=data['num_bikes'])
            branch.password = hashlib.md5('password'.encode()).hexdigest()
            token = 'password' + str(datetime.now())
            branch.token = hashlib.md5(token.encode()).hexdigest()
            branch.expire_at = datetime.now() + timedelta(days=1)
            branch = yield branch.save()
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
            branch = yield Branch.objects.get(id)
            branch.name = data['name']
            branch.num_bikes = data['num_bikes']
            branch = yield branch.save()
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(403)
        self.write('Invalid request')
    return self.finish()

def destroy(self, id):

    branch = yield Branch.objects.get(id)
    bookings = yield BookedSchedule.objects.filter(branch=branch).count()

    if bookings and bookings <= 0:
        branch.delete()
    else:
        self.set_status(403)
        self.write('Unable to delete, branch has bookings')
    return self.finish()