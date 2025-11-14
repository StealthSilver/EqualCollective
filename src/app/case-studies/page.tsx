"use client";

import Navbar from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: "SGA2024001",
    title: "India's First EMS Deployment",
    description: "A landmark Energy Management System (EMS) project that redefined renewable storage in India.",
    image: "/case-studies/BESS.png",
    slug: "indias-first-ems-deployment"
  },
  {
    id: "SGA2024002",
    title: "Hybrid EMS for Peak Power Management",
    description: "A hybrid Energy Management System that enabled stable peak-power delivery across solar, wind, and storage assets.",
    image: "/case-studies/HYBRID_BESS.png",
    slug: "hybrid-ems-peak-power"
  },
  {
    id: "SGA2024003",
    title: "Solar-First Microgrid for Extreme Environments",
    description: "A renewable-first microgrid delivering reliable power in harsh, off-grid conditions.",
    image: "/case-studies/SOLAR_IMAGE.png",
    slug: "solar-first-microgrid"
  },
  {
    id: "SGA2024004",
    title: "Solar-Prioritized EMS for Grid Compliance",
    description: "An advanced Energy Management System designed to optimize solar charging, peak shaving, and grid-code compliance.",
    image: "/case-studies/solar_bess.png",
    slug: "solar-prioritized-ems"
  },
  {
    id: "SGA2024005",
    title: "Peak Demand Optimization Through EMS",
    description: "Aligning solar generation with peak loads to reduce costs and grid reliance.",
    image: "/case-studies/Energy_Storage.png",
    slug: "peak-demand-optimization"
  },
  {
    id: "SGA2024006",
    title: "Hybrid EMS for Grid Stability and Ancillary Services",
    description: "An advanced Energy Management System delivering stability and market-ready flexibility for hybrid renewable facilities.",
    image: "/case-studies/sloarpanelplate.png",
    slug: "hybrid-ems-grid-stability"
  }
];

export default function CaseStudies() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-white/70 dark:bg-black/70 backdrop-blur-md pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12"
          >
            <h1 className="font-ibm-plex-sans text-black dark:text-white text-2xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-4 tracking-tight">
              Case Studies
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl">
              Explore our detailed case studies showcasing successful projects and
              innovative solutions in renewable energy management.
            </p>
          </motion.div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group relative block overflow-hidden rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] md:hover:scale-[1.02] h-fit"
                >
                  {/* Hover background gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0 bg-gradient-to-br from-orange-50 via-purple-50 to-white dark:from-orange-950/20 dark:via-purple-950/20 dark:to-gray-950" />

                  {/* Content wrapper */}
                  <div className="relative z-10">
                    {/* Image Container */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="p-4 sm:p-6 md:p-8">
                      {/* Case Study ID */}
                      <div className="text-[10px] sm:text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2 sm:mb-3 tracking-wider">
                        {study.id}
                      </div>

                      {/* Decorative element */}
                      <div className="w-8 sm:w-12 h-0.5 sm:h-1 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 mb-3 sm:mb-4" />

                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500">
                        {study.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-4 sm:mb-6">
                        {study.description}
                      </p>

                      {/* Read More Button */}
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transform hover:-translate-y-0.5">
                        <span>Read Case Study</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
