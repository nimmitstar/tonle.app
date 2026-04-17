import type { Metadata } from "next"

const title = "Percentage Calculator — Calculate Percentages Online | Tonle"
const description = "Calculate percentages easily: X% of Y, X is what % of Y, and percentage change from X to Y. Free online percentage calculator."
const url = "https://tonle.app/percentage-calculator"

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
            name: "Percentage Calculator",
            description,
            url,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      {children}
    </>
  )
}
