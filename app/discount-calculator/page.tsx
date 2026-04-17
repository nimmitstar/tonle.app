"use client"

import { useState } from "react"
import { Percent, DollarSign, Plus, Trash2 } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

interface Discount {
  id: string
  percent: string
}

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState("")
  const [discounts, setDiscounts] = useState<Discount[]>([{ id: "1", percent: "" }])

  const addDiscount = () => {
    setDiscounts([...discounts, { id: Date.now().toString(), percent: "" }])
  }

  const removeDiscount = (id: string) => {
    if (discounts.length > 1) {
      setDiscounts(discounts.filter((d) => d.id !== id))
    }
  }

  const updateDiscount = (id: string, percent: string) => {
    setDiscounts(discounts.map((d) => (d.id === id ? { ...d, percent } : d)))
  }

  const price = parseFloat(originalPrice) || 0

  // Calculate final price with sequential discounts
  let currentPrice = price
  const discountDetails = []

  for (const discount of discounts) {
    const pct = parseFloat(discount.percent) || 0
    if (pct > 0 && currentPrice > 0) {
      const discountAmount = currentPrice * (pct / 100)
      discountDetails.push({
        percent: pct,
        amount: discountAmount,
        priceBefore: currentPrice,
        priceAfter: currentPrice - discountAmount,
      })
      currentPrice -= discountAmount
    }
  }

  const finalPrice = Math.max(0, currentPrice)
  const totalSavings = price - finalPrice

  return (
    <ToolPageLayout
      title="Discount Calculator"
      description="Calculate the final price after applying one or multiple percentage discounts. See your savings at each step."
      category="Finance"
      relatedTools={[
        {
          title: "Percentage Calculator",
          description: "Calculate percentages: X% of Y, what % X is of Y, and percentage change.",
          href: "/percentage-calculator",
          icon: Percent,
          category: "Math",
        },
        {
          title: "Tip Calculator",
          description: "Calculate tip amount and split the bill between multiple people.",
          href: "/tip-calculator",
          icon: DollarSign,
          category: "Finance",
        },
      ]}
    >
      <div className="p-6">
        {/* Original Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Original Price
            </div>
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="100.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        {/* Discounts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Discounts
              </div>
            </label>
            <button
              onClick={addDiscount}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Discount
            </button>
          </div>

          <div className="space-y-3">
            {discounts.map((discount, index) => (
              <div key={discount.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="number"
                      value={discount.percent}
                      onChange={(e) => updateDiscount(discount.id, e.target.value)}
                      placeholder="20"
                      step="0.01"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
                      %
                    </span>
                  </div>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 min-w-[80px]">
                  {index === 0 ? "off" : "then off"}
                </span>
                {discounts.length > 1 && (
                  <button
                    onClick={() => removeDiscount(discount.id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    title="Remove discount"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {price > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Results
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Original Price</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                ${price.toFixed(2)}
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900/30">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">You Save</p>
              <p className="text-2xl font-bold text-emerald-500">
                ${totalSavings.toFixed(2)}
              </p>
            </div>
            <div className="bg-sky-50 dark:bg-sky-950/30 rounded-xl p-4 border border-sky-100 dark:border-sky-900/30">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Final Price</p>
              <p className="text-2xl font-bold text-sky-500">
                ${finalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Discount Breakdown */}
          {discountDetails.length > 0 && (
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                Discount Breakdown
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Starting price</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                    ${price.toFixed(2)}
                  </span>
                </div>
                {discountDetails.map((detail, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        After {detail.percent}% discount
                      </span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                        -${detail.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Price = ${detail.priceAfter.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total Savings Badge */}
          {totalSavings > 0 && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                You save {((totalSavings / price) * 100).toFixed(1)}% overall
              </span>
            </div>
          )}
          <ExportButtons
            data={{
              title: "Discount Calculator",
              date: formatDate(),
              headers: ["Step", "Description"],
              rows: [
                ["Original Price", `$${price.toFixed(2)}`],
                ...discountDetails.flatMap((detail, index) => [
                  [`Discount ${index + 1} (${detail.percent}%)`, `-$${detail.amount.toFixed(2)}`],
                  [`Price After Discount ${index + 1}`, `$${detail.priceAfter.toFixed(2)}`]
                ] as (string | number)[][]),
                ["Total Savings", `$${totalSavings.toFixed(2)}`],
                ["Final Price", `$${finalPrice.toFixed(2)}`]
              ],
              filename: "discount-calculator"
            }}
          />
          <ShareButtons toolName="Discount Calculator" />
        </div>
      )}
    </ToolPageLayout>
  )
}
