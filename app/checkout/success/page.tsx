import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Pesanan Berhasil!</h1>
        <p className="text-gray-600 mb-8">
          Terima kasih telah berbelanja di Rasa Nusantara. Kami akan segera memproses pesanan Anda.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
            <Link href="/products">Belanja Lagi</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
