import os

from corsheaders.defaults import default_methods, default_headers

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
# postgres://freddy:KaiqBzk6fd8yzLIiBROoIXNAGsQ1yNkh@dpg-cic6k9t9aq03rjloh5n0-a.oregon-postgres.render.com/dbacortador_url
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': BASE_DIR / 'db.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3')

    }
}


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
    # BASE_DIR / "static",
)


STATIC_ROOT = os.path.join(BASE_DIR, "static_root", "static")

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "http://localhost:8000",

]
# Una lista de orígenes confiables para solicitudes no seguras
CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:8080",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
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
