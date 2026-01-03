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
        relative lg:min-h-screen h-full px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 lg:pt-32 
        overflow-hidden flex flex-col justify-between mx-auto pb-8 sm:pb-12 md:pb-16
      "
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight sm:leading-snug md:leading-normal lg:leading-18
            text-gray-900 dark:text-gray-100
            max-w-full sm:max-w-3xl md:max-w-4xl
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
            max-w-full sm:max-w-3xl md:max-w-4xl text-sm sm:text-base md:text-lg lg:text-xl font-sans leading-relaxed
            text-gray-600 dark:text-gray-400
          "
        >
          Our AI + Human-in-the-loop system handles critical tasks like Sales,
          review management, SEO, PPC & Pricing. Enabling growth & profitability
          without growing headcount.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="
            flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8 mt-4 sm:mt-6
            w-auto justify-center
          "
        >
          <ShimmerButton
            onClick={() => {
              window.open("https://cal.com/aryan-sethi-zafoth/30min", "_blank");
            }}
            className="font-sans px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-8 lg:py-3 font-bold text-white text-[10px] sm:text-xs md:text-sm lg:text-base w-auto"
            background="#3B82F6"
            shimmerColor="#ffffff"
          >
            CONNECT NOW
          </ShimmerButton>
        </motion.div>
      </div>

      {/* Logo Ticker Section */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 mt-3 sm:mt-4 md:mt-5 lg:mt-6 relative z-40">
        <LogoTicker />
      </div>
    </section>
  );
}
