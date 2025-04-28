"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, X, Minimize2, Maximize2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  sender: "user" | "agent"
  text: string
  timestamp: Date
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [agentName, setAgentName] = useState("Customer Service")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Add initial message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "1",
          sender: "agent",
          text: "Halo! Selamat datang di Rasa Nusantara. Ada yang bisa saya bantu?",
          timestamp: new Date(),
        },
      ])

      // Simulate agent assignment after 2 seconds
      setTimeout(() => {
        setAgentName("Siti Rahayu")
        toast({
          title: "Agent terhubung",
          description: "Anda terhubung dengan Siti Rahayu",
        })
      }, 2000)
    }
  }, [isOpen, messages.length, toast])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate agent typing
    setIsTyping(true)

    // Simulate agent response after 1-3 seconds
    setTimeout(
      () => {
        setIsTyping(false)

        const responses = [
          "Terima kasih atas pertanyaan Anda. Saya akan bantu menjawabnya.",
          "Baik, saya mengerti pertanyaan Anda. Mohon tunggu sebentar ya.",
          "Untuk pertanyaan tersebut, saya sarankan untuk melihat halaman FAQ kami.",
          "Apakah ada informasi lain yang Anda butuhkan?",
          "Kami memiliki promo spesial untuk produk tersebut. Apakah Anda tertarik?",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const agentMessage: Message = {
          id: Date.now().toString(),
          sender: "agent",
          text: randomResponse,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, agentMessage])
      },
      1000 + Math.random() * 2000,
    )
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-orange-500 hover:bg-orange-600 shadow-lg"
        >
          <MessageSquare className="h-6 w-6 text-white" />
          <span className="sr-only">Live Chat</span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-80 md:w-96 rounded-lg shadow-xl bg-white overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[500px]"
          }`}
        >
          {/* Chat Header */}
          <div className="bg-orange-500 text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={agentName} />
                <AvatarFallback>
                  {agentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{agentName}</div>
                <div className="text-xs opacity-80">Online</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMinimize}
                className="h-6 w-6 text-white hover:bg-orange-600"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="h-6 w-6 text-white hover:bg-orange-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="p-3 h-[400px] overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "agent" && (
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={agentName} />
                        <AvatarFallback>
                          {agentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "user" ? "bg-orange-500 text-white" : "bg-white border text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-orange-100" : "text-gray-500"}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start mb-3">
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={agentName} />
                      <AvatarFallback>
                        {agentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border rounded-lg p-3 text-gray-800">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
                <Input
                  type="text"
                  placeholder="Ketik pesan..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="bg-orange-500 hover:bg-orange-600">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
