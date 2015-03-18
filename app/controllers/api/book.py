from motorengine import DESCENDING
from motorengine.errors import InvalidDocumentError
from app.models.schedules import BookedSchedule, InstructorSchedule
from app.helper import send_email_booking, send_email_cancel, send_email_move
from app.models.packages import UserPackage
from app.models.users import User

from datetime import datetime, timedelta
import tornado
import json
import sys

import tornado.escape

def find(self):

    if self.get_argument('sched_id'):
        sched = yield InstructorSchedule.objects.get(self.get_argument('sched_id'));
        books = yield BookedSchedule.objects.filter(status="booked", schedule=sched._id,
                              date=datetime.strptime(self.get_argument('date'),'%Y-%m-%d')).find_all()
        self.render_json(books)
    else:
        if self.get_secure_cookie('loginUserID'):
            user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
            user = yield User.objects.get(user_id)
            if user:
                books = yield BookedSchedule.objects.filter(user_id=user._id, status__ne='cancelled').find_all()
                self.render_json(books)
            else:
                self.finish()
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

                book_status = 'booked'
                if 'status' in data:
                    book_status = data['status']

                book = BookedSchedule(user_id=user._id, 
                                      date=datetime.strptime(data['date'],'%Y-%m-%d'),
                                      schedule=sched._id,
                                      seat_number=data['seat'],
                                      status=book_status);
                if book:
                    user.credits -= 1
                    user_packages = yield UserPackage.objects.order_by("create_at", direction=DESCENDING) \
                                                     .filter(user_id=user._id, remaining_credits__gt=0).find_all()
                    if user_packages:
                        has_valid_package = False
                        for i, user_package in enumerate(user_packages):
                            # check expiration
                            expireDate = user_package.create_at + timedelta(days=user_package.expiration)
                            if datetime.now() > expireDate:
                                continue;

                            has_valid_package = True

                            user_package.remaining_credits -= 1
                            book.user_package = user_package._id
                            
                            yield book.save()
                            user = yield user.save();
                            yield user_package.save()

                            user = (yield User.objects.get(user._id)).serialize()
                            yield self.io.async_task(send_email_booking, 
                                                     user=user, 
                                                     date=data['date'], 
                                                     time=sched.start.strftime('%I:%M %p'), 
                                                     seat_number=str(book.seat_number))
                            break

                        if not has_valid_package:
                            self.set_status(403)
                            self.write('Unable to book a ride: Account doesnt have a valid package.');
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
    if data and self.get_secure_cookie('loginUserID'):
        try :
            book = yield BookedSchedule.objects.get(id)
            ref_book_date = book.date
            ref_book_time = datetime.strptime('0:00','%H:%M')
            if book.schedule:
                ref_book_time = book.schedule.start

            sched = None
            if 'sched_id' in data:
                book.date = datetime.strptime(data['date'], '%Y-%m-%d')
                sched = yield InstructorSchedule.objects.get(data['sched_id']);
                book.schedule = sched._id;
                book.seat_number = data['seat']
            if 'status' in data:
                book.status = data['status']
            yield book.save()
            if book and ('status' in data) and data['status'] == 'cancelled':
                user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
                user = yield User.objects.get(user_id)
                user.credits += 1
                user = yield user.save()
                user_package = yield UserPackage.objects.get(book.user_package._id);
                if user_package:
                    user_package.remaining_credits += 1
                    yield user_package.save()
                yield self.io.async_task(
                    send_email_cancel,
                    user=user.to_dict(),
                    date=book.date.strftime('%Y-%m-%d'),
                    time=book.schedule.start.strftime('%I:%M %p')
                )
            elif 'sched_id' in data and ref_book_date != book.date:
                user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
                user = yield User.objects.get(user_id)
                yield self.io.async_task(
                    send_email_move,
                    user=user.to_dict(),
                    old_date=ref_book_date.strftime('%Y-%m-%d'),
                    new_date=book.date.strftime('%Y-%m-%d'),
                    old_time=ref_book_time.strftime('%I:%M %p'),
                    new_time=sched.start.strftime('%I:%M %p')
                )
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(403)

    self.finish()

def destroy(self, id):
    del_package = yield Package.objects.get(id)
    del_package.delete()

    self.finish()