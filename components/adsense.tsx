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
    <div className="flex justify-center my-4">
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
    <div className="flex justify-center my-4 text-xs text-zinc-400">
      {/* Advertisement space - 728x90 banner */}
    </div>
  )
}

export function InContentAd() {
  // UNCOMMENT AFTER ADSENSE APPROVAL:
  /*
  return (
    <div className="flex justify-center my-6">
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
    <div className="flex justify-center my-6 text-xs text-zinc-400">
      {/* Advertisement space - in-content */}
    </div>
  )
}

export function SquareAd() {
  // UNCOMMENT AFTER ADSENSE APPROVAL:
  /*
  return (
    <div className="flex justify-center my-4">
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
    <div className="flex justify-center my-4 text-xs text-zinc-400">
      {/* Advertisement space - 300x250 square */}
    </div>
  )
}
