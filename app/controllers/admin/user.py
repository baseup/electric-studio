import sys
from passlib.hash import bcrypt
from motorengine.errors import InvalidDocumentError
from motorengine import DESCENDING, ASCENDING
from app.models.users import User
from app.models.packages import UserPackage
from app.models.schedules import BookedSchedule
from hurricane.helpers import to_json, to_json_serializable
from datetime import datetime, timedelta
from app.helper import send_email, send_email_template
from app.helper import create_at_gmt8
from motorengine import Q
from bson.objectid import ObjectId
import tornado
import json

def find(self):
    str_skip = self.get_query_argument('skip');
    deactivated = self.get_query_argument('deactivated')
    search = self.get_query_argument('search');
    query = User.objects.order_by('update_at',direction=DESCENDING).filter(status__ne='Deleted')
    get_all_flag = self.get_query_argument('get_all')

    if not deactivated:
        query.filter(status__ne='Deactivated')
    else:
        if search:
            q = { '$regex' : '.*' + search + '.*', '$options' : 'i' }
            arg = Q(first_name=q) | Q(last_name=q) | Q(email=q)
            query.filter(arg)

        skip_val = 0
        if str_skip:
            skip_val = int(str_skip)
        if get_all_flag is None:
            query.skip(skip_val).limit(15)

    users = yield query.find_all()

    self.render_json(users)

def find_one(self, id):
    user = yield User.objects.get(id)
    json_user = to_json_serializable(user)

    with_books = self.get_query_argument('books')
    if with_books:
        start_date = self.get_query_argument('fromDate')
        end_date = self.get_query_argument('toDate')
        now = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')
        from_date = now
        if start_date:
            from_date = datetime.strptime(start_date, '%Y-%m-%d')
        to_date = now + timedelta(days=7)
        if end_date:
            to_date = datetime.strptime(end_date, '%Y-%m-%d')

        books = yield BookedSchedule.objects.filter(user_id=user._id, date__gte=from_date, date__lte=to_date) \
                                            .order_by('date', direction=ASCENDING).find_all()
        books = create_at_gmt8(books)
        json_user['books'] = to_json_serializable(books)
    else:
        page = 0
        pages = yield UserPackage.objects.filter(user_id=user._id).order_by('expire_date').count();
        packages = []
        if self.get_query_argument('page'):
            page = int(self.get_query_argument('page'))
        if ((pages - (page * 10)) > 0):
            packages = yield UserPackage.objects.filter(user_id=user._id).order_by('expire_date') \
                    .skip(page * 10).limit(10).find_all()

        packages = create_at_gmt8(packages)
        json_user['packages'] = to_json_serializable(packages)

    self.write(to_json(json_user))
    self.finish()

def create(self):

    data = tornado.escape.json_decode(self.request.body)

    password = None
    if 'password' in data:
        password = bcrypt.encrypt(data['password'])

    is_exist = (yield User.objects.filter(email=data['email'], status__ne='Deleted').count())
    if is_exist > 0:
        self.set_status(400)
        self.write('Email address is already in use.')
    else:
        try:
            user = User(first_name=data['first_name'],
                        # middle_name=data['middle_name'],
                        last_name=data['last_name'],
                        email=data['email'].lower(),
                        password=password,
                        status='Unverified',
                        credits=0)

            if 'notes' in data:
                user.notes = data['notes']

            user = yield user.save()
        except:
            value = sys.exc_info()[1]
            self.set_status(403)
            str_value = str(value)
            if 'The index ' in str_value and ' was violated ' in str_value:
                str_value = 'Email already in used'
            self.write(str_value)
    self.finish()

