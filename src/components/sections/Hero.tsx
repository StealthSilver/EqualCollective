"use client";

import { motion } from "framer-motion";
import { ShimmerButton } from "../ui/ShimmerButton";
import { World } from "../ui/Globe";

const sampleArcs = [
  {
    order: 1,
    startLat: 40,
    startLng: -95,
    endLat: 36,
    endLng: 139,
    arcAlt: 0.1,
    color: "#2563eb",
  },
  {
    order: 2,
    startLat: 51.5,
    startLng: -0.1,
    endLat: 35.6,
    endLng: 139.6,
    arcAlt: 0.2,
    color: "#3b82f6",
  },
  {
    order: 3,
    startLat: 35.6,
    startLng: 139.6,
    endLat: -33.8,
    endLng: 151.2,
    arcAlt: 0.15,
    color: "#2563eb",
  },
  {
    order: 4,
    startLat: -33.8,
    startLng: 151.2,
    endLat: 1.3,
    endLng: 103.8,
    arcAlt: 0.18,
    color: "#1d4ed8",
  },
  {
    order: 5,
    startLat: 1.3,
    startLng: 103.8,
    endLat: 40.7,
    endLng: -74.0,
    arcAlt: 0.25,
    color: "#3b82f6",
  },
  {
    order: 6,
    startLat: 48.8,
    startLng: 2.3,
    endLat: 52.5,
    endLng: 13.4,
    arcAlt: 0.12,
    color: "#2563eb",
  },
  {
    order: 7,
    startLat: 52.5,
    startLng: 13.4,
    endLat: 37.7,
    endLng: -122.4,
    arcAlt: 0.22,
    color: "#1d4ed8",
  },
  {
    order: 8,
    startLat: 37.7,
    startLng: -122.4,
    endLat: 22.3,
    endLng: 114.2,
    arcAlt: 0.28,
    color: "#3b82f6",
  },
  {
    order: 9,
    startLat: 22.3,
    startLng: 114.2,
    endLat: 40,
    endLng: -95,
    arcAlt: 0.2,
    color: "#2563eb",
  },
  {
    order: 10,
    startLat: 35.6,
    startLng: 139.6,
    endLat: -37.8,
    endLng: 144.9,
    arcAlt: 0.19,
    color: "#1d4ed8",
  },
];

const globeConfig = {
  pointSize: 1,
  globeColor: "#0c2e5e",
  showAtmosphere: true,
  atmosphereColor: "#e0f2fe",
  atmosphereAltitude: 0.15,
  emissive: "#001a3d",
  emissiveIntensity: 0.15,
  shininess: 1.0,
  polygonColor: "rgba(148, 197, 255, 0.5)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#60a5fa",
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

export default function Hero() {
  return (
    <section
      className="
        relative min-h-screen h-full px-4 sm:px-6 pt-28 sm:pt-36 md:pt-48 
        bg-white/70 dark:bg-black/70 backdrop-blur-md
        overflow-hidden flex flex-col justify-start
      "
    >
      {/* Globe positioned on the right */}
      <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none hidden lg:block -mr-[200px]">
        <div className="w-full h-full">
          <World globeConfig={globeConfig} data={sampleArcs} />
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
            className="font-sans px-10 py-3 font-bold text-white text-l"
            background="#ff7a18"
            shimmerColor="#ffffff"
          >
            CONNECT NOW
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  );
}
