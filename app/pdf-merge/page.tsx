"use client"

import { useState, useRef } from "react"
import { Upload, Download, FileText, X, ArrowUp, ArrowDown, Trash2 } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { PDFDocument } from "pdf-lib"

interface PdfFile {
  file: File
  id: string
}

export default function PdfMergePage() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([])
  const [merging, setMerging] = useState(false)
  const [mergedUrl, setMergedUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const pdfFiles = files.filter((f) => f.type === "application/pdf")

    if (pdfFiles.length === 0) {
      alert("Please select PDF files")
      return
    }

    const newPdfs: PdfFile[] = pdfFiles.map((file) => ({
      file,
      id: `${Date.now()}-${Math.random()}`,
    }))

    setPdfs([...pdfs, ...newPdfs])
  }

  const removePdf = (id: string) => {
    setPdfs(pdfs.filter((p) => p.id !== id))
  }

  const movePdf = (index: number, direction: "up" | "down") => {
    const newPdfs = [...pdfs]
    if (direction === "up" && index > 0) {
      [newPdfs[index - 1], newPdfs[index]] = [newPdfs[index], newPdfs[index - 1]]
    } else if (direction === "down" && index < pdfs.length - 1) {
      [newPdfs[index], newPdfs[index + 1]] = [newPdfs[index + 1], newPdfs[index]]
    }
    setPdfs(newPdfs)
  }

  const mergePdfs = async () => {
    if (pdfs.length < 2) {
      alert("Please add at least 2 PDF files to merge")
      return
    }

    setMerging(true)

    try {
      const mergedPdf = await PDFDocument.create()

      for (const pdf of pdfs) {
        const arrayBuffer = await pdf.file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())
        pages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedPdfBytes = await mergedPdf.save()
      // Convert Uint8Array to regular array for Blob constructor
      const byteArray = Array.from(mergedPdfBytes).map(b => b as number)
      const uint8Array = new Uint8Array(byteArray)
      const blob = new Blob([uint8Array], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setMergedUrl(url)
    } catch (error) {
      console.error("Error merging PDFs:", error)
      alert("Error merging PDFs. Please try again.")
    } finally {
      setMerging(false)
    }
  }

  const handleDownload = () => {
    if (!mergedUrl) return
    const a = document.createElement("a")
    a.href = mergedUrl
    a.download = "merged.pdf"
    a.click()
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const totalSize = pdfs.reduce((acc, p) => acc + p.file.size, 0)

  return (
    <ToolPageLayout
      title="PDF Merge"
      description="Merge multiple PDF files into one. Rearrange pages, remove files, and download the merged PDF."
      category="Developer"
      relatedTools={[]}
    >
      <div className="p-6">
        {/* Upload Area */}
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
          >
            <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-1">
              Click to upload PDFs
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Select multiple PDF files to merge
            </p>
          </div>
        </div>

        {/* PDF List */}
        {pdfs.length > 0 && !mergedUrl && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                PDF Files ({pdfs.length})
              </h3>
              {pdfs.length > 1 && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Total size: {formatBytes(totalSize)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              {pdfs.map((pdf, index) => (
                <div
                  key={pdf.id}
                  className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800"
                >
                  <FileText className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {pdf.file.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatBytes(pdf.file.size)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => movePdf(index, "up")}
                      disabled={index === 0}
                      className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </button>
                    <button
                      onClick={() => movePdf(index, "down")}
                      disabled={index === pdfs.length - 1}
                      className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </button>
                    <button
                      onClick={() => removePdf(pdf.id)}
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Merge Button */}
            {pdfs.length >= 2 && (
              <button
                onClick={mergePdfs}
                disabled={merging}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {merging ? (
                  <>Merging...</>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Merge {pdfs.length} PDFs
                  </>
                )}
              </button>
            )}

            {pdfs.length === 1 && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                Add at least one more PDF to merge
              </p>
            )}
          </div>
        )}

        {/* Result */}
        {mergedUrl && (
          <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-6 border border-emerald-100 dark:border-emerald-900/30">
              <div className="flex items-center gap-4">
                <FileText className="w-12 h-12 text-emerald-500" />
                <div>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    PDFs Merged Successfully!
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {pdfs.length} files combined into one PDF
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Merged PDF
            </button>

            <button
              onClick={() => {
                setMergedUrl("")
                setPdfs([])
              }}
              className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Start Over
            </button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  )
}
