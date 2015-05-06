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
    self.finish()

def find_one(self, id):
    user = yield User.objects.get(id)
    user = user.to_dict()
    del user['password']
    self.write(user)
    self.finish()
