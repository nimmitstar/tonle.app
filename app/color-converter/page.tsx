"use client"

import { useState, useEffect } from "react"
import { Palette, Copy, Check, QrCode } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { formatDate } from "@/lib/export"

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#0EA5E9")
  const [rgb, setRgb] = useState({ r: 14, g: 165, b: 233 })
  const [hsl, setHsl] = useState({ h: 199, s: 91, l: 48 })
  const [copied, setCopied] = useState<string | null>(null)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }).join("")
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100
    l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4))
    }
  }

  useEffect(() => {
    const rgbFromHex = hexToRgb(hex)
    if (rgbFromHex) {
      setRgb(rgbFromHex)
      setHsl(rgbToHsl(rgbFromHex.r, rgbFromHex.g, rgbFromHex.b))
    }
  }, [hex])

  useEffect(() => {
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b))
    setHsl(rgbToHsl(rgb.r, rgb.g, rgb.b))
  }, [rgb])

  useEffect(() => {
    const rgbFromHsl = hslToRgb(hsl.h, hsl.s, hsl.l)
    setRgb(rgbFromHsl)
    setHex(rgbToHex(rgbFromHsl.r, rgbFromHsl.g, rgbFromHsl.b))
  }, [hsl])

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <ToolPageLayout
      title="Color Converter"
      description="Convert between HEX, RGB, and HSL color formats with live preview."
      category="Developer"
      relatedTools={[
        {
          title: "QR Code Generator",
          description: "Generate QR codes for URLs, text, and contact information.",
          href: "/qr-code-generator",
          icon: QrCode,
          category: "Developer",
        },
      ]}
    >
      {/* Color Preview */}
      <div
        className="h-32 border-b border-zinc-200 dark:border-zinc-800"
        style={{ backgroundColor: hex }}
      />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* HEX Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            HEX
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-12 h-12 rounded cursor-pointer"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              maxLength={7}
              className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono uppercase"
            />
          </div>
          <button
            onClick={() => copyToClipboard(hex, "hex")}
            className="mt-3 w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm flex items-center justify-center gap-2"
          >
            {copied === "hex" ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-500" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* RGB Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            RGB
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 text-xs text-red-500">R</span>
              <input
                type="number"
                value={rgb.r}
                onChange={(e) => setRgb({ ...rgb, r: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                min="0"
                max="255"
                className="flex-1 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-xs text-green-500">G</span>
              <input
                type="number"
                value={rgb.g}
                onChange={(e) => setRgb({ ...rgb, g: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                min="0"
                max="255"
                className="flex-1 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-xs text-blue-500">B</span>
              <input
                type="number"
                value={rgb.b}
                onChange={(e) => setRgb({ ...rgb, b: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                min="0"
                max="255"
                className="flex-1 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")}
            className="mt-3 w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm flex items-center justify-center gap-2"
          >
            {copied === "rgb" ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-500" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* HSL Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            HSL
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 text-xs text-zinc-500">H</span>
              <input
                type="number"
                value={hsl.h}
                onChange={(e) => setHsl({ ...hsl, h: Math.max(0, Math.min(360, parseInt(e.target.value) || 0)) })}
                min="0"
                max="360"
                className="flex-1 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-xs text-zinc-500">S</span>
              <input
                type="number"
                value={hsl.s}
                onChange={(e) => setHsl({ ...hsl, s: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })}
                min="0"
                max="100"
                className="flex-1 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-xs text-zinc-500">L</span>
              <input
                type="number"
                value={hsl.l}
                onChange={(e) => setHsl({ ...hsl, l: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })}
                min="0"
                max="100"
                className="flex-1 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "hsl")}
            className="mt-3 w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm flex items-center justify-center gap-2"
          >
            {copied === "hsl" ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-500" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      <ExportButtons
        data={{
          title: "Color Converter",
          date: formatDate(),
          headers: ["Format", "Value"],
          rows: [
            ["HEX", hex],
            ["RGB", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`],
            ["HSL", `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`]
          ],
          filename: "color-converter"
        }}
      />
    </ToolPageLayout>
  )
}
