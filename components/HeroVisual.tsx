"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
});

export default function HeroVisual() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    let isCancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const fetchAnimation = async () => {
      try {
        const response = await fetch("/animations/hero-anime5.json");
        const data = await response.json();
        if (!isCancelled) setAnimationData(data);
      } catch (error) {
        console.error("Error loading Lottie animation:", error);
      }
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(fetchAnimation, { timeout: 4000 });
    } else {
      timeoutId = globalThis.setTimeout(fetchAnimation, 2000);
    }

    return () => {
      isCancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none relative -mx-4 mt-auto h-[min(46svh,400px)] w-[calc(100%+32px)] overflow-hidden md:mx-0 md:mt-5 md:h-[min(520px,50svh)] md:w-full xl:absolute xl:top-[500px] xl:right-0 xl:left-0 xl:mt-0 xl:h-[500px]"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <Image
        src="/hero-mobile-objects.webp"
        alt=""
        width={447}
        height={440}
        priority
        className="h-full w-full object-cover object-bottom md:hidden"
      />
      {animationData ? (
        <div className="absolute inset-0 hidden md:block">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
          />
        </div>
      ) : (
        <Image
          src="/hero-mobile-objects.webp"
          alt=""
          width={1200}
          height={500}
          className="hidden h-full w-full object-cover object-bottom md:block"
        />
      )}
    </div>
  );
}
