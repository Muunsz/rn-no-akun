"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const phoneNumber = "6281234567890" // Ganti dengan nomor WhatsApp bisnis
  const message = "Halo Aloha Saqia, saya ingin bertanya tentang produk Anda"

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg"
    >
      <MessageCircle className="h-6 w-6 text-white" />
      <span className="sr-only">Chat WhatsApp</span>
    </Button>
  )
}
