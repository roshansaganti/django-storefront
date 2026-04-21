FROM python:3.9.5-slim-buster

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Install dependencies
COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev

# Upgrade pip
RUN pip install --upgrade pip