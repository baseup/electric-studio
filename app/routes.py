from hurricane.web import RouteProvider 
routes = RouteProvider()

# Route Mappings
# Your routes map URLs to views and controllers.
routes.get('/', 'home.index')
routes.get('test', 'home.test')
routes.get('/visit', 'home.visit')
routes.get('/async', 'home.async')

routes.resource('api/user', 'api.user')
routes.resource('api/user', 'api.user')

routes.subdomain('api.electric-studio.dev', [
    ('resource', 'user', 'api.user')
])