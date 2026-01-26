"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen lg:min-h-[90vh] pt-24 pb-12 lg:pt-32 overflow-hidden bg-[#fafafa] flex flex-col justify-center">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">

        {/* Left Column: Text & CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] xl:text-[5rem] font-bold text-dark-navy leading-[1.1] tracking-tight">
            Empowering creators,<br className="hidden lg:block" /> Engaging brands
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neut/70 max-w-xl font-light leading-relaxed">
            Starix connects brands with creators through fun, rewarding challenges that turn creativity into measurable impact.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/signup?role=creator"
              className="
                w-full sm:w-auto px-8 py-4
                bg-white text-dark-navy
                border border-secondary-100
                rounded-full font-medium
                transition-all duration-300
                hover:bg-secondary-100 hover:text-white
                shadow-sm text-center
              "
            >
              Join as a Creator
            </Link>

            <Link
              href="/signup?role=brand"
              className="
                w-full sm:w-auto px-8 py-4
                bg-secondary-100 text-white
                border border-secondary-100
                rounded-full font-medium
                transition-all duration-300
                hover:bg-white hover:text-dark-navy
                shadow-sm text-center
              "
            >
              Join as a Brand
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Composition */}
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh] flex items-center justify-center select-none group">

          {/* Background Grid/Pattern */}
          <div className="absolute inset-0 z-0 flex items-center justify-center lg:justify-end">
             <div className="relative w-[120%] h-[120%] lg:w-full lg:h-full">
                <Image
                    src="/hero-bg.png"
                    alt="Background Pattern"
                    fill
                    className="object-contain lg:object-right opacity-90"
                    priority
                />
             </div>
          </div>

          {/* Composition Container */}
          <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] z-10">
              
              {/* Rings (Center) */}
              <div className="absolute inset-0 z-10 transition-transform duration-700 group-hover:scale-105">
                  <Image src="/rings4x.png" alt="Rings" fill className="object-contain" priority />
              </div>

              {/* Badge (Top Left) */}
              <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 z-20 transition-transform duration-500 group-hover:-rotate-12 group-hover:-translate-y-4">
                  <Image src="/badge4x.png" alt="Badge" fill className="object-contain rotate-12" />
              </div>

              {/* Star (Bottom Right) */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 z-20 transition-transform duration-500 group-hover:rotate-12 group-hover:translate-y-4">
                  <Image src="/star4x.png" alt="Star" fill className="object-contain -rotate-6" />
              </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
