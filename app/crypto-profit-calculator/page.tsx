"use client"

import { useState } from "react"
import { TrendingUp, ArrowDownRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function CryptoProfitCalculatorPage() {
  const [buyPrice, setBuyPrice] = useState("")
  const [sellPrice, setSellPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const buy = parseFloat(buyPrice) || 0
  const sell = parseFloat(sellPrice) || 0
  const qty = parseFloat(quantity) || 0

  const invested = buy * qty
  const returned = sell * qty
  const profit = returned - invested
  const roi = invested > 0 ? (profit / invested) * 100 : 0

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Crypto Profit Calculator
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Calculate your cryptocurrency profit or loss with ROI percentage
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Buy Price ($)
              </label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="10000"
                step="any"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Sell Price ($)
              </label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="15000"
                step="any"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0.5"
                step="any"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {qty > 0 && (
          <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Invested</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ${invested.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Returned</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ${returned.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Profit/Loss</p>
                <p className={`text-2xl font-bold flex items-center gap-1 ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {profit >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  ${Math.abs(profit).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">ROI</p>
                <p className={`text-2xl font-bold ${roi >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {roi >= 0 ? "+" : ""}{roi.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dca-calculator"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              DCA Calculator
            </Link>
            <Link
              href="/currency-converter"
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Currency Converter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
