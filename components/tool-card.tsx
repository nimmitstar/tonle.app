import Link from "next/link"
import { LucideIcon, ArrowRight } from "lucide-react"

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  category: string
}

const categoryColors = {
  Finance: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800/50",
    hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-500",
    hoverShadow: "hover:shadow-emerald-500/10",
  },
  "Word Tools": {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800/50",
    hoverBorder: "hover:border-amber-400 dark:hover:border-amber-500",
    hoverShadow: "hover:shadow-amber-500/10",
  },
  Developer: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800/50",
    hoverBorder: "hover:border-violet-400 dark:hover:border-violet-500",
    hoverShadow: "hover:shadow-violet-500/10",
  },
}

const categoryLabels = {
  Finance: "Finance",
  "Word Tools": "Word",
  Developer: "Dev",
}

export function ToolCard({ title, description, href, icon: Icon, category }: ToolCardProps) {
  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.Developer
  const categoryLabel = categoryLabels[category as keyof typeof categoryLabels] || category

  return (
    <Link
      href={href}
      className={`${colors.bg} group relative block p-5 rounded-2xl border ${colors.border} ${colors.hoverBorder} ${colors.hoverShadow} hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className={`${colors.iconBg} p-3 rounded-xl transition-all duration-200 group-hover:scale-110`}>
            <Icon className={`w-6 h-6 ${colors.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.iconBg} ${colors.iconColor}`}>
                {categoryLabel}
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {title}
            </h3>
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Arrow icon on right */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
            <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-sky-500" />
          </div>
        </div>
      </div>
    </Link>
  )
}
