"use client"

import { useState, useMemo } from "react"
import { Type, FileText, Heading1 } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

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
    <ToolPageLayout
      title="Character Counter"
      description="Count characters with and without spaces, plus letter frequency analysis."
      category="Word Tools"
      relatedTools={[
        {
          title: "Word Counter",
          description: "Count words, characters, sentences, paragraphs, and estimate reading time.",
          href: "/word-counter",
          icon: FileText,
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Characters</p>
            <p className="text-3xl font-bold text-sky-500">{stats.total}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Without Spaces</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.noSpaces}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Letters</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.letters}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Numbers</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.numbers}</p>
          </div>
        </div>
      </div>

      {Object.keys(stats.letterFreq).length > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
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
      <ExportButtons
        data={{
          title: "Character Counter",
          date: formatDate(),
          headers: ["Metric", "Count"],
          rows: [
            ["Total Characters", stats.total.toString()],
            ["Without Spaces", stats.noSpaces.toString()],
            ["Letters", stats.letters.toString()],
            ["Numbers", stats.numbers.toString()],
            ["Spaces", stats.spaces.toString()]
          ],
          filename: "character-counter"
        }}
      />
      <ShareButtons toolName="Character Counter" />
    </ToolPageLayout>
  )
}
