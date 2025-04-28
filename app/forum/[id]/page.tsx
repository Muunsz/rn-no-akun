"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Flag, Heart, MessageSquare, Reply, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { forumTopics } from "@/config/forum"
import { SocialShare } from "@/components/social-share"
import { useToast } from "@/components/ui/use-toast"

export default function ForumTopicPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Find the topic by ID
  const topic = forumTopics.find(t => t.id.toString() === params.id)
  
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!replyContent.trim()) {
      toast({
        title: "Balasan kosong",
        description: "Silakan tulis balasan Anda terlebih dahulu",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setReplyContent("")
      toast({
        title: "Balasan terkirim",
        description: "Terima kasih atas partisipasi Anda dalam diskusi ini"
      })
    }, 1000)
  }
  
  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Topik tidak ditemukan</h1>
        <p className="mb-8">Maaf, topik yang Anda cari tidak tersedia.</p>
        <Button asChild>
          <Link href="/forum">Kembali ke Forum</Link>
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
        <Link href="/forum" className="hover:text-orange-500">
          Forum
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 truncate max-w-[200px]">{topic.title}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {/* Topic */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {topic.tags.map(tag => (
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
                  <CardTitle className="text-2xl">{topic.title}</CardTitle>
                  <CardDescription>Dibuat {topic.date} oleh {topic.author.name}</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="hidden sm:block w-20 flex-shrink-0">
                  <div className="flex flex-col items-center sticky top-20">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <span className="font-bold my-2">{topic.votes}</span>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ThumbsUp className="h-5 w-5 rotate-180" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="prose max-w-none">
                    <p>
                      Halo semua, saya ingin berbagi pengalaman saya dalam membuat kue tradisional Indonesia. Saya baru saja mencoba membuat klepon, tapi saya mengalami beberapa kesulitan.
                    </p>
                    
                    <p>
                      Masalah utama yang saya hadapi adalah:
                    </p>
                    
                    <ol>
                      <li>Adonan terlalu lengket dan sulit dibentuk</li>
                      <li>Gula merah di dalamnya sering bocor saat direbus</li>
                      <li>Tekstur klepon terlalu keras setelah dingin</li>
                    </ol>
                    
                    <p>
                      Saya sudah mengikuti resep dari internet, tapi hasilnya masih belum memuaskan. Apakah ada yang punya tips atau trik khusus untuk membuat klepon yang sempurna?
                    </p>
                    
                    <p>
                      Terima kasih sebelumnya untuk bantuan dan sarannya!
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={topic.author.avatar || "/placeholder.svg"}
                          alt={topic.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{topic.author.name}</div>
                        <div className="text-xs text-gray-500">{topic.author.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex sm:hidden items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {topic.votes}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {topic.replies} Balasan
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorit
                </Button>
              </div>
              
              <SocialShare
                url={`https://rasanusantara.com/forum/${topic.id}`}
                title={topic.title}
                size="sm"
                variant="ghost"
              />
            </CardFooter>
          </Card>
          
          {/* Replies */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Balasan ({topic.replies})</h2>
            
            {/* Sample Replies */}
            <Card id="reply-1" className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Chef Rina"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Chef Rina</div>
                      <div className="text-xs text-gray-500">Pastry Chef · 3 hari yang lalu</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Jawaban Terbaik
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>
                    Halo! Saya akan coba bantu jawab masalah Anda dalam membuat klepon:
                  </p>
                  
                  <ol>
                    <li>
                      <strong>Adonan terlalu lengket:</strong> Pastikan perbandingan tepung ketan dan air tepat. Tambahkan tepung ketan sedikit demi sedikit sampai konsistensi adonan pas. Anda juga bisa menambahkan sedikit tepung beras untuk mengurangi kelengketan.
                    </li>
                    <li>
                      <strong>Gula merah bocor:</strong> Pastikan gula merah dipadatkan dengan baik dan adonan cukup tebal menutupi gula. Sebelum direbus, simpan klepon di kulkas sekitar 15-20 menit agar lebih kokoh.
                    </li>
                    <li>
                      <strong>Tekstur keras setelah dingin:</strong> Ini normal untuk kue berbahan dasar tepung ketan. Untuk menghindarinya, tambahkan sedikit tepung sagu (1-2 sdm) ke dalam adonan, dan jangan terlalu lama merebus.
                    </li>
                  </ol>
                  
                  <p>
                    Semoga tips ini membantu! Jangan ragu untuk bertanya lagi jika masih ada kesulitan.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    24
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Balas
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card id="reply-2">
              <CardHeader>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Budi Santoso"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Budi Santoso</div>
                    <div className="text-xs text-gray-500">Pecinta Kuliner · 2 hari yang lalu</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>
                    Saya juga pernah mengalami masalah yang sama. Selain tips dari Chef Rina, saya sa\
