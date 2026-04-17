"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Play, Pause, RotateCcw, Settings } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"

export default function TextToSpeechPage() {
  const [text, setText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>("")
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [isSupported, setIsSupported] = useState(true)

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Check support and load voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsSupported(false)
      return
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)

      // Select a default English voice if available
      if (availableVoices.length > 0 && !selectedVoice) {
        const englishVoice = availableVoices.find((v) =>
          v.lang.startsWith("en")
        )
        setSelectedVoice(
          englishVoice?.name || availableVoices[0].name
        )
      }
    }

    loadVoices()

    // Voices load asynchronously in some browsers
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [selectedVoice])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const handleSpeak = () => {
    if (!text.trim()) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utteranceRef.current = utterance

    // Set voice
    const voice = voices.find((v) => v.name === selectedVoice)
    if (voice) {
      utterance.voice = voice
    }

    // Set rate and pitch
    utterance.rate = rate
    utterance.pitch = pitch

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    utterance.onpause = () => {
      setIsPaused(true)
    }

    utterance.onresume = () => {
      setIsPaused(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const handlePause = () => {
    if (isPaused) {
      window.speechSynthesis.resume()
    } else {
      window.speechSynthesis.pause()
    }
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  const handleClear = () => {
    handleStop()
    setText("")
  }

  // Group voices by language
  const groupedVoices = voices.reduce((acc, voice) => {
    const lang = voice.lang || "unknown"
    if (!acc[lang]) {
      acc[lang] = []
    }
    acc[lang].push(voice)
    return acc
  }, {} as Record<string, SpeechSynthesisVoice[]>)

  if (!isSupported) {
    return (
      <ToolPageLayout
        title="Text to Speech"
        description="Convert text to spoken words using the Web Speech API."
        category="Word Tools"
        relatedTools={[]}
      >
        <div className="p-6">
          <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-100 dark:border-red-900/30">
            <p className="text-red-600 dark:text-red-400">
              Your browser does not support the Web Speech API. Please try using a modern browser
              like Chrome, Edge, or Safari.
            </p>
          </div>
        </div>
      </ToolPageLayout>
    )
  }

  return (
    <ToolPageLayout
      title="Text to Speech"
      description="Convert any text to speech using your browser's built-in voices. Choose from multiple languages and adjust speed and pitch."
      category="Word Tools"
      relatedTools={[
        {
          title: "Word Counter",
          description: "Count words, characters, sentences, and estimate reading time.",
          href: "/word-counter",
          icon: Volume2,
          category: "Word Tools",
        },
        {
          title: "Case Converter",
          description: "Convert text to uppercase, lowercase, title case, and more.",
          href: "/case-converter",
          icon: Volume2,
          category: "Word Tools",
        },
      ]}
    >
      <div className="p-6">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Enter Text to Speak
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste the text you want to hear spoken aloud..."
            className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
          />
          <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {text.trim().split(/\s+/).filter(Boolean).length} words · {text.length} characters
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
        <div className="flex flex-wrap gap-3">
          {!isPlaying ? (
            <button
              onClick={handleSpeak}
              disabled={!text.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-semibold rounded-xl transition-colors disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5" />
              Speak
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
              >
                {isPaused ? (
                  <>
                    <Play className="w-5 h-5" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                )}
              </button>
              <button
                onClick={handleStop}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors"
              >
                <VolumeX className="w-5 h-5" />
                Stop
              </button>
            </>
          )}
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Clear
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Voice Settings
        </h3>

        {/* Voice Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Voice
          </label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            {Object.entries(groupedVoices).map(([lang, langVoices]) => (
              <optgroup key={lang} label={lang}>
                {langVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} {voice.default ? "(Default)" : ""}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Speed Control */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Speed: {rate}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            <span>0.5x (Slow)</span>
            <span>1x (Normal)</span>
            <span>2x (Fast)</span>
          </div>
        </div>

        {/* Pitch Control */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Pitch: {pitch}
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            <span>0.5 (Low)</span>
            <span>1 (Normal)</span>
            <span>2 (High)</span>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  )
}
