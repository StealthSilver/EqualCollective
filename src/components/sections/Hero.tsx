"use client";

import { motion } from "framer-motion";
import { ShimmerButton } from "../ui/ShimmerButton";

export default function Hero() {
  return (
    <section
      className="
        relative px-4 sm:px-6 pt-28 sm:pt-36 md:pt-48 
        bg-white/70 dark:bg-black/70 backdrop-blur-md
        overflow-x-hidden
      "
    >
      <div className="max-w-7xl mx-auto flex flex-col items-start text-left space-y-6 sm:space-y-8">
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
