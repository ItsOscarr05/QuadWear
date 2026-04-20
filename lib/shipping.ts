/** Subtotal at or above this (cents) qualifies for free shipping. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000

/** Flat-rate shipping when below free-shipping threshold (cents). */
export const SHIPPING_FLAT_CENTS = 599

export function getShippingCents(subtotalCents: number): number {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FLAT_CENTS
}

export function getOrderTotalCents(subtotalCents: number): number {
  return subtotalCents + getShippingCents(subtotalCents)
}
