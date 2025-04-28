"use client"

import { useEffect } from "react"
import { useNotifications } from "@/lib/notifications"

// Komponen untuk menampilkan notifikasi promo secara otomatis
export function PromoNotification() {
  const { addNotification } = useNotifications()

  useEffect(() => {
    // Tambahkan notifikasi promo setelah beberapa detik
    const timer = setTimeout(() => {
      addNotification({
        type: "promo",
        title: "Promo Spesial Minggu Ini!",
        message: "Dapatkan diskon 15% untuk semua produk dengan kode NUSANTARA15. Berlaku hingga akhir minggu.",
      })
    }, 30000) // Tampilkan setelah 30 detik

    return () => clearTimeout(timer)
  }, [addNotification])

  return null
}
