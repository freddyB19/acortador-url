#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requeriments.txt

python manage.py collectstatic --no-input
python manage.py makemigrations 
python manage.py migrate auth
python manage.py migrate --run-syncdb