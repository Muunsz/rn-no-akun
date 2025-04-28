import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/config/blog"

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Blog Rasa Nusantara</h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">Blog</span>
      </div>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="text-sm text-orange-500 mb-2">{blogPosts[0].category}</div>
                <CardTitle className="text-2xl md:text-3xl mb-4">{blogPosts[0].title}</CardTitle>
                <CardDescription className="mb-6 line-clamp-3">{blogPosts[0].excerpt}</CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={blogPosts[0].author.avatar || "/placeholder.svg"}
                        alt={blogPosts[0].author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{blogPosts[0].author.name}</div>
                      <div className="text-sm text-gray-500">{blogPosts[0].date}</div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${blogPosts[0].slug}`}>Baca Selengkapnya</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Blog Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant="outline" className="rounded-full">
          Semua
        </Button>
        <Button variant="outline" className="rounded-full">
          Resep
        </Button>
        <Button variant="outline" className="rounded-full">
          Tips & Trik
        </Button>
        <Button variant="outline" className="rounded-full">
          Kuliner Nusantara
        </Button>
        <Button variant="outline" className="rounded-full">
          Event
        </Button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.slice(1).map((post) => (
          <Card key={post.slug} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="text-sm text-orange-500 mb-1">{post.category}</div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center">
                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">{post.author.name}</div>
                  <div className="text-xs text-gray-500">{post.date}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/blog/${post.slug}`}>Baca Selengkapnya</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-orange-50 rounded-lg p-8 text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Dapatkan Update Terbaru</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Berlangganan newsletter kami untuk mendapatkan resep terbaru, tips memasak, dan promo spesial langsung ke
          inbox Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Alamat email Anda"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button>Berlangganan</Button>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-4">Tag Populer</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            Kue Tradisional
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Dessert Box
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Bolu
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Resep Rumahan
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Tips Memanggang
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Kue Kering
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Hampers
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Event
          </Button>
        </div>
      </div>
    </div>
  )
}
