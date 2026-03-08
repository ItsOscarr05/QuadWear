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

export default function MajorCollectionPage() {
  const params = useParams()
  const university = (params.university as string)?.toUpperCase() || ''
  const major = (params.major as string)
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || ''

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [university, major])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?university=${university}&major=${major}`)
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-2">
        Shop {major} at {university}
      </h1>
      <p className="text-gray-600 mb-8">
        Hand-drawn designs celebrating {major} students at {university}
      </p>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products found for this collection.</p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </>
      )}
    </div>
  )
}
