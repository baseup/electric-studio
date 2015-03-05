import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, UserPackage
from app.models.users import User
import tornado
import json
    
def find(self):
    user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8')
    user = yield User.objects.get(user_id)
    transactions = yield UserPackage.objects.filter(user_id=user._id).find_all()
    pacs = {}
    for i, transaction in enumerate(transactions):
        pacs[i] = transaction.to_dict()
        if pacs[i]['package_id']:
            package = yield Package.objects.get(pacs[i]['package_id'])
            pacs[i]['package'] = package.to_dict()

    self.write(json.dumps(pacs))
    self.finish()

def find_one(self, id):
    transaction = yield UserPackage.objects.get(id)
    self.write(transaction.to_dict())
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    try :
        transaction = UserPackage(user_id=data['user_id'])
        if 'package_id' in data:
            package = yield Package.objects.get(data['package_id'])
            transaction.package_id = data['package_id']
            transaction.credit_count = package.credits
            transaction.remaining_credits = package.credits
            transaction.expiration = package.expiration
        else:
            transaction.expiration = data['expiration']
            transaction.credit_count = data['credits']
            transaction.remaining_credits = data['credits']
            
        if 'notes' in data:
            transaction.notes = data['notes']

        if 'transaction_info' in data:
            transaction.transaction_info = data['transaction_info']

        transaction = yield transaction.save()
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try :
        transaction = yield UserPackage.objects.get(id)
        transaction.expiration = data['expiration']
        if 'notes' in data:
            transaction.notes = data['notes']
        transaction = yield package.save()
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    # del_package = yield UserPackage.objects.get(id)
    # del_package.delete()
    self.set_status(403)
    self.finish()