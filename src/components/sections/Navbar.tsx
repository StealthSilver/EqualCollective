"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "../ui/ThemeToggle";
import { ShimmerButton } from "../ui/ShimmerButton";
import logo from "@/assets/Equal Collective/logo.webp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string | undefined>();

  useEffect(() => {
    setMounted(true);

    // Set initial theme based on document element class
    const isDark = document.documentElement.classList.contains("dark");
    setCurrentTheme(isDark ? "dark" : "light");

    // Listen to class changes on document element
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setCurrentTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsOpen((v) => !v);

  const navItems = [
    { name: "About Us", href: "/#about", external: false },
    { name: "Services", href: "/#services", external: false },
    { name: "Contact Us", href: "/#footer", external: false },
  ];

  return (
    <nav
      className="
        relative w-full sticky top-0 z-50
        border-b border-gray-200 dark:border-gray-800
        bg-white/50 dark:bg-black/50 backdrop-blur-sm
        transition-colors duration-300
      "
    >
      <div className="flex items-center justify-center w-full px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        {/* Left: logo */}
        <div className="absolute left-0 px-40">
          <Link href="/" className="flex items-center cursor-pointer z-10">
            <motion.img
              src={logo.src}
              alt="EqualCollective logo"
              className="w-24 h-auto sm:w-28 md:w-32 lg:w-36"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>

        {/* Center: nav items */}
        <div
          className="hidden lg:flex items-center px-4 xl:px-8 font-mono relative gap-2 xl:gap-4"
          onMouseLeave={() => setHovered(null)}
        >
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative px-3 py-1 select-none font-sans font-semibold"
            >
              {hovered === item.name && (
                <motion.span
                  layoutId="hoverBg"
                  className="
                      absolute inset-0 rounded-full backdrop-blur-sm
                      bg-gray-200/70 border border-gray-300
                      dark:bg-gray-700/70 dark:border-gray-600
                    "
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 40,
                    mass: 0.6,
                  }}
                  initial={false}
                />
              )}

              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(item.name)}
                  onFocus={() => setHovered(item.name)}
                  className="
                      relative z-10 transition-colors text-sm
                      text-gray-700 hover:text-black
                      dark:text-gray-300 dark:hover:text-white
                    "
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  href={item.href}
                  onMouseEnter={() => setHovered(item.name)}
                  onFocus={() => setHovered(item.name)}
                  className="
                      relative z-10 transition-colors text-sm
                      text-gray-700 hover:text-black
                      dark:text-gray-300 dark:hover:text-white
                    "
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 font-mono z-10 absolute right-0 px-[120px]">
          <ThemeToggle />

          <ShimmerButton
            onClick={() => {
              window.open("https://cal.com/aryan-sethi-zafoth/30min", "_blank");
            }}
            className="font-sans font-bold text-white text-xs xl:text-sm px-4 xl:px-6"
            background="#3B82F6"
            shimmerColor="#ffffff"
          >
            BOOK A CALL
          </ShimmerButton>
        </div>

        {/* Tablet/Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2 sm:gap-3">
          <div className="scale-90 cursor-pointer">
            <ThemeToggle />
          </div>

          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="p-1.5 rounded-md"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 z-50">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 py-6 sm:py-8">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-sm text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="transition-colors text-sm text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <ShimmerButton
              onClick={() => {
                setIsOpen(false);
                window.open(
                  "https://cal.com/aryan-sethi-zafoth/30min",
                  "_blank"
                );
              }}
              className="font-sans font-bold text-white text-sm px-6 py-2.5 mt-2"
              background="#3B82F6"
              shimmerColor="#ffffff"
            >
              BOOK A CALL
            </ShimmerButton>
          </div>
        </div>
      )}
    </nav>
  );
}
