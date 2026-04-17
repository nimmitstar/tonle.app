"use client"

import { useState } from "react"
import { DollarSign, Percent, TrendingUp, RotateCcw } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { formatDate } from "@/lib/export"

export default function MarginCalculatorPage() {
  const [revenue, setRevenue] = useState("")
  const [cost, setCost] = useState("")
  const [targetMargin, setTargetMargin] = useState("")
  const [mode, setMode] = useState<"fromRevenue" | "fromMargin">("fromRevenue")

  const rev = parseFloat(revenue) || 0
  const c = parseFloat(cost) || 0
  const marginPercent = parseFloat(targetMargin) || 0

  // Calculate from revenue and cost
  const grossMargin = rev > 0 ? ((rev - c) / rev) * 100 : 0
  const markupPercent = c > 0 ? ((rev - c) / c) * 100 : 0
  const profit = rev - c

  // Calculate selling price from margin % and cost
  const sellingPrice = marginPercent < 100 && c > 0
    ? c / (1 - marginPercent / 100)
    : 0

  return (
    <ToolPageLayout
      title="Margin Calculator"
      description="Calculate gross margin percentage, markup percentage, and profit. Or find the selling price needed to achieve your target margin."
      category="Finance"
      relatedTools={[
        {
          title: "Stock ROI Calculator",
          description: "Calculate stock investment returns with ROI and CAGR.",
          href: "/stock-roi-calculator",
          icon: TrendingUp,
          category: "Finance",
        },
        {
          title: "Percentage Calculator",
          description: "Calculate percentages in multiple ways.",
          href: "/percentage-calculator",
          icon: Percent,
          category: "Math",
        },
      ]}
    >
      <div className="p-6">
        {/* Mode Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("fromRevenue")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "fromRevenue"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            From Revenue & Cost
          </button>
          <button
            onClick={() => setMode("fromMargin")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "fromMargin"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <Percent className="w-4 h-4" />
            From Target Margin
          </button>
        </div>

        {/* Mode 1: From Revenue & Cost */}
        {mode === "fromRevenue" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Revenue (Selling Price)
                  </div>
                </label>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="100.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Cost (COGS)
                  </div>
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="60.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            {(rev > 0 || c > 0) && (
              <button
                onClick={() => { setRevenue(""); setCost("") }}
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Clear inputs
              </button>
            )}
          </div>
        )}

        {/* Mode 2: From Target Margin */}
        {mode === "fromMargin" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Cost (COGS)
                  </div>
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="60.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Target Margin (%)
                  </div>
                </label>
                <input
                  type="number"
                  value={targetMargin}
                  onChange={(e) => setTargetMargin(e.target.value)}
                  placeholder="40"
                  step="0.1"
                  min="0"
                  max="99.9"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            {(c > 0 || marginPercent > 0) && (
              <button
                onClick={() => { setCost(""); setTargetMargin("") }}
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Clear inputs
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {mode === "fromRevenue" && (rev > 0 || c > 0) && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Gross Margin</p>
              <p className="text-3xl font-bold text-sky-500">{grossMargin.toFixed(2)}%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {rev > 0 ? `${((rev - c) / rev * 100).toFixed(1)}% of revenue` : "-"}
              </p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Markup</p>
              <p className="text-3xl font-bold text-emerald-500">{markupPercent.toFixed(2)}%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {c > 0 ? `${((rev - c) / c * 100).toFixed(1)}% above cost` : "-"}
              </p>
            </div>
            <div className="p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Profit</p>
              <p className={`text-3xl font-bold ${profit >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                ${profit.toFixed(2)}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Revenue - Cost
              </p>
            </div>
          </div>

          {profit < 0 && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-100 dark:border-red-900/30">
              <p className="text-sm text-red-600 dark:text-red-400">
                Warning: You're selling at a loss. Increase your price or reduce costs.
              </p>
            </div>
          )}
        </div>
      )}

      {mode === "fromMargin" && c > 0 && marginPercent > 0 && marginPercent < 100 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Required Selling Price
          </h2>

          <div className="p-6 bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 rounded-xl">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Sell at</p>
            <p className="text-4xl font-bold text-sky-500">${sellingPrice.toFixed(2)}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              to achieve a {marginPercent}% margin on ${c.toFixed(2)} cost
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Cost</p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">${c.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Profit</p>
              <p className="text-lg font-semibold text-emerald-500">${(sellingPrice - c).toFixed(2)}</p>
            </div>
          </div>
          <ExportButtons
            data={{
              title: "Margin Calculator",
              date: formatDate(),
              headers: ["Metric", "Value"],
              rows: [
                ["Mode", "From Target Margin"],
                ["Cost", `$${c.toFixed(2)}`],
                ["Target Margin", `${marginPercent}%`],
                ["Selling Price", `$${sellingPrice.toFixed(2)}`],
                ["Profit", `$${(sellingPrice - c).toFixed(2)}`]
              ],
              filename: "margin-calculator"
            }}
          />
        </div>
      )}
    </ToolPageLayout>
  )
}
