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

    if not os.path.isdir(output_dir):
        sys.exit('Directory %s can\'t be found.' % output_dir)

    commit = '%s__%s' % ( default['db'], today.strftime('%Y_%m_%d_%H%M%S'))

    print('Backing up %s from %s to %s' % (default['db'], default['host'], output_dir))

    output = subprocess.check_output(
    [
        'mongodump',
        '-host', '%s' % default['host'],
        '-u', '%s' % default['username'],
        '-p', '%s' % default['password'],
        '-d', '%s' % default['db'],
        '--port', '%s' % default['port'],
        '-o', '%s' % output_dir
    ])

    print(output)

    os.chdir(output_dir)

    try:
        output = subprocess.check_output(["git", "add", "."])
        print(output.decode('UTF-8'))

        output = subprocess.check_output(["git", "commit", "-m", '%s' % commit])
        print(output.decode('UTF-8'))

        output = subprocess.check_output(["git", "push", "-u", "origin", "master"])
        print(output.decode('UTF-8'))
    except subprocess.CalledProcessError as e:
        print(e.output.decode('UTF-8'))

backup()
