import sharp from 'sharp'

export interface ImageInfo {
  width: number
  height: number
  format: string
  size: number
  channels: number
}

export interface EffectParameters {
  brightness?: number
  contrast?: number
  saturation?: number
  blur?: number
  sharpen?: number
  hue?: number
}

export class ImageService {
  // Process uploaded image
  static async processImage(buffer: Buffer): Promise<string> {
    try {
      const processedBuffer = await sharp(buffer)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 90 })
        .toBuffer()
      
      return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`
    } catch (error) {
      console.error('Image processing error:', error)
      throw new Error('Failed to process image')
    }
  }

  // Apply effects to image
  static async applyEffect(imageData: string, effect: string, parameters: EffectParameters): Promise<string> {
    try {
      // Remove data URL prefix to get base64 data
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      
      let processedImage = sharp(buffer)

      switch (effect) {
        case 'brightness':
          if (parameters.brightness) {
            processedImage = processedImage.modulate({ brightness: parameters.brightness })
          }
          break
        case 'contrast':
          if (parameters.contrast) {
            processedImage = processedImage.linear(parameters.contrast, 0)
          }
          break
        case 'saturation':
          if (parameters.saturation) {
            processedImage = processedImage.modulate({ saturation: parameters.saturation })
          }
          break
        case 'blur':
          if (parameters.blur) {
            processedImage = processedImage.blur(parameters.blur)
          }
          break
        case 'sharpen':
          if (parameters.sharpen) {
            processedImage = processedImage.sharpen({ sigma: parameters.sharpen })
          }
          break
        case 'hue':
          if (parameters.hue) {
            processedImage = processedImage.modulate({ hue: parameters.hue })
          }
          break
        default:
          throw new Error(`Unknown effect: ${effect}`)
      }

      const processedBuffer = await processedImage.jpeg({ quality: 90 }).toBuffer()
      return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`
    } catch (error) {
      console.error('Effect application error:', error)
      throw new Error('Failed to apply effect')
    }
  }

  // Get image information
  static async getImageInfo(imageData: string): Promise<ImageInfo> {
    try {
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      
      const metadata = await sharp(buffer).metadata()
      
      return {
        width: metadata.width || 0,
        height: metadata.height || 0,
        format: metadata.format || 'unknown',
        size: buffer.length,
        channels: metadata.channels || 0
      }
    } catch (error) {
      console.error('Image info error:', error)
      throw new Error('Failed to get image info')
    }
  }
} 