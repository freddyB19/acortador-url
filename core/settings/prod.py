import os
import dj_database_url

from corsheaders.defaults import default_methods, default_headers

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = 'RENDER' not in os.environ


ALLOWED_HOSTS = []

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)



# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(
        # Feel free to alter this value to suit your needs.
        default='postgres://freddy:KaiqBzk6fd8yzLIiBROoIXNAGsQ1yNkh@dpg-cic6k9t9aq03rjloh5n0-a/dbacortador_url',
        conn_max_age=600
    )
}


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)


if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, 'static_root', "static")

    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    'https://django-acortador-url.onrender.com'

]
# Una lista de orígenes confiables para solicitudes no seguras
CSRF_TRUSTED_ORIGINS = [
    'https://django-acortador-url.onrender.com'
]

# Cors Methods
CORS_DEFAULT_METHODS = list(default_methods)

CORS_ADD_METHODS = []

CORS_ALLOW_METHODS =  CORS_DEFAULT_METHODS + CORS_ADD_METHODS


# Cors Headers
CORS_DEFAULT_HEADERS = list(default_headers)

CORS_ADD_HEADERS = [
    "content-disposition",
    'X-CSRFToken'
]


CORS_ALLOW_HEADERS = CORS_DEFAULT_HEADERS + CORS_ADD_HEADERS
