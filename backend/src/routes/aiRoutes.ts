import express from 'express'
import { AIService } from '../services/AIService'

const router = express.Router()

// Test API key validity
router.post('/test-key', async (req, res) => {
  try {
    const { apiKey } = req.body
    
    console.log('Testing API key:', {
      hasApiKey: !!apiKey,
      keyLength: apiKey?.length,
      keyPrefix: apiKey?.substring(0, 3)
    })
    
    if (!apiKey) {
      return res.status(400).json({ 
        success: false,
        error: 'API key is required' 
      })
    }

    // Test the API key by making a simple request to OpenAI
    const isValid = await AIService.testApiKey(apiKey)
    
    console.log('API key test result:', isValid)
    
    if (isValid) {
      res.json({ 
        success: true, 
        message: 'API key is valid' 
      })
    } else {
      res.status(400).json({ 
        success: false,
        error: 'Invalid API key. Please check and try again.' 
      })
    }
  } catch (error) {
    console.error('API key test error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Failed to test API key',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Analyze image with AI
router.post('/analyze', async (req, res) => {
  try {
    const { imageData, apiKey } = req.body
    
    if (!imageData) {
      return res.status(400).json({ 
        success: false,
        error: 'No image data provided' 
      })
    }

    const analysis = await AIService.analyzeImage(imageData, apiKey)
    res.json({ 
      success: true, 
      analysis,
      message: 'Image analyzed successfully' 
    })
  } catch (error) {
    console.error('AI analysis error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Failed to analyze image',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Process natural language command
router.post('/command', async (req, res) => {
  try {
    const { command, imageData, apiKey } = req.body
    
    if (!command || !imageData) {
      return res.status(400).json({ 
        success: false,
        error: 'Command and image data required' 
      })
    }

    const aiCommand = await AIService.parseCommand(command, imageData, apiKey)
    if (!aiCommand) {
      return res.status(400).json({ 
        success: false,
        error: 'Could not parse command. Please try rephrasing your request.' 
      })
    }

    const processedImage = await AIService.applyCommand(aiCommand, imageData, apiKey)
    res.json({ 
      success: true, 
      imageUrl: processedImage,
      command: aiCommand,
      message: 'Command processed successfully' 
    })
  } catch (error) {
    console.error('AI command error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Failed to process command',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Generate edit suggestions
router.post('/suggest', async (req, res) => {
  try {
    const { imageData, apiKey } = req.body
    
    if (!imageData) {
      return res.status(400).json({ 
        success: false,
        error: 'No image data provided' 
      })
    }

    const suggestions = await AIService.generateSuggestions(imageData, apiKey)
    res.json({ 
      success: true, 
      suggestions,
      message: 'Suggestions generated successfully' 
    })
  } catch (error) {
    console.error('AI suggestions error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate suggestions',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Chat with AI about the image
router.post('/chat', async (req, res) => {
  try {
    const { message, imageData, conversationHistory = [], apiKey } = req.body
    
    console.log('[AI CHAT] Incoming request:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 6) : '',
      message,
      imageDataPresent: !!imageData
    })
    
    if (!message || !imageData) {
      return res.status(400).json({ 
        success: false,
        error: 'Message and image data required' 
      })
    }

    try {
      const response = await AIService.chatWithImage(message, imageData, conversationHistory, apiKey)
      res.json({ 
        success: true, 
        response,
        message: 'Chat response generated successfully' 
      })
    } catch (aiError) {
      console.error('[AI CHAT] OpenAI error:', aiError)
      res.status(500).json({ 
        success: false,
        error: 'Failed to generate chat response',
        details: aiError instanceof Error ? aiError.message : 'Unknown error'
      })
    }
  } catch (error) {
    console.error('AI chat error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate chat response',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Parse command without applying it
router.post('/parse-command', async (req, res) => {
  try {
    const { command, imageData, apiKey } = req.body
    
    if (!command) {
      return res.status(400).json({ 
        success: false,
        error: 'Command text required' 
      })
    }

    const aiCommand = await AIService.parseCommand(command, imageData, apiKey)
    if (!aiCommand) {
      return res.status(400).json({ 
        success: false,
        error: 'Could not parse command. Please try rephrasing your request.' 
      })
    }

    res.json({ 
      success: true, 
      command: aiCommand,
      message: 'Command parsed successfully' 
    })
  } catch (error) {
    console.error('Command parsing error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Failed to parse command',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Perform image edit and return edited image
router.post('/edit', async (req, res) => {
  try {
    const { editRequest, imageData, apiKey } = req.body
    
    console.log('[AI EDIT] Incoming edit request:', {
      hasApiKey: !!apiKey,
      editRequest,
      imageDataPresent: !!imageData
    })
    
    if (!editRequest || !imageData) {
      return res.status(400).json({ 
        success: false,
        error: 'Edit request and image data required' 
      })
    }

    try {
      const { editedImageData, description } = await AIService.performImageEdit(editRequest, imageData, apiKey)
      
      res.json({ 
        success: true, 
        editedImageData,
        description,
        message: 'Image edit completed successfully' 
      })
    } catch (aiError) {
      console.error('[AI EDIT] OpenAI error:', aiError)
      res.status(500).json({ 
        success: false,
        error: 'Failed to perform image edit',
        details: aiError instanceof Error ? aiError.message : 'Unknown error'
      })
    }
  } catch (error) {
    console.error('AI edit error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Failed to perform image edit',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router 