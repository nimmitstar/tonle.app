"use client"

import { useState } from "react"
import { DollarSign, TrendingUp, Calendar } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

// US CPI data (annual average, indexed to 1982-84=100)
// Source: Bureau of Labor Statistics
const cpiData: Record<number, number> = {
  1913: 9.9, 1914: 10.0, 1915: 10.1, 1916: 10.9, 1917: 12.8, 1918: 15.0, 1919: 17.3,
  1920: 20.0, 1921: 17.9, 1922: 16.8, 1923: 17.1, 1924: 17.1, 1925: 17.5, 1926: 17.7,
  1927: 17.4, 1928: 17.1, 1929: 17.1, 1930: 16.7, 1931: 15.2, 1932: 13.7, 1933: 13.0,
  1934: 13.4, 1935: 13.7, 1936: 13.9, 1937: 14.4, 1938: 14.1, 1939: 13.9, 1940: 14.0,
  1941: 14.7, 1942: 16.3, 1943: 17.3, 1944: 17.6, 1945: 18.0, 1946: 19.5, 1947: 22.3,
  1948: 24.1, 1949: 23.8, 1950: 24.1, 1951: 26.0, 1952: 26.5, 1953: 26.7, 1954: 26.9,
  1955: 26.8, 1956: 27.2, 1957: 28.1, 1958: 28.9, 1959: 29.1, 1960: 29.6, 1961: 29.9,
  1962: 30.2, 1963: 30.6, 1964: 31.0, 1965: 31.5, 1966: 32.4, 1967: 33.4, 1968: 34.8,
  1969: 36.7, 1970: 38.8, 1971: 40.5, 1972: 41.8, 1973: 44.4, 1974: 49.3, 1975: 53.8,
  1976: 56.9, 1977: 60.6, 1978: 65.2, 1979: 72.6, 1980: 82.4, 1981: 90.9, 1982: 96.5,
  1983: 99.6, 1984: 103.9, 1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0,
  1990: 130.7, 1991: 136.2, 1992: 140.3, 1993: 144.5, 1994: 148.2, 1995: 152.4, 1996: 156.9,
  1997: 160.5, 1998: 163.0, 1999: 166.6, 2000: 172.2, 2001: 177.1, 2002: 179.9, 2003: 184.0,
  2004: 188.9, 2005: 195.3, 2006: 201.6, 2007: 207.3, 2008: 215.3, 2009: 214.5, 2010: 218.1,
  2011: 224.9, 2012: 229.6, 2013: 233.0, 2014: 236.7, 2015: 237.0, 2016: 240.0, 2017: 245.1,
  2018: 251.1, 2019: 255.7, 2020: 258.8, 2021: 270.1, 2022: 292.1, 2023: 304.7, 2024: 310.5,
}

const currentYear = new Date().getFullYear()

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState("")
  const [startYear, setStartYear] = useState("2020")
  const [endYear, setEndYear] = useState(currentYear.toString())

  const amt = parseFloat(amount) || 0
  const start = parseInt(startYear)
  const end = parseInt(endYear)

  const getCPI = (year: number): number => {
    // If year is in the future or beyond our data, estimate with last available
    if (year > 2024) return cpiData[2024]
    // If year is before our data, use the earliest available
    if (year < 1913) return cpiData[1913]
    return cpiData[year as keyof typeof cpiData] || cpiData[2024]
  }

  const startCPI = getCPI(start)
  const endCPI = getCPI(end)

  const adjustedValue = startCPI > 0 ? (amt * endCPI) / startCPI : 0
  const inflationRate = startCPI > 0 ? ((endCPI - startCPI) / startCPI) * 100 : 0

  return (
    <ToolPageLayout
      title="Inflation Calculator"
      description="Calculate how inflation affects the purchasing power of your money over time using US CPI data."
      category="Finance"
      relatedTools={[
        {
          title: "Stock ROI Calculator",
          description: "Calculate your stock investment return and CAGR.",
          href: "/stock-roi-calculator",
          icon: TrendingUp,
          category: "Finance",
        },
        {
          title: "Compound Interest Calculator",
          description: "See how your money grows over time with compound interest.",
          href: "/compound-interest-calculator",
          icon: TrendingUp,
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
                Amount
              </div>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                From Year
              </div>
            </label>
            <select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {Object.keys(cpiData)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                To Year
              </div>
            </label>
            <select
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {Object.keys(cpiData)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {amt > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/30 rounded-xl">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                ${amt.toFixed(2)} in {start} is equivalent to
              </p>
              <p className="text-4xl font-bold text-sky-500">
                ${adjustedValue.toFixed(2)}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                in {end}
              </p>
            </div>
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                Cumulative Inflation Rate
              </p>
              <p className={`text-4xl font-bold ${inflationRate >= 0 ? "text-red-500" : "text-green-500"}`}>
                {inflationRate >= 0 ? "+" : ""}{inflationRate.toFixed(2)}%
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                from {start} to {end}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <strong>What this means:</strong> What cost ${amt.toFixed(2)} in {start} would cost approximately{" "}
              <strong>${adjustedValue.toFixed(2)}</strong> in {end}. This represents a{" "}
              <strong className={inflationRate >= 0 ? "text-red-500" : "text-green-500"}>
                {inflationRate >= 0 ? "+" : ""}{inflationRate.toFixed(2)}%
              </strong>{" "}
              change in the price level due to inflation.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3">
              Data source: US Bureau of Labor Statistics Consumer Price Index (CPI), 1913-{Math.max(currentYear, 2024)}.
              Based on annual average CPI data.
            </p>
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
