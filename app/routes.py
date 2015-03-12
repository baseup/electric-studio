from hurricane.web import RouteProvider 
routes = RouteProvider()

routes.when('admin.index', 'auth.admin')

routes.get('/', 'home.index')
routes.get('/buy', 'home.buy')
routes.post('/buy', 'home.buy')
routes.get('/verify', 'home.verify')
routes.post('/verify', 'home.verify')
routes.post('/user/login', 'home.login')
routes.get('/user/logout', 'home.logout')
routes.get('/add_regular_schedules', 'home.addRegularSchedule')
routes.post('/upload/instructor', 'upload.instructor')

routes.prefix('/admin', [

    ('get', '/?', 'admin.index'),
    ('get', '/login', 'admin.login'),
    ('post', '/login', 'admin.login'),
    ('get', '/logout', 'admin.logout'),

    ('resource', '/transaction', 'admin.transaction'),
    ('resource', '/package', 'admin.package'),
    ('resource', '/user', 'admin.user'),
    ('resource', '/schedule', 'admin.schedule'),

    ('get', '/export/download-bookings', 'admin.export.download_bookings')
])

routes.prefix('/api', [
    ('resource', '/admin', 'api.admin'),
    ('resource', '/user', 'api.user'),
    ('resource', '/package', 'api.package'),
    ('resource', '/instructor', 'api.instructor'),
    ('resource', '/transaction', 'api.transaction'),
    ('resource', '/schedule', 'api.schedules'),
    ('resource', '/book', 'api.book'),
    ('resource', '/history', 'api.history')
])

routes.subdomain('api.electric-studio.dev', [
    ('resource', 'user', 'api.user')
])

