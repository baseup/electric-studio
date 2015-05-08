from datetime import datetime, timedelta
from tornado import gen
from app.models.admins import Branch
from bson.objectid import ObjectId

import hashlib
import sys

@gen.coroutine
def auth_token(http_params):
    message, status, valid = '', 403, False
    if 'Es-Token' in http_params:
        token = http_params['Es-Token']
        branch = yield Branch.objects.get(token=token)
        if branch:
            if branch.expire_at > datetime.now():
                message = 'Valid token'
                valid = True
                status = 200
            else:
                message = 'Err: Expired token.'
        else:
            message = 'Err: Invalid token.'
    else:
        message = 'Err: No token.'\
        ' Please provide one for authentication.'

    return {
        'message': message,
        'valid': valid,
        'token': token,
        'status': status
    }

@gen.coroutine
def create_token(branch_id, password):
    message, status, token = '', 403, None
    success = False
    if branch_id and password:
        branch = yield Branch.objects.get(branch_id)
        if branch:
            # password = hashlib.md5(password.encode()).hexdigest()
            if branch.password == password:
                token = password + str(datetime.now()) + branch_id
                token = hashlib.md5(token.encode()).hexdigest()
                branch.token = token
                branch.expire_at = datetime.now() + timedelta(days=1)

                yield branch.save()
                success = True
            else:
                message ='Err: Invalid Password.'
        else:
            message ='Err: Branch does not exist.'
    else:
        message ='Err: No branch id or password.'\
        ' Please provide these two for authentication.'

    return {
        'message': message,
        'success': success,
        'token': token,
        'status': status
    }

