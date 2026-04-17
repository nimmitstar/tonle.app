"use client"

import { useState } from "react"
import { Landmark, Percent } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { AffiliateCard } from "@/components/affiliate-card"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")

  const P = parseFloat(principal) || 0
  const annualRate = parseFloat(rate) || 0
  const n = parseInt(years) || 0

  const monthlyRate = annualRate / 100 / 12
  const numPayments = n * 12

  let monthlyPayment = 0
  let totalPayment = 0
  let totalInterest = 0

  if (P > 0 && annualRate > 0 && n > 0) {
    monthlyPayment = (P * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    totalPayment = monthlyPayment * numPayments
    totalInterest = totalPayment - P
  } else if (P > 0 && n > 0) {
    monthlyPayment = P / numPayments
    totalPayment = P
    totalInterest = 0
  }

  // Generate amortization schedule (first 5 years max for display)
  const schedule = []
  if (monthlyPayment > 0) {
    let balance = P
    const maxRows = Math.min(numPayments, 60)
    for (let i = 1; i <= maxRows; i++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      })
    }
  }

  return (
    <ToolPageLayout
      title="Loan Calculator"
      description="Calculate monthly payments, total interest, and view amortization schedule for any loan."
      category="Finance"
      relatedTools={[
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
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="100000"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="6.5"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Loan Term (years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="30"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {monthlyPayment > 0 && (
        <>
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Loan Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Monthly Payment</p>
                <p className="text-2xl font-bold text-sky-500">
                  ${monthlyPayment.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Payment</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ${totalPayment.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Interest</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ${totalInterest.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Amortization Schedule
              {numPayments > 60 && <span className="text-sm font-normal text-zinc-500"> (first 5 years)</span>}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-3 px-4 text-zinc-700 dark:text-zinc-300 font-medium">Month</th>
                    <th className="text-right py-3 px-4 text-zinc-700 dark:text-zinc-300 font-medium">Payment</th>
                    <th className="text-right py-3 px-4 text-zinc-700 dark:text-zinc-300 font-medium">Principal</th>
                    <th className="text-right py-3 px-4 text-zinc-700 dark:text-zinc-300 font-medium">Interest</th>
                    <th className="text-right py-3 px-4 text-zinc-700 dark:text-zinc-300 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.month} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="py-3 px-4 text-zinc-900 dark:text-zinc-100">{row.month}</td>
                      <td className="py-3 px-4 text-right text-zinc-900 dark:text-zinc-100">${row.payment.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right text-green-600 dark:text-green-400">${row.principal.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right text-zinc-600 dark:text-zinc-400">${row.interest.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right text-zinc-900 dark:text-zinc-100">${row.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ExportButtons
              data={{
                title: "Loan Calculator",
                date: formatDate(),
                headers: ["Month", "Payment", "Principal", "Interest", "Balance"],
                rows: schedule.map(row => [
                  row.month,
                  `$${row.payment.toFixed(2)}`,
                  `$${row.principal.toFixed(2)}`,
                  `$${row.interest.toFixed(2)}`,
                  `$${row.balance.toFixed(2)}`
                ]),
                filename: "loan-calculator"
              }}
            />
            <ShareButtons toolName="Loan Calculator" />
          </div>
        </>
      )}

      <AffiliateCard
        description="Looking for better rates?"
        linkText="Compare loan rates"
        href="#ref"
      />
    </ToolPageLayout>
  )
}
