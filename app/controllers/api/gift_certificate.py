import sys
from datetime import datetime, timedelta
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, GiftCertificate
from app.models.users import User
from bson.objectid import ObjectId

import tornado
import json
import tornado.escape

def find(self):
    gift_certificates = yield GiftCertificate.objects.find_all()
    self.render_json(gift_certificates)

def find_one(self, id):
    gift_certificate = yield GiftCertificate.objects.get(id)
    self.render_json(gift_certificate)

def create(self):

    try :
        gift_certificate = GiftCertificate()
        package = yield Package.objects.get(self.get_argument('package_id'))

        gift_certificate.code = self.get_argument('code')
        gift_certificate.pin = self.get_argument('pin')

        if package:
            gift_certificate.package_id = package._id
            gift_certificate.amount = package.fee

        gift_certificate.trans_info = self.get_argument('trans_info')
        gift_certificate.sender_email = self.get_argument('sender_email')
        gift_certificate.receiver_email = self.get_argument('receiver_email')

        message = self.get_argument('message')
        if message:
            gift_certificate.message = message

        gift_certificate = yield gift_certificate.save()
        self.render_json(gift_certificate.to_dict())

    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
        self.finish()

def update(self, id):
    try :
        gift_certificate = yield GiftCertificate.objects.get(id)
        if self.get_argument('redeem'):
            gift_certificate.is_redeemed = True
            # ES account is required to redeem
            user = yield User.objects.get(self.get_argument('user_id'))
            if user:
                gift_certificate.redeemer_es_id = user._id
                gift_certificate.redeem_date = datetime.now()
            # Or delete the record and update user transactions
        else:
            package = yield Package.objects.get(self.get_argument('package_id'))

            gift_certificate.code = self.get_argument('code')
            gift_certificate.pin = self.get_argument('pin')
            gift_certificate.package_id = package._id
            gift_certificate.amount = package.fee

            gift_certificate.trans_info = self.get_argument('trans_info')
            gift_certificate.sender_email = self.get_argument('sender_email')
            gift_certificate.receiver_email = self.get_argument('receiver_email')

            if self.get_argument('message'):
                gift_certificate.message = self.get_argument('message')

        gift_certificate = yield gift_certificate.save()
        self.render_json(gift_certificate.to_dict())

    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
        self.finish()

def destroy(self, id):
    self.set_status(403)
    self.finish()
