"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Camera, ScanLine, Copy, Check } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { Html5Qrcode } from "html5-qrcode"

export default function QrCodeReaderPage() {
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [scanning, setScanning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<"file" | "camera">("file")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const containerId = "qr-reader"

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

  const startCamera = async () => {
    setMode("camera")
    setScanning(true)
    setError("")

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(containerId)
      }

      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setResult(decodedText)
          setScanning(false)
          scannerRef.current?.stop().catch(() => {})
        },
        () => {}
      )
    } catch (err) {
      setError("Could not access camera. Please check permissions.")
      setScanning(false)
    }
  }

  const stopCamera = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
      } catch {}
    }
    setScanning(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    setResult("")

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(containerId)
      }

      const decodedText = await scannerRef.current.scanFile(file, true)
      setResult(decodedText)
    } catch (err) {
      setError("No QR code found in the image. Please try another image.")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setResult("")
    setError("")
    setMode("file")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isUrl = (text: string) => {
    try {
      new URL(text)
      return true
    } catch {
      return false
    }
  }

  return (
    <ToolPageLayout
      title="QR Code Reader"
      description="Scan QR codes using your camera or upload an image. Instantly decode URLs, text, and other data."
      category="Developer"
      relatedTools={[
        {
          title: "QR Code Generator",
          description: "Generate QR codes for URLs, text, and contact information.",
          href: "/qr-code-generator",
          icon: ScanLine,
          category: "Developer",
        },
      ]}
    >
      <div className="p-6">
        {!result ? (
          <div className="space-y-6">
            {/* Mode Selection */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMode("file")
                  stopCamera()
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                  mode === "file"
                    ? "bg-sky-500 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Upload Image
              </button>
              <button
                onClick={() => {
                  if (scanning) {
                    stopCamera()
                  } else {
                    startCamera()
                  }
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                  mode === "camera" && scanning
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : mode === "camera"
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-sky-100 dark:hover:bg-sky-900/30"
                }`}
              >
                <Camera className="w-5 h-5 inline mr-2" />
                {scanning ? "Stop Camera" : "Use Camera"}
              </button>
            </div>

            {/* File Upload Mode */}
            {mode === "file" && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-12 text-center cursor-pointer hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
                >
                  <Upload className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                  <p className="text-zinc-700 dark:text-zinc-300 font-medium text-lg mb-2">
                    Upload QR Code Image
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    PNG, JPG, or WebP
                  </p>
                </div>
              </div>
            )}

            {/* Camera Mode */}
            {mode === "camera" && (
              <div className="space-y-4">
                <div id={containerId} className="rounded-xl overflow-hidden" />
                {scanning && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    Point your camera at a QR code to scan
                  </p>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>
        ) : (
          /* Result */
          <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-6 border border-emerald-100 dark:border-emerald-900/30">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">QR Code Content:</p>
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 break-all">
                <p className="text-zinc-900 dark:text-zinc-100">{result}</p>
              </div>
              {isUrl(result) && (
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Open Link
                </a>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy to Clipboard
                  </>
                )}
              </button>
              <button
                onClick={reset}
                className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors"
              >
                Scan Another
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  )
}
