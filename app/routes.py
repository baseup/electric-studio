from hurricane.web import RouteProvider 
routes = RouteProvider()

routes.when('admin.index', 'auth.admin')

# Route Mappings
# Your routes map URLs to views and controllers.

routes.resource('api/admin', 'api.admin')
routes.resource('api/user', 'api.user')
routes.resource('api/package', 'api.package')
routes.resource('api/instructor', 'api.instructor')

routes.get('/', 'home.index')
routes.get('/verify', 'home.verify')
routes.post('/verify', 'home.verify')
routes.post('/api/user/login', 'home.login')
routes.get('/api/user/logout', 'home.logout')

routes.get('/admin', 'admin.index')
routes.get('/login', 'admin.login')
routes.post('/login', 'admin.login')
routes.get('/logout', 'admin.logout')


routes.subdomain('api.electric-studio.dev', [
    ('resource', 'user', 'api.user')
])