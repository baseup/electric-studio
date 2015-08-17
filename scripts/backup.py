import sys, os
sys.path.append(os.path.abspath('..'))

from app.settings import DATABASE

import datetime
import subprocess

def backup():
    today = datetime.datetime.now()

    default = DATABASE['default']

    output_dir = './'

    if len(sys.argv) > 1:
        try:
            output_dir = sys.argv[1]
        except ValueError:
            pass

    output_dir = os.path.abspath(os.path.join(
            os.path.curdir,
            output_dir))

    if (os.path.isdir(output_dir)):
        sys.exit('Directory %s can\'t be found.' % output_dir)

    output_dir = os.path.abspath(os.path.join(output_dir,
            '%s__%s'% ( default['db'], today.strftime('%Y_%m_%d_%H%M%S'))
            ))

    print('Backing up %s from %s to %s' % (default['db'], default['host'], output_dir))

    backup_output = subprocess.check_output(
    [
        'mongodump',
        '-host', '%s' % default['host'],
        '-u', '%s' % default['username'],
        '-p', '%s' % default['password'],
        '-d', '%s' % default['db'],
        '--port', '%s' % default['port'],
        '-o', '%s' % output_dir
    ])

    print(backup_output)

backup()
