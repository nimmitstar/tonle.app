"use client"

import { useState } from "react"
import { FileText, Type, Heading1 } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function WordCounterPage() {
  const [text, setText] = useState("")

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, "").length
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length
  const readingTime = Math.ceil(words / 200)

  return (
    <ToolPageLayout
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and estimate reading time."
      category="Word Tools"
      relatedTools={[
        {
          title: "Character Counter",
          description: "Count characters with and without spaces, plus letter frequency analysis.",
          href: "/character-counter",
          icon: Type,
          category: "Word Tools",
        },
        {
          title: "Case Converter",
          description: "Convert text to uppercase, lowercase, title case, sentence case, or toggle case.",
          href: "/case-converter",
          icon: Heading1,
          category: "Word Tools",
        },
      ]}
    >
      <div className="p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Words</p>
            <p className="text-3xl font-bold text-sky-500">{words}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Characters</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{characters}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">No Spaces</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{charactersNoSpaces}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Sentences</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{sentences}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Paragraphs</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{paragraphs}</p>
          </div>
        </div>
      </div>

      {readingTime > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Estimated Reading Time</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {readingTime} minute{readingTime !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </ToolPageLayout>
  )
}
