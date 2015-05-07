from motorengine import DESCENDING, ASCENDING
from motorengine.errors import InvalidDocumentError
from app.models.schedules import BookedSchedule, InstructorSchedule
from app.helper import send_email_booking, send_email_cancel, send_email_move, send_email
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
        is_waitlist = self.get_argument('waitlist')

        if not is_waitlist:
            books = yield BookedSchedule.objects.filter(status='booked', schedule=sched._id,
                                  date=datetime.strptime(self.get_argument('date'),'%Y-%m-%d')).find_all()
            self.render_json(books)
        else:
            waitlist = yield BookedSchedule.objects.filter(status='waitlisted', schedule=sched._id,
                                  date=datetime.strptime(self.get_argument('date'),'%Y-%m-%d')).find_all()
            self.render_json(waitlist)

    else:
        if self.get_secure_cookie('loginUserID'):
            user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
            user = yield User.objects.get(user_id)
            if user:
                books = yield BookedSchedule.objects.filter(user_id=user._id, status__ne='cancelled') \
                                                    .filter(status__ne='missed') \
                                                    .filter(status__ne='completed').find_all()
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
        try:
            user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
            user = yield User.objects.get(user_id)
            if user.status != 'Frozen' and user.status != 'Unverified':
                if user.credits > 0:
                    sched = yield InstructorSchedule.objects.get(data['sched_id']);
                    
                    seats = data['seats']
                    book_status = 'booked'
                    if 'status' in data:
                        book_status = data['status']
                    
                    if book_status == 'booked':
                        seats_unavailable = []
                        seats_reserved = yield BookedSchedule.objects.filter({'seat_number':{'$in':seats}}) \
                                                                    .filter(schedule=sched._id) \
                                                                    .filter(status=book_status).find_all()
                        
                        if len(seats_reserved):
                            for i, seat_reserved in enumerate(seats_reserved):
                                seats_unavailable.append(seat_reserved.seat_number)

                            self.set_status(403)
                            msg = 'Seats ' if len(seats_unavailable) > 1 else 'Seat '
                            self.write('Unable to book a ride:'+ msg + str(seats_unavailable) +' unavailable');
                            self.finish()
                            return;

                    elif book_status == 'waitlisted':
                        seats.append(0)
                    
                    for seat in seats:
                        book = BookedSchedule(user_id=user._id, 
                                              date=datetime.strptime(data['date'],'%Y-%m-%d'),
                                              schedule=sched._id,
                                              seat_number=seat,
                                              status=book_status);
                            
                        if book:
                            user.credits -= 1
                            user_packages = yield UserPackage.objects.order_by("expire_date", direction=ASCENDING) \
                                                             .filter(user_id=user._id, remaining_credits__gt=0, status__ne='Expired').find_all()
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
                                    user = yield user.save()
                                    yield user_package.save() 

                                    serialized_user = (yield User.objects.get(user._id)).serialize()
                                    if book_status == 'booked':
                                        content = str(self.render_string('emails/booking', 
                                                                         date=sched.date.strftime('%A, %B %d, %Y'), 
                                                                         type=sched.type, 
                                                                         user=serialized_user, 
                                                                         instructor=sched.instructor, 
                                                                         time=sched.start.strftime('%I:%M %p'), 
                                                                         seat_number=str(book.seat_number)), 'UTF-8')
                                        yield self.io.async_task(send_email_booking, user=serialized_user, content=content)
                                    elif book_status == 'waitlisted':
                                        content = str(self.render_string('emails/waitlist', 
                                                                         date=sched.date.strftime('%A, %B %d, %Y'), 
                                                                         type=sched.type, 
                                                                         user=serialized_user, 
                                                                         instructor=sched.instructor, 
                                                                         time=sched.start.strftime('%I:%M %p')), 'UTF-8')
                                        yield self.io.async_task(send_email, user=serialized_user, content=content, subject='Waitlisted')
                                    break

                                if not has_valid_package:
                                    self.set_status(403)
                                    self.write('Unable to book a ride: Account doesnt have a valid package.');

                else:
                    self.set_status(403)
                    self.write('Unable to book a ride: Insuficient credits');
            else:
                self.set_status(403)
                self.write('Invalid User Status');
        except:
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
        try:
            book = yield BookedSchedule.objects.get(id)
            ref_book_date = book.date
            ref_book_time = datetime.strptime('0:00','%H:%M')
            ref_sched_id = book.schedule._id
            ref_book_status = book.status
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

                if ref_book_status == 'waitlisted':
                    content = str(self.render_string('emails/waitlist_removed', 
                                                      date=book.date.strftime('%A, %B %d, %Y'), 
                                                      user=user.to_dict(), 
                                                      type=book.schedule.type,
                                                      seat_number=book.seat_number, 
                                                      instructor=book.schedule.instructor, 
                                                      time=book.schedule.start.strftime('%I:%M %p')), 'UTF-8')
                    yield self.io.async_task(send_email, user=user.to_dict(), content=content, subject='Waitlist Canceled')
                else:
                    yield self.io.async_task(
                        send_email_cancel,
                        user=user.to_dict(),
                        content=str(self.render_string('emails/cancel', 
                                                       type=book.schedule.type, 
                                                       instructor=book.schedule.instructor, 
                                                       user=user.to_dict(), 
                                                       date=book.date.strftime('%A, %B %d, %Y'), 
                                                       seat_number=book.seat_number, 
                                                       time=book.schedule.start.strftime('%I:%M %p')), 'UTF-8')
                        
                    )
            elif 'sched_id' in data and str(ref_sched_id) != str(data['sched_id']):
                user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
                user = yield User.objects.get(user_id)
                yield self.io.async_task(
                    send_email_move,
                    content=str(self.render_string('emails/moved', 
                                                   type=sched.type, 
                                                   user=user.to_dict(), 
                                                   instructor=sched.instructor, 
                                                   date=book.date.strftime('%A, %B %d, %Y'), 
                                                   seat_number=book.seat_number, 
                                                   time=sched.start.strftime('%I:%M %p')), 'UTF-8'),
                    user=user.to_dict()
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