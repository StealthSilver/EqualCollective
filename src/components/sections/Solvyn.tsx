"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconState, Points } from "../../types/solvynTypes";
import {
  TaxIcon,
  ClimateIcon,
  TreasuryIcon,
  ElementsIcon,
  PaymentsIcon,
  WindmillIcon,
  SolarPanelIcon,
  BatteryIcon,
  ForecastingSchedulingIcon,
  TradingDeckIcon,
  ReportingIcon,
  BidOptimizationIcon,
} from "../ui/SolvynIcons";
import { SolvynIconNode } from "../ui/SolvynIconNode";
import { SolvynBeams } from "../ui/SolvynBeams";
import { useSolvynAnimation } from "../../hooks/useSolvynAnimation";

const ICON_CONFIG = [
  { id: "tax" as const, label: "Merchant Services", component: TaxIcon },
  { id: "climate" as const, label: "Energy Portfolio Management", component: ClimateIcon },
  { id: "treasury" as const, label: "Ancillary Services", component: TreasuryIcon },
  { id: "elements" as const, label: "Work Order Management", component: ElementsIcon },
  { id: "payments" as const, label: "Grid Code Adherence", component: PaymentsIcon },
  { id: "windmill" as const, label: "Wind", component: WindmillIcon },
  { id: "solar" as const, label: "Solar", component: SolarPanelIcon },
  { id: "battery" as const, label: "BESS", component: BatteryIcon },
  { id: "forecasting" as const, label: "Forecasting and Scheduling", component: ForecastingSchedulingIcon },
  { id: "trading" as const, label: "Trading Desk", component: TradingDeckIcon },
  { id: "reporting" as const, label: "Smart Analytics & Reporting", component: ReportingIcon },
  { id: "bidopt" as const, label: "Bid Optimization", component: BidOptimizationIcon },
];

// Desktop positions: Uniformly spaced grid - 6 icons on left, 6 on right
// Order: tax, climate, treasury, elements, payments, windmill, solar, battery, forecasting, trading, reporting, bidopt
// Increased vertical spacing with ~16% gaps: ~5%, ~21%, ~37%, ~53%, ~69%, ~85%
const ICON_POSITIONS_DESKTOP = [
  // LEFT SIDE - Row 1 (top)
  { top: "5%", left: "3%", delay: 0.6, borderColor: "orange" as const },
  // RIGHT SIDE - Row 1 (top)
  { top: "5%", right: "3%", delay: 0.7, borderColor: "orange" as const },
  // LEFT SIDE - Row 2
  { top: "21%", left: "3%", delay: 0.8, borderColor: "purple" as const },
  // RIGHT SIDE - Row 2
  { top: "21%", right: "3%", delay: 1.0, borderColor: "purple" as const },
  // LEFT SIDE - Row 3
  { top: "37%", left: "3%", delay: 1.1, borderColor: "orange" as const },
  // RIGHT SIDE - Row 3
  { top: "37%", right: "5%", delay: 1.2, borderColor: "purple" as const },
  // LEFT SIDE - Row 4
  { top: "53%", left: "5%", delay: 1.3, borderColor: "orange" as const },
  // RIGHT SIDE - Row 4
  { top: "53%", right: "5%", delay: 1.4, borderColor: "purple" as const },
  // LEFT SIDE - Row 5
  { top: "69%", left: "3%", delay: 1.5, borderColor: "orange" as const },
  // RIGHT SIDE - Row 5
  { top: "69%", right: "4%", delay: 1.6, borderColor: "purple" as const },
  // LEFT SIDE - Row 6 (bottom)
  { top: "85%", left: "3%", delay: 1.7, borderColor: "orange" as const },
  // RIGHT SIDE - Row 6 (bottom)
  { top: "85%", right: "3%", delay: 1.8, borderColor: "purple" as const },
];

