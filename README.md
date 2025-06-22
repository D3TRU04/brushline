# 🎨 Brushline - AI Photo Editor

A modern, AI-powered photo editor built with Next.js, TypeScript, and OpenAI. Edit photos using natural language commands and get intelligent suggestions from AI.

## ✨ Features

- **🤖 AI-Powered Editing**: Use natural language to edit photos
- **💬 AI Chat Assistant**: Get editing advice and suggestions
- **🎯 Smart Analysis**: AI analyzes your images and provides recommendations
- **🔧 Professional Tools**: Full suite of editing tools and filters
- **📱 Modern UI**: Beautiful, responsive interface with glass morphism effects
- **⚡ Real-time Processing**: Instant AI responses and image processing
- **🔐 Secure API Keys**: User-managed OpenAI API keys for privacy

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd brushline
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Start the application**
   ```bash
   # From the root directory
   ./start.sh
   ```
   
   Or start manually:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Configure your API key**
   - Open [http://localhost:3000/editor](http://localhost:3000/editor)
   - Click the "API Key" button in the toolbar
   - Enter your OpenAI API key
   - Start editing with AI!

## 🛠️ Project Structure

```
brushline/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── editor/         # Photo editor interface
│   │   ├── landing/        # Landing page
│   │   └── api/           # API proxy routes
│   ├── components/         # Reusable components
│   └── utils/             # Utility functions
├── backend/                # Express.js backend server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── middleware/    # Express middleware
│   └── scripts/           # Build and deployment scripts
└── start.sh               # Development startup script
```

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env` from the template:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# OpenAI Configuration (optional - users set their own keys)
OPENAI_API_KEY=your_default_key_here
OPENAI_MODEL=gpt-4-vision-preview

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Image Processing
MAX_IMAGE_SIZE=10485760
SUPPORTED_FORMATS=jpg,jpeg,png,webp
```

### Frontend Configuration

The frontend automatically connects to the backend. You can customize the backend URL:

```bash
# In frontend directory
echo "BACKEND_URL=http://your-backend-url:3001" >> .env.local
```

## 🎯 Usage

### Basic Workflow

1. **Upload an Image**: Click "Open" in the toolbar to upload a photo
2. **Configure AI**: Set up your OpenAI API key if not already done
3. **Chat with AI**: Use the AI chat panel to get editing suggestions
4. **Apply Edits**: Use natural language commands like:
   - "Make the sky more blue"
   - "Remove the background"
   - "Increase contrast"
   - "Apply a vintage filter"
5. **Save Your Work**: Click "Save" to download the edited image

### AI Commands Examples

- **Color Adjustments**: "Make the colors more vibrant"
- **Background Removal**: "Remove the background completely"
- **Style Transfer**: "Make this look like a vintage film photo"
- **Enhancement**: "Brighten the image and increase sharpness"
- **Creative Effects**: "Apply a cinematic black and white filter"

## 🔌 API Endpoints

### AI Routes (`/api/ai`)

- `POST /test-key` - Validate OpenAI API key
- `POST /analyze` - Analyze image content
- `POST /command` - Process natural language editing commands
- `POST /suggest` - Generate editing suggestions
- `POST /chat` - Chat with AI about the image
- `POST /parse-command` - Parse command without applying

### Image Routes (`/api/images`)

- `POST /upload` - Upload and process images
- `POST /resize` - Resize images
- `POST /filter` - Apply filters and effects
- `GET /info` - Get image metadata

## 🎨 UI Components

### Editor Interface

- **TopToolbar**: File operations, API key management, undo/redo
- **LeftSidebar**: Drawing tools and brushes
- **Canvas**: Main editing area with Konva.js
- **RightSidebar**: Properties panel for detailed adjustments
- **AIChatPanel**: AI assistant with expandable input
- **BottomBar**: Image information and status

### Key Features

- **Draggable AI Panel**: Resize the chat panel by dragging the left edge
- **Auto-resizing Input**: Chat input expands as you type
- **Real-time Validation**: API key validation with visual feedback
- **Responsive Design**: Works on desktop and tablet
- **Glass Morphism**: Modern UI with backdrop blur effects

## 🔒 Security

- **User-managed API Keys**: Your OpenAI API key stays on your device
- **No Server Storage**: Images and API keys are not stored on our servers
- **Local Processing**: Image processing happens locally when possible
- **Secure Communication**: HTTPS and proper CORS configuration

## 🚀 Deployment

### Production Build

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
npm run build
npm start
```

### Environment Variables for Production

```env
# Backend
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com

# Frontend
BACKEND_URL=https://your-backend-domain.com
```

## 🐛 Troubleshooting

### Common Issues

1. **"API key not found"**
   - Make sure you've configured your API key in the editor
   - Check that the key starts with `sk-` and is 51 characters

2. **"Failed to connect to backend"**
   - Ensure the backend is running on port 3001
   - Check that CORS is properly configured

3. **Build errors**
   - Run `npm install` in both frontend and backend
   - Clear `.next` folder: `rm -rf frontend/.next`

4. **TypeScript errors**
   - Run `npm run build` to check for type issues
   - Ensure all dependencies are installed

### Development Tips

- Use the startup script: `./start.sh`
- Check backend logs for API errors
- Use browser dev tools to debug frontend issues
- Monitor OpenAI API usage in your dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [OpenAI](https://openai.com/)
- UI components with [Tailwind CSS](https://tailwindcss.com/)
- Canvas graphics with [Konva.js](https://konvajs.org/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Ready to start editing?** 🎨

Visit [http://localhost:3000/editor](http://localhost:3000/editor) and configure your API key to begin! 