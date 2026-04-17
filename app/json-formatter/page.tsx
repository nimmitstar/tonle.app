"use client"

import { useState } from "react"
import { Code, Copy, Check, Minimize2, Maximize2 } from "lucide-react"
import Link from "next/link"

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            JSON Formatter
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Format, validate, and beautify JSON with syntax highlighting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
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

          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
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

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/base64-encoder"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Base64 Encoder
            </Link>
            <Link
              href="/url-encoder"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              URL Encoder
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
