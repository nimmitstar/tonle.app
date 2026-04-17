"use client"

import { useState, useEffect } from "react"
import { DollarSign, RefreshCw, TrendingUp } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { AffiliateCard } from "@/components/affiliate-card"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

const currencies = [
  { code: "USD", name: "US Dollar", type: "fiat" },
  { code: "EUR", name: "Euro", type: "fiat" },
  { code: "GBP", name: "British Pound", type: "fiat" },
  { code: "JPY", name: "Japanese Yen", type: "fiat" },
  { code: "AUD", name: "Australian Dollar", type: "fiat" },
  { code: "CAD", name: "Canadian Dollar", type: "fiat" },
  { code: "CHF", name: "Swiss Franc", type: "fiat" },
  { code: "CNY", name: "Chinese Yuan", type: "fiat" },
  { code: "HKD", name: "Hong Kong Dollar", type: "fiat" },
  { code: "SGD", name: "Singapore Dollar", type: "fiat" },
  { code: "INR", name: "Indian Rupee", type: "fiat" },
  { code: "KRW", name: "South Korean Won", type: "fiat" },
  { code: "THB", name: "Thai Baht", type: "fiat" },
  { code: "VND", name: "Vietnamese Dong", type: "fiat" },
  { code: "KHR", name: "Cambodian Riel", type: "fiat" },
  { code: "MYR", name: "Malaysian Ringgit", type: "fiat" },
  { code: "IDR", name: "Indonesian Rupiah", type: "fiat" },
  { code: "PHP", name: "Philippine Peso", type: "fiat" },
  { code: "BTC", name: "Bitcoin", type: "crypto" },
  { code: "ETH", name: "Ethereum", type: "crypto" },
  { code: "BNB", name: "BNB", type: "crypto" },
  { code: "SOL", name: "Solana", type: "crypto" },
  { code: "XRP", name: "Ripple", type: "crypto" },
  { code: "ADA", name: "Cardano", type: "crypto" },
  { code: "DOGE", name: "Dogecoin", type: "crypto" },
]

const COINGECKO_IDS: Record<string, string> = {
  btc: "bitcoin", eth: "ethereum", bnb: "binancecoin", sol: "solana",
  xrp: "ripple", ada: "cardano", doge: "dogecoin",
  usd: "usd", eur: "eur", gbp: "gbp", jpy: "jpy", aud: "aud",
  cad: "cad", chf: "chf", cny: "cny", hkd: "hkd", sgd: "sgd",
  inr: "inr", krw: "krw", thb: "thb", vnd: "vietnamese-dong",
  khr: "cambodian-riel", myr: "malaysian-ringgit", idr: "indonesian-rupiah",
  php: "philippine-peso",
}

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("1")
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("EUR")
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fromInfo = currencies.find(c => c.code === from)
  const toInfo = currencies.find(c => c.code === to)
  const isCrypto = (code: string) => currencies.find(c => c.code === code)?.type === "crypto"

  const fetchRate = async () => {
    if (from === to) {
      setRate(1)
      setError("")
      return
    }

    setLoading(true)
    setError("")

    try {
      let fetchedRate: number

      if (isCrypto(from) || isCrypto(to)) {
        // Use CoinGecko for any crypto pair
        const baseId = COINGECKO_IDS[from.toLowerCase()]
        const targetId = COINGECKO_IDS[to.toLowerCase()]
        if (!baseId || !targetId) throw new Error("Currency not supported")
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${baseId}&vs_currencies=${targetId === "usd" ? "usd" : targetId}`
        )
        if (!res.ok) throw new Error("Failed to fetch rate")
        const data = await res.json()
        if (targetId === "usd") {
          fetchedRate = data[baseId]?.usd ?? data[baseId]?.[targetId]
        } else {
          fetchedRate = data[baseId]?.[targetId]
        }
        if (!fetchedRate) throw new Error("Rate not found")
      } else {
        // Fiat-to-fiat: use CoinGecko exchange rates
        const res = await fetch(
          `https://api.coingecko.com/api/v3/exchange_rates`
        )
        if (!res.ok) throw new Error("Failed to fetch rates")
        const data = await res.json()
        const rates = data.rates
        const fromRate = rates[from.toLowerCase()]?.value ?? 1
        const toRate = rates[to.toLowerCase()]?.value ?? 1
        fetchedRate = toRate / fromRate
      }

      setRate(fetchedRate)
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
    <ToolPageLayout
      title="Currency Converter"
      description="Convert between 150+ world currencies with real-time exchange rates."
      category="Finance"
      relatedTools={[
        {
          title: "Crypto Profit Calculator",
          description: "Calculate your cryptocurrency profit or loss with ROI percentage.",
          href: "/crypto-profit-calculator",
          icon: TrendingUp,
          category: "Finance",
        },
      ]}
    >
      <div className="p-6">
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
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 text-center">
          <RefreshCw className="w-6 h-6 text-sky-500 mx-auto animate-spin" />
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Fetching exchange rates...</p>
        </div>
      )}

      {error && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={fetchRate}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {result !== null && !loading && !error && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
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
          <ExportButtons
            data={{
              title: "Currency Converter",
              date: formatDate(),
              headers: ["Currency", "Amount"],
              rows: [
                [`${fromInfo?.name ?? from} (${from})`, `${amt.toLocaleString()} ${from}`],
                [`${toInfo?.name ?? to} (${to})`, `${result?.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`],
                ["Exchange Rate", `1 ${from} = ${rate?.toFixed(6) ?? "N/A"} ${to}`]
              ],
              filename: "currency-converter"
            }}
          />
          <ShareButtons toolName="Currency Converter" />
        </div>
      )}

      <AffiliateCard
        description="Need to send money abroad?"
        linkText="Send money internationally"
        href="#ref"
      />
    </ToolPageLayout>
  )
}
