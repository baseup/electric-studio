![Electric Studio Logo](https://instagram.fceb1-1.fna.fbcdn.net/t51.2885-19/s150x150/11917811_1676999189253635_584378407_a.jpg) 
[Electric Studio](https://electricstudio.ph)
==================================


## Clone the repo
`$ git clone https://github.com/baseup/electric-studio.git`

## Clone the PyHurricane repo
    $ cd electric-studio
    $ git clone https://github.com/baseup/PyHurricane.git hurricane

## Virtual Env
### Install Virtual Env
`$ pip install virtualenv`

### Create a Virtual Env
You have to specify the python environment to make sure:

    $ cd electric-studio
    $ virtualenv -p `which python3` esenv

### Activate It!
`$ . esenv/bin/activate`

## Install Python Requirements
`$ pip3 install -r requirements.txt`

## Install npm and bower requirements

```$ npm install && bower install```

## Run Grunt

```$ grunt```

## Run tests

[Testing Guide](TESTING.md)

## Run server

```$ python3 server.py```
