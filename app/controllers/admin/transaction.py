from app.models.packages import UserPackage, Package
from app.models.users import User
from motorengine.errors import *

import tornado.escape
import sys

def find(self):
    transactions = yield UserPackage.objects.find_all()
    self.render_json(transactions)

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    trans = UserPackage()
    user = yield User.objects.get(data['user_id'])

    if 'package_id' in data:
        package = yield Package.objects.get(data['package_id'])
        trans.package_id = package._id
        trans.credit_count = package.credits
        trans.expiration = package.expiration
        trans.remaining_credits = package.credits
    else:
        if 'credit_count' in data:
            trans.credit_count = data['credit_count']
            trans.remaining_credits = data['credit_count']
        if 'expiration' in data:
            trans.expiration = data['expiration']

    if 'notes' in data:
        trans.notes = data['notes']

    trans.is_free = True
    trans.user_id = user._id

    try:
        yield trans.save()
        user.credits += int(trans.credit_count)
        yield user.save()
    except InvalidDocumentError:
        self.set_status(400)
        self.write(str(sys.exc_info()[1]))
        self.finish()
        return

    self.render_json(trans)