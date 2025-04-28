import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Tentang Kami</h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">Tentang Kami</span>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
        <Image src="/placeholder.svg?height=400&width=1200" alt="Aloha Zakia Team" fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rasa Nusantara</h2>
            <p className="text-lg md:text-xl max-w-2xl">
              Melestarikan cita rasa kuliner Nusantara dengan sentuhan modern sejak 2018
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Cerita Kami</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Rasa Nusantara berawal dari dapur kecil dengan visi untuk melestarikan dan memperkenalkan kekayaan kuliner
              Indonesia. Berawal dari hobi memasak makanan tradisional untuk keluarga dan teman-teman, kami mulai
              menerima pesanan untuk berbagai acara.
            </p>
            <p>
              Dengan resep turun-temurun dan sentuhan inovasi modern, hidangan kami semakin dikenal dan diminati oleh
              banyak orang. Permintaan yang terus meningkat mendorong kami untuk mengembangkan usaha ini menjadi lebih
              profesional.
            </p>
            <p>
              Pada tahun 2020, Rasa Nusantara resmi berdiri sebagai brand yang fokus pada pembuatan kuliner tradisional
              Indonesia dengan sentuhan modern. Nama "Rasa Nusantara" dipilih sebagai representasi kekayaan cita rasa
              kuliner Indonesia yang kami sajikan.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=600" alt="Founder Aloha Zakia" fill className="object-cover" />
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-orange-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-orange-800 mb-8 text-center">Nilai-Nilai Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-orange-800">Kualitas</h3>
            <p className="text-gray-600">
              Kami berkomitmen untuk selalu menggunakan bahan-bahan berkualitas terbaik dan menjaga standar produksi
              yang tinggi untuk setiap produk kami.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-orange-800">Kepuasan Pelanggan</h3>
            <p className="text-gray-600">
              Kepuasan pelanggan adalah prioritas utama kami. Kami selalu berusaha memberikan pengalaman terbaik dan
              produk yang sesuai dengan harapan pelanggan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-orange-800">Inovasi</h3>
            <p className="text-gray-600">
              Kami terus berinovasi untuk mengembangkan produk-produk baru yang unik dan menarik, sambil tetap
              mempertahankan cita rasa khas Aloha Zakia.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-orange-800 mb-8 text-center">Tim Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
              <Image src="/placeholder.svg?height=300&width=300" alt="Saqia Rahmawati" fill className="object-cover" />
            </div>
            <h3 className="font-semibold text-lg text-orange-800">Saqia Rahmawati</h3>
            <p className="text-gray-600">Founder & Head Baker</p>
          </div>

          <div className="text-center">
            <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
              <Image src="/placeholder.svg?height=300&width=300" alt="Budi Santoso" fill className="object-cover" />
            </div>
            <h3 className="font-semibold text-lg text-orange-800">Budi Santoso</h3>
            <p className="text-gray-600">Operations Manager</p>
          </div>

          <div className="text-center">
            <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
              <Image src="/placeholder.svg?height=300&width=300" alt="Anisa Putri" fill className="object-cover" />
            </div>
            <h3 className="font-semibold text-lg text-orange-800">Anisa Putri</h3>
            <p className="text-gray-600">Pastry Chef</p>
          </div>

          <div className="text-center">
            <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
              <Image src="/placeholder.svg?height=300&width=300" alt="Dimas Pratama" fill className="object-cover" />
            </div>
            <h3 className="font-semibold text-lg text-orange-800">Dimas Pratama</h3>
            <p className="text-gray-600">Marketing Manager</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Siap Untuk Memesan?</h2>
        <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
          Nikmati kelezatan kue dan dessert dari Aloha Zakia untuk momen spesial Anda
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-orange-50">
            <Link href="/products">Lihat Produk</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-orange-600">
            <Link href="/contact">Hubungi Kami</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
