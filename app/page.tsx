import { ToolCard } from "@/components/tool-card"
import { BetweenToolsAd } from "@/components/adsense"
import Link from "next/link"

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tonle",
  url: "https://tonle.app",
  description: "Free online tools for finance, crypto, word processing, and developer utilities.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://tonle.app/{search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tonle Online Tools",
  url: "https://tonle.app",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
}

import {
  TrendingUp,
  Repeat,
  Landmark,
  Percent,
  DollarSign,
  FileText,
  Type,
  Heading1,
  AlignLeft,
  Hash,
  Lock,
  Code,
  Binary,
  Globe,
  Palette,
  QrCode,
  Shield,
  Zap,
  WifiOff,
  Heart,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Cake,
  Calculator,
  Clock,
  Ruler,
} from "lucide-react"

const tools = [
  // Finance & Crypto
  {
    title: "Crypto Profit Calculator",
    description: "Calculate your cryptocurrency profit or loss with ROI percentage based on buy and sell prices.",
    href: "/crypto-profit-calculator",
    icon: TrendingUp,
    category: "Finance",
  },
  {
    title: "DCA Calculator",
    description: "Plan your Dollar Cost Averaging strategy with investment amount, frequency, and duration.",
    href: "/dca-calculator",
    icon: Repeat,
    category: "Finance",
  },
  {
    title: "Loan Calculator",
    description: "Calculate monthly payments, total interest, and view amortization schedule for any loan.",
    href: "/loan-calculator",
    icon: Landmark,
    category: "Finance",
  },
  {
    title: "Compound Interest Calculator",
    description: "See how your money grows over time with compound interest at different frequencies.",
    href: "/compound-interest-calculator",
    icon: Percent,
    category: "Finance",
  },
  {
    title: "Currency Converter",
    description: "Convert between 150+ world currencies with real-time exchange rates.",
    href: "/currency-converter",
    icon: DollarSign,
    category: "Finance",
  },
  // Word Tools
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, paragraphs, and estimate reading time.",
    href: "/word-counter",
    icon: FileText,
    category: "Word Tools",
  },
  {
    title: "Character Counter",
    description: "Count characters with and without spaces, plus letter frequency analysis.",
    href: "/character-counter",
    icon: Type,
    category: "Word Tools",
  },
  {
    title: "Case Converter",
    description: "Convert text to uppercase, lowercase, title case, sentence case, or toggle case.",
    href: "/case-converter",
    icon: Heading1,
    category: "Word Tools",
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder lorem ipsum text for your designs and mockups.",
    href: "/lorem-ipsum-generator",
    icon: AlignLeft,
    category: "Word Tools",
  },
  {
    title: "Password Generator",
    description: "Create secure random passwords with customizable options and strength meter.",
    href: "/password-generator",
    icon: Lock,
    category: "Word Tools",
  },
  // Developer Tools
  {
    title: "JSON Formatter",
    description: "Format, validate, and beautify JSON with syntax highlighting.",
    href: "/json-formatter",
    icon: Code,
    category: "Developer",
  },
  {
    title: "Base64 Encoder",
    description: "Encode and decode text to and from Base64 format instantly.",
    href: "/base64-encoder",
    icon: Binary,
    category: "Developer",
  },
  {
    title: "URL Encoder",
    description: "Encode and decode URLs and query strings safely.",
    href: "/url-encoder",
    icon: Globe,
    category: "Developer",
  },
  {
    title: "Color Converter",
    description: "Convert between HEX, RGB, and HSL color formats with live preview.",
    href: "/color-converter",
    icon: Palette,
    category: "Developer",
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes for URLs, text, and contact information.",
    href: "/qr-code-generator",
    icon: QrCode,
    category: "Developer",
  },
  // Health Tools
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days. Get a countdown to your next birthday.",
    href: "/age-calculator",
    icon: Calendar,
    category: "Health",
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index (BMI) and check your health category with visual scale.",
    href: "/bmi-calculator",
    icon: Cake,
    category: "Health",
  },
  // Math Tools
  {
    title: "Percentage Calculator",
    description: "Calculate percentages: X% of Y, what % X is of Y, and percentage change between values.",
    href: "/percentage-calculator",
    icon: Calculator,
    category: "Math",
  },
  // Utility Tools
  {
    title: "Time Zone Converter",
    description: "Convert time between any two time zones worldwide. Perfect for scheduling across regions.",
    href: "/timezone-converter",
    icon: Clock,
    category: "Utility",
  },
  {
    title: "Unit Converter",
    description: "Convert length, weight, temperature, speed, area, and volume between metric and imperial units.",
    href: "/unit-converter",
    icon: Ruler,
    category: "Utility",
  },
]

