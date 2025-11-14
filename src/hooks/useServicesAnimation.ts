import { useEffect, useRef } from "react";
import { Points, BEAM_SPEED, TOUCH_THRESHOLD } from "../types/solvynTypes";

type UseServicesAnimationProps = {
  points: Points | null;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>;
  progressRefs: React.MutableRefObject<number[]>;
  setIconActive?: (index: number, active: boolean) => void;
};

export const useServicesAnimation = ({
  points,
  pathRefs,
  beamRefs,
  progressRefs,
  setIconActive,
}: UseServicesAnimationProps) => {
  const lastTimestampRef = useRef<number | null>(null);
  const pathLengthsRef = useRef<number[]>([]);
  const iconActivationTimeRef = useRef<Map<number, number>>(new Map());
  const ACTIVE_DURATION = 600; // Keep icons active for 600ms after pulse passes

  useEffect(() => {
    if (!points || points.targets.length < 4) return;

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
    
    // Re-measure after a short delay to ensure paths are rendered
    const timeoutId = setTimeout(measurePathLengths, 100);

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

      activePaths.forEach((path, pathIndex) => {
        try {
          const pathLength = pathLengthsRef.current[pathIndex] || path.getTotalLength();
          if (pathLength === 0) return;

          // Update progress for pulse animation
          const distancePerSec = BEAM_SPEED * pathLength;
          const headDistance = (progressRefs.current[pathIndex] * pathLength + distancePerSec * dt) % pathLength;
          progressRefs.current[pathIndex] = headDistance / pathLength;

          // Keep the continuous beam fully lit (fill entire path)
          // Set dasharray to pathLength and dashoffset to 0 to show full path
          const beamRef = beamRefs.current[pathIndex];
          if (beamRef.circle) {
            beamRef.circle.setAttributeNS(null, "stroke-dasharray", String(pathLength));
            beamRef.circle.setAttributeNS(null, "stroke-dashoffset", "0");
          }
          if (beamRef.core) {
            beamRef.core.setAttributeNS(null, "stroke-dasharray", String(pathLength));
            beamRef.core.setAttributeNS(null, "stroke-dashoffset", "0");
          }

          // Update white pulse position
          if (beamRef.pulse && points) {
            const pulsePoint = path.getPointAtLength(headDistance);
            beamRef.pulse.setAttributeNS(null, "cx", String(pulsePoint.x));
            beamRef.pulse.setAttributeNS(null, "cy", String(pulsePoint.y));
            beamRef.pulse.setAttributeNS(null, "opacity", "1");

            // Check if pulse is near target icon
            const target = points.targets[pathIndex];
            if (target && setIconActive) {
              const distance = Math.hypot(pulsePoint.x - target.x, pulsePoint.y - target.y);
              const currentTime = timestamp;
              
              if (distance <= TOUCH_THRESHOLD) {
                // Pulse reached icon - activate it
                setIconActive(pathIndex, true);
                iconActivationTimeRef.current.set(pathIndex, currentTime);
              } else {
                // Check if still within active duration
                const lastActivation = iconActivationTimeRef.current.get(pathIndex);
                if (lastActivation && currentTime - lastActivation < ACTIVE_DURATION) {
                  setIconActive(pathIndex, true);
                } else {
                  setIconActive(pathIndex, false);
                  iconActivationTimeRef.current.delete(pathIndex);
                }
              }
            }
          }
        } catch (e) {
          console.error("Error animating beam:", e);
        }
      });

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      lastTimestampRef.current = null;
    };
  }, [points, pathRefs, beamRefs, progressRefs, setIconActive]);
};

