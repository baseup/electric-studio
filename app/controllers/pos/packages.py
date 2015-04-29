from motorengine.errors import InvalidDocumentError
from app.models.packages import Package
from bson.objectid import ObjectId
from app.auth import auth_token

import bson
import tornado
import json
import sys

def find(self):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
            packages = yield Package.objects.find_all()
            self.render_json(packages)
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
            package = yield Package.objects.get(id)
            self.render_json(package)           
        else:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()



