import React, { useState, useEffect } from "react";
import { Points } from "../../types/solvynTypes";
import { createCurvedPath } from "../../lib/solvynUtils";

type SolvynBeamsProps = {
  points: Points | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGCircleElement | null; core: SVGCircleElement | null }[]>;
  isMobile?: boolean;
  isTablet?: boolean;
};

export const SolvynBeams: React.FC<SolvynBeamsProps> = ({
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
        <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
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
          const pathD = createCurvedPath(points.origin.x, points.origin.y, target.x, target.y);
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

              {/* Animated beam traveling on line - hidden path for animation */}
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
            </g>
          );
        })}

      {/* Animated beam lines */}
      {points &&
        points.targets.map((_, i) => (
          <g key={`beam-line-${i}`}>
            {/* Outer glow line */}
            <line
              ref={(el) => {
                beamRefs.current[i].circle = el as unknown as SVGCircleElement;
              }}
              x1={-20}
              y1={-20}
              x2={-20}
              y2={-20}
              stroke="rgba(251, 146, 60, 0.6)"
              strokeWidth={beamStrokeWidth}
              strokeLinecap="round"
              filter="url(#softGlow)"
              className="transition-all duration-75"
            />
            {/* Inner core line - light orange */}
            <line
              ref={(el) => {
                beamRefs.current[i].core = el as unknown as SVGCircleElement;
              }}
              x1={-20}
              y1={-20}
              x2={-20}
              y2={-20}
              stroke="#fb923c"
              strokeWidth={coreStrokeWidth}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
          </g>
        ))}
    </svg>
  );
};

