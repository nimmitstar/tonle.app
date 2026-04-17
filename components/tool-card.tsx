import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  category: string
}

export function ToolCard({ title, description, href, icon: Icon, category }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-sky-500 dark:hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/10 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors">
          <Icon className="w-6 h-6 text-sky-500" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-sky-500 dark:text-sky-400">
            {category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
