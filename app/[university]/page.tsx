'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'

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

export default function UniversityPage() {
  const params = useParams()
  const university = (params.university as string)?.toUpperCase() || ''

  const [products, setProducts] = useState<Product[]>([])
  const [majors, setMajors] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [university])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?university=${university}`)
      const data = await response.json()
      setProducts(data)
      const uniqueMajors = Array.from(new Set(data.map((p: Product) => p.major)))
      setMajors(uniqueMajors)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-2">{university} Collection</h1>
      <p className="text-gray-600 mb-8">
        Hand-drawn t-shirts for {university} students
      </p>

      {majors.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shop by Major</h2>
          <div className="flex flex-wrap gap-2">
            {majors.map((major) => (
              <a
                key={major}
                href={`/${university.toLowerCase()}/${major.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-white border-2 border-primary/20 rounded-lg hover:border-primary hover:bg-primary/10 transition-colors"
              >
                {major}
              </a>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products found for {university}.</p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </>
      )}
    </div>
  )
}
