# PawFinds Pet Adoption System - Quick Start Guide

## 🚀 Running the Project (Without Docker)

Since Docker is not installed on your system, follow these steps to run the project locally:

### Option 1: Use the Startup Script (Easiest)

#### Windows PowerShell:
```powershell
.\start.ps1
```

#### Windows Command Prompt:
```cmd
start.bat
```

This will automatically start both backend and frontend servers in separate windows.

### Option 2: Manual Start

#### Step 1: Start Backend Server
Open a terminal and run:
```powershell
cd server
node server.js
```
Backend will run on: **http://localhost:4000**

#### Step 2: Start Frontend Server
Open another terminal and run:
```powershell
cd Client
npm start
```
Frontend will run on: **http://localhost:3000**

## 🔧 First Time Setup

If running for the first time, install dependencies:

### Backend:
```powershell
cd server
npm install
```

### Frontend:
```powershell
cd Client
npm install
```

## 📊 Current Status

✅ **Backend Server**: Running on port 4000  
✅ **Database**: Connected to MongoDB Atlas  
⚙️ **Frontend**: Starting on port 3000  

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/api/health

## 🐳 Running with Docker (Future)

To run with Docker, you need to:
1. Install Docker Desktop from https://www.docker.com/products/docker-desktop
2. Start Docker Desktop
3. Run: `docker compose up -d`

## 🧪 Running Tests

### Selenium Tests (Requires Chrome)
```powershell
cd tests
npm install
npm test
```

## 📝 Environment Variables

Backend environment variables are configured in `server/.env`:
- `MONGO_URI`: MongoDB connection string (currently configured)
- `PORT`: Server port (default: 4000)
- `NODE_ENV`: Environment mode

## 🛑 Stopping the Servers

Press `Ctrl+C` in each terminal window to stop the servers.

## 📞 Troubleshooting

### Port Already in Use
If you get a port error:
```powershell
# Find and kill process on port 4000 (backend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process -Force

# Find and kill process on port 3000 (frontend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Frontend Not Starting
1. Delete `node_modules` and `package-lock.json` in Client folder
2. Run `npm install` again
3. Run `npm start`

### Database Connection Error
Check your internet connection and MongoDB Atlas credentials in `server/.env`
