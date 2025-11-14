"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import Loader from "./Loader";

// Context to track component loading
const LoadingContext = createContext<{
  registerComponent: (name: string) => void;
  markComponentLoaded: (name: string) => void;
}>({
  registerComponent: () => {},
  markComponentLoaded: () => {},
});

export const useLoadingContext = () => useContext(LoadingContext);

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const loadedComponents = useRef<Set<string>>(new Set());
  const registeredComponents = useRef<Set<string>>(new Set());
  const hasCheckedRef = useRef(false);

  const registerComponent = (name: string) => {
    registeredComponents.current.add(name);
  };

  const markComponentLoaded = (name: string) => {
    loadedComponents.current.add(name);
  };

  const checkIfReady = () => {
    if (hasCheckedRef.current) return false;
    
    // Check if document is ready
    if (document.readyState === "complete") {
      hasCheckedRef.current = true;
      // Small delay for smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 300);
      return true;
    }

    return false;
  };

  useEffect(() => {
    // Maximum wait time - always show page after 1.5 seconds max
    const maxWaitTimer = setTimeout(() => {
      if (loading) {
        hasCheckedRef.current = true;
        setLoading(false);
      }
    }, 1500);

    // Check immediately
    if (checkIfReady()) {
      clearTimeout(maxWaitTimer);
      return;
    }

    // Check when window loads
    const handleLoad = () => {
      if (checkIfReady()) {
        clearTimeout(maxWaitTimer);
      }
    };

    // Check periodically
    const checkInterval = setInterval(() => {
      if (checkIfReady()) {
        clearInterval(checkInterval);
        clearTimeout(maxWaitTimer);
      }
    }, 100);

    // Also check on DOMContentLoaded
    if (document.readyState === "complete") {
      checkIfReady();
    } else {
      window.addEventListener("load", handleLoad);
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
          if (!hasCheckedRef.current) {
            checkIfReady();
          }
        }, 500);
      });
    }

    return () => {
      clearTimeout(maxWaitTimer);
      clearInterval(checkInterval);
      window.removeEventListener("load", handleLoad);
    };
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ registerComponent, markComponentLoaded }}>
      {loading && <Loader />}
      <div
        style={{
          visibility: loading ? "hidden" : "visible",
          position: loading ? "absolute" : "relative",
          width: loading ? "100%" : "auto",
          height: loading ? "100%" : "auto",
        }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
