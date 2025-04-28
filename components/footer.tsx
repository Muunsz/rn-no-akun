import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-orange-50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Rasa Nusantara Logo" width={40} height={40} className="rounded-full" />
              <span className="text-xl font-bold text-orange-800">Rasa Nusantara</span>
            </div>
            <p className="text-gray-600">
              Menyajikan kue bolu dan dessert premium dengan cita rasa istimewa untuk momen spesial Anda.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-orange-500 hover:text-orange-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-orange-500 hover:text-orange-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-orange-500 hover:text-orange-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-800">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-orange-500">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-orange-500">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-orange-500">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-500">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-orange-500">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-800">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=bolu" className="text-gray-600 hover:text-orange-500">
                  Kue Bolu
                </Link>
              </li>
              <li>
                <Link href="/products?category=dessert-box" className="text-gray-600 hover:text-orange-500">
                  Dessert Box
                </Link>
              </li>
              <li>
                <Link href="/products?category=paket-spesial" className="text-gray-600 hover:text-orange-500">
                  Paket Spesial
                </Link>
              </li>
              <li>
                <Link href="/products?category=kue-ulang-tahun" className="text-gray-600 hover:text-orange-500">
                  Kue Ulang Tahun
                </Link>
              </li>
              <li>
                <Link href="/products?category=hampers" className="text-gray-600 hover:text-orange-500">
                  Hampers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-800">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Jl. Contoh No. 123, Kota, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-600">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-600">info@rasanusantara.com</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-600">cs@rasanusantara.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Rasa Nusantara. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
