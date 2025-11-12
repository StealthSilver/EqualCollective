"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

// 🌙 Updated dark mode configuration
const getGlobeConfigByTheme = (isDark: boolean): COBEOptions => {
  if (isDark) {
    return {
      ...GLOBE_CONFIG,
      // Refined dark blue-black theme with soft atmosphere
      baseColor: [5 / 255, 10 / 255, 25 / 255], // #050a19 — deep blue-black
      markerColor: [173 / 255, 216 / 255, 255 / 255], // #add8ff — light blue for coordinates
      glowColor: [200 / 255, 230 / 255, 255 / 255], // #c8e6ff — soft, diffused glow
      diffuse: 0.4,
      emissive: [0 / 255, 20 / 255, 40 / 255], // #001428 — subtle blue emissive tint
      emissiveIntensity: 0.7,
      shininess: 1.0,
      polygonColor: [148 / 255, 197 / 255, 255 / 255], // rgba(148,197,255,0.5)
    };
  }
  return GLOBE_CONFIG;
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const phiRef = useRef(0);
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const globeConfig = getGlobeConfigByTheme(isDark);

  // Monitor theme changes
  useEffect(() => {
    setMounted(true);

    // Initial theme check
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    // Watch for class changes on <html>
    const observer = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const updatePointerInteraction = useCallback((value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  }, []);

  const updateMovement = useCallback(
    (clientX: number) => {
      if (pointerInteracting.current !== null) {
        const delta = clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta;
        r.set(r.get() + delta / MOVEMENT_DAMPING);
      }
    },
    [r]
  );

  // Create globe when theme changes
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    // Destroy previous globe
    if (globeRef.current) {
      globeRef.current.destroy();
      globeRef.current = null;
    }

    // Smooth fade-in
    if (canvasRef.current) {
      canvasRef.current.style.opacity = "0";
    }

    const globe = createGlobe(canvasRef.current, {
      ...globeConfig,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi = phiRef.current + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    globeRef.current = globe;

    const fadeInTimer = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 50);

    return () => {
      clearTimeout(fadeInTimer);
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      window.removeEventListener("resize", onResize);
    };
  }, [rs, globeConfig, isDark, mounted]);

  return (
    <div
      className={cn(
        "absolute -right-72 top-68 -translate-y-1/2 aspect-square w-[1100px] pointer-events-auto",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
