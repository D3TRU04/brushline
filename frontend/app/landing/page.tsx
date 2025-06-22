import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { EditorDemo } from './components/EditorDemo'
import { Features } from './components/Features'
import { Faq } from './components/Faq'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'

export default function LandingPage() {
  return (
    <div className="bg-white text-black">
      <Header />
      <main>
        <Hero />
        <EditorDemo />
        <Features />
        {/* Testimonials */}
        {/* <Testimonials /> */}
        {/* Pricing */}
        {/* <Pricing /> */}
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
} 