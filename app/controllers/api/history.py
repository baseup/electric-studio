from app.models.packages import UserPackage, Package
from app.models.schedules import BookedSchedule
from app.models.users import User
import tornado.escape

def find(self):
    if self.get_secure_cookie('loginUserID'):
        user_id = str(self.get_secure_cookie('loginUserID'), 'UTF-8');
        user = yield User.objects.get(user_id)
        schedules = yield BookedSchedule.objects.filter(user_id=user._id).find_all()
        transactions = yield UserPackage.objects.filter(user_id=user._id).find_all()

        self.render_json({
            'schedules' : schedules,
            'transactions' : transactions
        })
    else:
        self.set_status(403)
        self.write('User not logged In')
        self.finish()
    
