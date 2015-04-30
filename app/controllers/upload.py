
from bson.objectid import ObjectId
from motorengine.errors import InvalidDocumentError
from app.models.admins import Instructor

import os
import sys
import tornado

def instructor(self):

    if self.request.files and self.get_argument('id'):
        try:
            ins_id = ObjectId(self.get_argument('id'))
            instructor = yield Instructor.objects.get(ins_id)
            if instructor:
                upload_file = self.request.files['file'][0]
                extn = os.path.splitext(upload_file['filename'])[1]
                new_name = str(instructor._id) + '-' + str(instructor.admin.username) + extn
                path = 'assets/uploads/'
                os.makedirs(path, exist_ok=True)
                new_file = open(path + new_name, 'wb')
                new_file.write(upload_file['body'])

                instructor.image = 'uploads/' + new_name;
                yield instructor.save()
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(403)
        self.write("Invalid request")

    self.finish()

def images(self):

    if self.request.files and self.get_argument('type'):
        try:
            img_type = self.get_argument('type')
            if img_type:
                upload_file = self.request.files['file'][0]
                
                name = None
                if img_type == 'about-us':
                    name = 'about-us.jpg'
                elif img_type == 'rates':
                    name = 'rates.png'
                elif img_type == 'workouts':
                    name = 'workouts.jpg'
                elif img_type == 'first-ride':
                    name = 'first-ride.png'

                if name:
                    new_name = name
                    path = 'assets/images/'
                    os.makedirs(path, exist_ok=True)
                    new_file = open(path + new_name, 'wb')
                    new_file.write(upload_file['body'])
                else:
                    self.set_status('403')
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(403)
        self.write("Invalid request")

    self.finish()

