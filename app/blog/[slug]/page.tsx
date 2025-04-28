"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock, Facebook, Heart, Instagram, MessageSquare, Share2, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/config/blog"
import { useToast } from "@/components/ui/use-toast"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast()
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find((post) => post.slug === params.slug)
    if (currentPost) {
      setPost(currentPost)
      setLikeCount(currentPost.likes || 0)

      // Find related posts (same category, excluding current)
      const related = blogPosts.filter((p) => p.category === currentPost.category && p.slug !== params.slug).slice(0, 3)
      setRelatedPosts(related)
    }
  }, [params.slug])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post?.title || "Artikel Rasa Nusantara"

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url)
        toast({
          title: "Link disalin!",
          description: "Link artikel telah disalin ke clipboard",
        })
        return
    }

    window.open(shareUrl, "_blank")
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
        <p className="mb-8">Maaf, artikel yang Anda cari tidak tersedia.</p>
        <Button asChild>
          <Link href="/blog">Kembali ke Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/blog" className="hover:text-orange-500">
          Blog
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 truncate max-w-[200px]">{post.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Article Header */}
          <div className="mb-8">
            <div className="text-sm text-orange-500 mb-2">{post.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-gray-500">{post.date}</div>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime || "5 menit membaca"}</span>
              </div>
            </div>

            <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose max-w-none mb-8">
            <p className="lead">{post.excerpt}</p>

            <h2>Pendahuluan</h2>
            <p>
              Kuliner Indonesia memiliki kekayaan rasa dan keberagaman yang luar biasa. Dari Sabang sampai Merauke,
              setiap daerah memiliki ciri khas kuliner yang mencerminkan budaya dan kearifan lokal. Salah satu jenis
              kuliner yang sangat populer dan memiliki banyak variasi adalah kue tradisional.
            </p>

            <p>
              Kue tradisional Indonesia tidak hanya sekadar hidangan penutup atau camilan, tetapi juga memiliki nilai
              filosofis dan sejarah yang dalam. Banyak kue tradisional yang dibuat khusus untuk perayaan atau upacara
              adat tertentu, menjadikannya bagian penting dari warisan budaya Indonesia.
            </p>

            <h2>Ragam Kue Tradisional Indonesia</h2>
            <p>
              Indonesia memiliki ratusan jenis kue tradisional yang tersebar di berbagai daerah. Beberapa di antaranya
              sangat populer dan dikenal luas, sementara yang lain mungkin hanya dikenal di daerah asalnya. Berikut
              adalah beberapa kue tradisional Indonesia yang paling populer:
            </p>

            <h3>1. Klepon</h3>
            <p>
              Klepon adalah kue berbentuk bulat yang terbuat dari tepung beras ketan dan diberi warna hijau dari daun
              pandan. Di dalamnya terdapat gula merah cair yang akan "menyembur" ketika digigit. Kue ini biasanya
              disajikan dengan taburan kelapa parut.
            </p>

            <h3>2. Kue Lapis</h3>
            <p>
              Kue lapis adalah kue yang terdiri dari beberapa lapisan dengan warna berbeda. Kue ini memiliki tekstur
              yang kenyal dan rasa yang manis. Proses pembuatannya cukup rumit karena setiap lapisan harus dikukus satu
              per satu.
            </p>

            <h3>3. Onde-onde</h3>
            <p>
              Onde-onde adalah kue berbentuk bulat yang dibalut dengan wijen. Di dalamnya terdapat isian kacang hijau
              yang manis. Kue ini digoreng hingga wijen menjadi kecoklatan dan renyah.
            </p>

            <h2>Tantangan dalam Melestarikan Kue Tradisional</h2>
            <p>
              Meskipun kue tradisional Indonesia memiliki cita rasa yang lezat dan nilai budaya yang tinggi,
              keberadaannya semakin terancam oleh masuknya berbagai jenis kue modern dari luar negeri. Generasi muda
              cenderung lebih tertarik dengan kue-kue modern yang dianggap lebih "kekinian".
            </p>

            <p>
              Selain itu, proses pembuatan kue tradisional yang umumnya rumit dan memakan waktu juga menjadi tantangan
              tersendiri. Banyak orang yang tidak memiliki waktu atau kesabaran untuk membuat kue tradisional, sehingga
              lebih memilih untuk membeli kue modern yang lebih praktis.
            </p>

            <h2>Inovasi dalam Kue Tradisional</h2>
            <p>
              Untuk melestarikan kue tradisional Indonesia, diperlukan inovasi agar kue-kue ini tetap relevan dengan
              selera dan gaya hidup masyarakat modern. Beberapa inovasi yang dapat dilakukan antara lain:
            </p>

            <ul>
              <li>Modifikasi tampilan agar lebih menarik</li>
              <li>Penggunaan bahan-bahan organik atau bebas gluten</li>
              <li>Pengembangan varian rasa baru</li>
              <li>Pengemasan yang lebih modern dan praktis</li>
            </ul>

            <h2>Kesimpulan</h2>
            <p>
              Kue tradisional Indonesia adalah warisan budaya yang perlu dilestarikan. Dengan inovasi dan kreativitas,
              kue-kue ini dapat tetap eksis dan bersaing dengan kue-kue modern. Mari kita dukung pelestarian kue
              tradisional Indonesia dengan cara mengonsumsi dan mempromosikannya kepada generasi muda.
            </p>
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleLike} className={isLiked ? "text-red-500" : ""}>
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {likeCount} Suka
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                {post.comments || 0} Komentar
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handleShare("facebook")}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleShare("twitter")}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleShare("copy")}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-orange-50 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Tentang Penulis</h3>
                <h4 className="font-medium">{post.author.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{post.author.role || "Food Writer"}</p>
                <p className="text-sm text-gray-600">
                  {post.author.bio ||
                    "Seorang pecinta kuliner Indonesia yang berdedikasi untuk melestarikan dan memperkenalkan kekayaan kuliner Nusantara kepada masyarakat luas."}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Instagram className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline" size="sm">
                    Artikel Lainnya
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Komentar ({post.comments || 0})</h3>

            {/* Comment Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">Tinggalkan Komentar</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nama"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <textarea
                  placeholder="Komentar Anda"
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
                <Button>Kirim Komentar</Button>
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src="/placeholder.svg?height=100&width=100" alt="Commenter" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">Budi Santoso</h5>
                      <span className="text-xs text-gray-500">2 hari yang lalu</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Artikel yang sangat informatif! Saya jadi ingin mencoba membuat klepon sendiri di rumah.
                    </p>
                    <Button variant="ghost" size="sm" className="text-xs mt-1">
                      Balas
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src="/placeholder.svg?height=100&width=100" alt="Commenter" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">Siti Rahayu</h5>
                      <span className="text-xs text-gray-500">1 minggu yang lalu</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Saya setuju bahwa kita perlu melestarikan kue tradisional Indonesia. Inovasi memang diperlukan
                      agar tetap relevan dengan selera masa kini.
                    </p>
                    <Button variant="ghost" size="sm" className="text-xs mt-1">
                      Balas
                    </Button>
                  </div>
                </div>

                {/* Nested Reply */}
                <div className="ml-12 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium">{post.author.name}</h5>
                        <span className="text-xs text-gray-500">6 hari yang lalu</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Terima kasih atas komentarnya, Siti! Benar sekali, inovasi adalah kunci untuk melestarikan
                        warisan kuliner kita.
                      </p>
                      <Button variant="ghost" size="sm" className="text-xs mt-1">
                        Balas
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Author Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Penulis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{post.author.name}</h4>
                  <p className="text-sm text-gray-500">{post.author.role || "Food Writer"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Artikel Terkait</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.slug} className="flex gap-3">
                      <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="font-medium hover:text-orange-500 line-clamp-2"
                        >
                          {relatedPost.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Tidak ada artikel terkait.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/blog?category=resep" className="block hover:text-orange-500">
                  Resep
                </Link>
                <Link href="/blog?category=tips" className="block hover:text-orange-500">
                  Tips & Trik
                </Link>
                <Link href="/blog?category=kuliner" className="block hover:text-orange-500">
                  Kuliner Nusantara
                </Link>
                <Link href="/blog?category=event" className="block hover:text-orange-500">
                  Event
                </Link>
                <Link href="/blog?category=berita" className="block hover:text-orange-500">
                  Berita
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  Kue Tradisional
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Resep
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Kuliner
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Indonesia
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Warisan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card>
            <CardHeader>
              <CardTitle>Newsletter</CardTitle>
              <CardDescription>Dapatkan artikel terbaru langsung ke inbox Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="w-full">Berlangganan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
