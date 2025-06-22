'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-48 pb-24 bg-gradient-to-br from-yellow-200 to-yellow-300">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="max-w-7xl mx-auto relative text-center z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 border border-black/10 text-black/80 text-sm">
            <Sparkles size={16} className="mr-2" />
            AI-Powered Photo Editing
          </span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl mb-6 text-black leading-tight">
            Edit Photos with
            <br />
            Natural Language
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-black/60 mb-8 max-w-3xl mx-auto">
          Transform your photos instantly with AI. Just describe what you want to change, and watch the magic happen.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/editor" className="px-8 py-4 bg-black text-white rounded-lg hover:bg-black/80 transition-colors flex items-center space-x-2">
            <span>Start Editing Free</span>
            <ArrowRight size={20} />
          </Link>
          {/* <button className="px-8 py-4 bg-black/5 hover:bg-black/10 rounded-lg transition-colors flex items-center space-x-2 border border-black/10 text-black">
            <Play size={20} />
            <span>Watch Demo</span>
          </button> */}
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl text-black mb-2">{stat.number}</div>
              <div className="text-black/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
} 