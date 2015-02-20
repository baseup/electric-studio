import importlib
import tornado.gen
import tornado.web
import hurricane.web

def make_async(action):
    return tornado.web.asynchronous(action)

def make_coroutine(action):
    return tornado.gen.coroutine(action)

def make_non_blocking(action):
    action = make_async(action)
    action = make_coroutine(action)
    return action

def generate_controller(events):
    class RouteHandler(hurricane.web.RequestHandler):
        pass

    if hasattr(events, 'prepare'):
        if not callable(events.prepare):
            raise ActionNotCallableError('Event or Action is not callable')
        setattr(RouteHandler, 'prepare', make_coroutine(events.prepare))

    if hasattr(events, 'on_finish'):
        if not callable(events.on_finish):
            raise ActionNotCallableError('Event or Action is not callable')
        setattr(RouteHandler, 'on_finish', events.on_finish)
        
    return RouteHandler

class ActionNotCallableError(Exception):

    def __init__(self, message='Given action is not callable'):
        super().__init__(message)

class Route:

    def __init__(self, method, path, action, options=None):
        module = action.rsplit('.', 1)
        self.controller = module[0]
        self.action = 'index'
        if len(module) > 1:
            self.action = module[1]
        
        self.method = method
        self.options = options
        self.path = '/' + path.lstrip('/')
        self.handler_name = self.controller + '.' + self.action

    def set_filters(self, filters):
        if not isinstance(filters, dict):
            self.set_filters({ 'before': filters })
            return

        for key in filters.keys():
            filters[key] = make_non_blocking(filters[key])
        self._filters = filters

    def create_handler(self):
        module = importlib.import_module('app.controllers.' + self.controller)
        if hasattr(module, self.action):

            action = getattr(module, self.action)
            if not callable(action):
                raise ActionNotCallableError()

            filters = None
            if hasattr(self, '_filters'):
                filters = self._filters

            action = make_non_blocking(action)
            def route_handler(self, **kwargs):
                this_route_handler = self
                if not filters:
                    action(this_route_handler, **kwargs)

                elif 'before' in filters:

                    before_future_obj = filters['before'](this_route_handler)
                    def before_cb(self):
                        if self.result():
                            action(this_route_handler, **kwargs)
                            if 'after' in filters:
                                filters['after'](this_route_handler)

                    before_future_obj.add_done_callback(before_cb)
                    
                elif 'after' in filters:
                    filters['after'](this_route_handler)

            self.handler = route_handler
        else:
            def route_handler(self, **kwargs):
                pass
            self.handler = route_handler

class RouteGroup:

    def __init__(self, routes=[]):
        self.set_routes(routes)

    def set_routes(self, routes):
        self._routes = routes

    def add_route(self, route):
        self._routes.append(route)

    def clear_routes(self):
        self._routes = []

    def __getitem__(self, key):
        return self._routes[key]

class RouteResource(RouteGroup):

    def __init__(self, path, action, options=None):
        param_id  = '/(?P<id>[A-Za-z0-9-_]+)'
        super().__init__([
            Route('GET', path, action + '.find', options),
            Route('POST', path, action + '.create', options),
            Route('PUT', path + param_id, action + '.update', options),
            Route('GET', path + param_id, action + '.find_one', options),
            Route('DELETE', path + param_id, action + '.destroy', options)
        ])

class RoutePrefix(RouteGroup):

    def __init__(self, prefix, routes=[]):
        prefixed_routes = []
        prefix = '/' + prefix.lstrip('/')
        for route in routes:
            if isinstance(route, RouteGroup):
                for sub in route:
                    sub.path = prefix + sub.path
                    prefixed_routes.append(sub)
                continue
            route.path = prefix + route.path
            prefixed_routes.append(route)
        super().__init__(prefixed_routes)

class RouteSubdomain(RouteGroup):

    def __init__(self, subdomain, routes):
        subdomain_routes = []
        for route in routes:
            if isinstance(route, RouteGroup):
                for sub in route:
                    subdomain_routes.append(sub)
                continue
            subdomain_routes.append(route)
        super().__init__(subdomain_routes)