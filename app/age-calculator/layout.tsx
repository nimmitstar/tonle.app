import type { Metadata } from "next"

const title = "Age Calculator — Calculate Exact Age & Birthday Countdown | Tonle"
const description = "Calculate your exact age in years, months, and days. Get a countdown to your next birthday. Free online age calculator."
const url = "https://tonle.app/age-calculator"

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url, type: "website" },
  twitter: { title, description, card: "summary_large_image" },
  alternates: { canonical: url },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Age Calculator",
            description,
            url,
            applicationCategory: "HealthApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      {children}
    </>
  )
}
