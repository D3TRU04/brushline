'use client'

import { useState, useEffect } from 'react'
import { X, Key, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (apiKey: string) => void
}

export default function ApiKeyModal({ isOpen, onClose, onSave }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Load existing API key from localStorage
      const savedKey = localStorage.getItem('openai_api_key')
      if (savedKey) {
        setApiKey(savedKey)
        setIsValid(true)
      }
    }
  }, [isOpen])

  const validateApiKey = (key: string) => {
    // More flexible OpenAI API key validation
    // Keys can start with sk- and have varying lengths
    const trimmedKey = key.trim()
    return trimmedKey.startsWith('sk-') && trimmedKey.length >= 20
  }

  const handleApiKeyChange = (value: string) => {
    setApiKey(value)
    setError('')
    
    if (value.length > 0) {
      const trimmedValue = value.trim()
      const valid = validateApiKey(trimmedValue)
      setIsValid(valid)
      
      // Debug logging (remove in production)
      console.log('API Key validation:', {
        length: trimmedValue.length,
        startsWithSk: trimmedValue.startsWith('sk-'),
        isValid: valid
      })
    } else {
      setIsValid(false)
    }
  }

  const handleSave = async () => {
    if (!isValid) {
      console.log('Cannot save: API key validation failed')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      console.log('Testing API key with backend...')
      // Test the API key by making a simple request
      const response = await fetch('/api/ai/test-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: apiKey.trim() })
      })

      console.log('Backend response status:', response.status)

      if (response.ok) {
        console.log('API key validation successful')
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('openai_api_key', apiKey.trim())
        }
        onSave(apiKey.trim())
        onClose()
      } else {
        const data = await response.json()
        console.log('Backend validation failed:', data)
        setError(data.error || 'Invalid API key. Please check and try again.')
      }
    } catch (err) {
      console.error('API key test error:', err)
      setError('Failed to validate API key. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('openai_api_key')
    }
    setApiKey('')
    setIsValid(false)
    onSave('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center">
            <Key size={20} className="text-black" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">OpenAI API Key</h2>
            <p className="text-gray-500 text-sm">Enter your OpenAI API key to enable AI features</p>
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="sk-..."
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  isValid 
                    ? 'border-green-300 focus:ring-green-400 focus:border-green-400' 
                    : apiKey.length > 0 
                      ? 'border-red-300 focus:ring-red-400 focus:border-red-400'
                      : 'border-gray-300 focus:ring-yellow-400 focus:border-yellow-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            {/* Validation indicator */}
            {apiKey.length > 0 && (
              <div className="flex items-center space-x-2 mt-2">
                {isValid ? (
                  <>
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm text-green-600">Valid API key format</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={16} className="text-red-500" />
                    <span className="text-sm text-red-600">Invalid API key format</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle size={16} className="text-red-500" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">How to get your API key:</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">OpenAI Platform</a></li>
              <li>2. Sign in or create an account</li>
              <li>3. Click "Create new secret key"</li>
              <li>4. Copy the key (starts with sk-)</li>
              <li>5. Paste it here</li>
            </ol>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 mt-6">
          {apiKey && isValid && (
            <button
              onClick={handleRemove}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Remove Key
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid || isLoading}
            className={`flex-1 px-4 py-3 rounded-xl transition-all ${
              isValid && !isLoading
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-black hover:opacity-90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Validating...' : 'Save Key'}
          </button>
        </div>
      </div>
    </div>
  )
} 