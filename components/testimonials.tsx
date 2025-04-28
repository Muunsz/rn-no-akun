import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Anisa Putri",
    role: "Pelanggan Setia",
    content:
      "Kue bolu dari Aloha Zakia selalu menjadi pilihan saya untuk acara keluarga. Teksturnya lembut dan rasanya tidak terlalu manis. Semua keluarga saya menyukainya!",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Food Blogger",
    content:
      "Dessert box dari Aloha Zakia adalah yang terbaik di kotanya. Kombinasi rasa dan teksturnya sempurna. Saya selalu merekomendasikannya kepada teman-teman saya.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Citra Dewi",
    role: "Event Organizer",
    content:
      "Kami menggunakan jasa Aloha Zakia untuk beberapa acara corporate dan hasilnya selalu memuaskan. Pelayanannya profesional dan produknya berkualitas tinggi.",
    rating: 4,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-orange-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-800">Apa Kata Mereka</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-orange-800">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
