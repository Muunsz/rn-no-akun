"use client"

import { useEffect } from "react"
import { useNotifications } from "@/lib/notifications"

interface ProductNotificationProps {
  productName: string
  action: "view" | "cart" | "wishlist" | "purchase"
}

export function ProductNotification({ productName, action }: ProductNotificationProps) {
  const { addNotification } = useNotifications()

  useEffect(() => {
    let title = ""
    let message = ""

    switch (action) {
      case "view":
        // Tidak perlu notifikasi untuk melihat produk
        return
      case "cart":
        title = "Produk Ditambahkan ke Keranjang"
        message = `${productName} telah ditambahkan ke keranjang belanja Anda.`
        break
      case "wishlist":
        title = "Produk Ditambahkan ke Wishlist"
        message = `${productName} telah ditambahkan ke wishlist Anda.`
        break
      case "purchase":
        title = "Pembelian Berhasil"
        message = `Terima kasih telah membeli ${productName}. Pesanan Anda sedang diproses.`
        break
    }

    if (title && message) {
      addNotification({
        type: "order",
        title,
        message,
      })
    }
  }, [productName, action, addNotification])

  return null
}
