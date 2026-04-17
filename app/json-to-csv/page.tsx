"use client"

import { useState } from "react"
import { Code, FileSpreadsheet, Download, Upload, FileText, AlertCircle } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {}

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey))
    } else {
      result[newKey] = String(value ?? "")
    }
  }

  return result
}

export default function JsonToCsvPage() {
  const [jsonInput, setJsonInput] = useState("")
  const [csvOutput, setCsvOutput] = useState("")
  const [previewData, setPreviewData] = useState<{ headers: string[]; rows: string[][] } | null>(null)
  const [error, setError] = useState("")

  const convert = () => {
    setError("")
    setCsvOutput("")
    setPreviewData(null)

    if (!jsonInput.trim()) {
      setError("Please enter JSON data")
      return
    }

    try {
      const parsed = JSON.parse(jsonInput)

      if (!Array.isArray(parsed)) {
        setError("JSON must be an array of objects")
        return
      }

      if (parsed.length === 0) {
        setError("JSON array is empty")
        return
      }

      // Flatten all objects and collect all unique keys
      const flattenedData = parsed.map((item) => {
        if (typeof item !== "object" || item === null) {
          throw new Error("Array must contain only objects")
        }
        return flattenObject(item as Record<string, unknown>)
      })

      const allKeys = new Set<string>()
      flattenedData.forEach((obj) => {
        Object.keys(obj).forEach((key) => allKeys.add(key))
      })

      const headers = Array.from(allKeys)

      // Generate CSV
      const csvRows: string[][] = []

      // Header row
      csvRows.push(headers.map((h) => `"${h.replace(/"/g, '""')}"`))

      // Data rows
      flattenedData.forEach((obj) => {
        const row = headers.map((header) => {
          const value = obj[header] ?? ""
          const escaped = String(value).replace(/"/g, '""')
          return `"${escaped}"`
        })
        csvRows.push(row)
      })

      const csv = csvRows.map((row) => row.join(",")).join("\n")
      setCsvOutput(csv)
      setPreviewData({ headers, rows: csvRows.slice(1, 11) }) // Show first 10 data rows

    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON")
    }
  }

  const downloadCsv = () => {
    if (!csvOutput) return

    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "data.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const loadSample = () => {
    const sample = [
      { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
    ]
    setJsonInput(JSON.stringify(sample, null, 2))
  }

  return (
    <ToolPageLayout
      title="JSON to CSV Converter"
      description="Convert JSON arrays to CSV format. Handles nested objects by flattening keys with dot notation."
      category="Developer"
      relatedTools={[
        {
          title: "JSON Formatter",
          description: "Format, validate, and beautify JSON with syntax highlighting.",
          href: "/json-formatter",
          icon: Code,
          category: "Developer",
        },
        {
          title: "Base64 Encoder",
          description: "Encode and decode text to and from Base64 format.",
          href: "/base64-encoder",
          icon: Code,
          category: "Developer",
        },
      ]}
    >
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* JSON Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                JSON Input (Array of Objects)
              </label>
              <button
                onClick={loadSample}
                className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
              >
                Load Sample
              </button>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]'
              className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
            />
            <button
              onClick={convert}
              className="mt-3 w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-5 h-5" />
              Convert to CSV
            </button>
          </div>

          {/* CSV Output / Preview */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              {csvOutput ? "Preview" : "CSV Output"}
            </label>

            {error && (
              <div className="mb-3 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/30 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {previewData && (
              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-800">
                    <tr>
                      {previewData.headers.map((header) => (
                        <th
                          key={header}
                          className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                    {previewData.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="px-3 py-2 text-zinc-600 dark:text-zinc-400 whitespace-nowrap"
                          >
                            {cell.replace(/^"|"$/g, "").replace(/""/g, '"')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewData.rows.length >= 10 && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 px-3 py-2">
                    Showing first 10 rows
                  </p>
                )}
              </div>
            )}

            {!previewData && !error && (
              <div className="h-64 flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Enter JSON and click convert
                </p>
              </div>
            )}

            {csvOutput && (
              <button
                onClick={downloadCsv}
                className="mt-3 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CSV
              </button>
            )}
          </div>
        </div>

        {/* Raw CSV Output (collapsible) */}
        {csvOutput && (
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-400">
              View Raw CSV
            </summary>
            <textarea
              readOnly
              value={csvOutput}
              className="mt-2 w-full h-40 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs resize-none"
            />
          </details>
        )}
      </div>
    </ToolPageLayout>
  )
}
