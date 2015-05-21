import sys
from motorengine import ASCENDING, DESCENDING
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, UserPackage
from bson.objectid import ObjectId
import tornado
import json
    
def find(self):
    has_first_timer = False
    if self.get_secure_cookie('loginUserID'):
        user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8')
        ft_package_count = (yield UserPackage.objects.filter(user_id=ObjectId(user_id), package_ft=True).count()) 
        if ft_package_count > 0:
            has_first_timer = True

    new_pack = yield Package.objects.order_by('create_at', direction=DESCENDING).limit(1).find_all();
    if has_first_timer:
        packages = yield Package.objects.filter(id__ne=new_pack[0]._id,first_timer=False).order_by('credits', direction=ASCENDING).find_all()
        packages.insert(0, new_pack[0]);
        self.render_json(packages)
    else: 
        packages = yield Package.objects.filter(id__ne=new_pack[0]._id).order_by('credits', direction=ASCENDING).find_all()
        packages.insert(0, new_pack[0]);
        self.render_json(packages)

def find_one(self, id):
    package = yield Package.objects.get(id)
    self.write(package.to_dict())
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    try:
        package = Package(name=data['name'], 
                          fee=data['fee'],
                          expiration=data['expiration'],
                          credits=data['credits'])
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
