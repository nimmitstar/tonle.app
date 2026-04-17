import type { Metadata } from "next"

const title = "BMI Calculator — Calculate Body Mass Index | Tonle"
const description = "Calculate your BMI (Body Mass Index) with weight and height. Supports metric (kg/cm) and imperial (lbs/ft) units. Visual BMI scale included."
const url = "https://tonle.app/bmi-calculator"

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
            name: "BMI Calculator",
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
