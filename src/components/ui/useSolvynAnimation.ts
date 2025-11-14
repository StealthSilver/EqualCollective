import { useEffect, useRef, useCallback } from "react";
import { Points, IconState, BEAM_SPEED, TOUCH_THRESHOLD } from "../../types/solvynTypes";

type UseSolvynAnimationProps = {
  points: Points | null;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGCircleElement | null; core: SVGCircleElement | null }[]>;
  progressRefs: React.MutableRefObject<number[]>;
  setIcons: React.Dispatch<React.SetStateAction<IconState[]>>;
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
  const ACTIVE_DURATION = 800; // Keep icons active for 800ms after beam passes
  
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

      const beamPositions: { x: number; y: number }[] = [];

      activePaths.forEach((path, pathIndex) => {
        try {
          const pathLength = path.getTotalLength();
          if (pathLength === 0) return;

          const distancePerSec = BEAM_SPEED * pathLength;
          const headDistance = (progressRefs.current[pathIndex] * pathLength + distancePerSec * dt) % pathLength;
          progressRefs.current[pathIndex] = headDistance / pathLength;

          // Get two points for the line beam (create a short line segment)
          const lineLength = 25; // Increased length for longer beam
          const point1Distance = Math.max(0, headDistance - lineLength / 2);
          const point2Distance = Math.min(pathLength, headDistance + lineLength / 2);

          const point1 = path.getPointAtLength(point1Distance);
          const point2 = path.getPointAtLength(point2Distance);
          const centerPoint = path.getPointAtLength(headDistance);

          beamPositions.push(centerPoint);

          // Update line positions instead of circle positions
          const beamRef = beamRefs.current[pathIndex];
          if (beamRef.circle) {
            beamRef.circle.setAttributeNS(null, "x1", String(point1.x));
            beamRef.circle.setAttributeNS(null, "y1", String(point1.y));
            beamRef.circle.setAttributeNS(null, "x2", String(point2.x));
            beamRef.circle.setAttributeNS(null, "y2", String(point2.y));
          }
          if (beamRef.core) {
            beamRef.core.setAttributeNS(null, "x1", String(point1.x));
            beamRef.core.setAttributeNS(null, "y1", String(point1.y));
            beamRef.core.setAttributeNS(null, "x2", String(point2.x));
            beamRef.core.setAttributeNS(null, "y2", String(point2.y));
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
      lastTimestampRef.current = null;
    };
  }, [points, pathRefs, beamRefs, progressRefs, checkProximityAndSetActive]);
};

