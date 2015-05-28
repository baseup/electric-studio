from tornado.web import HTTPError
from tornado.web import *
from app.auth import auth_token
from app.models.access import AccessType
from app.models.admins import Admin

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

def access(self):
    if not self.get_secure_cookie('admin') and self.get_secure_cookie('privileges'):
        self.redirect('/admin/login')
        
    uri = self.request.uri.split('/')
    module, param_id = '', ''
    privileges = self.get_secure_cookie('privileges')
    privileges = tornado.escape.json_decode(privileges)
    forbid_access = False

    if len(uri) >= 2:
        module = uri[2]

        if module == 'user':
            module = 'account'
        if module == 'admin':
            module = 'user'
        module+='s'

    if self.request.method == 'GET':
        if 'read' not in privileges[module]:
            forbid_access = True
    if self.request.method == 'POST':
        if 'create' not in privileges[module]:
            forbid_access = True
    if self.request.method == 'PUT':
        if 'update' not in privileges[module]:
            forbid_access = True
    if self.request.method == 'DELETE':
        if 'delete' not in privileges[module]:
            forbid_access = True

    if forbid_access:
        self.set_status(403)
        self.finish()











