import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"

const featuredProducts = [
  {
    id: 1,
    name: "Bolu Pandan Keju",
    description: "Bolu pandan lembut dengan taburan keju yang melimpah",
    price: 85000,
    image: "/placeholder.svg?height=300&width=300",
    category: "bolu",
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 2,
    name: "Dessert Box Oreo",
    description: "Dessert box dengan lapisan oreo, cream cheese, dan coklat",
    price: 95000,
    image: "/placeholder.svg?height=300&width=300",
    category: "dessert-box",
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Bolu Marmer Premium",
    description: "Bolu marmer dengan tekstur lembut dan rasa yang kaya",
    price: 90000,
    image: "/placeholder.svg?height=300&width=300",
    category: "bolu",
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Dessert Box Red Velvet",
    description: "Dessert box red velvet dengan cream cheese yang lezat",
    price: 98000,
    image: "/placeholder.svg?height=300&width=300",
    category: "dessert-box",
    isNew: true,
    isBestSeller: true,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-orange-800">Produk Unggulan</h2>
          <Link href="/products" className="mt-4 md:mt-0 text-orange-500 font-medium hover:text-orange-600">
            Lihat Semua Produk
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="relative h-64 w-full">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
        </Link>
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-orange-500">Baru</Badge>}
          {product.isBestSeller && <Badge className="bg-yellow-500">Best Seller</Badge>}
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 text-orange-800 hover:text-orange-600">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-orange-600 font-bold">Rp {product.price.toLocaleString()}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-orange-500 hover:bg-orange-600">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Tambah ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  )
}