// Mobile/Tablet positions: Uniformly spaced grid for smaller screens
// 6 rows evenly spaced with increased gaps: ~5%, ~18%, ~31%, ~44%, ~57%, ~70%, ~83%
const ICON_POSITIONS_MOBILE = [
  // Row 1 - left side
  { top: "5%", left: "2%", delay: 0.6, borderColor: "orange" as const },
  // Row 1 - right side
  { top: "5%", right: "2%", delay: 0.7, borderColor: "orange" as const },
  // Row 2 - left side
  { top: "18%", left: "2%", delay: 0.8, borderColor: "purple" as const },
  // Row 2 - right side
  { top: "18%", right: "2%", delay: 1.0, borderColor: "purple" as const },
  // Row 3 - left side
  { top: "31%", left: "2%", delay: 1.1, borderColor: "orange" as const },
  // Row 3 - right side
  { top: "31%", right: "2%", delay: 1.2, borderColor: "purple" as const },
  // Row 4 - left side
  { top: "44%", left: "2%", delay: 1.3, borderColor: "orange" as const },
  // Row 4 - right side
  { top: "44%", right: "2%", delay: 1.4, borderColor: "purple" as const },
  // Row 5 - left side
  { top: "57%", left: "2%", delay: 1.5, borderColor: "orange" as const },
  // Row 5 - right side
  { top: "57%", right: "2%", delay: 1.6, borderColor: "purple" as const },
  // Row 6 - left side
  { top: "70%", left: "2%", delay: 1.7, borderColor: "orange" as const },
  // Row 6 - right side
  { top: "70%", right: "2%", delay: 1.8, borderColor: "purple" as const },
];

