"use client";

import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="
        general-space
        overflow-hidden
        mx-auto
        my-5

        /* HEIGHT CONTROL */
      
        
        lg:min-h-[80vh]
      "
    >
      <div
        className="
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
        "
      >
        {/* ================= LEFT ================= */}
        <div
          className="
            w-full
            flex
            flex-col
            lg:items-start
            items-center
            gap-12
            xl:gap-16
            justify-center
          "
        >
          <h1
            className="
              text-center lg:text-left
              font-[600]
              text-dark-navy
              tracking-[-0.02em]
              leading-[1.2]
              text-[36px]
              md:text-[50px]
              xl:text-[60px]
            "
          >
            Empowering creators,<br />
            Engaging brands
          </h1>

          <p
            className="
              text-center lg:text-left
              font-[300]
              text-[#6e6e6e]
              text-[18px]
              leading-[1.6]
              md:text-[20px]
              xl:text-[24px]
              max-w-[680px]
              mx-auto lg:mx-0
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
              w-full sm:w-[193px]
              h-[68px]
              inline-flex items-center justify-center
              gap-[6px]

              rounded-[40px]
              border-2 border-dark-navy
              bg-white

              px-[18px] py-[6px]

              text-dark-navy
              text-[16px] xl:text-[20px]
              font-medium

              transition-all duration-300
                hover:opacity-95
                hover:bg-[#bebcbc]
             
            "

            >
              Join as a Creator
            </Link>

            <Link
              href="/login"
              className="
                inline-flex items-center justify-center
                w-[193px]
                h-[68px]
                gap-[6px]

                rounded-[40px]
                bg-dark-navy

                px-[18px] py-[6px]

                text-white
                text-[16px] xl:text-[20px]
                font-medium

                transition-all duration-200
                hover:opacity-95
                hover:shadow-lg
              "
            >
              Join as a Brand
            </Link>

          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative w-full flex justify-center lg:justify-end">
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[820px]
              aspect-[1.62/1]
              rounded-2xl
              overflow-visible
              group
            "
          >
            {/* GRID BACKGROUND */}
            <div
              className="absolute inset-0 rounded-2xl min-h-[600px]"
              style={{
                backgroundImage: "url('/gridLayer.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "110%",
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

                  w-[180px] h-[180px]
                  sm:w-[210px] sm:h-[210px]
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

                  w-[76px] h-[76px]
                  sm:w-[76px] sm:h-[76px]
                  md:w-[114px] md:h-[114px]
                  lg:w-[175px] lg:h-[175px]

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

                  w-[160px] h-[160px]
                  sm:w-[190px] sm:h-[190px]
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
