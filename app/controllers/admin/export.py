from motorengine import DESCENDING
from app.models.schedules import BookedSchedule, InstructorSchedule
from datetime import datetime
from bson.objectid import ObjectId
import csv

def download_bookings(self):
    date = self.get_query_argument('date')
    if not date:
        date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    else:
        date = datetime.strptime(date, '%Y-%m-%d')

    if self.get_query_argument('sched_id') is not 'null':
        bookings = yield BookedSchedule.objects.filter(date=date).find_all()
    else:
        sched = yield InstructorSchedule.objects.get(self.get_argument('sched_id')); 
        bookings = yield BookedSchedule.objects.filter(date=date).filter(schedule=sched._id).find_all()

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