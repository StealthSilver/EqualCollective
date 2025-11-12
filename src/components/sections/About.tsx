"use client";

import React from "react";
import { motion } from "framer-motion";
import { PixelatedCanvas } from "../ui/PixelatedCanvas";

export const About = () => {
  return (
    <section className="relative max-h-screen w-full px-4 sm:px-6 py-20 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-ibm-plex-sans text-gray-900 text-center dark:text-gray-400 text-m  font-bold uppercase mb-12 tracking-tight"
        >
          About Us
        </motion.h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-sans">
              We're not just building software — we're engineering the operating
              system for the renewable century.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-sans">
              At Smart Grid Analytics, our mission is to transform how clean
              energy is orchestrated, controlled, and optimized. Our flagship
              platform, Solvyn, brings together SCADA, EMS, PPC, EPM, and IB
              (Intelligent Bidding) into a single AI-powered core that makes
              renewable systems faster, smarter, and more reliable than ever.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-sans">
              From solar parks and wind farms to hybrid plants and large-scale
              storage, Solvyn helps operators run assets with precision,
              investors unlock maximum value, and governments achieve their
              clean energy goals. It's not just about monitoring — it's about
              turning data into foresight, compliance into confidence, and
              megawatts into intelligence.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <PixelatedCanvas
              src="/about-img.png"
              width={400}
              height={600}
              cellSize={2}
              dotScale={0.85}
              shape="square"
              grayscale={false}
              interactive={true}
              distortionStrength={2}
              distortionRadius={40}
              distortionMode="swirl"
              jitterStrength={6}
              jitterSpeed={3}
              fadeOnLeave={true}
              fadeSpeed={0.12}
              autoTheme={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
