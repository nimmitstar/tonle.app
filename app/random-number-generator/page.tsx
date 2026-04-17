"use client"

import { useState } from "react"
import { Hash, Sparkles, Copy, Check, RotateCw } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("1")
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [sortResults, setSortResults] = useState(false)
  const [integerOnly, setIntegerOnly] = useState(true)
  const [results, setResults] = useState<number[]>([])
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const generate = () => {
    const minVal = parseFloat(min)
    const maxVal = parseFloat(max)
    const countVal = parseInt(count) || 1

    if (isNaN(minVal) || isNaN(maxVal) || countVal < 1) {
      alert("Please enter valid numbers")
      return
    }

    if (minVal > maxVal) {
      alert("Minimum cannot be greater than maximum")
      return
    }

    setGenerating(true)

    setTimeout(() => {
      const nums: number[] = []
      const maxAttempts = allowDuplicates ? countVal : countVal * 10
      let attempts = 0

      while (nums.length < countVal && attempts < maxAttempts) {
        let num: number

        if (integerOnly) {
          const range = maxVal - minVal + 1
          num = Math.floor(Math.random() * range) + minVal
        } else {
          num = Math.random() * (maxVal - minVal) + minVal
        }

        if (allowDuplicates || !nums.includes(num)) {
          nums.push(num)
        }

        attempts++
      }

      if (sortResults) {
        nums.sort((a, b) => a - b)
      }

      setResults(nums)
      setGenerating(false)
    }, 100)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(results.join(", "))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { label: "Dice (1-6)", min: "1", max: "6", count: "1" },
    { label: "Coin (0-1)", min: "0", max: "1", count: "1" },
    { label: "D20 (1-20)", min: "1", max: "20", count: "1" },
    { label: "Lottery (1-49)", min: "1", max: "49", count: "6" },
  ]

  return (
    <ToolPageLayout
      title="Random Number Generator"
      description="Generate random numbers within a range. Customize count, duplicates, sorting, and decimal options."
      category="Math"
      relatedTools={[
        {
          title: "Percentage Calculator",
          description: "Calculate percentages: X% of Y, what % X is of Y, and percentage change.",
          href: "/percentage-calculator",
          icon: Hash,
          category: "Math",
        },
      ]}
    >
      <div className="p-6">
        {/* Presets */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setMin(preset.min)
                  setMax(preset.max)
                  setCount(preset.count)
                  setResults([])
                }}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors text-sm font-medium"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Range Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Minimum
            </label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Maximum
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Count Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            How many numbers?
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        {/* Options */}
        <div className="mb-6 space-y-3">
          <label className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="w-5 h-5 accent-sky-500"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Allow duplicate numbers</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={sortResults}
              onChange={(e) => setSortResults(e.target.checked)}
              className="w-5 h-5 accent-sky-500"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Sort results in ascending order</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={integerOnly}
              onChange={(e) => setIntegerOnly(e.target.checked)}
              className="w-5 h-5 accent-sky-500"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Integer only (no decimals)</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={generating}
          className="w-full py-4 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
        >
          {generating ? (
            <>
              <Sparkles className="w-6 h-6 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Generate Numbers
            </>
          )}
        </button>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Results ({results.length} number{results.length !== 1 ? "s" : ""})
              </h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 rounded-xl p-6 border border-sky-100 dark:border-sky-900/30">
              <div className="flex flex-wrap gap-3">
                {results.map((num, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center min-w-[60px] px-4 py-3 bg-white dark:bg-zinc-800 rounded-lg text-2xl font-bold text-sky-600 dark:text-sky-400 shadow-sm animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {integerOnly ? num : num.toFixed(2)}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setResults([])}
              className="mt-4 w-full py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RotateCw className="w-5 h-5" />
              Generate Again
            </button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  )
}
