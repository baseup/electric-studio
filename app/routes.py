from hurricane.web import RouteProvider 
routes = RouteProvider()

routes.when('admin.index', 'auth.admin')

# filters for pos api
routes.when('pos.buy', 'auth.api')
routes.when('pos.packages.find', 'auth.api')
routes.when('pos.packages.find_one', 'auth.api')
routes.when('pos.products.find', 'auth.api')
routes.when('pos.products.find_one', 'auth.api')
routes.when('pos.products.create', 'auth.api')
routes.when('pos.products.update', 'auth.api')
routes.when('pos.products.destroy', 'auth.api')
routes.when('pos.transactions.find', 'auth.api')
routes.when('pos.transactions.find_one', 'auth.api')
routes.when('pos.users.find', 'auth.api')
routes.when('pos.users.find_one', 'auth.api')

# admin access
routes.when('admin.user.create', 'auth.access')
routes.when('admin.user.update', 'auth.access')
routes.when('admin.user.destroy', 'auth.access')
routes.when('api.admin.create', 'auth.access')
routes.when('api.admin.update', 'auth.access')
routes.when('api.admin.destroy', 'auth.access')
routes.when('admin.instructor.create', 'auth.access')
routes.when('admin.instructor.update', 'auth.access')
routes.when('admin.instructor.destroy', 'auth.access')
routes.when('admin.package.create', 'auth.access')
routes.when('admin.package.update', 'auth.access')
routes.when('admin.package.destroy', 'auth.access')
routes.when('admin.slider.create', 'auth.access')
routes.when('admin.slider.update', 'auth.access')
routes.when('admin.slider.destroy', 'auth.access')
routes.when('admin.schedule.create', 'auth.access')
routes.when('admin.schedule.update', 'auth.access')
routes.when('admin.schedule.destroy', 'auth.access')
routes.when('admin.transaction.create', 'auth.access')
routes.when('admin.transaction.update', 'auth.access')
routes.when('admin.transaction.destroy', 'auth.access')
routes.when('admin.buy', 'auth.access')


routes.get('/', 'home.index')
routes.get('/buy', 'home.buy')
routes.post('/buy', 'home.buy')
routes.get('/verify', 'home.verify')
routes.post('/verify', 'home.verify')
routes.get('/fpass', 'home.forgot_password')
routes.post('/fpass', 'home.forgot_password')
routes.post('/user/login', 'home.login')
routes.get('/user/logout', 'home.logout')
routes.post('/upload/instructor', 'upload.instructor')
routes.post('/upload/images', 'upload.images')

# to be remove
routes.get('/add_default_sudopass', 'home.add_default_sudopass')
routes.get('/add_regular_schedules', 'home.add_regular_schedule')
routes.get('/test_waitlist', 'home.test_waitlist')
routes.get('/remove_test_waitlist', 'home.remove_test_waitlist')
routes.get('/package_migrate', 'home.package_migrate')
routes.get('/schedule_migrate', 'home.schedule_migrate')
routes.get('/add_branch', 'home.add_branch')
routes.get('/add_access_types', 'home.add_access_types')
routes.prefix('/admin', [

    ('get', '/?', 'admin.index'),
    ('get', '/buy', 'admin.buy'),
    ('post', '/buy', 'admin.buy'),
    ('get', '/login', 'admin.login'),
    ('post', '/login', 'admin.login'),
    ('get', '/logout', 'admin.logout'),
    ('get', '/privileges', 'admin.privileges'),

    ('resource', '/security', 'admin.security'),
    ('resource', '/setting', 'admin.setting'),
    ('resource', '/transaction', 'admin.transaction'),
    ('resource', '/statistic', 'admin.statistic'),
    ('resource', '/package', 'admin.package'),
    ('resource', '/user', 'admin.user'),
    ('resource', '/schedule', 'admin.schedule'),
    ('resource', '/instructor/schedules', 'admin.instructor_schedules'),
    ('resource', '/slider', 'admin.slider'),
    ('resource', '/access', 'admin.access'),

    ('get', '/export/download-bookings', 'admin.export.download_bookings'),
    ('get', '/export/waitlist', 'admin.export.waitlist'),
    ('get', '/export/download-user-accounts', 'admin.export.download_user_accounts')
])

routes.prefix('/api', [
    ('resource', '/admin', 'api.admin'),
    ('resource', '/user', 'api.user'),
    ('resource', '/package', 'api.package'),
    ('resource', '/instructor', 'api.instructor'),
    ('resource', '/transaction', 'api.transaction'),
    ('resource', '/schedule', 'api.schedules'),
    ('resource', '/book', 'api.book'),
    ('resource', '/history', 'api.history'),
    ('resource', '/users', 'pos.users'),
    ('resource', '/packages', 'pos.packages'),
    ('resource', '/products', 'pos.products'),
    ('resource', '/transactions', 'pos.transactions'),
    ('post', '/buy', 'pos.buy'),
    ('get', '/request_token', 'pos.request_token')
])

routes.subdomain('api.electric-studio.dev', [
    ('resource', 'user', 'api.user')
])

