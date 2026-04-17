# Tonle — Free Online Tools

**Live:** [tonle.app](https://tonle.app)

15 free online tools for finance, crypto, word processing, and developer utilities. Fast, private, no signup required.

Built with Next.js 16, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Tools

### 💰 Finance & Crypto

| Tool | URL | Description |
|------|-----|-------------|
| Crypto Profit Calculator | `/crypto-profit-calculator` | Calculate crypto profit/loss and ROI |
| DCA Calculator | `/dca-calculator` | Dollar-cost averaging investment returns |
| Loan Calculator | `/loan-calculator` | Monthly payments, total interest, amortization |
| Compound Interest | `/compound-interest-calculator` | Final amount with compound growth |
| Currency Converter | `/currency-converter` | Real-time currency conversion |

### 📝 Word Tools

| Tool | URL | Description |
|------|-----|-------------|
| Word Counter | `/word-counter` | Word count, character count, reading time |
| Character Counter | `/character-counter` | Character count with/without spaces |
| Case Converter | `/case-converter` | Uppercase, lowercase, title case, sentence case |
| Lorem Ipsum Generator | `/lorem-ipsum-generator` | Generate placeholder text |
| Password Generator | `/password-generator` | Secure passwords with strength meter |

### 🔧 Developer Tools

| Tool | URL | Description |
|------|-----|-------------|
| JSON Formatter | `/json-formatter` | Format and validate JSON |
| Base64 Encoder | `/base64-encoder` | Encode and decode Base64 |
| URL Encoder | `/url-encoder` | Encode and decode URLs |
| Color Converter | `/color-converter` | HEX, RGB, HSL conversion with preview |
| QR Code Generator | `/qr-code-generator` | Generate QR codes from text or URLs |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Package Manager:** Bun

## Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

## Project Structure

```
tonle.app/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── crypto-profit-calculator/
│   ├── dca-calculator/
│   ├── loan-calculator/
│   ├── compound-interest-calculator/
│   ├── currency-converter/
│   ├── word-counter/
│   ├── character-counter/
│   ├── case-converter/
│   ├── lorem-ipsum-generator/
│   ├── password-generator/
│   ├── json-formatter/
│   ├── base64-encoder/
│   ├── url-encoder/
│   ├── color-converter/
│   └── qr-code-generator/
├── components/
│   ├── header.tsx                # Navigation + dark mode toggle
│   ├── footer.tsx                # Site footer
│   ├── theme-provider.tsx        # Dark/light mode context
│   ├── tool-card.tsx             # Tool card for homepage grid
│   └── adsense.tsx               # AdSense placeholder components
├── public/                       # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

## SEO

Every tool page includes:
- Unique `<title>` and `<meta description>`
- Open Graph tags for social sharing
- H1 with primary keyword
- Internal linking to related tools

## AdSense Setup

1. Apply for Google AdSense at [adsense.google.com](https://adsense.google.com)
2. Once approved, uncomment the AdSense components in `components/adsense.tsx`
3. Replace `YOUR_ADSENSE_CLIENT_ID` with your publisher ID
4. Redeploy

Required pages for AdSense approval:
- Privacy Policy
- About
- Contact

## License

MIT
