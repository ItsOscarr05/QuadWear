'use client'

import { useState } from 'react'

interface ShopFiltersProps {
  universities: string[]
  majors: string[]
  onFilterChange: (filters: FilterState) => void
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

export default function ShopFilters({ universities, majors, onFilterChange }: ShopFiltersProps) {
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

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-primary/20">
      <h3 className="font-bold text-lg mb-4">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">University</label>
          <select
            value={filters.university}
            onChange={(e) => updateFilter('university', e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">All Universities</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Major</label>
          <input
            type="text"
            placeholder="Search majors..."
            value={filters.major}
            onChange={(e) => updateFilter('major', e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {majors
              .filter((m) => m.toLowerCase().includes(filters.major.toLowerCase()))
              .slice(0, 5)
              .map((major) => (
                <button
                  key={major}
                  onClick={() => updateFilter('major', major)}
                  className={`px-3 py-1 rounded-full text-sm border-2 transition-colors ${
                    filters.major === major
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {major}
                </button>
              ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Size</label>
          <select
            value={filters.size}
            onChange={(e) => updateFilter('size', e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">All Sizes</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
            <option value="XXL">2X Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">In stock only</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
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
