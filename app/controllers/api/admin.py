from app.models.admins import Admin
import json
    
def find(self):
    admins = yield Admin.objects.find_all().to_son()
    self.write(admins)
    self.finish()

def find_one(self, id):
    admin = yield Admin.objects.get(id).to_son()
    self.write(admin)
    self.finish()

def create(self):
    self.write('user.create')

def update(self, id):
    self.write('user.udpate')

def destroy(self, id):
    self.write('user.destroy')