"use client"

import { Component, type ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Oops, Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-4">
            Mohon maaf, terjadi kesalahan dalam menampilkan konten. Silakan coba lagi nanti.
          </p>
          <Button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-600">
            Muat Ulang Halaman
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
