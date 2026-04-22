FROM python:3.9.5-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy files
# COPY . /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Install dependencies
COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev

# Upgrade pip
RUN pip install --upgrade pip

# Entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]