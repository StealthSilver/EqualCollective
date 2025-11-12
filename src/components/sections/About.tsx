"use client";

import React from "react";
import { motion } from "framer-motion";
import { PixelatedCanvas } from "../ui/PixelatedCanvas";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
      className="relative w-full px-4 sm:px-6 py-20 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden"
     
    >
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
       
        </div>

        {/* About the Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="font-ibm-plex-sans text-gray-900 text-center dark:text-gray-400 text-m font-bold uppercase mb-16 tracking-tight">
            About the Team
          </h3>

          <div className="space-y-32 mt-20 py-20">
            {/* Team Member 1 - Kumar M (Image on top right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative border-2 border-white dark:border-gray-300 rounded-3xl p-8 backdrop-blur-sm bg-white/40 dark:bg-black/40 min-h-[200px] mt-24"
            >
              <div className="absolute -top-20 right-8 w-48 h-48 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/Kumar.png"
                  alt="Kumar M"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-12 pr-56">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Kumar M
                </h4>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Founder & CEO
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-sans">
                  A visionary in the energy sector with over 20 years of hands-on experience, Kumar M has been at the forefront of renewable innovation, grid automation, and digital transformation. Since founding Armax in 2005 and later Smart Grid Analytics, he has led the development of intelligent energy platforms that now power gigawatts of assets globally. His work bridges deep engineering insight with entrepreneurial foresight—delivering technologies like Solvyn that are redefining how renewable infrastructure is monitored, controlled, and optimized.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 - Venkata Krishnan (Image on top left) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative border-2 border-white dark:border-gray-300 rounded-3xl p-8 backdrop-blur-sm bg-white/40 dark:bg-black/40 min-h-[200px]"
            >
              <div className="absolute -top-20 left-8 w-48 h-48 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/Venkata.png"
                  alt="Venkata Krishnan"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-12 pl-56">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-right">
                  Venkata Krishnan
                </h4>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-right">
                  Co-founder & CGO
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-sans text-right">
                  A growth architect with over two decades of experience in renewable energy and industrial automation, Venkata Krishnan brings a rare blend of strategic insight and executional excellence. As Co-founder and CGO of Smart Grid Analytics, he leads global expansion, partnerships, and customer success—driving Solvyn's adoption across diverse energy markets. His deep understanding of utility-scale operations and ability to translate technical solutions into business value makes him a catalyst for transformation in the clean energy ecosystem.
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 - Tirumaleswara Reddy K (Image on top right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative border-2 border-white dark:border-gray-300 rounded-3xl p-8 backdrop-blur-sm bg-white/40 dark:bg-black/40 min-h-[200px]"
            >
              <div className="absolute -top-20 right-8 w-48 h-48 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/Tirumaleshwar.png"
                  alt="Tirumaleswara Reddy K"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-12 pr-56">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Tirumaleswara Reddy K
                </h4>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  CTO
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-sans">
                  A software innovator with over two decades of experience in architecting scalable enterprise platforms, Tirumaleswara Reddy K leads the technology vision at Smart Grid Analytics. As CTO, he drives the design and development of Solvyn—an integrated, cloud-native platform built for the complexities of modern renewable energy systems. His expertise spans system architecture, data engineering, cybersecurity, and intelligent automation, making him the backbone of Solvyn's transformation from concept to global deployment.
                </p>
              </div>
            </motion.div>

            {/* Team Member 4 - Pankaj Ghai (Image on top left) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative border-2 border-white dark:border-gray-300 rounded-3xl p-8 backdrop-blur-sm bg-white/40 dark:bg-black/40 min-h-[200px]"
            >
              <div className="absolute -top-20 left-8 w-48 h-48 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/Pankaj.png"
                  alt="Pankaj Ghai"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-12 pl-56">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-right">
                  Pankaj Ghai
                </h4>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-right">
                  Senior Advisor
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-sans text-right">
                  A seasoned leader in private equity and climate infrastructure, Pankaj Ghai brings deep financial and strategic insight to Smart Grid Analytics. As Senior Advisor, he plays a key role in guiding Solvyn's North American growth, forging investor alliances, and shaping long-term value creation. With a track record of driving capital efficiency and scaling climate-focused ventures, he bridges financial discipline with purpose-driven innovation in the clean energy sector.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
