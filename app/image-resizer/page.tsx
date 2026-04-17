"use client"

import { useState, useRef } from "react"
import { Upload, Download, Image as ImageIcon, Maximize2 } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

type ResizeMode = "pixels" | "percentage"

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string>("")
  const [resizedUrl, setResizedUrl] = useState<string>("")
  const [mode, setMode] = useState<ResizeMode>("pixels")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [percentage, setPercentage] = useState("50")
  const [maintainAspect, setMaintainAspect] = useState(true)
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [resizedDimensions, setResizedDimensions] = useState({ width: 0, height: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    setFile(selectedFile)
    const url = URL.createObjectURL(selectedFile)
    setOriginalUrl(url)

    const img = new Image()
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height })
      setWidth(img.width.toString())
      setHeight(img.height.toString())
    }
    img.src = url
  }

  const resizeImage = () => {
    if (!file || !originalUrl) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      let newWidth = img.width
      let newHeight = img.height

      if (mode === "percentage") {
        const pct = parseFloat(percentage) / 100
        newWidth = Math.round(img.width * pct)
        newHeight = Math.round(img.height * pct)
      } else {
        newWidth = parseInt(width) || img.width
        newHeight = parseInt(height) || img.height
      }

      canvas.width = newWidth
      canvas.height = newHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      canvas.toBlob((blob) => {
        if (blob) {
          setResizedUrl(URL.createObjectURL(blob))
          setResizedDimensions({ width: newWidth, height: newHeight })
        }
      }, file.type)
    }
    img.src = originalUrl
  }

  const handleDownload = () => {
    if (!resizedUrl) return
    const a = document.createElement("a")
    a.href = resizedUrl
    a.download = `resized_${file?.name || "image"}`
    a.click()
  }

  const handleWidthChange = (value: string) => {
    setWidth(value)
    if (maintainAspect && originalDimensions.width > 0) {
      const newWidth = parseInt(value) || 0
      const aspectRatio = originalDimensions.height / originalDimensions.width
      setHeight(Math.round(newWidth * aspectRatio).toString())
    }
  }

  const handleHeightChange = (value: string) => {
    setHeight(value)
    if (maintainAspect && originalDimensions.height > 0) {
      const newHeight = parseInt(value) || 0
      const aspectRatio = originalDimensions.width / originalDimensions.height
      setWidth(Math.round(newHeight * aspectRatio).toString())
    }
  }

  return (
    <ToolPageLayout
      title="Image Resizer"
      description="Resize images to specific dimensions or by percentage. Maintain aspect ratio option available."
      category="Utility"
      relatedTools={[
        {
          title: "Image Compressor",
          description: "Compress images and reduce file size.",
          href: "/image-compressor",
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
            accept="image/jpeg,image/png,image/webp,image/gif"
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
              JPEG, PNG, WebP, or GIF
            </p>
          </div>
        </div>

        {/* Original Dimensions */}
        {file && (
          <div className="mb-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Original size: <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {originalDimensions.width} × {originalDimensions.height}px
              </span>
            </p>
          </div>
        )}

        {/* Resize Options */}
        {file && !resizedUrl && (
          <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setMode("pixels")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === "pixels"
                    ? "bg-sky-500 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <Maximize2 className="w-4 h-4 inline mr-2" />
                Pixels
              </button>
              <button
                onClick={() => setMode("percentage")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === "percentage"
                    ? "bg-sky-500 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                Percentage
              </button>
            </div>

            {/* Pixels Mode */}
            {mode === "pixels" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    placeholder="800"
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    placeholder="600"
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Scale: {percentage}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  <span>1%</span>
                  <span>100%</span>
                  <span>200%</span>
                </div>
                <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  New size: {Math.round(originalDimensions.width * (parseFloat(percentage) / 100))} × {Math.round(originalDimensions.height * (parseFloat(percentage) / 100))}px
                </div>
              </div>
            )}

            {/* Maintain Aspect Ratio */}
            {mode === "pixels" && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintainAspect}
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                  className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Maintain aspect ratio
                </span>
              </label>
            )}

            {/* Resize Button */}
            <button
              onClick={resizeImage}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Maximize2 className="w-5 h-5" />
              Resize Image
            </button>
          </div>
        )}

        {/* Results */}
        {resizedUrl && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Resized Image</p>
              <img
                src={resizedUrl}
                alt="Resized"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
              />
            </div>

            <div className="bg-sky-50 dark:bg-sky-950/30 rounded-xl p-6 border border-sky-100 dark:border-sky-900/30">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Original Size</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {originalDimensions.width} × {originalDimensions.height}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">New Size</p>
                  <p className="text-lg font-bold text-sky-500">
                    {resizedDimensions.width} × {resizedDimensions.height}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resized Image
            </button>

            <button
              onClick={() => {
                setResizedUrl("")
                setResizedDimensions({ width: 0, height: 0 })
              }}
              className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors"
            >
              Resize Again
            </button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  )
}
