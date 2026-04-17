"use client"

import { useState, useMemo } from "react"
import { Type } from "lucide-react"
import Link from "next/link"

export default function CharacterCounterPage() {
  const [text, setText] = useState("")

  const stats = useMemo(() => {
    const total = text.length
    const noSpaces = text.replace(/\s/g, "").length
    const letters = (text.match(/[a-zA-Z]/g) || []).length
    const numbers = (text.match(/[0-9]/g) || []).length
    const spaces = (text.match(/\s/g) || []).length

    const letterFreq: Record<string, number> = {}
    for (const char of text.toLowerCase()) {
      if (char.match(/[a-z]/)) {
        letterFreq[char] = (letterFreq[char] || 0) + 1
      }
    }

    return { total, noSpaces, letters, numbers, spaces, letterFreq }
  }, [text])

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Character Counter
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Count characters with and without spaces, plus letter frequency analysis
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Characters</p>
            <p className="text-3xl font-bold text-sky-500">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Without Spaces</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.noSpaces}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Letters</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.letters}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Numbers</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.numbers}</p>
          </div>
        </div>

        {Object.keys(stats.letterFreq).length > 0 && (
          <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Letter Frequency
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.letterFreq)
                .sort(([, a], [, b]) => b - a)
                .map(([letter, count]) => (
                  <div
                    key={letter}
                    className="px-3 py-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg text-center min-w-[60px]"
                  >
                    <span className="text-lg font-bold text-sky-600 dark:text-sky-400 uppercase">
                      {letter}
                    </span>
                    <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-400">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

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
