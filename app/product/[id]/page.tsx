"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Heart, Share2, Star, ShoppingCart, Minus, Plus, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"

// Mock product data - in a real app, this would come from an API
const getProductById = (id: string) => {
  // This is a mock function that would normally fetch from an API
  return {
    id: Number.parseInt(id),
    name: "Kue Lapis Legit Premium",
    description:
      "Kue lapis legit premium dengan cita rasa autentik dan tekstur yang lembut. Dibuat dengan bahan-bahan berkualitas tinggi dan resep tradisional yang diwariskan turun-temurun.",
    price: 150000,
    discountPrice: 135000,
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isBestSeller: true,
    stock: 15,
    category: "Kue Tradisional",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600&text=Image+2",
      "/placeholder.svg?height=600&width=600&text=Image+3",
      "/placeholder.svg?height=600&width=600&text=Image+4",
    ],
    details: {
      ingredients: "Tepung terigu, telur ayam, gula pasir, mentega, susu, vanili, kayu manis, cengkeh",
      weight: "750 gram",
      dimensions: "20 x 20 x 5 cm",
      storage: "Simpan di tempat sejuk dan kering. Setelah dibuka, simpan dalam kulkas dan konsumsi dalam 5 hari.",
      shelfLife: "7 hari dalam suhu ruangan, 14 hari dalam kulkas",
      allergens: "Mengandung gluten, susu, dan telur",
    },
    reviews: [
      {
        id: 1,
        user: "Budi Santoso",
        rating: 5,
        date: "2023-12-15",
        comment: "Rasanya luar biasa! Teksturnya lembut dan aromanya menggugah selera. Akan beli lagi.",
        helpful: 12,
      },
      {
        id: 2,
        user: "Siti Aminah",
        rating: 4,
        date: "2023-12-10",
        comment: "Kue lapis yang enak, tapi pengirimannya agak lama.",
        helpful: 5,
      },
      {
        id: 3,
        user: "Dian Purnama",
        rating: 5,
        date: "2023-12-05",
        comment: "Sempurna untuk acara keluarga. Semua orang menyukainya!",
        helpful: 8,
      },
    ],
  }
}

// Mock related products
const relatedProducts = [
  {
    id: 101,
    name: "Kue Lapis Surabaya",
    price: 120000,
    image: "/placeholder.svg?height=300&width=300&text=Lapis+Surabaya",
    rating: 4.5,
  },
  {
    id: 102,
    name: "Bolu Pandan",
    price: 85000,
    image: "/placeholder.svg?height=300&width=300&text=Bolu+Pandan",
    rating: 4.3,
  },
  {
    id: 103,
    name: "Nastar Nanas",
    price: 95000,
    image: "/placeholder.svg?height=300&width=300&text=Nastar",
    rating: 4.7,
  },
  {
    id: 104,
    name: "Kue Putri Salju",
    price: 90000,
    image: "/placeholder.svg?height=300&width=300&text=Putri+Salju",
    rating: 4.6,
  },
]

