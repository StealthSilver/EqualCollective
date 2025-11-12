"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <div className="relative flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-64 h-64 md:w-96 md:h-96 object-contain"
        >
          <source src="/loader_video.mp4" type="video/mp4" />
        </video>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
          className="absolute text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mt-120"
        >
          Loading...
        </motion.h1>
      </div>
    </div>
  );
}
