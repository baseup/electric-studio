from motorengine import *
from app.settings import MANDRILL_API_KEY, EMAIL_SENDER, EMAIL_SENDER_NAME

import mandrill

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

def send_email_verification(user, url):
    try:
        mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
        message = {
            'from_email': EMAIL_SENDER,
            'from_name': EMAIL_SENDER_NAME,
            'headers': {
                'Reply-To': EMAIL_SENDER
            },
            'html': '<p>Example HTML content<br><a href="' + url + '">Click here</a></p>',
            'important': True,
            'subject': 'Email Verification',
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

def send_email_booking(user, date, time, seat_number):
    try:
        mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
        message = {
            'from_email': EMAIL_SENDER,
            'from_name': EMAIL_SENDER_NAME,
            'headers': {
                'Reply-To': EMAIL_SENDER
            },
            'html': '<p>Booked: ' + date + ' ' + time + ' on seat no. ' + seat_number + '</p>',
            'important': True,
            'subject': 'Email Verification',
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
