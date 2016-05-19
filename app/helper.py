from motorengine import *
from datetime import datetime, timedelta, tzinfo
from app.settings import MANDRILL_API_KEY, EMAIL_SENDER, EMAIL_SENDER_NAME, REDIS_HOST, REDIS_PORT

import redis
import mandrill
import sys
import pytz
import string
import random

class Lock(object):
    redis_db = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

    @staticmethod
    def is_locked(key):
        return Lock.redis_db.exists(key)

    @staticmethod
    def lock(key):
        Lock.redis_db.set(key, True)

    @staticmethod
    def unlock(key):
        Lock.redis_db.delete(key)

class GMT8(tzinfo):
    def utcoffset(self, dt):
        return timedelta(hours=8, minutes=2)
    def dst(self, dt):
        return timedelta(0)
    def tzname(self,dt):
        return "GMT +8"

def create_at_gmt8(records):
    if records:
        gmt8 = GMT8()
        for i, record in enumerate(records):
            if records[i].create_at:
                records[i].create_at = records[i].create_at.replace(tzinfo=pytz.utc)
                records[i].create_at = records[i].create_at.astimezone(tz=gmt8)
            if hasattr(records[i], 'redeem_date') and records[i].redeem_date:
                records[i].redeem_date = records[i].redeem_date.replace(tzinfo=pytz.utc)
                records[i].redeem_date = records[i].redeem_date.astimezone(tz=gmt8)
    return records;

def code_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def mongo_to_dict(obj):
    return_data = []

    if isinstance(obj, Document):
        return_data.append(("id",str(obj._id)))

    for field_name in obj._fields:

        if field_name in ("id",):
            continue

        data = obj._values[field_name]

        if not data:
            continue

        if isinstance(obj._fields[field_name], DateTimeField):
            return_data.append((field_name, str(data.strftime('%Y-%m-%d %H:%M:%S'))))
        elif isinstance(obj._fields[field_name], StringField):
            return_data.append((field_name, str(data)))
        elif isinstance(obj._fields[field_name], FloatField):
            return_data.append((field_name, float(data)))
        elif isinstance(obj._fields[field_name], IntField):
            return_data.append((field_name, int(data)))
        elif isinstance(obj._fields[field_name], ListField):
            return_data.append((field_name, data))
        elif isinstance(obj._fields[field_name], EmbeddedDocumentField):
            return_data.append((field_name, mongo_to_dict(data)))
        else:
            return_data.append((field_name, str(data)))

    return dict(return_data)

def send_email_verification(user, content):
    try:
        mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
        message = {
            'from_email': EMAIL_SENDER,
            'from_name': EMAIL_SENDER_NAME,
            'headers': {
                'Reply-To': EMAIL_SENDER
            },
            'html': content,
            'important': True,
            'subject': 'Electric Studio - Email Verification',
            'to': [
                {
                    'email': user['email'],
                    'name': user['first_name'] + ' ' + user['last_name'],
                    'type': 'to'
                }
            ]
        }
        mandrill_client.messages.send(message=message, async=False, ip_pool='Main Pool')
    except mandrill.Error:
        raise

def send_email_booking(user, content):
    try:
        mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
        message = {
            'from_email': EMAIL_SENDER,
            'from_name': EMAIL_SENDER_NAME,
            'headers': {
                'Reply-To': EMAIL_SENDER
            },
            'html':  content,
            'important': True,
            'subject': 'Electric Studio - Booked',
            'to': [
                {
                    'email': user['email'],
                    'name': user['first_name'] + ' ' + user['last_name'],
                    'type': 'to'
                }
            ]
        }
        mandrill_client.messages.send(message=message, async=False, ip_pool='Main Pool')
    except mandrill.Error:
        raise

def send_email_cancel(user, content):
    try:
        mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
        message = {
            'from_email': EMAIL_SENDER,
            'from_name': EMAIL_SENDER_NAME,
            'headers': {
                'Reply-To': EMAIL_SENDER
            },
            'html': content,
            'important': True,
            'subject': 'Electric Studio - Cancelled',
            'to': [
                {
                    'email': user['email'],
                    'name': user['first_name'] + ' ' + user['last_name'],
                    'type': 'to'
                }
            ]
        }
        mandrill_client.messages.send(message=message, async=False, ip_pool='Main Pool')
    except mandrill.Error:
        raise

def send_email_move(user, content):
    try:
        mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
        message = {
            'from_email': EMAIL_SENDER,
            'from_name': EMAIL_SENDER_NAME,
            'headers': {
                'Reply-To': EMAIL_SENDER
            },
            'html': content,
            'important': True,
            'subject': 'Electric Studio - Bike Moved',
            'to': [
                {
                    'email': user['email'],
                    'name': user['first_name'] + ' ' + user['last_name'],
                    'type': 'to'
                }
            ]
        }
        mandrill_client.messages.send(message=message, async=False, ip_pool='Main Pool')
    except mandrill.Error:
        raise

def send_email(user, content, subject):
    try:
        mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
        message = {
            'from_email': EMAIL_SENDER,
            'from_name': EMAIL_SENDER_NAME,
            'headers': {
                'Reply-To': EMAIL_SENDER
            },
            'html': content,
            'important': True,
            'subject': 'Electric Studio - ' + subject,
            'to': [
                {
                    'email': user['email'],
                    'name': user['first_name'] + ' ' + user['last_name'],
                    'type': 'to'
                }
            ]
        }
        mandrill_client.messages.send(message=message, async=False, ip_pool='Main Pool')
    except mandrill.Error:
        raise
