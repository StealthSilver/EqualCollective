"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedBeam } from "../ui/AnimatedBeam";

export const Solvyn = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // Create 10 beam endpoints arranged in a circle
  const beamRefs = Array.from({ length: 10 }).map(() =>
    useRef<HTMLDivElement>(null)
  );

  return (
    <section id="solvyn" className="relative w-full px-4 sm:px-6 py-20 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title - Solvyn */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-ibm-plex-sans text-gray-900 text-center dark:text-gray-400 text-m  font-bold uppercase mb-12 tracking-tight"
        >
          Solvyn
        </motion.h2>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Section Title */}
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Innovation With Purpose
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Innovation is our engine, purpose is our compass, and experience
              is the ground we stand on.
            </p>
          </div>

          {/* Main Content Paragraphs */}
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              Solvyn was built for the complexity of renewable energy — to turn
              scattered data into unified intelligence across every layer of
              operations, from the control room to the boardroom.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              More than a platform, Solvyn is a new way of running energy: a
              secure, AI-driven system that unifies SCADA, EMS, PPC, EPM, and
              Intelligent Bidding (IB). It's designed for solar, wind, BESS,
              hybrid, and green hydrogen, and built to serve those who carry the
              responsibility of the transition — operators seeking reliability,
              investors seeking returns, and governments driving national clean
              energy goals.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              Where others give you fragments, Solvyn gives you the whole
              picture — automation that scales, compliance that's built in, and
              intelligence that's always one step ahead.
            </p>
          </div>
        </motion.div>

        {/* Animated Beams Section */}
      </div>
    </section>
  );
};
