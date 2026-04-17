import jsPDF from "jspdf"
import "jspdf-autotable"
import * as XLSX from "xlsx"

export interface ExportData {
  title: string
  date: string
  headers: string[]
  rows: (string | number)[][]
  filename: string
}

export function exportToPdf(data: ExportData): void {
  const doc = new jsPDF()

  // Title
  doc.setFontSize(18)
  doc.text(data.title, 14, 22)

  // Date
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(`Generated: ${data.date}`, 14, 30)

  // Table
  ;(doc as any).autoTable({
    startY: 40,
    head: [data.headers],
    body: data.rows,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [14, 165, 233], // sky-500
      textColor: 255,
      fontStyle: "bold" as const,
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  })

  // Save
  const dateStr = new Date().toISOString().split("T")[0]
  doc.save(`${data.filename}-${dateStr}.pdf`)
}

export function exportToExcel(data: ExportData): void {
  // Create workbook
  const wb = XLSX.utils.book_new()

  // Add title row
  const worksheetData: (string | number)[][] = [
    [data.title],
    [`Generated: ${data.date}`],
    [], // empty row
    [...data.headers],
    ...data.rows,
  ]

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(worksheetData)

  // Set column widths
  const colWidths = data.headers.map(() => ({ wch: 20 }))
  ws["!cols"] = colWidths

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Results")

  // Save
  const dateStr = new Date().toISOString().split("T")[0]
  XLSX.writeFile(wb, `${data.filename}-${dateStr}.xlsx`)
}

export function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
