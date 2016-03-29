from app.models.admins import Slider
from datetime import datetime

import os
import sys
import tornado.escape

def find(self):
    sliders = yield Slider.objects.find_all()
    for i, slider in enumerate(sliders):
        if slider.image:
            slider.image = self.static_url(slider.image)
        slider.image = slider.image.replace('/assets/assets','/assets')

    self.render_json(sliders)

def find_one(self, id):
    slider = yield Slider.objects.get(id)
    self.render_json(slider)

def create(self):

    if self.request.files:
        try:
            upload_file = self.request.files['file'][0]
            new_name = datetime.now().strftime('%Y_%m_%d_%H_%M_%S') + '_' + upload_file['filename']
            path = 'assets/uploads/'
            os.makedirs(path, exist_ok=True)
            new_file = open(path + new_name, 'wb')
            new_file.write(upload_file['body'])

            mfile = None
            mobile_new_name = None
            if 'mfile' in self.request.files:
                mfile = self.request.files['mfile'][0]
                mobile_new_name = datetime.now().strftime('%Y_%m_%d_%H_%M_%S') + '_mobile_' + mfile['filename']
                mobile_file = open(path + mobile_new_name, 'wb')
                mobile_file.write(mfile['body'])

            slider = Slider(image=path + new_name)
            if mfile and mobile_new_name:
                slider.mobile_image = path + mobile_new_name
            if self.get_argument('text'):
                slider.text = self.get_argument('text')
            if self.get_argument('link'):
                slider.link = self.get_argument('link')
            slider = yield slider.save()
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            self.write(str(value))
    else:
        self.set_status(404)
        self.write('Not Found')

    self.finish()

def update(self, id):

    text = self.get_argument('text');
    link = self.get_argument('link');
    try:
        slider = yield Slider.objects.get(id)
        if slider:
            if 'file' in self.request.files:
                upload_file = self.request.files['file'][0]
                if upload_file:
                    new_name = datetime.now().strftime('%Y_%m_%d_%H_%M_%S') + '_' + upload_file['filename']
                    path = 'assets/uploads/'
                    os.makedirs(path, exist_ok=True)
                    new_file = open(path + new_name, 'wb')
                    new_file.write(upload_file['body'])

                    #remove old file
                    os.remove(slider.image)

                    slider.image = path + new_name

            if 'mfile' in self.request.files:
                mobile_file = self.request.files['mfile'][0]
                if mobile_file:
                    mobile_new_name = datetime.now().strftime('%Y_%m_%d_%H_%M_%S') + '_mobile_' + mobile_file['filename']
                    path = 'assets/uploads/'
                    os.makedirs(path, exist_ok=True)
                    mobile_new_file = open(path + mobile_new_name, 'wb')
                    mobile_new_file.write(mobile_file['body'])
                    
                    # remove old file
                    os.remove(slider.mobile_image)
                    
                    slider.mobile_image = path + mobile_new_name
            if text:
                slider.text = text
            if link:
                slider.link = link
            slider = yield slider.save()
        else:
            self.set_status(404)
            self.write('Not Found')
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    slider = yield Slider.objects.get(id)
    try:
        os.remove(slider.image)
        if slider.mobile_image:
            os.remove(slider.mobile_image)
    except: 
        pass
    slider.delete()

    self.finish()