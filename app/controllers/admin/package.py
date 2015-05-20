from app.models.packages import Package
import sys
import tornado.escape

def find(self):
    packages = yield Package.objects.find_all()
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
                          description=data['description'],
                          expiration=data['expiration'],
                          credits=data['credits'])

        if 'first_timer' in data: 
            package.first_timer = bool(data['first_timer'])
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