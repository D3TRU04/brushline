import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Cta() {
  return (
    <section className="py-24 bg-gradient-to-br from-yellow-200 to-yellow-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl text-black mb-6">
          Ready to get started?
        </h2>
        
        <p className="text-xl text-black/60 mb-10">
          Try out Brushline for free and see the difference AI-powered editing can make.
        </p>

        <Link
          href="/editor"
          className="inline-flex items-center px-8 py-4 bg-black text-white rounded-lg hover:bg-black/80 transition-colors flex items-center space-x-2"
        >
          <span>Try out for free</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  )
} 