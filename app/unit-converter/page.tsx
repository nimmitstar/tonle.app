"use client"

import { useState, useMemo } from "react"
import { ArrowRightLeft } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

type Category = "length" | "weight" | "temperature" | "speed" | "area" | "volume"

interface StandardUnit {
  value: string
  label: string
  factor: number
  special?: false
}

interface TemperatureUnit {
  value: string
  label: string
  special: true
}

type Unit = StandardUnit | TemperatureUnit

const UNITS: Record<Category, Unit[]> = {
  length: [
    { value: "m", label: "Meters (m)", factor: 1 },
    { value: "km", label: "Kilometers (km)", factor: 1000 },
    { value: "cm", label: "Centimeters (cm)", factor: 0.01 },
    { value: "mm", label: "Millimeters (mm)", factor: 0.001 },
    { value: "mi", label: "Miles (mi)", factor: 1609.344 },
    { value: "yd", label: "Yards (yd)", factor: 0.9144 },
    { value: "ft", label: "Feet (ft)", factor: 0.3048 },
    { value: "in", label: "Inches (in)", factor: 0.0254 },
  ],
  weight: [
    { value: "kg", label: "Kilograms (kg)", factor: 1 },
    { value: "g", label: "Grams (g)", factor: 0.001 },
    { value: "mg", label: "Milligrams (mg)", factor: 0.000001 },
    { value: "lb", label: "Pounds (lb)", factor: 0.453592 },
    { value: "oz", label: "Ounces (oz)", factor: 0.0283495 },
    { value: "st", label: "Stones (st)", factor: 6.35029 },
    { value: "t", label: "Metric Ton (t)", factor: 1000 },
  ],
  temperature: [
    { value: "c", label: "Celsius (°C)", special: true },
    { value: "f", label: "Fahrenheit (°F)", special: true },
    { value: "k", label: "Kelvin (K)", special: true },
  ],
  speed: [
    { value: "mps", label: "Meters per second (m/s)", factor: 1 },
    { value: "kph", label: "Kilometers per hour (km/h)", factor: 0.277778 },
    { value: "mph", label: "Miles per hour (mph)", factor: 0.44704 },
    { value: "kn", label: "Knots (kn)", factor: 0.514444 },
    { value: "fps", label: "Feet per second (ft/s)", factor: 0.3048 },
  ],
  area: [
    { value: "sqm", label: "Square Meters (m²)", factor: 1 },
    { value: "sqkm", label: "Square Kilometers (km²)", factor: 1000000 },
    { value: "sqft", label: "Square Feet (ft²)", factor: 0.092903 },
    { value: "sqyd", label: "Square Yards (yd²)", factor: 0.836127 },
    { value: "acre", label: "Acres", factor: 4046.86 },
    { value: "ha", label: "Hectares (ha)", factor: 10000 },
  ],
  volume: [
    { value: "l", label: "Liters (L)", factor: 1 },
    { value: "ml", label: "Milliliters (mL)", factor: 0.001 },
    { value: "gal", label: "Gallons (US)", factor: 3.78541 },
    { value: "qt", label: "Quarts (US)", factor: 0.946353 },
    { value: "pt", label: "Pints (US)", factor: 0.473176 },
    { value: "cup", label: "Cups (US)", factor: 0.236588 },
    { value: "floz", label: "Fluid Ounces (US)", factor: 0.0295735 },
    { value: "m3", label: "Cubic Meters (m³)", factor: 1000 },
  ],
}

const CATEGORIES: { key: Category; label: string; icon: string }[] = [
  { key: "length", label: "Length", icon: "📏" },
  { key: "weight", label: "Weight", icon: "⚖️" },
  { key: "temperature", label: "Temperature", icon: "🌡️" },
  { key: "speed", label: "Speed", icon: "🚀" },
  { key: "area", label: "Area", icon: "🔲" },
  { key: "volume", label: "Volume", icon: "🧊" },
]

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length")
  const [value, setValue] = useState("")
  const [fromUnit, setFromUnit] = useState(UNITS.length[0].value)
  const [toUnit, setToUnit] = useState(UNITS.length[1].value)

  const units = UNITS[category]

  const result = useMemo(() => {
    const num = parseFloat(value)
    if (isNaN(num)) return null

    // Special handling for temperature
    if (category === "temperature") {
      let celsius: number
      // Convert to Celsius first
      if (fromUnit === "c") celsius = num
      else if (fromUnit === "f") celsius = (num - 32) * 5/9
      else celsius = num - 273.15

      // Convert from Celsius to target
      if (toUnit === "c") return celsius
      if (toUnit === "f") return celsius * 9/5 + 32
      return celsius + 273.15
    }

    // Standard conversion
    const fromFactor = (units.find((u) => u.value === fromUnit) as StandardUnit)?.factor || 1
    const toFactor = (units.find((u) => u.value === toUnit) as StandardUnit)?.factor || 1
    const baseValue = num * fromFactor
    return baseValue / toFactor
  }, [value, fromUnit, toUnit, category, units])

  // Reset units when category changes
  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory)
    const newUnits = UNITS[newCategory]
    setFromUnit(newUnits[0].value)
    setToUnit(newUnits.length > 1 ? newUnits[1].value : newUnits[0].value)
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <ToolPageLayout
      title="Unit Converter"
      description="Convert between different units of measurement including length, weight, temperature, speed, area, and volume."
      category="Utility"
      relatedTools={[]}
    >
      <div className="p-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                category === cat.key
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={swapUnits}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Result
          </h2>
          <div className="text-center p-6 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
            <p className="text-4xl font-bold text-sky-500">
              {category === "temperature" && result < 0 ? "" : ""}
              {typeof result === "number" ? result.toFixed(6).replace(/\.?0+$/, "") : "0"}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              {units.find((u) => u.value === toUnit)?.label}
            </p>
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
