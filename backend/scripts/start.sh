#!/bin/bash

# Brushline Backend Startup Script

echo "🚀 Starting Brushline Backend..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Creating from example..."
    if [ -f env.example ]; then
        cp env.example .env
        echo "✅ Created .env file from example"
        echo "📝 Please edit .env file with your actual configuration"
    else
        echo "❌ env.example file not found. Please create .env file manually."
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if TypeScript is compiled
if [ ! -d "dist" ]; then
    echo "🔨 Building TypeScript..."
    npm run build
fi

# Start the server
echo "🌟 Starting server..."
npm run dev 