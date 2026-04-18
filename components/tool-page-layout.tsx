import { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { HeaderAd, InContentAd } from "./adsense"
import { StickyFooterAd } from "./sticky-footer-ad"
import { ToolCard } from "./tool-card"

interface ToolPageLayoutProps {
  children: ReactNode
  title: string
  description: string
  category: string
  categoryHref?: string
  relatedTools?: Array<{
    title: string
    description: string
    href: string
    icon: any
    category: string
  }>
}

export function ToolPageLayout({
  children,
  title,
  description,
  category,
  categoryHref,
  relatedTools = [],
}: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Breadcrumb */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
            <li>
              {categoryHref ? (
                <Link
                  href={categoryHref}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {category}
                </Link>
              ) : (
                <span className="text-zinc-600 dark:text-zinc-400">{category}</span>
              )}
            </li>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
            <li className="text-zinc-900 dark:text-zinc-100 font-medium truncate">
              {title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400">
              {category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {description}
          </p>
        </div>

        {/* Header Ad */}
        <HeaderAd />

        {/* Tool content */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          {children}
        </div>

        {/* In-content Ad */}
        <InContentAd />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>
        )}
      </main>
      <StickyFooterAd />
    </div>
  )
}
