"use client"

import { useState, useMemo } from "react"
import { Clock, Moon, Sunrise, BedDouble } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { formatDate as formatExportDate } from "@/lib/export"

// 90 minutes per sleep cycle
const CYCLE_MINUTES = 90
const FALL_ASLEEP_MINUTES = 14 // average time to fall asleep

export default function SleepCalculatorPage() {
  const [mode, setMode] = useState<"sleepAt" | "wakeAt">("wakeAt")
  const [hour, setHour] = useState("7")
  const [minute, setMinute] = useState("0")
  const [ampm, setAmPM] = useState<"AM" | "PM">("AM")

  // Calculate sleep times
  const sleepTimes = useMemo(() => {
    const h = parseInt(hour) || 7
    const m = parseInt(minute) || 0
    const isPM = ampm === "PM"

    // Convert to 24-hour
    let baseHour = h
    if (isPM && h !== 12) baseHour += 12
    if (!isPM && h === 12) baseHour = 0

    const baseDate = new Date()
    baseDate.setHours(baseHour, m, 0, 0)

    const times: Array<{
      cycles: number
      totalHours: number
      time: Date
      sleepDuration: string
    }> = []

    for (let cycles = 6; cycles >= 4; cycles--) {
      const totalMinutes = cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES
      const totalHours = totalMinutes / 60

      const targetDate = new Date(baseDate)

      if (mode === "wakeAt") {
        // Calculate bedtime: wake time - sleep duration
        targetDate.setTime(targetDate.getTime() - totalMinutes * 60 * 1000)
      } else {
        // Calculate wake time: bedtime + sleep duration
        targetDate.setTime(targetDate.getTime() + totalMinutes * 60 * 1000)
      }

      const hours = Math.floor(totalMinutes / 60)
      const mins = totalMinutes % 60

      times.push({
        cycles,
        totalHours,
        time: targetDate,
        sleepDuration: `${hours}h ${mins}m`,
      })
    }

    return times
  }, [hour, minute, ampm, mode])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <ToolPageLayout
      title="Sleep Calculator"
      description="Find optimal sleep and wake times based on 90-minute sleep cycles. Wake up refreshed by timing your sleep cycles."
      category="Health"
      relatedTools={[
        {
          title: "Age Calculator",
          description: "Calculate your exact age and countdown to your next birthday.",
          href: "/age-calculator",
          icon: Clock,
          category: "Health",
        },
        {
          title: "BMI Calculator",
          description: "Calculate your Body Mass Index and check your health category.",
          href: "/bmi-calculator",
          icon: Moon,
          category: "Health",
        },
      ]}
    >
      <div className="p-6">
        {/* Mode Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("wakeAt")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "wakeAt"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <Sunrise className="w-4 h-4" />
            I want to wake up at...
          </button>
          <button
            onClick={() => setMode("sleepAt")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "sleepAt"
                ? "bg-sky-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <BedDouble className="w-4 h-4" />
            I want to sleep at...
          </button>
        </div>

        {/* Time Input */}
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            {mode === "wakeAt" ? "Wake Up Time" : "Bed Time"}
          </label>
          <div className="flex gap-2">
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="flex items-center text-zinc-500">:</span>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {["00", "15", "30", "45"].map((m) => (
                <option key={m} value={m === "00" ? "0" : m}>
                  {m}
                </option>
              ))}
            </select>
            <div className="flex rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-700">
              <button
                onClick={() => setAmPM("AM")}
                className={`px-4 py-3 font-medium transition-colors ${
                  ampm === "AM"
                    ? "bg-sky-500 text-white"
                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                }`}
              >
                AM
              </button>
              <button
                onClick={() => setAmPM("PM")}
                className={`px-4 py-3 font-medium transition-colors ${
                  ampm === "PM"
                    ? "bg-sky-500 text-white"
                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                }`}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-100 dark:border-amber-900/30">
          <div className="flex items-start gap-3">
            <Moon className="w-5 h-5 text-amber-500 mt-0.5" />
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                How Sleep Cycles Work
              </p>
              <p>
                Each sleep cycle lasts approximately 90 minutes. Waking up between cycles helps you feel
                more refreshed. This calculator includes {FALL_ASLEEP_MINUTES} minutes to fall asleep.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          {mode === "wakeAt" ? "Go to Bed at These Times" : "Wake Up at These Times"}
        </h2>

        <div className="space-y-3">
          {sleepTimes.map((item) => (
            <div
              key={item.cycles}
              className={`p-4 rounded-xl border-2 transition-all ${
                item.cycles === 5
                  ? "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800"
                  : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                    {item.cycles} cycles × {CYCLE_MINUTES}min = {item.sleepDuration} sleep
                  </p>
                  <p className={`text-2xl font-bold ${
                    item.cycles === 5 ? "text-sky-500" : "text-zinc-900 dark:text-zinc-100"
                  }`}>
                    {formatTime(item.time)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.totalHours}h total
                  </p>
                  {item.cycles === 5 && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          <p>
            {mode === "wakeAt"
              ? "Times shown account for ~14 minutes to fall asleep. Set your alarm for the wake-up time and aim to be in bed at the indicated time."
              : "Times shown account for ~14 minutes to fall asleep. These are ideal wake times to feel refreshed."}
          </p>
        </div>
        <ExportButtons
          data={{
            title: "Sleep Calculator",
            date: formatExportDate(),
            headers: ["Cycles", "Sleep Duration", mode === "wakeAt" ? "Bed Time" : "Wake Time"],
            rows: sleepTimes.map(item => [
              `${item.cycles} cycles`,
              item.sleepDuration,
              formatTime(item.time)
            ]),
            filename: "sleep-calculator"
          }}
        />
      </div>
    </ToolPageLayout>
  )
}
