from motorengine import DESCENDING
from app.models.packages import UserPackage, Package
from app.models.schedules import BookedSchedule
from app.models.users import User
import tornado.escape

def find(self):
    if self.get_secure_cookie('loginUserID'):
        user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
        user = yield User.objects.get(user_id)

        if user:

            maxScheds = yield BookedSchedule.objects.filter(user_id=user._id).count()
            maxTrans = yield UserPackage.objects.filter(user_id=user._id).count()

            schedPage = 0
            transPage = 0
            if self.get_argument('schedPage'):
                schedPage = int(self.get_argument('schedPage'))
            if self.get_argument('transPage'):
                transPage = int(self.get_argument('transPage'))

            schedules = yield BookedSchedule.objects.order_by("create_at", direction=DESCENDING).filter(user_id=user._id).skip(schedPage * 10).limit(10).find_all()
            transactions = yield UserPackage.objects.order_by("create_at", direction=DESCENDING).filter(user_id=user._id).skip(transPage * 10).limit(10).find_all()

            self.render_json({
                'schedules' : schedules,
                'transactions' : transactions,
                'schedsTotal' : maxScheds / 10,
                'transTotal' : maxTrans / 10
            })
        else:
            self.finish();
    else:
        self.set_status(403)
        self.write('User not logged In')
        self.finish()
    
