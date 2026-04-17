"use client"

import { FileText, FileSpreadsheet, Download } from "lucide-react"
import type { ExportData } from "@/lib/export"
import { exportToPdf, exportToExcel } from "@/lib/export"

interface ExportButtonsProps {
  data: ExportData
  disabled?: boolean
}

export function ExportButtons({ data, disabled = false }: ExportButtonsProps) {
  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
      <span className="text-xs text-zinc-500 flex items-center gap-1">
        <Download className="w-3 h-3" />
        Export:
      </span>
      <button
        onClick={() => exportToPdf(data)}
        disabled={disabled}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FileText className="w-3.5 h-3.5" />
        PDF
      </button>
      <button
        onClick={() => exportToExcel(data)}
        disabled={disabled}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FileSpreadsheet className="w-3.5 h-3.5" />
        Excel
      </button>
    </div>
  )
}
