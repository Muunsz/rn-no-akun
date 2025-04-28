"use client"

import { Facebook, Link, Twitter, PhoneIcon as WhatsApp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface SocialShareProps {
  url: string
  title: string
  description?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function SocialShare({
  url,
  title,
  description = "",
  className = "",
  variant = "outline",
  size = "icon",
}: SocialShareProps) {
  const { toast } = useToast()

  const handleShare = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`
        break
      case "instagram":
        // Instagram doesn't have a direct share URL, but we can open Instagram
        shareUrl = "https://www.instagram.com/"
        toast({
          title: "Instagram",
          description:
            "Instagram tidak mendukung berbagi langsung melalui link. Silakan salin link dan bagikan secara manual.",
        })
        break
      case "copy":
        navigator.clipboard.writeText(url)
        toast({
          title: "Link disalin!",
          description: "Link telah disalin ke clipboard",
        })
        return
      default:
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button variant={variant} size={size} onClick={() => handleShare("facebook")}>
        <Facebook className="h-4 w-4" />
        {size !== "icon" && <span className="ml-2">Facebook</span>}
      </Button>

      <Button variant={variant} size={size} onClick={() => handleShare("twitter")}>
        <Twitter className="h-4 w-4" />
        {size !== "icon" && <span className="ml-2">Twitter</span>}
      </Button>

      <Button variant={variant} size={size} onClick={() => handleShare("whatsapp")}>
        <WhatsApp className="h-4 w-4" />
        {size !== "icon" && <span className="ml-2">WhatsApp</span>}
      </Button>

      <Button variant={variant} size={size} onClick={() => handleShare("copy")}>
        <Link className="h-4 w-4" />
        {size !== "icon" && <span className="ml-2">Copy Link</span>}
      </Button>
    </div>
  )
}
