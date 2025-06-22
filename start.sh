#!/bin/bash

# Brushline Startup Script
echo "🚀 Starting Brushline..."

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file from template..."
    cp backend/env.example backend/.env
    echo "✅ Backend .env file created. You can edit it later if needed."
fi

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down services..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend
echo "🔧 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Both services are starting..."
echo "📡 Backend: http://localhost:3001"
echo "🌐 Frontend: http://localhost:3000"
echo "🔑 Configure your API key at: http://localhost:3000/editor"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait 