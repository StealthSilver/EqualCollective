"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAllResourcesLoaded = () => {
      // Check if document is complete
      if (document.readyState !== "complete") {
        return false;
      }
      
      // Check if all images are loaded
      const images = Array.from(document.querySelectorAll("img"));
      const allImagesLoaded = images.every((img) => img.complete && img.naturalHeight !== 0);
      
      return allImagesLoaded;
    };

    const handleLoad = () => {
      // Check immediately when load event fires
      if (checkAllResourcesLoaded()) {
        setLoading(false);
      } else {
        // If images aren't loaded yet, poll until they are
        const checkInterval = setInterval(() => {
          if (checkAllResourcesLoaded()) {
            clearInterval(checkInterval);
            setLoading(false);
          }
        }, 50);
        
        // Fallback: remove loader after max wait time (10 seconds)
        setTimeout(() => {
          clearInterval(checkInterval);
          setLoading(false);
        }, 10000);
      }
    };

    // Check immediately if already loaded
    if (checkAllResourcesLoaded()) {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return <>{loading ? <Loader /> : children}</>;
}
