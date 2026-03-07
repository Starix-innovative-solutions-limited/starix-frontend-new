"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"

const sections = [
  {
    id: "discovering",
    title: "Discovering Trends Early",
    content: "Build campaigns with real creators that aligns with your brand story.",
    image: "/whystarix.png",
  },
  {
    id: "analytics",
    title: "Understanding Analytics",
    content: "Build campaigns with real creators that aligns with your brand story.",
    image: "/whystarix2.png",
  },
  {
    id: "quality",
    title: "Managing UGC Quality",
    content: "Build campaigns with real creators that aligns with your brand story.",
    image: "/whystarix3.png",
  },
  {
    id: "opportunities",
    title: "Getting Opportunities",
    content: "Build campaigns with real creators that aligns with your brand story.",
    image: "/whystarix2.png",
  },
]

const WhyStarix = () => {
  // Initialize with the first ID to ensure one is always active
  const [open, setOpen] = useState("discovering")

  const activeSection = sections.find((s) => s.id === open) || sections[0];

  return (
    <div className="w-full bg-[#EEF2FF] min-h-screen flex flex-col items-center pt-[48px] md:pt-[90px] pb-20">
      <h1 className="text-[#0B0F3C] text-[28px] md:text-[40px] font-semibold text-center mb-[36px] md:mb-[70px]">
        Why Starix Works Better
      </h1>

      {/* MAIN WRAPPER: minmax prevents the left panel from squishing the right one */}
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[minmax(380px,_480px)_1fr] gap-[32px] px-[20px] md:px-10">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-[#E6ECFF] rounded-[28px] p-[20px] md:p-[28px] h-fit">
          <span className="inline-block bg-[#FFFFFF] text-[#B0B0B0] text-[12px] px-[14px] py-[6px] rounded-[8px] mb-[28px]">
            THE PROBLEM
          </span>

          <div className="hidden lg:flex flex-col gap-5">
            {sections.map((item) => {
              const isOpen = open === item.id
              return (
                <div
                  key={item.id}
                  className={`w-full rounded-2xl bg-white border transition-all duration-300 ${isOpen ? "border-[#0B0F3C]" : "border-[#E1E6FF]"}`}
                >
                  <button
                   
                    onClick={() => setOpen(item.id)} 
                    className="w-full flex justify-between items-start text-left px-6 py-6"
                  >
                    <div className="flex-1 mt-1 pr-4">
                      <h2 className="text-[#040136] py-1 text-[24px] xl:text-[28px] font-normal mb-2">
                        {item.title}
                      </h2>
                      {isOpen && (
                        <p className="text-[#6E6E6E] text-[18px] leading-relaxed max-w-[340px]">
                          {item.content}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      {isOpen ? (
                        <Minus size={20} className="text-[#0B0F3C]" />
                      ) : (
                        <Plus size={20} className="text-[#0B0F3C]" />
                      )}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          {/* MOBILE SCROLL (Prevents shrinking/cramping on small screens) */}
          <div className="flex gap-[18px] overflow-x-auto lg:hidden no-scrollbar pb-4">
            {sections.map((item) => {
              const isOpen = open === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setOpen(item.id)}
                  className={`min-w-[260px] text-left rounded-[24px] p-[20px] transition-colors ${isOpen ? "bg-white border border-[#0B0F3C]" : "bg-[#F3F6FF]"}`}
                >
                  <h2 className={`text-[20px] font-medium mb-[12px] ${isOpen ? "text-[#0B0F3C]" : "text-[#8F94B2]"}`}>
                    {item.title}
                  </h2>
                  <p className={`text-[14px] leading-relaxed ${isOpen ? "text-[#6E6E6E]" : "text-[#C5C8DA]"}`}>
                    {item.content}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white rounded-[28px] p-[24px] md:p-[40px] relative overflow-hidden">
          <span className="inline-block bg-[#F4F6FF] text-[#0B0F3C] text-[12px] px-[14px] py-[6px] rounded-[8px] mb-[28px]">
            THE SOLUTION
          </span>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 h-full">
            <div className="flex flex-col justify-start pt-4 md:pt-[100px]">
              <h2 className="text-[#0B0F3C] text-[28px] md:text-[28px] font-medium mb-4">
                Trend Intelligence
              </h2>
              <p className="text-[#6e6e6e] text-[16px] md:text-[18px] leading-relaxed min-w-[450px] mb-8">
                Build campaigns with real creators <br className="hidden md:block" />
                that aligns with your brand story.
                </p>
              <Image src="/heart12.png" alt="heart" width={80} height={80} className="object-contain" />
            </div>

            <div className="relative w-full h-[320px] md:h-full flex items-end">
            <div className="absolute  bottom-[-40px] right-[-150px] w-[700px] h-[520px] md:w-[820px] md:h-[600px]">
                <Image
                src={activeSection.image}
                alt="dashboard"
                fill
                priority
                className="object-contain object-right"
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