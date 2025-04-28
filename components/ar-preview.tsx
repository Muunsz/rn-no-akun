"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RefreshCw, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ARPreviewProps {
  productImage: string
  productName: string
  onClose: () => void
}

export function ARPreview({ productImage, productName, onClose }: ARPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isCaptured, setIsCaptured] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsStreaming(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        toast({
          title: "Kamera tidak tersedia",
          description: "Tidak dapat mengakses kamera. Pastikan Anda memberikan izin kamera.",
          variant: "destructive",
        })
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [toast])

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Load product image
    const productImg = new Image()
    productImg.crossOrigin = "anonymous"
    productImg.src = productImage

    productImg.onload = () => {
      // Calculate size (50% of canvas width)
      const size = canvas.width * 0.5
      const x = (canvas.width - size) / 2
      const y = (canvas.height - size) / 2

      // Draw product image on canvas
      context.drawImage(productImg, x, y, size, size)

      setIsCaptured(true)
    }
  }

  const resetCapture = () => {
    setIsCaptured(false)
  }

  const saveImage = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = `ar-preview-${productName.toLowerCase().replace(/\s+/g, "-")}.png`
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()

    toast({
      title: "Gambar disimpan",
      description: "AR Preview telah disimpan ke perangkat Anda.",
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
        <div className="p-4 bg-orange-500 text-white flex justify-between items-center">
          <h3 className="font-bold">AR Preview: {productName}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-orange-600">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
            {!isCaptured ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : (
              <canvas ref={canvasRef} className="w-full h-full object-contain" />
            )}

            {!isStreaming && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                <p>Memuat kamera...</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {!isCaptured ? (
              <Button onClick={captureImage} disabled={!isStreaming}>
                <Camera className="h-4 w-4 mr-2" />
                Ambil Gambar
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={resetCapture}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Ambil Ulang
                </Button>
                <Button onClick={saveImage}>Simpan Gambar</Button>
              </>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Arahkan kamera ke permukaan datar untuk melihat produk dalam tampilan AR.
          </p>
        </div>
      </div>
    </div>
  )
}
