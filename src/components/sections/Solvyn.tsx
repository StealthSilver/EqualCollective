"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconState, Points } from "../ui/solvynTypes";
import {
  TaxIcon,
  ClimateIcon,
  TreasuryIcon,
  AtlasIcon,
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
import { useSolvynAnimation } from "../ui/useSolvynAnimation";

const ICON_CONFIG = [
  { id: "tax" as const, label: "Merchant Services", component: TaxIcon },
  { id: "climate" as const, label: "EMS", component: ClimateIcon },
  { id: "treasury" as const, label: "Ancillary Services", component: TreasuryIcon },
  { id: "atlas" as const, label: "EPM", component: AtlasIcon },
  { id: "elements" as const, label: "Work Order Management", component: ElementsIcon },
  { id: "payments" as const, label: "Grid Code Adherence", component: PaymentsIcon },
  { id: "windmill" as const, label: "Wind", component: WindmillIcon },
  { id: "solar" as const, label: "Solar", component: SolarPanelIcon },
  { id: "battery" as const, label: "BESS", component: BatteryIcon },
  { id: "forecasting" as const, label: "Forecasting", component: ForecastingSchedulingIcon },
  { id: "trading" as const, label: "Trading", component: TradingDeckIcon },
  { id: "reporting" as const, label: "Reporting", component: ReportingIcon },
  { id: "bidopt" as const, label: "Bid Optimization", component: BidOptimizationIcon },
];

// Better spaced positions: Left side groups, Right side equally spaced
// Order: tax, climate, treasury, atlas, elements, payments, windmill, solar, battery, forecasting, trading, reporting, bidopt
// Maximum vertical spacing between icons to prevent overlap and ensure labels are clearly visible
const ICON_POSITIONS = [
  // LEFT SIDE UPPER GROUP - Merchant Services (tax)
  { top: "0.5%", left: "0.5%", delay: 0.6, borderColor: "orange" as const },
  // RIGHT SIDE - EMS (climate) - equally spaced #1
  { top: "0.5%", right: "0.5%", delay: 0.7, borderColor: "orange" as const },
  // LEFT SIDE UPPER GROUP - Ancillary Services (treasury)
  { top: "22%", left: "0.5%", delay: 0.8, borderColor: "purple" as const },
  // RIGHT SIDE - EPM (atlas) - equally spaced #2
  { top: "15%", right: "0.5%", delay: 0.9, borderColor: "orange" as const },
  // RIGHT SIDE - Work Order Management (elements) - equally spaced #3
  { top: "29.5%", right: "0.5%", delay: 1.0, borderColor: "purple" as const },
  // LEFT SIDE UPPER GROUP - Grid Code Adherence (payments)
  { top: "30.5%", left: "4.5%", delay: 1.1, borderColor: "orange" as const },
  // LEFT SIDE LOWER GROUP - Wind (windmill)
  { bottom: "40%", left: "0.5%", delay: 1.2, borderColor: "purple" as const },
  // LEFT SIDE LOWER GROUP - Solar
  { bottom: "26%", left: "0.5%", delay: 1.3, borderColor: "orange" as const },
  // LEFT SIDE LOWER GROUP - BESS (battery)
  { bottom: "12%", left: "0.5%", delay: 1.4, borderColor: "purple" as const },
  // RIGHT SIDE - Forecasting - equally spaced #4
  { top: "44%", right: "0.5%", delay: 1.5, borderColor: "orange" as const },
  // RIGHT SIDE - Trading - equally spaced #5
  { top: "57%", right: "0.5%", delay: 1.6, borderColor: "purple" as const },
  // RIGHT SIDE - Reporting - equally spaced #6
  { top: "70%", right: "0.5%", delay: 1.7, borderColor: "orange" as const },
  // RIGHT SIDE - Bid Optimization - equally spaced #7
  { top: "83%", right: "0.5%", delay: 1.8, borderColor: "purple" as const },
];

export const Solvyn: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sgridsRef = useRef<HTMLDivElement | null>(null);

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

  const pathRefs = useRef<SVGPathElement[]>([]);
  const beamRefs = useRef<{ circle: SVGCircleElement | null; core: SVGCircleElement | null }[]>(
    Array.from({ length: 13 }, () => ({ circle: null, core: null }))
  );
  const progressRefs = useRef<number[]>([
    0, 0.077, 0.154, 0.231, 0.308, 0.385, 0.462, 0.539, 0.616, 0.693, 0.770, 0.847, 0.924,
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

    if (targets.length === 13) {
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
  }, [measure]);

  // Animation hook
  useSolvynAnimation({
    points,
    pathRefs,
    beamRefs,
    progressRefs,
    setIcons,
  });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 overflow-hidden bg-white dark:bg-black transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-10">
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
              style={{ height: "90vh", maxHeight: "900px" }}
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
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3"
              >
              <div
                ref={sgridsRef}
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-orange-500 via-purple-600 to-orange-500 p-[2px] shadow-2xl hover:shadow-orange-500/50 dark:hover:shadow-orange-500/70 transition-all duration-500 group"
              >
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center p-3 backdrop-blur-sm">
                    <Image
                  alt="SGrids Logo"
                      width={80}
                      height={80}
                  src="/sgrids.svg"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
                {/* Solvyn text box */}
                <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-950/30 dark:to-purple-950/30 border-2 border-orange-500/30 dark:border-orange-500/50 shadow-lg">
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-purple-600 dark:from-orange-400 dark:to-purple-400">
                    Solvyn
                </span>
            </div>
              </motion.div>

              {/* Icon Nodes */}
              {icons.map((icon, idx) => {
                const config = ICON_CONFIG[idx];
                const position = ICON_POSITIONS[idx];
                const IconComponent = config.component;

                return (
                  <SolvynIconNode
                    key={icon.id}
                    icon={icon}
                    iconComponent={<IconComponent active={icon.active} />}
                    position={position}
                    animationDelay={position.delay}
                    borderColor={position.borderColor}
                  />
                );
              })}

              {/* SVG Lines and Animated Beams */}
              <SolvynBeams
                points={points}
                containerRef={containerRef}
                pathRefs={pathRefs}
                beamRefs={beamRefs}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solvyn;
