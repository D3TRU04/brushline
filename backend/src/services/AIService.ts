import OpenAI from 'openai'
import sharp from 'sharp'

export interface AICommand {
  type: 'enhance' | 'remove-background' | 'adjust-colors' | 'crop' | 'filter' | 'retouch' | 'style-transfer' | 'remove-object'
  parameters: Record<string, any>
  description: string
  confidence: number
}

export interface AIAnalysis {
  faces: number
  sky: boolean
  background: string
  dominantColors: string[]
  contrast: 'low' | 'medium' | 'high'
  brightness: 'dark' | 'normal' | 'bright'
  objects: string[]
  scene: string
  quality: 'poor' | 'fair' | 'good' | 'excellent'
  suggestions: string[]
}

export class AIService {
  // Test API key validity
  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const openai = new OpenAI({ apiKey })
      
      // Make a simple request to test the key
      await openai.models.list()
      return true
    } catch (error) {
      console.error('API key test failed:', error)
      return false
    }
  }

  // Get OpenAI instance with provided API key
  private static getOpenAI(apiKey?: string): OpenAI {
    if (!apiKey) {
      throw new Error('API key is required for AI operations')
    }
    
    return new OpenAI({ apiKey })
  }

  // Parse natural language into AI commands with OpenAI
  static async parseCommand(text: string, imageData?: string, apiKey?: string): Promise<AICommand | null> {
    try {
      const openai = this.getOpenAI(apiKey)
      
      const promptLines = [
        'You are an expert image editing assistant with deep knowledge of photo editing techniques, color theory, composition, and visual aesthetics. Your task is to carefully analyze user requests and convert them into precise, actionable image editing commands in a structured JSON format.',
        '',
        `USER REQUEST: "${text}"`,
        '',
        'INSTRUCTIONS:',
        '1.  **Analyze Intent:** Read the user\'s request VERY carefully. Pay attention to every detail, nuance, and specific instruction to understand their true goal.',
        '2.  **Deconstruct Request:** Break down complex requests into specific, measurable parameters.',
        '3.  **Handle Relative & Vague Terms:** Intelligently interpret relative terms and map them to appropriate numeric values within the suggested ranges.',
        '    *   "a little", "a bit", "slightly" -> ~10-20% of the range.',
        '    *   "a lot", "very", "dramatically" -> ~60-80% of the range.',
        '    *   "max", "maximum", "highest" -> The max value in the range.',
        '    *   "min", "minimum", "lowest" -> The min value in the range.',
        '4.  **Select Command Type:** Choose the most appropriate command type from the available list.',
        '5.  **Generate Description:** Write a clear, human-readable description of the exact changes you will make. This should reflect the parameters you\'ve chosen.',
        '6.  **Set Confidence:** Provide a confidence score from 0.0 to 1.0.',
        '',
        'AVAILABLE COMMAND TYPES:',
        '-   **enhance**: General image improvements (brightness, contrast, saturation, sharpness, etc.). Use for combined adjustments.',
        '-   **adjust-colors**: Specific color adjustments (hue, saturation, temperature, tint).',
        '-   **filter**: Apply artistic filters or effects (e.g., grayscale, sepia).',
        '-   **remove-object**: Remove a specific object from the image. (Note: Currently a placeholder, but parse it).',
        '-   **remove-background**: Remove the entire image background. (Note: Currently a placeholder, but parse it).',
        '-   **crop**: Resize, crop, or recompose the image. (Note: Currently a placeholder, but parse it).',
        '',
        'PARAMETER RANGES & GUIDELINES:',
        '-   **brightness**: 0.5 to 2.0 (1.0 is no change).',
        '-   **contrast**: 0.5 to 2.0 (1.0 is no change). For `sharp`, this can be mapped to a linear transform. A value of 1.5 here means a strong increase.',
        '-   **saturation**: 0.0 to 3.0 (1.0 is no change, 0.0 is grayscale).',
        '-   **blur**: 0.3 to 100 (sigma for Gaussian blur). A value of 1-5 is a light blur.',
        '-   **sharpen**: true (Boolean, applies a standard sharpening effect).',
        '-   **gamma**: 0.5 to 3.0 (1.0 is no change).',
        '-   **grayscale**: true (Boolean, converts to black and white).',
        '-   **object_to_remove**: string (e.g., "the red car", "the person on the left").',
        '',
        'RESPONSE FORMAT:',
        'Return ONLY a single, valid JSON object with the following structure. Do not add any extra text or explanations.',
        '{',
        '  "type": "command_type",',
        '  "parameters": {',
        '    "parameter_name": value,',
        '    ...',
        '  },',
        '  "description": "A human-readable summary of the edits to be performed.",',
        '  "confidence": 0.0',
        '}',
        '',
        'EXAMPLES:',
        '-   "increase contrast and make it a bit more vibrant" -> {',
        '      "type": "enhance",',
        '      "parameters": {"contrast": 1.4, "saturation": 1.2},',
        '      "description": "Increasing contrast by 40% and boosting saturation by 20% for a more vibrant image.",',
        '      "confidence": 0.95',
        '    }',
        '-   "make it black and white" -> {',
        '      "type": "filter",',
        '      "parameters": {"grayscale": true},',
        '      "description": "Converting the image to black and white.",',
        '      "confidence": 0.99',
        '    }',
        '-   "blur the background" -> {',
        '      "type": "enhance",',
        '      "parameters": {"blur": 4},',
        '      "description": "Applying a medium blur to the image.",',
        '      "confidence": 0.85',
        '    }',
        '-   "remove the trash can in the corner" -> {',
        '      "type": "remove-object",',
        '      "parameters": {"object_to_remove": "trash can in the corner"},',
        '      "description": "Attempting to remove the trash can from the corner of the image.",',
        '      "confidence": 0.90',
        '    }',
        '-   "lower the brightness to the lowest level" -> {',
        '      "type": "enhance",',
        '      "parameters": {"brightness": 0.5},',
        '      "description": "Reducing the brightness to the minimum level.",',
        '      "confidence": 0.98',
        '    }',
        '',
        'IMPORTANT: Be extremely thorough in your analysis. Your primary goal is to translate ambiguous human language into a precise, machine-executable command.'
      ]
      const prompt = promptLines.join('\n')

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert image editing assistant with 20+ years of experience in professional photo editing. You understand color theory, composition, lighting, and visual psychology. You are extremely detail-oriented and always consider the user\'s intent carefully.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 500
      })

      const result = response.choices[0]?.message?.content
      if (result) {
        return JSON.parse(result) as AICommand
      }
    } catch (error) {
      console.error('Error parsing command with OpenAI:', error)
      // Fallback to basic parsing
      return this.basicParseCommand(text)
    }
    
    return null
  }

  // Fallback basic command parsing
  private static basicParseCommand(text: string): AICommand | null {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('sky') && lowerText.includes('blue')) {
      return {
        type: 'adjust-colors',
        parameters: { target: 'sky', hue: 'blue', saturation: 1.2 },
        description: 'Making sky more blue',
        confidence: 0.8
      }
    }
    
    if (lowerText.includes('remove') && lowerText.includes('background')) {
      return {
        type: 'remove-background',
        parameters: { method: 'ai-segmentation' },
        description: 'Removing background',
        confidence: 0.9
      }
    }
    
    if (lowerText.includes('contrast')) {
      return {
        type: 'enhance',
        parameters: { contrast: 1.3 },
        description: 'Increasing contrast',
        confidence: 0.7
      }
    }
    
    if (lowerText.includes('brighten')) {
      return {
        type: 'enhance',
        parameters: { brightness: 1.2 },
        description: 'Brightening image',
        confidence: 0.7
      }
    }
    
    return null
  }

  // Analyze image content with OpenAI Vision
  static async analyzeImage(imageData: string, apiKey?: string): Promise<AIAnalysis> {
    try {
      const openai = this.getOpenAI(apiKey)
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are an expert image analyst with deep knowledge of photography, visual composition, color theory, and image quality assessment. Your task is to provide a comprehensive, detailed analysis of this image.

ANALYSIS REQUIREMENTS:
Please examine this image with extreme attention to detail and provide a thorough analysis covering all aspects:

1. CONTENT ANALYSIS:
   - Count and describe any faces (human or animal)
   - Identify all visible objects, elements, and subjects
   - Describe the scene type and setting
   - Note any text, logos, or written content

2. VISUAL ELEMENTS:
   - Identify if sky is visible and describe its appearance
   - Analyze the background (type, complexity, depth)
   - Assess the overall composition and framing
   - Note any leading lines, patterns, or visual flow

3. COLOR ANALYSIS:
   - Identify the 5 most dominant colors (provide hex codes)
   - Assess color harmony and balance
   - Note any color temperature issues
   - Identify color themes or palettes

4. TECHNICAL QUALITY:
   - Evaluate contrast levels (low/medium/high)
   - Assess brightness levels (dark/normal/bright)
   - Rate overall image quality (poor/fair/good/excellent)
   - Note any technical issues (noise, blur, artifacts)

5. EDITING OPPORTUNITIES:
   - Provide 3 specific, actionable editing suggestions
   - Consider both technical improvements and creative enhancements
   - Suggest edits that would significantly improve the image
   - Include specific parameter recommendations

RESPONSE FORMAT:
Return ONLY a valid JSON object with these exact fields:
{
  "faces": number,
  "sky": boolean,
  "background": "detailed description",
  "dominantColors": ["#hexcode1", "#hexcode2", "#hexcode3", "#hexcode4", "#hexcode5"],
  "contrast": "low|medium|high",
  "brightness": "dark|normal|bright",
  "objects": ["object1", "object2", "object3", ...],
  "scene": "detailed scene description",
  "quality": "poor|fair|good|excellent",
  "suggestions": [
    "Specific editing suggestion 1 with parameters",
    "Specific editing suggestion 2 with parameters", 
    "Specific editing suggestion 3 with parameters"
  ]
}

IMPORTANT: Be extremely thorough and observant. Look at every detail in the image. Consider both obvious and subtle elements. Your analysis should be comprehensive enough that someone could recreate the image from your description.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        max_tokens: 800
      })

      const result = response.choices[0]?.message?.content
      if (result) {
        return JSON.parse(result) as AIAnalysis
      }
    } catch (error) {
      console.error('Error analyzing image with OpenAI:', error)
    }

    // Fallback analysis
    return {
      faces: 1,
      sky: true,
      background: 'outdoor',
      dominantColors: ['#87CEEB', '#228B22', '#FFD700'],
      contrast: 'medium',
      brightness: 'normal',
      objects: ['person', 'tree', 'sky'],
      scene: 'outdoor portrait',
      quality: 'good',
      suggestions: [
        'Brighten + Warm Look',
        'Cinematic Crop + Desaturate',
        'Auto-enhance + Retouch Face'
      ]
    }
  }

  // Apply AI command to image
  static async applyCommand(command: AICommand, imageData: string, apiKey?: string): Promise<string> {
    try {
      console.log('Applying AI command:', command)
      
      // For now, return the original image data
      // In a real implementation, this would:
      // 1. Call OpenAI's DALL-E for image generation
      // 2. Use specialized AI models for specific tasks
      // 3. Integrate with image processing libraries
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return imageData
    } catch (error) {
      console.error('Error applying AI command:', error)
      throw new Error('Failed to apply AI command')
    }
  }

  // Perform actual image editing tasks
  static async performImageEdit(editRequest: string, imageData: string, apiKey?: string): Promise<{ editedImageData: string, description: string }> {
    try {
      console.log(`[AIService] Parsing user request: "${editRequest}"`)

      const command = await this.parseCommand(editRequest, imageData, apiKey)

      if (!command || command.confidence < 0.6) {
        console.log('[AIService] Could not confidently parse command, or parsing failed.')
        return {
          editedImageData: imageData,
          description: `I'm sorry, I wasn't able to understand that specific edit. I can help with adjustments like brightness, contrast, saturation, and applying filters. Could you please rephrase your request?`
        }
      }

      console.log('[AIService] Parsed command:', command)

      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, "")
      const imageBuffer = Buffer.from(base64Data, 'base64')
      
      let sharpInstance: sharp.Sharp = sharp(imageBuffer)
      let editApplied = false

      switch (command.type) {
        case 'enhance':
        case 'adjust-colors':
          const params = command.parameters
          if (params.brightness) {
            sharpInstance.modulate({ brightness: Number(params.brightness) })
            editApplied = true
          }
          if (params.contrast) {
            const contrastValue = Number(params.contrast)
            sharpInstance.linear(contrastValue, -(128 * (contrastValue - 1)))
            editApplied = true
          }
          if (params.saturation) {
            sharpInstance.modulate({ saturation: Number(params.saturation) })
            editApplied = true
          }
          if (params.blur) {
            sharpInstance.blur(Number(params.blur))
            editApplied = true
          }
          if (params.sharpen) {
            sharpInstance.sharpen()
            editApplied = true
          }
          if (params.gamma) {
            sharpInstance.gamma(Number(params.gamma))
            editApplied = true
          }
          break

        case 'filter':
          if (command.parameters.grayscale) {
            sharpInstance.grayscale()
            editApplied = true
          }
          break

        case 'remove-object':
        case 'remove-background':
          // These features are not yet implemented.
          return {
            editedImageData: imageData, // Return original image
            description: `Object and background removal are advanced features that are coming soon! For now, no changes have been applied. I can help with other edits like brightness, contrast, and filters!`
          }
        
        case 'crop':
           return {
            editedImageData: imageData, // Return original image
            description: `Cropping and resizing are features that are coming soon! For now, no changes have been applied. I can help with other edits like brightness, contrast, and filters!`
          }

        default:
          return {
            editedImageData: imageData,
            description: `I understood that you want to perform a "${command.type}" action, but I don't have that capability yet. No changes have been applied.`
          }
      }

      if (editApplied) {
        console.log(`[AIService] Applying edit: ${command.description}`)
        const editedImageBuffer = await sharpInstance.png().toBuffer()
        const editedImageData = `data:image/png;base64,${editedImageBuffer.toString('base64')}`
        
        console.log('[AIService] Image edit completed successfully with sharp')
        return { editedImageData, description: command.description }
      } else {
        console.log('[AIService] Command parsed, but no applicable edits were found or applied.')
        return {
          editedImageData: imageData,
          description: `I understood you wanted to "${editRequest}", but I couldn't find a specific action to apply. I can handle brightness, contrast, saturation, blur, sharpen, and grayscale edits.`
        }
      }

    } catch (error) {
      console.error('[AIService] Error performing image edit:', error)
      return {
        editedImageData: imageData,
        description: `I apologize, but I encountered an error while processing your request. Please try a different edit.`
      }
    }
  }

  // Generate edit suggestions with AI
  static async generateSuggestions(imageData: string, apiKey?: string): Promise<string[]> {
    try {
      const openai = this.getOpenAI(apiKey)
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are an expert photo editor with 15+ years of experience in professional photography and image editing. You have a deep understanding of visual aesthetics, color theory, composition, and current editing trends.

TASK: Analyze this image and provide 5 highly specific, creative, and actionable editing suggestions that would significantly improve or transform the image.

ANALYSIS PROCESS:
1. Examine the image composition, lighting, colors, and subject matter
2. Identify the current strengths and weaknesses
3. Consider multiple editing approaches (technical, artistic, stylistic)
4. Think about different moods, styles, and visual outcomes
5. Ensure suggestions are specific and implementable

SUGGESTION CRITERIA:
- Each suggestion should be detailed and specific
- Include specific parameter recommendations when possible
- Consider both subtle improvements and dramatic transformations
- Mix technical corrections with creative enhancements
- Ensure suggestions are diverse and cover different aspects
- Make suggestions that would appeal to different user preferences

EXAMPLES OF GOOD SUGGESTIONS:
- "Cinematic Portrait: Increase contrast by 35%, add subtle vignette, warm temperature by +15, enhance eye sharpness, and apply film grain for a dramatic cinematic look"
- "Vintage Film Aesthetic: Reduce saturation by 25%, add warm sepia tones, increase grain, slightly blur background, and add light leak effects for authentic vintage feel"
- "Modern Instagram Style: Boost vibrance by 20%, enhance sky colors, add subtle glow to highlights, smooth skin texture, and apply modern color grading"
- "Professional Headshot: Perfect skin retouching, enhance eye clarity, adjust lighting balance, add professional color correction, and optimize for business use"
- "Artistic Black & White: Convert to B&W with custom channel mixing, increase contrast by 40%, add dramatic shadows, enhance textures, and create high-impact monochrome"

RESPONSE FORMAT:
Return ONLY a JSON array of 5 strings, each containing a detailed editing suggestion. Be specific, creative, and actionable.

IMPORTANT: Your suggestions should be thoughtful, varied, and demonstrate deep understanding of photo editing. Each suggestion should be compelling enough that a user would want to try it.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        max_tokens: 400
      })

      const result = response.choices[0]?.message?.content
      if (result) {
        return JSON.parse(result) as string[]
      }
    } catch (error) {
      console.error('Error generating suggestions with OpenAI:', error)
    }

    // Fallback suggestions
    return [
      'Brighten + Warm Look',
      'Cinematic Crop + Desaturate',
      'Auto-enhance + Retouch Face',
      'Vintage Filter',
      'High Contrast B&W'
    ]
  }

  // Chat with AI about the image
  static async chatWithImage(message: string, imageData: string, conversationHistory: any[] = [], apiKey?: string): Promise<string> {
    try {
      console.log('[AIService] Starting chat with image:', {
        messageLength: message.length,
        imageDataLength: imageData.length,
        hasApiKey: !!apiKey,
        apiKeyPrefix: apiKey ? apiKey.substring(0, 6) : 'none'
      })

      const openai = this.getOpenAI(apiKey)
      
      const messages = [
        {
          role: 'system',
          content: `You are an expert AI photo editor that can actually PERFORM image editing tasks, not just give instructions. You have the ability to:

PERFORM ACTUAL IMAGE EDITING:
- Remove objects from images using AI-powered content-aware fill
- Adjust colors, brightness, contrast, and other image properties
- Apply filters and effects
- Crop and resize images
- Enhance image quality
- Remove backgrounds
- Retouch portraits

WHEN A USER ASKS FOR AN EDIT:
1. Acknowledge their request
2. Explain what you're going to do
3. Perform the actual edit using your image processing capabilities
4. Return the edited image

EXAMPLES OF WHAT YOU CAN DO:
- "Remove the black AirPod case" → Actually remove it from the image
- "Make the sky more blue" → Actually adjust the sky colors
- "Increase brightness" → Actually brighten the image
- "Apply a vintage filter" → Actually apply the filter

IMPORTANT: You are NOT a consultant giving advice about external software. You are an AI that can actually edit images. When users ask for edits, perform them directly.

If you cannot perform a specific edit (due to technical limitations), explain what you can do instead or suggest a similar achievable edit.

Always be helpful, enthusiastic, and focus on actually improving their images through direct action.`
        },
        ...conversationHistory,
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: message
            },
            {
              type: 'image_url',
              image_url: {
                url: imageData
              }
            }
          ]
        }
      ]

      console.log('[AIService] Making OpenAI request with model: gpt-4o')
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        max_tokens: 600,
        temperature: 0.7
      })

      console.log('[AIService] OpenAI response received:', {
        hasResponse: !!response.choices[0]?.message?.content,
        responseLength: response.choices[0]?.message?.content?.length || 0
      })

      return response.choices[0]?.message?.content || 'Sorry, I couldn\'t process that request.'
    } catch (error: unknown) {
      console.error('[AIService] Detailed error in AI chat:', {
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorCode: (error as any)?.code,
        errorStatus: (error as any)?.status,
        fullError: error
      })
      return 'Sorry, I\'m having trouble processing your request right now.'
    }
  }
} 