export const Solvyn: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sgridsRef = useRef<HTMLDivElement | null>(null);

  // Screen size detection for responsive layout
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // sm breakpoint
      setIsTablet(width >= 640 && width < 1024); // md-lg breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Create refs for all icons - must be at top level, not in useMemo
  const iconRefsRef = useRef<React.RefObject<HTMLDivElement | null>[]>(
    ICON_CONFIG.map(() => React.createRef<HTMLDivElement | null>())
  );
  const iconRefs = iconRefsRef.current;

  const [icons, setIcons] = useState<IconState[]>(
    ICON_CONFIG.map((config, idx) => ({
      id: config.id,
      label: config.label,
      ref: iconRefs[idx],
      active: false,
    }))
  );

  const [points, setPoints] = useState<Points | null>(null);

  // Select positions based on screen size
  const ICON_POSITIONS = isMobile || isTablet ? ICON_POSITIONS_MOBILE : ICON_POSITIONS_DESKTOP;

  const pathRefs = useRef<SVGPathElement[]>([]);
  const beamRefs = useRef<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>(
    Array.from({ length: 12 }, () => ({ circle: null, core: null, pulse: null }))
  );
  const progressRefs = useRef<number[]>([
    0, 0.091, 0.182, 0.273, 0.364, 0.455, 0.545, 0.636, 0.727, 0.818, 0.909, 1.0,
  ]);

  // Measure positions - use useCallback to prevent recreation
  const measure = useCallback(() => {
      const container = containerRef.current;
      const sgridsEl = sgridsRef.current;
      if (!container || !sgridsEl) return;

      const containerRect = container.getBoundingClientRect();
      const sgridsRect = sgridsEl.getBoundingClientRect();

      const origin = {
        x: sgridsRect.left + sgridsRect.width / 2 - containerRect.left,
        y: sgridsRect.top + sgridsRect.height / 2 - containerRect.top,
      };

      const targets: { x: number; y: number }[] = [];

    for (const ref of iconRefs) {
      const el = ref.current;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        targets.push({
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        });
      }

    if (targets.length === 12) {
      setPoints((prevPoints) => {
        // Only update if points actually changed
        const prevStr = JSON.stringify(prevPoints);
        const newPoints = { origin, targets };
        const newStr = JSON.stringify(newPoints);
        if (prevStr === newStr) return prevPoints;
        return newPoints;
      });
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const id = setTimeout(measure, 300);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(id);
    };
  }, [measure, isMobile, isTablet]);

  // Animation hook
  useSolvynAnimation({
    points,
    pathRefs,
    beamRefs,
    progressRefs,
    setIcons,
  });

  return (
    <section id="solvyn"
      ref={sectionRef}
      className="relative w-full lg:min-h-screen py-4 sm:py-8 md:py-12 lg:py-20 overflow-hidden bg-white dark:bg-black transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* SOLVYN Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-2 sm:mb-4 md:mb-6 lg:mb-8"
          >
            <p className="text-center text-gray-500 dark:text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-4 md:mb-6 lg:mb-8 font-sans">
              Solvyn
            </p>
          </motion.div>

          {/* Centered Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 text-center max-w-4xl"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
            >
              Innovation With Purpose
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              Innovation is our engine, purpose is our compass, and experience is the ground we stand on.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              <span className="font-semibold text-orange-600 dark:text-orange-400">Solvyn</span> was built
              for the complexity of renewable energy — to turn scattered data into unified intelligence
              across every layer of operations, from the control room to the boardroom.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-base text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              More than a platform, Solvyn is a new way of running energy: a secure, AI-driven system that
              unifies <span className="font-semibold">SCADA</span>, <span className="font-semibold">EMS</span>
              , <span className="font-semibold">PPC</span>, <span className="font-semibold">EPM</span>, and{" "}
              <span className="font-semibold">Intelligent Bidding (IB)</span>. It's designed for{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">solar</span>,{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">wind</span>,{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">BESS</span>,{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">hybrid</span>, and{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">green hydrogen</span>, and
              built to serve those who carry the responsibility of the transition — operators seeking
              reliability, investors seeking returns, and governments driving national clean energy goals.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-relaxed"
            >
              Where others give you fragments, Solvyn gives you the whole picture — automation that scales,
              compliance that's built in, and intelligence that's always one step ahead.
            </motion.p>
            </motion.div>

          {/* Centered Animation Container */}
          <div className="w-full max-w-5xl">
            <motion.div
            ref={containerRef}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center w-full"
              style={{ 
                height: isMobile ? "100vh" : isTablet ? "100vh" : "90vh", 
                maxHeight: isMobile ? "700px" : isTablet ? "850px" : "900px",
                minHeight: isMobile ? "600px" : isTablet ? "700px" : "700px"
              }}
          >
            {/* Center SGrids Logo */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                }}
                viewport={{ once: true }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 sm:gap-3"
              >
              <div
                ref={sgridsRef}
                  className={`relative rounded-2xl bg-gradient-to-br from-orange-500 via-purple-600 to-orange-500 p-[2px] shadow-2xl hover:shadow-orange-500/50 dark:hover:shadow-orange-500/70 transition-all duration-500 group ${
                    isMobile ? "w-12 h-12 sm:w-16 sm:h-16" : isTablet ? "w-16 h-16 md:w-20 md:h-20" : "w-20 h-20 md:w-24 md:h-24"
                  }`}
              >
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center backdrop-blur-sm p-2 sm:p-3">
                    <Image
                  alt="SGrids Logo"
                      width={isMobile ? 40 : isTablet ? 60 : 80}
                      height={isMobile ? 40 : isTablet ? 60 : 80}
                  src="/sgrids.svg"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
                {/* Solvyn text box */}
                <div className={`rounded-lg bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-950/30 dark:to-purple-950/30 border-2 border-orange-500/30 dark:border-orange-500/50 shadow-lg ${
                  isMobile ? "px-2 py-1" : "px-4 py-2"
                }`}>
                  <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-purple-600 dark:from-orange-400 dark:to-purple-400 ${
                    isMobile ? "text-sm" : "text-lg"
                  }`}>
                    Solvyn
                </span>
            </div>
              </motion.div>

              {/* Icon Nodes */}
              {icons.map((icon, idx) => {
                const config = ICON_CONFIG[idx];
                const positionData = ICON_POSITIONS[idx];
                const IconComponent = config.component;
                
                // Extract only positioning properties for the position prop
                const { delay, borderColor, ...position } = positionData;
                
                // Calculate SVG icon size based on screen size
                const svgIconSize = isMobile ? 16 : isTablet ? 20 : 36;

                return (
                  <SolvynIconNode
                    key={icon.id}
                    icon={icon}
                    iconComponent={<IconComponent active={icon.active} size={svgIconSize} />}
                    position={position}
                    animationDelay={delay}
                    borderColor={borderColor}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                );
              })}

              {/* SVG Lines and Animated Beams */}
              <SolvynBeams
                points={points}
                containerRef={containerRef}
                pathRefs={pathRefs}
                beamRefs={beamRefs}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solvyn;
