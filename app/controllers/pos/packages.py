from motorengine.errors import InvalidDocumentError
from app.models.packages import Package
from bson.objectid import ObjectId

import bson
import tornado
import json
import sys

def find(self):
    packages = yield Package.objects.find_all()
    self.render_json(packages)
    self.finish()

def find_one(self, id):
    package = yield Package.objects.get(id)
    self.render_json(package) 
    self.finish()



