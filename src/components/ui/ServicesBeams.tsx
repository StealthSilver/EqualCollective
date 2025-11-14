import React, { useEffect, useState, useRef } from "react";
import { Points } from "../../types/solvynTypes";
import { createSmoothCurvedPath } from "../../lib/solvynUtils";

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
  // Start with reasonable default dimensions so SVG can render immediately
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 1200, height: 800 });
  const [forceRender, setForceRender] = useState(0);
  const [dimensionsReady, setDimensionsReady] = useState(false);
  
  // Responsive stroke widths - reduced thickness
  const baseStrokeWidth = isMobile ? 0.8 : isTablet ? 1.0 : 1.2;
  const beamStrokeWidth = isMobile ? "1" : isTablet ? "1.2" : "1.5";
  const coreStrokeWidth = isMobile ? "0.6" : isTablet ? "0.8" : "1";

  // Measure dimensions - update as they become available
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const newDims = { width: rect.width, height: rect.height };
          setDimensions(prev => {
            // Only update if dimensions actually changed
            if (Math.abs(prev.width - newDims.width) > 1 || Math.abs(prev.height - newDims.height) > 1) {
              setDimensionsReady(true);
              setForceRender(prev => prev + 1);
              return newDims;
            }
            return prev;
          });
          if (!dimensionsReady) {
            setDimensionsReady(true);
            setForceRender(prev => prev + 1);
          }
        }
      }
    };

    // Measure immediately - don't wait
    updateDimensions();
    
    // Force multiple measurements to ensure we get valid dimensions
    requestAnimationFrame(() => {
      updateDimensions();
      requestAnimationFrame(() => {
        updateDimensions();
      });
    });
    
    // Also measure asynchronously with delays
    setTimeout(updateDimensions, 0);
    setTimeout(updateDimensions, 50);
    setTimeout(updateDimensions, 100);
    setTimeout(updateDimensions, 200);
    
    // Measure on resize
    window.addEventListener("resize", updateDimensions);
    
    // Update when points change (icons might have moved)
    const timeoutId = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [containerRef, points, dimensionsReady]);

  // Force initial render after mount and when dimensions are ready
  useEffect(() => {
    if (dimensionsReady && dimensions) {
      // Force multiple re-renders to ensure SVG is painted
      const timers = [
        setTimeout(() => setForceRender(prev => prev + 1), 0),
        setTimeout(() => setForceRender(prev => prev + 1), 50),
        setTimeout(() => setForceRender(prev => prev + 1), 100),
      ];
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [dimensionsReady, dimensions]);

  // Notify parent when paths are ready - CRITICAL: must wait for dimensions
  const pathsReadyNotifiedRef = useRef(false);
  
  useEffect(() => {
    // Reset notification flag when points or dimensions change
    pathsReadyNotifiedRef.current = false;
  }, [points, dimensions]);

  useEffect(() => {
    // Check as soon as points are available - don't wait for dimensionsReady
    if (!points || !onPathsReady || pathsReadyNotifiedRef.current) {
      return;
    }

    // Wait for paths to be rendered in DOM and visible
    const checkPathsReady = () => {
      // Check if we already notified
      if (pathsReadyNotifiedRef.current) return;

      // Check if all paths exist, have valid lengths, AND are visible
      const allPathsReady = pathRefs.current.length >= 4 && 
        pathRefs.current.every((path, index) => {
          if (!path) return false;
          try {
            const length = path.getTotalLength();
            if (length <= 0) return false;
            
            // Also check if path is actually visible (has valid bounding box)
            const bbox = path.getBBox();
            if (bbox.width === 0 && bbox.height === 0) return false;
            
            return true;
          } catch {
            return false;
          }
        });

      if (allPathsReady) {
        pathsReadyNotifiedRef.current = true;
        // Notify parent that paths are ready - use multiple RAF to ensure browser has painted
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              onPathsReady();
            }, 50);
          });
        });
      }
    };

    // Check multiple times to ensure paths are rendered AND visible
    const timers = [
      setTimeout(checkPathsReady, 0),
      setTimeout(checkPathsReady, 50),
      setTimeout(checkPathsReady, 100),
      setTimeout(checkPathsReady, 200),
      setTimeout(checkPathsReady, 300),
      setTimeout(checkPathsReady, 500),
      setTimeout(checkPathsReady, 800),
      setTimeout(checkPathsReady, 1200),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [points, pathRefs, onPathsReady]);

  // Always render SVG if points exist - don't wait for dimensions
  if (!points || !points.targets || points.targets.length !== 4) {
    return null;
  }

  const svgRef = useRef<SVGSVGElement>(null);

  // Immediate effect when points are available to ensure SVG and paths are visible
  useEffect(() => {
    if (!points) return;
    
    const forceVisibility = () => {
      if (svgRef.current) {
        const svg = svgRef.current;
        // Ensure SVG is visible
        svg.style.opacity = '1';
        svg.style.visibility = 'visible';
        
        // Force all paths to be visible immediately
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          // Skip the invisible measuring path
          if (path.getAttribute('stroke') === 'transparent') return;
          
          path.setAttributeNS(null, 'opacity', '1');
          path.setAttributeNS(null, 'visibility', 'visible');
          (path as unknown as HTMLElement).style.opacity = '1';
          (path as unknown as HTMLElement).style.visibility = 'visible';
        });
        
        // Force browser to recalculate
        void svg.getBoundingClientRect();
      }
    };

    // Run immediately and multiple times - wait a bit for SVG to render
    setTimeout(forceVisibility, 0);
    requestAnimationFrame(forceVisibility);
    requestAnimationFrame(() => requestAnimationFrame(forceVisibility));
    setTimeout(forceVisibility, 50);
    setTimeout(forceVisibility, 100);
    setTimeout(forceVisibility, 200);
  }, [points]); // Run when points are available

  // Force repaint when SVG mounts or updates - ensures browser paints the SVG
  useEffect(() => {
    if (svgRef.current && points) {
      // Use multiple requestAnimationFrame calls to ensure DOM is ready and painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (svgRef.current) {
              // Trigger a reflow to ensure SVG is painted
              const svg = svgRef.current;
              // Force browser to recalculate and paint - multiple methods
              void svg.getBoundingClientRect();
              
              // Also force a style recalculation
              const style = window.getComputedStyle(svg);
              void style.width;
              void style.height;
              
              // Ensure SVG is visible
              svg.style.opacity = '1';
              svg.style.visibility = 'visible';
              
              // Force all paths to be visible
              const paths = svg.querySelectorAll('path');
              paths.forEach(path => {
                // Skip the invisible measuring path
                if (path.getAttribute('stroke') === 'transparent') return;
                
                path.setAttributeNS(null, 'opacity', '1');
                path.setAttributeNS(null, 'visibility', 'visible');
                (path as unknown as HTMLElement).style.opacity = '1';
                (path as unknown as HTMLElement).style.visibility = 'visible';
              });
            }
          });
        });
      });
    }
  }, [points, dimensions, forceRender]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="none"
      opacity="1"
      visibility="visible"
      style={{ 
        opacity: 1,
        visibility: 'visible',
        willChange: 'auto',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
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

              {/* Invisible path for measuring */}
              <path
                ref={(el) => {
                  if (!el) return;
                  pathRefs.current[i] = el;
                  // Force measurement after path is added to DOM
                  requestAnimationFrame(() => {
                    if (el) {
                      try {
                        // Force browser to calculate path length
                        const length = el.getTotalLength();
                        if (length > 0) {
                          // Path is valid, force a repaint
                          void el.getBoundingClientRect();
                        }
                      } catch {
                        // Path not ready yet
                      }
                    }
                  });
                }}
                d={pathD}
                stroke="transparent"
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={0}
              />

              {/* Outer glow stroke (light gray) - always visible */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].circle = el;
                  // Ensure it's visible immediately and force repaint
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      if (el) {
                        el.setAttributeNS(null, "opacity", "1");
                        el.setAttributeNS(null, "visibility", "visible");
                        el.style.opacity = "1";
                        el.style.visibility = "visible";
                        // Force browser to recalculate
                        void el.getBoundingClientRect();
                      }
                    });
                  });
                }}
                d={pathD}
                // More visible gray stroke
                stroke="rgba(156, 163, 175, 0.5)"
                strokeWidth={beamStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#servicesSoftGlow)"
                opacity="1"
                visibility="visible"
                style={{ 
                  opacity: 1,
                  visibility: 'visible',
                  transition: "opacity 220ms linear",
                  pointerEvents: 'none'
                }}
                className="dark:stroke-gray-500"
              />

              {/* Inner core stroke (light gray) - always visible */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].core = el;
                  // Ensure it's visible immediately and force repaint
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      if (el) {
                        el.setAttributeNS(null, "opacity", "1");
                        el.setAttributeNS(null, "visibility", "visible");
                        el.style.opacity = "1";
                        el.style.visibility = "visible";
                        // Force browser to recalculate
                        void el.getBoundingClientRect();
                      }
                    });
                  });
                }}
                d={pathD}
                stroke="rgba(156, 163, 175, 0.6)"
                strokeWidth={coreStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="1"
                visibility="visible"
                style={{ 
                  opacity: 1,
                  visibility: 'visible',
                  transition: "opacity 220ms linear",
                  pointerEvents: 'none'
                }}
                className="dark:stroke-gray-400"
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
