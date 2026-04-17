import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Tonle",
  description: "Privacy policy for Tonle — free online tools for finance, crypto, and more.",
}

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: April 17, 2026</em></p>

      <h2>Introduction</h2>
      <p>
        Tonle (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website tonle.app (the &quot;Service&quot;). 
        This Privacy Policy explains how we collect, use, and protect information when you use our Service.
      </p>

      <h2>Information We Collect</h2>
      <h3>Information You Provide</h3>
      <p>
        When you use our tools, any data you enter (numbers, text, URLs) is processed entirely in your browser. 
        We do not collect, store, or transmit your input data to our servers.
      </p>

      <h3>Automatically Collected Information</h3>
      <p>
        We may collect the following automatically:
      </p>
      <ul>
        <li><strong>Log Data:</strong> IP address, browser type, pages visited, time and date of visit</li>
        <li><strong>Cookies:</strong> We use cookies for analytics and advertising. See &quot;Cookies&quot; section below.</li>
        <li><strong>Device Information:</strong> Screen size, operating system, device type</li>
      </ul>

      <h2>How We Use Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Maintain and improve the Service</li>
        <li>Analyze usage patterns to enhance user experience</li>
        <li>Display relevant advertisements through Google AdSense</li>
        <li>Ensure security and prevent abuse</li>
      </ul>

      <h2>Cookies</h2>
      <p>We use the following types of cookies:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for the Service to function (e.g., theme preference)</li>
        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the Service</li>
        <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant ads</li>
      </ul>
      <p>
        You can control cookies through your browser settings. Disabling cookies may affect some features of the Service.
      </p>

      <h2>Third-Party Services</h2>
      <h3>Google AdSense</h3>
      <p>
        We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads 
        based on your prior visits to tonle.app and other websites. You can opt out of personalized advertising 
        by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
      </p>
      <h3>Google Analytics</h3>
      <p>
        We may use Google Analytics to understand website traffic. Google Analytics collects information 
        anonymously and reports website trends without identifying individual visitors.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement appropriate security measures to protect your information. However, no method of 
        transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>Data Retention</h2>
      <p>
        We do not store your tool input data. Log data and analytics data are retained for up to 26 months 
        as per our analytics provider&apos;s default retention policy.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Our Service is not directed to children under 13. We do not knowingly collect personal information 
        from children under 13.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our Service may contain links to third-party websites. We are not responsible for the privacy 
        practices of those sites. We encourage you to read their privacy policies.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an 
        updated revision date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> privacy@tonle.app
      </p>
    </div>
  )
}
