"use client"

import { useState } from "react"
import { Repeat } from "lucide-react"
import Link from "next/link"

export default function DCACalculatorPage() {
  const [amount, setAmount] = useState("")
  const [frequency, setFrequency] = useState<"monthly" | "weekly">("monthly")
  const [duration, setDuration] = useState("")
  const [startPrice, setStartPrice] = useState("")
  const [endPrice, setEndPrice] = useState("")

  const investment = parseFloat(amount) || 0
  const months = parseInt(duration) || 0
  const start = parseFloat(startPrice) || 0
  const end = parseFloat(endPrice) || 0

  const periodsPerYear = frequency === "monthly" ? 12 : 52
  const totalPeriods = months * (frequency === "monthly" ? 1 : 4.33)
  const totalInvested = investment * totalPeriods

  // Average price (simplified DCA - assumes linear price movement)
  const avgPrice = start > 0 && end > 0 ? (start + end) / 2 : start || end
  const totalTokens = avgPrice > 0 ? totalInvested / avgPrice : 0
  const currentValue = totalTokens * (end || avgPrice)
  const profit = currentValue - totalInvested
  const roi = totalInvested > 0 ? (profit / totalInvested) * 100 : 0

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            DCA Calculator
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Plan your Dollar Cost Averaging investment strategy
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Investment Amount per Period ($)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as "monthly" | "weekly")}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Duration (months)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="12"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Start Price ($)
              </label>
              <input
                type="number"
                value={startPrice}
                onChange={(e) => setStartPrice(e.target.value)}
                placeholder="30000"
                step="any"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                End Price ($)
              </label>
              <input
                type="number"
                value={endPrice}
                onChange={(e) => setEndPrice(e.target.value)}
                placeholder="45000"
                step="any"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {totalInvested > 0 && (
          <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Investment Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Invested</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ${totalInvested.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Current Value</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ${currentValue.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Profit/Loss</p>
                <p className={`text-2xl font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {profit >= 0 ? "+" : ""}${profit.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">ROI</p>
                <p className={`text-2xl font-bold ${roi >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {roi >= 0 ? "+" : ""}{roi.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Total periods: {Math.round(totalPeriods)} {frequency} • Average entry price: ${avgPrice > 0 ? avgPrice.toFixed(2) : "—"}
              </p>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/crypto-profit-calculator"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Crypto Profit Calculator
            </Link>
            <Link
              href="/compound-interest-calculator"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Compound Interest
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
