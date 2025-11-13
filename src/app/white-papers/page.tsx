"use client";

import Navbar from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Image from "next/image";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const whitePapers = [
  {
    title: "Alberta TCDC",
    description: "Technical insights on Alberta TCDC infrastructure and implementation strategies.",
    image: "/AlbertaTCDC.jpeg",
    pdf: "/AlbertaTCDC.pdf",
  },
  {
    title: "Data Centres as VPP",
    description: "Exploring how data centres can function as Virtual Power Plants for grid stability.",
    image: "/DataCentresasVPP.jpeg",
    pdf: "/DataCentresasVPP.pdf",
  },
  {
    title: "Smart EMS Data Centres",
    description: "Advanced Energy Management Systems for modern data centre operations.",
    image: "/SmartEMS.jpeg",
    pdf: "/SmartEMSDataCentres.pdf",
  },
  {
    title: "Unlocking India's Renewable Grid",
    description: "Comprehensive analysis of renewable energy integration in India's power grid.",
    image: "/RenewableGrid.jpeg",
    pdf: "/UnlockingIndiaRenewableGrid.pdf",
  },
];

export default function WhitePapers() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-white/70 dark:bg-black/70 backdrop-blur-md pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="font-ibm-plex-sans text-black dark:text-white text-4xl font-medium  mb-4 tracking-tight">
              White Papers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-3xl">
              Read our in-depth white papers on industry insights and technical
              expertise in renewable energy and smart grid solutions.
            </p>
          </motion.div>

          {/* White Papers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {whitePapers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.02]"
              >
                {/* Hover background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0 bg-gradient-to-br from-orange-50 via-purple-50 to-white dark:from-orange-950/20 dark:via-purple-950/20 dark:to-gray-950" />

                {/* Content wrapper */}
                <div className="relative z-10">
                  {/* Image Container - Thinner aspect ratio */}
                  <div className="relative aspect-[16/7] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={paper.image}
                      alt={paper.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-6 md:p-8">
                    {/* Decorative element */}
                    <div className="w-12 h-1 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 mb-4" />

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500">
                      {paper.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-6">
                      {paper.description}
                    </p>

                    {/* Download Button */}
                    <a
                      href={paper.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transform hover:-translate-y-0.5"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
