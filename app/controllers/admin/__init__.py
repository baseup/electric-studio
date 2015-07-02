from app.models.admins import Admin
from passlib.hash import bcrypt
from app.models.packages import Package, UserPackage
from app.models.users import User
from app.helper import send_email_verification, send_email
from bson.objectid import ObjectId
from datetime import timedelta
from app.models.access import AccessType
from hurricane.helpers import to_json, to_json_serializable
from app.settings import PDT_TOKEN
from tornado.httpclient import HTTPRequest, AsyncHTTPClient

import sys
import tornado
import json
import base64
import urllib.parse

def index(self):
    self.render('admin', user=self.get_secure_cookie('admin'))

def privileges(self):
    username = self.get_secure_cookie('admin')
    admin = yield Admin.objects.get(username=username.decode('UTF-8'))
    access = AccessType()
    if admin is not None:
        access = yield AccessType.objects.get(admin_type=admin.access_type.admin_type)
        privileges = {}
        for i, privilege in enumerate(access.privileges):
           privileges[privilege.module] = privilege.actions
        access.privileges = privileges
    self.render_json(access.to_dict())   

def login(self):
    if self.request.method == 'GET':
        message = self.flash_secure_cookie('admin_login_invalid')
        if not message:
            message = ''
        self.render('login', message=message)
    else:
        username = self.get_argument('username')
        password = self.get_argument('password')
        instructor = yield AccessType.objects.get(admin_type='Instructor')
        admin = yield Admin.objects.get(username=username, access_type__ne=instructor)
        invalid = False
        try:
            if not admin or not bcrypt.verify(password, admin.password):
                invalid = True
        except ValueError:
            invalid = True
        if invalid:
            self.set_secure_cookie('admin_login_invalid', 'Invalid username and password')
            self.redirect('/admin/login')

        privileges = {}
        for i, privilege in enumerate(admin.access_type.privileges):
           privileges[privilege.module] = privilege.actions

        self.set_secure_cookie('privileges', to_json(privileges))
        self.set_secure_cookie('admin', admin.username)
        self.redirect('/admin/')

def logout(self):
    self.clear_cookie('admin')
    self.redirect('/admin/')

def buy(self):

    privileges = self.get_secure_cookie('privileges')
    privileges = tornado.escape.json_decode(privileges)
    forbid_access = False
    if 'accounts' not in privileges or 'manual_buy' not in privileges['accounts']:
        forbid_access = True

    if forbid_access:
        self.redirect('/admin/#/accounts?s=error&msg=Access Denied')

    success = self.get_argument('success')
    if success == 'True':

        user_id = self.get_argument('uid')
        user = yield User.objects.get(user_id)

        pid = self.get_argument('pid');
        package = yield Package.objects.get(pid)

        pack_name = package.name;
        if not pack_name:
            pack_name = str(package.credits) + ' Ride' + ('s' if package.credits > 1 else '')

        error = None
        if user:

            pp_tx = self.get_query_argument('tx')
            pp_st = self.get_query_argument('st')
            pp_amt = self.get_query_argument('amt')
            pp_cc = self.get_query_argument('cc')
            pp_cm = self.get_query_argument('cm')
            pp_item = self.get_query_argument('item_number')

            if not pp_tx:
                self.set_status(403)
                self.redirect('/admin/#/accounts?s=error')
                return

            trans_filter = { '$regex' : '.*' + pp_tx + '.*', '$options' : 'i' }
            trans_exists = yield UserPackage.objects.filter(user_id=user._id, trans_info=trans_filter).count()
            has_ft = yield UserPackage.objects.filter(user_id=user._id, package_ft=True).count()
            if trans_exists > 0:
                self.redirect('/admin/#/accounts?pname=' + pack_name + '&u=' + user.first_name + ' ' + user.last_name + '&s=success')
                return

            if package.first_timer and has_ft > 0:
                self.redirect('/admin/#/accounts?s=exists#packages')
                return

            post_body = urllib.parse.urlencode({
                'cmd' : '_notify-synch',
                'tx' : pp_tx,
                'at' : PDT_TOKEN,
            })

            url = 'https://www.paypal.com/cgi-bin/webscr'
            pp_request = HTTPRequest(url=url, method='POST', body=post_body, validate_cert=False)
            pp_response = yield AsyncHTTPClient().fetch(pp_request)
            pp_data = pp_response.body.decode('UTF-8')
            if 'SUCCESS' in pp_data:
                pp_data = pp_data[7:]
                pp_data = urllib.parse.unquote(pp_data)
     
                data = {
                    'transaction' : pp_tx,
                    'status' : pp_st,
                    'amount' : pp_amt,
                    'curency' : pp_cc,
                    'cm' : pp_cm,
                    'item_number' : pp_item,
                    'paypal_data' : pp_data
                }

                try:
                    if pid:
                        if user.status != 'Frozen' and user.status != 'Unverified':
                            transaction = UserPackage()
                            transaction.user_id = user._id
                            transaction.package_id = package._id
                            transaction.package_name = package.name
                            transaction.package_fee = package.fee
                            transaction.package_ft = package.first_timer
                            transaction.credit_count = package.credits
                            transaction.remaining_credits = package.credits
                            transaction.expiration = package.expiration
                            transaction.trans_info = str(data)
                            user.credits += package.credits

                            transaction = yield transaction.save()
                            user = yield user.save()

                            user = (yield User.objects.get(user._id)).serialize()
                            site_url = url = self.request.protocol + '://' + self.request.host + '/#/schedule'
                            exp_date = transaction.create_at + timedelta(days=transaction.expiration)
                            content = str(self.render_string('emails/buy', user=user, site=site_url, package=pack_name, expire_date=exp_date.strftime('%B %d, %Y')), 'UTF-8')
                            yield self.io.async_task(send_email, user=user, content=content, subject='Package Purchased')

                            self.redirect('/admin/#/accounts?pname=' + pack_name + '&u=' + user['first_name'] + ' ' + user['last_name'] + '&s=success')
                        else:
                            error = 'Invalid User Status'
                    else:
                        error = 'Package not found'
                except:
                    value = sys.exc_info()[1]
                    error = str(value)
            else:
                error = pp_data.replace('\n',' : ');
        else:
            error = 'User not found'

        if error:
            self.redirect('/admin/#/accounts?s=error&msg=' + error)
    else:
        self.redirect('/admin/#/accounts')

