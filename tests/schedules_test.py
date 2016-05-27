from tornado.testing import AsyncTestCase
from ws4py.client.tornadoclient import TornadoWebSocketClient

import os
import yaml


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
            self._callback(message)

    def send_message(self, message, callback):
        self._message = message
        self._callback = callback
        self.connect()


class WebsocketTest(AsyncTestCase):

    def test_websocket_fetch(self):
        dir = os.path.dirname(os.path.realpath(__file__))

        with open('{}/config.yaml'.format(dir), 'r') as stream:
            config = yaml.load(stream)
            self.websocket_base_url = config['websocket_base_url']

        client = SchedulesClient(
            '{}/{}'.format(
                self.websocket_base_url,
                'schedules?subscribe-broadcast&echo'),
            self.io_loop)
        client.send_message(
            '{date: "2016-5-23", branch: "5743d1906c7a152a32d5d88f"}',
            self.stop)

        response = self.wait()

        if response.data:
            print('got %s' % str(response.data))
            self.assertTrue(True)
