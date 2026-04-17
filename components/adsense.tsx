/**
 * Google AdSense Components
 *
 * SETUP:
 * 1. Apply at https://adsense.google.com/ with your site URL
 * 2. After approval, you'll get a publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
 * 3. Create ad units in AdSense dashboard to get slot IDs
 * 4. Set environment variables:
 *    NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
 *    NEXT_PUBLIC_ADSENSE_SLOT_HEADER=XXXXXXXXXX
 *    NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT=XXXXXXXXXX
 *    NEXT_PUBLIC_ADSENSE_SLOT_SQUARE=XXXXXXXXXX
 *    NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=XXXXXXXXXX
 *    NEXT_PUBLIC_ADSENSE_SLOT_BETWEEN=XXXXXXXXXX
 * 5. Add these to Vercel: vercel env add NEXT_PUBLIC_ADSENSE_CLIENT_ID
 * 6. Redeploy — ads appear automatically
 */

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
const AD_ENABLED = !!AD_CLIENT

// Place in layout.tsx <head> — loads AdSense SDK
export function AdSenseScript() {
  if (!AD_ENABLED) return null

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
      crossOrigin="anonymous"
    />
  )
}

// Banner ad — top of pages (728×90 desktop, responsive mobile)
export function HeaderAd() {
  if (AD_ENABLED) {
    return (
      <div className="flex justify-center my-6">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Placeholder — shows until AdSense is configured
  return (
    <div className="flex justify-center my-6">
      <div className="w-full max-w-[728px] h-[90px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement
      </div>
    </div>
  )
}

// Responsive in-content ad — between tool sections
export function InContentAd() {
  if (AD_ENABLED) {
    return (
      <div className="flex justify-center my-8">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  return (
    <div className="flex justify-center my-8">
      <div className="w-full max-w-[728px] h-[250px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement
      </div>
    </div>
  )
}

// Square ad — below tool results (300×250)
export function SquareAd() {
  if (AD_ENABLED) {
    return (
      <div className="flex justify-center my-6">
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "250px" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SQUARE}
        />
      </div>
    )
  }

  return (
    <div className="flex justify-center my-6">
      <div className="w-[300px] h-[250px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement
      </div>
    </div>
  )
}

// Sidebar skyscraper (300×600)
export function SidebarAd() {
  if (AD_ENABLED) {
    return (
      <div className="sticky top-20">
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "600px" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR}
        />
      </div>
    )
  }

  return (
    <div className="sticky top-20">
      <div className="w-[300px] h-[600px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement
      </div>
    </div>
  )
}

// Fluid ad between tool sections on homepage
export function BetweenToolsAd() {
  if (AD_ENABLED) {
    return (
      <div className="w-full my-12">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BETWEEN}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
        />
      </div>
    )
  }

  return (
    <div className="w-full my-12">
      <div className="w-full h-[120px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement
      </div>
    </div>
  )
}
