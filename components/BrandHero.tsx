"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const BrandHero = () => {
  return (
    <section className="relative w-full lg:min-h-screen flex items-center overflow-hidden">
      {/* RIGHT SIDE background gradient — bleeds in from the right */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-12 lg:px-16 gap-0 min-h-screen">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col pb-6 z-20 pt-24 lg:pt-0">
          <h1
            className="font-medium min-w-[700px] text-[#040136] leading-[1.05] tracking-[-0.03em] text-[44px] lg:text-[clamp(44px,6vw,80px)]"
          >
            Creators get paid.<br />
            Brands get quality{" "}
            <span className="text-[#050E81]">contents.</span>
          </h1>
          <p
            className="mt-8 text-[#626076] leading-relaxed max-w-[520px] text-[26px] lg:text-[clamp(16px,1.5vw,26px)]"
          >
            <span className="font-bold text-[#050E81]">starix</span> is where creators find challenges worth
            entering and brands find partners worth trusting.
          </p>
          <div className="mt-10 flex flex-row items-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-full border-2 border-[#040136] text-[#040136] font-semibold hover:shadow-sm text-center whitespace-nowrap text-[16px]"
            >
              Join as a Creator
            </Link>
            <Link
              href="/signup?role=brand"
              className="px-8 py-4 rounded-full bg-[#050E81] text-white font-semibold shadow-md hover:shadow-sm text-center whitespace-nowrap text-[16px]"
            >
              Join as a Brand
            </Link>
          </div>
        </div>

        {/* RIGHT CONTENT — stacked 3D assets */}
        <div className="relative hidden lg:block h-screen">

          {/* 1. TROPHY — large, background, top-right, slightly cropped */}
          <div
            className="absolute w-[618px] h-[795px] top-[calc(50%-420px)] right-[-5px] z-[1]"
          >
            <Image
              src="/purple-trophy.svg"
              alt="Trophy"
              fill
              className="object-contain object-right-top"
              priority
            />
          </div>

          {/* 2. MONEY BAG WITH LOCK — center-front, largest, dominates */}
          <div
            className="absolute w-[485px] h-[539px] top-[calc(50%-210px)] left-[-60px] z-[3]"
          >
            <Image
              src="/lock-money.svg"
              alt="Money Bag"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* 3. WAX SEAL — bottom-right, in front of trophy, behind bag */}
          <div
            className="absolute w-[585px] h-[662px] bottom-[calc(50%-380px)] right-[-40px] z-[2]"
          >
            <Image
              src="/wax-seal.svg"
              alt="Wax Seal"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Soft radial glow behind the assets */}
          <div
            className="absolute pointer-events-none w-[700px] h-[700px] top-1/2 right-[-100px] -translate-y-1/2 z-0 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(180,200,240,0.55)_0%,_transparent_70%)]"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandHero;