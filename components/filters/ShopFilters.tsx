'use client'

import { useState } from 'react'

interface ShopFiltersProps {
  universities: string[]
  majors: string[]
  onFilterChange: (filters: FilterState) => void
  horizontal?: boolean
}

export interface FilterState {
  university: string
  major: string
  size: string
  minPrice: string
  maxPrice: string
  inStockOnly: boolean
  sortBy: string
}

export default function ShopFilters({ universities, majors, onFilterChange, horizontal = false }: ShopFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    university: '',
    major: '',
    size: '',
    minPrice: '',
    maxPrice: '',
    inStockOnly: false,
    sortBy: 'new',
  })

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const formatPrice = (value: string): string => {
    if (!value) return ''
    const num = parseFloat(value)
    if (isNaN(num)) return value
    return num.toFixed(2)
  }

  const handlePriceChange = (key: 'minPrice' | 'maxPrice', value: string) => {
    // Allow empty, numbers, and decimals
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      updateFilter(key, value)
    }
  }

  const handlePriceBlur = (key: 'minPrice' | 'maxPrice') => {
    const value = filters[key]
    if (value && !isNaN(parseFloat(value))) {
      updateFilter(key, formatPrice(value))
    }
  }

  if (horizontal) {
    return (
      <div>
        <h3 className="font-bold text-lg mb-4 text-black">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
          {/* Row 1, Column 1: University */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-black">University</label>
            <select
              value={filters.university}
              onChange={(e) => updateFilter('university', e.target.value)}
              className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
            >
              <option value="">All Universities</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
          </div>

          {/* Row 1, Column 2: Size */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-black">Size</label>
            <select
              value={filters.size}
              onChange={(e) => updateFilter('size', e.target.value)}
              className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
            >
              <option value="">All Sizes</option>
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
              <option value="XXL">2X Large (XXL)</option>
            </select>
          </div>

          {/* Row 1, Column 3: Sort By */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-black">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
            >
              <option value="new">Newest</option>
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Row 2, Column 1: Major */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-black">Major</label>
            <select
              value={filters.major}
              onChange={(e) => updateFilter('major', e.target.value)}
              className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
            >
              <option value="">All Majors</option>
              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          {/* Row 2, Column 2: Price Range */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-black">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                onBlur={() => handlePriceBlur('minPrice')}
                className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                onBlur={() => handlePriceBlur('maxPrice')}
                className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Row 2, Column 3: In Stock Only */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer w-full">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                className="w-5 h-5 border-4 border-black rounded cursor-pointer"
              />
              <span className="text-sm font-semibold text-black">In stock only</span>
            </label>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-sticker">
      <h3 className="font-bold text-lg mb-4 text-black">Filters</h3>

      <div className="space-y-4">
        {/* University Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-black">University</label>
          <select
            value={filters.university}
            onChange={(e) => updateFilter('university', e.target.value)}
            className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
          >
            <option value="">All Universities</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        {/* Major Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-black">Major</label>
          <select
            value={filters.major}
            onChange={(e) => updateFilter('major', e.target.value)}
            className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
          >
            <option value="">All Majors</option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-black">Size</label>
          <select
            value={filters.size}
            onChange={(e) => updateFilter('size', e.target.value)}
            className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
          >
            <option value="">All Sizes</option>
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
            <option value="XXL">2X Large (XXL)</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-black">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              onBlur={() => handlePriceBlur('minPrice')}
              className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              onBlur={() => handlePriceBlur('maxPrice')}
              className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* In Stock Only */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
              className="w-5 h-5 border-4 border-black rounded cursor-pointer"
            />
            <span className="text-sm font-semibold text-black">In stock only</span>
          </label>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-black">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full border-4 border-black rounded-lg px-3 py-2 bg-white text-black font-semibold focus:outline-none focus:border-primary"
          >
            <option value="new">Newest</option>
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
