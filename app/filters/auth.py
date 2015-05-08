from tornado.web import HTTPError
from tornado.web import *
from app.auth import auth_token

def admin(self):
    if not self.get_secure_cookie('admin'):
        self.redirect('/admin/login')

def api(self):
    header = self.request.headers
    if 'ES-Token' in header:
        auth = yield auth_token(self.request.headers)
        if not auth['valid']:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
