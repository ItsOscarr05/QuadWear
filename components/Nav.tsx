'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCart, getCartTotalQuantity } from '@/lib/cart'

export default function Nav() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart()
      setCartCount(getCartTotalQuantity(cart))
    }

    updateCartCount()
    window.addEventListener('storage', updateCartCount)
    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  return (
    <nav className="bg-white border-b-2 border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary font-accent">QuadWear</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-neutral-charcoal hover:text-primary transition-colors font-medium">
              Shop
            </Link>
            <div className="relative group">
              <button className="text-neutral-charcoal hover:text-primary transition-colors font-medium">
                Universities
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-primary/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/jmu" className="block px-4 py-2 hover:bg-primary/10 text-neutral-charcoal">
                  JMU
                </Link>
              </div>
            </div>
            <Link href="/about" className="text-neutral-charcoal hover:text-primary transition-colors font-medium">
              About
            </Link>
          </div>

          <Link href="/cart" className="relative">
            <svg
              className="w-6 h-6 text-neutral-charcoal hover:text-primary transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-neutral-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
