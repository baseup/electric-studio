from motorengine import DESCENDING, ASCENDING
from app.models.schedules import BookedSchedule, InstructorSchedule
from app.models.users import User
from app.models.packages import UserPackage, GiftCertificate
from datetime import datetime, timedelta
from bson.objectid import ObjectId
from tornado import gen
from app.settings import REDIS_HOST, REDIS_PORT
from dateutil.relativedelta import relativedelta

import os
import redis
import csv


def download_bookings(self):
    sched_id = self.get_query_argument('sched_id')
    if sched_id:
        sched = yield InstructorSchedule.objects.get(self.get_argument('sched_id'))
        query = BookedSchedule.objects.order_by('seat_number', direction=ASCENDING)
        bookings = yield query.filter(schedule=sched._id, status='booked').find_all()

        if len(bookings) == 0:
            return self.redirect('/admin/#/classes')

        bikeMap = {}
        for b in bookings:
            bikeMap[b.seat_number] = b

        filename = 'bookings-' + datetime.now().strftime('%Y-%m-%d %H:%I') + '.csv'
        with open(filename, 'w') as csvfile:
            fieldnames = ['Bike Number', 'First', 'Last', '1st Timer', 'Signature']
            sched_writer = csv.writer(csvfile)
            sched_writer.writerow([bookings[0].date.strftime('%A, %B %d, %Y')])
            sched_writer.writerow([bookings[0].schedule.instructor.admin.first_name.upper() + ' ' + bookings[0].schedule.start.strftime('%I:%M %p')])
            sched_writer.writerow([])
            sched_writer.writerow(['By signing, Rider represents that he/she is physically fit and has read and agrees to the terms and conditions on www.electricstudio.ph'])
            sched_writer.writerow([])
            sched_writer.writerow(['SAFETY INSTRUCTIONS:','1) Test your bike brake'])
            sched_writer.writerow(['','2) Tighten bike pins.'])
            sched_writer.writerow(['','3) Clip in securely to pedals.'])
            sched_writer.writerow(['','4) Stay hydrated.'])
            sched_writer.writerow(['','5) Move at a comfortable pace.'])
            sched_writer.writerow(['','6) Reach out if you need help.'])
            sched_writer.writerow([])

            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()

            for i in range(1, 38):
                if i in bikeMap:
                    book_counts = (yield BookedSchedule.objects.filter(status='completed', user_id=bikeMap[i].user_id, date__lte=bikeMap[i].date).limit(1).find_all())
                    writer.writerow({
                        'Bike Number': i,
                        'First': bikeMap[i].user_id.first_name,
                        'Last': bikeMap[i].user_id.last_name,
                        '1st Timer': 'Y' if len(book_counts) == 0 else '',
                        'Signature': ''
                    })
                else:
                    writer.writerow({
                        'Bike Number': i,
                        'First': '',
                        'Last': '',
                        'Signature': ''
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

def download_gift_cards_report(self):

    startDate = self.get_query_argument('fromDate')
    endDate = self.get_query_argument('toDate')
    isRedeemed = (self.get_query_argument('isRedeemed') == 'true')

    fromDate = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
    if startDate:
        fromDate = datetime.strptime(startDate, '%Y-%m-%d')
    toDate = datetime.now() + timedelta(days=7)
    if endDate:
        toDate = datetime.strptime(endDate, '%Y-%m-%d')

    gift_certificates = yield GiftCertificate.objects.filter(create_at__gte=fromDate, create_at__lte=toDate, is_redeemed=isRedeemed) \
                                             .order_by('create_at', direction=DESCENDING).find_all()
    # gift_certificates = create_at_gmt8(gift_certificates)
    filename = 'gift-cards-' + datetime.now().strftime('%Y-%m-%d %H:%I') + '.csv'
    with open(filename, 'w') as csvfile:
        fieldnames = ['Date Generated', 'Transaction', 'Sender Email', 'Receiver Email', 'Code',
                    'Pin', 'Package', 'Date Redeemed', 'ES Account']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for gc in gift_certificates:
            redeem_date =  None
            redeemer_email = None
            if gc.redeem_date:
                redeem_date = gc.redeem_date.strftime('%Y-%m-%d')
            if gc.redeemer_es_id:
                redeemer_email = gc.redeemer_es_id.email
            writer.writerow({
                'Date Generated': gc.create_at.strftime('%Y-%m-%d'),
                'Transaction': gc.pptx,
                'Sender Email': gc.sender_name,
                'Receiver Email': gc.receiver_email,
                'Code': gc.code,
                'Pin': gc.pin,
                'Package': gc.package_id.name,
                'Date Redeemed': redeem_date,
                'ES Account': redeemer_email
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


@gen.coroutine
def download_user_accounts(email, past_month, redis_db):
    date_range = None
    if past_month:
        date_range = datetime.now() - relativedelta(months=+int(past_month))
    query = User.objects.order_by('last_name', direction=ASCENDING)
    if date_range:
        query.filter(create_at__gte=date_range)
    accounts = yield query.find_all()

    path = 'assets/downloads'
    os.makedirs(path, exist_ok=True)

    filename = path + '/user-accounts-' + datetime.now().strftime('%Y-%m-%d %H:%I') + '.csv'
    with open(filename, 'w') as csvfile:
        fieldnames = ['Full Name', 'Mobile Number', 'Email Address', 'Account Status', '# of Rides Bought',
                    '# of Rides Booked', '# of Active Rides', '# of Missed Class', 'Date Account Created', 'Date of Last Ride']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        count = 1
        alen = len(accounts)
        for a in accounts:
            redis_db.set('process_account_export', 'account %s (%d of %d)' % (str(a.email), count, alen))
            bookings = yield BookedSchedule.objects.filter(user_id=a._id).find_all()
            transactions = yield UserPackage.objects.filter(user_id=a._id).find_all()
            total_rides_bought, total_rides_missed, total_rides_booked  = 0, 0, 0
            date_last_ride = ''
            for transaction in transactions:
                total_rides_bought += transaction.credit_count
            if len(bookings) > 0:
                for book in bookings:
                    if book.schedule is not None:
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

            count += 1

    redis_db.delete('process_account_export')
    redis_db.set('process_account_export_done', filename)
    return {'success': True, 'file': filename}

def download_user_accounts_progress(self):
    redis_db = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

    start_export = self.get_query_argument('start')
    if start_export:
        redis_db.delete('process_account_export')

    if redis_db.exists('process_account_export_done'):
        file_export = redis_db.get('process_account_export_done')
        redis_db.delete('process_account_export_done')
        return self.render_json({ 'success': True, 'file': file_export.decode('utf-8') })

    if redis_db.exists('process_account_export'):
        return self.render_json({ 'success': True, 'data': redis_db.get('process_account_export').decode('utf-8') })
    else:
        email = self.get_query_argument('email')
        past_month = self.get_query_argument('past_month')
        download_user_accounts(email, past_month, redis_db)

    return self.render_json({ 'success': True, 'data':'initialize ...' })


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