def update(self, id):
    data = tornado.escape.json_decode(self.request.body)
    try:
        user = yield User.objects.get(id)

        if 'current_password' in data:
            if(bcrypt.verify(data['current_password'], user.password)):
                user.password = bcrypt.encrypt(data['password'])
                user = yield user.save()
            else:
                self.set_status(403)
                self.write('Current Password did not match')
        elif 'froze_account' in data:
            user.status = 'Frozen'
            user.remarks = data['froze_account']
            scheds = yield BookedSchedule.objects.filter(user_id=user._id, status='booked').find_all()
            for i, sched in enumerate(scheds):
                sched.status = 'cancelled';
                deduct_credits = 1
                if sched.schedule.type == 'Electric Endurance':
                    deduct_credits = 2
                if sched.user_package:
                    if len(sched.user_package) == 1:
                        upack = yield UserPackage.objects.get(ObjectId(sched.user_package[0]))
                        upack.remaining_credits += deduct_credits
                        yield upack.save()
                    else:
                        upack1 = yield UserPackage.objects.get(ObjectId(sched.user_package[0]))
                        upack2 = yield UserPackage.objects.get(ObjectId(sched.user_package[1]))
                        upack1.remaining_credits += 1
                        upack2.remaining_credits += 1
                        yield upack1.save()
                        yield upack2.save()
                user.credits += deduct_credits
                sched = yield sched.save()
            user = yield user.save()
        elif 'deactivate' in data:
            user.status = 'Deactivated'
            scheds = yield BookedSchedule.objects.filter(user_id=user._id, status='booked').find_all()
            for i, sched in enumerate(scheds):
                sched.status = 'cancelled';
                deduct_credits = 1
                if sched.schedule.type == 'Electric Endurance':
                    deduct_credits = 2
                if sched.user_package:
                    if len(sched.user_package) == 1:
                        upack = yield UserPackage.objects.get(ObjectId(sched.user_package[0]))
                        upack.remaining_credits += deduct_credits
                        yield upack.save()
                    else:
                        upack1 = yield UserPackage.objects.get(ObjectId(sched.user_package[0]))
                        upack2 = yield UserPackage.objects.get(ObjectId(sched.user_package[1]))
                        upack1.remaining_credits += 1
                        upack2.remaining_credits += 1
                        yield upack1.save()
                        yield upack2.save()

                user.credits += deduct_credits
                sched = yield sched.save()
            user = yield user.save()

        elif 'unfroze' in data or 'activate' in data:
            user.status = 'Active'
            user = yield user.save()
        elif 'verify' in data:
            user.status = 'Active'
            user = yield user.save()

            user = (yield User.objects.get(user._id)).serialize()
            host = self.request.protocol + '://' + self.request.host
            book_url = host + '/#/schedule'
            pack_url = host + '/#/rates-and-packages'
            context = { 'fname': user['first_name'], 'lname': user['last_name'], 'book_url': book_url, 'pack_url': pack_url }
            yield self.io.async_task(send_email_template, template='welcome', user=user, context=context, subject='Welcome to Team Electric')

        elif 'billing' in data:
            user.billing = data['billing']
            user = yield user.save()
        else:
            user.first_name = data['first_name']
            # user.middle_name = data['middle_name']
            user.last_name = data['last_name']

            if data.get('birthdate'):
                try:
                    user.birthdate = datetime.strptime(data['birthdate'],'%Y-%m-%d')
                except:
                    pass
            if data.get('address'):
                user.address = data['address']
            if data['phone_number'] != None:
                user.phone_number = data['phone_number']
            if data['contact_person'] != None:
                user.contact_person = data['contact_person']
            if data['emergency_contact'] != None:
                user.emergency_contact = data['emergency_contact']
            if data.get('notes'):
                user.notes = data['notes']

            user = yield user.save()

    except:
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    # user = yield User.objects.get(id)

    # scheds = yield BookedSchedule.objects.filter(user_id=user._id, status__ne='completed') \
    #                               .filter(status__ne='cancelled') \
    #                               .filter(status__ne='missed').find_all()
    # if scheds:
    #     for i, sched in enumerate(scheds):

    #         if sched.user_package:
    #             sched.user_package.remaining_credits += 1
    #             yield sched.user_package.save()

    #         if sched.status == 'waitlisted':
    #             user.credits += 1

    #         sched.status = 'cancelled'
    #         yield sched.save()

    # user.status = 'Deleted'
    # user = yield user.save()
    self.finish()
