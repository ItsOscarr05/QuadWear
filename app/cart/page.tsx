'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  getCart,
  updateCartItem,
  removeFromCart,
  getCartTotalQuantity,
  getCartTotalPrice,
  isCartValid,
  getCartRemainingQuantity,
  MIN_ORDER_QUANTITY,
} from '@/lib/cart'

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState(getCart())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    updateCart()
  }, [])

  useEffect(() => {
    const handleCartUpdate = () => updateCart()
    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  const updateCart = () => {
    setCart(getCart())
  }

  const handleQuantityChange = (productId: string, size: string, newQuantity: number) => {
    updateCartItem(productId, size, newQuantity)
    updateCart()
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleRemove = (productId: string, size: string) => {
    removeFromCart(productId, size)
    updateCart()
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const totalQuantity = getCartTotalQuantity(cart)
  const totalPrice = getCartTotalPrice(cart)
  const isValid = isCartValid(cart)
  const remaining = getCartRemainingQuantity(cart)

  if (!isClient) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link href="/shop" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Bulk validation message */}
          {!isValid && (
            <div className="bg-accent/20 border-2 border-accent/40 rounded-lg p-4 mb-6">
              <p className="font-semibold text-lg mb-2">
                Add {remaining} more shirt{remaining !== 1 ? 's' : ''} to reach minimum ({MIN_ORDER_QUANTITY})
              </p>
              <p className="text-sm text-gray-700">
                You're {remaining} shirt{remaining !== 1 ? 's' : ''} away — mix designs to reach {MIN_ORDER_QUANTITY}!
              </p>
            </div>
          )}

          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cart.items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="card-sticker flex flex-col sm:flex-row gap-4"
              >
                <Link href={`/shop/${item.slug}`} className="relative w-full sm:w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </Link>

                <div className="flex-1">
                  <Link href={`/shop/${item.slug}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                  <p className="text-lg font-bold text-primary">
                    ${(item.price / 100).toFixed(2)} each
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-semibold">Qty:</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.productId, item.size, item.quantity - 1)
                        }
                        className="w-8 h-8 border-2 border-gray-300 rounded-lg hover:border-primary"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.productId, item.size, item.quantity + 1)
                        }
                        className="w-8 h-8 border-2 border-gray-300 rounded-lg hover:border-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId, item.size)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="card-sticker">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal ({totalQuantity} items):</span>
                <span className="font-bold">${(totalPrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping:</span>
                <span>{totalPrice >= 5000 ? 'Free' : '$5.99'}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-4 flex justify-between text-xl">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-primary">
                  ${((totalPrice + (totalPrice >= 5000 ? 0 : 599)) / 100).toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/shop" className="flex-1 btn-secondary text-center">
                  Continue Shopping
                </Link>
                <button
                  onClick={() => router.push('/checkout')}
                  disabled={!isValid}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    isValid
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  title={!isValid ? `Add ${remaining} more shirt${remaining !== 1 ? 's' : ''} to checkout` : ''}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
