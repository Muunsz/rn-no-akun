"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Copy, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { usePayment, type PaymentMethod } from "@/lib/payment"

interface PaymentGatewayProps {
  amount: number
  orderId: string
  onSuccess: () => void
  onCancel: () => void
}

export function PaymentGateway({ amount, orderId, onSuccess, onCancel }: PaymentGatewayProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { initiatePayment, checkPaymentStatus, currentPayment } = usePayment()

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("bank_transfer")
  const [selectedProvider, setSelectedProvider] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (currentPayment?.expiryTime) {
      const expiryTime = new Date(currentPayment.expiryTime).getTime()
      const now = Date.now()
      const timeLeft = Math.max(0, Math.floor((expiryTime - now) / 1000))

      setCountdown(timeLeft)

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentPayment])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePay = async () => {
    if (!selectedMethod) {
      toast({
        title: "Pilih metode pembayaran",
        description: "Silakan pilih metode pembayaran terlebih dahulu",
        variant: "destructive",
      })
      return
    }

    if (selectedMethod === "bank_transfer" && !selectedProvider) {
      toast({
        title: "Pilih bank",
        description: "Silakan pilih bank untuk transfer",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      await initiatePayment({
        method: selectedMethod,
        provider: selectedProvider,
        amount,
      })

      toast({
        title: "Pembayaran diproses",
        description: "Silakan selesaikan pembayaran Anda",
      })
    } catch (error) {
      toast({
        title: "Gagal memproses pembayaran",
        description: "Terjadi kesalahan saat memproses pembayaran",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCheckStatus = async () => {
    if (!currentPayment?.transactionId) return

    setIsChecking(true)

    try {
      const status = await checkPaymentStatus(currentPayment.transactionId)

      if (status === "success") {
        toast({
          title: "Pembayaran berhasil",
          description: "Terima kasih atas pembayaran Anda",
        })
        onSuccess()
      } else if (status === "failed") {
        toast({
          title: "Pembayaran gagal",
          description: "Silakan coba lagi atau gunakan metode pembayaran lain",
          variant: "destructive",
        })
      } else if (status === "expired") {
        toast({
          title: "Pembayaran kedaluwarsa",
          description: "Batas waktu pembayaran telah berakhir",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Status pembayaran",
          description: `Status pembayaran Anda: ${status}`,
        })
      }
    } catch (error) {
      toast({
        title: "Gagal memeriksa status",
        description: "Terjadi kesalahan saat memeriksa status pembayaran",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Disalin ke clipboard",
      description: "Informasi pembayaran telah disalin",
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Pembayaran</CardTitle>
        <CardDescription>Selesaikan pembayaran untuk pesanan #{orderId.substring(0, 8)}</CardDescription>
      </CardHeader>
      <CardContent>
        {!currentPayment ? (
          <Tabs defaultValue="bank_transfer" onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="bank_transfer">Transfer Bank</TabsTrigger>
              <TabsTrigger value="e-wallet">E-Wallet</TabsTrigger>
              <TabsTrigger value="credit_card">Kartu Kredit</TabsTrigger>
            </TabsList>

            <TabsContent value="bank_transfer" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer hover:border-orange-500 ${
                    selectedProvider === "bca" ? "border-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={() => setSelectedProvider("bca")}
                >
                  <div className="h-12 flex items-center justify-center">
                    <span className="font-bold text-lg">BCA</span>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer hover:border-orange-500 ${
                    selectedProvider === "mandiri" ? "border-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={() => setSelectedProvider("mandiri")}
                >
                  <div className="h-12 flex items-center justify-center">
                    <span className="font-bold text-lg">Mandiri</span>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer hover:border-orange-500 ${
                    selectedProvider === "bni" ? "border-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={() => setSelectedProvider("bni")}
                >
                  <div className="h-12 flex items-center justify-center">
                    <span className="font-bold text-lg">BNI</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="e-wallet" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer hover:border-orange-500 ${
                    selectedProvider === "gopay" ? "border-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={() => setSelectedProvider("gopay")}
                >
                  <div className="h-12 flex items-center justify-center">
                    <span className="font-bold text-lg">GoPay</span>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer hover:border-orange-500 ${
                    selectedProvider === "ovo" ? "border-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={() => setSelectedProvider("ovo")}
                >
                  <div className="h-12 flex items-center justify-center">
                    <span className="font-bold text-lg">OVO</span>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer hover:border-orange-500 ${
                    selectedProvider === "dana" ? "border-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={() => setSelectedProvider("dana")}
                >
                  <div className="h-12 flex items-center justify-center">
                    <span className="font-bold text-lg">DANA</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="credit_card" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nomor Kartu</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal Kadaluarsa</label>
                    <input type="text" className="w-full p-2 border rounded-md" placeholder="MM/YY" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVV</label>
                    <input type="text" className="w-full p-2 border rounded-md" placeholder="123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Pemegang Kartu</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder
                    className="w-full p-2 border rounded-md"
                    placeholder="Nama Lengkap"
                  />
                </div>
              </div>
            </TabsContent>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span>Rp {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Biaya Layanan</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>Rp {amount.toLocaleString()}</span>
              </div>
            </div>
          </Tabs>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">Rp {currentPayment.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">
                Selesaikan pembayaran dalam
                <span className="font-bold text-orange-500 ml-1">{formatTime(countdown)}</span>
              </div>
            </div>

            {currentPayment.method === "bank_transfer" && (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Bank</p>
                      <p className="font-bold">{currentPayment.provider?.toUpperCase()}</p>
                    </div>
                    <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                      <span className="font-bold">{currentPayment.provider?.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Nomor Rekening</p>
                      <p className="font-bold">8800123456789</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard("8800123456789")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Nama Rekening</p>
                      <p className="font-bold">PT RASA NUSANTARA</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard("PT RASA NUSANTARA")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Jumlah Transfer</p>
                      <p className="font-bold">Rp {currentPayment.amount.toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(currentPayment.amount.toString())}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentPayment.method === "e-wallet" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto w-48 h-48 relative">
                  <Image src="/placeholder.svg?height=200&width=200" alt="QR Code" fill className="object-contain" />
                </div>
                <p className="text-sm text-gray-500">
                  Scan QR code di atas menggunakan aplikasi {currentPayment.provider}
                </p>
              </div>
            )}

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Petunjuk Pembayaran</h3>
              <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
                <li>Pastikan Anda melakukan transfer tepat hingga 3 digit terakhir</li>
                <li>Pembayaran akan diverifikasi otomatis dalam 5-10 menit setelah pembayaran berhasil</li>
                <li>Jika dalam 1 jam belum terverifikasi, silakan hubungi customer service kami</li>
              </ol>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleCheckStatus} disabled={isChecking} className="bg-orange-500 hover:bg-orange-600">
                {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isChecking ? "Memeriksa..." : "Saya Sudah Bayar"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Batalkan
        </Button>

        {!currentPayment && (
          <Button onClick={handlePay} disabled={isProcessing} className="bg-orange-500 hover:bg-orange-600">
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isProcessing ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
