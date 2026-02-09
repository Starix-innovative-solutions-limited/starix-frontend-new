"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"

const sections = [
  {
    id: "discovering",
    title: "Discovering Trends Early",
    content: "Build campaigns with real creators that aligns with your brand story.",
  },
  {
    id: "analytics",
    title: "Understanding Analytics",
    content: "Build campaigns with real creators that aligns with your brand story.",
  },
  {
    id: "quality",
    title: "Managing UGC Quality",
    content: "Build campaigns with real creators that aligns with your brand story.",
  },
  {
    id: "opportunities",
    title: "Getting Opportunities",
    content: "Build campaigns with real creators that aligns with your brand story.",
  },
]

const WhyStarix = () => {
  const [open, setOpen] = useState("discovering")

  return (
    <div className="w-full bg-[#EEF2FF] min-h-screen flex flex-col items-center pt-[48px] md:pt-[90px]">

      {/* Title */}
      <h1 className="text-[#0B0F3C] text-[28px] md:text-[40px] font-semibold text-center mb-[36px] md:mb-[70px]">
        Why Starix Works Better
      </h1>

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-[1300px] grid grid-cols-1 md:grid-cols-[420px_1fr] gap-[32px] px-[20px] md:px-0">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-[#E6ECFF] rounded-[28px] p-[20px] md:p-[28px] mb-[48px] w-full">


          <span className="inline-block bg-[#FFFFFF] text-[#B0B0B0] text-[12px] px-[14px] py-[6px] rounded-[8px] mb-[28px]">
            THE PROBLEM
          </span>

          {/* DESKTOP STACK — CLEAN / SMART */}
<div className="hidden md:flex flex-col gap-5">

  {sections.map((item) => {
    const isOpen = open === item.id

    return (
      <div
        key={item.id}
        className={`
          w-full rounded-2xl bg-white border transition-colors
          ${isOpen ? "border-[#0B0F3C]" : "border-[#E1E6FF]"}
        `}
      >
        <button
          onClick={() => setOpen(isOpen ? "" : item.id)}
          className="w-full flex justify-between items-start text-left px-6 py-5"
        >
          {/* Text */}
          <div className="flex-1 pr-4">
            <h2 className="text-[#0B0F3C] text-[22px] font-medium mb-3">
              {item.title}
            </h2>

            {isOpen && (
              <p className="text-[#B5B5B5] text-[15px] leading-[24px] max-w-[340px]">
                {item.content}
              </p>
            )}
          </div>

          {/* Icon */}
          <div className="mt-1">
            {isOpen ? (
              <Minus size={18} className="text-[#0B0F3C]" />
            ) : (
              <Plus size={18} className="text-[#0B0F3C]" />
            )}
          </div>
        </button>
      </div>
    )
  })}

</div>


          {/* MOBILE SCROLL */}
          <div className="flex gap-[18px] overflow-x-auto md:hidden">

            {sections.map((item) => {
              const isOpen = open === item.id
              return (
                <div
                  key={item.id}
                  className={`
                    min-w-[240px] rounded-[24px] p-[20px]
                    ${isOpen ? "bg-white border border-[#0B0F3C]" : "bg-[#F3F6FF]"}
                  `}
                >
                  <h2
                    className={`
                      text-[22px] font-medium mb-[14px]
                      ${isOpen ? "text-[#0B0F3C]" : "text-[#8F94B2]"}
                    `}
                  >
                    {item.title}
                  </h2>

                  <p
                    className={`
                      text-[15px] leading-[24px]
                      ${isOpen ? "text-[#B5B5B5]" : "text-[#C5C8DA]"}
                    `}
                  >
                    {item.content}
                  </p>
                </div>
              )
            })}

          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white rounded-[28px] p-[20px] md:p-[28px] relative mb-[48px]">


          <span className="inline-block bg-[#F4F6FF] text-[#0B0F3C] text-[12px] px-[14px] py-[6px] rounded-[8px] mb-[28px]">
            THE SOLUTION
          </span>

          {/* MOBILE */}
<div className="block md:hidden">

  {/* Text + heart row */}
  <div className="flex justify-between items-start mb-[14px]">

    <div>
      <h2 className="text-[#0B0F3C] text-[20px] font-medium leading-[24px] mb-[6px]">
        Trend Intelligence
      </h2>

      <p className="text-[#B5B5B5] text-[14px] leading-[22px] max-w-[260px]">
        Build campaigns with real creators that aligns with your brand story.
      </p>
    </div>

    {/* Heart */}
    <Image
      src="/heart12.png"
      alt="heart"
      width={42}
      height={42}
      className="mt-[2px]"
    />
  </div>

  {/* Image */}
<div className="rounded-[18px] overflow-hidden mt-[10px] h-[240px] relative">
  <Image
    src="/why-star.png"
    alt="dashboard"
    fill
    className="object-cover object-top"
  />
</div>

</div>



          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-[1fr_1.4fr] h-full ml-[-6px]">

            {/* TEXT COLUMN */}
            <div className="flex flex-col justify-start pt-[12px]">

              <h2 className="text-[#0B0F3C] text-[28px] font-medium mb-[12px]">
                Trend Intelligence
              </h2>

              <p className="text-[#B5B5B5] text-[16px] leading-[26px] max-w-[320px]">
                Build campaigns with real creators that aligns with your brand story.
              </p>

              <Image
                src="/heart12.png"
                alt="heart"
                width={90}
                height={90}
                className="mt-[32px]"
              />
            </div>

            {/* IMAGE COLUMN */}
        <div className="relative w-full h-full flex justify-end items-end overflow-hidden">

        <Image
            src="/why-star.png"
            alt="dashboard"
            width={820}
            height={820}
            className="object-contain translate-x-[5%] translate-y-[-6.5%]"
            />


        </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default WhyStarix
