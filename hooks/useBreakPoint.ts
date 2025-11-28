"use client";

import { useState, useEffect } from "react";

type Breakpoints = {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  width: number;
};

export default function useBreakpoint(): Breakpoints {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    width,
    isMobile: width <= 640, // Tailwind sm
    isTablet: width > 640 && width <= 1024, // Tailwind md/lg
    isLaptop: width > 1024 && width <= 1280, // Tailwind xl
    isDesktop: width > 1280, // Tailwind 2xl+
  };
}
