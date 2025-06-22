'use client'

import { Bot, Palette, Zap, MessageSquare, Shield, Globe } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Editing',
    description: 'Edit photos with natural language commands. Just describe what you want to change.',
    color: 'from-yellow-400 to-yellow-300'
  },
  {
    icon: Palette,
    title: 'Professional Tools',
    description: 'Complete suite of editing tools including brushes, filters, and effects.',
    color: 'from-yellow-400 to-yellow-300'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with modern web technologies for instant editing and real-time previews.',
    color: 'from-yellow-400 to-yellow-300'
  },
  {
    icon: MessageSquare,
    title: 'Smart Assistant',
    description: 'AI chat interface that understands context and provides intelligent suggestions.',
    color: 'from-yellow-400 to-yellow-300'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your images stay on your device. No data is sent to external servers.',
    color: 'from-yellow-400 to-yellow-300'
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Access from any browser, any device. No downloads required.',
    color: 'from-yellow-400 to-yellow-300'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Everything you need to edit photos</h2>
          <p className="text-xl text-gray-500">Powerful AI tools that work the way you think</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-black" />
                </div>
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 