import { create } from "zustand"
import { persist } from "zustand/middleware"

export type NotificationType = "order" | "promo" | "system"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

export const useNotifications = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) => {
        const newNotification: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          ...notification,
          read: false,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }))
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
          unreadCount: state.unreadCount - 1,
        }))
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
          unreadCount: 0,
        }))
      },

      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 })
      },
    }),
    {
      name: "notification-storage",
    },
  ),
)

// Fungsi untuk menambahkan notifikasi demo saat aplikasi pertama kali dimuat
export function addDemoNotifications() {
  const { notifications, addNotification } = useNotifications.getState()

  // Hanya tambahkan notifikasi demo jika belum ada notifikasi
  if (notifications.length === 0) {
    addNotification({
      type: "promo",
      title: "Promo Spesial Hari Ini!",
      message:
        "Dapatkan diskon 20% untuk semua produk kategori Makanan Tradisional. Berlaku hingga hari ini pukul 23:59.",
    })

    addNotification({
      type: "system",
      title: "Selamat Datang di Rasa Nusantara",
      message:
        "Terima kasih telah mengunjungi toko kami. Jelajahi berbagai kuliner tradisional Indonesia dengan kualitas terbaik.",
    })
  }
}
