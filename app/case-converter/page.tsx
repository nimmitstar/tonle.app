"use client"

import { useState } from "react"
import { Heading1, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function CaseConverterPage() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const upper = text.toUpperCase()
  const lower = text.toLowerCase()
  const title = text
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
  const sentence = text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
  const toggle = text
    .split("")
    .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
    .join("")

  const copyToClipboard = async (content: string, type: string) => {
    await navigator.clipboard.writeText(content)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const ResultCard = ({ title, content, type }: { title: string; content: string; type: string }) => (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
        <button
          onClick={() => copyToClipboard(content, type)}
          className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Copy"
        >
          {copied === type ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-500" />
          )}
        </button>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 break-all">{content || "—"}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Case Converter
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Convert text to uppercase, lowercase, title case, sentence case, or toggle case
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="mt-8 space-y-4">
          <ResultCard title="UPPERCASE" content={upper} type="upper" />
          <ResultCard title="lowercase" content={lower} type="lower" />
          <ResultCard title="Title Case" content={title} type="title" />
          <ResultCard title="Sentence case" content={sentence} type="sentence" />
          <ResultCard title="tOgGlE cAsE" content={toggle} type="toggle" />
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
            <Link
              href="/character-counter"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Character Counter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
