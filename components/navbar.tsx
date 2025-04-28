"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { SimpleSearch } from "@/components/search/simple-search"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { items } = useCart()

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-orange-800">Rasa Nusantara</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium ${isActive("/") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
            >
              Beranda
            </Link>
            <Link
              href="/products"
              className={`font-medium ${isActive("/products") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
            >
              Produk
            </Link>
            <Link
              href="/blog"
              className={`font-medium ${isActive("/blog") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
            >
              Blog
            </Link>
            <Link
              href="/forum"
              className={`font-medium ${isActive("/forum") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
            >
              Forum
            </Link>
            <Link
              href="/about"
              className={`font-medium ${isActive("/about") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
            >
              Tentang Kami
            </Link>
            <Link
              href="/contact"
              className={`font-medium ${isActive("/contact") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
            >
              Kontak
            </Link>
          </nav>

          <div className="hidden md:block w-64">
            <SimpleSearch />
          </div>

          <div className="flex items-center space-x-4">
            <NotificationDropdown />

            <Link href="/cart" className="relative">
              <ShoppingCart
                className={`h-6 w-6 ${isActive("/cart") ? "text-orange-500" : "text-gray-700 hover:text-orange-500"}`}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-orange-800">Rasa Nusantara</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <div className="p-4">
            <SimpleSearch />
          </div>

          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className={`py-2 font-medium ${isActive("/") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              href="/products"
              className={`py-2 font-medium ${isActive("/products") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Produk
            </Link>
            <Link
              href="/blog"
              className={`py-2 font-medium ${isActive("/blog") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/forum"
              className={`py-2 font-medium ${isActive("/forum") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Forum
            </Link>
            <Link
              href="/about"
              className={`py-2 font-medium ${isActive("/about") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            <Link
              href="/contact"
              className={`py-2 font-medium ${isActive("/contact") ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
