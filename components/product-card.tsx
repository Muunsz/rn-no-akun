"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: any
  className?: string
  showRating?: boolean
  showDescription?: boolean
}

export function ProductCard({ product, className, showRating = true, showDescription = true }: ProductCardProps) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    })
  }

  return (
    <Card className={cn("overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow group", className)}>
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-orange-500">Baru</Badge>}
          {product.isBestSeller && <Badge className="bg-yellow-500">Best Seller</Badge>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white",
            isWishlisted && "text-red-500 hover:text-red-600",
          )}
          onClick={() => toggleWishlist(product)}
        >
          <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 text-orange-800 hover:text-orange-600">{product.name}</h3>
        </Link>
        {showDescription && <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>}
        {showRating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating.toFixed(1)})</span>
            <span className="text-sm text-gray-500">· {product.reviewCount} ulasan</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <p className="text-orange-600 font-bold">Rp {product.price.toLocaleString()}</p>
          {product.stock < 5 && product.stock > 0 && (
            <Badge variant="secondary" className="text-orange-600">
              Sisa {product.stock}
            </Badge>
          )}
          {product.stock === 0 && <Badge variant="destructive">Habis</Badge>}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
        </Button>
      </CardFooter>
    </Card>
  )
}
