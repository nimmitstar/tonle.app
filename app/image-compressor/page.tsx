"use client"

import { useState, useRef } from "react"
import { Upload, Download, Image as ImageIcon, Zap } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string>("")
  const [compressedUrl, setCompressedUrl] = useState<string>("")
  const [quality, setQuality] = useState(80)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [compressing, setCompressing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    setFile(selectedFile)
    setOriginalSize(selectedFile.size)
    setOriginalUrl(URL.createObjectURL(selectedFile))
    setCompressedUrl("")
    setCompressedSize(0)
  }

  const compressImage = () => {
    if (!file) return

    setCompressing(true)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        setCompressing(false)
        return
      }

      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedUrl(URL.createObjectURL(blob))
            setCompressedSize(blob.size)
          }
          setCompressing(false)
        },
        file.type,
        quality / 100
      )
    }
    img.src = originalUrl
  }

  const handleDownload = () => {
    if (!compressedUrl) return
    const a = document.createElement("a")
    a.href = compressedUrl
    a.download = `compressed_${file?.name || "image"}`
    a.click()
  }

  const savings = originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0

  return (
    <ToolPageLayout
      title="Image Compressor"
      description="Compress images online with adjustable quality. Reduce file size while maintaining quality. Supports JPEG, PNG, and WebP."
      category="Utility"
      relatedTools={[
        {
          title: "Image Resizer",
          description: "Resize images to specific dimensions or percentage.",
          href: "/image-resizer",
          icon: ImageIcon,
          category: "Utility",
        },
      ]}
    >
      <div className="p-6">
        {/* Upload Area */}
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
          >
            <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              JPEG, PNG, or WebP (max 10MB)
            </p>
          </div>
        </div>

        {/* Quality Slider */}
        {file && !compressedUrl && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>

            <button
              onClick={compressImage}
              disabled={compressing}
              className="mt-4 w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {compressing ? (
                <>
                  <Zap className="w-5 h-5 animate-pulse" />
                  Compressing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Compress Image
                </>
              )}
            </button>
          </div>
        )}

        {/* Results */}
        {compressedUrl && (
          <div className="space-y-6">
            {/* Before/After Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Original</p>
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  {formatBytes(originalSize)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Compressed</p>
                <img
                  src={compressedUrl}
                  alt="Compressed"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  {formatBytes(compressedSize)}
                </p>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-6 border border-emerald-100 dark:border-emerald-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">File size reduced by</p>
                  <p className="text-3xl font-bold text-emerald-500">{savings.toFixed(1)}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Saved</p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {formatBytes(originalSize - compressedSize)}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Compressed Image
            </button>

            {/* Compress Again */}
            <button
              onClick={() => {
                setCompressedUrl("")
                setCompressedSize(0)
              }}
              className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors"
            >
              Adjust Quality & Compress Again
            </button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  )
}
