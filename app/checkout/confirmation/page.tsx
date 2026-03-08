'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  useEffect(() => {
    const order = searchParams.get('order')
    if (order) {
      setOrderNumber(order)
    }
  }, [searchParams])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div className="card-sticker">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          {orderNumber && (
            <p className="text-lg text-gray-600 mb-4">Order #{orderNumber}</p>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-gray-700">
            Thank you for your order! We've sent a confirmation email to your inbox.
          </p>
          <p className="text-gray-700">
            Expected ship window: <strong>3-5 business days</strong>
          </p>
          <p className="text-sm text-gray-600">
            You'll receive a tracking number via email once your order ships.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-secondary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
