"use client"

import { useState } from "react"
import { Landmark } from "lucide-react"
import Link from "next/link"

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Loan Calculator
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Calculate monthly payments and view amortization schedule
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
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
            <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
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

            <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
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
            </div>
          </>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
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
