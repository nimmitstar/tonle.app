"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface Tool {
  title: string
  description: string
  href: string
  iconName: string
  category: string
}

interface ToolListProps {
  tools: Tool[]
}

const categoryColors = {
  Finance: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
    hover: "hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40",
  },
  "Word Tools": {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
    hover: "hover:bg-amber-50/80 dark:hover:bg-amber-950/40",
  },
  Developer: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300",
    hover: "hover:bg-violet-50/80 dark:hover:bg-violet-950/40",
  },
  Health: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    iconBg: "bg-rose-100 dark:bg-rose-900/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    badge: "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300",
    hover: "hover:bg-rose-50/80 dark:hover:bg-rose-950/40",
  },
  Math: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300",
    hover: "hover:bg-cyan-50/80 dark:hover:bg-cyan-950/40",
  },
  Utility: {
    bg: "bg-sky-50 dark:bg-sky-950/30",
    iconBg: "bg-sky-100 dark:bg-sky-900/50",
    iconColor: "text-sky-600 dark:text-sky-400",
    badge: "bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300",
    hover: "hover:bg-sky-50/80 dark:hover:bg-sky-950/40",
  },
}

const categories = ["All", "Finance", "Word Tools", "Developer", "Health", "Math", "Utility"] as const

function getIconComponent(iconName: string) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }> | any> = {
    TrendingUp: LucideIcons.TrendingUp,
    Repeat: LucideIcons.Repeat,
    Landmark: LucideIcons.Landmark,
    Percent: LucideIcons.Percent,
    DollarSign: LucideIcons.DollarSign,
    FileText: LucideIcons.FileText,
    Type: LucideIcons.Type,
    Heading1: LucideIcons.Heading1,
    AlignLeft: LucideIcons.AlignLeft,
    Hash: LucideIcons.Hash,
    Lock: LucideIcons.Lock,
    Code: LucideIcons.Code,
    Binary: LucideIcons.Binary,
    Globe: LucideIcons.Globe,
    Palette: LucideIcons.Palette,
    QrCode: LucideIcons.QrCode,
    Calendar: LucideIcons.Calendar,
    Cake: LucideIcons.Cake,
    Calculator: LucideIcons.Calculator,
    Clock: LucideIcons.Clock,
    Ruler: LucideIcons.Ruler,
    Timer: LucideIcons.Timer,
    Hourglass: LucideIcons.Hourglass,
    BarChart3: LucideIcons.BarChart3,
    Banknote: LucideIcons.Banknote,
    Coffee: LucideIcons.Coffee,
    Moon: LucideIcons.Moon,
    Volume2: LucideIcons.Volume2,
    ScanLine: LucideIcons.ScanLine,
    ImageIcon: LucideIcons.Image,
    File: LucideIcons.File,
    Tag: LucideIcons.Tag,
  }
  return iconMap[iconName] || LucideIcons.Circle
}

export function ToolList({ tools }: ToolListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        searchQuery === "" ||
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, tools])

  return (
    <section id="tools" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* Tool Count */}
      <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6 text-center">
        {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"} found
      </p>

      {/* Tools List */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {filteredTools.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">No tools found matching your search.</p>
          </div>
        ) : (
          filteredTools.map((tool, index) => {
            const colors = categoryColors[tool.category as keyof typeof categoryColors] || categoryColors.Utility
            const Icon = getIconComponent(tool.iconName)

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center gap-4 p-4 transition-all ${colors.hover} border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 ${
                  index % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-zinc-50/50 dark:bg-zinc-900/50"
                } hover:bg-sky-50/50 dark:hover:bg-sky-950/20 group`}
              >
                {/* Icon */}
                <div className={`${colors.iconBg} p-2.5 rounded-lg shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.iconColor}`} />
                </div>

                {/* Tool Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {tool.description}
                  </p>
                </div>

                {/* Category Badge + Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge}`}>
                    {tool.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-sky-500 transition-colors" />
                </div>
              </Link>
            )
          })
        )}
      </div>
    </section>
  )
}
