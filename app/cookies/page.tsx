import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Tonle",
  description: "Cookie policy for Tonle — free online tools for finance, crypto, and more.",
  alternates: { canonical: "https://tonle.app/cookies" },
}

export default function Cookies() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">Cookie Policy</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">Last updated: April 17, 2026</p>
        </div>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">What Are Cookies</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Cookies are small text files stored on your device by your browser. Tonle uses cookies to provide and improve our Service.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Cookies We Use</h2>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" /><span><strong>Essential:</strong> Theme preference storage (localStorage). Required for the Service to function.</span></li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" /><span><strong>Analytics:</strong> Google Analytics cookies to understand traffic patterns anonymously.</span></li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" /><span><strong>Advertising:</strong> Google AdSense cookies to display relevant advertisements.</span></li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Managing Cookies</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You can control cookies through your browser settings. Disabling cookies may affect some features of the Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
