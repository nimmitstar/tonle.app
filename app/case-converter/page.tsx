"use client"

import { useState } from "react"
import { Heading1, Copy, Check, FileText, Type } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

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

  return (
    <ToolPageLayout
      title="Case Converter"
      description="Convert text to uppercase, lowercase, title case, sentence case, or toggle case."
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
          title: "Character Counter",
          description: "Count characters with and without spaces, plus letter frequency analysis.",
          href: "/character-counter",
          icon: Type,
          category: "Word Tools",
        },
      ]}
    >
      <div className="p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
        {[
          { title: "UPPERCASE", content: upper, type: "upper" },
          { title: "lowercase", content: lower, type: "lower" },
          { title: "Title Case", content: title, type: "title" },
          { title: "Sentence case", content: sentence, type: "sentence" },
          { title: "tOgGlE cAsE", content: toggle, type: "toggle" },
        ].map((item) => (
          <div key={item.type} className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <button
                onClick={() => copyToClipboard(item.content, item.type)}
                className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Copy"
              >
                {copied === item.type ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-500" />
                )}
              </button>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 break-all">{item.content || "—"}</p>
          </div>
        ))}
      </div>
    </ToolPageLayout>
  )
}
