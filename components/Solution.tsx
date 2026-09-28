import React from "react"
import Image from "next/image"

const Solution = () => {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#fff] px-4 py-12 font-sans md:px-8 md:py-14 xl:px-6 xl:py-14">
      
      <div className="p-2">
        <span className="inline-block rounded-full border border-white/30 bg-[#0033FF1F] px-4 py-1 text-[13px] font-semibold tracking-none text-[#0033FF] uppercase backdrop-blur-md md:text-[14px] xl:text-[16px]">
          THE SOLUTION
        </span>
      </div>

      <div className="grid w-full max-w-[1300px] grid-cols-1 items-center md:grid-cols-[1.2fr_1fr_1.2fr]">
        
        <div className="z-20 p-5 text-center md:p-4 md:text-left xl:p-6">
          <h2 className="font-['Geist'] text-[32px] leading-[0.9] font-normal tracking-tight text-[#040136] md:text-[36px] xl:text-[48px]">
            <span className="text-[#0033FF]">Brands</span> <br />
            <span className="font-light">post</span>{" "}
            <br className="hidden md:block" />
            <span className="font-light">challenges.</span>
          </h2>
        </div>

        <div className="relative flex h-[280px] w-full items-center justify-center md:h-[400px] xl:h-[450px]">
          <div className="absolute top-1/2 left-[10%] z-10 h-[220px] w-[180px] -translate-y-1/2 md:left-[-22%] md:h-[340px] md:w-[230px] xl:left-[-25%] xl:h-[400px] xl:w-[280px]">
            <div className="relative h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
               <Image 
                src="/ribbons.svg" 
                alt="3D Ribbon" 
                fill 
                sizes="(max-width: 768px) 180px, (max-width: 1280px) 230px, 280px"
                className="scale-110 rotate-[-4deg] object-contain"
              />
            </div>
          </div>

          <div className="absolute top-1/2 right-[1%] z-20 h-[240px] w-[220px] -translate-y-1/2 md:right-[-24%] md:h-[260px] md:w-[290px] xl:right-[-30%] xl:h-[326px] xl:w-[366px]">
            <div className="relative h-full w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.18)]">
              <Image 
                src="/bstars.svg" 
                alt="3D Star" 
                fill 
                sizes="(max-width: 768px) 200px, (max-width: 1280px) 290px, 366px"
                className="scale-105 rotate-[2deg] object-contain"
              />
            </div>
          </div>
        </div>

        <div className="z-20 p-5 text-center md:p-4 md:text-right xl:p-6">
          <h2 className="font-['Geist'] text-[32px] leading-[0.9] font-normal tracking-tight text-[#040136] md:text-[36px] xl:text-[48px]">
            <span className="text-[#FF6B00]">Creators</span> <br />
            <span className="font-light">make</span>{" "}
            <br className="hidden md:block" />
            <span className="font-light">content.</span>
          </h2>
        </div>
      </div>

      <div className="z-20 mt-6 text-center md:mt-4">
        <p className="font-['Geist'] text-[22px] leading-none font-normal tracking-tighter text-[#040136] md:text-[28px] xl:text-[36px]">
          The best work wins. <br />
          Simple system, clear outcomes.
        </p>
      </div>

    </section>
  )
}

export default Solution
