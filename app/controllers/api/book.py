import sys
from motorengine.errors import InvalidDocumentError
from app.models.schedules import BookedSchedule, InstructorSchedule
from app.models.users import User
import tornado
import json
from datetime import datetime

import tornado.escape

def find(self):
    user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
    user = yield User.objects.get(user_id)
    books = yield BookedSchedule.objects.filter(user_id=user._id).find_all()
    self.render_json(books)

def find_one(self, id):
    book = yield BookedSchedule.objects.get(id)
    self.write(book.to_dict())
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    try :
        user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
        user = yield User.objects.get(user_id)

        sched = yield InstructorSchedule.objects.get(data['sched_id']);

        book = BookedSchedule(user_id=user._id, 
                              date=datetime.strptime(data['date'],'%Y-%m-%d'),
                              schedule=sched._id,
                              seat_number=data['seat'],
                              status='booked');
        book = yield book.save()
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try :
        book = yield BookedSchedule.objects.get(id)
        book.date = data['date']
        book.seat_number = data['seat']
        book.status = data['status']
        book = yield book.save()
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    del_package = yield Package.objects.get(id)
    del_package.delete()

    self.finish()