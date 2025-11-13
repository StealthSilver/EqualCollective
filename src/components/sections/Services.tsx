"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedBeam } from "../ui/AnimatedBeam";
import Image from "next/image";
import { useTheme } from "next-themes";

// Import icons for features
import stackIcon from "@/app/Icons/stack.svg";
import technologyIcon from "@/app/Icons/technology.svg";
import provenIcon from "@/app/Icons/Proven.svg";
import innovationIcon from "@/app/Icons/INNOVATION.svg";
import energyIcon from "@/app/Icons/energyefficiency.svg";
import aiIcon from "@/app/Icons/AiTechnology.svg";
import { Icon } from "@/components/ui/Icon";

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // Create refs for the 4 energy icons
  const bessRef = useRef<HTMLDivElement>(null);
  const solarRef = useRef<HTMLDivElement>(null);
  const windRef = useRef<HTMLDivElement>(null);
  const hydrogenRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Force beams to recalculate after animations complete
  const [beamKey, setBeamKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted
    setMounted(true);
    
    // Multiple recalculations to ensure beams are positioned correctly
    const timers = [
      setTimeout(() => setBeamKey((prev) => prev + 1), 100),
      setTimeout(() => setBeamKey((prev) => prev + 1), 500),
      setTimeout(() => setBeamKey((prev) => prev + 1), 1000),
      setTimeout(() => setBeamKey((prev) => prev + 1), 1800),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const energyServices = [
    {
      ref: bessRef,
      icon: "/BESS.svg",
      title: "BESS",
      description: "Battery Energy Storage Systems",
    },
    {
      ref: solarRef,
      icon: "/Solar.svg",
      title: "Solar",
      description: "Solar Power Solutions",
    },
    {
      ref: windRef,
      icon: "/wind-power.svg",
      title: "Wind",
      description: "Wind Energy Solutions",
    },
    {
      ref: hydrogenRef,
      icon: "/GreenHydrogen.svg",
      title: "Green Hydrogen",
      description: "Green Hydrogen Solutions",
    },
  ];

  const featureData = [
    {
      icon: technologyIcon,
      title: "TRULY AGNOSTIC",
      description: "Platform-independent solution that works seamlessly across all systems and technologies.",
    },
    {
      icon: stackIcon,
      title: "MODULAR AND SCALABLE",
      description: "Flexible architecture that grows with your infrastructure and adapts to changing needs.",
    },
    {
      icon: energyIcon,
      title: "SEAMLESS INTEGRATION",
      description: "Effortlessly connects with existing grid systems for unified energy management.",
    },
    {
      icon: innovationIcon,
      title: "RAPID INNOVATION",
      description: "Continuous updates and cutting-edge features to stay ahead of industry demands.",
    },
    {
      icon: provenIcon,
      title: "PROVEN TRACK-RECORD",
      description: "Trusted by industry leaders with demonstrated success in real-world deployments.",
    },
    {
      icon: aiIcon,
      title: "FUTURE-READY",
      description: "AI-powered analytics and cloud-based infrastructure built for tomorrow's challenges.",
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full px-4 sm:px-6 pt-20 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden"
    >
      {/* ====== TITLE ====== */}
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-ibm-plex-sans text-gray-900 text-center dark:text-gray-400 text-m font-bold uppercase mb-8 tracking-tight"
        >
          Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400 text-lg font-sans leading-relaxed max-w-3xl mx-auto"
        >
          Comprehensive energy solutions powered by cutting-edge technology
        </motion.p>
      </div>

      {/* ====== CENTER ANIMATION ====== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div
          ref={containerRef}
          className="relative w-full min-h-[450px] md:min-h-[500px] flex items-center justify-center px-4"
        >
          {/* Center logo - smaller */}
          <motion.div
            ref={centerRef}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              type: "spring",
              bounce: 0.4,
            }}
            viewport={{ once: true }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-orange-500 via-purple-600 to-orange-500 p-[2px] shadow-2xl hover:shadow-orange-500/30 dark:hover:shadow-orange-500/50 transition-all duration-500 hover:scale-110 group">
              <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-900 flex items-center justify-center p-4 backdrop-blur-sm">
                <Image
                  src="/sgrids.svg"
                  alt="SGrids Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Energy service icons - smaller boxes */}
          <div className="absolute top-64 md:top-72 left-1/2 -translate-x-1/2 w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {energyServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  ref={service.ref}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    bounce: 0.4,
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-[2px] shadow-md hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] dark:hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all duration-500 group-hover:scale-110">
                    <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-950 flex items-center justify-center p-3 backdrop-blur-sm">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain brightness-0 dark:brightness-0 dark:invert transition-all duration-500"
                      />
                    </div>
                  </div>
                  <h3 className="mt-3 text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 text-center font-sans group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 text-center font-sans leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated beams - only render after mount to ensure correct positioning */}
          {mounted && (
            <>
              <AnimatedBeam
                key={`bess-${beamKey}`}
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={bessRef}
                curvature={-20}
                reverse
              />
              <AnimatedBeam
                key={`solar-${beamKey}`}
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={solarRef}
                curvature={-40}
                reverse
              />
              <AnimatedBeam
                key={`wind-${beamKey}`}
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={windRef}
                curvature={-40}
              />
              <AnimatedBeam
                key={`hydrogen-${beamKey}`}
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={hydrogenRef}
                curvature={-20}
              />
            </>
          )}
        </div>
      </motion.div>

      {/* ====== NEW FEATURES SECTION BELOW ====== */}
      <section
        id="features"
        className="overflow-x-hidden mt-8 py-10 md:py-16 px-4 flex flex-col items-center justify-center transition-colors duration-700"
      >
        {/* Title - matching the Services title style */}
        <div className="max-w-7xl mx-auto mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-ibm-plex-sans text-gray-900 dark:text-gray-400 text-center text-m font-bold uppercase mb-6 tracking-tight"
          >
            Why Smart Grid Analytics?
          </motion.h2>

          {/* Concise Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-8"
          >
            <p className="text-center text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              Founded by control engineers and energy futurists, we built <span className="font-semibold text-orange-600 dark:text-orange-400">Solvyn</span> — the only platform unifying SCADA, EMS, PPC, EPM, Intelligent Bidding, Digital Twin, and AI analytics into one seamless system.
            </p>
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              With <span className="font-semibold text-gray-800 dark:text-gray-200">85+ GW of assets under management across 20 countries</span>, we transform megawatts into decisions and data into foresight — enabling real-time visibility, AI-driven fault prevention, automated dispatch, and built-in compliance with CEA, IEC 62443, AEMO, and global grid codes.
            </p>
          </motion.div>
        </div>

        {/* Cards - 3x2 Grid */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featureData.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[280px] p-8 overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.02]"
              >
                {/* Hover background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0 bg-gradient-to-br from-orange-50 via-purple-50 to-white dark:from-orange-950/20 dark:via-purple-950/20 dark:to-gray-950" />
                
                {/* Content wrapper */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon with decorative element */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-orange-100 to-purple-100 dark:from-orange-900/30 dark:to-purple-900/30 group-hover:scale-110 transition-all duration-500">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={32}
                        height={32}
                        className="w-8 h-8 brightness-0 dark:brightness-0 dark:invert opacity-80 dark:opacity-90"
                      />
                    </div>
                    {/* Small rounded rectangle on right */}
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-orange-500 to-purple-600 transition-all duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500 leading-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Services;
