from hurricane import web
from app import routes, settings, events

application = web.Application(routes, events, settings)
application.run()
