from app.models.packages import Package, UserPackage
from bson.objectid import ObjectId
import sys
import tornado.escape

def find(self):
    has_first_timer = False
    user_id = self.get_query_argument('buyer_id')
    if user_id:
        ft_package_count = (yield UserPackage.objects.filter(user_id=ObjectId(user_id), package_ft=True).count()) 
        if ft_package_count > 0:
            has_first_timer = True    
    if has_first_timer:
        packages = yield Package.objects.filter(first_timer=False).find_all()
    else:
        packages = yield Package.objects.find_all()
    self.render_json(packages)

def find_one(self, id):
    package = yield Package.objects.get(id)
    self.write(package.to_dict())
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    try:
        package = Package(fee=data['fee'],
                          expiration=data['expiration'],
                          credits=data['credits'])
        if 'name' in data:
            package.name = data['name']
        if 'first_timer' in data: 
            package.first_timer = bool(data['first_timer'])
        if 'special_package' in data: 
            package.special_package = bool(data['special_package'])
        if 'description' in data:
            package.description = data['description']
        package = yield package.save()
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try:
        package = yield Package.objects.get(id)
        package.name = data['name']
        package.fee = data['fee']
        package.description = data['description']
        package.expiration = data['expiration']
        package.credits = data['credits']
        package.first_timer = bool(data['first_timer']);
        package.special_package = bool(data['special_package']);
        package = yield package.save()
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    del_package = yield Package.objects.get(id)
    del_package.delete()

    self.finish()