import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Tonle",
  description: "Terms of service for Tonle — free online tools for finance, crypto, and more.",
  alternates: { canonical: "https://tonle.app/terms" },
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">Terms of Service</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">Last updated: April 17, 2026</p>
        </div>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Acceptance of Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              By accessing and using Tonle (tonle.app), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our Service.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Use of Service</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Tonle provides free online tools for personal and commercial use. You may use our tools for any lawful purpose. You agree not to misuse the Service or attempt to disrupt its availability.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Disclaimer</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Financial tools (crypto calculator, loan calculator, currency converter, etc.) are provided for informational purposes only. They do not constitute financial advice. Always consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Limitation of Liability</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Tonle is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from the use of our tools or reliance on their results.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Contact</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Questions about these terms? <a href="mailto:hello@tonle.app" className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400">hello@tonle.app</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
