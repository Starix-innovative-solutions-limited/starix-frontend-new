"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"

const sections = [
  {
    id: "discovering",
    title: "Discovering Trends Early",
    problemContent: "Build campaigns with real creators that aligns with your brand story.",
    solutionContent: "See what's working before everyone else does. Data that tells you where attention is moving.",
    solutionTitle: "Trend Intelligence",
    image: "/horoscope.svg",
    activeColor: "#D6EFFF",
    imageStyles: {
      width: "210%",
      height: "180%",
      bottom: "-20px",
      right: "-40px",
      scale: "scale-110",
    }
  },
  {
    id: "analytics",
    title: "Understanding Analytics",
    problemContent: "Numbers everywhere. No clarity on what actually worked.",
    solutionContent: "Real numbers tied to real performance. Know what's working, what's not, and why.",
    solutionTitle: "Creator Analytics",
    image: "/charts.svg",
    activeColor: "#F5EFF4",
    imageStyles: {
      width: "180%",
      height: "120%",
      bottom: "-80px",
      right: "-60px",
      scale: "scale-100",
    }
  },
  {
    id: "quality",
    title: "Managing UGC Quality",
    problemContent: "Content comes in. Most of it misses the mark. No way to fix it at scale.",
    solutionContent: "Every submission rated before you review it. Less noise, better content, faster decisions.",
    solutionTitle: "Quality Control",
    image: "/hand.svg",
    activeColor: "#F5EFF4",
    imageStyles: {
      width: "180%",
      height: "140%",
      bottom: "-40px",
      right: "-45px",
      scale: "scale-105",
    }
  },
  {
    id: "opportunities",
    title: "Getting Opportunities",
    problemContent: "Creators pitch into the void. Brands pick in the dark. Nobody wins.",
    solutionContent: "Creators find briefs that match their strengths. Brands get submissions from people who fit.",
    solutionTitle: "Open Opportunities",
    image: "/or-sweet.svg",
    activeColor: "#FFE6DB",
    imageStyles: {
      width: "230%",
      height: "180%",
      bottom: "-95px",
      right: "-95px",
      scale: "scale-90",
    }
  },
]

