import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Tonle",
  description: "Learn about Tonle — free online tools for finance, crypto, word processing, and developer utilities.",
}

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
      <h1>About Tonle</h1>

      <p>
        Tonle is a collection of free online tools designed to help you with everyday calculations, 
        financial planning, cryptocurrency analysis, word processing, and developer tasks.
      </p>

      <h2>Our Mission</h2>
      <p>
        We believe useful tools should be free, fast, and private. Every tool on Tonle works directly 
        in your browser — your data never leaves your device. No signups, no tracking, no data collection.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li><strong>Finance &amp; Crypto Tools:</strong> Profit calculators, loan calculators, compound interest, currency conversion</li>
        <li><strong>Word Tools:</strong> Word counter, case converter, lorem ipsum generator, password generator</li>
        <li><strong>Developer Tools:</strong> JSON formatter, Base64 encoder, URL encoder, color converter, QR code generator</li>
      </ul>

      <h2>Privacy First</h2>
      <p>
        All calculations and text processing happen entirely in your browser. We do not store, transmit, 
        or sell your data. The only data we collect is standard analytics (page views, browser type) 
        to help us improve the service.
      </p>

      <h2>Built With</h2>
      <p>
        Tonle is built with modern web technologies:
      </p>
      <ul>
        <li>Next.js 16</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Deployed on Vercel</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Have questions, suggestions, or found a bug? We&apos;d love to hear from you.
      </p>
      <p>
        <strong>Email:</strong> hello@tonle.app
      </p>
    </div>
  )
}
