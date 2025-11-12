"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedBeam } from "../ui/AnimatedBeam";

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // Create 10 beam endpoints arranged in a circle
  const beamRefs = Array.from({ length: 10 }).map(() =>
    useRef<HTMLDivElement>(null)
  );

  return (
    <section className="relative w-full px-4 sm:px-6 py-20 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title - Solvyn */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-ibm-plex-sans text-gray-900 text-center dark:text-gray-400 text-m  font-bold uppercase mb-12 tracking-tight"
        >
          Services
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <div
          ref={containerRef}
          className="relative w-full h-96 flex items-center justify-center"
        >
          {/* Center circle */}
          <div
            ref={centerRef}
            className="absolute w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-orange-500 flex items-center justify-center z-20 shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Solvyn</span>
            </div>
          </div>

          {/* 10 Beam endpoints arranged in a circle */}
          {beamRefs.map((ref, index) => {
            const angle = (index / 10) * Math.PI * 2;
            const radius = 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={index}
                ref={ref}
                className="absolute w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  left: "50%",
                  top: "50%",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
              </div>
            );
          })}

          {/* Animated beams connecting center to all endpoints */}
          {beamRefs.map((toRef, index) => (
            <AnimatedBeam
              key={`beam-${index}`}
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={toRef}
              curvature={0}
              reverse={index % 2 === 0}
              duration={Math.random() * 2 + 3}
              delay={index * 0.1}
              pathColor="gray"
              pathWidth={2}
              pathOpacity={0.2}
              gradientStartColor={index % 2 === 0 ? "#ffaa40" : "#9c40ff"}
              gradientStopColor={index % 2 === 0 ? "#9c40ff" : "#ffaa40"}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
