"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import aryanSethi from "@/assets/Equal Collective/AryanSethi.jpg";
import rishabVerma from "@/assets/Equal Collective/RishabhVerma.jpg";
import utsavGudhaka from "@/assets/Equal Collective/UtsavGudhaka.png";
import Image from "next/image";
export const About = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mounted) {
      const isDark =
        resolvedTheme === "dark" ||
        theme === "dark" ||
        document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    }
  }, [theme, resolvedTheme, mounted]);

  return (
    <section
      id="about"
      className="relative w-full px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-24 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* About the Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-0"
        >
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-block relative">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Our Team
              </h3>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mt-8 sm:mt-12 lg:mt-16 py-4 sm:py-6 lg:py-8 justify-center max-w-5xl mx-auto">
            {/* Team Member 1 - Aryan Sethi */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/aryan-sethi-b210a11b3/",
                  "_blank"
                )
              }
            >
              {/* Card Content */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="w-full h-80 sm:h-96 overflow-hidden">
                  <Image
                    src={aryanSethi}
                    alt="Aryan Sethi"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info Section */}
                <div className="p-4 sm:p-6 text-center">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Aryan Sethi
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400">
                    Co-founder
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Team Member 2 - Rishabh Verma */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/vrishabh955/",
                  "_blank"
                )
              }
            >
              {/* Card Content */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="w-full h-80 sm:h-96 overflow-hidden">
                  <Image
                    src={rishabVerma}
                    alt="Rishabh Verma"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info Section */}
                <div className="p-4 sm:p-6 text-center">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Rishabh Verma
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400">
                    Co-founder
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Team Member 3 - Utsav Gudhaka */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/utsavgudhaka/",
                  "_blank"
                )
              }
            >
              {/* Card Content */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="w-full h-80 sm:h-96 overflow-hidden">
                  <Image
                    src={utsavGudhaka}
                    alt="Utsav Gudhaka"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info Section */}
                <div className="p-4 sm:p-6 text-center">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Utsav Gudhaka
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400">
                    Co-founder
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
