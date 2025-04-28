"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Hubungi Kami</h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">Kontak</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-orange-800 mb-6">Informasi Kontak</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-orange-500 mr-4 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Alamat</h3>
                <p className="text-gray-600">
                  Jl. Contoh No. 123
                  <br />
                  Kota, Provinsi
                  <br />
                  Indonesia 12345
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-orange-500 mr-4 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Telepon</h3>
                <p className="text-gray-600">
                  +62 812 3456 7890
                  <br />
                  (021) 123-4567
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-6 w-6 text-orange-500 mr-4 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-gray-600">
                  info@alohazakia.com
                  <br />
                  cs@alohazakia.com
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-orange-800 mb-6">Jam Operasional</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>08:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sabtu</span>
                <span>09:00 - 15:00</span>
              </div>
              <div className="flex justify-between">
                <span>Minggu</span>
                <span>Tutup</span>
              </div>
            </div>
          </div>

          {/* Map (Placeholder) */}
          <div className="mt-8">
            <div className="relative h-[300px] w-full bg-gray-200 rounded-lg">
              {/* Replace with actual map component */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">Map Placeholder</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-orange-800 mb-6">Kirim Pesan</h2>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <svg
                className="h-12 w-12 text-green-500 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Pesan Terkirim!</h3>
              <p className="text-green-600 mb-4">
                Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="bg-green-500 hover:bg-green-600">
                Kirim Pesan Lain
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Nomor Telepon
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subjek
                </label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Pilih subjek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="umum">Pertanyaan Umum</SelectItem>
                    <SelectItem value="pesanan">Informasi Pesanan</SelectItem>
                    <SelectItem value="kerjasama">Kerjasama</SelectItem>
                    <SelectItem value="komplain">Komplain</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Pesan
                </label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
