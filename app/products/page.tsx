"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/config/products"

function MobileFilters({
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  showNew,
  setShowNew,
  showBestSeller,
  setShowBestSeller,
  showInStock,
  setShowInStock,
  priceRange,
  setPriceRange,
}) {
  const currentCategory = categories.find((c) => c.subCategories && c.id === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Mobile filters content - same as desktop but styled for mobile */}
      <div className="space-y-4">
        <h4 className="font-medium">Kategori</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="radio"
                id={`mobile-${category.id}`}
                name="mobile-category"
                checked={selectedCategory === category.id}
                onChange={() => {
                  setSelectedCategory(category.id)
                  setSelectedSubCategory("")
                }}
                className="mr-2 text-orange-500 focus:ring-orange-500"
              />
              <Label htmlFor={`mobile-${category.id}`}>{category.name}</Label>
            </div>
          ))}
        </div>
      </div>

      {currentCategory?.subCategories && (
        <div className="space-y-4">
          <h4 className="font-medium">Sub Kategori</h4>
          <div className="space-y-2">
            {currentCategory.subCategories.map((subCategory) => (
              <div key={subCategory.id} className="flex items-center">
                <input
                  type="radio"
                  id={`mobile-${subCategory.id}`}
                  name="mobile-subcategory"
                  checked={selectedSubCategory === subCategory.id}
                  onChange={() => setSelectedSubCategory(subCategory.id)}
                  className="mr-2 text-orange-500 focus:ring-orange-500"
                />
                <Label htmlFor={`mobile-${subCategory.id}`}>{subCategory.name}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="font-medium">Filter</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="mobile-new" checked={showNew} onCheckedChange={(checked) => setShowNew(checked === true)} />
            <Label htmlFor="mobile-new">Produk Baru</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mobile-best-seller"
              checked={showBestSeller}
              onCheckedChange={(checked) => setShowBestSeller(checked === true)}
            />
            <Label htmlFor="mobile-best-seller">Best Seller</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mobile-in-stock"
              checked={showInStock}
              onCheckedChange={(checked) => setShowInStock(checked === true)}
            />
            <Label htmlFor="mobile-in-stock">Stok Tersedia</Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Rentang Harga</h4>
        <Slider value={priceRange} min={0} max={1000000} step={10000} onValueChange={setPriceRange} />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Rp {priceRange[0].toLocaleString()}</span>
          <span>Rp {priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [showBestSeller, setShowBestSeller] = useState(false)
  const [showInStock, setShowInStock] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortBy, setSortBy] = useState("default")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const currentCategory = categories.find((c) => c.subCategories && c.id === selectedCategory)

  const filteredProducts = products.filter((product) => {
    // Filter by search query
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    // Filter by subcategory
    const matchesSubCategory = !selectedSubCategory || product.subCategory === selectedSubCategory

    // Filter by new
    const matchesNew = !showNew || product.isNew

    // Filter by best seller
    const matchesBestSeller = !showBestSeller || product.isBestSeller

    // Filter by stock
    const matchesStock = !showInStock || product.stock > 0

    // Filter by price range
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSubCategory &&
      matchesNew &&
      matchesBestSeller &&
      matchesStock &&
      matchesPrice
    )
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return a.price - b.price
    } else if (sortBy === "price-high-low") {
      return b.price - a.price
    } else if (sortBy === "rating-high-low") {
      return b.rating - a.rating
    } else if (sortBy === "name-a-z") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "name-z-a") {
      return b.name.localeCompare(a.name)
    }
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Produk Kami</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Produk</SheetTitle>
                <SheetDescription>Sesuaikan pencarian produk Anda</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <MobileFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  setSelectedSubCategory={setSelectedSubCategory}
                  showNew={showNew}
                  setShowNew={setShowNew}
                  showBestSeller={showBestSeller}
                  setShowBestSeller={setShowBestSeller}
                  showInStock={showInStock}
                  setShowInStock={setShowInStock}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Urutan Default</SelectItem>
              <SelectItem value="price-low-high">Harga: Rendah ke Tinggi</SelectItem>
              <SelectItem value="price-high-low">Harga: Tinggi ke Rendah</SelectItem>
              <SelectItem value="rating-high-low">Rating Tertinggi</SelectItem>
              <SelectItem value="name-a-z">Nama: A-Z</SelectItem>
              <SelectItem value="name-z-a">Nama: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block w-1/4 lg:w-1/5 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-4 text-orange-800">Kategori</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    id={category.id}
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => {
                      setSelectedCategory(category.id)
                      setSelectedSubCategory("")
                    }}
                    className="mr-2 text-orange-500 focus:ring-orange-500"
                  />
                  <Label htmlFor={category.id}>{category.name}</Label>
                </div>
              ))}
            </div>
          </div>

          {currentCategory?.subCategories && (
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-lg mb-4 text-orange-800">Sub Kategori</h3>
              <div className="space-y-2">
                {currentCategory.subCategories.map((subCategory) => (
                  <div key={subCategory.id} className="flex items-center">
                    <input
                      type="radio"
                      id={subCategory.id}
                      name="subcategory"
                      checked={selectedSubCategory === subCategory.id}
                      onChange={() => setSelectedSubCategory(subCategory.id)}
                      className="mr-2 text-orange-500 focus:ring-orange-500"
                    />
                    <Label htmlFor={subCategory.id}>{subCategory.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-4 text-orange-800">Filter</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="new" checked={showNew} onCheckedChange={(checked) => setShowNew(checked === true)} />
                <Label htmlFor="new">Produk Baru</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="best-seller"
                  checked={showBestSeller}
                  onCheckedChange={(checked) => setShowBestSeller(checked === true)}
                />
                <Label htmlFor="best-seller">Best Seller</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={showInStock}
                  onCheckedChange={(checked) => setShowInStock(checked === true)}
                />
                <Label htmlFor="in-stock">Stok Tersedia</Label>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-4 text-orange-800">Rentang Harga</h3>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={1000000} step={10000} onValueChange={setPriceRange} />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Rp {priceRange[0].toLocaleString()}</span>
                <span>Rp {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan.</p>
              <Button
                variant="link"
                className="text-orange-500 mt-2"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedSubCategory("")
                  setShowNew(false)
                  setShowBestSeller(false)
                  setShowInStock(false)
                  setPriceRange([0, 1000000])
                }}
              >
                Reset filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
