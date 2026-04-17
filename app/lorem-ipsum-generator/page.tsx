"use client"

import { useState } from "react"
import { AlignLeft, Copy, Check, FileText } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
]

export default function LoremIpsumGeneratorPage() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs")
  const [count, setCount] = useState("3")
  const [generated, setGenerated] = useState("")
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const n = Math.max(1, Math.min(100, parseInt(count) || 3))
    let result = ""

    if (type === "words") {
      const words = []
      for (let i = 0; i < n; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
      }
      result = words.join(" ")
      result = result.charAt(0).toUpperCase() + result.slice(1) + "."
    } else if (type === "sentences") {
      const sentences = []
      for (let i = 0; i < n; i++) {
        const wordsPerSentence = Math.floor(Math.random() * 10) + 5
        const words = []
        for (let j = 0; j < wordsPerSentence; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
        }
        const sentence = words.join(" ")
        sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".")
      }
      result = sentences.join(" ")
    } else {
      const paragraphs = []
      for (let i = 0; i < n; i++) {
        const sentencesPerParagraph = Math.floor(Math.random() * 4) + 4
        const sentences = []
        for (let j = 0; j < sentencesPerParagraph; j++) {
          const wordsPerSentence = Math.floor(Math.random() * 10) + 5
          const words = []
          for (let k = 0; k < wordsPerSentence; k++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
          }
          const sentence = words.join(" ")
          sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".")
        }
        paragraphs.push(sentences.join(" "))
      }
      result = paragraphs.join("\n\n")
    }

    setGenerated(result)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolPageLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder lorem ipsum text for your designs and mockups."
      category="Word Tools"
      relatedTools={[
        {
          title: "Word Counter",
          description: "Count words, characters, sentences, paragraphs, and estimate reading time.",
          href: "/word-counter",
          icon: FileText,
          category: "Word Tools",
        },
      ]}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Amount (1-100)
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="3"
              min="1"
              max="100"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={generate}
              className="w-full px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {generated && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Generated Text
            </h2>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
            {generated}
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
