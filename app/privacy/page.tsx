import type { Metadata } from "next"
import { Shield, Lock, Eye, Cookie, Server, Globe, ShieldCheck, FileCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Tonle",
  description: "Privacy policy for Tonle — free online tools for finance, crypto, and more.",
  alternates: { canonical: "https://tonle.app/privacy" },
}

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    items: [
      {
        subtitle: "Tool Data",
        text: "Any data you enter (numbers, text, URLs) is processed entirely in your browser. We do not collect, store, or transmit your input data to our servers."
      },
      {
        subtitle: "Log Data",
        text: "IP address, browser type, pages visited, time and date of visit."
      },
      {
        subtitle: "Device Information",
        text: "Screen size, operating system, device type."
      }
    ]
  },
  {
    icon: Server,
    title: "How We Use Information",
    items: [
      "Maintain and improve the Service",
      "Analyze usage patterns to enhance user experience",
      "Display relevant advertisements through Google AdSense",
      "Ensure security and prevent abuse"
    ]
  },
  {
    icon: Cookie,
    title: "Cookies",
    items: [
      { subtitle: "Essential Cookies", text: "Required for the Service to function (e.g., theme preference)." },
      { subtitle: "Analytics Cookies", text: "Help us understand how visitors interact with the Service." },
      { subtitle: "Advertising Cookies", text: "Used by Google AdSense to display relevant ads." }
    ]
  },
  {
    icon: Shield,
    title: "Third-Party Services",
    items: [
      {
        subtitle: "Google AdSense",
        text: "We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits. Opt out at Google Ad Settings."
      },
      {
        subtitle: "Google Analytics",
        text: "We may use Google Analytics to understand website traffic anonymously."
      }
    ]
  },
  {
    icon: Lock,
    title: "Data Security & Retention",
    items: [
      "We do not store your tool input data.",
      "Log data and analytics are retained for up to 26 months.",
      "We implement appropriate security measures to protect your information."
    ]
  },
  {
    icon: ShieldCheck,
    title: "Children's Privacy",
    items: [
      "Our Service is not directed to children under 13.",
      "We do not knowingly collect personal information from children under 13."
    ]
  }
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/30">
              <Shield className="w-6 h-6 text-sky-500" />
            </div>
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Privacy Policy
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Last updated: April 17, 2026
          </p>
        </div>

        {/* Intro */}
        <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Tonle operates the website <span className="font-medium text-zinc-900 dark:text-zinc-100">tonle.app</span>. 
            This Privacy Policy explains how we collect, use, and protect information when you use our Service.
            You can control cookies through your browser settings. Disabling cookies may affect some features.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-5 h-5 text-sky-500" />
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  typeof item === "string" ? (
                    <li key={i} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                      {item}
                    </li>
                  ) : (
                    <div key={i} className="pl-4">
                      <h3 className="font-medium text-zinc-800 dark:text-zinc-200 text-sm mb-1">
                        {item.subtitle}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Changes + Contact */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-5 h-5 text-sky-500" />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Changes</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              We may update this policy from time to time. Changes will be posted on this page with an updated date.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-sky-500" />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Contact</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Questions? <a href="mailto:privacy@tonle.app" className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400">privacy@tonle.app</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
