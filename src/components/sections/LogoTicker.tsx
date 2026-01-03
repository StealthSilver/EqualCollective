"use client";

import logo7 from "@/assets/Equal Collective/7.png";
import logo8 from "@/assets/Equal Collective/8.png";
import logo9 from "@/assets/Equal Collective/9.png";
import logo10 from "@/assets/Equal Collective/10.png";
import logo11 from "@/assets/Equal Collective/11.png";
import logo12 from "@/assets/Equal Collective/12.png";
import brandBuddy from "@/assets/Equal Collective/brandbuddy.png";
import titan from "@/assets/Equal Collective/titan.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const logos = [logo7, logo8, logo9, logo10, logo11, logo12, brandBuddy, titan];

export const LogoTicker = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-4 sm:py-5 lg:py-6 mt-6 sm:mt-8 lg:mt-12 mb-2 sm:mb-4 md:mb-8 lg:mb-12 bg-transparent relative z-10">
      <div className="container mx-auto px-4">
        <div
          className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)] justify-center pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-8 sm:gap-12 lg:gap-20 flex-none"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
              ...(isHovered && { duration: 0 }),
            }}
          >
            {logos
              .concat(logos)
              .concat(logos)
              .map((logo, index) => (
                <Image
                  key={index}
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="logo-ticker-image h-10 sm:h-12 lg:h-16 cursor-pointer flex-shrink-0"
                  width={180}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
