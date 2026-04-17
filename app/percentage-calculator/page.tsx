"use client"

import { useState } from "react"
import { Percent, Divide, TrendingUp } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

type Mode = "percentageOf" | "whatPercentage" | "percentChange"

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<Mode>("percentageOf")

  // Mode 1: X% of Y
  const [percentOf, setPercentOf] = useState({ percent: "", value: "" })

  // Mode 2: X is what % of Y
  const [whatPercent, setWhatPercent] = useState({ part: "", whole: "" })

  // Mode 3: % change from X to Y
  const [percentChange, setPercentChange] = useState({ from: "", to: "" })

  const results = {
    percentageOf: percentOf.percent && percentOf.value
      ? (parseFloat(percentOf.percent) / 100) * parseFloat(percentOf.value)
      : null,
    whatPercentage: whatPercent.part && whatPercent.whole && parseFloat(whatPercent.whole) !== 0
      ? (parseFloat(whatPercent.part) / parseFloat(whatPercent.whole)) * 100
      : null,
    percentChange: percentChange.from && percentChange.to && parseFloat(percentChange.from) !== 0
      ? ((parseFloat(percentChange.to) - parseFloat(percentChange.from)) / parseFloat(percentChange.from)) * 100
      : null,
  }

  return (
    <ToolPageLayout
      title="Percentage Calculator"
      description="Calculate percentages in three ways: find X% of Y, calculate what percentage X is of Y, or find the percentage change between two values."
      category="Math"
      relatedTools={[]}
    >
      <div className="p-6">
        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setMode("percentageOf")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "percentageOf"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <Percent className="w-4 h-4" />
            X% of Y
          </button>
          <button
            onClick={() => setMode("whatPercentage")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "whatPercentage"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <Divide className="w-4 h-4" />
            X is what % of Y
          </button>
          <button
            onClick={() => setMode("percentChange")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "percentChange"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            % Change
          </button>
        </div>

        {/* Mode 1: X% of Y */}
        {mode === "percentageOf" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Percentage (%)
                </label>
                <input
                  type="number"
                  value={percentOf.percent}
                  onChange={(e) => setPercentOf({ ...percentOf, percent: e.target.value })}
                  placeholder="25"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Of Value
                </label>
                <input
                  type="number"
                  value={percentOf.value}
                  onChange={(e) => setPercentOf({ ...percentOf, value: e.target.value })}
                  placeholder="200"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>
            {results.percentageOf !== null && (
              <div className="mt-6 p-6 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Result</p>
                <p className="text-3xl font-bold text-sky-500">{results.percentageOf.toLocaleString()}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {percentOf.percent}% of {percentOf.value}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mode 2: X is what % of Y */}
        {mode === "whatPercentage" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Part (X)
                </label>
                <input
                  type="number"
                  value={whatPercent.part}
                  onChange={(e) => setWhatPercent({ ...whatPercent, part: e.target.value })}
                  placeholder="25"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Whole (Y)
                </label>
                <input
                  type="number"
                  value={whatPercent.whole}
                  onChange={(e) => setWhatPercent({ ...whatPercent, whole: e.target.value })}
                  placeholder="200"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>
            {results.whatPercentage !== null && (
              <div className="mt-6 p-6 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Result</p>
                <p className="text-3xl font-bold text-sky-500">{results.whatPercentage.toFixed(2)}%</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {whatPercent.part} is {results.whatPercentage.toFixed(2)}% of {whatPercent.whole}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mode 3: % Change */}
        {mode === "percentChange" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  From Value
                </label>
                <input
                  type="number"
                  value={percentChange.from}
                  onChange={(e) => setPercentChange({ ...percentChange, from: e.target.value })}
                  placeholder="100"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  To Value
                </label>
                <input
                  type="number"
                  value={percentChange.to}
                  onChange={(e) => setPercentChange({ ...percentChange, to: e.target.value })}
                  placeholder="150"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>
            {results.percentChange !== null && (
              <div className="mt-6 p-6 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Result</p>
                <p className={`text-3xl font-bold ${results.percentChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {results.percentChange >= 0 ? "+" : ""}{results.percentChange.toFixed(2)}%
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Change from {percentChange.from} to {percentChange.to}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  )
}
