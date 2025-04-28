"use client"

import { useEffect } from "react"
import { Bell } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useNotifications, addDemoNotifications } from "@/lib/notifications"

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

  // Tambahkan notifikasi demo saat komponen dimuat
  useEffect(() => {
    addDemoNotifications()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifikasi</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Tandai semua dibaca
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">Tidak ada notifikasi</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 cursor-pointer ${!notification.read ? "bg-orange-50" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{notification.title}</p>
                    <span className="text-xs text-gray-500">
                      {format(new Date(notification.createdAt), "dd MMM yyyy, HH:mm", { locale: id })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
