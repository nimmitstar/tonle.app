"use client"

import { useState, useEffect, useRef } from "react"
import { Clock, Play, Pause, RotateCcw, List } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function StopwatchPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsed
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, elapsed])

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsed(0)
    setLaps([])
  }

  const handleLap = () => {
    if (elapsed > 0) {
      setLaps((prev) => [elapsed, ...prev])
    }
  }

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      ms: milliseconds.toString().padStart(2, "0"),
    }
  }

  const time = formatTime(elapsed)

  return (
    <ToolPageLayout
      title="Stopwatch"
      description="Measure elapsed time with millisecond precision. Track laps and intervals."
      category="Utility"
      relatedTools={[
        {
          title: "Countdown Timer",
          description: "Count down to a specific date and time.",
          href: "/countdown-timer",
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
        {/* Time Display */}
        <div className="text-center py-8 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-xl">
          <div className="flex items-center justify-center gap-2 md:gap-4 text-5xl md:text-7xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
            <span>{time.minutes}</span>
            <span className="text-zinc-400">:</span>
            <span>{time.seconds}</span>
            <span className="text-zinc-400">:</span>
            <span className="text-3xl md:text-5xl text-sky-500">{time.ms}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
            >
              <Play className="w-5 h-5" />
              {elapsed > 0 ? "Resume" : "Start"}
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
              <button
                onClick={handleLap}
                className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors"
              >
                <List className="w-5 h-5" />
                Lap
              </button>
            </>
          )}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Laps ({laps.length})
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {laps.map((lap, index) => {
              const lapTime = formatTime(lap)
              const prevLap = laps[index + 1] || 0
              const lapDiff = lap - prevLap
              const diffTime = formatTime(lapDiff)

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 w-8">
                      #{laps.length - index}
                    </span>
                    <span className="font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {lapTime.minutes}:{lapTime.seconds}.{lapTime.ms}
                    </span>
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    +{diffTime.minutes}:{diffTime.seconds}.{diffTime.ms}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
