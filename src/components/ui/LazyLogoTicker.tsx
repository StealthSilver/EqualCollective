"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useLoadingContext } from "./ClientWrapper";

const LogoTicker = dynamic(() => import("../sections/LogoTicker").then((mod) => ({ default: mod.LogoTicker })), {
  ssr: false,
  loading: () => (
    <div className="py-4 sm:py-5 lg:py-6 mt-6 sm:mt-8 lg:mt-12 mb-6 sm:mb-8 lg:mb-12 bg-transparent relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  ),
});

interface LazyLogoTickerProps {
  onLoad?: () => void;
}

export function LazyLogoTicker({ onLoad }: LazyLogoTickerProps) {
  const hasLoaded = useRef(false);
  const { registerComponent, markComponentLoaded } = useLoadingContext();
  const componentName = "logoTicker";

  useEffect(() => {
    registerComponent(componentName);
  }, [registerComponent]);

  useEffect(() => {
    if (!hasLoaded.current) {
      // Mark as loaded quickly - images will load in background
      const timer = setTimeout(() => {
        hasLoaded.current = true;
        markComponentLoaded(componentName);
        onLoad?.();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [markComponentLoaded, onLoad]);

  return <LogoTicker />;
}

