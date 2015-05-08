from bson.objectid import ObjectId
from app.models.users import User
from app.models.packages import Package, UserPackage
from app.auth import auth_token, create_token
from datetime import datetime, timedelta
from app.helper import send_email

import sys
import tornado

def request_token(self):
    header = self.request.headers
    if 'ES-Branch' in header and 'ES-Password' in header:
        branch_id = header['ES-Branch']
        password = header['ES-Password']

        result = yield create_token(branch_id, password)
        self.set_status(result['status'])       
        self.render_json(result)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')

def buy(self):
    message, success, status = '', False, 400
    package_id = self.get_argument('package_id')
    user_id = self.get_argument('user_id')
    if user_id and package_id:
        package = yield Package.objects.get(package_id) 
        user = yield User.objects.get(user_id)
        if user:
            if user.status !='Frozen' and user.status !='Unverified':
                if package:
                    transaction = UserPackage()
                    transaction.user_id = user._id
                    transaction.package_id = package._id
                    transaction.package_name = package.name
                    transaction.package_fee = package.fee
                    transaction.credit_count = package.credits
                    transaction.remaining_credits = package.credits
                    transaction.expiration = package.expiration
                    transaction.trans_info = ''
                    user.credits += package.credits

                    transaction = yield transaction.save()
                    user = yield user.save()

                    user = (yield User.objects.get(user._id)).serialize()
                    site_url = url = self.request.protocol + '://' + self.request.host + '/#/schedule'
                    exp_date = transaction.create_at + timedelta(days=transaction.expiration)

                    # content = str(self.render_string('emails/buy', user=user, site=site_url, package=package.name, expire_date=exp_date.strftime('%B. %d, %Y')), 'UTF-8')
                    # yield self.io.async_task(send_email, user=user, content=content, subject='Package Purchased')

                    self.render_json(transaction)
                else:
                    message = 'Invalid transaction: No package found with this id ' + package_id
            else:
                message = 'Invalid transaction: User ' + user.status
        else:
            message = 'Invalid transaction: Required ES user account'
    else:
        message = 'Invalid params. Please provide valid user and package id'
    
    result = {
        'message' : message,
        'valid' : success,
        'status' : status
    }           

    self.set_status(status)
    self.render_json(result)

    

