import sys
from datetime import datetime, timedelta
from motorengine.errors import InvalidDocumentError
from app.models.packages import Package, GiftCertificate, UserPackage
from app.models.users import User
from bson.objectid import ObjectId
from app.helper import create_at_gmt8, code_generator
from app.helper import GMT8
from motorengine import DESCENDING

import tornado
import json
import tornado.escape
import string

def find(self):
    page_limit = 10
    page = 0
    transactions = []
    total = yield GiftCertificate.objects.count();
    if self.get_argument('page'):
        page = int(self.get_argument('page'))
    gift_certificates = []
    if(total - (page * page_limit)) > 0:
        gift_certificates = yield GiftCertificate.objects.order_by('create_at', direction=DESCENDING) \
                    .skip(page * page_limit).limit(page_limit).find_all()
    gift_certificates = create_at_gmt8(gift_certificates)
    self.render_json(gift_certificates)

def find_one(self, id):
    gift_certificate = yield GiftCertificate.objects.get(id)
    self.render_json(gift_certificate)

def create(self):
    # create batch gcs
    data = tornado.escape.url_unescape(self.request.body)
    gc_data = tornado.escape.json_decode(data)
    count = int(gc_data['count'])
    pid = gc_data['package_id']

    for i in range(count):
        try:
            gift_certificate = GiftCertificate()
            code = code_generator()
            pin = int(code_generator(4, string.digits))
            package = yield Package.objects.get(pid)
            if package:
                gift_certificate.package_id = package._id
                gift_certificate.amount = package.fee
                gift_certificate.pin = pin
                gift_certificate.code = code

            gift_certificate = yield gift_certificate.save()
        except :
            value = sys.exc_info()[1]
            self.set_status(403)

            print(value)
            self.redirect('/#/gift-cards?s=error&msg=' + str(value))
    self.finish()

def update(self, id):

    data = tornado.escape.url_unescape(self.request.body)
    redeem_data = tornado.escape.json_decode(data)
    try :
        code = redeem_data['code']
        pin = redeem_data['pin']
        user_id = redeem_data['user_id']
        gift_certificate = yield GiftCertificate.objects.get(code=code, pin=pin, is_redeemed=False) # 
        user = yield User.objects.get(user_id)
        
        if gift_certificate:
            gift_certificate.is_redeemed = True
            gc_dict = gift_certificate.to_dict()

            # get user and package
            package = yield Package.objects.get(gc_dict['package_id'])

            # ES account is required to redeem
            gift_certificate.redeemer_es_id = user._id
            gift_certificate.redeem_date = datetime.now()

            # # save this into user transaction
            transaction = UserPackage()
            transaction.user_id = user._id
            transaction.package_id = package._id
            transaction.package_name = package.name
            transaction.package_fee = package.fee
            transaction.package_ft = package.first_timer
            transaction.credit_count = package.credits
            transaction.remaining_credits = package.credits
            transaction.expiration = package.expiration
            transaction.expire_date = datetime.now() + timedelta(days=package.expiration)
            transaction.trans_id = gift_certificate.pptx
            transaction.trans_info = gift_certificate.trans_info
            user.credits += package.credits

            gift_certificate = yield gift_certificate.save()
            transaction = yield transaction.save()
            user = yield user.save()

            self.render_json(gift_certificate.to_dict())

        else:
            self.set_status(403)
            self.write('Invalid code and pin')
            self.finish()
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
        self.finish()

def destroy(self, id):
    self.set_status(403)
    self.finish()
