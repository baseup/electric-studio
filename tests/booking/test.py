from multiprocessing import Pool
from requests import Session
from datetime import datetime

import json
import yaml
import sys
import time

class BookingTest:
    base_url     = ''
    release_date = datetime.now().strftime('%Y-%m-%d')
    sessions     = []
    users        = []
    bike_seats   = []
    bookings     = []

    def __init__(self):
        if len(sys.argv) > 1:
            try:
                self.release_date = datetime.strptime(sys.argv[1], '%Y-%m-%d')
            except ValueError:
                pass

        with open('config.yaml', 'r') as stream:
            config = yaml.load(stream)

            self.base_url = config['base_url']
            self.users = config['users']
            self.bike_seats = config['bike_seats']

    def login_users(self):
        for user in self.users:
            session = Session()

            response = session.post(self.base_url + '/user/login', params=user)

            try:
                result = json.loads(response.content.decode('UTF-8'))

                if 'success' in result and result['success']:
                    self.sessions.append({'user': user, 'session': session})

                    print('User ' + user['email'] + ' is now logged in')
                else:
                    sys.exit('Error: Invalid account ' + user['email'] + ' ' + user['password'])
            except ValueError:
                sys.exit('Error: Invalid account ' + user['email'] + ' ' + user['password'])

    def setup_bookings(self):
        if len(self.sessions) < 1:
            return

        response = self.sessions[0]['session'].get(self.base_url + '/api/schedule?date=' + self.release_date)

        try:
            schedules = json.loads(response.content.decode('UTF-8'))

            if 'releases' in schedules and len(schedules['releases']) > 0:
                for day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']:
                    if day in schedules and len(schedules[day]) > 0:

                        # loop through all schedules of the day
                        for schedule in schedules[day]:
                            if '_id' in schedule and 'seats' in schedule:
                                id = schedule['_id']
                                seats = schedule['seats']

                                # check if schedule is available
                                if id in schedules['releases'] and schedules['releases'][id]:
                                     for seat in range(1, seats + 1):
                                        date = datetime.strptime(schedule['date'], '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
                                        self.bookings.append({'date': date, 'sched_id': id, 'seats': [seat]})
            else:
                sys.exit('Error: No available schedules')
        except ValueError as e:
            sys.exit(e)

    def schedule_bookings(self):
        pool = Pool()

        for booking in self.bookings:
            for session in self.sessions:
                result = pool.apply_async(self.book, args=(booking, session))

        pool.close()
        pool.join()

    def book(self, booking, session):
        # send request payload
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        response = session['session'].post(self.base_url + '/api/book', data=json.dumps(booking), headers=headers)

        info = '(ms=' + str(int(round(time.time() * 1000))) + ', email=' + session['user']['email'] + ', date=' + booking['date'] + ', seats=[' + ','.join(str(seat) for seat in booking['seats']) + '])'

        if response.status_code == 200:
            print('Success: Booking successful ' + info)
        else:
            print('Error: Booking failed' + info)
            print(response.content.decode('UTF-8'))

test = BookingTest()
test.login_users()
test.setup_bookings()
test.schedule_bookings()
