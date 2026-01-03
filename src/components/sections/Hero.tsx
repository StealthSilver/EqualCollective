"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ShimmerButton } from "../ui/ShimmerButton";

import { LogoTicker } from "./LogoTicker";

export default function Hero() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <section
      className="
        relative min-h-[calc(100vh-80px)] lg:min-h-screen h-full px-3 sm:px-4 md:px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32 
        overflow-hidden flex flex-col lg:justify-between mx-auto pb-6 sm:pb-10 md:pb-16
      "
    >
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight sm:leading-snug md:leading-normal lg:leading-snug
            text-gray-900 dark:text-gray-100
            max-w-full
          "
        >
          <span className="text-blue-500 text-color-pulse">AI Employees</span>
          <br />
          for Amazon Sellers, agencies & SaaS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="
            max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg font-sans leading-relaxed
            text-gray-600 dark:text-gray-400
          "
        >
          Our AI + Human-in-the-loop system handles critical tasks like Sales,
          review management, SEO, PPC & Pricing.
          <br className="hidden sm:block" />
          Enabling growth & profitability without growing headcount.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="
            flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6
            w-auto justify-center
          "
        >
          <ShimmerButton
            onClick={() => {
              window.open("https://cal.com/aryan-sethi-zafoth/30min", "_blank");
            }}
            className="font-sans px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-8 lg:py-3 font-bold text-white text-xs sm:text-xs md:text-sm lg:text-base w-auto"
            background="#3B82F6"
            shimmerColor="#ffffff"
          >
            CONNECT NOW
          </ShimmerButton>
        </motion.div>

        {/* Logo Ticker Section - Moved inside main content div */}
        <div className="max-w-7xl w-full mx-auto px-0 mt-2 sm:mt-3 md:mt-4 lg:mt-6 relative z-40">
          <LogoTicker />
        </div>
      </div>
    </section>
  );
}
