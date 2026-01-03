"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import logo from "@/assets/Equal Collective/logo.webp";

export const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/equal-collective/",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden bg-white/70 dark:bg-black/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-800"
    >
      {/* Top Section - Logo and Social Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 lg:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <Link href="/" className="cursor-pointer block">
              {mounted && (
                <motion.img
                  src={logo.src}
                  alt="EqualCollective logo"
                  className="w-28 h-auto sm:w-32 md:w-36"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 sm:gap-3"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.target}
                rel={social.rel}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                aria-label={social.name}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Copyright Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-sans text-center">
            © Branchon Info Solutions Private Limited 2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
