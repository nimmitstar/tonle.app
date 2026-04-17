import { ToolCard } from "@/components/tool-card"
import { ToolList } from "@/components/tool-list"
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
  Timer,
  Hourglass,
  BarChart3,
  Banknote,
  Coffee,
  Moon,
  Volume2,
  ScanLine,
  Image as ImageIcon,
  File,
  Tag,
} from "lucide-react"

// Tools with icon components for server components (ToolCard)
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
  {
    title: "Stock ROI Calculator",
    description: "Calculate stock investment returns with total ROI, annualized return, and CAGR metrics.",
    href: "/stock-roi-calculator",
    icon: BarChart3,
    category: "Finance",
  },
  {
    title: "Inflation Calculator",
    description: "See how inflation affects purchasing power using US CPI historical data.",
    href: "/inflation-calculator",
    icon: Banknote,
    category: "Finance",
  },
  {
    title: "Tip Calculator",
    description: "Calculate tip amount and split the bill between multiple people with quick presets.",
    href: "/tip-calculator",
    icon: Coffee,
    category: "Finance",
  },
  {
    title: "Margin Calculator",
    description: "Calculate gross margin, markup, and profit. Find selling price from target margin.",
    href: "/margin-calculator",
    icon: Percent,
    category: "Finance",
  },
  {
    title: "SIP Calculator",
    description: "Calculate returns on your Systematic Investment Plan with visual breakdown.",
    href: "/sip-calculator",
    icon: TrendingUp,
    category: "Finance",
  },
  {
    title: "Discount Calculator",
    description: "Calculate final price and savings after applying single or multiple percentage discounts.",
    href: "/discount-calculator",
    icon: Tag,
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
  {
    title: "Text to Speech",
    description: "Convert text to spoken words using browser voices with speed and pitch controls.",
    href: "/text-to-speech",
    icon: Volume2,
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
  {
    title: "Number Base Converter",
    description: "Convert numbers between decimal, binary, octal, and hexadecimal formats instantly.",
    href: "/number-base-converter",
    icon: Hash,
    category: "Developer",
  },
  {
    title: "PDF Merge",
    description: "Merge multiple PDF files into one. Rearrange pages and download the merged PDF.",
    href: "/pdf-merge",
    icon: File,
    category: "Developer",
  },
  {
    title: "QR Code Reader",
    description: "Scan QR codes using your camera or upload an image. Instantly decode URLs and text.",
    href: "/qr-code-reader",
    icon: ScanLine,
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
  {
    title: "Sleep Calculator",
    description: "Find optimal sleep and wake times based on 90-minute sleep cycles.",
    href: "/sleep-calculator",
    icon: Moon,
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
  {
    title: "Countdown Timer",
    description: "Count down to any date and time. Perfect for events, deadlines, and reminders.",
    href: "/countdown-timer",
    icon: Timer,
    category: "Utility",
  },
  {
    title: "Stopwatch",
    description: "Measure elapsed time with millisecond precision, start/stop/reset, and lap functionality.",
    href: "/stopwatch",
    icon: Hourglass,
    category: "Utility",
  },
  {
    title: "Image Compressor",
    description: "Compress images with adjustable quality. Reduce file size while maintaining quality.",
    href: "/image-compressor",
    icon: ImageIcon,
    category: "Utility",
  },
  {
    title: "Image Resizer",
    description: "Resize images to specific dimensions or by percentage. Maintain aspect ratio option available.",
    href: "/image-resizer",
    icon: ImageIcon,
    category: "Utility",
  },
]

// Serializable tools for client component (iconName as string only)
const toolsForList = [
  { title: "Crypto Profit Calculator", description: "Calculate your cryptocurrency profit or loss with ROI percentage based on buy and sell prices.", href: "/crypto-profit-calculator", iconName: "TrendingUp", category: "Finance" },
  { title: "DCA Calculator", description: "Plan your Dollar Cost Averaging strategy with investment amount, frequency, and duration.", href: "/dca-calculator", iconName: "Repeat", category: "Finance" },
  { title: "Loan Calculator", description: "Calculate monthly payments, total interest, and view amortization schedule for any loan.", href: "/loan-calculator", iconName: "Landmark", category: "Finance" },
  { title: "Compound Interest Calculator", description: "See how your money grows over time with compound interest at different frequencies.", href: "/compound-interest-calculator", iconName: "Percent", category: "Finance" },
  { title: "Currency Converter", description: "Convert between 150+ world currencies with real-time exchange rates.", href: "/currency-converter", iconName: "DollarSign", category: "Finance" },
  { title: "Stock ROI Calculator", description: "Calculate stock investment returns with total ROI, annualized return, and CAGR metrics.", href: "/stock-roi-calculator", iconName: "BarChart3", category: "Finance" },
  { title: "Inflation Calculator", description: "See how inflation affects purchasing power using US CPI historical data.", href: "/inflation-calculator", iconName: "Banknote", category: "Finance" },
  { title: "Tip Calculator", description: "Calculate tip amount and split the bill between multiple people with quick presets.", href: "/tip-calculator", iconName: "Coffee", category: "Finance" },
  { title: "Margin Calculator", description: "Calculate gross margin, markup, and profit. Find selling price from target margin.", href: "/margin-calculator", iconName: "Percent", category: "Finance" },
  { title: "SIP Calculator", description: "Calculate returns on your Systematic Investment Plan with visual breakdown.", href: "/sip-calculator", iconName: "TrendingUp", category: "Finance" },
  { title: "Discount Calculator", description: "Calculate final price and savings after applying single or multiple percentage discounts.", href: "/discount-calculator", iconName: "Tag", category: "Finance" },
  { title: "Word Counter", description: "Count words, characters, sentences, paragraphs, and estimate reading time.", href: "/word-counter", iconName: "FileText", category: "Word Tools" },
  { title: "Character Counter", description: "Count characters with and without spaces, plus letter frequency analysis.", href: "/character-counter", iconName: "Type", category: "Word Tools" },
  { title: "Case Converter", description: "Convert text to uppercase, lowercase, title case, sentence case, or toggle case.", href: "/case-converter", iconName: "Heading1", category: "Word Tools" },
  { title: "Lorem Ipsum Generator", description: "Generate placeholder lorem ipsum text for your designs and mockups.", href: "/lorem-ipsum-generator", iconName: "AlignLeft", category: "Word Tools" },
  { title: "Password Generator", description: "Create secure random passwords with customizable options and strength meter.", href: "/password-generator", iconName: "Lock", category: "Word Tools" },
  { title: "Text to Speech", description: "Convert text to spoken words using browser voices with speed and pitch controls.", href: "/text-to-speech", iconName: "Volume2", category: "Word Tools" },
  { title: "JSON Formatter", description: "Format, validate, and beautify JSON with syntax highlighting.", href: "/json-formatter", iconName: "Code", category: "Developer" },
  { title: "Base64 Encoder", description: "Encode and decode text to and from Base64 format instantly.", href: "/base64-encoder", iconName: "Binary", category: "Developer" },
  { title: "URL Encoder", description: "Encode and decode URLs and query strings safely.", href: "/url-encoder", iconName: "Globe", category: "Developer" },
  { title: "Color Converter", description: "Convert between HEX, RGB, and HSL color formats with live preview.", href: "/color-converter", iconName: "Palette", category: "Developer" },
  { title: "QR Code Generator", description: "Generate QR codes for URLs, text, and contact information.", href: "/qr-code-generator", iconName: "QrCode", category: "Developer" },
  { title: "Number Base Converter", description: "Convert numbers between decimal, binary, octal, and hexadecimal formats instantly.", href: "/number-base-converter", iconName: "Hash", category: "Developer" },
  { title: "PDF Merge", description: "Merge multiple PDF files into one. Rearrange pages and download the merged PDF.", href: "/pdf-merge", iconName: "File", category: "Developer" },
  { title: "QR Code Reader", description: "Scan QR codes using your camera or upload an image. Instantly decode URLs and text.", href: "/qr-code-reader", iconName: "ScanLine", category: "Developer" },
  { title: "Age Calculator", description: "Calculate your exact age in years, months, and days. Get a countdown to your next birthday.", href: "/age-calculator", iconName: "Calendar", category: "Health" },
  { title: "BMI Calculator", description: "Calculate your Body Mass Index (BMI) and check your health category with visual scale.", href: "/bmi-calculator", iconName: "Cake", category: "Health" },
  { title: "Sleep Calculator", description: "Find optimal sleep and wake times based on 90-minute sleep cycles.", href: "/sleep-calculator", iconName: "Moon", category: "Health" },
  { title: "Percentage Calculator", description: "Calculate percentages: X% of Y, what % X is of Y, and percentage change between values.", href: "/percentage-calculator", iconName: "Calculator", category: "Math" },
  { title: "Time Zone Converter", description: "Convert time between any two time zones worldwide. Perfect for scheduling across regions.", href: "/timezone-converter", iconName: "Clock", category: "Utility" },
  { title: "Unit Converter", description: "Convert length, weight, temperature, speed, area, and volume between metric and imperial units.", href: "/unit-converter", iconName: "Ruler", category: "Utility" },
  { title: "Countdown Timer", description: "Count down to any date and time. Perfect for events, deadlines, and reminders.", href: "/countdown-timer", iconName: "Timer", category: "Utility" },
  { title: "Stopwatch", description: "Measure elapsed time with millisecond precision, start/stop/reset, and lap functionality.", href: "/stopwatch", iconName: "Hourglass", category: "Utility" },
  { title: "Image Compressor", description: "Compress images with adjustable quality. Reduce file size while maintaining quality.", href: "/image-compressor", iconName: "ImageIcon", category: "Utility" },
  { title: "Image Resizer", description: "Resize images to specific dimensions or by percentage. Maintain aspect ratio option available.", href: "/image-resizer", iconName: "ImageIcon", category: "Utility" },
]

const featuredTools = [
  tools[0], // Crypto Profit Calculator
  tools[2], // Loan Calculator
  tools[17], // Password Generator
]

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

      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-sky-50/50 to-transparent dark:from-sky-950/30 dark:via-sky-950/10">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[300px] bg-gradient-to-t from-sky-100/50 to-transparent dark:from-sky-900/20 rounded-t-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium mb-5 animate-fade-in">
              <Zap className="w-4 h-4" />
              35 free tools, no signup required
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4 animate-fade-in">
              Your Daily Tools,
              <br />
              <span className="gradient-text">Simplified & Free</span>
            </h1>

            <p className="mt-4 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              Fast, private tools that work in your browser. No tracking, no limits, no catch.
            </p>
          </div>

          {/* Trust Bar */}
          <div className="mt-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <badge.icon className="w-4 h-4 text-sky-500" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
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

      <BetweenToolsAd />

      {/* All Tools - Searchable List */}
      <ToolList tools={toolsForList} />

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
