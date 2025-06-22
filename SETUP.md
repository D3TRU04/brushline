# 🚀 Brushline Setup Guide

Welcome to Brushline! This guide will help you set up your own instance with your OpenAI API key.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com/api-keys))

## 🛠️ Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd brushline

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Start the Backend

```bash
# From the backend directory
cd backend

# Copy environment template
cp env.example .env

# Start the development server
npm run dev
```

The backend will start on `http://localhost:3001`

### 3. Start the Frontend

```bash
# From the frontend directory (in a new terminal)
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Configure Your API Key

1. **Open the editor**: Go to `http://localhost:3000/editor`
2. **Click the API Key button**: Look for the key icon in the top toolbar
3. **Enter your OpenAI API key**: 
   - Get your key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Paste it in the modal
   - Click "Save Key"

## 🔑 Getting Your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. **Important**: Keep this key secure and don't share it

## 🎯 Features Available

Once your API key is configured, you can:

- **Chat with AI** about your images
- **Get editing suggestions** from AI
- **Analyze images** for content and quality
- **Process natural language commands** like "make the sky more blue"
- **Apply filters and effects** to your images

## 🔧 Advanced Configuration

### Environment Variables

You can configure the backend with these environment variables:

```env
# Backend Configuration
PORT=3001
NODE_ENV=development
BACKEND_URL=http://localhost:3001

# OpenAI Configuration (optional - users can set their own keys)
OPENAI_API_KEY=your_default_key_here
OPENAI_MODEL=gpt-4-vision-preview

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### Custom Backend URL

If you want to use a different backend URL, set the `BACKEND_URL` environment variable in your frontend:

```bash
# In frontend directory
echo "BACKEND_URL=http://your-backend-url:3001" >> .env.local
```

## 🚨 Troubleshooting

### API Key Issues

- **"Invalid API key"**: Make sure your key starts with `sk-` and is 51 characters long
- **"API key not found"**: Check that you've saved the key in the modal
- **"Rate limit exceeded"**: You may need to add billing to your OpenAI account

### Connection Issues

- **"Failed to connect to backend"**: Make sure the backend is running on port 3001
- **CORS errors**: Check that the frontend URL is correctly set in backend environment

### Development Issues

- **TypeScript errors**: Run `npm run build` in both frontend and backend
- **Port conflicts**: Change the port in the environment variables

## 🔒 Security Notes

- **Never commit API keys** to version control
- **Use environment variables** for production deployments
- **Rotate API keys** regularly
- **Monitor usage** in your OpenAI dashboard

## 📈 Production Deployment

For production deployment:

1. **Set environment variables** for production
2. **Build both frontend and backend**:
   ```bash
   # Frontend
   npm run build
   
   # Backend
   npm run build
   ```
3. **Use a process manager** like PM2 for the backend
4. **Set up a reverse proxy** (nginx) for the frontend
5. **Configure SSL certificates** for HTTPS

## 🤝 Support

If you encounter issues:

1. Check the browser console for errors
2. Check the backend logs for server errors
3. Verify your API key is valid
4. Ensure both frontend and backend are running

## 🎉 You're Ready!

Once you've completed the setup, you can:

1. Upload images to the editor
2. Chat with AI about your images
3. Get AI-powered editing suggestions
4. Apply effects and filters
5. Save your edited images

Happy editing! 🎨 