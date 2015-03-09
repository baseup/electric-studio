import sys
from motorengine.errors import InvalidDocumentError
from app.models.schedules import BookedSchedule, InstructorSchedule
from app.models.packages import UserPackage
from app.models.users import User
import tornado
import json
from datetime import datetime

import tornado.escape

def find(self):

    if self.get_argument('sched_id'):
        sched = yield InstructorSchedule.objects.get(self.get_argument('sched_id'));
        books = yield BookedSchedule.objects.filter(schedule=sched._id,
                              date=datetime.strptime(self.get_argument('date'),'%Y-%m-%d')).find_all()
        self.render_json(books)
    else:
        if self.get_secure_cookie('loginUserID'):
            user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
            user = yield User.objects.get(user_id)
            books = yield BookedSchedule.objects.filter(status='booked', user_id=user._id).find_all()
            self.render_json(books)
        else:
            self.set_status(403)
            self.write('User not logged In')
            self.finish()

def find_one(self, id):
    book = yield BookedSchedule.objects.get(id)
    self.write(book.to_dict())
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    if self.get_secure_cookie('loginUserID'):
        try :
            user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
            user = yield User.objects.get(user_id)

            if user.credits > 0:
                sched = yield InstructorSchedule.objects.get(data['sched_id']);
                book = BookedSchedule(user_id=user._id, 
                                      date=datetime.strptime(data['date'],'%Y-%m-%d'),
                                      schedule=sched._id,
                                      seat_number=data['seat'],
                                      status='booked');

                book = yield book.save()
                if book:
                    user.credits -= 1
                    user = yield user.save();
                    user_packages = yield UserPackage.objects.filter(user_id=user._id).find_all();
                    if user_packages:
                        user_packages[0].remaining_credits -= 1
                        yield user_packages[0].save()
            else:
                self.set_status(403)
                self.write('Unable to book a ride: Insuficient credits');
        except :
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(403)
        self.write('User not logged In')
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