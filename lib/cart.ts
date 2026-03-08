export interface CartItem {
  productId: string
  name: string
  slug: string
  price: number // in cents
  size: string
  quantity: number
  image: string
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
  const existingIndex = cart.items.findIndex(
    (i) => i.productId === item.productId && i.size === item.size
  )

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += item.quantity || 1
  } else {
    cart.items.push({ ...item, quantity: item.quantity || 1 })
  }

  saveCart(cart)
  return cart
}

export function updateCartItem(productId: string, size: string, quantity: number): Cart {
  const cart = getCart()
  const index = cart.items.findIndex((i) => i.productId === productId && i.size === size)

  if (index >= 0) {
    if (quantity <= 0) {
      cart.items.splice(index, 1)
    } else {
      cart.items[index].quantity = quantity
    }
  }

  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string, size: string): Cart {
  return updateCartItem(productId, size, 0)
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

export function isCartValid(cart: Cart): boolean {
  return cart.items.length > 0
}
