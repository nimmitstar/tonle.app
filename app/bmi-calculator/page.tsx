"use client"

import { useState, useMemo } from "react"
import { Scale, Ruler, Calendar } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")

  const bmi = useMemo(() => {
    const w = parseFloat(weight) || 0
    const h = parseFloat(height) || 0

    if (w <= 0 || h <= 0) return null

    let bmiValue: number
    if (unit === "metric") {
      // kg and cm
      const heightInMeters = h / 100
      bmiValue = w / (heightInMeters * heightInMeters)
    } else {
      // lbs and ft (assuming input as feet.inches like 5.10 for 5'10")
      const feet = Math.floor(h)
      const inches = Math.round((h - feet) * 100)
      const totalInches = feet * 12 + inches
      bmiValue = (w / (totalInches * totalInches)) * 703
    }

    return {
      value: bmiValue,
      category: bmiValue < 18.5 ? "Underweight" : bmiValue < 25 ? "Normal weight" : bmiValue < 30 ? "Overweight" : "Obese",
      color: bmiValue < 18.5 ? "bg-blue-500" : bmiValue < 25 ? "bg-green-500" : bmiValue < 30 ? "bg-yellow-500" : "bg-red-500",
    }
  }, [weight, height, unit])

  return (
    <ToolPageLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) and check your health category. Supports both metric and imperial units."
      category="Health"
      relatedTools={[
        {
          title: "Age Calculator",
          description: "Calculate your exact age in years, months, and days.",
          href: "/age-calculator",
          icon: Calendar,
          category: "Health",
        },
      ]}
    >
      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Unit System
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                checked={unit === "metric"}
                onChange={() => setUnit("metric")}
                className="w-4 h-4 accent-sky-500"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Metric (kg/cm)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                checked={unit === "imperial"}
                onChange={() => setUnit("imperial")}
                className="w-4 h-4 accent-sky-500"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Imperial (lbs/ft)</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "70" : "154"}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Height ({unit === "metric" ? "cm" : "ft (e.g., 5.10 for 5'10\")"})
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "175" : "5.10"}
                step="0.01"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {bmi && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Your Result
          </h2>
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">{bmi.value.toFixed(1)}</p>
            <p className={`text-xl font-semibold mt-2 ${bmi.color.replace("bg-", "text-")}`}>{bmi.category}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">BMI Scale</p>
            <div className="h-8 rounded-full overflow-hidden flex">
              <div className="bg-blue-500 flex items-center justify-center text-xs text-white font-medium" style={{ width: "18.5%" }}>
                Underweight
              </div>
              <div className="bg-green-500 flex items-center justify-center text-xs text-white font-medium" style={{ width: "6.5%" }}>
                Normal
              </div>
              <div className="bg-yellow-500 flex items-center justify-center text-xs text-white font-medium" style={{ width: "5%" }}>
                Overweight
              </div>
              <div className="bg-red-500 flex items-center justify-center text-xs text-white font-medium flex-1">
                Obese
              </div>
            </div>
            <div className="flex justify-between text-xs text-zinc-500">
              <span>0</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
