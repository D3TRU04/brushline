'use client'

import Image from 'next/image'

export function EditorDemo() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Powerful AI Editor</h2>
          <p className="text-xl text-gray-500">See Brushline in action with our intuitive interface</p>
        </div>
        
        <div className="relative">
          {/* Editor Demo Image */}
          <div className="relative mx-auto max-w-6xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Browser-like header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-1 text-sm text-gray-600 text-center">
                    brushline.app/editor
                  </div>
                </div>
              </div>
              
              {/* Editor Layout */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 aspect-video relative">
                {/* Top Toolbar */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-6">
                  <div className="flex items-center space-x-3">
                    <div className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl flex items-center space-x-2.5 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                      </svg>
                      <span>Open</span>
                    </div>
                    <div className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl flex items-center space-x-2.5 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4z"/>
                      </svg>
                      <span>Save</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-gray-900">Brushline</span>
                      <span className="text-gray-500 text-xs">AI Photo Editor</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gray-100 text-gray-700 rounded-xl">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                      </svg>
                    </div>
                    <div className="p-2.5 bg-gray-100 text-gray-700 rounded-xl">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                      </svg>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-xl">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Left Sidebar */}
                <div className="absolute top-20 left-0 w-20 h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col items-center py-6 space-y-3">
                  {[
                    { icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", active: true },
                    { icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z", active: false },
                    { icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", active: false },
                    { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", active: false },
                    { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z", active: false },
                    { icon: "M4 6h16M4 10h16M4 14h16M4 18h16", active: false },
                    { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", active: false },
                    { icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z", active: false }
                  ].map((tool, index) => (
                    <div key={index} className={`w-12 h-12 rounded-xl flex items-center justify-center relative ${
                      tool.active 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-lg scale-105' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                      </svg>
                      {tool.active && (
                        <div className="absolute -right-1 -top-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Canvas Area */}
                <div className="absolute top-20 left-20 right-96 bottom-16 flex items-center justify-center p-6">
                  <div className="w-full h-full bg-white rounded-2xl border-2 border-gray-200 shadow-2xl flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload an image to get started</h3>
                      <p className="text-gray-600 text-sm">Drag and drop your image here or click to browse</p>
                    </div>
                  </div>
                </div>

                {/* AI Chat Panel */}
                <div className="absolute top-20 right-0 w-96 h-full bg-white/90 backdrop-blur-xl border-l border-gray-200/50 flex flex-col">
                  <div className="p-6 border-b border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
                        <p className="text-gray-500 text-sm">Powered by AI</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 space-y-4">
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-gray-100 text-gray-900">
                        <div className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-gray-500 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">Hello! I'm your AI assistant. I can help you edit your images with advanced AI features. What would you like to do?</p>
                            <p className="text-xs opacity-60 mt-1">12:34 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-200/50">
                    <div className="flex items-end space-x-3">
                      <div className="flex-1 relative">
                        <textarea
                          placeholder="Ask me to help with your image..."
                          className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl resize-none text-sm text-gray-900 placeholder-gray-500"
                          rows={1}
                          style={{ minHeight: '44px' }}
                        />
                      </div>
                      <button className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-xl shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-20 right-96 h-16 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 flex items-center justify-between px-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                      </svg>
                      <span className="text-sm text-gray-700">No image loaded</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 text-gray-700 rounded-xl">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">100%</span>
                    <div className="p-2 bg-gray-100 text-gray-700 rounded-xl">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl flex items-center space-x-2 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <span>Download</span>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-xl flex items-center space-x-2 text-sm shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                      </svg>
                      <span>Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Edit photos with natural language commands</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Tools</h3>
              <p className="text-gray-600">Complete suite of editing capabilities</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Preview</h3>
              <p className="text-gray-600">See changes instantly as you edit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 