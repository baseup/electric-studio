from app.models.schedules import BookedSchedule, InstructorSchedule
from datetime import datetime

import csv

def download_bookings(self):
    #date = self.get_query_argument('date')
    #time = self.get_query_argument('time')
    #if not date:
    #    date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    #else:
    #    date = datetime.strptime(date, '%Y-%m-%d')
    #time = datetime.strptime(time, '%I:%M %p')
    #ins_sched = yield InstructorSchedule.objects.get(date=date, start_time=time)
    #if not ins_sched:
    #    ins_sched = yield InstructorSchedule.objects.get(day=date.strftime('%a').lower(), start=time)
    bookings = yield BookedSchedule.objects.find_all()
    filename = 'bookings-' + datetime.now().strftime('%Y-%m-%d %H:%I') + '.csv'

    with open(filename, 'w') as csvfile:
        fieldnames = ['first_name', 'last_name', 'seat number', 'status', 'date']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for b in bookings:
            writer.writerow({
                'first_name': b.user_id.first_name,
                'last_name': b.user_id.last_name,
                'seat number': b.seat_number,
                'status': b.status,
                'date': b.date.strftime('%Y-%m-%d')
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