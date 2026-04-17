import type { Metadata } from "next"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | Tonle",
  description: "Get in touch with the Tonle team. Questions, feedback, or bug reports welcome.",
}

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
      <h1>Contact Us</h1>

      <p>
        Have a question, suggestion, or found a bug? Reach out to us.
      </p>

      <h2>Email</h2>
      <div className="not-prose flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <Mail className="w-5 h-5 text-sky-500" />
        <a
          href="mailto:hello@tonle.app"
          className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium"
        >
          hello@tonle.app
        </a>
      </div>

      <h2>Response Time</h2>
      <p>
        We aim to respond to all inquiries within 48 hours.
      </p>

      <h2>Report a Bug</h2>
      <p>
        If you find a bug or issue with any of our tools, please email us with:
      </p>
      <ul>
        <li>The tool you were using</li>
        <li>What you expected to happen</li>
        <li>What actually happened</li>
        <li>Your browser and device type</li>
      </ul>

      <h2>Suggest a Tool</h2>
      <p>
        Want us to build a new tool? Send us an email with your idea. We read every suggestion.
      </p>
    </div>
  )
}
