"use client";

import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="
  general-space
  overflow-hidden
  
  pt-[112px]
  md:pt-[124px]

  mx-auto
  
">

      <div className="
  grid
  grid-cols-1
  lg:grid-cols-2
  items-center
  gap-12
  lg:gap-16
  w-full
  h-full
  max-w-[1440px]
  mx-auto
">

  {/* LEFT */}
<div className="
  w-full
  flex
  flex-col
  lg:items-start
  items-center
  gap-10
  xl:gap-14
  justify-center
">
  <h1
    className="
      text-center lg:text-left
      font-[600] text-dark-navy
      tracking-[-0.02em]
      leading-[1.2]
      text-[34px]
      md:text-[48px]
      xl:text-[60px]
      
    "
  >
    Empowering creators,<br />
    Engaging brands
  </h1>

  <p
    className="
      text-center lg:text-left
      font-[300] text-neut/50
      text-[18px] leading-[1.5]
      md:text-[20px] 
      xl:text-[24px] 
      max-w-[650px]
      mx-auto lg:mx-0 fontweight-light
    "
  >
    Starix connects brands with creators through fun,
    <br className="hidden lg:block" />
    rewarding challenges that turn creativity into
    <br className="hidden lg:block" />
    measurable impact
  </p>

  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
    <Link
      href="/login"
      className="
        w-full sm:w-auto
        inline-flex items-center justify-center
        rounded-full
        border border-dark-navy/50
        bg-white
        h-[56px] px-8
        text-dark-navy
        text-[16px] xl:text-[20px]
        font-[500]
        transition-all duration-200
        hover:bg-dark-navy hover:text-white
      "
    >
      Join as a Creator
    </Link>

    <Link
      href="/login"
      className="
        w-full sm:w-auto
        inline-flex items-center justify-center
        rounded-full
        bg-dark-navy
        h-[56px] px-8
        text-white
        text-[16px] xl:text-[20px]
        font-[500]
        transition-all duration-200
        hover:opacity-95
      "
    >
      Join as a Brand
    </Link>
  </div>
</div>


      
{/* RIGHT */}
<div className="relative w-full flex justify-center lg:justify-end">

  <div
    className="
      relative mx-auto w-full max-w-[780px]
      aspect-[1.62/1]
      rounded-2xl
      overflow-visible
      group
    "
  >
    {/* GRID BACKGROUND */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        backgroundImage: "url('/gridLayer.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "110%", // keep your bigger grid
        backgroundPosition: "center",
      }}
    />

    {/* ICON LAYER */}
<div
  className="
    relative z-20
    flex flex-row items-center justify-center gap-4
    md:absolute md:inset-0 md:block
    md:-translate-x-[12%]
    transition-transform duration-300 ease-out
    pointer-events-none
  "
>
  {/* BADGE */}
  <div
    className="
      relative md:absolute
      md:left-[34%] md:top-[26%]
      md:-translate-x-1/2 md:-translate-y-1/2

      w-[170px] h-[170px]
      sm:w-[200px] sm:h-[200px]
      md:w-[451px] md:h-[451px]
      lg:w-[495px] lg:h-[495px]
      xl:w-[539px] xl:h-[539px]

      max-md:scale-[1.7]

      bg-no-repeat bg-contain bg-center
      rotate-[10deg]
      transition-transform duration-300 ease-out
      will-change-transform
      group-hover:rotate-[20deg]
    "
    style={{ backgroundImage: "url('/badge4x.png')" }}
  />

  {/* SWEET */}
  <div
    className="
      relative md:absolute
      md:left-[56%] md:top-[52%]
      md:-translate-x-1/2 md:-translate-y-1/2

      w-[72px] h-[72px]
      sm:w-[72px] sm:h-[72px]
      md:w-[114px] md:h-[114px]
      lg:w-[150px] lg:h-[150px]

      max-md:scale-[2.0]

      bg-no-repeat bg-contain bg-center
      transition-transform duration-300 ease-out
      will-change-transform
    "
    style={{ backgroundImage: "url('/rings4x.png')" }}
  />

  {/* STAR */}
  <div
    className="
      relative md:absolute
      md:left-[82%] md:top-[74%]
      md:-translate-x-1/2 md:-translate-y-1/2

      w-[150px] h-[150px]
      sm:w-[180px] sm:h-[180px]
      md:w-[374px] md:h-[374px]
      lg:w-[429px] lg:h-[429px]
      xl:w-[484px] xl:h-[484px]

      max-md:scale-[1.6]

      bg-no-repeat bg-contain bg-center
      rotate-[-10deg]
      transition-transform duration-300 ease-out
      will-change-transform
      group-hover:rotate-[-20deg]
    "
    style={{ backgroundImage: "url('/star4x.png')" }}
  />
</div>

  </div>
</div>



      </div>
    </section>
  );
};

export default Hero;
