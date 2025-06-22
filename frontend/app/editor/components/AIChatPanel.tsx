'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Bot, User, Sparkles, Key, AlertCircle, GripVertical, ImageIcon } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface AIChatPanelProps {
  apiKey?: string
}

export default function AIChatPanel({ apiKey }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. I can help you edit your images with advanced AI features. What would you like to do?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [panelWidth, setPanelWidth] = useState(384) // 96 * 4 = 384px (w-96)
  const [isDragging, setIsDragging] = useState(false)
  const [imageAvailable, setImageAvailable] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()
  const resizeHandleRef = useRef<HTMLDivElement>(null)

  const hasApiKey = !!apiKey

  // Debug: Log API key changes
  useEffect(() => {
    console.log('AIChatPanel: API key prop changed:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length,
      apiKeyPrefix: apiKey?.substring(0, 6)
    })
  }, [apiKey])

  // Check if canvas has an image loaded
  const hasImage = () => {
    return imageAvailable
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Debounced auto-resize textarea based on content
  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Clear existing timeout
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    // Debounce the resize to prevent excessive calculations
    resizeTimeoutRef.current = setTimeout(() => {
      setIsResizing(true)
      
      // Set to single line height first to measure content
      textarea.style.height = '44px'
      
      // Get the scroll height to see if content overflows
      const scrollHeight = textarea.scrollHeight
      const singleLineHeight = 44
      
      // Only expand if content actually overflows to next line
      if (scrollHeight > singleLineHeight) {
        const maxHeight = 120
        const newHeight = Math.min(scrollHeight, maxHeight)
        textarea.style.height = `${newHeight}px`
      } else {
        // Keep at single line height
        textarea.style.height = `${singleLineHeight}px`
      }
      
      // Remove resizing class after transition
      setTimeout(() => setIsResizing(false), 150)
    }, 10)
  }, [])

  useEffect(() => {
    resizeTextarea()
  }, [inputValue, resizeTextarea])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  // Listen for canvas image events
  useEffect(() => {
    const handleCanvasImageEvent = (event: CustomEvent) => {
      console.log('Canvas image event received:', event.detail)
      setImageAvailable(event.detail)
    }

    // Check initial state
    const hasImageData = !!(window as any).getCanvasImageData?.()
    console.log('Initial image availability check:', hasImageData)
    setImageAvailable(hasImageData)

    // Listen for canvas events
    window.addEventListener('canvasImageLoaded', handleCanvasImageEvent as EventListener)

    return () => {
      window.removeEventListener('canvasImageLoaded', handleCanvasImageEvent as EventListener)
    }
  }, [])

  // Debug: Log current state whenever it changes
  useEffect(() => {
    console.log('AIChatPanel: imageAvailable state changed to:', imageAvailable)
  }, [imageAvailable])

  // Expose debug function globally
  useEffect(() => {
    ;(window as any).debugImageAvailability = () => {
      const hasImageData = !!(window as any).getCanvasImageData?.()
      console.log('Manual image availability check:', {
        hasImageData,
        imageAvailable,
        hasApiKey
      })
      return { hasImageData, imageAvailable, hasApiKey }
    }
  }, [imageAvailable, hasApiKey])

  // Panel resize functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return

    const newWidth = window.innerWidth - e.clientX
    const minWidth = 320 // Minimum width (w-80)
    const maxWidth = 600 // Maximum width (w-[600px])
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setPanelWidth(newWidth)
    }
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    // Check if API key is configured
    if (!hasApiKey) {
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: 'Please configure your OpenAI API key first to use AI features.',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      return
    }

    // Check if image is loaded
    if (!hasImage()) {
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: 'Please upload an image first before asking questions about it.',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Smoothly reset textarea height after sending
    const textarea = textareaRef.current
    if (textarea) {
      setIsResizing(true)
      textarea.style.height = '44px'
      setTimeout(() => setIsResizing(false), 200)
    }

    try {
      // Get the actual canvas image data
      const canvasImageData = (window as any).getCanvasImageData?.()
      
      if (!canvasImageData) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Please upload an image first before asking questions about it.',
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
        return
      }

      // Check if this is an edit request
      const editKeywords = [
        'remove', 'delete', 'erase', 'edit', 'change', 'adjust', 
        'make', 'add', 'apply', 'enhance', 'brighten', 'darken', 
        'increase', 'decrease', 'lower', 'boost', 'reduce',
        'crop', 'resize', 'filter', 'saturate', 'contrast', 'grayscale'
      ]
      const isEditRequest = editKeywords.some(keyword => inputValue.toLowerCase().includes(keyword))

      if (isEditRequest) {
        console.log('[AIChatPanel] Edit request detected, sending to backend:', {
          editRequest: inputValue,
          hasApiKey: !!apiKey,
          apiKeyLength: apiKey?.length,
          apiKeyPrefix: apiKey?.substring(0, 6)
        })
        
        // Call the edit endpoint
        const editResponse = await fetch('/api/ai/edit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            editRequest: inputValue,
            imageData: canvasImageData,
            apiKey
          })
        })

        console.log('[AIChatPanel] Edit response status:', editResponse.status)

        if (editResponse.ok) {
          const editData = await editResponse.json()
          console.log('[AIChatPanel] Edit successful:', {
            hasDescription: !!editData.description,
            hasEditedImageData: !!editData.editedImageData,
            editedImageDataLength: editData.editedImageData?.length,
            description: editData.description
          })
          
          // Update the canvas with the edited image
          if (editData.editedImageData && (window as any).updateCanvasWithImage) {
            console.log('[AIChatPanel] Updating canvas with edited image...')
            try {
              (window as any).updateCanvasWithImage(editData.editedImageData)
              console.log('[AIChatPanel] Canvas update function called successfully')
            } catch (error) {
              console.error('[AIChatPanel] Error updating canvas:', error)
            }
          } else {
            console.log('[AIChatPanel] Cannot update canvas:', {
              hasEditedImageData: !!editData.editedImageData,
              hasUpdateFunction: !!(window as any).updateCanvasWithImage
            })
          }
          
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `🎨 ${editData.description}\n\nI've successfully performed the edit: "${inputValue}". The image has been updated on your canvas!`,
            sender: 'ai',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, aiMessage])
          return
        } else {
          console.log('[AIChatPanel] Edit failed, falling back to chat')
        }
      }

      // Make API call to backend for regular chat
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          imageData: canvasImageData,
          conversationHistory: [],
          apiKey
        })
      })

      if (response.ok) {
        const data = await response.json()
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        const data = await response.json()
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Error: ${data.error || 'Failed to get response from AI'}`,
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting to the AI service. Please check your internet connection and try again.',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div 
      className="bg-white/90 backdrop-blur-xl border-l border-gray-200/50 flex flex-col shadow-lg relative"
      style={{ width: `${panelWidth}px` }}
    >
      {/* Resize Handle */}
      <div
        ref={resizeHandleRef}
        onMouseDown={handleMouseDown}
        className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-yellow-400/50 cursor-col-resize transition-colors duration-200 group z-10"
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <GripVertical size={16} className="text-yellow-600" />
        </div>
      </div>

      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
            <Bot size={20} className="text-black" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-gray-500 text-sm">Powered by AI</p>
          </div>
          {!hasApiKey && (
            <div className="flex items-center space-x-2 text-orange-600">
              <AlertCircle size={16} />
              <span className="text-xs">API Key Required</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 slide-in-from-bottom-3 duration-500 ease-out`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm transform transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-black'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <div className="animate-in fade-in-0 zoom-in-95 duration-300 delay-200">
                    <Bot size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words animate-in fade-in-0 slide-in-from-bottom-1 duration-400 delay-100">
                    {message.text}
                  </p>
                  <p className="text-xs opacity-60 mt-1 animate-in fade-in-0 duration-300 delay-300">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="animate-in fade-in-0 zoom-in-95 duration-300 delay-200">
                    <User size={16} className="text-black mt-0.5 flex-shrink-0" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-3 duration-500 ease-out">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 shadow-sm transform transition-all duration-300 ease-out">
              <div className="flex items-center space-x-2">
                <div className="animate-in fade-in-0 zoom-in-95 duration-300">
                  <Bot size={16} className="text-gray-500" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={
                !hasApiKey 
                  ? "Configure API key to start chatting..." 
                  : !hasImage()
                    ? "Upload an image to start chatting..."
                    : "Ask me to help with your image..."
              }
              disabled={!hasApiKey || !hasImage()}
              className={`w-full px-4 py-3 pr-12 bg-gray-50/80 border border-gray-200/60 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 ease-out text-gray-900 placeholder-gray-500 text-sm overflow-hidden backdrop-blur-sm ${
                isResizing ? 'transition-none' : ''
              } ${!hasApiKey || !hasImage() ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ 
                minHeight: '44px', 
                maxHeight: '120px',
                transition: isResizing ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading || !hasApiKey || !hasImage()}
            className={`p-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-xl transition-all duration-300 ease-out shadow-lg hover:shadow-xl flex-shrink-0 transform hover:scale-105 active:scale-95 ${
              !inputValue.trim() || isLoading || !hasApiKey || !hasImage()
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:opacity-90'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {!hasApiKey ? (
            <div className="flex items-center space-x-2 text-orange-600 text-xs">
              <Key size={12} />
              <span>Configure your OpenAI API key to use AI features</span>
            </div>
          ) : !hasImage() ? (
            <div className="flex items-center space-x-2 text-orange-600 text-xs">
              <ImageIcon size={12} />
              <span>Upload an image to start chatting with AI</span>
            </div>
          ) : (
            ['Enhance colors', 'Remove background', 'Add filter', 'Resize'].map((action) => (
              <button
                key={action}
                onClick={() => setInputValue(action)}
                className="px-3 py-1.5 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 text-xs rounded-lg transition-all duration-200 ease-out hover:shadow-sm transform hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                {action}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 