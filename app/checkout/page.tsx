'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, getCartTotalPrice } from '@/lib/cart'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState(getCart())
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })

  useEffect(() => {
    const cart = getCart()
    if (cart.items.length === 0) {
      router.push('/cart')
      return
    }
    setCart(cart)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const totalPrice = getCartTotalPrice(cart)
      const shipping = {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items,
          email: formData.email,
          shipping,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.message || 'Checkout failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div className="space-y-6">
          <div className="card-sticker">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card-sticker sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              {cart.items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                  <span>
                    {item.name} ({item.size}) × {item.quantity}
                  </span>
                  <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${(getCartTotalPrice(cart) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping:</span>
                <span>
                  {getCartTotalPrice(cart) >= 5000 ? 'Free' : '$5.99'}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-gray-200">
                <span>Total:</span>
                <span className="text-primary">
                  ${((getCartTotalPrice(cart) + (getCartTotalPrice(cart) >= 5000 ? 0 : 599)) / 100).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
