import React, { useEffect, useState } from "react";
import { Points } from "../../types/solvynTypes";
import { createLinearPath } from "../../lib/solvynUtils";

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
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 });
  
  // Responsive stroke widths
  const baseStrokeWidth = isMobile ? 1.2 : isTablet ? 1.8 : 2.2;
  const beamStrokeWidth = isMobile ? "2" : isTablet ? "3" : "4";
  const coreStrokeWidth = isMobile ? "1" : isTablet ? "1.4" : "1.8";

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
    
    // Update when points change (icons might have moved) - multiple delays to catch different render stages
    const timers = [
      setTimeout(updateDimensions, 50),
      setTimeout(updateDimensions, 150),
      setTimeout(updateDimensions, 300),
      setTimeout(updateDimensions, 600),
    ];
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      timers.forEach(timer => clearTimeout(timer));
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

      {/* Connection lines */}
      {points &&
        points.targets.map((target, i) => {
          const pathD = createLinearPath(points.origin.x, points.origin.y, target.x, target.y);
          return (
            <g key={`line-${i}`}>
              {/* Base faint line (background) */}
              <path
                d={pathD}
                stroke="currentColor"
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300 dark:text-gray-700"
                opacity={0.45}
                fill="none"
              />

              {/* Invisible path for measuring */}
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

              {/* Outer glow stroke (gray) */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].circle = el;
                }}
                d={pathD}
                // Gray outer stroke (kept subtle)
                stroke="rgba(156, 163, 175, 0.35)"
                strokeWidth={beamStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#servicesSoftGlow)"
                style={{ transition: "opacity 220ms linear" }}
              />

              {/* Inner core stroke (gray) */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].core = el;
                }}
                d={pathD}
                stroke="rgba(156, 163, 175, 0.65)"
                strokeWidth={coreStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{ transition: "opacity 220ms linear" }}
              />

              {/* Small pulse circle that travels along the path */}
              <circle
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].pulse = el;
                }}
                r={isMobile ? 3.5 : isTablet ? 4.5 : 5.5}
                // give it a light orange center and soft orange shadow
                fill="#fb923c"
                opacity={0}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(251, 146, 60, 0.55))",
                  transition: "opacity 160ms linear, transform 160ms linear",
                }}
              />
            </g>
          );
        })}
    </svg>
  );
};

export default ServicesBeams;
