"use client"

import { useState } from "react"
import { Percent, Landmark, Repeat } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [compound, setCompound] = useState<"annually" | "semiannually" | "quarterly" | "monthly" | "daily">("annually")

  const P = parseFloat(principal) || 0
  const r = (parseFloat(rate) || 0) / 100
  const t = parseInt(years) || 0

  const nMap = {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  }
  const n = nMap[compound]

  const A = P * Math.pow(1 + r / n, n * t)
  const interest = A - P

  return (
    <ToolPageLayout
      title="Compound Interest Calculator"
      description="See how your money grows over time with compound interest at different frequencies."
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
          title: "Loan Calculator",
          description: "Calculate monthly payments, total interest, and view amortization schedule.",
          href: "/loan-calculator",
          icon: Landmark,
          category: "Finance",
        },
      ]}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Principal Amount ($)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="10000"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="7"
              step="0.1"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Time Period (years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Compound Frequency
            </label>
            <select
              value={compound}
              onChange={(e) => setCompound(e.target.value as any)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="annually">Annually (1x/year)</option>
              <option value="semiannually">Semi-Annually (2x/year)</option>
              <option value="quarterly">Quarterly (4x/year)</option>
              <option value="monthly">Monthly (12x/year)</option>
              <option value="daily">Daily (365x/year)</option>
            </select>
          </div>
        </div>
      </div>

      {P > 0 && t > 0 && (
        <>
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Principal</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ${P.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Interest Earned</p>
                <p className="text-2xl font-bold text-green-500">
                  +${interest.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Final Amount</p>
                <p className="text-2xl font-bold text-sky-500">
                  ${A.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Year-by-Year Breakdown
            </h2>
            <div className="space-y-3">
              {Array.from({ length: t }, (_, i) => {
                const year = i + 1
                const yearAmount = P * Math.pow(1 + r / n, n * year)
                const yearInterest = yearAmount - P
                return (
                  <div key={year} className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-600 dark:text-zinc-400">Year {year}</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                      ${yearAmount.toFixed(2)}
                    </span>
                    <span className="text-green-500 text-sm">
                      +${yearInterest.toFixed(2)}
                    </span>
                  </div>
                )
              })}
            </div>
            <ExportButtons
              data={{
                title: "Compound Interest Calculator",
                date: formatDate(),
                headers: ["Year", "Balance", "Interest Earned"],
                rows: Array.from({ length: t }, (_, i) => {
                  const year = i + 1
                  const yearAmount = P * Math.pow(1 + r / n, n * year)
                  const yearInterest = yearAmount - P
                  return [year.toString(), `$${yearAmount.toFixed(2)}`, `$${yearInterest.toFixed(2)}`]
                }),
                filename: "compound-interest"
              }}
            />
            <ShareButtons toolName="Compound Interest Calculator" />
          </div>
        </>
      )}
    </ToolPageLayout>
  )
}
