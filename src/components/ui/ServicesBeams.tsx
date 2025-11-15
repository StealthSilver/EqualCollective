import React, { useEffect, useState } from "react";
import { Points } from "../../types/solvynTypes";
import { createSmoothCurvedPath } from "../../lib/solvynUtils";

type ServicesBeamsProps = {
  points: Points | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>;
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
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  
  // Responsive stroke widths - reduced thickness
  const baseStrokeWidth = isMobile ? 0.8 : isTablet ? 1.0 : 1.2;
  const beamStrokeWidth = isMobile ? "1" : isTablet ? "1.2" : "1.5";
  const coreStrokeWidth = isMobile ? "0.6" : isTablet ? "0.8" : "1";

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
        {/* Soft glow filter but toned down */}
        <filter id="servicesSoftGlow" x="-200%" y="-200%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Small gaussian for subtle outer glow after hit */}
        <filter id="softSmall" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="g1" />
          <feMerge>
            <feMergeNode in="g1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines - smooth curved paths */}
      {points &&
        points.targets.map((target, i) => {
          // Create smooth curved path with responsive curvature
          // More curvature on larger screens, less on mobile
          const curvature = isMobile ? 0.2 : isTablet ? 0.25 : 0.3;
          const pathD = createSmoothCurvedPath(
            points.origin.x, 
            points.origin.y, 
            target.x, 
            target.y,
            curvature
          );
          return (
            <g key={`line-${i}`}>
              {/* Base faint light gray path (background) - more visible */}
              <path
                d={pathD}
                stroke="rgba(156, 163, 175, 0.4)"
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:stroke-gray-600"
                opacity={0.6}
                fill="none"
                style={{ pointerEvents: 'none' }}
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

              {/* Continuous animated beam - outer glow (always fully lit) */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].circle = el;
                }}
                d={pathD}
                stroke="rgba(156, 163, 175, 0.5)"
                strokeWidth={beamStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#servicesSoftGlow)"
                className="dark:stroke-gray-500"
              />

              {/* Continuous animated beam - inner core (always fully lit) */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].core = el;
                }}
                d={pathD}
                stroke="rgba(156, 163, 175, 0.6)"
                strokeWidth={coreStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="dark:stroke-gray-400"
              />

              {/* Small pulse circle that travels along the path */}
              <circle
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].pulse = el;
                }}
                r={isMobile ? 3.5 : isTablet ? 4.5 : 5.5}
                fill="#fb923c"
                opacity={0}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(251, 146, 60, 0.55))",
                }}
              />
            </g>
          );
        })}
    </svg>
  );
};

export default ServicesBeams;
