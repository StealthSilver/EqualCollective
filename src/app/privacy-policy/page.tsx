import Navbar from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Smart Grid Analytics",
  description: "Privacy Policy for Smart Grid Analytics Private Limited. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 font-ibm-plex-sans">
              Privacy Policy
            </h1>
          </div>

          {/* Company Info */}
          <div className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 font-sans">
              Who we are
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans mb-2">
              <strong>Smart Grid Analytics Private Limited</strong>
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 font-sans">
              <strong>Registered Office:</strong> MSM Plaza, Banaswadi, Outer Ring Road, Bengaluru – 560043 - India.
            </p>
          </div>

          {/* Privacy Policy Sections */}
          <div className="space-y-6 sm:space-y-8">
            {/* Section A1 */}
            <section className="pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 font-sans">
                A1. What we collect on the website
              </h2>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>Contact form details (name, email, phone, company, message).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>Usage data & diagnostics (IP address, device/browser data, pages viewed, timestamps).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>Optional marketing preferences.</span>
                </li>
              </ul>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans font-semibold">
                We do not sell personal data.
              </p>
            </section>

            {/* Section A2 */}
            <section className="pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 font-sans">
                A2. Why we collect it (purposes)
              </h2>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>Respond to your inquiries and provide requested information (contract/legitimate interest).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>Secure, operate and improve the site (legitimate interest/security).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>Send product updates/marketing only with your consent (unsubscribe anytime).</span>
                </li>
              </ul>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 font-sans italic">
                GDPR legal bases: Art. 6(1)(a), (b), (f).
              </p>
            </section>

            {/* Section A3 */}
            <section className="pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 font-sans">
                A3. Cookies & similar tech
              </h2>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                <p>
                  We use strictly necessary cookies and, with consent where required (e.g., EU/UK), analytics/functional cookies.
                </p>
                <p>
                  The banner lets you Accept all, Reject non-essential, or Manage choices.
                </p>
                <p>
                  A cookie list with purposes and lifetimes is linked from the banner.
                </p>
              </div>
            </section>

            {/* Section A4 */}
            <section className="pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 font-sans">
                A4. Sharing
              </h2>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                <p>
                  Limited sharing with processors (hosting, email, analytics, security).
                </p>
                <p>
                  No cross-context behavioural advertising.
                </p>
              </div>
            </section>

            {/* Section A5 */}
            <section className="pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 font-sans">
                A5. Retention
              </h2>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span><strong>Form submissions:</strong> 24 months (or sooner on deletion request).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span><strong>Web logs (security):</strong> ≥ 180 days per CERT-In; analytics data per tool defaults, then aggregated.</span>
                </li>
              </ul>
            </section>

            {/* Section A6 */}
            <section className="pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 font-sans">
                A6. Your rights & choices
              </h2>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>Access, correct, or delete your data.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>Withdraw consent and object to non-essential processing.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>EU/UK users also have portability and supervisory-authority rights.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>India users have grievance redressal/erasure aligned with DPDP-ready flows.</span>
                </li>
              </ul>
            </section>

            {/* Section A7 */}
            <section className="pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 font-sans">
                A7. How to exercise
              </h2>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                <p>
                  Email to{" "}
                  <a
                    href="mailto:cybersecuritysg@sgrids.io"
                    className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 underline font-medium transition-colors break-all"
                  >
                    cybersecuritysg@sgrids.io
                  </a>
                </p>
                <p>
                  We verify identity before fulfilling requests.
                </p>
              </div>
            </section>
          </div>

          {/* Last Updated */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 font-sans">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

