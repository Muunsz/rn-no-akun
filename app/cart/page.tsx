"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, ShoppingBag, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCart } from "@/components/cart-provider"
import { useCheckoutStore } from "@/lib/checkout-store" // Change from @/components/checkout-provider
import { coupons } from "@/config/coupons"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState("")

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = items.length > 0 ? 20000 : 0

  let discount = 0
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discount = Math.round((subtotal * appliedCoupon.value) / 100)
    } else {
      discount = appliedCoupon.value
    }
  }

  const total = subtotal + shipping - discount

  const handleApplyCoupon = () => {
    const coupon = coupons.find((c) => c.code === couponCode.toUpperCase())
    if (!coupon) {
      setCouponError("Kode kupon tidak valid")
      return
    }

    if (subtotal < coupon.minPurchase) {
      setCouponError(`Minimum pembelian Rp${coupon.minPurchase.toLocaleString()} untuk menggunakan kupon ini`)
      return
    }

    setAppliedCoupon(coupon)
    setCouponError("")
  }

  const handleProceedToCheckout = () => {
    if (!items.length) {
      return
    }

    // If there's an applied coupon, save it to the checkout store
    if (appliedCoupon) {
      useCheckoutStore.getState().setAppliedCoupon(appliedCoupon)
    }

    // Navigate to checkout
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto text-orange-500 mb-6" />
          <h1 className="text-2xl font-bold mb-4">Keranjang Anda Kosong</h1>
          <p className="text-gray-600 mb-8">Sepertinya Anda belum menambahkan produk apapun ke keranjang belanja.</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/products">Mulai Belanja</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Keranjang Belanja</h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">Keranjang</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Produk ({items.length})</h2>
              <Button variant="ghost" className="text-gray-500 hover:text-red-500" onClick={clearCart}>
                <Trash className="h-4 w-4 mr-2" />
                Hapus Semua
              </Button>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <Link href={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-orange-600">
                          {item.name}
                        </Link>
                      </div>
                      <div className="text-orange-600 font-bold mt-1 sm:mt-0">Rp {item.price.toLocaleString()}</div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:text-orange-500"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:text-orange-500"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Hapus</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pengiriman</span>
                <span>Rp {shipping.toLocaleString()}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>
                    Diskon (
                    {appliedCoupon.type === "percentage" ? `${appliedCoupon.value}%` : "Rp" + appliedCoupon.value})
                  </span>
                  <span>-Rp {discount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span className="text-orange-600">Rp {total.toLocaleString()}</span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Kode Kupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Lihat Kupon</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Kupon Tersedia</DialogTitle>
                      <DialogDescription>Pilih kupon yang ingin Anda gunakan</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      {coupons.map((coupon) => (
                        <div
                          key={coupon.code}
                          className="p-4 border rounded-lg cursor-pointer hover:border-orange-500"
                          onClick={() => {
                            setCouponCode(coupon.code)
                            // Close dialog
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{coupon.code}</h3>
                              <p className="text-sm text-gray-600">{coupon.description}</p>
                            </div>
                            <div className="text-orange-600 font-semibold">
                              {coupon.type === "percentage" ? `${coupon.value}%` : `Rp${coupon.value.toLocaleString()}`}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            Min. pembelian Rp{coupon.minPurchase.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={handleApplyCoupon} disabled={!couponCode || appliedCoupon}>
                  Terapkan
                </Button>
              </div>

              {couponError && <div className="text-red-500 text-sm">{couponError}</div>}
              {appliedCoupon && (
                <div className="text-green-600 text-sm flex justify-between items-center">
                  <span>Kupon berhasil diterapkan!</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => {
                      setAppliedCoupon(null)
                      setCouponCode("")
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              )}

              <Button
                onClick={handleProceedToCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={!items.length}
              >
                Lanjut ke Pembayaran
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/products">Lanjut Belanja</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
