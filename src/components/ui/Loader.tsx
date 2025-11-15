"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-br from-black via-gray-950 to-black"
            : "bg-gradient-to-br from-white via-gray-50 to-white"
        }`}
      >
        {/* Animated mesh gradient overlay */}
        <div
          className={`absolute inset-0 opacity-30 transition-opacity duration-500 ${
            isDark
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"
          }`}
          style={{
            animation: "loader-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Loader image with glow effect */}
        <div className="relative">
          {/* Glow ring */}
          <div
            className={`absolute rounded-full blur-2xl transition-all duration-500 ${
              isDark ? "bg-blue-500/20" : "bg-blue-500/10"
            }`}
            style={{
              width: "120%",
              height: "120%",
              top: "-10%",
              left: "-10%",
              animation: "loader-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          
          {/* Loader image */}
          <div className="relative">
            <img
              src="/loader-video-unscreen.gif"
              alt="Loading"
              className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8">
          <p
            className={`text-sm md:text-base font-medium transition-colors duration-500 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Loading ...
          </p>
        </div>
      </div>
    </div>
  );
}
