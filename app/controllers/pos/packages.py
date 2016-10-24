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

def find_one(self, id):
    package = yield Package.objects.get(id)
    if package:
    	self.render_json(package) 
    else:
    	result = {
            'message' : 'No package found with this id ' + id,
            'valid' : False,
            'status' : 404
        }
    	self.set_status(404)
    	self.render_json(result)