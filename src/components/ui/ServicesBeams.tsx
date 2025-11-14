import React, { useState, useEffect } from "react";
import { Points } from "../../types/solvynTypes";
import { createLinearPath } from "../../lib/solvynUtils";

type ServicesBeamsProps = {
  points: Points | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null }[]>;
  isMobile?: boolean;
  isTablet?: boolean;
};

export const ServicesBeams: React.FC<ServicesBeamsProps> = ({
  points,
  containerRef,
  pathRefs,
  beamRefs,
  isMobile = false,
  isTablet = false,
}) => {
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 });
  
  // Responsive stroke widths
  const baseStrokeWidth = isMobile ? 1.5 : isTablet ? 2 : 2.5;
  const beamStrokeWidth = isMobile ? "2" : isTablet ? "3" : "4";
  const coreStrokeWidth = isMobile ? "1" : isTablet ? "1.5" : "2";

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    // Update when points change (icons might have moved)
    const timeoutId = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [containerRef, points]);

  if (!points) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="servicesSoftGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {points &&
        points.targets.map((target, i) => {
          const pathD = createLinearPath(points.origin.x, points.origin.y, target.x, target.y);
          return (
            <g key={`line-${i}`}>
              {/* Base line - gray */}
              <path
                d={pathD}
                stroke="currentColor"
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300 dark:text-gray-700"
                opacity={0.6}
                fill="none"
              />

              {/* Path for measuring length */}
              <path
                ref={(el) => {
                  if (!el) return;
                  pathRefs.current[i] = el;
                }}
                d={pathD}
                stroke="transparent"
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={0}
              />

              {/* Continuous animated beam - outer glow */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].circle = el;
                }}
                d={pathD}
                stroke="rgba(251, 146, 60, 0.6)"
                strokeWidth={beamStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#servicesSoftGlow)"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: "1000",
                }}
              />

              {/* Continuous animated beam - inner core */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].core = el;
                }}
                d={pathD}
                stroke="#fb923c"
                strokeWidth={coreStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: "1000",
                }}
              />
            </g>
          );
        })}
    </svg>
  );
};

