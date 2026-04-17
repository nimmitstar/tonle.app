"use client"

import { useState } from "react"
import { TrendingUp, DollarSign, Percent, Calendar, RotateCcw } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

export default function SIPCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("")
  const [expectedReturn, setExpectedReturn] = useState("")
  const [years, setYears] = useState("")

  const monthly = parseFloat(monthlyInvestment) || 0
  const annualReturn = parseFloat(expectedReturn) || 0
  const duration = parseFloat(years) || 0

  // Calculate SIP
  const monthlyRate = annualReturn / 12 / 100
  const totalMonths = duration * 12

  let totalInvested = 0
  let estimatedReturns = 0
  let totalValue = 0

  if (monthly > 0 && annualReturn > 0 && duration > 0) {
    totalInvested = monthly * totalMonths
    // SIP Future Value formula: P × ({[1 + r]^n – 1} / r) × (1 + r)
    const futureValue = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate)
    totalValue = futureValue
    estimatedReturns = totalValue - totalInvested
  } else if (monthly > 0 && duration > 0) {
    totalInvested = monthly * totalMonths
    totalValue = totalInvested
    estimatedReturns = 0
  }

  // For chart visualization
  const investedPercent = totalValue > 0 ? (totalInvested / totalValue) * 100 : 0
  const returnsPercent = totalValue > 0 ? (estimatedReturns / totalValue) * 100 : 0

  return (
    <ToolPageLayout
      title="SIP Calculator"
      description="Calculate returns on your Systematic Investment Plan (SIP). Visualize breakdown of invested amount vs. returns."
      category="Finance"
      relatedTools={[
        {
          title: "DCA Calculator",
          description: "Plan your Dollar Cost Averaging investment strategy.",
          href: "/dca-calculator",
          icon: Calendar,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Monthly Investment
              </div>
            </label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="500"
              step="1"
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Expected Return Rate (%)
              </div>
            </label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              placeholder="12"
              step="0.1"
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Time Period (Years)
              </div>
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
              step="1"
              min="1"
              max="50"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        {(monthly > 0 || annualReturn > 0 || duration > 0) && (
          <button
            onClick={() => { setMonthlyInvestment(""); setExpectedReturn(""); setYears("") }}
            className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear inputs
          </button>
        )}
      </div>

      {totalValue > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Results
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                ${totalInvested.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Estimated Returns</p>
              <p className="text-2xl font-bold text-emerald-500">
                ${estimatedReturns.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Value</p>
              <p className="text-2xl font-bold text-sky-500">
                ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Visual Bar Chart */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              Investment Breakdown
            </h3>
            <div className="h-12 rounded-lg overflow-hidden flex">
              <div
                className="bg-zinc-400 dark:bg-zinc-600 flex items-center justify-start px-3 transition-all duration-500"
                style={{ width: `${Math.max(investedPercent, 0)}%` }}
              >
                {investedPercent > 15 && (
                  <span className="text-xs font-medium text-white whitespace-nowrap">
                    Invested {investedPercent.toFixed(1)}%
                  </span>
                )}
              </div>
              <div
                className="bg-emerald-500 flex items-center justify-end px-3 transition-all duration-500"
                style={{ width: `${Math.max(returnsPercent, 0)}%` }}
              >
                {returnsPercent > 15 && (
                  <span className="text-xs font-medium text-white whitespace-nowrap">
                    Returns {returnsPercent.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-zinc-400 dark:bg-zinc-600" />
                <span className="text-xs text-zinc-600 dark:text-zinc-400">Invested Amount</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-xs text-zinc-600 dark:text-zinc-400">Estimated Returns</span>
              </div>
            </div>
          </div>

          {/* Year-by-Year Breakdown */}
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              Year-by-Year Growth
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {Array.from({ length: Math.min(duration, 30) }, (_, i) => {
                const year = i + 1
                const months = year * 12
                const yearInvested = monthly * months
                const yearValue = monthlyRate > 0
                  ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
                  : yearInvested
                const yearReturns = yearValue - yearInvested

                return (
                  <div
                    key={year}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm"
                  >
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">Year {year}</span>
                    <div className="flex gap-6">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Invested: ${yearInvested.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </span>
                      <span className="text-emerald-500 font-medium">
                        +${yearReturns.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </span>
                      <span className="text-sky-500 font-semibold">
                        ${yearValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <ExportButtons
            data={{
              title: "SIP Calculator",
              date: formatDate(),
              headers: ["Year", "Invested", "Returns", "Total Value"],
              rows: Array.from({ length: Math.min(duration, 30) }, (_, i) => {
                const year = i + 1
                const months = year * 12
                const yearInvested = monthly * months
                const yearValue = monthlyRate > 0
                  ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
                  : yearInvested
                const yearReturns = yearValue - yearInvested
                return [
                  year.toString(),
                  `$${yearInvested.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
                  `$${yearReturns.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
                  `$${yearValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                ]
              }),
              filename: "sip-calculator"
            }}
          />
          <ShareButtons toolName="SIP Calculator" />
        </div>
      )}
    </ToolPageLayout>
  )
}
