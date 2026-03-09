'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  mockupImage: string
  designImage: string
  university: string
  major: string
  badges: string
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?university=JMU')
      const data = await response.json()
      const products = Array.isArray(data) ? data : []
      setFeaturedProducts(products.slice(0, 4))
    } catch (error) {
      console.error('Error fetching featured products:', error)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email subscription
    alert('Thanks for subscribing!')
    setEmail('')
  }

  const topMajors = [
    'Business',
    'Psychology',
    'Computer Science',
    'Nursing',
    'Biology',
    'Communications',
    'Education',
    'Engineering',
    'Criminal Justice',
    'Marketing',
  ]

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Orders are typically processed within 3-5 business days and shipped via standard shipping (5-7 business days) or expedited shipping (2-3 business days).',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer free exchanges within 30 days if the item is unworn and in original condition. Returns are also accepted within 30 days.',
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! Free shipping on orders over $50.',
    },
    {
      question: 'Can I customize designs?',
      answer: 'Currently we offer pre-designed shirts for specific majors. For custom designs or bulk orders, please contact us.',
    },
    {
      question: 'What sizes are available?',
      answer: 'We offer sizes S, M, L, XL, and XXL. Check our size guide on product pages for detailed measurements.',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="section-black py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            Hand-drawn tees for your major.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
            Choose your university → pick your major → wear it.
          </p>
          <p className="text-lg text-white/80 mb-10">
            Perfect for study groups, clubs, and classes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary text-lg inline-block">
              Shop by University
            </Link>
            <Link href="/shop" className="btn-secondary text-lg inline-block">
              Browse all Majors
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="bg-white border-b-4 border-black py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="border-r-4 border-black md:border-r-4 md:border-b-0 border-b-4 pb-8 md:pb-0 md:pr-8">
              <p className="font-bold text-lg text-black">Free exchanges</p>
            </div>
            <div className="border-r-4 border-black md:border-r-4 md:border-b-0 border-b-4 pb-8 md:pb-0 md:pr-8">
              <p className="font-bold text-lg text-black">Secure checkout</p>
            </div>
            <div>
              <p className="font-bold text-lg text-black">Student-designed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      {featuredProducts.length > 0 && (
        <section className="bg-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-black">
              Trending at JMU
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {featuredProducts.map((product) => {
                const badges = JSON.parse(product.badges || '[]')
                return (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    className="card-sticker group"
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={product.mockupImage || product.designImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {badges.length > 0 && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-accent text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-black">
                            {badges[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-1 text-black">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.major}</p>
                    <p className="text-2xl font-bold text-primary">
                      ${(product.price / 100).toFixed(2)}
                    </p>
                  </Link>
                )
              })}
            </div>
            <div className="text-center mt-12">
              <Link href="/jmu" className="btn-secondary inline-block">
                View All JMU Designs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Benefits/Features Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            Why QuadWear?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-sticker text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-black">Hand-drawn Designs</h3>
              <p className="text-gray-700">Unique, hand-drawn designs that celebrate your major with authentic style.</p>
            </div>
            <div className="card-sticker text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-black">Perfect for Groups</h3>
              <p className="text-gray-700">Order for your study group, club, or class. Mix designs and sizes.</p>
            </div>
            <div className="card-sticker text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M5 7v4M7 5h4m4 0h4v4m-4-4v4m-4 4h4m-4-4v4m-4-4h4m-4 4v4m4-4h4m-4-4v4m-4-4h4" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-black">High Quality</h3>
              <p className="text-gray-700">Premium materials and printing ensure your shirt lasts through countless wears.</p>
            </div>
            <div className="card-sticker text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-black">Student-Loved</h3>
              <p className="text-gray-700">Designed by students, for students. Every design celebrates your academic journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-black py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center border-4 border-primary rounded-full bg-white">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v5" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Choose Your University</h3>
              <p className="text-white/80">
                Select your campus from our growing list of Virginia universities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center border-4 border-accent rounded-full bg-white">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Pick Your Major</h3>
              <p className="text-white/80">
                Browse hand-drawn designs created specifically for your major.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center border-4 border-primary rounded-full bg-white">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Order & Wear</h3>
              <p className="text-white/80">
                Order your favorite designs and rep your major!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            What Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-sticker">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Finally, a shirt that actually represents my major! The design is so unique and the quality is amazing."
              </p>
              <p className="font-bold text-black">Sarah M.</p>
              <p className="text-sm text-gray-600">JMU • Computer Science</p>
            </div>
            <div className="card-sticker">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Ordered for my study group and everyone loved them! Great way to show major pride."
              </p>
              <p className="font-bold text-black">Alex T.</p>
              <p className="text-sm text-gray-600">Virginia Tech • Business</p>
            </div>
            <div className="card-sticker">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The hand-drawn style is exactly what I was looking for. So much better than generic college merch!"
              </p>
              <p className="font-bold text-black">Jordan K.</p>
              <p className="text-sm text-gray-600">UVA • Psychology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="section-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Shop by Major
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {topMajors.map((major) => (
              <Link
                key={major}
                href={`/shop?major=${major}`}
                className="bg-white rounded-lg p-6 text-center transition-all duration-200 border-4 border-primary hover:border-accent"
              >
                <p className="font-bold text-lg text-black">{major}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card-sticker">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="font-bold text-lg text-black pr-4">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <p className="mt-4 text-gray-700">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-black py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Stay Updated
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get notified when we add new designs for your major
          </p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-lg border-4 border-white bg-white text-black font-semibold focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="btn-primary px-8 py-4 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
