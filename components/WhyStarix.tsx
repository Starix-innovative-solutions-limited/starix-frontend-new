"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"

const sections = [
  {
    id: "discovering",
    title: "Discovering Trends Early",
    // LEFT SIDE CONTENT (The Problem)
    problemContent: "Build campaigns with real creators that aligns with your brand story.",
    // RIGHT SIDE CONTENT (The Solution)
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
    <div className="w-full bg-white flex flex-col items-center pt-12 pb-20 font-sans">
      
      {/* HEADER SECTION */}
      <h1 className="text-[#040136] text-[32px] md:text-[64px] font-regular text-left max-w-fit leading-[1.1] mb-8 tracking-[-0.04em]">
        <span className="block">Why the current system</span>
        <span className="flex items-center">
          <span className="invisible select-none whitespace-pre" aria-hidden="true">Why the </span>
          <span className="pb-4">fails</span>
          <span className="inline-block align-center ">
            <Image src="/chain.svg" alt="link" width={130} height={88} className="w-[130px] h-auto" />
          </span>
          <span className="text-[#2F3CFF] pb-4">both sides</span>
        </span>
      </h1>

      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-8 px-6 h-[565px]">
        
        {/* LEFT PANEL (Problem View) */}
        <div className="bg-[#F9F9FB] rounded-[32px] p-6 h-full flex flex-col ">
          <div className="mb-6 pt-6">
            <span className="inline-block bg-[#FE342614] text-[#FD6C1D] text-[16px] font-semibold px-4 py-2 rounded-full uppercase tracking-widest">
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
                  className={`relative rounded-[24px] transition-all duration-500 ease-in-out cursor-pointer overflow-hidden border ${
                    isOpen ? "border-white/60  scale-[1.01]" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Glossy Overlay */}
                  {isOpen && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/10 to-transparent pointer-events-none" />
                  )}

                  <div className="flex justify-between items-start p-6 relative z-10">
                    <div className="flex-1">
                      <h2 
                        className={`text-[28px] font-medium leading-tight transition-colors duration-300 ${
                          isOpen ? "max-w-[200px] text-[#040136]" : "text-[#6E6E6E]"
                        }`}
                      >
                        {item.title}
                      </h2>
                      
                      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          {/* UPDATED TO problemContent */}
                          <p className="text-[#296287] text-[15px] leading-relaxed max-w-[220px] font-medium">
                            {item.problemContent}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`flex-shrink-0 ml-4 transition-all duration-500 ${isOpen ? "text-[#040136] rotate-180" : "text-[#A1A7C4] rotate-0"}`}>
                      {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="absolute right-[35px] bottom-[30px] w-[140px] h-[100px] pointer-events-none">
                      <Image
                        src={item.image}
                        alt="visual"
                        fill
                        className="object-contain object-right-bottom scale-160"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT PANEL (Solution View) */}
        <div 
          style={{ backgroundColor: activeSection.activeColor }}
          className="rounded-[40px] relative overflow-hidden h-full flex flex-col border border-white/40 transition-colors duration-700 ease-in-out "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-black/5 pointer-events-none z-10" />
          
          <div className="relative p-11 z-20">
            <span className="inline-block px-6 py-2 rounded-full uppercase tracking-widest text-[16px] font-semibold text-[#2F3CFF] bg-[#0033FF0D] backdrop-blur-xl saturate-150 ">
                THE SOLUTION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] p-6 h-full items-end ">
            <div className="relative  z-20">
              <h2 className="text-[#040136] text-[32px] md:text-[48px] leading-[0.95] font-regular mb-4 tracking-normal">
                {activeSection.solutionTitle.split(' ')[0]} <br /> 
                <span className="text-[#040136]">{activeSection.solutionTitle.split(' ')[1] || ''}</span>
              </h2>
              
              {/* UPDATED TO solutionContent */}
              <p className="text-[#64748B] text-[18px] md:text-[20px] leading-relaxed max-w-[400px] font-regular animate-in fade-in slide-in-from-bottom-2 duration-700">
                {activeSection.solutionContent}
              </p>
            </div>

            <div className="relative h-full w-full pointer-events-none">
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
                  priority
                  className="object-contain p-8 object-right-bottom animate-in fade-in zoom-in-95 slide-in-from-right-12"
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