"use client"

import { useState, useMemo } from "react"
import { Calendar, Cake } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("")

  const age = useMemo(() => {
    if (!birthDate) return null

    const birth = new Date(birthDate)
    const today = new Date()

    if (birth > today) return null

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    // Calculate total days
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    return { years, months, days, totalDays, daysUntilBirthday, nextBirthday }
  }, [birthDate])

  return (
    <ToolPageLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days. Get a countdown to your next birthday."
      category="Health"
      relatedTools={[
        {
          title: "BMI Calculator",
          description: "Calculate your Body Mass Index and check your health category.",
          href: "/bmi-calculator",
          icon: Cake,
          category: "Health",
        },
      ]}
    >
      <div className="p-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {age && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Your Age
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
              <p className="text-3xl font-bold text-sky-500">{age.years}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Years</p>
            </div>
            <div className="text-center p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
              <p className="text-3xl font-bold text-sky-500">{age.months}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Months</p>
            </div>
            <div className="text-center p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
              <p className="text-3xl font-bold text-sky-500">{age.days}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Days</p>
            </div>
            <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{age.totalDays.toLocaleString()}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Days</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-100 dark:border-amber-900/30">
            <div className="flex items-center gap-3">
              <Cake className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Next Birthday</p>
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {age.daysUntilBirthday} {age.daysUntilBirthday === 1 ? "day" : "days"}
                  {" "}({age.nextBirthday.toLocaleDateString("en-US", { month: "long", day: "numeric" })})
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
