export const forumCategories = [
  {
    id: "general",
    name: "Umum",
    count: 120,
  },
  {
    id: "baking",
    name: "Memanggang",
    count: 85,
  },
  {
    id: "decorating",
    name: "Dekorasi",
    count: 50,
  },
  {
    id: "business",
    name: "Bisnis",
    count: 30,
  },
  {
    id: "technical",
    name: "Teknis",
    count: 20,
  },
]

export const forumTopics = [
  {
    id: "1",
    title: "Tips Membuat Bolu Pandan yang Lembut",
    excerpt:
      "Saya ingin bertanya tentang tips membuat bolu pandan yang lembut dan tidak mudah bantat. Apakah ada tips khusus?",
    tags: ["bolu", "pandan", "tips"],
    votes: 15,
    replies: 8,
    date: "2023-10-26",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
    },
    isSolved: true,
  },
  {
    id: "2",
    title: "Cara Membuat Icing Sugar yang Sempurna",
    excerpt:
      "Saya ingin bertanya tentang cara membuat icing sugar yang sempurna untuk dekorasi kue. Apakah ada tips khusus?",
    tags: ["icing", "dekorasi", "tips"],
    votes: 10,
    replies: 5,
    date: "2023-10-25",
    author: "Jane Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
    isSolved: false,
  },
  {
    id: "3",
    title: "Pertanyaan tentang Pemesanan Kue",
    excerpt: "Saya ingin bertanya tentang cara memesan kue dan estimasi waktu pengirimannya.",
    tags: ["pemesanan", "pengiriman"],
    votes: 5,
    replies: 2,
    date: "2023-10-24",
    author: {
      name: "Peter Jones",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
    },
    isSolved: true,
  },
  // Add more topics here...
]
