import sys, os
sys.path.append(os.path.abspath('..'))
sys.path.append(os.path.abspath('../..'))

from concurrent.futures import ProcessPoolExecutor
from requests import Session
from datetime import datetime
from app.models.users import User
from helpers.db import connect_db
from functools import partial
from tornado import gen

import json
import yaml
import sys
import time
import concurrent

class BookingTest:
    base_url     = ''
    release_date = datetime.now().strftime('%Y-%m-%d')
    sessions     = []
    bike_seats   = []
    bookings     = []
    io_loop      = None
    offset       = 0
    limit        = 0

    def __init__(self):
        if len(sys.argv) > 3:
            try:
                self.release_date = datetime.strptime(sys.argv[3], '%Y-%m-%d').strftime('%Y-%m-%d')
            except ValueError:
                pass

        with open('config.yaml', 'r') as stream:
            config = yaml.load(stream)

            self.base_url = config['base_url']

        self.io_loop = connect_db()
        self.io_loop.run_sync(self.find_all_test_users)
        self.io_loop.run_sync(self.schedule_bookings)

    # return Future object
    def find_all_test_users(self):
        if len(sys.argv) > 1:
            try:
                self.limit = int(sys.argv[1])
            except ValueError:
                pass

        if len(sys.argv) > 2:
            try:
                self.offset = int(sys.argv[2])
            except ValueError:
                pass

        if self.limit > 0:
            return User.objects.filter({'email': {'$regex':'^user\d+'}}).skip(self.offset).limit(self.limit).find_all(callback=self.login_test_users)
        else:
            return User.objects.filter({'email': {'$regex':'^user\d+'}}).find_all(callback=self.login_test_users)

    def login_test_users(self, users):
        for user in users:
            user_dict = {'email': user.email, 'password': '1234'}
            session = Session()

            response = session.post(self.base_url + '/user/login', params=user_dict)

            try:
                result = json.loads(response.content.decode('UTF-8'))

                if 'success' in result and result['success']:
                    self.sessions.append({'user': user_dict, 'session': session})

                    print('User ' + user_dict['email'] + ' is now logged in')
                else:
                    sys.exit('Error: Invalid account ' + user_dict['email'] + ' ' + user_dict['password'])
            except Exception as error:
                sys.exit('Error: Invalid account ' + user_dict['email'] + ' ' + user_dict['password'])
                print(error)

        self.setup_bookings()

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

    @gen.coroutine
    def schedule_bookings(self):
        with ProcessPoolExecutor() as pool:
            requests = []

            for booking in self.bookings:
                for session in self.sessions:
                    requests.append({'base_url': self.base_url, 'booking': booking, 'session': session})

            futures = [pool.submit(book, request) for request in requests]
            done, not_done = concurrent.futures.wait(futures)

            bookings = []
            overbooking = 0

            for future in done:
                info = future.result()

                if info in bookings:
                    overbooking = overbooking + 1
                else:
                    bookings.append(info)

            if overbooking:
                print('Tests \033[91mFailed\033[0m')
                print('Found ' + overbooking)
            else:
                print('Tests \033[92mOK\033[0m')

def book(request):
    base_url = request['base_url']
    booking = request['booking']
    session = request['session']

    # send request payload
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    response = session['session'].post(base_url + '/api/book', data=json.dumps(booking), headers=headers)

    info = '(ms=' + str(int(round(time.time() * 1000))) + ', email=' + session['user']['email'] + ', date=' + booking['date'] + ', seats=[' + ','.join(str(seat) for seat in booking['seats']) + '], sched_id=' + booking['sched_id'] + ')'

    if response.status_code == 200:
        print('\033[92mSuccess: Booking successful ' + info + '\033[0m')
    else:
        print('\033[91mError: Booking failed' + info + '\033[0m')
        print('\033[91m' + response.content.decode('UTF-8') + '\033[0m')

    return info

test = BookingTest()
