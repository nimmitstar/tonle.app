"use client"

import { useState } from "react"
import { Repeat, TrendingUp, Percent, Plus, Trash2, ArrowUpDown } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

interface Purchase {
  id: number
  date: string
  amount: string
  price: string
}

export default function DCACalculatorPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: 1, date: new Date().toISOString().split("T")[0], amount: "", price: "" }
  ])
  const [currentPrice, setCurrentPrice] = useState("")
  const [assetName, setAssetName] = useState("")

  const nextId = purchases.reduce((max, p) => Math.max(max, p.id), 0) + 1

  const addRow = () => {
    setPurchases([...purchases, { id: nextId, date: new Date().toISOString().split("T")[0], amount: "", price: "" }])
  }

  const removeRow = (id: number) => {
    if (purchases.length <= 1) return
    setPurchases(purchases.filter(p => p.id !== id))
  }

  const updatePurchase = (id: number, field: keyof Purchase, value: string) => {
    setPurchases(purchases.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  // Calculations
  const validPurchases = purchases.filter(p => parseFloat(p.amount) > 0 && parseFloat(p.price) > 0)
  const totalInvested = validPurchases.reduce((sum, p) => sum + parseFloat(p.amount) * parseFloat(p.price), 0)
  const totalTokens = validPurchases.reduce((sum, p) => sum + parseFloat(p.amount) / parseFloat(p.price), 0)
  const avgBuyPrice = totalTokens > 0 ? totalInvested / totalTokens : 0
  const curPrice = parseFloat(currentPrice) || 0
  const currentValue = totalTokens * curPrice
  const profit = currentValue - totalInvested
  const roi = totalInvested > 0 ? (profit / totalInvested) * 100 : 0

  // Sort purchases by date
  const sortedPurchases = [...validPurchases].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const runningTotals = sortedPurchases.reduce<{ date: string; invested: number; tokens: number; avgPrice: number }[]>((acc, p) => {
    const amt = parseFloat(p.amount)
    const prc = parseFloat(p.price)
    const prev = acc.length > 0 ? acc[acc.length - 1] : { invested: 0, tokens: 0 }
    const invested = prev.invested + amt * prc
    const tokens = prev.tokens + amt / prc
    const avgPrice = tokens > 0 ? invested / tokens : 0
    acc.push({ date: p.date, invested, tokens, avgPrice })
    return acc
  }, [])

  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"

  return (
    <ToolPageLayout
      title="DCA Calculator"
      description="Track your Dollar Cost Averaging investments. Add each purchase with exact amount and price to see your real portfolio performance."
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
      {/* Current Price + Asset Name */}
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Asset Name <span className="text-zinc-400">(optional)</span>
            </label>
            <input
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="Bitcoin, ETH, AAPL..."
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Current Price ($)
            </label>
            <input
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              placeholder="45000"
              step="any"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Purchase Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <th className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-4 py-3 w-36">Date</th>
              <th className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-4 py-3">
                Amount {assetName ? `(${assetName})` : ""}
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-4 py-3">Price ($)</th>
              <th className="text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-4 py-3">Total ($)</th>
              <th className="text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, i) => {
              const amt = parseFloat(purchase.amount) || 0
              const prc = parseFloat(purchase.price) || 0
              const total = amt * prc
              return (
                <tr key={purchase.id} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-sky-50/50 dark:hover:bg-sky-900/10 transition-colors">
                  <td className="px-4 py-2">
                    <input
                      type="date"
                      value={purchase.date}
                      onChange={(e) => updatePurchase(purchase.id, "date", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={purchase.amount}
                      onChange={(e) => updatePurchase(purchase.id, "amount", e.target.value)}
                      placeholder="0.005"
                      step="any"
                      className={inputClass}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={purchase.price}
                      onChange={(e) => updatePurchase(purchase.id, "price", e.target.value)}
                      placeholder="30000"
                      step="any"
                      className={inputClass}
                    />
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {total > 0 ? `$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => removeRow(purchase.id)}
                      disabled={purchases.length <= 1}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Remove row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Add Row Button */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={addRow}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Purchase
        </button>
      </div>

      {/* Summary */}
      {validPurchases.length > 0 && (
        <div className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Investment Summary
          </h2>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total Invested</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total {assetName || "Tokens"}</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {totalTokens.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Avg Buy Price</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                ${avgBuyPrice > 0 ? avgBuyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Current Value</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {curPrice > 0 ? `$${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Profit / Loss</p>
              <p className={`text-xl font-bold ${curPrice > 0 ? (profit >= 0 ? "text-green-500" : "text-red-500") : "text-zinc-400"}`}>
                {curPrice > 0 ? `${profit >= 0 ? "+" : ""}$${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Set price →"}
              </p>
              {curPrice > 0 && (
                <p className={`text-xs mt-1 ${roi >= 0 ? "text-green-500/70" : "text-red-500/70"}`}>
                  {roi >= 0 ? "+" : ""}{roi.toFixed(2)}% ROI
                </p>
              )}
            </div>
          </div>

          {/* Running Average Table */}
          {runningTotals.length > 1 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Running Average Price
              </h3>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-zinc-500">Date</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-zinc-500">Total Invested</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-zinc-500">Total {assetName || "Tokens"}</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-zinc-500">Avg Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {runningTotals.map((row, i) => (
                      <tr key={i} className="border-t border-zinc-100 dark:border-zinc-800/50">
                        <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{row.date}</td>
                        <td className="px-3 py-2 text-right text-zinc-700 dark:text-zinc-300">
                          ${row.invested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2 text-right text-zinc-700 dark:text-zinc-300">
                          {row.tokens.toFixed(6)}
                        </td>
                        <td className="px-3 py-2 text-right font-medium text-sky-600 dark:text-sky-400">
                          ${row.avgPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ExportButtons
                data={{
                  title: "DCA Calculator",
                  date: formatDate(),
                  headers: ["Date", "Total Invested", `Total ${assetName || "Tokens"}`, "Avg Price"],
                  rows: runningTotals.map(row => [
                    row.date,
                    `$${row.invested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    row.tokens.toFixed(6),
                    `$${row.avgPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  ]),
                  filename: "dca-calculator"
                }}
              />
              <ShareButtons toolName="DCA Calculator" />
            </div>
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