// Mock frequently bought together products
const frequentlyBoughtTogether = [
  {
    id: 201,
    name: "Teh Melati Premium",
    price: 45000,
    image: "/placeholder.svg?height=200&width=200&text=Teh+Melati",
    rating: 4.4,
  },
  {
    id: 202,
    name: "Kopi Tubruk Tradisional",
    price: 55000,
    image: "/placeholder.svg?height=200&width=200&text=Kopi+Tubruk",
    rating: 4.6,
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [inWishlist, setInWishlist] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    const fetchProduct = async () => {
      try {
        // In a real app, this would be an API call
        const productData = getProductById(params.id)
        setProduct(productData)
        setInWishlist(isInWishlist(productData.id))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, isInWishlist])

  const handleQuantityChange = (value: number) => {
    if (value < 1) return
    if (product && value > product.stock) return
    setQuantity(value)
  }

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity,
    })

    toast({
      title: "Ditambahkan ke keranjang",
      description: `${quantity} x ${product.name} telah ditambahkan ke keranjang`,
    })
  }

  const handleToggleWishlist = () => {
    if (!product) return

    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
    })

    setInWishlist(!inWishlist)

    toast({
      title: inWishlist ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist",
      description: inWishlist
        ? `${product.name} telah dihapus dari wishlist Anda`
        : `${product.name} telah ditambahkan ke wishlist Anda`,
    })
  }

  const handleARView = () => {
    toast({
      title: "AR Preview",
      description: "Fitur AR Preview akan segera tersedia",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
        <p className="mb-8">Maaf, produk yang Anda cari tidak tersedia.</p>
        <Button onClick={() => router.push("/products")}>Kembali ke Katalog</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-orange-500">
          Produk
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/products?category=${product.category}`} className="hover:text-orange-500">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
            />
            {product.isNew && <Badge className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600">Baru</Badge>}
            {product.isBestSeller && (
              <Badge className="absolute top-4 left-20 bg-orange-500 hover:bg-orange-600">Best Seller</Badge>
            )}
            {product.discountPrice && (
              <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image: string, index: number) => (
              <div
                key={index}
                className={`relative h-20 w-20 rounded-md overflow-hidden border cursor-pointer transition-all ${
                  selectedImage === index
                    ? "border-orange-500 ring-2 ring-orange-500"
                    : "border-gray-200 hover:border-orange-300"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} ulasan)
                </span>
              </div>
              <span className="text-sm text-gray-500">Kategori: {product.category}</span>
            </div>
          </div>

          <div className="space-y-1">
            {product.discountPrice ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-orange-600">
                    Rp {product.discountPrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">Rp {product.price.toLocaleString()}</span>
                </div>
                <p className="text-green-600 text-sm">
                  Hemat Rp {(product.price - product.discountPrice).toLocaleString()} (
                  {Math.round((1 - product.discountPrice / product.price) * 100)}%)
                </p>
              </>
            ) : (
              <span className="text-2xl font-bold text-orange-600">Rp {product.price.toLocaleString()}</span>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"}`}
              ></div>
              <span className="font-medium">
                {product.stock > 10
                  ? "Stok Tersedia"
                  : product.stock > 0
                    ? `Stok Terbatas (${product.stock} tersisa)`
                    : "Stok Habis"}
              </span>
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Jumlah:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Tambah ke Keranjang
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 ${inWishlist ? "text-red-500 border-red-500 hover:bg-red-50" : ""}`}
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500" : ""}`} />
              </Button>

              <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleARView}>
                <Eye className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12"
                onClick={() => {
                  toast({
                    title: "Bagikan",
                    description: "Fitur berbagi akan segera tersedia",
                  })
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b">
            <TabsTrigger value="description" className="flex-1">
              Deskripsi
            </TabsTrigger>
            <TabsTrigger value="information" className="flex-1">
              Informasi
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              Ulasan ({product.reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Kue Lapis Legit adalah salah satu kue tradisional Indonesia yang terkenal dengan lapisan-lapisannya yang
                tipis dan aroma rempah yang khas. Kue ini memiliki sejarah panjang yang berasal dari pengaruh kolonial
                Belanda di Indonesia.
              </p>
              <p>
                Proses pembuatan Kue Lapis Legit kami sangat teliti dan memakan waktu. Setiap lapisan dipanggang satu
                per satu untuk menciptakan tekstur yang sempurna. Rasa manis yang pas dipadukan dengan aroma rempah
                seperti kayu manis dan cengkeh memberikan pengalaman kuliner yang tak terlupakan.
              </p>
              <p>
                Kue Lapis Legit Premium kami cocok untuk berbagai acara, mulai dari arisan, pertemuan keluarga, hingga
                hadiah spesial untuk orang tersayang. Nikmati dengan secangkir teh atau kopi untuk pengalaman terbaik.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="information" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Spesifikasi Produk</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 text-gray-600">Bahan</td>
                      <td className="py-3 font-medium">{product.details.ingredients}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 text-gray-600">Berat</td>
                      <td className="py-3 font-medium">{product.details.weight}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 text-gray-600">Dimensi</td>
                      <td className="py-3 font-medium">{product.details.dimensions}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 text-gray-600">Masa Simpan</td>
                      <td className="py-3 font-medium">{product.details.shelfLife}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">Alergen</td>
                      <td className="py-3 font-medium">{product.details.allergens}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Cara Penyimpanan</h3>
                <p className="text-gray-700 mb-4">{product.details.storage}</p>

                <h3 className="text-lg font-semibold mb-4">Pengiriman</h3>
                <p className="text-gray-700 mb-4">
                  Produk ini dikirim dalam kemasan khusus untuk menjaga kualitas dan kesegaran. Kami menggunakan ice
                  pack untuk pengiriman jarak jauh dan menyarankan pengiriman same-day atau next-day untuk hasil
                  terbaik.
                </p>

                <h3 className="text-lg font-semibold mb-4">Sertifikasi</h3>
                <div className="flex space-x-4">
                  <Badge variant="outline" className="px-3 py-1">
                    Halal
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    BPOM
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    ISO 22000
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-600 mb-2">{product.rating}</div>
                    <div className="flex justify-center mb-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < product.rating
                                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                                  : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <p className="text-gray-600">{product.reviewCount} ulasan</p>
                  </div>

                  <div className="mt-6 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = product.reviews.filter((r: any) => r.rating === star).length
                      const percentage = (count / product.reviews.length) * 100

                      return (
                        <div key={star} className="flex items-center">
                          <span className="w-8 text-sm text-gray-600">{star}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="w-12 text-right text-sm text-gray-600">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                  {product.reviews.map((review: any) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{review.user}</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <div className="flex items-center text-sm">
                        <Button variant="ghost" size="sm" className="h-8 text-gray-500">
                          {review.helpful} orang menganggap ini membantu
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Frequently Bought Together */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Sering Dibeli Bersamaan</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 mb-4">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium text-center">{product.name}</h3>
              <p className="text-orange-600 font-medium">
                Rp {(product.discountPrice || product.price).toLocaleString()}
              </p>
            </div>

            {frequentlyBoughtTogether.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <div className="relative h-40 w-40 mb-4">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                </div>
                <h3 className="font-medium text-center">{item.name}</h3>
                <p className="text-orange-600 font-medium">Rp {item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-600">Harga total:</p>
                <p className="text-2xl font-bold text-orange-600">
                  Rp{" "}
                  {(
                    (product.discountPrice || product.price) +
                    frequentlyBoughtTogether.reduce((sum, item) => sum + item.price, 0)
                  ).toLocaleString()}
                </p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Tambah Semua ke Keranjang
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className="group">
              <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium group-hover:text-orange-500 transition-colors">{item.name}</h3>
              <div className="flex items-center mt-1 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(item.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                <span className="text-xs text-gray-500 ml-1">{item.rating}</span>
              </div>
              <p className="text-orange-600 font-medium">Rp {item.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