const featuredTools = [
  tools[0], // Crypto Profit Calculator
  tools[2], // Loan Calculator
  tools[8], // Password Generator
]

const categories = ["Finance", "Word Tools", "Developer", "Health", "Math", "Utility"] as const

const trustBadges = [
  { icon: CheckCircle2, label: "100% Free" },
  { icon: Shield, label: "Privacy First" },
  { icon: WifiOff, label: "Works Offline" },
  { icon: Heart, label: "No Signup" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-sky-50/50 to-transparent dark:from-sky-950/30 dark:via-sky-950/10">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[300px] bg-gradient-to-t from-sky-100/50 to-transparent dark:from-sky-900/20 rounded-t-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium mb-6 animate-fade-in">
              <Zap className="w-4 h-4" />
              20 free tools, no signup required
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 animate-fade-in">
              Your Daily Tools,
              <br />
              <span className="gradient-text">Simplified & Free</span>
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "100ms" }}>
              Fast, private tools that work in your browser. No tracking, no limits, no catch.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Link
                href="#tools"
                className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all hover:-translate-y-0.5"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <badge.icon className="w-5 h-5 text-sky-500" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Featured Tools
          </h2>
          <Link
            href="#tools"
            className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* All Tools by Category */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((category, idx) => (
          <div key={category}>
            {idx > 0 && <BetweenToolsAd />}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-sky-500 rounded-full" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {category}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
                {tools
                  .filter((tool) => tool.category === category)
                  .map((tool) => (
                    <ToolCard key={tool.href} {...tool} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* SEO Content - Made more visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 text-center">
            Why Choose Tonle?
          </h2>

          <div className="grid gap-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-50/0 dark:from-emerald-950/30 dark:to-transparent border border-emerald-100 dark:border-emerald-900/30">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Finance & Crypto Tools
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Track your crypto investments, plan DCA strategies, calculate loan payments, and
                understand compound interest. Our currency converter uses real-time exchange rates
                for accurate conversions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-50/0 dark:from-amber-950/30 dark:to-transparent border border-amber-100 dark:border-amber-900/30">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                Word & Text Tools
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Count words and characters, convert text cases, generate lorem ipsum for mockups,
                and create secure passwords. Perfect for writers, editors, and developers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-violet-50/0 dark:from-violet-950/30 dark:to-transparent border border-violet-100 dark:border-violet-900/30">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-violet-500" />
                Developer Utilities
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Format JSON, encode Base64 and URLs, convert colors between formats, and generate
                QR codes instantly. All tools work offline and respect your privacy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-50/0 dark:from-rose-950/30 dark:to-transparent border border-rose-100 dark:border-rose-900/30">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                Health Tools
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Calculate your exact age with birthday countdown, check your BMI with visual health
                categories, and track your wellness metrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-50/0 dark:from-cyan-950/30 dark:to-transparent border border-cyan-100 dark:border-cyan-900/30">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-500" />
                Math & Utility Tools
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Calculate percentages, convert between time zones, and handle unit conversions for
                length, weight, temperature, and more.
              </p>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-50/0 dark:from-sky-950/30 dark:to-transparent border border-sky-100 dark:border-sky-900/30">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-500" />
              Privacy First, Always
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Tonle provides free, browser-based tools that respect your privacy. All calculations
              happen locally on your device — we never send your data to a server. Whether you're
              calculating investment returns, formatting code, or generating passwords, our tools
              are fast, reliable, and completely free.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
