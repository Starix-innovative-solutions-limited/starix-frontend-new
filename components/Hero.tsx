"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";

const Hero = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("/animations/hero-anime.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading Lottie animation:", error);
      }
    };

    fetchAnimation();
  }, []);

  return (
    <section className="relative w-full min-h-[1000px] bg-[#E1F2FE] flex flex-col items-center justify-start pt-16 px-4 overflow-hidden">
      
      {/* TEXT CONTENT */}
      <div className="text-center max-w-[1100px] mx-auto mt-15 z-10">
        <h1 className="text-[42px] md:text-[72px] lg:text-[80px] font-medium text-[#040136] leading-[1.05] tracking-[-3px]">
          Creators get <span className="text-[#FF5C00]">paid.</span><br />
          Brands get quality <span className="text-[#2F3CFF]">contents.</span>
        </h1>

        <p className="mt-6 text-[#6B7280] text-[16px] md:text-[26px] max-w-[750px] mx-auto leading-[1.05] tracking-[-1%] font-medium ">
          <span className="font-semibold text-[#0b048c]">starix</span> is where creators find challenges worth entering and brands find partners worth trusting.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-full border-2 border-[#040136] text-[#040136] text-[16px] md:text-[20px] font-medium hover:shadow-lg transition-all"
          >
            Join as a Creator
          </Link>

          <Link
            href="/signup?role=brand"
            className="px-8 py-4 rounded-full bg-[#040136] border-2 border-[#040136] text-white text-[16px] md:text-[20px] font-medium hover:shadow-lg transition-all"
          >
            Join as a Brand
          </Link>
        </div>
      </div>

      {/* FULL WIDTH LOTTIE ANIMATION */}
      <div className="absolute bottom-0 left-0 w-screen flex justify-center pointer-events-none overflow-hidden">
        {/* Removed max-w-screen and max-w-[1400px] to allow full bleed */}
        <div className="w-full">
          {animationData && (
            <Lottie 
              animationData={animationData} 
              loop={true} 
              autoplay={true}
              // This prop is key for full-bleed animations to ensure they fill the space
              rendererSettings={{
                preserveAspectRatio: "xMidYMax slice" 
              }}
              className="w-full h-auto"
            />
          )}
        </div>
      </div>

    </section>
  );
};

export default Hero;