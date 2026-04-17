"use client"

import { useState } from "react"
import { DollarSign, Users, Percent, Coffee } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { ShareButtons } from "@/components/share-buttons"
import { formatDate } from "@/lib/export"

const tipPresets = [15, 18, 20, 25]

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState("")
  const [tipPercentage, setTipPercentage] = useState("15")
  const [numberOfPeople, setNumberOfPeople] = useState("1")

  const bill = parseFloat(billAmount) || 0
  const tipPercent = parseFloat(tipPercentage) || 0
  const people = parseInt(numberOfPeople) || 1

  const tipAmount = bill * (tipPercent / 100)
  const totalAmount = bill + tipAmount
  const tipPerPerson = tipAmount / people
  const totalPerPerson = totalAmount / people

  return (
    <ToolPageLayout
      title="Tip Calculator"
      description="Calculate tip amount and split the bill between multiple people. Quick presets included."
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
          title: "Currency Converter",
          description: "Convert between 150+ world currencies with real-time exchange rates.",
          href: "/currency-converter",
          icon: DollarSign,
          category: "Finance",
        },
      ]}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Bill Amount
              </div>
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="50.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Number of People
              </div>
            </label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              placeholder="1"
              min="1"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Tip Percentage: {tipPercent}%
            </div>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tipPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setTipPercentage(preset.toString())}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  tipPercent === preset
                    ? "bg-sky-500 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {preset}%
              </button>
            ))}
          </div>
          <input
            type="range"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(e.target.value)}
            min="0"
            max="50"
            step="1"
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
          </div>
        </div>
      </div>

      {bill > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Tip Amount</p>
              <p className="text-2xl font-bold text-emerald-500">
                ${tipAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Amount</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Per Person (Tip)</p>
              <p className="text-2xl font-bold text-emerald-500">
                ${tipPerPerson.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Per Person (Total)</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                ${totalPerPerson.toFixed(2)}
              </p>
            </div>
          </div>

          {people > 1 && (
            <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-100 dark:border-sky-900/30">
              <div className="flex items-center gap-3">
                <Coffee className="w-8 h-8 text-sky-500" />
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Split Summary</p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {people} {people === 1 ? "person" : "people"} × ${totalPerPerson.toFixed(2)} each
                  </p>
                </div>
              </div>
            </div>
          )}
          <ExportButtons
            data={{
              title: "Tip Calculator",
              date: formatDate(),
              headers: ["Metric", "Value"],
              rows: [
                ["Bill Amount", `$${bill.toFixed(2)}`],
                ["Tip Percentage", `${tipPercent}%`],
                ["Tip Amount", `$${tipAmount.toFixed(2)}`],
                ["Total Amount", `$${totalAmount.toFixed(2)}`],
                ["Number of People", people.toString()],
                ["Tip Per Person", `$${tipPerPerson.toFixed(2)}`],
                ["Total Per Person", `$${totalPerPerson.toFixed(2)}`]
              ],
              filename: "tip-calculator"
            }}
          />
          <ShareButtons toolName="Tip Calculator" />
        </div>
      )}
    </ToolPageLayout>
  )
}
