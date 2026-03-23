'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { addToCart } from '@/lib/cart'
import { PRODUCT_IMAGE_DISPLAY_CLASS } from '@/lib/productImageDisplay'
import type { ProductQuickView } from '@/lib/types/product'
import ColorSwatchRow from './ColorSwatchRow'
import { parseColorVariants } from '@/lib/colorVariants'

interface QuickViewModalProps {
  product: ProductQuickView
  onClose: () => void
  onAddToCart: () => void
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [colorIndex, setColorIndex] = useState(0)
  const sizes = JSON.parse(product.sizes || '{}')

  const colorVariants = useMemo(
    () => parseColorVariants(product.colorVariants),
    [product.colorVariants],
  )

  const displayImage =
    colorVariants.length > 0
      ? colorVariants[colorIndex]?.front ?? product.mockupImage
      : product.mockupImage || product.designImage

  const availableSizes = Object.keys(sizes).filter((size) => sizes[size] > 0)

  const handleAddToCart = () => {
    const v = colorVariants[colorIndex]
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      image: displayImage,
      quantity,
      color: v?.name,
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
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className={PRODUCT_IMAGE_DISPLAY_CLASS}
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
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-2xl font-bold text-primary mb-4">${(product.price / 100).toFixed(2)}</p>

            {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}

            {colorVariants.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Color</label>
                <ColorSwatchRow
                  variants={colorVariants}
                  selectedIndex={colorIndex}
                  onSelect={setColorIndex}
                  size="md"
                />
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
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
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button type="button" onClick={handleAddToCart} className="w-full btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
