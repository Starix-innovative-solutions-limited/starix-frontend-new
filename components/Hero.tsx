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
          Brands get quality <span className="text-[#050E81]">contents.</span>
        </h1>

        <p className="mt-6 text-[#6B7280] text-[16px] md:text-[26px] max-w-[750px] mx-auto leading-[1.05] tracking-[-1%] font-medium ">
          <span className="font-semibold text-[#0b048c]">starix</span> is where creators find challenges worth entering and brands find partners worth trusting.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-full border-2 border-[#0033FF] text-[#0033FF] text-[16px] md:text-[20px] font-medium hover:shadow-sm transition-all"
          >
            Join as a Creator
          </Link>

          <Link
            href="/signup?role=brand"
            className="px-8 py-4 rounded-full bg-[#0033FF] border-2 border-[#0033FF] text-white text-[16px] md:text-[20px] font-medium hover:shadow-sm transition-all"
          >
            Join as a Brand
          </Link>
        </div>
      </div>

      {/* --- UPDATED ANIMATION CONTAINER --- */}
    {/* --- UPDATED FULL-WIDTH ANIMATION CONTAINER --- */}
      <div 
        className="absolute pointer-events-none overflow-hidden"
        style={{ 
          width: '100%',     // Spans the full width of the section
          height: '500px',   // Slightly increased height for better coverage
          top: '500px',      // Adjusted position to sit below text
          left: '0',         // Locked to the left edge
          zIndex: 0 
        }}
      >
        {animationData && (
          <Lottie 
            animationData={animationData} 
            loop={true} 
            autoplay={true}
            style={{ 
              width: '100%', 
              height: '100%' 
            }}
            rendererSettings={{
              // "slice" acts like object-cover, ensuring it touches edges 
              // even if the aspect ratio doesn't match perfectly.
              preserveAspectRatio: "xMidYMid slice" 
            }}
          />
        )}
      </div>

    </section>
  );
};

export default Hero;