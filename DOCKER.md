# Docker Setup Guide

This guide explains how to run the Private Decentralized Lottery application using Docker.

## Prerequisites

- [Docker](https://www.docker.com/get-started) (version 20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or later)

## Quick Start

1. **Clone the repository and accumulator submodule**

   ```bash
   git clone https://github.com/ASAP-Bilkent/private-decentralized-lottery.git
   cd private-decentralized-lottery
   git clone https://github.com/cambrian/accumulator.git
   ```

2. **Create environment file**

   Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your values:

   ```
   PRIVATE_KEY=your_private_key_here
   RPC_URL=https://sepolia.infura.io/v3/your_custom_url
   ```

3. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the backend (Rust) and frontend (Next.js) images
   - Start both services
   - Make the frontend available at `http://localhost:3000`
   - Make the backend API available at `http://localhost:8080`

4. **Access the application**

   Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Docker Commands

### Build images

```bash
docker-compose build
```

### Start services

```bash
docker-compose up
```

### Start services in detached mode

```bash
docker-compose up -d
```

### Stop services

```bash
docker-compose down
```

### View logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs
docker-compose logs -f
```

### Rebuild and restart

```bash
docker-compose up --build --force-recreate
```

## Architecture

The Docker setup consists of two services:

1. **backend**: Rust/Actix-web server
   - Port: 8080
   - Environment variables: `PRIVATE_KEY`, `RPC_URL`, `RUST_LOG`

2. **frontend**: Next.js application
   - Port: 3000
   - Environment variable: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8080`)

## Troubleshooting

### Backend won't start

- Check that the `.env` file exists and contains valid `PRIVATE_KEY` and `RPC_URL` values
- Check logs: `docker-compose logs backend`

### Frontend can't connect to backend

- Ensure both services are running: `docker-compose ps`
- Check that the backend is accessible: `curl http://localhost:8080/announce_winner`
- Verify the `NEXT_PUBLIC_API_URL` environment variable in `docker-compose.yml`

### Build failures

- Ensure the `accumulator` directory exists (clone it if missing)
- Clear Docker cache: `docker-compose build --no-cache`
- Check available disk space: `docker system df`

### Port conflicts

If ports 3000 or 8080 are already in use, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Change host port from 3000 to 3001
  - "8081:8080"  # Change host port from 8080 to 8081
```

## Development

For development, you may want to mount your source code as volumes to enable hot-reloading:

```yaml
volumes:
  - ./src:/app/src
  - ./frontend:/app/frontend
```

Note: This is not included in the default setup as it requires additional configuration for hot-reloading to work properly.

