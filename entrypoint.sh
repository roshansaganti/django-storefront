#!/bin/bash

# Run database migrations
echo "Running database migrations..."
uv run python manage.py migrate
echo "Database migrations completed."

# Seed the database
echo "Seeding the database..."
uv run python manage.py shell < store/seeds.py
echo "Database seeding completed."

# Start Django server
echo "Starting Django server..."
uv run python manage.py runserver 0.0.0:8000