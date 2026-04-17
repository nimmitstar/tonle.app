"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

const DISMISSAL_KEY = "sticky-footer-ad-dismissed"

export function StickyFooterAd() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if previously dismissed
    if (typeof window !== "undefined") {
      const wasDismissed = localStorage.getItem(DISMISSAL_KEY)
      if (wasDismissed) {
        setDismissed(true)
        return
      }

      // Show after scrolling 300px
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setVisible(true)
        }
      }

      window.addEventListener("scroll", handleScroll)
      handleScroll() // Check on mount

      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    if (typeof window !== "undefined") {
      localStorage.setItem(DISMISSAL_KEY, "true")
    }
  }

  if (dismissed || !visible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shadow-lg">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
        aria-label="Close ad"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", minWidth: 320, maxWidth: 728, width: "100%", height: 50 }}
          data-ad-client="ca-pub-5606686439630593"
          data-ad-slot="9163997732"
          data-ad-format="horizontal"
        />
      </div>
    </div>
  )
}
