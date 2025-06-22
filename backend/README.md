# Brushline Backend

AI-powered photo editing backend API built with Express.js, TypeScript, and OpenAI.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Using the Startup Script
```bash
chmod +x scripts/start.sh
./scripts/start.sh
```

## 📋 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4-vision-preview

# Image Processing
MAX_IMAGE_SIZE=10485760
SUPPORTED_FORMATS=jpg,jpeg,png,webp

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run test` - Run tests (when implemented)

## 📡 API Endpoints

### Health Check
- `GET /health` - Server health status

### Image Processing
- `POST /api/images/upload` - Upload and process image
- `POST /api/images/apply-effect` - Apply filters/effects
- `POST /api/images/info` - Get image information

### AI Features
- `POST /api/ai/analyze` - Analyze image with AI
- `POST /api/ai/command` - Process natural language commands
- `POST /api/ai/suggest` - Generate edit suggestions
- `POST /api/ai/chat` - Chat with AI about image
- `POST /api/ai/parse-command` - Parse command without applying

## 🔧 Project Structure

```
src/
├── index.ts              # Main server file
├── middleware/
│   └── errorHandler.ts   # Error handling middleware
├── routes/
│   ├── aiRoutes.ts       # AI-related endpoints
│   └── imageRoutes.ts    # Image processing endpoints
└── services/
    ├── AIService.ts      # OpenAI integration
    └── ImageService.ts   # Image processing with Sharp
```

## 🤖 AI Features

### Image Analysis
- Face detection
- Scene recognition
- Color analysis
- Quality assessment
- Object detection

### Natural Language Processing
- Command parsing
- Intent recognition
- Context-aware responses

### Image Editing
- Background removal
- Color adjustments
- Filter application
- Enhancement suggestions

## 🖼️ Image Processing

### Supported Formats
- JPEG/JPG
- PNG
- WebP

### Processing Features
- Resize and optimize
- Apply filters and effects
- Extract metadata
- Quality adjustments

## 🔒 Security

- CORS configuration
- Input validation
- Error handling
- Rate limiting (to be implemented)
- File size limits

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📊 Monitoring

- Request logging
- Error tracking
- Performance metrics
- Health checks

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3001
OPENAI_API_KEY=your_production_key
FRONTEND_URL=https://yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is part of the Brushline photo editor application. 