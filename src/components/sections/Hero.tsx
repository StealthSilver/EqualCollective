"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ShimmerButton } from "../ui/ShimmerButton";
import { World } from "../ui/Globe";
import { NumberTicker } from "../ui/NumberTicker";

const sampleArcs = [
  {
    order: 1,
    startLat: 40,
    startLng: -95,
    endLat: 36,
    endLng: 139,
    arcAlt: 0.1,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 2,
    startLat: 51.5,
    startLng: -0.1,
    endLat: 35.6,
    endLng: 139.6,
    arcAlt: 0.2,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 3,
    startLat: 35.6,
    startLng: 139.6,
    endLat: -33.8,
    endLng: 151.2,
    arcAlt: 0.15,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 4,
    startLat: -33.8,
    startLng: 151.2,
    endLat: 1.3,
    endLng: 103.8,
    arcAlt: 0.18,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 5,
    startLat: 1.3,
    startLng: 103.8,
    endLat: 40.7,
    endLng: -74.0,
    arcAlt: 0.25,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 6,
    startLat: 48.8,
    startLng: 2.3,
    endLat: 52.5,
    endLng: 13.4,
    arcAlt: 0.12,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 7,
    startLat: 52.5,
    startLng: 13.4,
    endLat: 37.7,
    endLng: -122.4,
    arcAlt: 0.22,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 8,
    startLat: 37.7,
    startLng: -122.4,
    endLat: 22.3,
    endLng: 114.2,
    arcAlt: 0.28,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 9,
    startLat: 22.3,
    startLng: 114.2,
    endLat: 40,
    endLng: -95,
    arcAlt: 0.2,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 10,
    startLat: 35.6,
    startLng: 139.6,
    endLat: -37.8,
    endLng: 144.9,
    arcAlt: 0.19,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 11,
    startLat: 19.4,
    startLng: -99.1,
    endLat: 43.6,
    endLng: 7.0,
    arcAlt: 0.23,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 12,
    startLat: 43.6,
    startLng: 7.0,
    endLat: 55.7,
    endLng: 37.6,
    arcAlt: 0.17,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 13,
    startLat: 55.7,
    startLng: 37.6,
    endLat: 31.2,
    endLng: 30.6,
    arcAlt: 0.21,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 14,
    startLat: 31.2,
    startLng: 30.6,
    endLat: 25.2,
    endLng: 55.3,
    arcAlt: 0.24,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 15,
    startLat: 25.2,
    startLng: 55.3,
    endLat: 28.6,
    endLng: 77.2,
    arcAlt: 0.16,
    color: "rgba(255, 122, 24, 0.6)",
  },
];

const getGlobeConfig = (isDark: boolean) => ({
  pointSize: 1,
  globeColor: isDark ? "#0a1e3d" : "#4a9fd8",
  showAtmosphere: true,
  atmosphereColor: isDark ? "#e0f2fe" : "#7ec8e3",
  atmosphereAltitude: 0.15,
  emissive: isDark ? "#001a3d" : "#2d6fa3",
  emissiveIntensity: isDark ? 0.15 : 0.1,
  shininess: 1.0,
  polygonColor: isDark
    ? "rgba(148, 197, 255, 0.5)"
    : "rgba(100, 180, 220, 0.45)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: isDark ? "#60a5fa" : "#3b82d6",
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
});

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [globeConfig, setGlobeConfig] = useState(getGlobeConfig(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const isDark = theme === "dark";
      setGlobeConfig(getGlobeConfig(isDark));
    }
  }, [theme, mounted]);

  const dataPoints = [
    { value: 400, suffix: "+", label: "PROJECTS SUCCESSFULLY COMPLETED" },
    { value: 85, suffix: "GW", label: "POWER HANDLED (GIGAWATT)" },
    {
      value: 15,
      suffix: "+",
      label: "INTERNATIONAL INDUSTRY LEADERS AS PARTNERS",
    },
    { value: 20, suffix: "+", label: "YEARS IN RENEWABLES SECTOR" },
    { value: 17, suffix: "+", label: "GRID CODES COMPLIANT" },
  ];

  return (
    <section
      className="
        relative min-h-screen h-full px-4 sm:px-6 pt-28 sm:pt-36 md:pt-48 
        bg-white/70 dark:bg-black/70 backdrop-blur-md
        overflow-hidden flex flex-col justify-start
      "
    >
      {/* Globe positioned on the right */}
      <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none hidden lg:block -mr-[200px] z-30">
        <div className="w-full h-full">
          {mounted && (
            <World key={theme} globeConfig={globeConfig} data={sampleArcs} />
          )}
        </div>
      </div>

      <div className="max-w-7xl ml-48 flex flex-col items-start text-left space-y-6 sm:space-y-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-6xl font-medium leading-18
            text-gray-900 dark:text-gray-100
            max-w-4xl
          "
        >
          <span>The Only Platform You Need For Renewable Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="
            max-w-2xl text-2xl font-sans leading-relaxed
            text-gray-600 dark:text-gray-400
          "
        >
          Optimise renewable assets, ensure compliance, and streamline grid
          access, all on one platform with - Solvyn
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="
            flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6
            w-full sm:w-auto
          "
        >
          <ShimmerButton
            onClick={() => {
              const footer = document.getElementById("footer");
              footer?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-sans px-6 py-3 font-bold text-white"
            background="#ff7a18"
            shimmerColor="#ffffff"
          >
            CONNECT NOW
          </ShimmerButton>
        </motion.div>
      </div>

      {/* Data Points Section */}
      <div className="max-w-7xl w-full mx-auto px-4 mt-48 relative z-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12">
          {dataPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-start text-left"
            >
              <div className="font-mono text-gray-900 dark:text-white text-5xl lg:text-4xl font-bold mb-4 flex items-baseline justify-center gap-1">
                <NumberTicker
                  value={point.value}
                  className="text-gray-900 dark:text-white"
                />
                <span>{point.suffix}</span>
              </div>
              <p className="font-mono text-left text-gray-600 dark:text-gray-400 text-sm lg:text-sm uppercase tracking-wide leading-tight">
                {point.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
