'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { addToCart } from '@/lib/cart'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  description?: string
  material?: string
  fit?: string
  designImage: string
  mockupImage: string
  badges: string
  university: string
  major: string
  colors: string
  sizes: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [showSizeHelp, setShowSizeHelp] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/products')
      const products = await response.json()
      const found = products.find((p: Product) => p.slug === params.slug)
      if (found) {
        setProduct(found)
        const sizes = JSON.parse(found.sizes || '{}')
        const firstAvailableSize = Object.keys(sizes).find((s) => sizes[s] > 0) || 'M'
        setSelectedSize(firstAvailableSize)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching product:', error)
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      image: product.mockupImage || product.designImage,
      quantity,
    })
    window.dispatchEvent(new Event('cartUpdated'))
    router.push('/cart')
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500 text-lg">Product not found</p>
        <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    )
  }

  const badges = JSON.parse(product.badges || '[]')
  const colors = JSON.parse(product.colors || '[]')
  const sizes = JSON.parse(product.sizes || '{}')
  const availableSizes = Object.keys(sizes).filter((size) => sizes[size] > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={product.mockupImage || product.designImage}
            alt={product.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Product Details */}
        <div className="sticky top-20 h-fit">
          <div className="mb-4">
            {badges.map((badge: string) => (
              <span
                key={badge}
                className="bg-accent text-neutral-charcoal text-sm font-bold px-3 py-1 rounded-full mr-2 font-accent"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">
            {product.university} • {product.major}
          </p>

          <p className="text-3xl font-bold text-primary mb-6">
            ${(product.price / 100).toFixed(2)}
            <span className="text-lg text-gray-500 font-normal"> per shirt</span>
          </p>

          {product.description && (
            <p className="text-gray-700 mb-6">{product.description}</p>
          )}

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold">Size</label>
              <button
                onClick={() => setShowSizeHelp(true)}
                className="text-sm text-primary hover:underline"
              >
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">True to size</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-primary text-xl"
              >
                −
              </button>
              <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-primary text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Material & Fit */}
          {(product.material || product.fit) && (
            <div className="mb-6 text-sm text-gray-600">
              {product.material && <p>Material: {product.material}</p>}
              {product.fit && <p>Fit: {product.fit}</p>}
            </div>
          )}

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className="w-full btn-primary text-lg py-4 mb-4">
            Add to Cart
          </button>

          <div className="text-sm text-gray-500 text-center">
            <p>Free shipping on orders over $50</p>
            <p className="mt-1">Estimated delivery: 3-5 business days</p>
          </div>
        </div>
      </div>

      {/* Designed for section */}
      <div className="border-t-2 border-gray-200 pt-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Designed for {product.major} students</h2>
        <p className="text-gray-700">
          This design celebrates the {product.major} major at {product.university}. Perfect for
          study groups, clubs, and classes.
        </p>
      </div>

      {/* You might also like */}
      <div className="border-t-2 border-gray-200 pt-8">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <Link
          href={`/${product.university.toLowerCase()}/${product.major.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-primary hover:underline"
        >
          View all {product.major} designs at {product.university} →
        </Link>
      </div>

      {/* Size Help Modal */}
      {showSizeHelp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowSizeHelp(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">Size Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-2">Size</th>
                    <th className="text-left py-2">Chest (inches)</th>
                    <th className="text-left py-2">Length (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">S</td>
                    <td className="py-2">36-38</td>
                    <td className="py-2">28</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">M</td>
                    <td className="py-2">40-42</td>
                    <td className="py-2">29</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">L</td>
                    <td className="py-2">44-46</td>
                    <td className="py-2">30</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">XL</td>
                    <td className="py-2">48-50</td>
                    <td className="py-2">31</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">XXL</td>
                    <td className="py-2">52-54</td>
                    <td className="py-2">32</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeHelp(false)}
              className="mt-6 w-full btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
