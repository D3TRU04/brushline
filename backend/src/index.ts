import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middleware/errorHandler'
import imageRoutes from './routes/imageRoutes'
import aiRoutes from './routes/aiRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/images', imageRoutes)
app.use('/api/ai', aiRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Brushline Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API info
app.get('/api', (req, res) => {
  res.json({
    name: 'Brushline API',
    version: '1.0.0',
    description: 'AI-powered photo editing API',
    endpoints: {
      images: '/api/images',
      ai: '/api/ai',
      health: '/health'
    }
  })
})

// 404 handler
app.use(notFound)

// Error handler (must be last)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Brushline Backend running on port ${PORT}`)
  console.log(`📡 Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 API docs: http://localhost:${PORT}/api`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  Warning: OPENAI_API_KEY not set. AI features will use fallback responses.')
  }
}) 