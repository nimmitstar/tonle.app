"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import Link from "next/link"

export default function WordCounterPage() {
  const [text, setText] = useState("")

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, "").length
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length
  const readingTime = Math.ceil(words / 200) // 200 words per minute average

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Word Counter
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Count words, characters, sentences, paragraphs, and estimate reading time
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

        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Words</p>
            <p className="text-3xl font-bold text-sky-500">{words}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Characters</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{characters}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">No Spaces</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{charactersNoSpaces}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Sentences</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{sentences}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Paragraphs</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{paragraphs}</p>
          </div>
        </div>

        {readingTime > 0 && (
          <div className="mt-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Estimated Reading Time</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {readingTime} minute{readingTime !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/character-counter"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Character Counter
            </Link>
            <Link
              href="/case-converter"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Case Converter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
