FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy files
# COPY . /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Install OS packages required to build mysqlclient
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      default-libmysqlclient-dev \
      pkg-config \
      python3-dev && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev

# Upgrade pip
RUN pip install --upgrade pip

# Entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]