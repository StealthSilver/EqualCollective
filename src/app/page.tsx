import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Services } from "../components/sections/Services";
import { Cta } from "../components/sections/Cta";
import { Footer } from "../components/sections/Footer";
import type { Metadata } from "next";
import { SITE } from "../config/site.config";

export const metadata: Metadata = {
  title: "AI Employees for Amazon Sellers & Agencies | Equal Collective",
  description:
    "Meet Jeff & Penny - AI Employees that automate tasks for Amazon sellers, agencies, and SaaS companies. Book 5x more meetings, optimize revenue 24/7. Join 100+ companies scaling with Equal Collective.",
  keywords: [
    "AI employees",
    "AI automation",
    "Amazon seller tools",
    "revenue optimization",
    "sales automation",
    "AI agents",
    "business automation",
    "meeting booking AI",
    "revenue management",
    "equal collective",
  ],
  openGraph: {
    title: "AI Employees for Amazon Sellers & Agencies | Equal Collective",
    description:
      "Meet Jeff & Penny - AI Employees that automate tasks for Amazon sellers, agencies, and SaaS companies. Book 5x more meetings, optimize revenue 24/7.",
    url: SITE.url,
    siteName: "Equal Collective",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Equal Collective - AI Employees Platform",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Employees for Amazon Sellers & Agencies | Equal Collective",
    description:
      "Meet Jeff & Penny - AI Employees that automate tasks for Amazon sellers, agencies, and SaaS companies. Book 5x more meetings, optimize revenue 24/7.",
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
    name: "Equal Collective",
    url: SITE.url,
    logo: `${SITE.url}/logo_light.svg`,
    description:
      "AI Employees platform providing Jeff & Penny - intelligent AI agents that automate tasks for Amazon sellers, agencies, and SaaS companies.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-XXX-XXX-XXXX",
      contactType: "Customer Service",
      email: "hello@equalcollective.com",
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Equal Collective",
    url: SITE.url,
    description:
      "AI Employees platform for Amazon sellers, agencies, and SaaS companies. Automate tasks and scale with Jeff & Penny.",
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
    name: "AI Employees for Amazon Sellers & Agencies | Equal Collective",
    description:
      "Meet Jeff & Penny - AI Employees that automate tasks and help scale your business.",
    url: SITE.url,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Equal Collective",
      url: SITE.url,
    },
    about: {
      "@type": "Thing",
      name: "AI Employees",
      description:
        "Intelligent AI agents (Jeff & Penny) that automate sales, revenue optimization, and business tasks for companies.",
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData),
        }}
      />
      <main>
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Cta />
        <Footer />
      </main>
    </>
  );
}
