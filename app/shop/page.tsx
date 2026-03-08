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
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('')

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
      setProducts(data)
      setFilteredProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    if (filters.university) {
      filtered = filtered.filter((p) => p.university === filters.university)
    }
    if (filters.major) {
      filtered = filtered.filter((p) => p.major.toLowerCase().includes(filters.major.toLowerCase()))
    }
    if (filters.size) {
      // Filter by size availability would require parsing sizes JSON
      // For now, we'll skip this filter
    }
    if (filters.minPrice) {
      const min = parseInt(filters.minPrice) * 100 // Convert to cents
      filtered = filtered.filter((p) => p.price >= min)
    }
    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice) * 100 // Convert to cents
      filtered = filtered.filter((p) => p.price <= max)
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

  const handleOnboardingSelect = () => {
    if (selectedUniversity && selectedMajor) {
      setFilters({
        ...filters,
        university: selectedUniversity,
        major: selectedMajor,
      })
      setShowOnboarding(false)
    }
  }

  const universities = Array.from(new Set(products.map((p) => p.university)))
  const majors = Array.from(new Set(products.map((p) => p.major)))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Pick your major onboarding */}
      {showOnboarding && (
        <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Pick your major</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div>
              <label className="block text-sm font-semibold mb-2">Choose University</label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full border-2 border-primary rounded-lg px-4 py-2"
              >
                <option value="">Select university...</option>
                {universities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Choose Major</label>
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="w-full border-2 border-primary rounded-lg px-4 py-2"
                disabled={!selectedUniversity}
              >
                <option value="">Select major...</option>
                {majors
                  .filter((major) => {
                    if (!selectedUniversity) return true
                    return products.some((p) => p.university === selectedUniversity && p.major === major)
                  })
                  .map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleOnboardingSelect}
              disabled={!selectedUniversity || !selectedMajor}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Show Designs
            </button>
            <button onClick={() => setShowOnboarding(false)} className="btn-secondary">
              Browse All
            </button>
          </div>
        </div>
      )}

      {/* Bulk order banner */}
      <div className="bg-accent/20 border-2 border-accent/40 rounded-lg p-3 mb-6 text-center">
        <p className="text-sm font-semibold">
          Min 12 shirts per order — mix designs & sizes.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <ShopFilters
            universities={universities}
            majors={majors}
            onFilterChange={setFilters}
          />
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Shop</h1>
                <p className="text-gray-600">{filteredProducts.length} products</p>
              </div>
              <ProductGrid products={filteredProducts} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
