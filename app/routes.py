from hurricane.web import RouteProvider 
routes = RouteProvider()

routes.when('home.index', 'auth.login')

# Route Mappings
# Your routes map URLs to views and controllers.
routes.get('/', 'home.index')

routes.get('/classes', 'home.classes')
routes.get('/accounts', 'home.account')
routes.get('/packages', 'home.package')
routes.get('/schedules', 'home.schedule')
routes.get('/sliders', 'home.slider')
routes.get('/instructors', 'home.instructor')

routes.get('/login', 'home.login')
routes.post('/login', 'home.login')
routes.get('/logout', 'home.logout')

routes.resource('api/user', 'api.user')

routes.subdomain('api.electric-studio.dev', [
    ('resource', 'user', 'api.user')
])