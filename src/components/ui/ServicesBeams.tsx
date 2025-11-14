import React, { useEffect, useState, useRef } from "react";
import { Points } from "../../types/solvynTypes";
import { createLinearPath } from "../../lib/solvynUtils";

type ServicesBeamsProps = {
  points: Points | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>;
  isMobile?: boolean;
  isTablet?: boolean;
  onPathsReady?: () => void;
};

export const ServicesBeams: React.FC<ServicesBeamsProps> = ({
  points,
  containerRef,
  pathRefs,
  beamRefs,
  isMobile = false,
  isTablet = false,
  onPathsReady,
}) => {
  // Start with default dimensions like SolvynBeams - simpler approach
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const [forceRender, setForceRender] = useState(0);
  
  // Responsive stroke widths
  const baseStrokeWidth = isMobile ? 1.2 : isTablet ? 1.8 : 2.2;
  const beamStrokeWidth = isMobile ? "2" : isTablet ? "3" : "4";
  const coreStrokeWidth = isMobile ? "1" : isTablet ? "1.4" : "1.8";

  // Measure dimensions - simplified like SolvynBeams
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({ width: rect.width, height: rect.height });
          // Force re-render after dimensions update
          setForceRender(prev => prev + 1);
        }
      }
    };

    // Measure immediately (synchronous if possible)
    updateDimensions();
    
    // Also measure asynchronously
    requestAnimationFrame(updateDimensions);
    setTimeout(updateDimensions, 0);
    
    // Measure on resize
    window.addEventListener("resize", updateDimensions);
    
    // Update when points change (icons might have moved)
    const timeoutId = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [containerRef, points]);

  // Force initial render after mount to ensure SVG is painted
  useEffect(() => {
    // Force a re-render after component mounts to ensure SVG is painted
    const timer = setTimeout(() => {
      setForceRender(prev => prev + 1);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Notify parent when paths are ready
  const pathsReadyNotifiedRef = useRef(false);
  
  useEffect(() => {
    // Reset notification flag when points change
    pathsReadyNotifiedRef.current = false;
  }, [points]);

  useEffect(() => {
    if (points && onPathsReady && !pathsReadyNotifiedRef.current) {
      // Wait for paths to be rendered in DOM
      const checkPathsReady = () => {
        // Check if we already notified
        if (pathsReadyNotifiedRef.current) return;

        // Check if all paths exist and have valid lengths
        const allPathsReady = pathRefs.current.length >= 4 && 
          pathRefs.current.every((path, index) => {
            if (!path) return false;
            try {
              const length = path.getTotalLength();
              return length > 0;
            } catch {
              return false;
            }
          });

        if (allPathsReady) {
          pathsReadyNotifiedRef.current = true;
          // Notify parent that paths are ready
          requestAnimationFrame(() => {
            setTimeout(() => {
              onPathsReady();
            }, 50);
          });
        }
      };

      // Check multiple times to ensure paths are rendered
      const timers = [
        setTimeout(checkPathsReady, 0),
        setTimeout(checkPathsReady, 50),
        setTimeout(checkPathsReady, 100),
        setTimeout(checkPathsReady, 200),
        setTimeout(checkPathsReady, 300),
        setTimeout(checkPathsReady, 500),
        setTimeout(checkPathsReady, 800),
      ];

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [points, pathRefs, onPathsReady]);

  // Always render SVG if points exist (like SolvynBeams)
  if (!points || !points.targets || points.targets.length !== 4) {
    return null;
  }

  const svgRef = useRef<SVGSVGElement>(null);

  // Force repaint when SVG mounts or updates - ensures browser paints the SVG
  useEffect(() => {
    if (svgRef.current && points) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (svgRef.current) {
          // Trigger a reflow to ensure SVG is painted
          const svg = svgRef.current;
          // Force browser to recalculate and paint
          void svg.getBoundingClientRect();
        }
      });
    }
  }, [points, dimensions, forceRender]);

  return (
    <svg
      ref={svgRef}
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
              {/* Base faint line (background) - make more visible for debugging */}
              <path
                d={pathD}
                stroke="currentColor"
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 dark:text-gray-600"
                opacity={0.6}
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

              {/* Outer glow stroke (gray) - always visible */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].circle = el;
                  // Ensure it's visible immediately
                  if (el) {
                    el.setAttributeNS(null, "opacity", "1");
                  }
                }}
                d={pathD}
                // Gray outer stroke - make more visible
                stroke="rgba(156, 163, 175, 0.5)"
                strokeWidth={beamStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#servicesSoftGlow)"
                opacity="1"
                style={{ transition: "opacity 220ms linear" }}
              />

              {/* Inner core stroke (gray) - always visible */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].core = el;
                  // Ensure it's visible immediately
                  if (el) {
                    el.setAttributeNS(null, "opacity", "1");
                  }
                }}
                d={pathD}
                stroke="rgba(156, 163, 175, 0.8)"
                strokeWidth={coreStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="1"
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
