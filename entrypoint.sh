#!/bin/bash

# Run database migrations
uv run python manage.py migrate

# Seed the database
uv run python manage.py seed store --number=5

# Start Django server
uv run python manage.py runserver 0.0.0:8000