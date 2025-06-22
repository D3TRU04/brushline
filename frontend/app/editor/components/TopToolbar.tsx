'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  FolderOpen, 
  Save, 
  Undo, 
  Redo, 
  Sparkles,
  Settings,
  Key
} from 'lucide-react'
import ApiKeyModal from './ApiKeyModal'

interface TopToolbarProps {
  onPropertiesToggle: () => void
  showProperties: boolean
  onOpenFile?: (file: File) => void
  onSaveFile?: () => void
  onApiKeyChange?: (apiKey: string) => void
  apiKey?: string
}

export default function TopToolbar({ 
  onPropertiesToggle, 
  showProperties, 
  onOpenFile, 
  onSaveFile,
  onApiKeyChange,
  apiKey
}: TopToolbarProps) {
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)

  const hasApiKey = !!apiKey

  const handleOpenFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file && onOpenFile) {
        onOpenFile(file)
      }
    }
    input.click()
  }

  const handleSaveFile = () => {
    if (onSaveFile) {
      onSaveFile()
    } else {
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
  }

  const handleApiKeySave = (apiKey: string) => {
    if (onApiKeyChange) {
      onApiKeyChange(apiKey)
    }
  }

  return (
    <>
      <div className="h-20 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-6 shadow-sm">
        {/* Left side - File actions */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleOpenFile}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 flex items-center space-x-2.5 font-medium text-sm hover:shadow-md"
          >
            <FolderOpen size={16} />
            <span>Open</span>
          </button>
          <button 
            onClick={handleSaveFile}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 flex items-center space-x-2.5 font-medium text-sm hover:shadow-md"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>

        {/* Center - App title */}
        <Link href="/landing" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Sparkles size={18} className="text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-gray-900">Brushline</span>
            <span className="text-gray-500 text-xs">AI Photo Editor</span>
          </div>
        </Link>

        {/* Right side - Edit actions & Properties toggle */}
        <div className="flex items-center space-x-3">
          <button 
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 hover:shadow-md"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button 
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 hover:shadow-md"
            title="Redo"
          >
            <Redo size={16} />
          </button>
          
          {/* API Key Button */}
          <button 
            onClick={() => setShowApiKeyModal(true)}
            className={`p-3 rounded-xl transition-all duration-200 flex items-center space-x-2.5 ${
              hasApiKey 
                ? 'bg-gradient-to-r from-green-400 to-green-300 text-white shadow-lg' 
                : 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-lg hover:opacity-90'
            }`}
            title={hasApiKey ? 'API Key Configured' : 'Configure API Key'}
          >
            <Key size={16} />
            <span className="hidden sm:inline font-medium text-sm">
              {hasApiKey ? 'API Ready' : 'API Key'}
            </span>
          </button>
          
          {/* Properties Toggle Button */}
          <button 
            onClick={onPropertiesToggle}
            className={`p-3 rounded-xl transition-all duration-200 flex items-center space-x-2.5 ${
              showProperties 
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-md'
            }`}
            title={showProperties ? 'Hide Properties' : 'Show Properties'}
          >
            <Settings size={16} />
            <span className="hidden sm:inline font-medium text-sm">Properties</span>
          </button>
        </div>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={handleApiKeySave}
      />
    </>
  )
} 