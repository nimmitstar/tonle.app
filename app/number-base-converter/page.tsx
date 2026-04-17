"use client"

import { useState } from "react"
import { Hash, Copy, Check, RotateCcw } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

type Base = "decimal" | "binary" | "octal" | "hex"

const baseLabels: Record<Base, string> = {
  decimal: "Decimal (Base 10)",
  binary: "Binary (Base 2)",
  octal: "Octal (Base 8)",
  hex: "Hexadecimal (Base 16)",
}

export default function NumberBaseConverterPage() {
  const [values, setValues] = useState<Record<Base, string>>({
    decimal: "",
    binary: "",
    octal: "",
    hex: "",
  })
  const [copied, setCopied] = useState<Base | null>(null)

  // Convert a number from one base to another
  const convertBase = (value: string, fromBase: Base, toBase: Base): string => {
    if (!value.trim()) return ""

    try {
      const bases = { decimal: 10, binary: 2, octal: 8, hex: 16 }
      const prefixes = { binary: "0b", octal: "0o", hex: "0x" }

      let cleanValue = value.trim().toLowerCase()
      const prefix = prefixes[fromBase as keyof typeof prefixes]
      if (prefix && cleanValue.startsWith(prefix)) {
        cleanValue = cleanValue.slice(prefix.length)
      }

      const decimalValue = parseInt(cleanValue, bases[fromBase])

      if (isNaN(decimalValue)) {
        return "Invalid"
      }

      if (toBase === "decimal") {
        return decimalValue.toString()
      }

      return decimalValue.toString(bases[toBase]).toUpperCase()
    } catch {
      return "Invalid"
    }
  }

  // Handle input change
  const handleChange = (base: Base, value: string) => {
    setValues((prev) => {
      const newValues = { ...prev, [base]: value }

      // Update all other bases
      const allBases: Base[] = ["decimal", "binary", "octal", "hex"]
      for (const b of allBases) {
        if (b !== base) {
          newValues[b] = convertBase(value, base, b)
        }
      }

      return newValues
    })
  }

  // Handle copy
  const handleCopy = async (base: Base) => {
    const value = values[base]
    if (value && value !== "Invalid") {
      await navigator.clipboard.writeText(value)
      setCopied(base)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  // Clear all
  const handleClear = () => {
    setValues({ decimal: "", binary: "", octal: "", hex: "" })
  }

  // Check if all are empty
  const hasValue = Object.values(values).some((v) => v && v !== "Invalid")

  const getInputClassName = (base: Base) => {
    const baseClasses = "w-full px-4 py-3 pr-24 rounded-lg border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent font-mono"
    if (values[base] === "Invalid") {
      return baseClasses + " border-red-300 dark:border-red-700 text-red-500"
    }
    return baseClasses + " border-zinc-300 dark:border-zinc-700"
  }

  const getButtonClassName = (base: Base) => {
    const baseClasses = "absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
    if (copied === base) {
      return baseClasses + " bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
    }
    return baseClasses + " bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600"
  }

  return (
    <ToolPageLayout
      title="Number Base Converter"
      description="Convert numbers between decimal, binary, octal, and hexadecimal formats instantly. Live conversion as you type."
      category="Developer"
      relatedTools={[
        {
          title: "Base64 Encoder",
          description: "Encode and decode text to and from Base64 format.",
          href: "/base64-encoder",
          icon: Hash,
          category: "Developer",
        },
        {
          title: "JSON Formatter",
          description: "Format, validate, and beautify JSON with syntax highlighting.",
          href: "/json-formatter",
          icon: Hash,
          category: "Developer",
        },
      ]}
    >
      <div className="p-6">
        <div className="space-y-4">
          {(["decimal", "binary", "octal", "hex"] as Base[]).map((base) => (
            <div key={base}>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {baseLabels[base]}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={values[base]}
                  onChange={(e) => handleChange(base, e.target.value)}
                  placeholder={
                    base === "decimal"
                      ? "42"
                      : base === "binary"
                      ? "101010"
                      : base === "octal"
                      ? "52"
                      : "2A"
                  }
                  className={getInputClassName(base)}
                />
                <button
                  onClick={() => handleCopy(base)}
                  disabled={!values[base] || values[base] === "Invalid"}
                  className={getButtonClassName(base)}
                >
                  {copied === base ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {hasValue && (
          <button
            onClick={handleClear}
            className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Quick Reference */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Quick Reference
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left py-2 px-3 text-zinc-600 dark:text-zinc-400 font-medium">Decimal</th>
                <th className="text-left py-2 px-3 text-zinc-600 dark:text-zinc-400 font-medium">Binary</th>
                <th className="text-left py-2 px-3 text-zinc-600 dark:text-zinc-400 font-medium">Octal</th>
                <th className="text-left py-2 px-3 text-zinc-600 dark:text-zinc-400 font-medium">Hex</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 31, 32, 64, 127, 128, 255, 256].map((n) => (
                <tr
                  key={n}
                  className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="py-2 px-3 text-zinc-900 dark:text-zinc-100">{n}</td>
                  <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{n.toString(2)}</td>
                  <td className="py-2 px-3 text-amber-600 dark:text-amber-400">{n.toString(8)}</td>
                  <td className="py-2 px-3 text-violet-600 dark:text-violet-400">{n.toString(16).toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ExportButtons
          data={{
            title: "Number Base Converter",
            date: formatDate(),
            headers: ["Base", "Value"],
            rows: [
              ["Decimal (Base 10)", values.decimal || "-"],
              ["Binary (Base 2)", values.binary || "-"],
              ["Octal (Base 8)", values.octal || "-"],
              ["Hexadecimal (Base 16)", values.hex || "-"]
            ],
            filename: "number-base-converter"
          }}
        />
        <ShareButtons toolName="Number Base Converter" />
      </div>
    </ToolPageLayout>
  )
}
