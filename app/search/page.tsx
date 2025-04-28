"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (query: string) => {
    if (!query.trim()) return

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
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
          )
        })
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
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase())
          )
        })
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
            topic.title.toLowerCase().includes(query.toLowerCase()) ||
            topic.excerpt.toLowerCase().includes(query.toLowerCase())
          )
        })
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
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)
  }

  const filteredResults = searchResults.filter((result) => {
    if (activeTab === "all") return true
    return result.type === activeTab
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Hasil Pencarian</h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">Pencarian</span>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Cari produk, resep, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2">
            Cari
          </Button>
        </div>
      </form>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Mencari...</p>
        </div>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {searchResults.length} hasil untuk "{initialQuery}"
                </h2>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">Semua ({searchResults.length})</TabsTrigger>
                  <TabsTrigger value="product">
                    Produk ({searchResults.filter((r) => r.type === "product").length})
                  </TabsTrigger>
                  <TabsTrigger value="blog">Blog ({searchResults.filter((r) => r.type === "blog").length})</TabsTrigger>
                  <TabsTrigger value="forum">
                    Forum ({searchResults.filter((r) => r.type === "forum").length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  <div className="space-y-6">
                    {filteredResults.map((result) => (
                      <div
                        key={`${result.type}-${result.id}`}
                        className="flex gap-6 p-4 border rounded-lg hover:border-orange-200 hover:bg-orange-50 transition-colors"
                      >
                        {result.image && (
                          <div className="relative h-24 w-24 flex-shrink-0">
                            <Image
                              src={result.image || "/placeholder.svg"}
                              alt={result.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">
                              {result.type === "product" ? "Produk" : result.type === "blog" ? "Blog" : "Forum"}
                            </Badge>
                            {result.category && <Badge variant="secondary">{result.category}</Badge>}
                          </div>

                          <Link href={result.url} className="hover:text-orange-500">
                            <h3 className="text-lg font-medium mb-1">{result.title}</h3>
                          </Link>

                          {result.description && (
                            <p className="text-gray-600 mb-2 line-clamp-2">{result.description}</p>
                          )}

                          <div className="flex justify-between items-center mt-2">
                            {result.price && (
                              <span className="font-medium text-orange-600">Rp {result.price.toLocaleString()}</span>
                            )}

                            {result.date && <span className="text-sm text-gray-400">{result.date}</span>}

                            <Button asChild variant="outline" size="sm">
                              <Link href={result.url}>Lihat Detail</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            initialQuery && (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">Tidak ada hasil untuk "{initialQuery}"</h2>
                <p className="text-gray-500 mb-6">Coba kata kunci lain atau periksa ejaan Anda</p>
                <Button asChild>
                  <Link href="/products">Lihat Semua Produk</Link>
                </Button>
              </div>
            )
          )}
        </>
      )}
    </div>
  )
}
