'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface CanvasProps {
  onImageLoad?: (file: File) => void
}

export default function Canvas({ onImageLoad }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(20)
  const [brushColor, setBrushColor] = useState('#000000')
  const [currentTool, setCurrentTool] = useState('brush')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const ctx = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    ctx.current = canvas.getContext('2d')
    if (!ctx.current) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Set default styles
    ctx.current.fillStyle = '#ffffff'
    ctx.current.fillRect(0, 0, canvas.width, canvas.height)
    ctx.current.lineCap = 'round'
    ctx.current.lineJoin = 'round'
  }, [])

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx.current) return

    setIsDrawing(true)
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.current.beginPath()
    ctx.current.moveTo(x, y)
    ctx.current.strokeStyle = currentTool === 'eraser' ? '#ffffff' : brushColor
    ctx.current.lineWidth = brushSize
  }, [brushColor, brushSize, currentTool])

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx.current) return

    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.current.lineTo(x, y)
    ctx.current.stroke()
  }, [isDrawing])

  const stopDrawing = useCallback(() => {
    if (!ctx.current) return
    setIsDrawing(false)
    ctx.current.closePath()
  }, [])

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        if (!canvasRef.current || !ctx.current) return

        const canvas = canvasRef.current
        const ctx2d = ctx.current

        // Clear canvas
        ctx2d.clearRect(0, 0, canvas.width, canvas.height)

        // Calculate aspect ratio to fit image
        const canvasAspect = canvas.width / canvas.height
        const imageAspect = img.width / img.height

        let drawWidth, drawHeight, offsetX, offsetY

        if (imageAspect > canvasAspect) {
          // Image is wider than canvas
          drawWidth = canvas.width
          drawHeight = canvas.width / imageAspect
          offsetX = 0
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          // Image is taller than canvas
          drawHeight = canvas.height
          drawWidth = canvas.height * imageAspect
          offsetX = (canvas.width - drawWidth) / 2
          offsetY = 0
        }

        ctx2d.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
        setImageLoaded(true)
        onImageLoad?.(file)
        
        // Dispatch custom event for image loaded
        console.log('Canvas: Image loaded, dispatching event')
        window.dispatchEvent(new CustomEvent('canvasImageLoaded', { detail: true }))
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [onImageLoad])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [handleFileUpload])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }, [handleFileUpload])

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current || !ctx.current) return

    ctx.current.fillStyle = '#ffffff'
    ctx.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setImageLoaded(false)
    
    // Dispatch custom event for image cleared
    console.log('Canvas: Image cleared, dispatching event')
    window.dispatchEvent(new CustomEvent('canvasImageLoaded', { detail: false }))
  }, [])

  // Expose save function globally
  useEffect(() => {
    ;(window as any).saveCanvas = () => {
      if (!canvasRef.current) return

      const link = document.createElement('a')
      link.download = 'brushline-image.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
    }

    // Expose function to get current canvas image data
    ;(window as any).getCanvasImageData = () => {
      if (!canvasRef.current) return null
      
      // Check if canvas has actual image content (not just white background)
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return null
      
      // Get image data to check if it's not just white
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      // Check if the canvas is not just white (has some non-white pixels)
      let hasContent = false
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        // Check if pixel is not white (allowing for some tolerance)
        if (r < 250 || g < 250 || b < 250) {
          hasContent = true
          break
        }
      }
      
      if (!hasContent) return null
      
      return canvas.toDataURL('image/png')
    }

    // Expose function to update canvas with new image
    ;(window as any).updateCanvasWithImage = (imageDataUrl: string) => {
      console.log('[Canvas] updateCanvasWithImage called with:', {
        hasImageData: !!imageDataUrl,
        imageDataLength: imageDataUrl?.length,
        imageDataPrefix: imageDataUrl?.substring(0, 50)
      })
      
      if (!canvasRef.current || !ctx.current) {
        console.error('[Canvas] Canvas or context not available')
        return
      }
      
      const img = new Image()
      img.onload = () => {
        console.log('[Canvas] Image loaded, updating canvas...')
        const canvas = canvasRef.current!
        const ctx2d = ctx.current!
        
        // Clear canvas
        ctx2d.clearRect(0, 0, canvas.width, canvas.height)
        
        // Calculate aspect ratio to fit image
        const canvasAspect = canvas.width / canvas.height
        const imageAspect = img.width / img.height

        let drawWidth, drawHeight, offsetX, offsetY

        if (imageAspect > canvasAspect) {
          // Image is wider than canvas
          drawWidth = canvas.width
          drawHeight = canvas.width / imageAspect
          offsetX = 0
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          // Image is taller than canvas
          drawHeight = canvas.height
          drawWidth = canvas.height * imageAspect
          offsetX = (canvas.width - drawWidth) / 2
          offsetY = 0
        }

        ctx2d.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
        setImageLoaded(true)
        
        console.log('[Canvas] Canvas updated successfully with edited image')
      }
      
      img.onerror = (error) => {
        console.error('[Canvas] Error loading image:', error)
      }
      
      img.src = imageDataUrl
    }
  }, [])

  return (
      <div 
        className="w-full h-full flex items-center justify-center p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="relative">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          className="border-2 border-gray-200 rounded-2xl cursor-crosshair shadow-2xl bg-white max-w-full max-h-full"
          />
          
          {/* Upload Overlay */}
          {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-center w-full max-w-sm mx-auto p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <ImageIcon size={32} className="text-black" />
                </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                Upload an image to get started
              </h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                Drag and drop your image here or click the button below
              </p>
              <label className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-xl hover:opacity-90 transition-all duration-200 cursor-pointer inline-flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl">
                  <Upload size={16} />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Drag Overlay */}
          {dragOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-yellow-400/20 backdrop-blur-sm border-2 border-dashed border-yellow-400 rounded-2xl">
              <div className="text-center">
              <Upload size={48} className="text-yellow-500 mx-auto mb-4" />
              <p className="text-yellow-700 text-lg font-medium">Drop your image here</p>
              </div>
            </div>
          )}
      </div>

      {/* Clear Canvas Button */}
      {imageLoaded && (
        <button
          onClick={clearCanvas}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          title="Clear canvas"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
} 