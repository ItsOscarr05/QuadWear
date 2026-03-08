'use client'

import { useState } from 'react'
import Image from 'next/image'
import { addToCart } from '@/lib/cart'

interface QuickViewModalProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    description?: string
    designImage: string
    mockupImage: string
    badges: string
    university: string
    major: string
    colors: string
    sizes: string
  }
  onClose: () => void
  onAddToCart: () => void
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const badges = JSON.parse(product.badges || '[]')
  const colors = JSON.parse(product.colors || '[]')
  const sizes = JSON.parse(product.sizes || '{}')

  const availableSizes = Object.keys(sizes).filter((size) => sizes[size] > 0)

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      image: product.mockupImage || product.designImage,
      quantity,
    })
    onAddToCart()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="relative aspect-square">
            <Image
              src={product.mockupImage || product.designImage}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600">
                  {product.university} • {product.major}
                </p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-2xl font-bold text-primary mb-4">${(product.price / 100).toFixed(2)}</p>

            {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button onClick={handleAddToCart} className="w-full btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
