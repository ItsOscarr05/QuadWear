import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { getOrderTotalCents, getShippingCents } from '@/lib/shipping'

/**
 * Stripe Checkout loads product images from our URLs; they must be reachable from the public internet.
 * Localhost / loopback URLs fail Stripe's checks and can cause the hosted page to show "Something went wrong".
 */
function originIsPubliclyReachableForStripeImages(origin: string): boolean {
  try {
    const { hostname } = new URL(origin)
    const h = hostname.toLowerCase()
    if (h === 'localhost' || h === '127.0.0.1' || h === '[::1]') return false
    if (h.endsWith('.local')) return false
    return true
  } catch {
    return false
  }
}

/** Resolves cart image paths to absolute URLs; omits images when they would not be public (e.g. local dev). */
function productImageUrls(origin: string, image: string | undefined): string[] {
  if (!originIsPubliclyReachableForStripeImages(origin)) return []
  if (!image?.trim()) return []
  const trimmed = image.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return [trimmed]
  }
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return [`${origin}${path}`]
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  try {
    const body = await request.json()
    const { items: rawItems, email, shipping } = body

    const items = Array.isArray(rawItems)
      ? rawItems.filter((item: { quantity?: number }) => (item.quantity ?? 0) > 0)
      : []

    if (items.length === 0) {
      return NextResponse.json({ error: 'No items to purchase' }, { status: 400 })
    }

    const subtotalCents = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0,
    )
    const shippingCents = getShippingCents(subtotalCents)
    const totalCents = getOrderTotalCents(subtotalCents)

    // Create order number
    const orderNumber = `QW-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        email,
        status: 'pending',
        totalCents,
        items: JSON.stringify(items),
        shipping: JSON.stringify(shipping),
      },
    })

    const origin = request.nextUrl.origin

    const productLineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd' as const,
        product_data: {
          name: item.color ? `${item.name} (${item.color})` : item.name,
          images: productImageUrls(origin, item.image),
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }))

    const shippingLineItems =
      shippingCents > 0
        ? [
            {
              price_data: {
                currency: 'usd' as const,
                product_data: {
                  name: 'Shipping',
                },
                unit_amount: shippingCents,
              },
              quantity: 1,
            },
          ]
        : []

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [...productLineItems, ...shippingLineItems],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      customer_email: email,
      metadata: {
        orderNumber,
        orderId: order.id,
        subtotalCents: String(subtotalCents),
        shippingCents: String(shippingCents),
      },
    })

    if (!session.url) {
      console.error('Checkout session missing url', session.id)
      return NextResponse.json(
        { error: 'Checkout session did not return a payment URL' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      orderNumber,
    })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 })
  }
}
