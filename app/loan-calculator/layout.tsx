import type { Metadata } from "next"

const title = "Loan Calculator — Free Online Tool | Tonle"
const description = "Calculate monthly payments, total interest, and view amortization schedule for any loan. Free loan calculator."
const url = "https://tonle.app/loan-calculator"

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
            name: "Loan Calculator",
            description,
            url,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      {children}
    </>
  )
}
