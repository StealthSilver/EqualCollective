"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

export default function NotFound() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <section
      className="
        relative min-h-screen px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 lg:pt-32 
        overflow-hidden flex flex-col justify-center items-center mx-auto pb-8 sm:pb-12 md:pb-16
      "
      style={
        mounted && !isDarkMode
          ? {
              backgroundImage:
                "radial-gradient(circle at center top, rgba(147, 197, 253, 0.2) 0%, rgba(165, 205, 255, 0.15) 25%, rgba(186, 220, 255, 0.1) 50%, rgba(219, 234, 255, 0.05) 75%, rgba(255, 255, 255, 0) 100%)",
              backgroundAttachment: "fixed",
            }
          : {}
      }
    >
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6 sm:space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 dark:text-gray-100">
            Page Not Found
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl"
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 sm:mt-6"
        >
          <Link href="/">
            <ShimmerButton
              className="font-sans px-6 sm:px-8 py-2 sm:py-3 font-bold text-white text-sm sm:text-base"
              background="#3B82F6"
              shimmerColor="#ffffff"
            >
              GO HOME
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
