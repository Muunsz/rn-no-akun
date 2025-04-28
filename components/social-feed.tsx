"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Instagram } from "lucide-react"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock social media posts
const mockInstagramPosts = [
  {
    id: "1",
    image: "/placeholder.svg?height=600&width=600",
    caption:
      "Bolu pandan keju spesial untuk acara keluarga. Dibuat dengan bahan berkualitas dan penuh cinta ❤️ #RasaNusantara #BoluPandan",
    likes: 124,
    comments: 23,
    date: "2 hari yang lalu",
  },
  {
    id: "2",
    image: "/placeholder.svg?height=600&width=600",
    caption:
      "Dessert box red velvet yang creamy dan lezat, cocok untuk hadiah orang tersayang 🎁 #RasaNusantara #DessertBox #RedVelvet",
    likes: 98,
    comments: 15,
    date: "5 hari yang lalu",
  },
  {
    id: "3",
    image: "/placeholder.svg?height=600&width=600",
    caption:
      "Workshop pembuatan kue tradisional bersama Chef Rina. Terima kasih untuk semua peserta yang telah hadir! 👨‍🍳👩‍🍳 #RasaNusantara #Workshop #KueTraditional",
    likes: 156,
    comments: 32,
    date: "1 minggu yang lalu",
  },
  {
    id: "4",
    image: "/placeholder.svg?height=600&width=600",
    caption:
      "Hampers lebaran sudah bisa dipesan sekarang! Dapatkan diskon early bird 15% untuk pemesanan sebelum 1 bulan lebaran 🎉 #RasaNusantara #Hampers #Lebaran",
    likes: 87,
    comments: 19,
    date: "1 minggu yang lalu",
  },
]

interface SocialFeedProps {
  platform?: "instagram" | "facebook" | "twitter"
  username?: string
  limit?: number
  showHeader?: boolean
}

export function SocialFeed({
  platform = "instagram",
  username = "rasanusantara",
  limit = 4,
  showHeader = true,
}: SocialFeedProps) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, we would fetch posts from the social media API
    // For now, we'll use mock data
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Use mock data
        setPosts(mockInstagramPosts.slice(0, limit))
        setError(null)
      } catch (err) {
        setError("Failed to load social media posts")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [limit])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-md"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Instagram className="h-5 w-5 text-pink-500" />
            <h3 className="font-bold">@{username}</h3>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={`https://instagram.com/${username}`} target="_blank" rel="noopener noreferrer">
              Follow
            </a>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square">
              <Image src={post.image || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
            </div>
            <CardFooter className="p-2 text-xs text-gray-500 flex justify-between">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                <span>{post.comments}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" asChild>
          <a href={`https://instagram.com/${username}`} target="_blank" rel="noopener noreferrer">
            Lihat Semua Post
          </a>
        </Button>
      </div>
    </div>
  )
}
