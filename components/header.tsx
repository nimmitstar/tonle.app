"use client"

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Tonle
            </span>
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-zinc-700" />
            ) : (
              <Sun className="w-5 h-5 text-zinc-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
