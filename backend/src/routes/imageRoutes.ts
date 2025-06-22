import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import { ImageService } from '../services/ImageService'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// Upload and process image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    const processedImage = await ImageService.processImage(req.file.buffer)
    res.json({ 
      success: true, 
      imageUrl: processedImage,
      message: 'Image uploaded and processed successfully' 
    })
  } catch (error) {
    console.error('Image upload error:', error)
    res.status(500).json({ error: 'Failed to process image' })
  }
})

// Apply filters/effects
router.post('/apply-effect', async (req, res) => {
  try {
    const { imageData, effect, parameters } = req.body
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' })
    }

    const processedImage = await ImageService.applyEffect(imageData, effect, parameters)
    res.json({ 
      success: true, 
      imageUrl: processedImage,
      message: 'Effect applied successfully' 
    })
  } catch (error) {
    console.error('Effect application error:', error)
    res.status(500).json({ error: 'Failed to apply effect' })
  }
})

// Get image info
router.post('/info', async (req, res) => {
  try {
    const { imageData } = req.body
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' })
    }

    const info = await ImageService.getImageInfo(imageData)
    res.json({ 
      success: true, 
      info,
      message: 'Image info retrieved successfully' 
    })
  } catch (error) {
    console.error('Image info error:', error)
    res.status(500).json({ error: 'Failed to get image info' })
  }
})

export default router 