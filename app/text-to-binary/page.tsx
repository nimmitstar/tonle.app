"use client"

import { useState } from "react"
import { Binary, ArrowRight, ArrowLeft, Copy, Check, RotateCcw, BookOpen } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { formatDate } from "@/lib/export"

function textToBinary(text: string): string {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0)
      return code.toString(2).padStart(8, "0")
    })
    .join(" ")
}

function binaryToText(binary: string): string {
  return binary
    .trim()
    .split(/\s+/)
    .map((bin) => String.fromCharCode(parseInt(bin, 2)))
    .join("")
}

const asciiTable = [
  { char: "A", code: 65, binary: "01000001" },
  { char: "B", code: 66, binary: "01000010" },
  { char: "C", code: 67, binary: "01000011" },
  { char: "a", code: 97, binary: "01100001" },
  { char: "b", code: 98, binary: "01100010" },
  { char: "c", code: 99, binary: "01100011" },
  { char: "0", code: 48, binary: "00110000" },
  { char: "1", code: 49, binary: "00110001" },
  { char: " ", code: 32, binary: "00100000", label: "Space" },
  { char: "\n", code: 10, binary: "00001010", label: "Newline" },
]

export default function TextToBinaryPage() {
  const [textInput, setTextInput] = useState("")
  const [binaryInput, setBinaryInput] = useState("")
  const [binaryOutput, setBinaryOutput] = useState("")
  const [textOutput, setTextOutput] = useState("")
  const [mode, setMode] = useState<"text-to-binary" | "binary-to-text">("text-to-binary")
  const [copied, setCopied] = useState(false)

  // Text to Binary conversion
  const handleTextToBinary = () => {
    if (!textInput) {
      setBinaryOutput("")
      return
    }
    setBinaryOutput(textToBinary(textInput))
  }

  // Binary to Text conversion
  const handleBinaryToText = () => {
    if (!binaryInput) {
      setTextOutput("")
      return
    }
    try {
      setTextOutput(binaryToText(binaryInput))
    } catch {
      setTextOutput("Error: Invalid binary input")
    }
  }

  // Auto-convert on input
  const handleTextInput = (value: string) => {
    setTextInput(value)
    setBinaryOutput(value ? textToBinary(value) : "")
  }

  const handleBinaryInput = (value: string) => {
    // Only allow 0, 1, and spaces
    const sanitized = value.replace(/[^01\s]/g, "")
    setBinaryInput(sanitized)
    try {
      setTextOutput(sanitized.trim() ? binaryToText(sanitized) : "")
    } catch {
      setTextOutput("")
    }
  }

  const copyOutput = async () => {
    const toCopy = mode === "text-to-binary" ? binaryOutput : textOutput
    if (!toCopy) return
    await navigator.clipboard.writeText(toCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setTextInput("")
    setBinaryInput("")
    setBinaryOutput("")
    setTextOutput("")
  }

  return (
    <ToolPageLayout
      title="Text to Binary Converter"
      description="Convert text to binary and vice versa. Includes ASCII reference table for common characters."
      category="Developer"
      relatedTools={[
        {
          title: "Base64 Encoder",
          description: "Encode and decode text to and from Base64 format.",
          href: "/base64-encoder",
          icon: Binary,
          category: "Developer",
        },
        {
          title: "Number Base Converter",
          description: "Convert numbers between decimal, binary, octal, and hexadecimal.",
          href: "/number-base-converter",
          icon: Binary,
          category: "Developer",
        },
      ]}
    >
      <div className="p-6">
        {/* Mode Toggle */}
        <div className="mb-6">
          <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <button
              onClick={() => setMode("text-to-binary")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                mode === "text-to-binary"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Text to Binary
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMode("binary-to-text")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                mode === "binary-to-text"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Binary to Text
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Text to Binary Mode */}
        {mode === "text-to-binary" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Text Input
              </label>
              <textarea
                value={textInput}
                onChange={(e) => handleTextInput(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
              />
            </div>

            {binaryOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Binary Output
                  </label>
                  <button
                    onClick={copyOutput}
                    className="flex items-center gap-1 text-sm text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 bg-zinc-900 rounded-lg">
                  <code className="text-sm text-green-400 font-mono break-all whitespace-pre-wrap">
                    {binaryOutput}
                  </code>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Binary to Text Mode */}
        {mode === "binary-to-text" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Binary Input (8-bit separated by spaces)
              </label>
              <textarea
                value={binaryInput}
                onChange={(e) => handleBinaryInput(e.target.value)}
                placeholder="01001000 01100101 01101100 01101100 01101111..."
                className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
              />
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Enter 8-bit binary numbers separated by spaces (e.g., 01001000 01100101)
              </p>
            </div>

            {textOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Text Output
                  </label>
                  <button
                    onClick={copyOutput}
                    className="flex items-center gap-1 text-sm text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <p className="text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">{textOutput}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Clear Button */}
        {(textInput || binaryInput || binaryOutput || textOutput) && (
          <button
            onClick={clearAll}
            className="mt-4 w-full py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All
          </button>
        )}

        {/* ASCII Reference Table */}
        <details className="mt-8">
          <summary className="cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            ASCII Reference Table
          </summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-100 dark:bg-zinc-800">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300">Character</th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300">Decimal</th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300">Binary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {asciiTable.map((item) => (
                  <tr key={item.code}>
                    <td className="px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono">
                      {item.label || item.char}
                    </td>
                    <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400 font-mono">{item.code}</td>
                    <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400 font-mono">{item.binary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              Each character is represented by 8 bits (1 byte) in standard ASCII encoding.
            </p>
          </div>
        </details>
        {(binaryOutput || textOutput) && (
          <ExportButtons
            data={{
              title: "Text to Binary Converter",
              date: formatDate(),
              headers: ["Conversion", "Result"],
              rows: mode === "text-to-binary" ? [
                ["Mode", "Text to Binary"],
                ["Input Length", textInput.length.toString()],
                ["Binary Output Length", binaryOutput.length.toString()]
              ] : [
                ["Mode", "Binary to Text"],
                ["Binary Input Length", binaryInput.length.toString()],
                ["Text Output", textOutput]
              ],
              filename: "text-to-binary"
            }}
          />
        )}
      </div>
    </ToolPageLayout>
  )
}
