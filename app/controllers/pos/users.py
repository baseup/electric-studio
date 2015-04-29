from motorengine.errors import InvalidDocumentError
from motorengine import DESCENDING
from app.models.users import User
from datetime import datetime, timedelta
from app.auth import auth_token

import sys
import tornado
import json

def find(self):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
            users = yield User.objects.find_all()    
            for i, user in enumerate(users):
                user = user.to_dict()
                del user['password']
                users[i] = user 
            self.render_json(users)
        else:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()

def find_one(self, id):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
            user = yield User.objects.get(id)
            user = user.to_dict()
            del user['password']
            self.write(user)
        else:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()
