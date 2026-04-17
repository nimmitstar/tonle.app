import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getAllSlugs, getArticleBySlug } from "../data"
import { CheckCircle2, X, ArrowRight, Zap, Shield, Eye, BarChart3 } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Comparison Not Found | Tonle",
    }
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://tonle.app/vs/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://tonle.app/vs/${slug}`,
      siteName: "Tonle",
      type: "article",
    },
  }
}

function FAQJsonLd({ article }: { article: ReturnType<typeof getArticleBySlug> }) {
  if (!article) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function ComparisonTable({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <th className="py-3 px-4 text-left font-semibold text-zinc-900 dark:text-zinc-100">Feature</th>
            <th className="py-3 px-4 text-left font-semibold text-sky-600 dark:text-sky-400">Tonle</th>
            <th className="py-3 px-4 text-left font-semibold text-zinc-600 dark:text-zinc-400">{article.competitorName}</th>
          </tr>
        </thead>
        <tbody>
          {article.comparisonPoints.map((point, i) => (
            <tr key={i} className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300 font-medium">{point.feature}</td>
              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{point.tonle}</td>
              <td className="py-3 px-4 text-zinc-500 dark:text-zinc-500">{point.competitor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function VsPage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <FAQJsonLd article={article} />
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-sky-500 dark:hover:text-sky-400">
              Home
            </Link>
            <span>/</span>
            <span className="text-zinc-700 dark:text-zinc-300">Comparisons</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/30">
                <BarChart3 className="w-6 h-6 text-sky-500" />
              </div>
              <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Comparison</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {article.description}
            </p>
          </div>

          {/* Quick Comparison Table */}
          <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Quick Comparison
            </h2>
            <ComparisonTable article={article} />
          </div>

          {/* What is Competitor */}
          <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              What is {article.competitorName}?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {article.competitorDescription}
            </p>
            <a
              href={article.competitorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-sm text-sky-500 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Visit {article.competitorName}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* What is Tonle */}
          <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              What is Tonle?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {article.tonleDescription}
            </p>
          </div>

          {/* Detailed Comparison */}
          <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Detailed Comparison
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <p>
                When choosing between <strong className="text-zinc-800 dark:text-zinc-200">{article.competitorName}</strong> and <strong className="text-zinc-800 dark:text-zinc-200">Tonle</strong>, consider what matters most for your use case.
              </p>
              <p>
                Tonle excels in <strong className="text-zinc-800 dark:text-zinc-200">privacy and user experience</strong>. Every calculation happens locally in your browser—your data never leaves your device. The modern interface with dark mode support makes calculations pleasant rather than frustrating.
              </p>
              <p>
                {article.competitorName} has its strengths, particularly in {article.competitorName === "Omni Calculator" || article.competitorName === "Calculator.net" ? "the breadth of available tools" : article.competitorName === "Investor.gov" ? "official, educational content" : "established functionality"}. However, this comes with trade-offs in interface design, privacy considerations, and modern features like offline functionality.
              </p>
              <p>
                For everyday calculations where <strong className="text-zinc-800 dark:text-zinc-200">speed, privacy, and clean design</strong> matter, Tonle offers a superior experience. For specialized needs that Tonle doesn't yet cover, established alternatives may still be the right choice.
              </p>
            </div>
          </div>

          {/* Why Choose Tonle */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Why Choose Tonle?
            </h2>
            <div className="grid gap-4 sm:grid-cols-1">
              {article.whyTonle.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/30 shrink-0">
                      <item.icon className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* When to Use Competitor */}
          {article.whenToUseCompetitor.length > 0 && (
            <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                When to Use {article.competitorName}
              </h2>
              <ul className="space-y-2">
                {article.whenToUseCompetitor.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {article.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-zinc-900 dark:text-zinc-100">
                    {faq.question}
                    <span className="transition group-open:rotate-180">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-400">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/10 border border-sky-200 dark:border-sky-800/50 text-center">
            <p className="text-zinc-700 dark:text-zinc-300 mb-3">
              Ready to try Tonle?
            </p>
            <Link
              href={article.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all hover:-translate-y-0.5"
            >
              Try {article.ctaTool}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* More Comparisons */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              More Comparisons
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/vs/calculator-net" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                Calculator.net
              </Link>
              <Link href="/vs/calculatorsoup" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                CalculatorSoup
              </Link>
              <Link href="/vs/omnicalculator" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                Omni Calculator
              </Link>
              <Link href="/vs/google-calculator" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                Google Calculator
              </Link>
              <Link href="/vs/crypto-com-calculator" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                Crypto.com
              </Link>
              <Link href="/vs/wordcounter" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                WordCounter.net
              </Link>
              <Link href="/vs/jsonformatter" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                JSON Formatter
              </Link>
              <Link href="/vs/unitconverters" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                UnitConverters.net
              </Link>
              <Link href="/vs/investor-gov" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                Investor.gov
              </Link>
              <Link href="/vs/adp-calculator" className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                ADP Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
