from tornado.testing import AsyncTestCase, AsyncHTTPClient
from tornado.httpclient import HTTPRequest
from passlib.hash import bcrypt
from tornado.escape import json_decode
from tornado import ioloop

import os
import sys
import yaml
import uuid

sys.path.append(os.path.abspath('.'))
from app.models.admins import Branch
from app.models.users import User
from app.settings import DATABASE_LIMIT
from scripts.helpers.db import connect_db


class APIUsersPaginationTest(AsyncTestCase):

    first_iteration = True
    first_batch = []

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

        password = bcrypt.encrypt('1234')
        users = []

        for index in range(0, DATABASE_LIMIT * 2):
            random = uuid.uuid4()
            user = User(first_name='APIUsersPaginationTest' + str(random),
                        last_name='last_name' + str(random),
                        email='email' + str(random) + '@localhost.com',
                        password=password,
                        status='Active',
                        credits=300)

            users.append(user)

        User.objects.bulk_insert(users, callback=self.stop)
        self.wait()

        request = HTTPRequest(
            '{}/api/users'.format(self.base_url),
            headers={'ES-Token': branch[0].token})

        client = AsyncHTTPClient(self.io_loop)
        client.fetch(
            request,
            self.handle_fetch)
        self.wait()

        request = HTTPRequest(
            '{}/api/users?page=1'.format(self.base_url),
            headers={'ES-Token': branch[0].token})

        client = AsyncHTTPClient(self.io_loop)
        client.fetch(
            request,
            self.handle_fetch)
        self.wait()

        User.objects \
            .filter({'first_name': {'$regex': '^APIUsersPaginationTest'}}) \
            .delete(callback=self.stop)
        self.wait()

    def handle_fetch(self, response):
        users = json_decode(response.body.decode('utf-8'))

        self.assertEqual(len(users), DATABASE_LIMIT)

        if self.first_iteration:

            for user in users:
                if (any(_user['email'] == user['email']
                        for _user in self.first_batch)):
                    self.fail('Duplicate records found: {}'.format(user['email']))
                    break

            self.first_iteration = False

        self.stop()
