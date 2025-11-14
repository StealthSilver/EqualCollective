"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type { GlobeConfig } from "./Globe";
import { useLoadingContext } from "./ClientWrapper";

const World = dynamic(() => import("./Globe").then((mod) => ({ default: mod.World })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface LazyGlobeProps {
  globeConfig: GlobeConfig;
  data: Array<{
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
  }>;
  onLoad?: () => void;
}

export function LazyGlobe({ globeConfig, data, onLoad }: LazyGlobeProps) {
  const hasLoaded = useRef(false);
  const { registerComponent, markComponentLoaded } = useLoadingContext();
  const componentName = "globe";

  useEffect(() => {
    registerComponent(componentName);
  }, [registerComponent]);

  useEffect(() => {
    if (!hasLoaded.current) {
      // Mark as loaded quickly - don't wait for full WebGL initialization
      // The component will continue loading in the background
      const timer = setTimeout(() => {
        hasLoaded.current = true;
        markComponentLoaded(componentName);
        onLoad?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [markComponentLoaded, onLoad]);

  return <World globeConfig={globeConfig} data={data} />;
}

