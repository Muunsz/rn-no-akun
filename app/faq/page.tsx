import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Bagaimana cara memesan kue di Aloha Saqia?",
    answer:
      "Anda dapat memesan kue melalui website kami dengan memilih produk yang diinginkan, menambahkannya ke keranjang, dan melakukan checkout. Kami juga menerima pesanan melalui WhatsApp untuk pemesanan khusus.",
  },
  {
    question: "Berapa lama waktu pengiriman?",
    answer:
      "Waktu pengiriman bergantung pada lokasi Anda. Untuk area dalam kota, pengiriman dapat dilakukan dalam 1-2 hari. Untuk pengiriman ke luar kota, membutuhkan waktu 2-3 hari kerja.",
  },
  {
    question: "Apakah bisa melakukan custom order?",
    answer:
      "Ya, kami menerima pesanan khusus sesuai keinginan Anda. Silakan hubungi kami melalui WhatsApp atau email untuk mendiskusikan detail pesanan custom Anda.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, DANA), dan Cash on Delivery (COD) untuk area tertentu.",
  },
  {
    question: "Bagaimana kebijakan pengembalian?",
    answer:
      "Kami sangat memperhatikan kualitas produk kami. Jika ada masalah dengan pesanan Anda, silakan hubungi kami dalam 24 jam setelah penerimaan untuk penggantian produk.",
  },
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">Frequently Asked Questions</h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">FAQ</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium hover:text-orange-500">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-orange-50 rounded-lg">
          <h2 className="text-xl font-semibold text-orange-800 mb-4">Masih ada pertanyaan?</h2>
          <p className="text-gray-600 mb-4">
            Jika Anda memiliki pertanyaan lain yang belum terjawab, silakan hubungi tim kami melalui:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• WhatsApp: +62 812 3456 7890</li>
            <li>• Email: cs@alohasaqia.com</li>
            <li>• Instagram: @alohasaqia</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
