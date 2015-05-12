from motorengine import DESCENDING, ASCENDING
from app.models.schedules import BookedSchedule, InstructorSchedule
from app.models.users import User
from datetime import datetime
from bson.objectid import ObjectId
import csv

def download_bookings(self):
    sched_id = self.get_query_argument('sched_id')
    if sched_id:
        sched = yield InstructorSchedule.objects.get(self.get_argument('sched_id')); 
        bookings = yield BookedSchedule.objects.filter(schedule=sched._id).find_all()

        filename = 'bookings-' + datetime.now().strftime('%Y-%m-%d %H:%I') + '.csv'
        with open(filename, 'w') as csvfile:
            fieldnames = ['first_name', 'last_name', 'seat number', 'status', 'date', 'start', 'end', 'client signature']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for b in bookings:
                writer.writerow({
                    'first_name': b.user_id.first_name,
                    'last_name': b.user_id.last_name,
                    'seat number': b.seat_number,
                    'status': b.status,
                    'date': b.date.strftime('%Y-%m-%d'),
                    'start': b.schedule.start.strftime('%I:%M %p'),
                    'end': b.schedule.end.strftime('%I:%M %p'),
                    'client signature': ''
                })

        buf_size = 4096
        self.set_header('Content-Type', 'application/octet-stream')
        self.set_header('Content-Disposition', 'attachment; filename=' + filename)
        with open(filename, 'r') as f:
            while True:
                data = f.read(buf_size)
                if not data:
                    break
                self.write(data)
        self.finish()
    else:
        self.redirect('/admin/#/classes')

def download_user_accounts(self):
    email = self.get_query_argument('email')
    accounts = yield User.objects.order_by('last_name', direction=ASCENDING).filter(status__ne='Deleted').find_all()
    filename = 'user-accounts-' + datetime.now().strftime('%Y-%m-%d %H:%I') + '.csv'
    with open(filename, 'w') as csvfile:
        fieldnames = ['Last Name', 'First Name', 'Email Address']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for a in accounts:
            fullname = a.first_name + ' ' + a.last_name
            if email.lower() in a.email.lower() or email.lower() in fullname.lower():
                writer.writerow({
                    'Last Name': a.last_name,
                    'First Name': a.first_name,
                    'Email Address': a.email
                })

    buf_size = 4096
    self.set_header('Content-Type', 'application/octet-stream')
    self.set_header('Content-Disposition', 'attachment; filename=' + filename)
    with open(filename, 'r') as f:
        while True:
            data = f.read(buf_size)
            if not data:
                break
            self.write(data)
    self.finish()
    # self.redirect('/admin/#/accounts')


def waitlist(self):
    
    sched_id = self.get_query_argument('sched_id')
    if sched_id:
        scheds = yield BookedSchedule.objects.filter(schedule=ObjectId(sched_id), status='waitlisted') \
                                             .order_by('create_at', direction=DESCENDING).find_all()
        if scheds:
            filename = 'waitlisted-' + datetime.now().strftime('%Y-%m-%d %H:%I') + '.csv'

            with open(filename, 'w') as csvfile:
                fieldnames = ['first_name', 'last_name', 'date', 'notes', 'created at']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                for b in scheds:
                    writer.writerow({
                        'first_name': b.user_id.first_name,
                        'last_name': b.user_id.last_name,
                        'date': b.date.strftime('%Y-%m-%d'),
                        'notes': b.notes,
                        'created at': b.create_at.strftime('%Y-%m-%d %H:%M:%S')
                    })

            buf_size = 4096
            self.set_header('Content-Type', 'application/octet-stream')
            self.set_header('Content-Disposition', 'attachment; filename=' + filename)
            with open(filename, 'r') as f:
                while True:
                    data = f.read(buf_size)
                    if not data:
                        break
                    self.write(data)
        else:
            self.write('No waitlisted schedule found')
    else:
        self.write('Invalid Schedule')
    self.finish()