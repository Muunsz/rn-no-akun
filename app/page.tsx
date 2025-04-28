import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FeaturedProducts from "@/components/featured-products"
import Testimonials from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px]">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Delicious desserts from Aloha Zakia"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Rasa Nusantara</h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
            Jelajahi kelezatan kuliner tradisional Indonesia dengan sentuhan modern
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/products">
                Lihat Menu <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-orange-500 border-orange-500 hover:bg-orange-50"
            >
              <Link href="/about">Tentang Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-800">Kategori Favorit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=200&width=400" alt="Kue Bolu" fill className="object-cover" />
              </div>
              <CardContent className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-orange-800">Kue Bolu</h3>
                <p className="text-gray-600 mb-4">Berbagai pilihan kue bolu lembut dengan cita rasa istimewa</p>
                <Link
                  href="/products?category=bolu"
                  className="text-orange-500 font-medium flex items-center hover:text-orange-600"
                >
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=200&width=400" alt="Dessert Box" fill className="object-cover" />
              </div>
              <CardContent className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-orange-800">Dessert Box</h3>
                <p className="text-gray-600 mb-4">Dessert box premium dengan kombinasi rasa yang menggugah selera</p>
                <Link
                  href="/products?category=dessert-box"
                  className="text-orange-500 font-medium flex items-center hover:text-orange-600"
                >
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=200&width=400" alt="Paket Spesial" fill className="object-cover" />
              </div>
              <CardContent className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-orange-800">Paket Spesial</h3>
                <p className="text-gray-600 mb-4">Paket spesial untuk acara dan momen penting Anda</p>
                <Link
                  href="/products?category=paket-spesial"
                  className="text-orange-500 font-medium flex items-center hover:text-orange-600"
                >
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* How to Order */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-800">Cara Pemesanan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-800">Pilih Produk</h3>
              <p className="text-gray-600">Pilih produk favorit Anda dari berbagai pilihan menu kami</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-800">Masukkan Keranjang</h3>
              <p className="text-gray-600">Tambahkan produk ke keranjang dan atur jumlah sesuai kebutuhan</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-800">Konfirmasi Pesanan</h3>
              <p className="text-gray-600">Isi data diri dan alamat pengiriman dengan lengkap</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-800">Tunggu Pesanan</h3>
              <p className="text-gray-600">Pesanan Anda akan segera disiapkan dan dikirim sesuai jadwal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-yellow-400">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Siap Untuk Memesan?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Nikmati cita rasa autentik kuliner Nusantara untuk momen spesial Anda
          </p>
          <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-orange-50">
            <Link href="/products">Pesan Sekarang</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
