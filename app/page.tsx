import { ToolCard } from "@/components/tool-card"
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
]

const categories = ["Finance", "Word Tools", "Developer"] as const

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-500/10 to-transparent dark:from-sky-500/5 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Tonle
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-zinc-600 dark:text-zinc-400">
              Free Online Tools for Finance, Crypto & More
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Fast, private tools that work in your browser. No signup, no tracking, no limits.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((category) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <ToolCard key={tool.href} {...tool} />
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Why Use Tonle?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Tonle provides free, browser-based tools that respect your privacy. All calculations
            happen locally on your device — we never send your data to a server. Whether you're
            calculating investment returns, formatting code, or generating passwords, our tools
            are fast, reliable, and completely free.
          </p>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6">
            Finance & Crypto Tools
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Track your crypto investments, plan DCA strategies, calculate loan payments, and
            understand compound interest. Our currency converter uses real-time exchange rates
            for accurate conversions.
          </p>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6">
            Word & Text Tools
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Count words and characters, convert text cases, generate lorem ipsum for mockups,
            and create secure passwords. Perfect for writers, editors, and developers.
          </p>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6">
            Developer Utilities
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Format JSON, encode Base64 and URLs, convert colors between formats, and generate
            QR codes instantly. All tools work offline and respect your privacy.
          </p>
        </div>
      </section>
    </div>
  )
}
