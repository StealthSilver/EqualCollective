"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedBeam } from "../ui/AnimatedBeam";
import Image from "next/image";

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  
  // Create refs for the 4 energy icons
  const bessRef = useRef<HTMLDivElement>(null);
  const solarRef = useRef<HTMLDivElement>(null);
  const windRef = useRef<HTMLDivElement>(null);
  const hydrogenRef = useRef<HTMLDivElement>(null);

  const energyServices = [
    { 
      ref: bessRef, 
      icon: "/BESS.svg", 
      title: "BESS",
      description: "Battery Energy Storage"
    },
    { 
      ref: solarRef, 
      icon: "/Solar.svg", 
      title: "Solar",
      description: "Solar Power Solutions"
    },
    { 
      ref: windRef, 
      icon: "/wind-power.svg", 
      title: "Wind",
      description: "Wind Energy Systems"
    },
    { 
      ref: hydrogenRef, 
      icon: "/GreenHydrogen.svg", 
      title: "Green Hydrogen",
      description: "Hydrogen Solutions"
    },
  ];

  return (
    <section className="relative w-full px-4 sm:px-6 py-20 lg:py-32 bg-gradient-to-b from-white/70 via-gray-50/70 to-white/70 dark:from-black/70 dark:via-gray-900/70 dark:to-black/70 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-ibm-plex-sans text-gray-900 text-center dark:text-gray-400 text-m  font-bold uppercase mb-12 tracking-tight"
        >
          Services
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400 text-lg mb-20"
        >
          Comprehensive energy solutions powered by cutting-edge technology
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div
          ref={containerRef}
          className="relative w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center px-4"
        >
          {/* Center logo - sgrids */}
          <motion.div
            ref={centerRef}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
            viewport={{ once: true }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-orange-500 p-1 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-900 flex items-center justify-center p-6">
                <Image
                  src="/sgrids.svg"
                  alt="SGrids Logo"
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Energy service icons - arranged in a grid below */}
          <div className="absolute top-80 md:top-96 left-1/2 -translate-x-1/2 w-full max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {energyServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  ref={service.ref}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + index * 0.1,
                    type: "spring" 
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-1 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-110 border border-gray-200 dark:border-gray-700">
                    <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-950 flex items-center justify-center p-4">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain group-hover:drop-shadow-lg transition-all duration-300"
                        style={{ filter: 'invert(0) brightness(0) saturate(100%)' }}
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 text-center">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 text-center">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated beams connecting center to all service icons */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={bessRef}
            curvature={-50}
            reverse={false}
            duration={4}
            delay={1.2}
            pathColor="rgba(168, 85, 247, 0.2)"
            pathWidth={2}
            pathOpacity={0.3}
            gradientStartColor="#a855f7"
            gradientStopColor="#ec4899"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={solarRef}
            curvature={-50}
            reverse={true}
            duration={3.5}
            delay={1.3}
            pathColor="rgba(249, 115, 22, 0.2)"
            pathWidth={2}
            pathOpacity={0.3}
            gradientStartColor="#f97316"
            gradientStopColor="#eab308"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={windRef}
            curvature={-50}
            reverse={false}
            duration={4.5}
            delay={1.4}
            pathColor="rgba(59, 130, 246, 0.2)"
            pathWidth={2}
            pathOpacity={0.3}
            gradientStartColor="#3b82f6"
            gradientStopColor="#06b6d4"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={hydrogenRef}
            curvature={-50}
            reverse={true}
            duration={3.8}
            delay={1.5}
            pathColor="rgba(34, 197, 94, 0.2)"
            pathWidth={2}
            pathOpacity={0.3}
            gradientStartColor="#22c55e"
            gradientStopColor="#10b981"
          />
        </div>
      </motion.div>
    </section>
  );
};
