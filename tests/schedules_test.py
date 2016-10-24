from tornado.testing import AsyncTestCase, AsyncHTTPClient
from ws4py.client.tornadoclient import TornadoWebSocketClient
from datetime import date, timedelta
from tornado.escape import json_decode
from tornado import ioloop

import os
import sys
import yaml

sys.path.append(os.path.abspath('.'))
from app.models.admins import Branch
from scripts.helpers.db import connect_db


class SchedulesClient(TornadoWebSocketClient):

    HEARTBEAT = '--heartbeat--'

    def __init__(self, url, io_loop, **kwargs):
        self._message = None
        self._callback = None

        super().__init__(
            url,
            io_loop=io_loop,
            protocols=['http-only'],
            **kwargs)

    @property
    def handshake_headers(self):
        headers = super().handshake_headers
        new_headers = []

        for header in headers:
            key, value = header

            if key == 'Host':
                value = self.url.split('/')[2]

            new_headers.append((key, value))

        return new_headers

    def opened(self):
        self.send(self._message, binary=False)

    def received_message(self, message):
        self.close()

        if self._callback:
            self._callback(message.data)

    def send_message(self, message, callback):
        self._message = message
        self._callback = callback
        self.connect()


class WebsocketTest(AsyncTestCase):

    def get_new_ioloop(self):
        return ioloop.IOLoop.instance()

    def test_websocket_fetch(self):
        dir = os.path.dirname(os.path.realpath(__file__))

        with open('{}/config.yaml'.format(dir), 'r') as stream:
            config = yaml.load(stream)
            self.websocket_base_url = config['websocket_base_url']

        connect_db(self.io_loop)

        Branch.objects.limit(1).find_all(callback=self.stop)
        branch = self.wait()

        mon_date = (date.today() - timedelta(days=date.today().weekday())) \
            .strftime('%Y-%-m-%-d')

        client = SchedulesClient(
            '{}/{}'.format(
                self.websocket_base_url,
                'schedules?subscribe-broadcast&echo'),
            self.io_loop)
        client.send_message(
            '{{"date": "{}", "branch": "{}"}}'.format(mon_date, branch[0]._id),
            self.stop)

        response = self.wait()

        json = json_decode(response)

        self.assertIn('now', json)
        self.assertIn('counts', json)
        self.assertIn('date', json)
        self.assertIn('branch_id', json)
        self.assertIn('releases', json)

        # Month and Day should not be zero-padded
        self.assertEqual(json['date'], mon_date)

        for day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'nmon']:
            self.assertIn(day, json)

            for schedule in json[day]:
                if 'branch' in schedule:
                    if 'name' not in schedule['branch']:
                        self.fail('Missing branch info')
                        break

                    if str(branch[0]._id) != schedule['branch']['_id']:
                        self.fail('Incorrect branch schedules')
                        break
                else:
                    self.fail('Missing branch info')
                    break
