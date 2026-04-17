"use client"

import { useState } from "react"
import { Hash } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { AffiliateCard } from "@/components/affiliate-card"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

// Fibonacci calculation using iterative approach for performance
function calculateFibonacci(n: number): bigint {
  if (n <= 0) return BigInt(0)
  if (n === 1) return BigInt(1)

  let prev = BigInt(0)
  let curr = BigInt(1)
  for (let i = 2; i <= n; i++) {
    ;[prev, curr] = [curr, prev + curr]
  }
  return curr
}

function generateSequence(upTo: number): bigint[] {
  const result: bigint[] = []
  for (let i = 0; i <= upTo; i++) {
    result.push(calculateFibonacci(i))
  }
  return result
}

// Golden ratio approximation from Fibonacci numbers
function goldenRatioApproximation(n: number): number {
  if (n < 2) return 0
  const fn = calculateFibonacci(n)
  const fn1 = calculateFibonacci(n - 1)
  if (fn1 === BigInt(0)) return 0
  return Number(fn) / Number(fn1)
}

export default function FibonacciCalculatorPage() {
  const [mode, setMode] = useState<"single" | "range">("single")
  const [n, setN] = useState("10")
  const [rangeStart, setRangeStart] = useState("0")
  const [rangeEnd, setRangeEnd] = useState("10")

  const nNum = parseInt(n) || 0
  const rangeStartNum = parseInt(rangeStart) || 0
  const rangeEndNum = parseInt(rangeEnd) || 0

  const singleResult = nNum >= 0 ? calculateFibonacci(nNum) : BigInt(0)
  const sequence = mode === "single" ? generateSequence(nNum) : generateSequence(rangeEndNum)
  const goldenRatio = nNum >= 2 ? goldenRatioApproximation(nNum) : null

  const exportData = {
    title: "Fibonacci Calculator",
    date: formatDate(),
    headers: ["Index", "Fibonacci Number"],
    rows: mode === "single"
      ? sequence.map((val, i) => [i.toString(), val.toString()])
      : sequence.slice(rangeStartNum).map((val, i) => [(i + rangeStartNum).toString(), val.toString()]),
    filename: "fibonacci"
  }

  return (
    <ToolPageLayout
      title="Fibonacci Calculator"
      description="Calculate Fibonacci numbers, view the full sequence, and explore the golden ratio approximation."
      category="Math"
      relatedTools={[
        {
          title: "Percentage Calculator",
          description: "Calculate percentages: X% of Y, what % X is of Y, and percentage change between values.",
          href: "/percentage-calculator",
          icon: Hash,
          category: "Math",
        },
        {
          title: "Random Number Generator",
          description: "Generate random numbers within a range. Customize count, duplicates, sorting, and decimals.",
          href: "/random-number-generator",
          icon: Hash,
          category: "Math",
        },
      ]}
    >
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("single")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "single"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            Single Number
          </button>
          <button
            onClick={() => setMode("range")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "range"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            Range of Numbers
          </button>
        </div>

        {mode === "single" ? (
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Which Fibonacci number (n)?
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              min="0"
              max="10000"
              placeholder="10"
              className="w-full md:w-64 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Enter n to find the nth Fibonacci number (F₀ = 0, F₁ = 1)
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                From index
              </label>
              <input
                type="number"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                min="0"
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                To index
              </label>
              <input
                type="number"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                min="0"
                placeholder="10"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {(nNum >= 0 || (rangeEndNum >= rangeStartNum)) && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Results
          </h2>

          {mode === "single" && nNum >= 0 && (
            <div className="mb-6 p-4 bg-sky-50 dark:bg-sky-950/30 rounded-lg border border-sky-200 dark:border-sky-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                F_{nNum} =
              </p>
              <p className="text-3xl font-bold text-sky-600 dark:text-sky-400 break-all">
                {singleResult.toString()}
              </p>
            </div>
          )}

          {goldenRatio !== null && mode === "single" && (
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                Golden Ratio Approximation (F_{nNum} / F_{nNum - 1})
              </p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {goldenRatio.toFixed(15)}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                True φ ≈ 1.618033988749895
              </p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Fibonacci Sequence
            </h3>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono">
                {(mode === "single" ? sequence : sequence.slice(rangeStartNum)).map((val, i) => {
                  const idx = mode === "single" ? i : i + rangeStartNum
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-zinc-500">F_{idx} =</span>
                      <span className="text-zinc-900 dark:text-zinc-100">{val.toString()}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <ExportButtons data={exportData} />
          <ShareButtons toolName="Fibonacci Calculator" />
        </div>
      )}

      <AffiliateCard
        description="Looking for more math tools?"
        linkText="Explore all math tools"
        href="/#tools"
      />
    </ToolPageLayout>
  )
}
