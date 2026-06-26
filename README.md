# django-storefront
An e-commerce web application created in Django.

## Run Migrations

```
python manage.py migrate
```

If there are errors:
```
python manage.py migrate --skip-checks
```

## Seed Database

```
python manage.py shell < store/seeds.py
```