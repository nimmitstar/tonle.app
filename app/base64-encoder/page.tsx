"use client"

import { useState } from "react"
import { Binary, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function Base64EncoderPage() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState(false)

  const output = mode === "encode"
    ? btoa(input)
    : (() => {
        try {
          return atob(input)
        } catch {
          return "Error: Invalid Base64 string"
        }
      })()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(String(output))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Base64 Encoder/Decoder
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Encode and decode text to and from Base64 format instantly
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode("encode")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                mode === "encode"
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                mode === "decode"
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Decode
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              {mode === "encode" ? "Plain Text" : "Base64 String"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
              className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </h2>
            {output && output !== "Error: Invalid Base64 string" && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
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
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg min-h-[100px] break-all">
            {output || (
              <span className="text-zinc-400">
                {mode === "encode" ? "Base64 output will appear here" : "Decoded text will appear here"}
              </span>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/url-encoder"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              URL Encoder
            </Link>
            <Link
              href="/json-formatter"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              JSON Formatter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
