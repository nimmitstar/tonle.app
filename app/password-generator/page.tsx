"use client"

import { useState, useMemo } from "react"
import { Lock, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState("16")
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const chars = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  }

  const password = useMemo(() => {
    let charset = ""
    if (uppercase) charset += chars.uppercase
    if (lowercase) charset += chars.lowercase
    if (numbers) charset += chars.numbers
    if (symbols) charset += chars.symbols

    if (charset.length === 0) return ""

    let result = ""
    const len = Math.max(1, Math.min(128, parseInt(length) || 16))
    const array = new Uint32Array(len)
    crypto.getRandomValues(array)
    for (let i = 0; i < len; i++) {
      result += charset[array[i] % charset.length]
    }
    return result
  }, [length, uppercase, lowercase, numbers, symbols])

  const strength = useMemo(() => {
    let score = 0
    const len = password.length
    if (len >= 8) score += 1
    if (len >= 12) score += 1
    if (len >= 16) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^a-zA-Z0-9]/.test(password)) score += 1

    if (score <= 2) return { label: "Weak", color: "bg-red-500", percent: 25 }
    if (score <= 4) return { label: "Fair", color: "bg-yellow-500", percent: 50 }
    if (score <= 5) return { label: "Good", color: "bg-sky-500", percent: 75 }
    return { label: "Strong", color: "bg-green-500", percent: 100 }
  }, [password])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Password Generator
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Create secure random passwords with customizable options
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <code className="flex-1 text-lg font-mono text-zinc-900 dark:text-zinc-100 break-all">
                {password || "Select at least one character type"}
              </code>
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Copy password"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-zinc-500" />
                )}
              </button>
            </div>

            {password && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-600 dark:text-zinc-400">Strength</span>
                  <span className={`font-medium ${strength.color.replace("bg-", "text-")}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all`}
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Password Length: {length}
              </label>
              <input
                type="range"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min="4"
                max="128"
                className="w-full accent-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-5 h-5 accent-sky-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-5 h-5 accent-sky-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Lowercase (a-z)</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="w-5 h-5 accent-sky-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="w-5 h-5 accent-sky-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Symbols (!@#$)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/word-counter"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Word Counter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
