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

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?university=JMU')
      const products = await response.json()
      setFeaturedProducts(products.slice(0, 4)) // Show first 4 JMU products
    } catch (error) {
      console.error('Error fetching featured products:', error)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 marker-highlight">
            Hand-drawn tees for your major.
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Choose your university → pick your major → wear it.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Perfect for study groups, clubs, and classes — min 12 shirts per order
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary text-lg">
              Shop by University
            </Link>
            <Link href="/shop" className="btn-secondary text-lg">
              Browse all Majors
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="bg-white border-b-2 border-primary/20 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-semibold text-sm md:text-base">Free exchanges</p>
            </div>
            <div>
              <p className="font-semibold text-sm md:text-base">Secure checkout</p>
            </div>
            <div>
              <p className="font-semibold text-sm md:text-base">Student-designed</p>
            </div>
            <div>
              <p className="font-semibold text-sm md:text-base">Min 12 — mix & match</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Trending at JMU
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                          <span className="bg-accent text-neutral-charcoal text-xs font-bold px-2 py-1 rounded-full font-accent">
                            {badges[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.major}</p>
                    <p className="text-xl font-bold text-primary">
                      ${(product.price / 100).toFixed(2)}
                    </p>
                  </Link>
                )
              })}
            </div>
            <div className="text-center mt-8">
              <Link href="/jmu" className="btn-secondary">
                View All JMU Designs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-neutral-offwhite py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Your University</h3>
              <p className="text-gray-600">
                Select your campus from our growing list of universities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Pick Your Major</h3>
              <p className="text-gray-600">
                Browse hand-drawn designs created specifically for your major.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Order & Wear</h3>
              <p className="text-gray-600">
                Order 12+ shirts (mix designs & sizes) and rep your major!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
