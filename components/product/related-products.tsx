"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/config/products"

interface RelatedProductsProps {
  currentProductId: number
  category?: string
  subCategory?: string
  limit?: number
  title?: string
}

export function RelatedProducts({
  currentProductId,
  category,
  subCategory,
  limit = 4,
  title = "Produk Terkait",
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // For mobile scrolling
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 320 // Approximate card width + gap
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll import the products from the config
        const { products } = await import("@/config/products")

        // Filter related products
        let relatedProducts = products.filter((product) => {
          // Exclude current product
          if (product.id === currentProductId) return false

          // Match by category and subcategory if available
          if (subCategory && product.subCategory === subCategory) return true
          if (category && product.category === category) return true

          return false
        })

        // If not enough related products, add some random products
        if (relatedProducts.length < limit) {
          const randomProducts = products
            .filter((p) => p.id !== currentProductId && !relatedProducts.some((rp) => rp.id === p.id))
            .sort(() => 0.5 - Math.random())
            .slice(0, limit - relatedProducts.length)

          relatedProducts = [...relatedProducts, ...randomProducts]
        }

        // Limit to requested number
        relatedProducts = relatedProducts.slice(0, limit)

        setProducts(relatedProducts)
      } catch (error) {
        console.error("Error fetching related products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId, category, subCategory, limit])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-orange-800">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-800">{title}</h2>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="hidden md:flex" onClick={() => scroll("left")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="hidden md:flex" onClick={() => scroll("right")}>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link href={`/products${category ? `?category=${category}` : ""}`}>Lihat Semua</Link>
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto pb-4 md:overflow-visible md:pb-0 scrollbar-hide"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="min-w-[250px] md:min-w-0"
            showRating={false}
            showDescription={false}
          />
        ))}
      </div>

      <div className="flex md:hidden justify-center mt-4">
        <Button variant="outline" asChild>
          <Link href={`/products${category ? `?category=${category}` : ""}`}>Lihat Semua</Link>
        </Button>
      </div>
    </div>
  )
}
