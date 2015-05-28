import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, UserPackage
from app.models.users import User
from bson.objectid import ObjectId
import tornado
import json
    
def find(self):
    transactions = yield UserPackage.objects.find_all()
    for i, transaction in enumerate(transactions):
        product = transaction.package_id.to_dict()
        user = transaction.user_id.to_dict()
        del user['password']
        transaction = transaction.to_dict()
        transaction['user_id'] = user
        transaction['package_id'] = product
        transactions[i] = transaction
    self.render_json(transactions)

def find_one(self, id):
    transaction = yield UserPackage.objects.get(id)
    if transaction:
        user = transaction.user_id.to_dict()
        product = transaction.package_id.to_dict()
        del user['password']
        transaction = transaction.to_dict()
        transaction['user_id'] = user
        transaction['package_id'] = product
        self.render_json(transaction)
    else:
        result = {
            'message' : 'No transaction found with this id ' + id,
            'valid' : False,
            'status' : 404
        }
        self.set_status(404)
        self.render_json(result)
