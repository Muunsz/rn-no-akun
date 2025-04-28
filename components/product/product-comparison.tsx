"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Plus, Star, Check, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/config/products"

interface ProductComparisonProps {
  initialProducts?: Product[]
  maxProducts?: number
}

export function ProductComparison({ initialProducts = [], maxProducts = 3 }: ProductComparisonProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        const { products } = await import("@/config/products")
        setAllProducts(products)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  const addProduct = (productId: string) => {
    const product = allProducts.find((p) => p.id.toString() === productId)
    if (!product) return

    if (products.length >= maxProducts) {
      // Remove the first product if we've reached the maximum
      setProducts([...products.slice(1), product])
    } else {
      setProducts([...products, product])
    }
  }

  const removeProduct = (productId: number) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  const clearComparison = () => {
    setProducts([])
  }

  // Get unique features to compare
  const getComparisonFeatures = () => {
    const features = [
      { key: "price", label: "Harga" },
      { key: "category", label: "Kategori" },
      { key: "weight", label: "Berat" },
      { key: "rating", label: "Rating" },
      { key: "stock", label: "Stok" },
      { key: "isNew", label: "Produk Baru" },
      { key: "isBestSeller", label: "Best Seller" },
      { key: "preOrderDays", label: "Waktu Pre-Order" },
    ]

    return features
  }

  const renderFeatureValue = (product: Product, feature: string) => {
    switch (feature) {
      case "price":
        return `Rp ${product.price.toLocaleString()}`
      case "rating":
        return (
          <div className="flex items-center">
            {product.rating || 0}
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
          </div>
        )
      case "isNew":
        return product.isNew ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Minus className="h-5 w-5 text-gray-300" />
        )
      case "isBestSeller":
        return product.isBestSeller ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Minus className="h-5 w-5 text-gray-300" />
        )
      default:
        return product[feature as keyof Product] || "-"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Bandingkan Produk
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Perbandingan Produk</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Belum ada produk yang dipilih untuk dibandingkan</p>
              <p className="text-sm text-gray-400">Pilih hingga {maxProducts} produk untuk dibandingkan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left border-b"></th>
                    {products.map((product) => (
                      <th key={product.id} className="p-2 border-b min-w-[200px]">
                        <div className="flex flex-col items-center">
                          <div className="relative h-32 w-32 mb-2">
                            <Image
                              src={product.images?.[0] || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover rounded-md"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm hover:bg-gray-100"
                              onClick={() => removeProduct(product.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <Link
                            href={`/product/${product.id}`}
                            className="font-medium text-center hover:text-orange-500"
                          >
                            {product.name}
                          </Link>
                        </div>
                      </th>
                    ))}
                    {products.length < maxProducts && (
                      <th className="p-2 border-b min-w-[200px]">
                        <div className="flex flex-col items-center">
                          <div className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mb-2">
                            <Select onValueChange={addProduct}>
                              <SelectTrigger className="w-[150px] border-none">
                                <SelectValue placeholder="Tambah Produk" />
                              </SelectTrigger>
                              <SelectContent>
                                {allProducts
                                  .filter((p) => !products.some((cp) => cp.id === p.id))
                                  .map((product) => (
                                    <SelectItem key={product.id} value={product.id.toString()}>
                                      {product.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <span className="text-gray-400 text-sm">Pilih produk</span>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {getComparisonFeatures().map((feature) => (
                    <tr key={feature.key} className="border-b">
                      <td className="p-3 font-medium">{feature.label}</td>
                      {products.map((product) => (
                        <td key={`${product.id}-${feature.key}`} className="p-3 text-center">
                          {renderFeatureValue(product, feature.key)}
                        </td>
                      ))}
                      {products.length < maxProducts && <td className="p-3"></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={clearComparison} disabled={products.length === 0}>
              Hapus Semua
            </Button>
            <Button onClick={() => setIsOpen(false)}>Tutup</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
