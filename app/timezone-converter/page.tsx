"use client"

import { useState, useMemo, useEffect } from "react"
import { Clock, ArrowRight } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { ExportButtons } from "@/components/export-buttons"
import { formatDate } from "@/lib/export"

const TIMEZONES = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "America/Chicago", label: "Chicago (CST/CDT)" },
  { value: "America/Denver", label: "Denver (MST/MDT)" },
  { value: "America/Phoenix", label: "Phoenix (MST)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
  { value: "Europe/Moscow", label: "Moscow (MSK)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Mumbai", label: "Mumbai (IST)" },
  { value: "Asia/Bangkok", label: "Bangkok (ICT)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Seoul", label: "Seoul (KST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
  { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
]

export default function TimezoneConverterPage() {
  const [fromTimezone, setFromTimezone] = useState("America/New_York")
  const [toTimezone, setToTimezone] = useState("Europe/London")
  const [inputDate, setInputDate] = useState("")
  const [inputTime, setInputTime] = useState("")

  // Set default to current time
  useEffect(() => {
    const now = new Date()
    setInputDate(now.toISOString().split("T")[0])
    setInputTime(now.toTimeString().slice(0, 5))
  }, [])

  const convertedTime = useMemo(() => {
    if (!inputDate || !inputTime) return null

    try {
      // Parse the input date/time in the source timezone
      const [year, month, day] = inputDate.split("-").map(Number)
      const [hours, minutes] = inputTime.split(":").map(Number)

      // Create a date object treating the input as if it's in the source timezone
      const sourceDate = new Date(year, month - 1, day, hours, minutes)

      // Format for target timezone
      const options: Intl.DateTimeFormatOptions = {
        timeZone: toTimezone,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }

      const targetFormatter = new Intl.DateTimeFormat("en-US", options)
      const sourceFormatter = new Intl.DateTimeFormat("en-US", {
        ...options,
        timeZone: fromTimezone,
      })

      return {
        source: sourceFormatter.format(sourceDate),
        target: targetFormatter.format(sourceDate),
        sourceZone: fromTimezone,
        targetZone: toTimezone,
      }
    } catch {
      return null
    }
  }, [inputDate, inputTime, fromTimezone, toTimezone])

  return (
    <ToolPageLayout
      title="Time Zone Converter"
      description="Convert time between any two time zones worldwide. Perfect for scheduling meetings across different regions."
      category="Utility"
      relatedTools={[]}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              From Time Zone
            </label>
            <select
              value={fromTimezone}
              onChange={(e) => setFromTimezone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              To Time Zone
            </label>
            <select
              value={toTimezone}
              onChange={(e) => setToTimezone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Time
            </label>
            <input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {convertedTime && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Converted Time
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex-1 text-center p-6 bg-sky-50 dark:bg-sky-950/30 rounded-xl">
              <Clock className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{convertedTime.source}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {TIMEZONES.find((tz) => tz.value === fromTimezone)?.label}
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-zinc-400 rotate-90 md:rotate-0" />
            <div className="flex-1 text-center p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
              <Clock className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{convertedTime.target}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {TIMEZONES.find((tz) => tz.value === toTimezone)?.label}
              </p>
            </div>
          </div>
          <ExportButtons
            data={{
              title: "Time Zone Converter",
              date: formatDate(),
              headers: ["Time Zone", "Time"],
              rows: [
                [TIMEZONES.find((tz) => tz.value === fromTimezone)?.label ?? fromTimezone, convertedTime?.source ?? ""],
                [TIMEZONES.find((tz) => tz.value === toTimezone)?.label ?? toTimezone, convertedTime?.target ?? ""]
              ],
              filename: "timezone-converter"
            }}
          />
        </div>
      )}
    </ToolPageLayout>
  )
}
