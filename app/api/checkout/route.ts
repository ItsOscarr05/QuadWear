import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, email, shipping } = body

    // Calculate total
    const totalCents = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

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

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      customer_email: email,
      metadata: {
        orderNumber,
        orderId: order.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, orderNumber })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 })
  }
}
