"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { useCheckoutStore } from "@/lib/checkout-store"

const paymentMethods = [
  {
    id: "bank-transfer",
    name: "Transfer Bank",
    description: "Transfer melalui bank pilihan Anda",
    banks: [
      { id: "bca", name: "BCA", accountNumber: "1234567890" },
      { id: "mandiri", name: "Mandiri", accountNumber: "0987654321" },
      { id: "bni", name: "BNI", accountNumber: "1122334455" },
    ],
  },
  {
    id: "e-wallet",
    name: "E-Wallet",
    description: "Bayar menggunakan dompet digital",
    wallets: [
      { id: "gopay", name: "GoPay" },
      { id: "ovo", name: "OVO" },
      { id: "dana", name: "DANA" },
    ],
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Bayar saat pesanan diterima",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, clearCart } = useCart()
  const {
    shippingInfo,
    setShippingInfo,
    appliedCoupon,
    paymentMethod,
    setPaymentMethod,
    isShippingComplete,
    clearCheckout,
  } = useCheckoutStore()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethod.type)
  const [selectedBank, setSelectedBank] = useState(paymentMethod.bank || "")
  const [selectedWallet, setSelectedWallet] = useState(paymentMethod.wallet || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if cart is empty
  useEffect(() => {
    if (!items.length) {
      router.push("/cart")
    }
  }, [items, router])

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 20000

  let discount = 0
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discount = Math.round((subtotal * appliedCoupon.value) / 100)
    } else {
      discount = appliedCoupon.value
    }
  }

  const total = subtotal + shipping - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isShippingComplete()) {
      toast({
        title: "Informasi Tidak Lengkap",
        description: "Mohon lengkapi informasi pengiriman",
        variant: "destructive",
      })
      return
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Metode Pembayaran",
        description: "Mohon pilih metode pembayaran",
        variant: "destructive",
      })
      return
    }

    if (selectedPaymentMethod === "bank-transfer" && !selectedBank) {
      toast({
        title: "Bank Belum Dipilih",
        description: "Mohon pilih bank untuk transfer",
        variant: "destructive",
      })
      return
    }

    if (selectedPaymentMethod === "e-wallet" && !selectedWallet) {
      toast({
        title: "E-Wallet Belum Dipilih",
        description: "Mohon pilih e-wallet untuk pembayaran",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Save payment method
      setPaymentMethod({
        type: selectedPaymentMethod,
        bank: selectedBank,
        wallet: selectedWallet,
      })

      // Simulate order submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and checkout data
      clearCart()
      clearCheckout()

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses pesanan",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Checkout</h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/cart" className="hover:text-orange-500">
          Keranjang
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Informasi Pengiriman</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Penerima</Label>
                  <Input
                    id="name"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap</Label>
                <Textarea
                  id="address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Kota</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Kode Pos</Label>
                  <Input
                    id="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Textarea
                  id="notes"
                  value={shippingInfo.notes}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, notes: e.target.value })}
                  placeholder="Tambahkan catatan untuk pesanan Anda"
                />
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Metode Pembayaran</h2>
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="font-medium">
                        {method.name}
                      </Label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 ml-6">{method.description}</p>

                    {selectedPaymentMethod === "bank-transfer" && method.id === "bank-transfer" && (
                      <div className="mt-4 ml-6 space-y-3">
                        {method.banks.map((bank) => (
                          <div key={bank.id} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={bank.id}
                              name="bank"
                              value={bank.id}
                              checked={selectedBank === bank.id}
                              onChange={(e) => setSelectedBank(e.target.value)}
                              className="text-orange-500 focus:ring-orange-500"
                            />
                            <Label htmlFor={bank.id}>
                              {bank.name} - {bank.accountNumber}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedPaymentMethod === "e-wallet" && method.id === "e-wallet" && (
                      <div className="mt-4 ml-6 space-y-3">
                        {method.wallets.map((wallet) => (
                          <div key={wallet.id} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={wallet.id}
                              name="wallet"
                              value={wallet.id}
                              checked={selectedWallet === wallet.id}
                              onChange={(e) => setSelectedWallet(e.target.value)}
                              className="text-orange-500 focus:ring-orange-500"
                            />
                            <Label htmlFor={wallet.id}>{wallet.name}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rp {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pengiriman</span>
                <span>Rp {shipping.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Diskon</span>
                  <span className="text-green-600">-Rp {discount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span className="text-orange-600">Rp {total.toLocaleString()}</span>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
              {isSubmitting ? "Memproses..." : "Buat Pesanan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
