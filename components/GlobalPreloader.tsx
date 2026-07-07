"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Only keep the absolutely critical branding assets for initial paint
const CRITICAL_IMAGES = ["/icon-logs.svg"];

export default function GlobalPreloader({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Mimic the Facebook behavior: wait for minimal resources or a small timeout
    // to ensure the main application shell is ready to mount
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1200); // Small delay to show the logo briefly

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500">
        {/* Minimalist Logo container - exactly like FB mobile */}
        <div className="relative w-36 h-36 animate-pulse">
          <Image 
            src="/candyyy.svg" 
            alt="Loading" 
            fill 
            priority 
            className="object-contain" 
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}