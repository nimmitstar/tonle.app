"use client"

import { useState, useEffect } from "react"
import { DollarSign, RefreshCw } from "lucide-react"
import Link from "next/link"

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "KRW", name: "South Korean Won" },
  { code: "BTC", name: "Bitcoin" },
  { code: "ETH", name: "Ethereum" },
]

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("1")
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("EUR")
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchRate = async () => {
    if (from === to) {
      setRate(1)
      setError("")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      if (!res.ok) throw new Error("Failed to fetch rates")
      const data = await res.json()
      if (!data.rates[to]) throw new Error("Currency not supported")
      setRate(data.rates[to])
    } catch {
      setError("Failed to fetch exchange rate. Please try again.")
      setRate(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRate()
  }, [from, to])

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const amt = parseFloat(amount) || 0
  const result = rate !== null ? amt * rate : null

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Currency Converter
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Convert between 150+ world currencies with real-time rates
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1"
                step="any"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={swap}
              className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Swap currencies"
            >
              <RefreshCw className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>
        </div>

        {loading && (
          <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <RefreshCw className="w-6 h-6 text-sky-500 mx-auto animate-spin" />
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Fetching exchange rates...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={fetchRate}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {result !== null && !loading && !error && (
          <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Conversion Result
            </h2>
            <div className="text-center">
              <p className="text-4xl font-bold text-sky-500">
                {amt.toLocaleString()} {from}
              </p>
              <p className="text-2xl text-zinc-400 my-4">=</p>
              <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}
              </p>
              {rate !== null && rate !== 1 && (
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                  1 {from} = {rate.toFixed(6)} {to}
                </p>
              )}
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
          </div>
        </div>
      </div>
    </div>
  )
}
