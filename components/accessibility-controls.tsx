"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accessibility, Moon, Sun, ZoomIn, ZoomOut, Type, Contrast, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState("normal")
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Apply font size changes
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  // Apply contrast changes
  useEffect(() => {
    if (contrast === "high") {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [contrast])

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 10, 150))
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 10, 80))
  }

  const resetFontSize = () => {
    setFontSize(100)
  }

  const toggleContrast = () => {
    setContrast((prev) => (prev === "normal" ? "high" : "normal"))
  }

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    <>
      {/* Accessibility Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="fixed bottom-6 left-6 z-50 rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg"
              aria-label="Accessibility Controls"
            >
              <Accessibility className="h-6 w-6 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Pengaturan Aksesibilitas</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64 border dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Aksesibilitas</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Font Size Controls */}
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Type className="h-4 w-4 mr-2" />
                Ukuran Teks
              </h4>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="icon" onClick={decreaseFontSize} disabled={fontSize <= 80}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span>{fontSize}%</span>
                <Button variant="outline" size="icon" onClick={increaseFontSize} disabled={fontSize >= 150}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={resetFontSize}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Contrast Control */}
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Contrast className="h-4 w-4 mr-2" />
                Kontras
              </h4>
              <Button variant={contrast === "high" ? "default" : "outline"} className="w-full" onClick={toggleContrast}>
                {contrast === "high" ? "Kontras Tinggi" : "Kontras Normal"}
              </Button>
            </div>

            {/* Dark Mode */}
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                {isDarkMode ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                Mode Tampilan
              </h4>
              <Button variant={isDarkMode ? "default" : "outline"} className="w-full" onClick={toggleDarkMode}>
                {isDarkMode ? "Mode Gelap" : "Mode Terang"}
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Pengaturan ini hanya berlaku untuk sesi browsing Anda saat ini.
          </p>
        </div>
      )}
    </>
  )
}
