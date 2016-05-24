from hurricane import web
from app import routes, settings, events, socket

application = web.Application(routes, events, settings)
application.add_handlers(".*$", [
	(r'/ws', socket.Handler),
])
application.run()