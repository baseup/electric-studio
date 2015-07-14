import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, UserPackage
from app.models.users import User
from bson.objectid import ObjectId
from app.settings import DATABASE_LIMIT
import tornado
import json
    
def find(self):
    count = yield UserPackage.objects.count()
    page = 0
    transactions = []
    if self.get_argument('page'):
        page = int(self.get_argument('page')) - 1

    transactions = yield UserPackage.objects \
                    .skip(page * DATABASE_LIMIT) \
                    .limit(DATABASE_LIMIT).find_all()

    for i, transaction in enumerate(transactions):
        product = None
        if transaction.package_id != None:
            product = transaction.package_id.to_dict()
        user = transaction.user_id.to_dict()
        del user['password']
        transaction = transaction.to_dict()
        transaction['user_id'] = user
        transaction['package_id'] = product
        transactions[i] = transaction

    self.render_json(transactions)
    # self.render_json({
    #     'transactions' : transactions,
    #     'total_records' : count,
    #     'page_number' : page + 1,
    #     'request_limit' : DATABASE_LIMIT
    # })

def find_one(self, id):
    transaction = yield UserPackage.objects.get(id)
    if transaction:
        user = transaction.user_id.to_dict()
        product = None
        if transaction.package_id != None:
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