from app.models.admins import Slider
from datetime import datetime

import os
import sys
import tornado.escape

def find(self):
    sliders = yield Slider.objects.find_all()
    self.render_json(sliders)

def find_one(self, id):
    slider = yield Slider.objects.get(id)
    self.render_json(slider)

def create(self):

    if self.request.files and self.get_argument('text'):
        try :
            upload_file = self.request.files['file'][0]
            new_name = datetime.now().strftime('%Y_%m_%d_%H_%M_%S') + '_' + upload_file['filename']
            path = 'assets/uploads/'
            os.makedirs(path, exist_ok=True)
            new_file = open(path + new_name, 'wb')
            new_file.write(upload_file['body'])

            slider = Slider(text=self.get_argument('text'),
                            image=path + new_name)
            slider = yield slider.save()
        except :
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(404)
        self.write('Not Found')

    self.finish()

def update(self, id):

    text = self.get_argument('text');
    try :
        slider = yield Slider.objects.get(id)
        if slider:
            if self.request.files:
                upload_file = self.request.files['file'][0]
                if upload_file:
                    new_name = datetime.now().strftime('%Y_%m_%d_%H_%M_%S') + '_' + upload_file['filename']
                    path = 'assets/uploads/'
                    os.makedirs(path, exist_ok=True)
                    new_file = open(path + new_name, 'wb')
                    new_file.write(upload_file['body'])
                    os.remove(slider.image)
                    slider.image = path + new_name

            if text:
                slider.text = text
            slider = yield slider.save()
        else:
            self.set_status(404)
            self.write('Not Found')
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    slider = yield Slider.objects.get(id)
    os.remove(slider.image)
    slider.delete()

    self.finish()