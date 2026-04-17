import type { Metadata } from "next"
import { Mail, Bug, Lightbulb, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | Tonle",
  description: "Get in touch with the Tonle team. Questions, feedback, or bug reports welcome.",
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/30">
              <Mail className="w-6 h-6 text-sky-500" />
            </div>
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Contact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Get in Touch
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Have a question, suggestion, or found a bug? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Email Card */}
        <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-900/30">
              <Mail className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Email us at</p>
              <a
                href="mailto:hello@tonle.app"
                className="text-xl font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
              >
                hello@tonle.app
              </a>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="p-2 w-fit rounded-xl bg-amber-100 dark:bg-amber-900/30 mb-3">
              <Bug className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Report a Bug</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Include the tool name, expected vs actual behavior, and your browser.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="p-2 w-fit rounded-xl bg-violet-100 dark:bg-violet-900/30 mb-3">
              <Lightbulb className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Suggest a Tool</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Want a new tool? Email us your idea. We read every suggestion.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="p-2 w-fit rounded-xl bg-emerald-100 dark:bg-emerald-900/30 mb-3">
              <Clock className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Response Time</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              We aim to respond to all inquiries within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
