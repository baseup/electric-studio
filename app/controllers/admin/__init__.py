from app.models.admins import Admin
from passlib.hash import bcrypt
from app.models.packages import Package, UserPackage
from app.models.users import User
from app.helper import send_email_verification, send_email
from bson.objectid import ObjectId
from datetime import timedelta
from app.models.access import AccessType
from hurricane.helpers import to_json, to_json_serializable
import sys
import tornado
import json
import base64

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
     
            data = {
                'transaction' : pp_tx,
                'status' : pp_st,
                'amount' : pp_amt,
                'curency' : pp_cc,
                'cm' : pp_cm,
                'item_number' : pp_item
            }

            user_packages = yield UserPackage.objects.filter(user_id=user._id).find_all()
            if user_packages:
                for upack in user_packages:
                    if upack.trans_info and pp_tx in upack.trans_info:
                        self.redirect('/admin/#/accounts?s=exists#packages')
                        return
         
            try: 
                pid = self.get_argument('pid');
                package = yield Package.objects.get(pid)
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
                            pack_name = package.credits + ' Ride' + ('s' if package.credits > 1 else '')

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
            error = 'User not found'

        if error:
            self.redirect('/admin/#/accounts?s=error&msg=' + error)
    else:
        self.redirect('/admin/#/accounts')

