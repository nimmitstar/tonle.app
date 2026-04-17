/**
 * Google AdSense Components
 *
 * INSTRUCTIONS:
 * 1. Apply for AdSense at https://adsense.google.com/
 * 2. Get your AdSense ID (ca-pub-XXXXXXXXXXXXXXXX)
 * 3. Replace "YOUR_ADSENSE_ID" below with your actual ID
 * 4. Uncomment the ad components where you want them to appear
 * 5. After approval, ads will start showing
 *
 * Ad formats:
 * - Banner: 728x90 (header)
 * - In-content: Responsive (between sections)
 * - Square: 300x250 (sidebar/below results)
 * - Sidebar: 300x600 (skyscraper)
 */

// UNCOMMENT AFTER ADSENSE APPROVAL:
/*
export function AdSenseScript() {
  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID"
      crossOrigin="anonymous"
    />
  )
}
*/

export function HeaderAd() {
  // UNCOMMENT AFTER ADSENSE APPROVAL:
  /*
  return (
    <div className="flex justify-center my-6">
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "728px", height: "90px" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
        data-ad-slot="YOUR_SLOT_ID"
      />
    </div>
  )
  */
  return (
    <div className="flex justify-center my-6">
      <div className="w-full max-w-[728px] h-[90px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement (728×90 banner)
      </div>
    </div>
  )
}

export function InContentAd() {
  // UNCOMMENT AFTER ADSENSE APPROVAL:
  /*
  return (
    <div className="flex justify-center my-8">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
        data-ad-slot="YOUR_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
  */
  return (
    <div className="flex justify-center my-8">
      <div className="w-full max-w-[728px] h-[250px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement (in-content responsive)
      </div>
    </div>
  )
}

export function SquareAd() {
  // UNCOMMENT AFTER ADSENSE APPROVAL:
  /*
  return (
    <div className="flex justify-center my-6">
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "300px", height: "250px" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
        data-ad-slot="YOUR_SLOT_ID"
      />
    </div>
  )
  */
  return (
    <div className="flex justify-center my-6">
      <div className="w-[300px] h-[250px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement (300×250 square)
      </div>
    </div>
  )
}

export function SidebarAd() {
  // UNCOMMENT AFTER ADSENSE APPROVAL:
  /*
  return (
    <div className="sticky top-20">
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "300px", height: "600px" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
        data-ad-slot="YOUR_SLOT_ID"
      />
    </div>
  )
  */
  return (
    <div className="sticky top-20">
      <div className="w-[300px] h-[600px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement (300×600 skyscraper)
      </div>
    </div>
  )
}

export function BetweenToolsAd() {
  // UNCOMMENT AFTER ADSENSE APPROVAL:
  /*
  return (
    <div className="w-full my-12">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
        data-ad-slot="YOUR_SLOT_ID"
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      />
    </div>
  )
  */
  return (
    <div className="w-full my-12">
      <div className="w-full h-[120px] rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
        Advertisement (between tools sections)
      </div>
    </div>
  )
}
