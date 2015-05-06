import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, UserPackage
from app.models.users import User
from bson.objectid import ObjectId
import tornado
import json
    
def find(self):
    transactions = yield UserPackage.objects.find_all()
    self.render_json(transactions)
    self.finish()

def find_one(self, id):
    transaction = yield UserPackage.objects.get(id)
    self.render_json(transaction)
    self.finish()
