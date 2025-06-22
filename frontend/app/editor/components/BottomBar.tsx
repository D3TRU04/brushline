'use client'

import { useState } from 'react'
import { Info, ZoomIn, ZoomOut, RotateCcw, Download, Share2 } from 'lucide-react'

interface ImageInfo {
    width: number
    height: number
    format: string
  }

interface BottomBarProps {
  imageInfo?: ImageInfo
}

export default function BottomBar({ imageInfo }: BottomBarProps) {
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 25))
  }

  const handleResetZoom = () => {
    setZoom(100)
  }

  const handleDownload = () => {
    // Use the exposed save function from Canvas component
    if ((window as any).saveCanvas) {
      (window as any).saveCanvas()
    } else {
      // Fallback: create a download link for the canvas
      const canvas = document.querySelector('canvas') as HTMLCanvasElement
      if (canvas) {
        const link = document.createElement('a')
        link.download = 'brushline-image.png'
        link.href = canvas.toDataURL()
        link.click()
      }
    }
  }

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'My edited image',
        text: 'Check out this image I edited with Brushline!',
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  return (
    <div className="h-16 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 flex items-center justify-between px-6 shadow-sm">
      {/* Left side - Image info */}
      <div className="flex items-center space-x-6">
        {imageInfo ? (
          <>
            <div className="flex items-center space-x-2">
              <Info size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">
                {imageInfo.width} × {imageInfo.height}
              </span>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {imageInfo.format}
            </div>
          </>
        ) : (
      <div className="flex items-center space-x-2">
            <Info size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">No image loaded</span>
          </div>
        )}
      </div>

      {/* Center - Zoom controls */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleZoomOut}
          disabled={zoom <= 25}
          className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl transition-all duration-200 hover:shadow-md"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        
        <div className="flex items-center space-x-2 min-w-[80px] justify-center">
          <span className="text-sm font-medium text-gray-900">{zoom}%</span>
          <button
            onClick={handleResetZoom}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors p-1 rounded"
            title="Reset Zoom"
          >
            <RotateCcw size={12} />
          </button>
        </div>
        
        <button 
          onClick={handleZoomIn}
          disabled={zoom >= 200}
          className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl transition-all duration-200 hover:shadow-md"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleDownload}
          disabled={!imageInfo}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium text-sm hover:shadow-md"
          title="Download Image"
        >
          <Download size={16} />
          <span>Download</span>
        </button>
        
        <button 
          onClick={handleShare}
          disabled={!imageInfo}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium text-sm shadow-lg hover:shadow-xl"
          title="Share Image"
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  )
} 