def ipn(self):

    data = tornado.escape.url_unescape(self.request.body)
    ipn_data = urllib.parse.parse_qs(data)
    for k in ipn_data.keys():
        ipn_data[k] = ipn_data[k][0]

    tx = ipn_data['txn_id']
    uid = ipn_data['transaction_subject']
    pid = ipn_data['item_number']
    error = None
    user = yield User.objects.get(ObjectId(uid))
    package = yield Package.objects.get(pid)
    if tx and user and package:
        trans_filter = { '$regex' : '.*' + tx + '.*', '$options' : 'i' }
        trans_exists = yield UserPackage.objects.filter(user_id=user._id, trans_info=trans_filter).count()
        has_ft = yield UserPackage.objects.filter(user_id=user._id, package_ft=True).count()
        if trans_exists <= 0:
            if package.first_timer and has_ft > 0:
                error = 'User already has first_timer package'
            else:
                data = {
                    'transaction' : tx,
                    'status' : ipn_data['payment_status'],
                    'amount' : ipn_data['mc_gross'],
                    'curency' : ipn_data['mc_currency'],
                    'cm' : ipn_data['transaction_subject'],
                    'item_number' : pid,
                    'paypal_data' : ipn_data
                }

                try: 
                    if pid:
                        if user.status != 'Frozen' and user.status != 'Unverified':
                            transaction = UserPackage()
                            transaction.user_id = user._id
                            transaction.package_id = package._id
                            transaction.package_name = package.name
                            transaction.package_fee = package.fee
                            transaction.package_ft = package.first_timer
                            transaction.credit_count = package.credits
                            transaction.remaining_credits = package.credits
                            transaction.expiration = package.expiration
                            transaction.trans_info = str(data)
                            user.credits += package.credits

                            transaction = yield transaction.save()
                            user = yield user.save()

                            pack_name = package.name;
                            if not pack_name:
                                pack_name = str(package.credits) + ' Ride' + ('s' if package.credits > 1 else '')

                            user = (yield User.objects.get(user._id)).serialize()
                            site_url = url = self.request.protocol + '://' + self.request.host + '/#/schedule'
                            exp_date = transaction.create_at + timedelta(days=transaction.expiration)
                            content = str(self.render_string('emails/buy', user=user, site=site_url, package=pack_name, expire_date=exp_date.strftime('%B %d, %Y')), 'UTF-8')
                            yield self.io.async_task(send_email, user=user, content=content, subject='Package Purchased')

                        else:
                            error = 'Invalid User Status'
                    else:
                        error = 'Package not found'
                except:
                    value = sys.exc_info()[1]
                    error = str(value)
        else:
            error = 'Transation ' + tx + ' already exists';
    else:
        error = str(ipn_data)

    if error:
        print('IPN Error: ' + error)

    self.finish()


