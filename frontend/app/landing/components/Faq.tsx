'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'How does AI photo editing work?',
    answer: 'Our AI understands natural language commands. Simply describe what you want to change, like "make the sky more blue" or "remove the background", and our AI will apply the edits instantly.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! All image processing happens locally in your browser. We never upload or store your images on our servers, ensuring complete privacy and security.'
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support all major image formats including JPEG, PNG, WebP, TIFF, and more. You can export in high quality formats suitable for any use case.'
  },
  {
    question: 'Can I use Brushline offline?',
    answer: 'Currently, Brushline requires an internet connection for the AI features. However, basic editing tools work offline once the app is loaded.'
  },
  // {
  //   question: 'Do you offer refunds?',
  //   answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied with Brushline Pro, we\'ll refund your subscription no questions asked.'
  // },
  {
    question: 'How do I get support?',
    answer: 'We offer multiple support channels including email, live chat, and comprehensive documentation. Pro users get priority support with faster response times.'
  }
]

export function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-500">Everything you need to know about Brushline</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span>{faq.question}</span>
                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openFaq === index && (
                <div className="px-6 pt-2 pb-4">
                  <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 