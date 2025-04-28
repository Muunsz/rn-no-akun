"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/config/products"

interface RecentlyViewedProps {
  currentProductId?: number
  limit?: number
}

export function RecentlyViewed({ currentProductId, limit = 4 }: RecentlyViewedProps) {
  const [products, setProducts] = useState<Product[]>([])
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 200 // Approximate card width + gap
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  useEffect(() => {
    // Load recently viewed products from localStorage
    const loadRecentlyViewed = () => {
      try {
        const recentlyViewedIds = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")

        // Filter out current product if provided
        const filteredIds = currentProductId
          ? recentlyViewedIds.filter((id: number) => id !== currentProductId)
          : recentlyViewedIds

        // Limit to requested number
        const limitedIds = filteredIds.slice(0, limit)

        return limitedIds
      } catch (error) {
        console.error("Error loading recently viewed products:", error)
        return []
      }
    }

    const fetchProducts = async () => {
      try {
        const recentIds = loadRecentlyViewed()

        if (recentIds.length === 0) {
          setProducts([])
          return
        }

        // In a real app, this would be an API call with the IDs
        const { products } = await import("@/config/products")

        // Filter products by IDs and maintain order
        const recentProducts = recentIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[]

        setProducts(recentProducts)
      } catch (error) {
        console.error("Error fetching recently viewed products:", error)
      }
    }

    fetchProducts()
  }, [currentProductId, limit])

  // Add current product to recently viewed
  useEffect(() => {
    if (!currentProductId) return

    try {
      // Get existing recently viewed products
      const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")

      // Remove current product if it exists (to move it to the front)
      const filtered = recentlyViewed.filter((id: number) => id !== currentProductId)

      // Add current product to the front
      const updated = [currentProductId, ...filtered]

      // Limit to 10 products
      const limited = updated.slice(0, 10)

      // Save back to localStorage
      localStorage.setItem("recentlyViewed", JSON.stringify(limited))
    } catch (error) {
      console.error("Error updating recently viewed products:", error)
    }
  }, [currentProductId])

  if (products.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-orange-800 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-orange-500" />
          Produk yang Baru Dilihat
        </h2>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="hidden md:flex" onClick={() => scroll("left")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="hidden md:flex" onClick={() => scroll("right")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product) => (
          <Card
            key={product.id}
            className="min-w-[180px] max-w-[180px] border-none shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative h-32 w-full">
                <Image
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                <p className="text-orange-600 font-bold text-sm mt-1">Rp {product.price.toLocaleString()}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
