"use client"

import { useState } from "react"
import { Code, Copy, Check, Minimize2, Maximize2, Binary, Globe } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function JSONFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [minified, setMinified] = useState("")

  const formatJSON = () => {
    setError("")
    setOutput("")

    if (!input.trim()) {
      setError("Please enter some JSON to format")
      return
    }

    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setMinified(JSON.stringify(parsed))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON")
    }
  }

  const minifyJSON = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to minify")
      return
    }

    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setMinified(JSON.stringify(parsed))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON")
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Format, validate, and beautify JSON with syntax highlighting."
      category="Developer"
      relatedTools={[
        {
          title: "Base64 Encoder",
          description: "Encode and decode text to and from Base64 format instantly.",
          href: "/base64-encoder",
          icon: Binary,
          category: "Developer",
        },
        {
          title: "URL Encoder",
          description: "Encode and decode URLs and query strings safely.",
          href: "/url-encoder",
          icon: Globe,
          category: "Developer",
        },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 dark:divide-zinc-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Input</h2>
            <button
              onClick={() => setInput("")}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... {"example": "value"}'
            className="w-full h-80 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
          />
          <div className="mt-4 flex gap-3">
            <button
              onClick={formatJSON}
              className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              Format
            </button>
            <button
              onClick={minifyJSON}
              className="flex-1 px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Minimize2 className="w-4 h-4" />
              Minify
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Output</h2>
            {output && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-500" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          {error && (
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-500 font-medium">Invalid JSON</p>
                <p className="text-sm text-red-400 mt-1">{error}</p>
              </div>
            </div>
          )}

          {!error && !output && (
            <div className="h-80 flex items-center justify-center text-zinc-400">
              Formatted JSON will appear here
            </div>
          )}

          {!error && output && (
            <pre className="h-80 overflow-auto p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm">
              <code className="text-zinc-900 dark:text-zinc-100">{output}</code>
            </pre>
          )}
        </div>
      </div>
    </ToolPageLayout>
  )
}
