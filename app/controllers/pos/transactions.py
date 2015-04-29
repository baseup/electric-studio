import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, UserPackage
from app.models.users import User
from bson.objectid import ObjectId
from app.auth import auth_token
import tornado
import json
    
def find(self):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
            transactions = yield UserPackage.objects.find_all()
            self.render_json(transactions)
        else:
            self.set_status(403)
            self.write(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()

def find_one(self, id):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
            transaction = yield UserPackage.objects.get(id)
            self.render_json(transaction)
        else:
            self.set_status(403)
            self.write(auth)
            self.finish()
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()
