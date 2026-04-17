"use client"

import { useState, useRef } from "react"
import { Upload, Download, Image as ImageIcon, Crop, RotateCw } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import ReactCrop, { type Crop as CropType } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

export default function ImageCropperPage() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [crop, setCrop] = useState<CropType>({ unit: "%", width: 50, height: 50, x: 25, y: 25 })
  const [completedCrop, setCompletedCrop] = useState<CropType | null>(null)
  const [croppedUrl, setCroppedUrl] = useState<string>("")
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined)
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null)
  const [croppedDimensions, setCroppedDimensions] = useState<{ width: number; height: number } | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    setFile(selectedFile)
    setImageUrl(URL.createObjectURL(selectedFile))
    setCroppedUrl("")
    setCompletedCrop(null)
    setCrop({ unit: "%", width: 50, height: 50, x: 25, y: 25 })
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    setOriginalDimensions({ width: target.naturalWidth, height: target.naturalHeight })
  }

  const handleCrop = () => {
    if (!completedCrop || !imgRef.current) return

    const image = imgRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = completedCrop.width || 0
    canvas.height = completedCrop.height || 0

    if (completedCrop.x !== undefined && completedCrop.y !== undefined) {
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        (completedCrop.width || 0) * scaleX,
        (completedCrop.height || 0) * scaleY,
        0,
        0,
        completedCrop.width || 0,
        completedCrop.height || 0
      )
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        setCroppedUrl(url)
        setCroppedDimensions({ width: canvas.width, height: canvas.height })
      }
    }, file?.type || "image/png")
  }

  const handleDownload = () => {
    if (!croppedUrl) return
    const a = document.createElement("a")
    a.href = croppedUrl
    a.download = `cropped_${file?.name || "image"}`
    a.click()
  }

  const aspectRatios = [
    { label: "Free", value: undefined },
    { label: "1:1", value: 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "16:9", value: 16 / 9 },
    { label: "3:2", value: 3 / 2 },
  ]

  return (
    <ToolPageLayout
      title="Image Cropper"
      description="Crop images online with precision. Select aspect ratio or free-form crop, preview results, and download."
      category="Utility"
      relatedTools={[
        {
          title: "Image Resizer",
          description: "Resize images to specific dimensions or percentage.",
          href: "/image-resizer",
          icon: ImageIcon,
          category: "Utility",
        },
        {
          title: "Image Compressor",
          description: "Compress images with adjustable quality.",
          href: "/image-compressor",
          icon: ImageIcon,
          category: "Utility",
        },
      ]}
    >
      <div className="p-6">
        {/* Upload Area */}
        {!imageUrl && (
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
                JPEG, PNG, or WebP
              </p>
            </div>
          </div>
        )}

        {imageUrl && (
          <>
            {/* Aspect Ratio Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                Aspect Ratio
              </label>
              <div className="flex flex-wrap gap-2">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.label}
                    onClick={() => {
                      setAspectRatio(ratio.value)
                      setCrop({ unit: "%", width: 50, height: 50, x: 25, y: 25 })
                      setCroppedUrl("")
                      setCompletedCrop(null)
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      aspectRatio === ratio.value
                        ? "bg-sky-500 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Crop Area */}
            <div className="mb-6">
              <div className="max-w-2xl mx-auto bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspectRatio}
                  className="max-w-full"
                >
                  <img
                    ref={imgRef}
                    src={imageUrl}
                    alt="Upload"
                    onLoad={handleImageLoad}
                    className="max-w-full h-auto"
                  />
                </ReactCrop>
              </div>

              {originalDimensions && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 text-center">
                  Original: {originalDimensions.width} × {originalDimensions.height}px
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleCrop}
                className="flex-1 min-w-[150px] py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Crop className="w-5 h-5" />
                Crop Image
              </button>

              <button
                onClick={() => {
                  setImageUrl("")
                  setCroppedUrl("")
                  setCompletedCrop(null)
                  setFile(null)
                  setOriginalDimensions(null)
                  setCroppedDimensions(null)
                }}
                className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCw className="w-5 h-5" />
                New Image
              </button>
            </div>

            {/* Result */}
            {croppedUrl && croppedDimensions && (
              <div className="space-y-4">
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Cropped Result</p>
                  <img
                    src={croppedUrl}
                    alt="Cropped"
                    className="max-w-full h-auto rounded-lg border border-zinc-200 dark:border-zinc-700"
                  />
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                    Cropped: {croppedDimensions.width} × {croppedDimensions.height}px
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Cropped Image
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ToolPageLayout>
  )
}
