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
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
      className="pointer-events-none relative -mx-4 mt-auto h-[min(46svh,600px)] w-[calc(100%+32px)] overflow-hidden md:mx-0 md:mt-5 md:h-[min(520px,50svh)] md:w-[calc(108%+32px)] xl:absolute xl:top-[500px] xl:right-0 xl:left-0 xl:mt-0 xl:h-[500px]"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {!animationReady && (
        <Image
          src="/Frame.webp"
          alt=""
          width={1200}
          height={500}
          priority
          className="h-full w-full object-cover object-bottom"
        />
      )}

      {animationData && (
        <div
          className={`absolute inset-0 ${animationReady ? "opacity-100" : "opacity-0"}`}
        >
          <Lottie
            animationData={animationData}
            loop
            autoplay
            onDOMLoaded={() => setAnimationReady(true)}
            style={{ width: "100%", height: "100%" }}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
          />
        </div>
      )}
    </div>
  );
}
