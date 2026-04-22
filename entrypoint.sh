#!/bin/bash

# Run database migrations
uv run python manage.py migrate

# Seed the database
# uv run python manage.py seed

# Start Django server
uv run python manage.py runserver 0.0.0:8000