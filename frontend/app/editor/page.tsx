'use client'

import { useState, useEffect } from 'react'
import TopToolbar from './components/TopToolbar'
import LeftSidebar from './components/LeftSidebar'
import Canvas from './components/Canvas'
import RightSidebar from './components/RightSidebar'
import BottomBar from './components/BottomBar'
import AIChatPanel from './components/AIChatPanel'

export default function EditorPage() {
  const [selectedTool, setSelectedTool] = useState('brush')
  const [showProperties, setShowProperties] = useState(false)
  const [currentImage, setCurrentImage] = useState<File | null>(null)
  const [apiKey, setApiKey] = useState<string>('')

  // Load API key from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedApiKey = localStorage.getItem('openai_api_key')
      if (savedApiKey) {
        setApiKey(savedApiKey)
        console.log('Editor: Loaded API key from localStorage:', {
          hasKey: !!savedApiKey,
          keyLength: savedApiKey.length,
          keyPrefix: savedApiKey.substring(0, 6)
        })
      } else {
        console.log('Editor: No API key found in localStorage')
      }
    }
  }, [])

  const handleImageLoad = (file: File) => {
    setCurrentImage(file)
  }

  const handleEffectApply = (effect: string, value: number) => {
    console.log(`Applied ${effect} with value ${value}`)
    // Here you would apply the effect to the canvas
  }

  const handleApiKeyChange = (newApiKey: string) => {
    console.log('Editor: API key changed:', {
      hasKey: !!newApiKey,
      keyLength: newApiKey.length,
      keyPrefix: newApiKey.substring(0, 6)
    })
    setApiKey(newApiKey)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-hidden">
      {/* Temporary Disclaimer Banner */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-blue-900">
                AI Features Notice
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Currently supports basic edits (brightness, contrast, filters). Advanced features coming soon.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="text-blue-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-200"
              onClick={() => {
                const banner = document.querySelector('.bg-blue-50');
                if (banner) {
                  banner.remove();
                }
              }}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Top Toolbar */}
      <TopToolbar 
        onPropertiesToggle={() => setShowProperties(!showProperties)}
        showProperties={showProperties}
        onOpenFile={(file) => {
          setCurrentImage(file)
          // Trigger canvas to load the file
          const event = new CustomEvent('loadImage', { detail: file })
          window.dispatchEvent(event)
        }}
        onApiKeyChange={handleApiKeyChange}
        apiKey={apiKey}
      />

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar */}
        <LeftSidebar 
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
        />

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden">
          <Canvas onImageLoad={handleImageLoad} />
        </div>

        {/* Right Sidebar - AI Chat Panel (Always visible) */}
        <AIChatPanel apiKey={apiKey} />

        {/* Properties Panel (Overlay) */}
        {showProperties && (
          <div className="absolute top-0 right-96 w-80 h-full z-10 shadow-2xl">
            <RightSidebar 
              onEffectApply={handleEffectApply}
              onClose={() => setShowProperties(false)}
            />
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <BottomBar 
        imageInfo={currentImage ? {
          width: 800,
          height: 600,
          format: currentImage.type.split('/')[1].toUpperCase()
        } : undefined}
      />
    </div>
  )
} 