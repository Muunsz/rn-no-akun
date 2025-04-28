import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { CartProvider } from "@/components/cart-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { CheckoutProvider } from "@/components/checkout-provider"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { BackToTop } from "@/components/back-to-top"
import { ErrorBoundary } from "@/components/error-boundary"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { LiveChat } from "@/components/live-chat"
import { PromoNotification } from "@/components/promo-notification"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rasa Nusantara - Kuliner Tradisional Indonesia",
  description:
    "Jelajahi kelezatan kuliner tradisional Indonesia dengan sentuhan modern. Dibuat dengan cinta dan bahan berkualitas.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <CheckoutProvider>
              <ErrorBoundary>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <WhatsAppButton />
                  <BackToTop />
                  <AccessibilityControls />
                  <LiveChat />
                  <PromoNotification />
                </div>
              </ErrorBoundary>
              <Toaster />
            </CheckoutProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
