"use client"

import { useState, useEffect, useMemo } from "react"
import { Calendar, Clock, Play, Pause, RotateCcw } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { formatDate as formatExportDate } from "@/lib/export"

export default function CountdownTimerPage() {
  const [targetDate, setTargetDate] = useState("")
  const [targetTime, setTargetTime] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const targetDateTime = useMemo(() => {
    if (!targetDate || !targetTime) return null
    return new Date(`${targetDate}T${targetTime}`)
  }, [targetDate, targetTime])

  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    if (!targetDateTime || !isRunning) return

    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = targetDateTime.getTime() - now.getTime()

      if (diff <= 0) {
        setIsPast(true)
        setIsRunning(false)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setIsPast(false)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDateTime, isRunning])

  const handleStart = () => {
    if (targetDateTime && targetDateTime > new Date()) {
      setIsRunning(true)
      setIsPast(false)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(null)
    setIsPast(false)
  }

  const now = new Date()
  const minDate = now.toISOString().split("T")[0]
  const minTime = now.toTimeString().slice(0, 5)

  return (
    <ToolPageLayout
      title="Countdown Timer"
      description="Pick a date and time to count down to. Perfect for events, deadlines, and reminders."
      category="Utility"
      relatedTools={[
        {
          title: "Stopwatch",
          description: "Measure elapsed time with start, stop, and lap functionality.",
          href: "/stopwatch",
          icon: Clock,
          category: "Utility",
        },
        {
          title: "Time Zone Converter",
          description: "Convert time between any two time zones worldwide.",
          href: "/timezone-converter",
          icon: Clock,
          category: "Utility",
        },
      ]}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </div>
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              min={minDate}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </div>
            </label>
            <input
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!targetDate || !targetTime}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5" />
              Start Countdown
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 font-semibold rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {(timeLeft || isPast) && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          {isPast ? (
            <div className="text-center py-8">
              <p className="text-3xl font-bold text-amber-500 mb-2">Time's Up!</p>
              <p className="text-zinc-600 dark:text-zinc-400">The countdown has reached zero.</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
                Time Remaining
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/30 rounded-xl">
                  <p className="text-4xl md:text-5xl font-bold text-sky-500">{timeLeft?.days ?? 0}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Days</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/30 dark:to-violet-900/30 rounded-xl">
                  <p className="text-4xl md:text-5xl font-bold text-violet-500">{timeLeft?.hours ?? 0}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Hours</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 rounded-xl">
                  <p className="text-4xl md:text-5xl font-bold text-emerald-500">{timeLeft?.minutes ?? 0}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Minutes</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/30 rounded-xl">
                  <p className="text-4xl md:text-5xl font-bold text-rose-500">{timeLeft?.seconds ?? 0}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Seconds</p>
                </div>
              </div>
            </>
            )}
            <ExportButtons
              data={{
                title: "Countdown Timer",
                date: formatExportDate(),
                headers: ["Metric", "Value"],
                rows: [
                  ["Target Date", targetDate ?? ""],
                  ["Target Time", targetTime ?? ""],
                  ["Days Remaining", (timeLeft?.days ?? 0).toString()],
                  ["Hours Remaining", (timeLeft?.hours ?? 0).toString()],
                  ["Minutes Remaining", (timeLeft?.minutes ?? 0).toString()],
                  ["Seconds Remaining", (timeLeft?.seconds ?? 0).toString()]
                ],
                filename: "countdown-timer"
              }}
            />
        </div>
      )}
    </ToolPageLayout>
  )
}
