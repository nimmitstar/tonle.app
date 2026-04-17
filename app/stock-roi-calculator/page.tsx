"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, Calendar, Percent } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { formatDate } from "@/lib/export"

export default function StockROICalculatorPage() {
  const [buyPrice, setBuyPrice] = useState("")
  const [sellPrice, setSellPrice] = useState("")
  const [shares, setShares] = useState("")
  const [holdingPeriod, setHoldingPeriod] = useState("")
  const [holdingUnit, setHoldingUnit] = useState<"days" | "months" | "years">("years")

  const buy = parseFloat(buyPrice) || 0
  const sell = parseFloat(sellPrice) || 0
  const numShares = parseFloat(shares) || 0
  const period = parseFloat(holdingPeriod) || 0

  const invested = buy * numShares
  const returned = sell * numShares
  const profit = returned - invested
  const totalReturn = invested > 0 ? (profit / invested) * 100 : 0

  // Calculate annualized ROI and CAGR
  let annualizedROI = 0
  let cagr = 0
  let years = 0

  if (holdingUnit === "days") {
    years = period / 365
  } else if (holdingUnit === "months") {
    years = period / 12
  } else {
    years = period
  }

  if (years > 0 && invested > 0 && sell > 0 && buy > 0) {
    // Annualized ROI (simple)
    annualizedROI = totalReturn / years

    // CAGR formula: (Ending/Beginning)^(1/years) - 1
    cagr = (Math.pow(returned / invested, 1 / years) - 1) * 100
  }

  return (
    <ToolPageLayout
      title="Stock ROI Calculator"
      description="Calculate your stock investment return, total ROI, annualized return, and CAGR."
      category="Finance"
      relatedTools={[
        {
          title: "Crypto Profit Calculator",
          description: "Calculate your cryptocurrency profit or loss with ROI percentage.",
          href: "/crypto-profit-calculator",
          icon: TrendingUp,
          category: "Finance",
        },
        {
          title: "Compound Interest Calculator",
          description: "See how your money grows over time with compound interest.",
          href: "/compound-interest-calculator",
          icon: Percent,
          category: "Finance",
        },
      ]}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Buy Price per Share
              </div>
            </label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
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
                Sell Price per Share
              </div>
            </label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              placeholder="150.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Number of Shares
            </label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="100"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Holding Period
              </div>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(e.target.value)}
                placeholder="1"
                step="0.01"
                min="0"
                className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <select
                value={holdingUnit}
                onChange={(e) => setHoldingUnit(e.target.value as "days" | "months" | "years")}
                className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {invested > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Investment Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
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
                {profit >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                ${Math.abs(profit).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Return</p>
              <p className={`text-2xl font-bold ${totalReturn >= 0 ? "text-green-500" : "text-red-500"}`}>
                {totalReturn >= 0 ? "+" : ""}{totalReturn.toFixed(2)}%
              </p>
            </div>
          </div>

          {years > 0 && (
            <>
              <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Annualized Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Annualized ROI</p>
                      <p className={`text-xl font-bold ${annualizedROI >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {annualizedROI >= 0 ? "+" : ""}{annualizedROI.toFixed(2)}%
                      </p>
                    </div>
                    <Percent className="w-8 h-8 text-zinc-400" />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                    Simple annualized return based on holding period of {years.toFixed(2)} years
                  </p>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">CAGR</p>
                      <p className={`text-xl font-bold ${cagr >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {cagr >= 0 ? "+" : ""}{cagr.toFixed(2)}%
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-zinc-400" />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                    Compound Annual Growth Rate
                  </p>
                </div>
              </div>
            </>
          )}
          <ExportButtons
            data={{
              title: "Stock ROI Calculator",
              date: formatDate(),
              headers: ["Metric", "Value"],
              rows: [
                ["Buy Price", `$${buy.toFixed(2)}`],
                ["Sell Price", `$${sell.toFixed(2)}`],
                ["Shares", numShares.toString()],
                ["Invested", `$${invested.toFixed(2)}`],
                ["Returned", `$${returned.toFixed(2)}`],
                ["Profit/Loss", `${profit >= 0 ? "+" : ""}$${profit.toFixed(2)}`],
                ["Total Return", `${totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(2)}%`],
                ...(years > 0 ? [
                  ["Holding Period", `${years.toFixed(2)} years`],
                  ["Annualized ROI", `${annualizedROI >= 0 ? "+" : ""}${annualizedROI.toFixed(2)}%`],
                  ["CAGR", `${cagr >= 0 ? "+" : ""}${cagr.toFixed(2)}%`]
                ] as (string | number)[][] : [])
              ],
              filename: "stock-roi"
            }}
          />
        </div>
      )}
    </ToolPageLayout>
  )
}
