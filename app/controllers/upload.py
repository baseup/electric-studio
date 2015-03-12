
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
        except :
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(403)
        self.write("Invalid request")

    self.finish()
