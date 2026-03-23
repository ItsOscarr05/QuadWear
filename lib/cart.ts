export interface CartItem {
  productId: string
  name: string
  slug: string
  price: number // in cents
  size: string
  quantity: number
  image: string
  /** Shirt color name when product has color variants */
  color?: string
}

function lineMatches(
  a: Pick<CartItem, "productId" | "size" | "color">,
  b: Pick<CartItem, "productId" | "size" | "color">,
): boolean {
  return (
    a.productId === b.productId &&
    a.size === b.size &&
    (a.color ?? "") === (b.color ?? "")
  )
}

export interface Cart {
  items: CartItem[]
}

const CART_STORAGE_KEY = 'quadwear_cart'

export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [] }
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : { items: [] }
  } catch {
    return { items: [] }
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Failed to save cart:', error)
  }
}

export function addToCart(item: Omit<CartItem, 'quantity'> & { quantity?: number }): Cart {
  const cart = getCart()
  const existingIndex = cart.items.findIndex((i) => lineMatches(i, item))

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += item.quantity || 1
  } else {
    cart.items.push({ ...item, quantity: item.quantity || 1 })
  }

  saveCart(cart)
  return cart
}

export function updateCartItem(
  productId: string,
  size: string,
  quantity: number,
  color?: string,
): Cart {
  const cart = getCart()
  const index = cart.items.findIndex((i) =>
    lineMatches(i, { productId, size, color }),
  )

  if (index >= 0) {
    cart.items[index].quantity = Math.max(0, quantity)
  }

  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string, size: string, color?: string): Cart {
  const cart = getCart()
  const index = cart.items.findIndex((i) =>
    lineMatches(i, { productId, size, color }),
  )
  if (index >= 0) {
    cart.items.splice(index, 1)
  }
  saveCart(cart)
  return cart
}

export function clearCart(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_STORAGE_KEY)
}

export function getCartTotalQuantity(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartTotalPrice(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

/** True when there is at least one line item with quantity > 0 (can proceed to checkout). */
export function isCartValid(cart: Cart): boolean {
  return cart.items.some((i) => i.quantity > 0)
}
