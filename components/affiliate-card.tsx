import { ExternalLink } from "lucide-react"

interface AffiliateCardProps {
  description: string
  linkText: string
  href: string
}

export function AffiliateCard({ description, linkText, href }: AffiliateCardProps) {
  return (
    <div className="mt-6 p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-950/20">
      <div className="flex items-start gap-3">
        <ExternalLink className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {description}{" "}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 underline"
            >
              {linkText}
            </a>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Sponsored</p>
        </div>
      </div>
    </div>
  )
}
