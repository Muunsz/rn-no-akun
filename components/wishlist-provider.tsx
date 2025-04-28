"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type WishlistItem = {
  id: number
  name: string
  price: number
  image: string
}

type WishlistContextType = {
  items: WishlistItem[]
  toggleWishlist: (item: WishlistItem) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const toggleWishlist = (newItem: WishlistItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        // Remove item if it exists
        return prevItems.filter((item) => item.id !== newItem.id)
      } else {
        // Add item if it doesn't exist
        return [...prevItems, newItem]
      }
    })
  }

  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id)
  }

  const clearWishlist = () => {
    setItems([])
  }

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
