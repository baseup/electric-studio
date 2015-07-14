from motorengine.errors import InvalidDocumentError
from motorengine import DESCENDING
from app.models.users import User
from datetime import datetime, timedelta
from app.settings import DATABASE_LIMIT

import sys
import tornado
import json

def find(self):
    count = yield User.objects.count()
    page = 0
    users = []  
    if self.get_argument('page'):
        page = int(self.get_argument('page'))-1
    users = yield User.objects.skip(page * DATABASE_LIMIT) \
            .limit(DATABASE_LIMIT).find_all()

    for i, user in enumerate(users):
        user = user.to_dict()
        del user['password']
        users[i] = user 
    self.render_json(users)
    # self.render_json({
    #     'users' : users,
    #     'total_records' : count,
    #     'page_number' : page + 1,
    #     'request_limit' : DATABASE_LIMIT
    # })

def find_one(self, id):
    user = yield User.objects.get(id)
    user = user.to_dict()
    if user:
        del user['password']
        self.render_json(user)
    else:
        result = {
            'message' : 'No user found with this id ' + id,
            'valid' : False,
            'status' : 404
        }
        self.set_status(404)
        self.render_json(result)
