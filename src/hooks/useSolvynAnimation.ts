import { useEffect, useRef, useCallback } from "react";
import { Points, IconState, BEAM_SPEED, TOUCH_THRESHOLD } from "../types/solvynTypes";

type UseSolvynAnimationProps = {
  points: Points | null;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>;
  progressRefs: React.MutableRefObject<number[]>;
  setIcons: React.Dispatch<React.SetStateAction<IconState[]>>;
};

// Staggered delays: top row (0,1) together, then 2-11 one by one
// Delay between each icon after top row: 0.15 seconds
const getInitialDelay = (index: number): number => {
  if (index === 0 || index === 1) return 0; // Top row starts together
  return 0.15 * (index - 1); // Each subsequent icon starts 0.15s after the previous
};

export const useSolvynAnimation = ({
  points,
  pathRefs,
  beamRefs,
  progressRefs,
  setIcons,
}: UseSolvynAnimationProps) => {
  const lastTimestampRef = useRef<number | null>(null);
  const pointsRef = useRef<Points | null>(points);
  const iconActivationTimeRef = useRef<Map<number, number>>(new Map());
  const ACTIVE_DURATION = 800; // Keep icons active for 800ms after pulse passes
  const pathLengthsRef = useRef<number[]>([]);
  const startTimeRef = useRef<number | null>(null);
  
  // Update points ref when points change
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  const checkProximityAndSetActive = useCallback((beamPositions: { x: number; y: number }[]) => {
    const currentPoints = pointsRef.current;
    if (!currentPoints) return;
    const currentTime = Date.now();

    setIcons((prev) => {
      const newIcons = prev.map((ic, idx) => {
        const pt = currentPoints.targets[idx];
        if (!pt) return ic;

        let isActive = false;
        let wasTouched = false;
        
        // Check if beam is currently touching
        for (const beamPos of beamPositions) {
          const dist = Math.hypot(pt.x - beamPos.x, pt.y - beamPos.y);
          if (dist <= TOUCH_THRESHOLD) {
            isActive = true;
            wasTouched = true;
            iconActivationTimeRef.current.set(idx, currentTime);
            break;
          }
        }

        // If not currently touched, check if still within active duration
        if (!wasTouched) {
          const lastActivation = iconActivationTimeRef.current.get(idx);
          if (lastActivation && currentTime - lastActivation < ACTIVE_DURATION) {
            isActive = true;
          } else {
            iconActivationTimeRef.current.delete(idx);
          }
        }

        // Only update if state actually changed
        if (ic.active === isActive) return ic;
        return { ...ic, active: isActive };
      });

      // Check if anything actually changed
      const hasChanges = newIcons.some((icon, idx) => icon.active !== prev[idx].active);
      return hasChanges ? newIcons : prev;
    });
  }, [setIcons]);

  useEffect(() => {
    if (!points || points.targets.length < 12) return;

    // Reset start time when points change
    startTimeRef.current = Date.now();

    // Measure path lengths when points change
    const measurePathLengths = () => {
      pathLengthsRef.current = pathRefs.current.map((path) => {
        if (!path) return 0;
        try {
          return path.getTotalLength();
        } catch {
          return 0;
        }
      });
    };

    // Initial measurement
    measurePathLengths();
    
    // Re-measure multiple times to ensure paths are rendered and positioned correctly
    const timeoutIds = [
      setTimeout(measurePathLengths, 100),
      setTimeout(measurePathLengths, 300),
      setTimeout(measurePathLengths, 600),
      setTimeout(measurePathLengths, 1000),
    ];

    let rafId = 0;

    const step = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const dt = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const activePaths = pathRefs.current.filter(Boolean);
      if (activePaths.length === 0) {
        rafId = requestAnimationFrame(step);
        return;
      }

      const currentTime = (Date.now() - (startTimeRef.current || 0)) / 1000;
      const beamPositions: { x: number; y: number }[] = [];

      activePaths.forEach((path, pathIndex) => {
        try {
          const pathLength = pathLengthsRef.current[pathIndex] || path.getTotalLength();
          if (pathLength === 0) return;

          // Calculate initial delay offset
          const initialDelay = getInitialDelay(pathIndex);
          const adjustedTime = Math.max(0, currentTime - initialDelay);

          // Update progress for pulse animation - continuous loop using modulo
          const distancePerSec = BEAM_SPEED * pathLength;
          const headDistance = adjustedTime > 0 ? (adjustedTime * distancePerSec) % pathLength : 0;
          progressRefs.current[pathIndex] = headDistance / pathLength;

          // Keep the continuous beam fully lit (fill entire path)
          const beamRef = beamRefs.current[pathIndex];
          if (beamRef.circle) {
            beamRef.circle.setAttributeNS(null, "stroke-dasharray", String(pathLength));
            beamRef.circle.setAttributeNS(null, "stroke-dashoffset", "0");
          }
          if (beamRef.core) {
            beamRef.core.setAttributeNS(null, "stroke-dasharray", String(pathLength));
            beamRef.core.setAttributeNS(null, "stroke-dashoffset", "0");
          }

          // Update pulse position (only show after initial delay)
          if (beamRef.pulse && points && adjustedTime > 0) {
            const pulsePoint = path.getPointAtLength(headDistance);
            beamRef.pulse.setAttributeNS(null, "cx", String(pulsePoint.x));
            beamRef.pulse.setAttributeNS(null, "cy", String(pulsePoint.y));
            beamRef.pulse.setAttributeNS(null, "opacity", "1");
            beamPositions.push(pulsePoint);
          } else if (beamRef.pulse) {
            // Hide pulse before initial delay
            beamRef.pulse.setAttributeNS(null, "opacity", "0");
          }
        } catch (e) {
          console.error("Error animating beam:", e);
        }
      });

      checkProximityAndSetActive(beamPositions);

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      timeoutIds.forEach(id => clearTimeout(id));
      lastTimestampRef.current = null;
    };
  }, [points, pathRefs, beamRefs, progressRefs, checkProximityAndSetActive]);
};
