"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon, X, Filter, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
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

export function AdvancedSearch() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<"all" | "day" | "week" | "month">("all")

  const categories = ["Kue Bolu", "Dessert Box", "Kue Kering", "Kue Basah", "Kue Tradisional", "Cake", "Hampers"]

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) return

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
          const matchesQuery =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())

          const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

          return matchesQuery && matchesPrice && matchesCategory
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
          const matchesQuery =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category)

          // Date filtering
          if (dateRange === "all") return true

          const postDate = new Date(post.date)
          const now = new Date()

          if (dateRange === "day") {
            const yesterday = new Date(now)
            yesterday.setDate(now.getDate() - 1)
            return postDate >= yesterday
          }

          if (dateRange === "week") {
            const lastWeek = new Date(now)
            lastWeek.setDate(now.getDate() - 7)
            return postDate >= lastWeek
          }

          if (dateRange === "month") {
            const lastMonth = new Date(now)
            lastMonth.setMonth(now.getMonth() - 1)
            return postDate >= lastMonth
          }

          return true
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
          const matchesQuery =
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

          // Date filtering
          if (dateRange === "all") return true

          const topicDate = new Date(topic.date)
          const now = new Date()

          if (dateRange === "day") {
            const yesterday = new Date(now)
            yesterday.setDate(now.getDate() - 1)
            return topicDate >= yesterday
          }

          if (dateRange === "week") {
            const lastWeek = new Date(now)
            lastWeek.setDate(now.getDate() - 7)
            return topicDate >= lastWeek
          }

          if (dateRange === "month") {
            const lastMonth = new Date(now)
            lastMonth.setMonth(now.getMonth() - 1)
            return topicDate >= lastMonth
          }

          return true
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
      setIsOpen(true)
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

  const filteredResults = searchResults.filter((result) => {
    if (activeTab === "all") return true
    return result.type === activeTab
  })

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 1000000])
    setSelectedCategories([])
    setDateRange("all")
  }

  return (
    <>
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
            className="absolute right-10 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={handleSearch}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-full">
            <DialogHeader>
              <DialogTitle>Filter Pencarian</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <h3 className="font-medium mb-3">Kategori</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Rentang Harga</h3>
                <Slider value={priceRange} min={0} max={1000000} step={10000} onValueChange={setPriceRange} />
                <div className="flex justify-between text-sm mt-2">
                  <span>Rp {priceRange[0].toLocaleString()}</span>
                  <span>Rp {priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Waktu</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="time-all"
                      name="time-range"
                      checked={dateRange === "all"}
                      onChange={() => setDateRange("all")}
                    />
                    <Label htmlFor="time-all">Semua waktu</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="time-day"
                      name="time-range"
                      checked={dateRange === "day"}
                      onChange={() => setDateRange("day")}
                    />
                    <Label htmlFor="time-day">24 jam terakhir</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="time-week"
                      name="time-range"
                      checked={dateRange === "week"}
                      onChange={() => setDateRange("week")}
                    />
                    <Label htmlFor="time-week">Minggu ini</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="time-month"
                      name="time-range"
                      checked={dateRange === "month"}
                      onChange={() => setDateRange("month")}
                    />
                    <Label htmlFor="time-month">Bulan ini</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={clearFilters}>
                Reset Filter
              </Button>
              <Button onClick={handleSearch}>Terapkan Filter</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-md shadow-lg border overflow-hidden">
          <div className="p-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Semua ({searchResults.length})</TabsTrigger>
                <TabsTrigger value="product">
                  Produk ({searchResults.filter((r) => r.type === "product").length})
                </TabsTrigger>
                <TabsTrigger value="blog">Blog ({searchResults.filter((r) => r.type === "blog").length})</TabsTrigger>
                <TabsTrigger value="forum">
                  Forum ({searchResults.filter((r) => r.type === "forum").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredResults.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">Tidak ada hasil yang ditemukan</div>
                ) : (
                  filteredResults.map((result) => (
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
                            <span className="text-sm font-medium text-orange-600">
                              Rp {result.price.toLocaleString()}
                            </span>
                          )}

                          {result.date && <span className="text-xs text-gray-400">{result.date}</span>}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>

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
    </>
  )
}
