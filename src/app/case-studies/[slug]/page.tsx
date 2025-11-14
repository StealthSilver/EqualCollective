"use client";

import Navbar from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const caseStudiesData: Record<string, {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  sections: {
    title: string;
    content: string[];
  }[];
}> = {
  "indias-first-ems-deployment": {
    id: "SGA2024001",
    title: "INDIA'S FIRST",
    subtitle: "EMS DEPLOYMENT",
    description: "A landmark Energy Management System (EMS) project that redefined renewable storage in India.",
    image: "/case-studies/BESS.png",
    sections: [
      {
        title: "Project Scope",
        content: [
          "A 40MW/120MWh Battery Energy Storage System (BESS) integrated with a 100MW Solar PV plant required an advanced EMS to ensure solar-only charging, support fluctuation control, optimize charge/discharge cycles, and comply with regulatory requirements."
        ]
      },
      {
        title: "SGA Solution",
        content: [
          "To address these unique challenges, Smart Grid Analytics deployed a comprehensive EMS platform designed to maximize efficiency and reliability. The solution included:",
          "• EMS and BESS control for optimized charge/discharge management",
          "• Active power control with dynamic setpoints",
          "• Peak shaving, peak shifting, and power curve smoothing"
        ]
      },
      {
        title: "Outcome",
        content: [
          "The deployment delivered measurable impact and set a new benchmark for India's clean energy sector. It resulted in:",
          "• Stable power generation with dynamic load balancing",
          "• Reduced grid dependency and enhanced self-sufficiency",
          "• The first-ever EMS deployment in India, setting a new industry benchmark",
          "• Proof that large-scale renewable storage can be both reliable and regulation-compliant"
        ]
      }
    ]
  },
  "hybrid-ems-peak-power": {
    id: "SGA2024002",
    title: "Hybrid EMS for",
    subtitle: "Peak Power Management",
    description: "A hybrid Energy Management System that enabled stable peak-power delivery across solar, wind, and storage assets.",
    image: "/case-studies/HYBRID_BESS.png",
    sections: [
      {
        title: "Project Scope",
        content: [
          "A large-scale hybrid site — featuring a 150 MWh BESS, 81 MW Solar PV, and 322 MW Wind — required seamless integration to manage peak demand, deliver fluctuation-free dispatch, and provide instant backup reserves for grid stability."
        ]
      },
      {
        title: "SGA Solution",
        content: [
          "To achieve these goals, Smart Grid Analytics implemented a unified EMS that coordinated generation and storage in real time through:",
          "• Active power control for precise, market-ready dispatch",
          "• Peak shaving and peak shifting to flatten demand spikes and optimize revenue",
          "• Power-curve smoothing to reduce variability from wind and solar",
          "• Battery-based spinning reserve for immediate, fast-response balancing"
        ]
      },
      {
        title: "Outcome",
        content: [
          "The deployment delivered measurable operational and financial benefits, including:",
          "• Improved grid stability and reduced output volatility",
          "• Optimized energy dispatch for higher overall efficiency",
          "• Lower dependence on grid imports, improving self-sufficiency",
          "• A new benchmark for hybrid peak-power management in India",
          "• An advanced hybrid integration proving that large-scale peak power can be predictable, compliant, and profitable."
        ]
      }
    ]
  },
  "solar-first-microgrid": {
    id: "SGA2024003",
    title: "Solar-First Microgrid",
    subtitle: "for Extreme Environments",
    description: "A renewable-first microgrid delivering reliable power in harsh, off-grid conditions.",
    image: "/case-studies/SOLAR_IMAGE.png",
    sections: [
      {
        title: "Project Scope",
        content: [
          "A remote microgrid comprising 0.5 MW Solar PV, 2 MW BESS, multiple string inverters, and diesel generators required advanced control for efficient load balancing, reduced diesel dependency, and reliable operation under extreme environmental conditions."
        ]
      },
      {
        title: "SGA Solution",
        content: [
          "Smart Grid Analytics deployed an integrated control stack to prioritize renewables while ensuring operational reliability:",
          "• Microgrid Controller (MGC) for real-time monitoring and automated coordination",
          "• Automatic Generator Control (AGC) to optimize genset usage and reduce run hours",
          "• PV-prioritized BESS charging to maximize solar utilization and minimize diesel consumption",
          "• Integrated PPC & SCADA for unified visibility, control, and fault diagnostics"
        ]
      },
      {
        title: "Outcome",
        content: [
          "The microgrid now operates cleaner and more efficiently:",
          "• Significant reduction in diesel consumption and CO₂ emissions",
          "• Improved grid stability with higher renewable penetration",
          "• Seamless, automated operations with end-to-end visibility",
          "• A resilient, future-ready system built to prioritize clean energy without compromising uptime",
          "• A proof of how renewable-first microgrids can deliver reliability, efficiency, and sustainability—even in extreme conditions."
        ]
      }
    ]
  },
  "solar-prioritized-ems": {
    id: "SGA2024004",
    title: "Solar-Prioritized",
    subtitle: "EMS for Grid Compliance",
    description: "An advanced Energy Management System (EMS) designed to optimize solar charging, peak shaving, and grid-code compliance.",
    image: "/case-studies/solar_bess.png",
    sections: [
      {
        title: "Project Scope",
        content: [
          "A 5 MW BESS integrated with 16 MW Solar PV required an intelligent EMS to ensure solar-only charging, smooth peak demand, and maintain active/reactive power compliance with grid standards."
        ]
      },
      {
        title: "SGA Solution",
        content: [
          "Smart Grid Analytics implemented a solar-first EMS equipped with grid-compliant intelligence:",
          "• EMS Controller for BESS charging, load management, and solar curtailment",
          "• Peak shaving and shifting algorithms to optimize demand response and energy costs",
          "• Active/reactive power control to ensure regulatory compliance and stable grid operation"
        ]
      },
      {
        title: "Outcome",
        content: [
          "The deployment delivered a reliable, compliant, and efficient solar-prioritized EMS:",
          "• Solar-charged storage minimizing grid dependency",
          "• Smoothed demand curves through intelligent peak shaving",
          "• Stable, optimized renewable dispatch with full grid-code compliance",
          "• A clear demonstration that solar-first EMS solutions can achieve both operational efficiency and regulatory alignment in emerging markets."
        ]
      }
    ]
  },
  "peak-demand-optimization": {
    id: "SGA2024005",
    title: "Peak Demand Optimization",
    subtitle: "Through EMS",
    description: "Aligning solar generation with peak loads to reduce costs and grid reliance.",
    image: "/case-studies/Energy_Storage.png",
    sections: [
      {
        title: "Project Scope",
        content: [
          "A 2 MW BESS integrated with 0.5 MW Solar PV and supported by a diesel generator required an advanced EMS to minimize peak demand charges, align solar output with high-demand periods, and enable automated demand response for greater flexibility."
        ]
      },
      {
        title: "SGA Solution",
        content: [
          "Smart Grid Analytics deployed an intelligent EMS that synchronized renewable generation with dynamic demand patterns through:",
          "• Real-time load monitoring and control for precise demand shaping",
          "• Automated demand response to optimize peak shifting and energy usage",
          "• Predictive solar utilization algorithms to maximize on-site self-consumption"
        ]
      },
      {
        title: "Outcome",
        content: [
          "The deployment delivered tangible operational and economic benefits:",
          "• Lower peak demand charges and reduced overall energy costs",
          "• Increased solar utilization with minimal grid dependence",
          "• Smart, flexible load control enabled by automated demand response",
          "• A strong demonstration of how intelligent EMS solutions can make solar generation more cost-effective by matching production with real-time demand."
        ]
      }
    ]
  },
  "hybrid-ems-grid-stability": {
    id: "SGA2024006",
    title: "Hybrid EMS for Grid",
    subtitle: "Stability and Ancillary Services",
    description: "An advanced Energy Management System delivering stability and market-ready flexibility for hybrid renewable facilities.",
    image: "/case-studies/sloarpanelplate.png",
    sections: [
      {
        title: "Project Scope",
        content: [
          "A large-scale hybrid system combining 242 MWh BESS, 154 MW Solar PV, and 84 MW Wind required coordinated dispatch, grid-code compliance, participation in ancillary services, and optimized peak-demand management with reliable backup capabilities."
        ]
      },
      {
        title: "SGA Solution",
        content: [
          "Smart Grid Analytics deployed a unified EMS designed for hybrid integration and market participation through:",
          "• Real-time dispatch management across solar, wind, and storage assets",
          "• Ancillary service capabilities including delta production, frequency response, and reactive power control",
          "• Predictive coordination algorithms optimizing synergies between battery, wind, and solar systems"
        ]
      },
      {
        title: "Outcome",
        content: [
          "The project achieved both operational excellence and market readiness:",
          "• Seamless hybrid integration ensuring grid stability",
          "• Optimized peak-demand management via intelligent battery dispatch",
          "• Active participation in ancillary markets with reserve capabilities",
          "• Improved reliability and power quality through advanced frequency and reactive control",
          "• A benchmark hybrid deployment proving that renewables and storage can actively support the grid while maintaining profitability and compliance."
        ]
      }
    ]
  }
};

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const caseStudy = caseStudiesData[slug];

  if (!caseStudy) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-white/70 dark:bg-black/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <Link 
              href="/case-studies"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm sm:text-base font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Case Studies</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 sm:mb-10"
          >
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wider">
              Case Study: {caseStudy.id}
            </div>
            <h1 className="font-ibm-plex-sans text-black dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mb-2 sm:mb-3 tracking-tight leading-tight">
              {caseStudy.title}
            </h1>
            <h2 className="font-ibm-plex-sans text-black dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-6 sm:mb-8 tracking-tight leading-tight">
              {caseStudy.subtitle}
            </h2>
            <div className="w-12 sm:w-20 h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 mb-4 sm:mb-6" />
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl">
              {caseStudy.description}
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden mb-8 sm:mb-12 md:mb-16 border-2 border-gray-200 dark:border-gray-800 shadow-2xl"
          >
            <Image
              src={caseStudy.image}
              alt={`${caseStudy.title} ${caseStudy.subtitle}`}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {caseStudy.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-gray-200 dark:border-gray-800 shadow-lg"
              >
                <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 md:h-10 rounded-full bg-gradient-to-b from-orange-500 to-purple-600 flex-shrink-0" />
                  <h3 className="font-ibm-plex-sans text-black dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4 md:space-y-5 pl-0 md:pl-6">
                  {section.content.map((paragraph, pIndex) => (
                    <p 
                      key={pIndex} 
                      className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 md:pt-10 border-t-2 border-gray-200 dark:border-gray-800"
          >
            <Link 
              href="/case-studies"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View All Case Studies</span>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

