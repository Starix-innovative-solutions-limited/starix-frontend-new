"use client"

import React from "react"
import Image from "next/image"

const Solution = () => {
  return (
    <section className="w-full bg-[#fff] py-14 px-6 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* 1. THE BADGE: Smaller, tighter padding, subtle blue tint */}
      <div className=" p-2">
        <span className="inline-block px-4 py-1 rounded-full text-[16px] font-semibold text-[#0033FF] 
          bg-[#0033FF1F] backdrop-blur-md border border-white/30 uppercase tracking-none">
          THE SOLUTION
        </span>
      </div>

      {/* 2. CONTENT GRID: Shifted to match the 3-column editorial feel */}
      <div className="max-w-[1300px] w-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1.2fr] items-center">
        
        {/* Brands Side: Very tight line height, distinct bold/medium weights */}
        <div className="p-6 text-center md:text-left z-20">
          <h2 className="text-[32px] md:text-[48px] leading-[0.9] font-regular tracking-tight text-[#040136]">
            <span className="text-[#0033FF]">Brands</span> <br />
            <span className="font-light">post</span> <br />
            <span className="font-light">challenges.</span>
          </h2>
        </div>

        {/* Center Assets: The "Sweet Spot" Overlap */}
        <div className="relative flex items-center justify-center w-full h-[350px] md:h-[450px]">
          {/* Ribbon: Leaning left and slightly behind */}
          <div className="absolute left-[-10%] md:left-[-25%] top-1/2 -translate-y-1/2 w-[280px] h-[400px] z-10">
            <div className="relative w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
               <Image 
                src="/ribbons.svg" 
                alt="3D Ribbon" 
                fill 
                sizes="280px"
                className="object-contain rotate-[-4deg] scale-110"
                priority
              />
            </div>
          </div>

          {/* Star: Centered and leaning right, sitting in front */}
          <div className="absolute right-[-5%] md:right-[-30%] top-1/2 -translate-y-1/2 w-[366px] h-[326px] z-20">
            <div className="relative w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.18)]">
              <Image 
                src="/bstars.svg" 
                alt="3D Star" 
                fill 
                sizes="366px"
                className="object-contain rotate-[-5deg] scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* Creators Side: Right aligned with the specific orange tint */}
        <div className="text-center p-6 md:text-right z-20">
          <h2 className="text-[32px] md:text-[48px] leading-[0.9] font-regular tracking-tight text-[#040136]">
            <span className="text-[#FF6B00]">Creators</span> <br />
            <span className="font-light">make</span> <br />
            <span className="font-light">content.</span>
          </h2>
        </div>
      </div>

      {/* 3. FOOTER: Larger, heavier emphasis on "The best work wins" */}
      <div className="mt-4 text-center z-20">
        <p className="text-[#040136] text-[24px] md:text-[36px] font-regular tracking-tighter leading-none">
          The best work wins. <br />
          Simple system, clear outcomes.
        </p>
        
      </div>

    </section>
  )
}

export default Solution