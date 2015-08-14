import sys, os
sys.path.append(os.path.abspath('../..'))

from app.settings import DATABASE
from motorengine import connect

import tornado.ioloop

def connect_db():
    def create_host(config):
        port = ''
        host = 'mongodb://'
        credentials = ''
        if 'password' in config and config['password']:
            credentials = ':' + config['password']
        if 'username' in config and config['username']:
            credentials = config['username'] + credentials + '@'
        if 'port' in config and config['port']:
            port = ':' + str(config['port'])
        return host + credentials + config['host'] + port + '/' + config['db']

    io_loop = tornado.ioloop.IOLoop.instance()
    default = DATABASE['default']
    connect(default['db'], host=create_host(default), io_loop=io_loop)

    return io_loop
