"use client"

import { useState } from "react"
import { Palette, Copy, Check, Plus, Trash2, Code2 } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

type Direction = "to right" | "to left" | "to bottom" | "to top" | "to bottom right" | "to top left" | "circle" | "circle at center"

interface ColorStop {
  id: string
  color: string
  position: number
}

const presets = [
  { name: "Sunset", colors: ["#ff6b6b", "#feca57"], direction: "to right" as Direction },
  { name: "Ocean", colors: ["#667eea", "#764ba2"], direction: "to right" as Direction },
  { name: "Forest", colors: ["#11998e", "#38ef7d"], direction: "to bottom" as Direction },
  { name: "Fire", colors: ["#f12711", "#f5af19"], direction: "to right" as Direction },
  { name: "Purple Rain", colors: ["#667eea", "#764ba2", "#f093fb"], direction: "to bottom right" as Direction },
  { name: "Midnight", colors: ["#0f0c29", "#302b63", "#24243e"], direction: "to bottom" as Direction },
  { name: "Peach", colors: ["#ff9a9e", "#fecfef"], direction: "to right" as Direction },
  { name: "Sky", colors: ["#2980b9", "#6dd5fa", "#ffffff"], direction: "to bottom" as Direction },
]

export default function CssGradientGeneratorPage() {
  const [colors, setColors] = useState<ColorStop[]>([
    { id: "1", color: "#667eea", position: 0 },
    { id: "2", color: "#764ba2", position: 100 },
  ])
  const [direction, setDirection] = useState<Direction>("to right")
  const [copied, setCopied] = useState(false)
  const [type, setType] = useState<"linear" | "radial">("linear")

  const addColor = () => {
    const newId = String(Date.now())
    const newPos = Math.round(50)
    setColors([...colors, { id: newId, color: "#888888", position: newPos }])
  }

  const removeColor = (id: string) => {
    if (colors.length <= 2) return
    setColors(colors.filter((c) => c.id !== id))
  }

  const updateColor = (id: string, color: string) => {
    setColors(colors.map((c) => (c.id === id ? { ...c, color } : c)))
  }

  const updatePosition = (id: string, position: number) => {
    setColors(colors.map((c) => (c.id === id ? { ...c, position } : c)))
  }

  const applyPreset = (preset: typeof presets[0]) => {
    const newColors = preset.colors.map((color, i) => ({
      id: String(i),
      color,
      position: Math.round((i / (preset.colors.length - 1)) * 100),
    }))
    setColors(newColors)
    setDirection(preset.direction)
    setType(preset.direction.includes("circle") ? "radial" : "linear")
  }

  const sortedColors = [...colors].sort((a, b) => a.position - b.position)

  const gradientCss =
    type === "radial"
      ? `radial-gradient(${direction}, ${sortedColors.map((c) => `${c.color} ${c.position}%`).join(", ")})`
      : `linear-gradient(${direction}, ${sortedColors.map((c) => `${c.color} ${c.position}%`).join(", ")})`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(`background: ${gradientCss};`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolPageLayout
      title="CSS Gradient Generator"
      description="Create beautiful CSS gradients with live preview. Choose colors, direction, and copy the CSS code."
      category="Developer"
      relatedTools={[
        {
          title: "Color Converter",
          description: "Convert between HEX, RGB, and HSL color formats.",
          href: "/color-converter",
          icon: Palette,
          category: "Developer",
        },
      ]}
    >
      <div className="p-6">
        {/* Presets */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Popular Presets
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="h-12 rounded-lg text-sm font-medium text-white shadow-sm hover:scale-105 transition-transform"
                style={{
                  background: preset.direction.includes("circle")
                    ? `radial-gradient(${preset.direction}, ${preset.colors.join(", ")})`
                    : `linear-gradient(${preset.direction}, ${preset.colors.join(", ")})`,
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gradient Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Gradient Type
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setType("linear")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                type === "linear"
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => setType("radial")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                type === "radial"
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              Radial
            </button>
          </div>
        </div>

        {/* Direction */}
        {type === "linear" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              Direction
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {(["to right", "to left", "to bottom", "to top", "to bottom right", "to top left"] as Direction[]).map(
                (dir) => (
                  <button
                    key={dir}
                    onClick={() => setDirection(dir)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      direction === dir
                        ? "bg-sky-500 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {dir.replace("to ", "")}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {type === "radial" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              Shape & Position
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["circle", "circle at center"] as Direction[]).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setDirection(dir)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    direction === dir
                      ? "bg-sky-500 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Stops */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Color Stops
            </label>
            <button
              onClick={addColor}
              disabled={colors.length >= 5}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Color
            </button>
          </div>

          <div className="space-y-3">
            {colors.map((colorStop, index) => (
              <div key={colorStop.id} className="flex items-center gap-3">
                <input
                  type="color"
                  value={colorStop.color}
                  onChange={(e) => updateColor(colorStop.id, e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={colorStop.color}
                  onChange={(e) => updateColor(colorStop.id, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:ring-2 focus:ring-sky-500"
                  placeholder="#000000"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorStop.position}
                  onChange={(e) => updatePosition(colorStop.id, parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm text-center focus:ring-2 focus:ring-sky-500"
                />
                <span className="text-sm text-zinc-500 dark:text-zinc-400">%</span>
                <button
                  onClick={() => removeColor(colorStop.id)}
                  disabled={colors.length <= 2}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Preview
          </label>
          <div
            className="h-40 rounded-xl shadow-inner"
            style={{ background: gradientCss }}
          />
        </div>

        {/* CSS Output */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            CSS Code
          </label>
          <div className="flex gap-2">
            <div className="flex-1 p-4 bg-zinc-900 rounded-xl overflow-x-auto">
              <code className="text-sm text-green-400 font-mono whitespace-nowrap">
                background: {gradientCss};
              </code>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  )
}