const WhyStarix = () => {
  const [open, setOpen] = useState("discovering")
  const activeSection = sections.find((s) => s.id === open) || sections[0];

  const handleToggle = (id: string) => {
    setOpen(id);
  };

  return (
    <div className="flex w-full flex-col items-center bg-white px-4 pt-12 pb-16 font-sans md:px-6 md:pb-20 xl:px-0">
      
      <h1 className="mb-8 max-w-[340px] text-left font-['Geist'] text-[32px] font-medium leading-[1.1] tracking-[-0.04em] text-[#040136] md:mb-10 md:max-w-[640px] md:text-[48px] xl:max-w-fit xl:text-[64px]">
        <span className="block">Why the current system</span>
        <span className="flex items-center">
          <span className="invisible max-xl:hidden whitespace-pre select-none" aria-hidden="true">Why the </span>
          <span className="xl:pb-4">fails</span>
          <span className="inline-block">
            <Image
              src="/chain.svg"
              alt="link"
              width={130}
              height={88}
              className="h-auto w-[80px] md:w-[100px] xl:w-[130px]"
            />
          </span>
          <span className="text-[#2F3CFF] xl:pb-4">both sides</span>
        </span>
      </h1>

      <div className="grid w-full max-w-[1400px] grid-cols-1 gap-5 md:gap-6 xl:h-[565px] xl:grid-cols-[480px_1fr] xl:gap-8 xl:px-6">
        
        <div className="flex h-auto flex-col rounded-[28px] bg-[#F9F9FB] p-4 md:rounded-[32px] md:p-6 xl:h-full">
          <div className="mb-4 pt-2 md:mb-6 md:pt-6">
            <span className="inline-block rounded-full bg-[#FE342614] px-4 py-2 text-[12px] font-semibold tracking-widest text-[#FD6C1D] uppercase md:text-[16px]">
              THE PROBLEM
            </span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar">
            {sections.map((item) => {
              const isOpen = open === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  style={{ backgroundColor: isOpen ? item.activeColor : '#FFFFFF' }}
                  className={`relative overflow-hidden rounded-[22px] border transition-all duration-500 ease-in-out cursor-pointer md:rounded-[24px] ${
                    isOpen
                      ? "min-h-[168px] border-white/60 scale-[1.01] md:min-h-0"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  {isOpen && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-white/10 to-transparent" />
                  )}

                  <div className="relative z-10 flex items-start justify-between p-5 md:p-6">
                    <div className="min-w-0 flex-1 pr-2">
                      <h2 
                        className={`font-medium leading-tight transition-colors duration-300 ${
                          isOpen
                            ? "max-w-[180px] text-[24px] text-[#040136] md:max-w-[200px] md:text-[28px]"
                            : "text-[20px] text-[#6E6E6E] md:text-[28px]"
                        }`}
                      >
                        {item.title}
                      </h2>
                      
                      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="max-w-[200px] text-[14px] leading-relaxed font-medium text-[#296287] md:max-w-[220px] md:text-[15px]">
                            {item.problemContent}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`ml-2 shrink-0 transition-all duration-500 ${isOpen ? "rotate-180 text-[#040136]" : "rotate-0 text-[#A1A7C4]"}`}>
                      {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="pointer-events-none absolute right-[-8px] bottom-[-6px] h-[150px] w-[170px] md:right-[35px] md:bottom-[30px] md:h-[100px] md:w-[140px]">
                      <Image
                        src={item.image}
                        alt="visual"
                        fill
                        sizes="(max-width: 768px) 170px, 140px"
                        className="object-contain object-right-bottom scale-125 md:scale-160"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div 
          style={{ backgroundColor: activeSection.activeColor }}
          className="relative hidden min-h-[420px] flex-col overflow-hidden rounded-[32px] border border-white/40 transition-colors duration-700 ease-in-out md:flex md:min-h-[480px] xl:h-full xl:min-h-0 xl:rounded-[40px]"
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/50 via-transparent to-black/5" />
          
          <div className="relative z-20 p-8 xl:p-11">
            <span className="inline-block rounded-full bg-[#0033FF0D] px-5 py-2 text-[14px] font-semibold tracking-widest text-[#2F3CFF] uppercase backdrop-blur-xl saturate-150 xl:px-6 xl:text-[16px]">
                THE SOLUTION
            </span>
          </div>

          <div className="grid h-full grid-cols-1 items-end p-6 md:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.3fr_1fr]">
            <div className="relative z-20">
              <h2 className="mb-4 text-[36px] leading-[0.95] font-normal tracking-normal text-[#040136] xl:text-[48px]">
                {activeSection.solutionTitle.split(' ')[0]} <br /> 
                <span className="text-[#040136]">{activeSection.solutionTitle.split(' ')[1] || ''}</span>
              </h2>
              
              <p className="max-w-[400px] animate-in fade-in slide-in-from-bottom-2 text-[18px] leading-relaxed font-normal text-[#64748B] duration-700 xl:text-[20px]">
                {activeSection.solutionContent}
              </p>
            </div>

            <div className="pointer-events-none relative h-full min-h-[220px] w-full">
              <div 
                className={`absolute transition-all duration-1000 ease-out ${activeSection.imageStyles.scale}`}
                style={{ 
                  bottom: activeSection.imageStyles.bottom, 
                  right: activeSection.imageStyles.right, 
                  width: activeSection.imageStyles.width, 
                  height: activeSection.imageStyles.height 
                }}
              >
                <Image
                  key={activeSection.id}
                  src={activeSection.image}
                  alt="Solution Visual"
                  fill
                  sizes="(max-width: 1280px) 100vw, 560px"
                  className="object-contain object-right-bottom p-8 animate-in fade-in zoom-in-95 slide-in-from-right-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyStarix
