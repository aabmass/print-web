import os

from .base import *

DEBUG = False
SECRET_KEY = os.environ['SECRET_KEY']
STATIC_ROOT = os.environ['STATIC_ROOT']
MEDIA_ROOT = os.environ['STATIC_ROOT']

# I think more setup is required to force HTTPS
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = [
    'aabmass.it.cx'
]

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

# this can probably be tuned better
CONN_MAX_AGE = 60
