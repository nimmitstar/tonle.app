"use client"

import { useState } from "react"
import { TrendingUp, ArrowDownRight, ArrowUpRight } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { AffiliateCard } from "@/components/affiliate-card"

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
    <ToolPageLayout
      title="Crypto Profit Calculator"
      description="Calculate your cryptocurrency profit or loss with ROI percentage based on buy and sell prices."
      category="Finance"
      relatedTools={[
        {
          title: "DCA Calculator",
          description: "Plan your Dollar Cost Averaging strategy with investment amount, frequency, and duration.",
          href: "/dca-calculator",
          icon: Repeat,
          category: "Finance",
        },
        {
          title: "Currency Converter",
          description: "Convert between 150+ world currencies with real-time exchange rates.",
          href: "/currency-converter",
          icon: DollarSign,
          category: "Finance",
        },
      ]}
    >
      <div className="p-6">
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
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
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

      <AffiliateCard
        description="Trade crypto with low fees:"
        linkText="Trade on Binance"
        href="https://www.binance.com/en/register?ref=#ref"
      />
    </ToolPageLayout>
  )
}

// Import for related tools
import { Repeat, DollarSign } from "lucide-react"
