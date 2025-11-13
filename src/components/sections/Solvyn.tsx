"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedBeam } from "../ui/AnimatedBeam";

export const Solvyn = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const beamRefs = Array.from({ length: 10 }).map(() =>
    useRef<HTMLDivElement>(null)
  );

  return (
    <section id="solvyn" className="relative w-full px-4 sm:px-6 py-20 bg-gradient-to-b from-white/70 to-gray-50/70 dark:from-black/70 dark:to-gray-950/70 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title - Solvyn */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-ibm-plex-sans text-gray-900 text-center dark:text-gray-400 text-m font-bold uppercase mb-12 tracking-tight"
        >
          Solvyn
        </motion.h2>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Card with gradient border */}
          <div className="relative group mb-12">
            {/* Gradient border wrapper */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-purple-600 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-500"></div>
            
            {/* Main content card */}
            <div className="relative bg-white dark:bg-gray-950 rounded-3xl p-8 sm:p-10 md:p-12 border border-gray-200 dark:border-gray-800 shadow-xl">
              {/* Section Title */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="inline-block mb-6"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg blur opacity-25"></div>
                    <h3 className="relative text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-purple-700 dark:from-gray-100 dark:via-orange-400 dark:to-purple-500 bg-clip-text text-transparent px-4 py-2">
                      Innovation With Purpose
                    </h3>
                  </div>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed font-medium"
                >
                  Innovation is our engine, purpose is our compass, and experience
                  is the ground we stand on.
                </motion.p>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center justify-center my-8">
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
                <div className="mx-4 w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600"></div>
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
              </div>

              {/* Main Content Paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 text-justify"
              >
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Solvyn was built for the complexity of renewable energy — to turn
                  scattered data into unified intelligence across every layer of
                  operations, from the control room to the boardroom.
                </p>

                <div className="relative pl-6 border-l-4 border-gradient-to-b from-orange-500 to-purple-600 bg-gradient-to-r from-orange-50 to-purple-50 dark:from-orange-950/20 dark:to-purple-950/20 rounded-r-xl py-4 pr-6">
                  <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
                    More than a platform, Solvyn is a new way of running energy: a
                    secure, AI-driven system that unifies{" "}
                    <span className="font-semibold text-orange-600 dark:text-orange-400">SCADA</span>,{" "}
                    <span className="font-semibold text-orange-600 dark:text-orange-400">EMS</span>,{" "}
                    <span className="font-semibold text-orange-600 dark:text-orange-400">PPC</span>,{" "}
                    <span className="font-semibold text-orange-600 dark:text-orange-400">EPM</span>, and{" "}
                    <span className="font-semibold text-orange-600 dark:text-orange-400">Intelligent Bidding (IB)</span>. 
                    It's designed for solar, wind, BESS, hybrid, and green hydrogen, and built to serve those who carry the
                    responsibility of the transition — operators seeking reliability,
                    investors seeking returns, and governments driving national clean
                    energy goals.
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Where others give you fragments, Solvyn gives you the whole
                  picture — <span className="font-semibold text-gray-900 dark:text-gray-100">automation that scales</span>,{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">compliance that's built in</span>, and{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">intelligence that's always one step ahead</span>.
                </p>
              </motion.div>

              {/* Bottom accent */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-10 h-1 w-full bg-gradient-to-r from-orange-500 via-purple-600 to-orange-500 rounded-full"
              ></motion.div>
            </div>
          </div>

          {/* Key Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Unified Platform",
                description: "One system for all operations",
                icon: "🔗",
              },
              {
                title: "AI-Driven",
                description: "Intelligence at every layer",
                icon: "🤖",
              },
              {
                title: "Proven Reliability",
                description: "Trusted by industry leaders",
                icon: "✅",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/20 dark:hover:shadow-orange-500/30"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated Beams Section - Placeholder for future use */}
      </div>
    </section>
  );
};
