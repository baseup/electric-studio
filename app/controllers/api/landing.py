
from motorengine.errors import InvalidDocumentError
from app.models.admins import LandingPage

import tornado
import json
import sys
    
def find(self):
    landing_pages = yield LandingPage.objects.find_all()
    
    for i, landing in enumerate(landing_pages):
        if landing.image:
            landing.image = self.static_url(landing.image)

    self.render_json(landing_pages)

def find_one(self, id):
    landing = yield LandingPage.objects.get(id)

    if landing.image:
        landing.image = self.static_url(landing.image)
    self.render_json(landing)

def create(self):

    data = tornado.escape.json_decode(self.request.body)
    try:
        landing = LandingPage(text=data['text'],
                              button_label=data['button_label'],
                              button_link=data['button_link'])
    
        landing = yield landing.save()
        return self.render_json(landing)
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()



def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try:
        landing = yield LandingPage.objects.get(id)
        if landing:
            landing.text = data['text']
            landing.button_label = data['button_label']
            landing.button_link = data['button_link']
            landing = yield landing.save()
    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    landing = yield LandingPage.objects.get(id)
    try:
        if landing.image:
            os.remove(landing.image)
    except: 
        pass
    landing.delete()
    self.finish()
