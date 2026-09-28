"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getSignupHref } from "@/lib/waitlist";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(fetchAnimation, { timeout: 2500 });
    } else if (isDesktop) {
      timeoutId = globalThis.setTimeout(fetchAnimation, 1200);
    } else {
      fetchAnimation();
    }

    return () => {
      isCancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-start overflow-hidden bg-[#E1F1FE] px-4 pt-[124px] md:min-h-0 md:bg-[#E1F2FE] md:px-10 md:pt-24 xl:min-h-[1000px] xl:px-6 xl:pt-16">
      <div className="relative z-10 mx-auto w-full max-w-[100%] text-center md:mt-4 md:max-w-[840px] xl:mt-15 xl:max-w-[1100px]">
        <h1 className="font-['Geist'] text-[48px] font-semibold leading-[1.1] tracking-[-0.05em] text-[#040136] min-[420px]:text-[48px] md:text-[56px] md:font-medium md:leading-[1.08] md:tracking-[-0.04em] xl:text-[80px] xl:leading-tight xl:tracking-[-4px]">
          Creators get{" "}
          <br className="md:hidden" />
          <span className="text-[#FF5C00]">paid</span>. Brands get{" "}
          <br className="md:hidden" />
          quality{" "}
          <span className="text-[#050E81]">
            content<span className="hidden md:inline">s</span>.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-[280px] text-[14px] leading-[1.45] font-medium text-[#8B8D98] md:mt-5 md:max-w-[560px] md:text-[18px] md:leading-relaxed md:text-[#6B7280] xl:mt-4 xl:max-w-[650px] xl:text-[24px]">
          <span className="font-semibold text-[#0b048c]">starix</span> is where
          creators find challenges worth entering and brands find partners worth
          trusting.
        </p>

        <div className="mt-6 flex w-full flex-row items-center justify-center gap-2 md:mt-8 md:gap-3 xl:gap-4">
          <Link
            href={getSignupHref("creator")}
            className="whitespace-nowrap rounded-full border border-[#0033FF] px-4 py-2.5 text-center text-[13px] font-medium text-[#040136] transition-all hover:shadow-sm md:border-2 md:px-5 md:py-3.5 md:text-[15px] md:text-[#0033FF] xl:px-6 xl:py-4 xl:text-[20px]"
          >
            Join as a Creator
          </Link>

          <Link
            href={getSignupHref("brand")}
            className="whitespace-nowrap rounded-full border border-[#0033FF] bg-[#0033FF] px-4 py-2.5 text-center text-[13px] font-medium text-white transition-all hover:shadow-sm md:border-2 md:px-5 md:py-3.5 md:text-[15px] xl:px-6 xl:py-4 xl:text-[20px]"
          >
            Join as a Brand
          </Link>
        </div>
      </div>

      <div
        className="pointer-events-none relative -mx-4 mt-auto h-[min(46svh,400px)] w-[calc(100%+32px)] overflow-hidden md:mx-0 md:mt-5 md:h-[min(520px,50svh)] md:w-full xl:absolute xl:top-[500px] xl:right-0 xl:left-0 xl:mt-0 xl:h-[500px]"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        {animationData ? (
          <div className="absolute -left-[6%] bottom-0 h-[118%] w-[168%] md:inset-0 md:left-0 md:h-full md:w-full">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{
                width: "100%",
                height: "100%",
              }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
            />
          </div>
        ) : (
          <Image
            src="/hero-mobile-objects.png"
            alt=""
            width={447}
            height={440}
            priority
            className="h-full w-full object-cover object-bottom md:hidden"
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
