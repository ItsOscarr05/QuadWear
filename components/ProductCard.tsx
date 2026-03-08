'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { addToCart } from '@/lib/cart'
import { addToWishlist, removeFromWishlist, isInWishlist } from '@/lib/wishlist'
import QuickViewModal from './QuickViewModal'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    designImage: string
    mockupImage: string
    badges: string
    university: string
    major: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const badges = JSON.parse(product.badges || '[]')

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id))
    const handleWishlistUpdate = () => setIsWishlisted(isInWishlist(product.id))
    window.addEventListener('wishlistUpdated', handleWishlistUpdate)
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
  }, [product.id])

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.mockupImage || product.designImage,
      })
    }
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: 'M', // Default size
      image: product.mockupImage || product.designImage,
    })
    window.dispatchEvent(new Event('cartUpdated'))
  }

  return (
    <>
      <div className="card-sticker group">
        <Link href={`/shop/${product.slug}`} className="block">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
            <Image
              src={product.mockupImage || product.designImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                handleWishlistToggle()
              }}
              className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg
                className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            {badges.length > 0 && (
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {badges.map((badge: string) => (
                  <span
                    key={badge}
                    className="bg-accent text-neutral-charcoal text-xs font-bold px-2 py-1 rounded-full font-accent"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {product.university} • {product.major}
          </p>
          <p className="text-xl font-bold text-primary">${(product.price / 100).toFixed(2)}</p>
        </Link>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setShowQuickView(true)}
            className="flex-1 btn-secondary text-sm py-2"
          >
            Quick View
          </button>
          <button onClick={handleAddToCart} className="flex-1 btn-primary text-sm py-2">
            Add to Cart
          </button>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  )
}
