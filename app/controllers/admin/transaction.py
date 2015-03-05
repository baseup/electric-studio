from app.models.packages import UserPackage, Package
from app.models.users import User
import tornado.escape

def find(self):
    transactions = yield UserPackage.objects.find_all()
    self.render_json(transactions)

def create(self):
    data = tornado.escape.json_decode(self.request.body)
    package = yield Package.objects.get(data['package_id'])
    user = yield User.objects.get(data['user_id'])
    trans = UserPackage()
    trans.package_id = package._id
    trans.user_id = user._id
    trans.credit_count = package.credits
    trans.expiration = package.expiration
    trans.remaining_credits = package.credits
    trans.notes = data['notes']
    trans.is_free = True
    trans = yield trans.save()

    user.credits += package.credits
    yield user.save()
    self.render_json(trans)