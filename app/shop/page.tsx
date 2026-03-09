'use client'

import { useState, useEffect } from 'react'
import ProductGrid from '@/components/ProductGrid'
import ShopFilters, { FilterState } from '@/components/filters/ShopFilters'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  designImage: string
  mockupImage: string
  badges: string
  university: string
  major: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    university: '',
    major: '',
    size: '',
    minPrice: '',
    maxPrice: '',
    inStockOnly: false,
    sortBy: 'new',
  })
  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [products, filters])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      const productList = Array.isArray(data) ? data : []
      setProducts(productList)
      setFilteredProducts(productList)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    // Default: show all products when no filters are selected
    if (filters.university) {
      filtered = filtered.filter((p) => p.university === filters.university)
    }
    if (filters.major) {
      filtered = filtered.filter((p) => p.major === filters.major)
    }
    if (filters.size) {
      // Filter by size availability would require parsing sizes JSON
      // For now, we'll skip this filter
    }
    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice)
      if (!isNaN(min)) {
        const minCents = min * 100 // Convert to cents
        filtered = filtered.filter((p) => p.price >= minCents)
      }
    }
    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice)
      if (!isNaN(max)) {
        const maxCents = max * 100 // Convert to cents
        filtered = filtered.filter((p) => p.price <= maxCents)
      }
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        // For MVP, just use creation date
        filtered.sort((a, b) => b.id.localeCompare(a.id))
        break
      default:
        // 'new' - already sorted by creation date
        break
    }

    setFilteredProducts(filtered)
  }

  // Hardcoded Virginia universities
  const virginiaUniversities = [
    'UVA',
    'Virginia Tech',
    'JMU',
    'George Mason',
    'VCU',
    'ODU',
    'University of Richmond',
    'William & Mary',
    'Radford',
    'Longwood',
  ]

  // Hardcoded top majors (matching Shop by Major section)
  const topMajors = [
    'Business',
    'Psychology',
    'Computer Science',
    'Nursing',
    'Biology',
    'Communications',
    'Education',
    'Engineering',
    'Criminal Justice',
    'Marketing',
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Horizontal Filters */}
      <div className="mb-8">
        <ShopFilters
          universities={virginiaUniversities}
          majors={topMajors}
          onFilterChange={setFilters}
          horizontal={true}
        />
      </div>

      {/* Divider */}
      <div className="border-t-4 border-black mb-8"></div>

      {/* Product grid */}
      <div className={filteredProducts.length === 0 && !loading ? 'min-h-[60vh]' : ''}>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-black">Shop</h1>
              <p className="text-gray-600">{filteredProducts.length} products</p>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-500 text-lg">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
