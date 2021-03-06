import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, UserPackage
from app.models.users import User
from bson.objectid import ObjectId
from app.helper import create_at_gmt8
import tornado
import json
    
def find(self):
    user_id = None
    if 'ES-USER-ID' in self.request.headers:
        user_id = self.request.headers['ES-USER-ID']
    else:
        if self.get_secure_cookie('loginUserID'):
            user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8')

    if not user_id:
        self.set_status(403)
        self.write('User not login')
        self.finish()
    else:
        transactions = yield UserPackage.objects.order_by('expire_date') \
                                                .filter(user_id=ObjectId(user_id), remaining_credits__gt=0, status__ne='Expired').find_all()
        transactions = create_at_gmt8(transactions)
        self.render_json(transactions)

def find_one(self, id):
    transaction = yield UserPackage.objects.get(id)
    self.write(transaction.to_dict())
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    try:
        user = yield User.objects.get(data['user_id']);
        transaction = UserPackage(user_id=data['user_id'])
        if 'package_id' in data:
            package = yield Package.objects.get(data['package_id'])
            transaction.package_id = data['package_id']
            transaction.package_name = package.name
            transaction.package_fee = package.fee
            transaction.package_ft = package.first_timer
            transaction.credit_count = package.credits
            transaction.remaining_credits = package.credits
            transaction.expiration = package.expiration
            user.credits = user.credits + package.credits
        else:
            transaction.expiration = data['expiration']
            transaction.credit_count = data['credits']
            transaction.remaining_credits = data['credits']
            user.credits = user.credits + int(data['credits'])
            
        if 'notes' in data:
            transaction.notes = data['notes']

        if 'transaction_info' in data:
            transaction.trans_info = data['transaction_info']

        transaction = yield transaction.save()
        if transaction:
            user = yield user.save();
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try:
        transaction = yield UserPackage.objects.get(id)
        transaction.expiration = data['expiration']
        if 'notes' in data:
            transaction.notes = data['notes']
        transaction = yield package.save()
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    # del_package = yield UserPackage.objects.get(id)
    # del_package.delete()
    self.set_status(403)
    self.finish()
