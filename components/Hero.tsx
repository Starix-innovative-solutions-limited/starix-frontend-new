"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const shouldLoadAnimation =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!shouldLoadAnimation) return;

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
      idleId = window.requestIdleCallback(fetchAnimation, { timeout: 2500 });
    } else {
      timeoutId = globalThis.setTimeout(fetchAnimation, 1200);
    }

    return () => {
      isCancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen md:min-h-[1000px] bg-[#E1F2FE] flex flex-col items-center justify-start overflow-hidden px-5 pt-20 md:px-6 md:pt-16">
      {/* TEXT CONTENT */}
      <div className="relative z-10 mx-auto mt-4 md:mt-15 max-w-[100%] md:max-w-[1100px] text-center">
        <h1 className="text-[40px] leading-tight tracking-[-2px] font-medium text-[#040136] sm:text-[52px] md:text-[72px] md:tracking-[-4px] lg:text-[80px]">
          Creators get <span className="text-[#FF5C00]">paid</span>.
          <br />
          Brands get quality <span className="text-[#050E81]">contents.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-relaxed font-medium text-[#6B7280] sm:text-[18px] md:mt-4 md:text-[24px]">
          <span className="font-semibold text-[#0b048c]">starix</span> is where
          creators find challenges worth entering and brands find partners worth
          trusting.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/coming-soon"
            className="w-full rounded-full border-2 border-[#0033FF] px-6 py-4 text-center text-[16px] font-medium text-[#0033FF] transition-all hover:shadow-sm sm:w-auto md:text-[20px]"
          >
            Join as a Creator
          </Link>

          <Link
            href="/coming-soon"
            className="w-full rounded-full border-2 border-[#0033FF] bg-[#0033FF] px-6 py-4 text-center text-[16px] font-medium text-white transition-all hover:shadow-sm sm:w-auto md:text-[20px]"
          >
            Join as a Brand
          </Link>
        </div>
      </div>

      {/* LOTTIE ANIMATION - Hidden on Mobile */}
      <div
        className="absolute left-0 right-0 hidden w-full overflow-hidden pointer-events-none md:block"
        style={{
          height: "500px",
          top: "500px",
          zIndex: 0,
        }}
      >
        {animationData && (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{
              width: "100vw",
              height: "100%",
            }}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;