"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useCheckoutStore as useStore } from "@/lib/checkout-store"

type CheckoutContextType = ReturnType<typeof useStore>

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const store = useStore()

  return <CheckoutContext.Provider value={store}>{children}</CheckoutContext.Provider>
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}
