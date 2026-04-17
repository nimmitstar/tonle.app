import type { Metadata } from "next"
import { Info, Zap, Shield, Code, Wrench } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About | Tonle",
  description: "Learn about Tonle — free online tools for finance, crypto, word processing, and developer utilities.",
}

const values = [
  {
    icon: Zap,
    title: "Fast & Lightweight",
    description: "Every tool loads instantly and runs entirely in your browser. No server round-trips, no waiting."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data never leaves your device. No accounts, no tracking, no data selling. Ever."
  },
  {
    icon: Wrench,
    title: "Free Forever",
    description: "No premium tiers, no paywalls, no hidden fees. Every tool is 100% free to use."
  },
  {
    icon: Code,
    title: "Open & Transparent",
    description: "Built with modern web technologies. Clean code, no bloat, no dark patterns."
  },
]

const toolCategories = [
  {
    title: "Finance & Crypto",
    description: "Track investments, plan DCA strategies, calculate loans, and convert currencies.",
    color: "emerald"
  },
  {
    title: "Word & Text",
    description: "Count words, convert cases, generate placeholder text, and create secure passwords.",
    color: "amber"
  },
  {
    title: "Developer Utilities",
    description: "Format JSON, encode data, convert colors, and generate QR codes.",
    color: "violet"
  }
]

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/30">
              <Info className="w-6 h-6 text-sky-500" />
            </div>
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">About Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            About Tonle
          </h1>
        </div>

        {/* Intro */}
        <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Tonle is a collection of <span className="font-semibold text-sky-600 dark:text-sky-400">15 free online tools</span> designed to help 
            you with everyday calculations, financial planning, cryptocurrency analysis, word processing, and developer tasks.
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Named after Tonle Sap — the great lake of Cambodia — we believe useful tools should be like water: 
            always available, refreshingly simple, and essential for everyday life.
          </p>
        </div>

        {/* Values */}
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Why Tonle?</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {values.map((value) => (
            <div key={value.title} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
              <div className="p-2 w-fit rounded-xl bg-sky-100 dark:bg-sky-900/30 mb-3">
                <value.icon className="w-5 h-5 text-sky-500" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{value.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Tool Categories */}
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">What We Offer</h2>
        <div className="space-y-4 mb-10">
          {toolCategories.map((cat) => (
            <div key={cat.title} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{cat.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{cat.description}</p>
            </div>
          ))}
        </div>

        {/* Tech */}
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Built With</h2>
        <div className="flex flex-wrap gap-2 mb-10">
          {["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "Bun"].map((tech) => (
            <span key={tech} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/10 border border-sky-200 dark:border-sky-800/50 text-center">
          <p className="text-zinc-700 dark:text-zinc-300 mb-3">
            Ready to try our tools?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all hover:-translate-y-0.5"
          >
            Explore All Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
