from motorengine import DESCENDING, ASCENDING
from app.models.schedules import BookedSchedule, InstructorSchedule
from app.models.users import User
from app.models.packages import UserPackage
from datetime import datetime, timedelta
from bson.objectid import ObjectId
import csv
from dateutil.relativedelta import relativedelta

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
    past_month = self.get_query_argument('past_month')
    date_range = None
    if past_month:
        date_range = datetime.now() - relativedelta(months=+int(past_month))
    query = User.objects.order_by('last_name', direction=ASCENDING)
    if date_range:
        query.filter(create_at__gte=date_range)
    accounts = yield query.find_all()

    filename = 'user-accounts-' + datetime.now().strftime('%Y-%m-%d %H:%I') + '.csv'
    with open(filename, 'w') as csvfile:
        fieldnames = ['Full Name', 'Mobile Number', 'Email Address', 'Account Status', '# of Rides Bought', 
                    '# of Rides Booked', '# of Active Rides', '# of Missed Class', 'Date Account Created', 'Date of Last Ride']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for a in accounts:
            bookings = yield BookedSchedule.objects.filter(user_id=a._id).find_all()
            transactions = yield UserPackage.objects.filter(user_id=a._id).find_all()
            total_rides_bought, total_rides_missed, total_rides_booked  = 0, 0, 0
            date_last_ride = ''
            for transaction in transactions:
                total_rides_bought += transaction.credit_count
            if len(bookings) > 0:
                for book in bookings:
                    if book.status == 'completed':
                        if date_last_ride == '':
                            date_last_ride = book.schedule.date
                        if date_last_ride < book.schedule.date:
                            date_last_ride = book.schedule.date
                    if book.status == 'missed':
                        total_rides_missed+=1
                    if book.status == 'booked':
                        total_rides_booked+=1

            if date_last_ride != '':
                date_last_ride.strftime('%Y-%m-%d')
            fullname = a.first_name + ' ' + a.last_name
            if email.lower() in a.email.lower() or email.lower() in fullname.lower():
                writer.writerow({
                    'Full Name': a.first_name+ " " + a.last_name,
                    'Mobile Number': a.phone_number,
                    'Email Address': a.email,
                    'Account Status': a.status,
                    '# of Rides Bought': total_rides_bought,
                    '# of Rides Booked': total_rides_booked,
                    '# of Active Rides': a.credits,
                    '# of Missed Class': total_rides_missed,
                    'Date Account Created': a.create_at.strftime('%Y-%m-%d'),
                    'Date of Last Ride': date_last_ride
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
                fieldnames = ['First Name', 'Last Name', 'Email', 'Phone Number', 'Date', 'Notes', 'Created at']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                for b in scheds:
                    writer.writerow({
                        'First Name': b.user_id.first_name,
                        'Last Name': b.user_id.last_name,
                        'Email': b.user_id.email,
                        'Phone Number': b.user_id.phone_number,
                        'Date': b.date.strftime('%Y-%m-%d'),
                        'Notes': b.notes,
                        'Created at': b.create_at.strftime('%Y-%m-%d %H:%M:%S')
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