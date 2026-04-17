"use client"

import { useState } from "react"
import { AlignLeft, Copy, Check } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { AffiliateCard } from "@/components/affiliate-card"
import { ShareButtons } from "@/components/share-buttons"

export default function TextWrapRemoverPage() {
  const [input, setInput] = useState("")
  const [option, setOption] = useState<"all" | "double" | "trailing">("all")
  const [copied, setCopied] = useState(false)

  const processText = (text: string, opt: typeof option): string => {
    switch (opt) {
      case "all":
        // Remove all line breaks
        return text.replace(/\r?\n/g, " ")
      case "double":
        // Remove double line breaks, keep single
        return text.replace(/\r?\n\r?\n/g, "\n")
      case "trailing":
        // Remove trailing whitespace from each line
        return text.split("\n").map(line => line.trimEnd()).join("\n")
      default:
        return text
    }
  }

  const output = processText(input, option)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = {
    originalLines: input ? input.split("\n").length : 0,
    originalChars: input.length,
    resultLines: output ? output.split("\n").length : 0,
    resultChars: output.length
  }

  return (
    <ToolPageLayout
      title="Text Wrap Remover"
      description="Remove unwanted line breaks and text wrapping. Clean up text from PDFs, emails, and formatted documents."
      category="Word Tools"
      relatedTools={[
        {
          title: "Case Converter",
          description: "Convert text to uppercase, lowercase, title case, sentence case, or toggle case.",
          href: "/case-converter",
          icon: AlignLeft,
          category: "Word Tools",
        },
        {
          title: "Word Counter",
          description: "Count words, characters, sentences, paragraphs, and estimate reading time.",
          href: "/word-counter",
          icon: AlignLeft,
          category: "Word Tools",
        },
      ]}
    >
      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Cleaning Option
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setOption("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                option === "all"
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              Remove All Line Breaks
            </button>
            <button
              onClick={() => setOption("double")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                option === "double"
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              Remove Double Line Breaks
            </button>
            <button
              onClick={() => setOption("trailing")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                option === "trailing"
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              Remove Trailing Whitespace
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text here with line breaks or wrapping..."
              className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none font-mono text-sm"
            />
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {stats.originalLines} lines · {stats.originalChars} characters
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Result
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 resize-none font-mono text-sm"
              />
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {stats.resultLines} lines · {stats.resultChars} characters
            </div>
          </div>
        </div>
      </div>

      {output && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <ShareButtons toolName="Text Wrap Remover" result={`Processed ${stats.originalChars} → ${stats.resultChars} chars`} />
        </div>
      )}

      <AffiliateCard
        description="Need more text tools?"
        linkText="Explore all word tools"
        href="/#tools"
      />
    </ToolPageLayout>
  )
}
