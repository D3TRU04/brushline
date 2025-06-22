'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-0'}`}>
      <div
        className={`
          mx-auto
          bg-white/80 backdrop-blur-xl 
          transition-all duration-300
          ${isScrolled 
              ? 'max-w-7xl rounded-full border border-gray-200 shadow-md' 
              : 'max-w-full rounded-none border-b border-gray-200'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg flex items-center justify-center">
                <Sparkles size={16} className="text-black" />
              </div>
              <span className="text-lg">Brushline</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-500 hover:text-black transition-colors">Features</a>
              {/* <a href="#pricing" className="text-gray-500 hover:text-black transition-colors">Pricing</a> */}
              <a href="#faq" className="text-gray-500 hover:text-black transition-colors">FAQ</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/editor" className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-lg hover:opacity-90 transition-opacity">
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 