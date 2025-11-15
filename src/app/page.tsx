import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Solvyn } from "../components/sections/Solvyn";
import { Services } from "../components/sections/Services";
import { Cta } from "../components/sections/Cta";
import { Footer } from "../components/sections/Footer";
import type { Metadata } from "next";
import { SITE } from "../config/site.config";

export const metadata: Metadata = {
  title: "Smart Grid Analytics - Renewable Energy Intelligence Platform | Solvyn",
  description: "Transform your renewable energy operations with Solvyn - the only platform you need for renewable intelligence. Optimize assets, ensure compliance, and streamline grid access. Trusted by industry leaders handling 85+ GW of power across 400+ projects.",
  keywords: [
    "renewable energy",
    "smart grid analytics",
    "Solvyn",
    "energy management system",
    "SCADA",
    "EMS",
    "PPC",
    "EPM",
    "intelligent bidding",
    "solar energy",
    "wind energy",
    "energy storage",
    "grid compliance",
    "renewable energy platform",
    "clean energy",
  ],
  openGraph: {
    title: "Smart Grid Analytics - Renewable Energy Intelligence Platform",
    description: "The only platform you need for renewable intelligence. Optimize renewable assets, ensure compliance, and streamline grid access with Solvyn.",
    url: SITE.url,
    siteName: "Smart Grid Analytics",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Smart Grid Analytics - Solvyn Platform",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Grid Analytics - Renewable Energy Intelligence Platform",
    description: "The only platform you need for renewable intelligence. Optimize renewable assets, ensure compliance, and streamline grid access.",
    creator: SITE.twitterHandle,
    images: [SITE.ogImage],
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Smart Grid Analytics",
    url: SITE.url,
    logo: `${SITE.url}/logo_light.svg`,
    description: "Smart Grid Analytics provides Solvyn - an AI-powered platform for renewable energy operations, combining SCADA, EMS, PPC, EPM, and Intelligent Bidding.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-95133-79911",
      contactType: "Customer Service",
      email: "info@sgrids.io",
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, MSM Plaza, Service Road, Outer Ring Rd, Banaswadi",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560113",
      addressCountry: "IN",
    },
    sameAs: [
      SITE.twitterHandle,
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Smart Grid Analytics",
    url: SITE.url,
    description: "The only platform you need for renewable intelligence. Optimize renewable assets, ensure compliance, and streamline grid access.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Smart Grid Analytics - Renewable Energy Intelligence Platform",
    description: "Transform your renewable energy operations with Solvyn - the only platform you need for renewable intelligence.",
    url: SITE.url,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Smart Grid Analytics",
      url: SITE.url,
    },
    about: {
      "@type": "Thing",
      name: "Renewable Energy Management",
      description: "AI-powered platform for optimizing renewable energy assets, ensuring compliance, and streamlining grid access.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageStructuredData) }}
      />
    <main>
      <Navbar />
      <Hero />
      <About />
      <Solvyn />
      <Services />
      <Cta />
      <Footer />
    </main>
    </>
  );
}
