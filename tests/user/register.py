import sys, os
sys.path.append(os.path.abspath('..'))
sys.path.append(os.path.abspath('../..'))

from app.models.users import User
from passlib.hash import bcrypt
from functools import partial
from helpers.db import connect_db

class UserRegistrationTest:
    users = []
    io_loop = None

    def __init__(self, num_of_users):
        self.io_loop = connect_db()
        self.io_loop.add_timeout(1, partial(self.remove_test_users, num_of_users))
        self.io_loop.start()

    def remove_test_users(self, num_of_users):
        def create_test_users(number_of_deleted_users):
            password = bcrypt.encrypt('1234')

            for index in range(0, num_of_users):
                user = User(first_name='FirstName' + str(index),
                            last_name='LastName' + str(index),
                            email='user' + str(index) + '@localhost.com',
                            password=password,
                            status='Active',
                            credits=300)

                self.users.append(user)

            User.objects.bulk_insert(self.users, callback=self.handle_users_inserted)

        User.objects.filter({'email': {'$regex':'^user\d+'}}).delete(callback=create_test_users)

    def handle_users_inserted(self, users):
        print(str(len(users)) + ' users inserted')

        self.io_loop.stop()

user_registration = UserRegistrationTest(400)
