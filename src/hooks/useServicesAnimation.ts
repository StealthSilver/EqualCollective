import { useEffect, useRef } from "react";
import { Points, BEAM_SPEED } from "../types/solvynTypes";

type UseServicesAnimationProps = {
  points: Points | null;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null }[]>;
  progressRefs: React.MutableRefObject<number[]>;
};

export const useServicesAnimation = ({
  points,
  pathRefs,
  beamRefs,
  progressRefs,
}: UseServicesAnimationProps) => {
  const lastTimestampRef = useRef<number | null>(null);
  const pathLengthsRef = useRef<number[]>([]);

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

          // Update progress for continuous beam animation
          const distancePerSec = BEAM_SPEED * pathLength;
          const headDistance = (progressRefs.current[pathIndex] * pathLength + distancePerSec * dt) % pathLength;
          progressRefs.current[pathIndex] = headDistance / pathLength;

          // Calculate stroke-dashoffset for continuous beam
          // The beam should fill from origin to current position
          const dashOffset = pathLength - headDistance;

          // Update continuous beam paths using stroke-dashoffset
          const beamRef = beamRefs.current[pathIndex];
          if (beamRef.circle) {
            beamRef.circle.setAttributeNS(null, "stroke-dasharray", String(pathLength));
            beamRef.circle.setAttributeNS(null, "stroke-dashoffset", String(dashOffset));
          }
          if (beamRef.core) {
            beamRef.core.setAttributeNS(null, "stroke-dasharray", String(pathLength));
            beamRef.core.setAttributeNS(null, "stroke-dashoffset", String(dashOffset));
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
  }, [points, pathRefs, beamRefs, progressRefs]);
};

