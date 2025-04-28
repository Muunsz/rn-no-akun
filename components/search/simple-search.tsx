"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  id: number
  type: "product" | "blog" | "forum"
  title: string
  description?: string
  image?: string
  url: string
  category?: string
  price?: number
  date?: string
}

export function SimpleSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) {
      setIsOpen(false)
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a search across different content types

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mock search results
      const results: SearchResult[] = []

      // Products
      const { products } = await import("@/config/products")
      const matchingProducts = products
        .filter((product) => {
          return (
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })
        .slice(0, 5)
        .map((product) => ({
          id: product.id,
          type: "product" as const,
          title: product.name,
          description: product.description,
          image: product.images?.[0],
          url: `/product/${product.id}`,
          category: product.category,
          price: product.price,
        }))

      results.push(...matchingProducts)

      // Blog posts
      const { blogPosts } = await import("@/config/blog")
      const matchingPosts = blogPosts
        .filter((post) => {
          return (
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })
        .slice(0, 3)
        .map((post) => ({
          id: post.id,
          type: "blog" as const,
          title: post.title,
          description: post.excerpt,
          image: post.image,
          url: `/blog/${post.slug}`,
          category: post.category,
          date: post.date,
        }))

      results.push(...matchingPosts)

      // Forum topics
      const { forumTopics } = await import("@/config/forum")
      const matchingTopics = forumTopics
        .filter((topic) => {
          return (
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })
        .slice(0, 3)
        .map((topic) => ({
          id: topic.id,
          type: "forum" as const,
          title: topic.title,
          description: topic.excerpt,
          url: `/forum/${topic.id}`,
          date: topic.date,
        }))

      results.push(...matchingTopics)

      setSearchResults(results)
      setIsOpen(results.length > 0)
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsOpen(false)
  }

  const navigateToResult = (url: string) => {
    router.push(url)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Cari produk, resep, atau topik..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-10"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-md shadow-lg border overflow-hidden">
          <div className="p-4">
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="flex gap-4 p-3 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => navigateToResult(result.url)}
                >
                  {result.image && (
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <img
                        src={result.image || "/placeholder.svg"}
                        alt={result.title}
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {result.type === "product" ? "Produk" : result.type === "blog" ? "Blog" : "Forum"}
                      </Badge>
                      {result.category && (
                        <Badge variant="secondary" className="text-xs">
                          {result.category}
                        </Badge>
                      )}
                    </div>

                    <h4 className="font-medium text-sm line-clamp-1">{result.title}</h4>

                    {result.description && (
                      <p className="text-sm text-gray-500 line-clamp-1 mt-1">{result.description}</p>
                    )}

                    <div className="flex justify-between items-center mt-1">
                      {result.price && (
                        <span className="text-sm font-medium text-orange-600">Rp {result.price.toLocaleString()}</span>
                      )}

                      {result.date && <span className="text-xs text-gray-400">{result.date}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t text-center">
              <Button
                variant="link"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
                  setIsOpen(false)
                }}
              >
                Lihat semua hasil
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
