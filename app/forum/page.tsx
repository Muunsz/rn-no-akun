import Link from "next/link"
import Image from "next/image"
import { ChevronRight, MessageSquare, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { forumCategories, forumTopics } from "@/config/forum"

export default function ForumPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Forum Komunitas</h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">Forum</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Search and Create Topic */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Input type="text" placeholder="Cari topik..." className="w-full" />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Buat Topik Baru
            </Button>
          </div>

          {/* Forum Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full justify-start overflow-auto">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="popular">Populer</TabsTrigger>
              <TabsTrigger value="recent">Terbaru</TabsTrigger>
              <TabsTrigger value="unanswered">Belum Dijawab</TabsTrigger>
              <TabsTrigger value="solved">Terjawab</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              {forumTopics.map((topic) => (
                <Card key={topic.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-16 bg-gray-50 flex flex-row md:flex-col items-center justify-center p-4 text-center">
                      <div className="flex flex-col items-center mr-4 md:mr-0 md:mb-2">
                        <span className="font-bold text-lg">{topic.votes}</span>
                        <span className="text-xs text-gray-500">Votes</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">{topic.replies}</span>
                        <span className="text-xs text-gray-500">Replies</span>
                      </div>
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link href={`/forum/${topic.id}`} className="text-lg font-medium hover:text-orange-500">
                            {topic.title}
                          </Link>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {topic.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {topic.isSolved && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                                Terjawab
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{topic.date}</div>
                      </div>

                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{topic.excerpt}</p>

                      <div className="flex items-center mt-4">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src={topic.author.avatar || "/placeholder.svg"}
                            alt={topic.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{topic.author.name}</div>
                          <div className="text-xs text-gray-500">{topic.author.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="popular" className="space-y-4 mt-4">
              <p className="text-center text-gray-500 py-8">Menampilkan topik populer...</p>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4 mt-4">
              <p className="text-center text-gray-500 py-8">Menampilkan topik terbaru...</p>
            </TabsContent>

            <TabsContent value="unanswered" className="space-y-4 mt-4">
              <p className="text-center text-gray-500 py-8">Menampilkan topik yang belum dijawab...</p>
            </TabsContent>

            <TabsContent value="solved" className="space-y-4 mt-4">
              <p className="text-center text-gray-500 py-8">Menampilkan topik yang sudah terjawab...</p>
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button variant="outline" size="sm" className="bg-orange-50">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="mx-1">...</span>
              <Button variant="outline" size="sm">
                10
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {forumCategories.map((category) => (
                  <div key={category.id} className="flex justify-between items-center">
                    <Link href={`/forum/category/${category.id}`} className="hover:text-orange-500">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-gray-400" />
                        {category.name}
                      </div>
                    </Link>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>Kontributor Teratas</CardTitle>
              <CardDescription>Pengguna paling aktif bulan ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={`Contributor ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Pengguna {i}</div>
                      <div className="text-xs text-gray-500">{30 - i * 5} postingan</div>
                    </div>
                    <Badge variant="outline">{i}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Forum Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistik Forum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Topik</span>
                  <span className="font-medium">1,245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Balasan</span>
                  <span className="font-medium">8,392</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pengguna Terdaftar</span>
                  <span className="font-medium">3,721</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Topik Terbaru</span>
                  <span className="font-medium">Hari ini</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
