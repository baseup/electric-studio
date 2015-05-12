from motorengine.errors import InvalidDocumentError
from motorengine import DESCENDING
from app.models.users import User
from datetime import datetime, timedelta

import sys
import tornado
import json

def find(self):
    users = yield User.objects.find_all()    
    for i, user in enumerate(users):
        user = user.to_dict()
        del user['password']
        users[i] = user 
    self.render_json(users)

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
