# Docker Setup for PawFinds Pet Adoption System

This document provides instructions for running the PawFinds application using Docker.

## Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

## Services

The application consists of 4 services:

1. **MongoDB**: Database server (port 27017)
2. **Backend**: Node.js/Express API server (port 5000)
3. **Frontend**: React application served via Nginx (port 3000)
4. **Selenium Tests**: Automated test suite (runs on demand)

## Quick Start

### 1. Start All Services
```bash
docker-compose up -d
```

### 2. View Logs
```bash
docker-compose logs -f
```

### 3. Stop All Services
```bash
docker-compose down
```

### 4. Stop and Remove Volumes
```bash
docker-compose down -v
```

## Running Selenium Tests

Tests are configured with a `testing` profile and don't start by default.

### Run Tests Once
```bash
docker-compose --profile testing up selenium-tests
```

### Run Tests with Auto-Remove
```bash
docker-compose --profile testing up --abort-on-container-exit selenium-tests
```

## Environment Variables

### Backend (.env in server directory)
Create `server/.env` file with:
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://admin:adminpassword@mongodb:27017/pawfinds?authSource=admin
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### Frontend
Frontend environment variables are set in `docker-compose.yml`:
```env
REACT_APP_API_URL=http://localhost:5000
```

## Accessing Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

## Development Mode

For development with live reload:

### Backend (in server directory)
```bash
cd server
npm install
npm start
```

### Frontend (in Client directory)
```bash
cd Client
npm install
npm start
```

## Building Individual Services

### Build Backend
```bash
docker-compose build backend
```

### Build Frontend
```bash
docker-compose build frontend
```

### Build Tests
```bash
docker-compose build selenium-tests
```

## Troubleshooting

### Check Service Status
```bash
docker-compose ps
```

### View Service Logs
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

### Restart a Service
```bash
docker-compose restart backend
```

### Rebuild After Code Changes
```bash
docker-compose up -d --build
```

## Production Deployment

For production:
1. Update environment variables with production values
2. Use proper secrets management
3. Configure proper MongoDB authentication
4. Set up reverse proxy (Nginx/Apache)
5. Enable HTTPS/SSL certificates
6. Configure proper CORS settings

## Data Persistence

MongoDB data is persisted in a Docker volume named `mongodb_data`. To back up:

```bash
docker-compose exec mongodb mongodump --out /data/backup
```

## Health Checks

MongoDB includes a health check that verifies the database is ready before starting dependent services.

## Network

All services communicate via the `pawfinds-network` bridge network.
