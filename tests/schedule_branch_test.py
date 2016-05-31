from tornado.testing import AsyncTestCase, AsyncHTTPClient
from datetime import date, datetime
from dateutil import parser
from tornado.escape import json_decode
from tornado import ioloop

import os
import re
import sys
import yaml

sys.path.append(os.path.abspath('.'))
from app.models.admins import Branch, Instructor
from app.models.schedules import InstructorSchedule
from app.settings import DEFAULT_BRANCH_ID
from scripts.helpers.db import connect_db


class ScheduleBranchCheckTest(AsyncTestCase):

    DEFAULT_TIME = datetime(1900, 1, 1)

    def get_new_ioloop(self):
        return ioloop.IOLoop.instance()

    def test_fetch(self):
        dir = os.path.dirname(os.path.realpath(__file__))

        with open('{}/config.yaml'.format(dir), 'r') as stream:
            config = yaml.load(stream)
            self.base_url = config['base_url']

        connect_db(self.io_loop)

        Branch.objects.limit(1).find_all(callback=self.stop)
        branch = self.wait()
        Instructor.objects.limit(2).find_all(callback=self.stop)
        instructors = self.wait()

        self.schedule = InstructorSchedule()
        self.schedule.branch = branch[0]._id
        self.schedule.seats = 37
        self.schedule.start = parser.parse('1:0', default=self.DEFAULT_TIME)
        self.schedule.end = parser.parse('2:0', default=self.DEFAULT_TIME)
        self.schedule.date = parser.parse(date.today().strftime('%Y-%m-%d'))
        self.schedule.type = 'any'
        self.schedule.instructor = instructors[0]._id
        self.schedule.sub_instructor = instructors[1]._id

        self.schedule.save(callback=self.stop)
        self.wait()

        client = AsyncHTTPClient(self.io_loop)
        client.fetch(
            '{}/admin/schedule?date={}'.format(
                self.base_url,
                date.today().strftime('%Y-%m-%d')),
            self.handle_fetch)
        self.wait()

        self.schedule.delete(callback=self.stop)
        self.wait()


    def handle_fetch(self, response):
        json = json_decode(response.body.decode('utf-8'))

        self.assertIn('bookings', json)
        self.assertIn('first_timers', json)
        self.assertIn('schedule', json)
        self.assertIn('schedules', json)
        self.assertIn('waitlist', json)

        if ('branch' not in json['schedule'] or
                json['schedule']['branch'] is None):
            self.fail('Missing branch info')

        pattern = re.compile('-\s.+$')

        for schedule in json['schedules']:
            if pattern.search(schedule['text']) is None:
                self.fail('Missing branch info: {}'.format(schedule['text']))
                break

        self.stop()
