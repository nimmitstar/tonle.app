import type { Metadata } from "next"

const title = "URL Encoder/Decoder — Free Online Tool | Tonle"
const description = "Encode and decode URLs and query strings safely. Free, fast URL encoding tool that works in your browser."
const url = "https://tonle.app/url-encoder"

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
            name: "URL Encoder/Decoder",
            description,
            url,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      {children}
    </>
  )
}
