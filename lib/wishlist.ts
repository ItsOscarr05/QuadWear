const WISHLIST_STORAGE_KEY = 'quadwear_wishlist'

export interface WishlistItem {
  productId: string
  name: string
  slug: string
  price: number
  image: string
}

export function getWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveWishlist(items: WishlistItem[]): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save wishlist:', error)
  }
}

export function addToWishlist(item: WishlistItem): void {
  const wishlist = getWishlist()
  if (!wishlist.some((i) => i.productId === item.productId)) {
    wishlist.push(item)
    saveWishlist(wishlist)
    window.dispatchEvent(new Event('wishlistUpdated'))
  }
}

export function removeFromWishlist(productId: string): void {
  const wishlist = getWishlist().filter((item) => item.productId !== productId)
  saveWishlist(wishlist)
  window.dispatchEvent(new Event('wishlistUpdated'))
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().some((item) => item.productId === productId)
}
