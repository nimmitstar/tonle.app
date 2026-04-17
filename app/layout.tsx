import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AdSenseScript } from "@/components/adsense"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Tonle — Free Online Tools for Finance, Crypto & More",
  description: "15 free online tools for finance calculations, cryptocurrency profit tracking, word processing, and developer utilities. Fast, private, no signup required.",
  authors: [{ name: "Tonle" }],
  creator: "Tonle",
  publisher: "Tonle",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tonle.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tonle.app",
    title: "Tonle — Free Online Tools for Finance, Crypto & More",
    description: "15 free online tools for finance, crypto, word processing, and developer utilities.",
    siteName: "Tonle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonle — Free Online Tools",
    description: "15 free online tools for finance, crypto, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "https://tonle.app" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AdSenseScript />
      </head>
      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
