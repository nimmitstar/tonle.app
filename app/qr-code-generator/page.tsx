"use client"

import { useState, useRef, useEffect } from "react"
import { QrCode, Download, Copy, Check } from "lucide-react"
import QRCode from "qrcode"
import Link from "next/link"

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState("https://tonle.app")
  const [qrUrl, setQrUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    generateQR()
  }, [text])

  const generateQR = async () => {
    if (!text.trim()) {
      setQrUrl("")
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    try {
      await QRCode.toCanvas(canvas, text, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      setQrUrl(canvas.toDataURL())
    } catch {
      setQrUrl("")
    }
  }

  const downloadQR = () => {
    if (!qrUrl) return
    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = qrUrl
    link.click()
  }

  const copyToClipboard = async () => {
    if (!qrUrl) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            QR Code Generator
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Generate QR codes for URLs, text, and contact information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Enter URL or Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
            />

            <div className="mt-4">
              <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Quick Examples
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setText("https://tonle.app")}
                  className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Website URL
                </button>
                <button
                  onClick={() => setText("WIFI:S:MyNetwork;T:WPA;P:password;;")}
                  className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  WiFi
                </button>
                <button
                  onClick={() => setText("mailto:hello@example.com")}
                  className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Email
                </button>
                <button
                  onClick={() => setText("tel:+1234567890")}
                  className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Phone
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
                QR Code
              </h2>
              {qrUrl && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Copy text"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-zinc-500" />
                    )}
                  </button>
                  <button
                    onClick={downloadQR}
                    className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Download PNG"
                  >
                    <Download className="w-5 h-5 text-zinc-500" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center min-h-[300px] bg-white rounded-lg">
              {text.trim() ? (
                <canvas ref={canvasRef} className="max-w-full" />
              ) : (
                <div className="text-center text-zinc-400">
                  <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p>Enter text to generate QR code</p>
                </div>
              )}
            </div>

            {text.trim() && (
              <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 break-all font-mono">
                  {text}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">WiFi QR Code Format</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">
            WIFI:S:YourSSID;T:WPA;P:YourPassword;;
          </p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            Replace YourSSID and YourPassword with your actual network details.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/color-converter"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Color Converter
            </Link>
            <Link
              href="/base64-encoder"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Base64 Encoder
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
