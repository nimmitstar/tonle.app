"use client"

import { useState } from "react"
import { Globe, Copy, Check, Binary } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function URLEncoderPage() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState(false)

  const output = mode === "encode"
    ? encodeURIComponent(input)
    : decodeURIComponent(input)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolPageLayout
      title="URL Encoder/Decoder"
      description="Encode and decode URLs and query strings safely."
      category="Developer"
      relatedTools={[
        {
          title: "Base64 Encoder",
          description: "Encode and decode text to and from Base64 format instantly.",
          href: "/base64-encoder",
          icon: Binary,
          category: "Developer",
        },
      ]}
    >
      <div className="p-6">
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
            {mode === "encode" ? "Original URL/Text" : "Encoded URL"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "https://example.com/search?q=hello world" : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"}
            className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none font-mono text-sm"
          />
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
            {mode === "encode" ? "Encoded URL" : "Decoded URL"}
          </h2>
          {output && (
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
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg min-h-[100px] break-all font-mono text-sm">
          {output || (
            <span className="text-zinc-400">
              {mode === "encode" ? "Encoded URL will appear here" : "Decoded URL will appear here"}
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Common Encodings</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm font-mono text-zinc-600 dark:text-zinc-400">
          <div>Space → %20</div>
          <div>/ → %2F</div>
          <div>? → %3F</div>
          <div>= → %3D</div>
          <div>& → %26</div>
        </div>
      </div>
    </ToolPageLayout>
  )
}
