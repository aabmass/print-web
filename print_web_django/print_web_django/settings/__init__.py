import os

# default to local
env = 'local'
# the envar key for the environment to run the app
envar_key = 'ENVIRONMENT'

if envar_key in os.environ:
    env = os.environ[envar_key].lower()

if 'prod' in env:
    from .production import *
else:
    from .local import *

