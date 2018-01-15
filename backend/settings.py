import datetime

class ConfigBase():
    DEBUG = True
    SECRET_KEY = '\x15\x15\\\xfdO=\x1c_\x9f(\x0e\xff\xe96_\xa0\xdd~k\xe0Z\xeb\xb24'
    JWT_DEFAULT_REALM = 'Login required'
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=31)
    MONGODB_SETTINGS = {
        'db': 'chat',
        'host': '127.0.0.1',
        'username': '',
        'password': ''
    }


class Development(ConfigBase):
    DEBUG = True

class Production(ConfigBase):
    DEBUG = False
