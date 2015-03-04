# Default port, if not specified it will use 8888
PORT = 8002

# If True, the server process will restart when any source files change, as described in Debug mode and automatic reloading.
# This option is new in Tornado 3.2; previously this functionality was controlled by the debug setting
# AUTORELOAD = False

# Shorthand for several debug mode settings, described in Debug mode and automatic reloading.
# Setting debug=True is equivalent to autoreload=True, compiled_template_cache=False, static_hash_cache=False, serve_traceback=True.
DEBUG = True

# This handler will be used if no other match is found; use this to implement custom 404 pages (new in Tornado 3.2).
# DEFAULT_HANDLER_CLASS = ''
# DEFAULT_HANDLER_ARGS = ''

# If True, responses in textual formats will be compressed automatically. New in Tornado 4.0.
COMPRESS_RESPONSE = True

# This function will be called at the end of every request to log the result (with one argument, the RequestHandler object).
# The default implementation writes to the logging module’s root logger.
# May also be customized by overriding Application.log_request.
# LOG_FUNCTION = ''

# If true, the default error page will include the traceback of the error.
# This option is new in Tornado 3.2; previously this functionality was controlled by the debug setting.
# SERVE_TRACEBACK = False

# May be set to a mapping of UIModule or UI methods to be made available to templates.
# May be set to a module, dictionary, or a list of modules and/or dicts. See UI modules for more details.
# UI_MODULES = ''
# UI_METHODS = ''

# Used by RequestHandler.get_secure_cookie and set_secure_cookie to sign cookies.
COOKIE_SECRET = 'elstudio!@#$%123'

# The authenticated decorator will redirect to this url if the user is not logged in.
# Can be further customized by overriding RequestHandler.get_login_url
# LOGIN_URL = ''

# If true, Cross-site request forgery protection will be enabled.
# XSRF_COOKIES = False

# Controls the version of new XSRF cookies produced by this server.
# Should generally be left at the default (which will always be the highest supported version),
# but may be set to a lower value temporarily during version transitions.
# New in Tornado 3.2.2, which introduced XSRF cookie version 2.
# XSRF_COOKIE_VERSION = ''

# Used in the tornado.auth module to authenticate to various APIs.
# TWITTER_CONSUMER_KEY = ''
# TWITTER_CONSUMER_SECRET = ''
# FRIENDFEED_CONSUMER_KEY = ''
# FRIENDFEED_CONSUMER_SECRET = ''
# GOOGLE_CONSUMER_KEY = ''
# GOOGLE_CONSUMER_SECRET = ''
# FACEBOOK_API_KEY = ''
# FACEBOOK_SECRET = ''

# Controls automatic escaping for templates.
# May be set to None to disable escaping, or to the name of a function that all output should be passed through.
# Defaults to "xhtml_escape". Can be changed on a per-template basis with the {% autoescape %} directive.
# AUTOESCAPE = 'xhtml_escape'

# Default is True; if False templates will be recompiled on every request.
# This option is new in Tornado 3.2; previously this functionality was controlled by the debug setting.
# COMPILED_TEMPLATE_CACHE = True

# Directory containing template files. Can be further customized by overriding RequestHandler.get_template_path
# TEMPLATE_PATH = ''

# Assign to an instance of tornado.template.BaseLoader to customize template loading.
# If this setting is used the template_path and autoescape settings are ignored.
# Can be further customized by overriding RequestHandler.create_template_loader.
# TEMPLATE_LOADER = ''

# Default is True; if False static urls will be recomputed on every request.
# This option is new in Tornado 3.2; previously this functionality was controlled by the debug setting.
# STATIC_HASH_CACHE = True

# Directory from which static files will be served.
# STATIC_PATH = 'assets'

# Url prefix for static files, defaults to "assets/"
# STATIC_URL_PREFIX = 'assets/'

# May be set to use a different handler for static files
# instead of the default tornado.web.StaticFileHandler. static_handler_args,
# if set, should be a dictionary of keyword arguments to be passed to the handler’s initialize method.
# STATIC_HANDLER_CLASS = ''
# STATIC_HANDLER_ARGS = ''

# Global XSS filtering for get_arguments method
# GLOBAL_XSS_FILTER = False

# MotorEngine Configuration
DATABASE = {
    'default': {
        'db': 'elstudio_db',
        'port': 27017,
        'host': 'localhost',
        'username': 'elstudio_user',
        'password': 'elstudio_notsecure'
    }
}