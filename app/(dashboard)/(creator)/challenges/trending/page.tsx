/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FiSearch, FiSliders, FiBarChart2, FiMail, FiClock, FiBookmark, FiShare2 } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";

const TrendingChallenges = ({ isAnySidebarOpen = false }: { isAnySidebarOpen?: boolean }) => {
  const cards = [
    { id: 1, brand: "Nivea", logo: "/nivea.svg", time: "12h ago", niche: ["Beauty", "Family"], prize: "₦10M", deadline: "12h", verified: true, images: ["/left1.svg", "/right1.svg"] },
    { id: 2, brand: "Indomie", logo: "/indomie.svg", time: "2d ago", niche: ["Food", "Family"], prize: "₦8m", deadline: "12h", verified: false, images: ["/right21.svg", "/right22.svg", "/right21.svg"] },
    { id: 3, brand: "Nivea", logo: "/nivea.svg", time: "12h ago", niche: ["Beauty", "Family"], prize: "₦10M", deadline: "12h", verified: true, images: ["/left1.svg", "/right1.svg"] },
    { id: 4, brand: "Indomie", logo: "/indomie.svg", time: "2d ago", niche: ["Food", "Family"], prize: "₦8m", deadline: "12h", verified: false, images: ["/right21.svg", "/right22.svg"] },
    { id: 5, brand: "Indomie", logo: "/indomie.svg", time: "2d ago", niche: ["Food", "Family"], prize: "₦8m", deadline: "12h", verified: false, images: ["/right22.svg", "/right21.svg"] },
    { id: 6, brand: "Nivea", logo: "/nivea.svg", time: "12h ago", niche: ["Beauty", "Family"], prize: "₦10M", deadline: "12h", verified: true, images: ["/left1.svg", "/right1.svg"] },
  ];

  return (
    <div className="min-h-screen bg-white py-6 font-['Geist']">
      <div className="max-w-7xl mx-auto px-4 md:px-1">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Link href="/challenges" className="inline-flex items-center gap-2 text-[#1E1F24] mb-4 hover:opacity-70 transition-opacity">
              <HiArrowLeft size={20} />
            </Link>
            <h1 className="text-[22px] md:text-[24px] font-semibold text-[#000000] tracking-tight">
              Trending Challenges
            </h1>
            <p className="text-[#62636C] text-[12px] mt-1 font-medium">
              You have {cards.length} new campaign matches today
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#E5E7EB] rounded-full text-[14px] font-medium text-[#374151] hover:bg-gray-50 transition-all shrink-0">
              <FiSliders className="rotate-90" />
              Filter
            </button>
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62636C] text-lg" />
              <input 
                type="text" 
                placeholder="Search Challenges"
                className="w-full pl-12 pr-4 py-2.5 bg-[#F9F9FB] border border-[#EFF0F3] rounded-full text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-100"
              />
            </div>
          </div>
        </header>

        {/* GRID WITH OVERFLOW:
          - We use auto-cols to set a FIXED width for the cards.
          - This ensures that on smaller screens or when sidebars open, 
            the cards stay exactly the same size and just overflow.
        */}
        <div className="relative w-full overflow-hidden">
          <div className={`
            grid grid-flow-col gap-6 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory
            ${isAnySidebarOpen 
              ? 'auto-cols-[calc(50%-12px)] md:auto-cols-[440px]' 
              : 'auto-cols-[calc(100%-40px)] md:auto-cols-[380px] lg:auto-cols-[350px] xl:auto-cols-[385px]'}
          `}>
            {cards.map((card) => (
              <div 
                key={card.id} 
                className="bg-white border border-[#F3F4F6] rounded-[24px] md:rounded-[32px] p-4 md:p-6 shadow-xs hover:border-blue-200 transition-all group flex flex-col h-full snap-start"
              >
                {/* Card Top Info */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-gray-50 shrink-0">
                      <Image src={card.logo} alt={card.brand} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-[12px] text-[#1E1F24] truncate">{card.brand}</span>
                        <MdVerified className="text-[#22C55E] shrink-0" size={14} />
                        <span className="text-[#9CA3AF] text-[10px] md:text-[12px] font-medium ml-1 shrink-0">• {card.time}</span>
                      </div>
                      <div className="flex gap-1.5 mt-1 overflow-hidden">
                        {card.niche.slice(0, 2).map((n) => (
                          <span key={n} className="text-[9px] bg-[#F5FBFF] text-[#3379A5] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 border border-[#D1D5DB] rounded-full text-[11px] font-medium text-[#1E1F24] hover:bg-gray-50 transition-colors shrink-0">
                    Submit
                  </div>
                </div>

                {/* Prize & Status Labels */}
                <div className="flex items-center gap-2 mb-4 font-semibold">
                  <span className="text-[#1E1F24] text-[12px]">{card.prize} prize pool</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="text-[#D12B1F] text-[10px]">Closes in {card.deadline}</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="text-[#1E874B] bg-[#ECFEF4] text-[10px] px-1.5 py-0.5 rounded">Verified</span>
                </div>

                <h3 className="font-semibold text-[11px] text-[#62636C] leading-tight line-clamp-2 mb-1">
                  UGC Creators Needed for Skincare Product set Launch
                </h3>
                <p className="text-[#747682] text-[10px] mb-2.5 font-normal line-clamp-2">
                 NIVEA is launching its new Radiance Boost Skincare Collection and is now looking for authentic...
                </p>

                {/* FIXED-SIZE DYNAMIC IMAGE PREVIEW */}
                <div className="relative h-[157px] w-full mb-3 rounded-[20px] md:rounded-[24px] overflow-hidden bg-gray-50">
                  <div className={`
                    grid h-full w-full gap-0.5
                    ${card.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}
                    ${card.images.length > 2 ? 'grid-rows-2' : 'grid-rows-1'}
                  `}>
                    {card.images.slice(0, 4).map((img, i) => (
                      <div 
                        key={i} 
                        className={`relative w-full h-full overflow-hidden ${card.images.length === 3 && i === 0 ? 'row-span-2' : ''}`}
                      >
                        <Image src={img} alt="Thumbnail" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics row */}
                <div className="flex items-center justify-between text-[#9CA3AF] pt-2 border-t border-gray-50 mt-auto">
                  <div className="flex gap-3 md:gap-5 text-[11px] md:text-[12px] font-bold">
                    <span className="flex items-center gap-1"><FiBarChart2 size={14}/> 2.1k</span>
                    <span className="flex items-center gap-1"><FiMail size={14}/> 87</span>
                    <span className="flex items-center gap-1"><FiClock size={14}/> 12h</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="hover:text-[#111827] transition-colors"><FiBookmark size={16} /></button>
                    <button className="hover:text-[#111827] transition-colors"><FiShare2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center w-full mt-6 px-1 pb-10">
          <button className="px-3 md:px-5 py-2 border border-[#E5E7EB] rounded-full text-[14px] font-regular text-[#111827] flex items-center gap-1 hover:bg-gray-50 transition-all">
            <HiArrowLeft size={14} /> Previous
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <button className="w-11 h-11 bg-[#F9F9FB] text-[#1E1F24] rounded-[12px] font-medium text-[14px]">1</button>
            <button className="w-11 h-11 text-[#6B7280] hover:bg-gray-50 rounded-[12px] font-medium text-[14px]">2</button>
          </div>
          <button className="px-3 md:px-5 py-2 border border-[#E5E7EB] rounded-full text-[14px] font-regular text-[#111827] flex items-center gap-1 hover:bg-gray-50 transition-all">
            Next <HiArrowRight size={14}/>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TrendingChallenges;