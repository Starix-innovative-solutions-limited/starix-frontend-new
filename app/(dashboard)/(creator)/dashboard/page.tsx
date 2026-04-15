/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import { FiBarChart2, FiMail, FiClock, FiBookmark, FiShare2 } from "react-icons/fi";

const Page = () => {
  const recommendedChallenges = [
    {
      id: 1,
      brand: "Nivea",
      logo: "/nivea.svg", 
      time: "12h ago",
      niche: ["Beauty", "Family and lifestyle"],
      prize: "₦10M",
      deadline: "12h",
      title: "UGC Creators Needed for Skincare Product set Launch",
      desc: "A real-time measure of your creator performance, visibility, and brand readiness..",
      thumbnails: ["/left1.svg", "/right1.svg"], 
    },
    {
      id: 2,
      brand: "Indomie",
      logo: "/indomie.svg", 
      time: "2d ago",
      niche: ["Food", "Family and lifestyle"],
      prize: "₦8M",
      deadline: "12h",
      title: "UGC Creators Needed for Skincare Product set Launch",
      desc: "A real-time measure of your creator performance, visibility, and brand readiness..",
      thumbnails: ["/left2.svg", "/right21.svg"], 
    },
    {
      id: 3,
      brand: "Indomie",
      logo: "/indomie.svg", 
      time: "2d ago",
      niche: ["Food", "Family and lifestyle"],
      prize: "₦8M",
      deadline: "12h",
      title: "UGC Creators Needed for Skincare Product set Launch",
      desc: "A real-time measure of your creator performance, visibility, and brand readiness..",
      thumbnails: ["/left2.svg", "/right21.svg"], 
    },
  ];

  const activeChallenges = [
    { brand: "Starbucks", logo: "/starbucks.svg", status: "In Progress", color: "bg-[#FEFCE8] text-[#854D0E]" },
    { brand: "PlayStation", logo: "/ps.svg", status: "Awaiting Review", color: "bg-[#F5F3FF] text-[#5B21B6]" },
    { brand: "McDonalds", logo: "/mcdonald.svg", status: "Approved", color: "bg-[#75C0F41A] text-[#2D93D0]" },
  ];

  return (
    <div className="min-h-screen w-full bg-white py-6">
      {/* 1. Header Section */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-[22px] md:text-[24px] font-semibold text-[#1E1F24] flex items-center gap-2 tracking-tight">
            Welcome Back, Destiny 👋
          </h1>
          <p className="text-[#6B7280] text-[14px] mt-1 font-medium">
            You have 3 new campaign matches today
          </p>
        </div>
        
        <div
          className="relative w-[48px] h-[48px] rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{
            background: "conic-gradient(#0033FF 0% 50%, #FD6C1D 50% 100%)",
          }}
        >
          <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image 
              src="/dp.svg" 
              width={42} 
              height={42} 
              alt="Profile" 
              className="object-cover" 
              priority
            />
          </div>
        </div>
      </header>

      {/* 2. Recommended Challenges */}
      <section className="mb-14">
        <h2 className="text-[18px] md:text-[20px] font-semibold text-[#62636C] mb-6">Recommended Challenges For You</h2>
        
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
          {recommendedChallenges.map((challenge) => (
            /* WRAPPED IN LINK FOR ROUTING */
            <Link 
              href={`/dashboard/challenge/${challenge.id}`}
              key={challenge.id} 
              className="
                flex-none 
                basis-[85%] 
                md:basis-[48%] 
                snap-start
                bg-white 
                border border-[#F3F4F6] 
                rounded-[24px] md:rounded-[32px] 
                p-4 md:p-6 
                shadow-sm
                hover:border-blue-200
                transition-all
                cursor-pointer
              "
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-gray-50">
                    <Image src={challenge.logo} alt={challenge.brand} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-[12px] text-[#1E1F24]">{challenge.brand}</span>
                      <MdVerified className="text-[#22C55E]" size={14} />
                      <span className="text-[#9CA3AF] text-[10px] md:text-[12px] font-medium ml-1">• {challenge.time}</span>
                    </div>
                    <div className="flex gap-1.5 mt-1">
                      {challenge.niche.map((n) => (
                        <span key={n} className="text-[9px] bg-[#F5FBFF] text-[#3379A5] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1.5 border border-[#D1D5DB] rounded-full text-[11px] font-medium text-[#1E1F24] hover:bg-gray-50 transition-colors">
                  Submit
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-[10px] md:text-[11px] font-semibold">
                <span className="text-[#1E1F24]">{challenge.prize} prize pool</span>
                <span className="text-[#E5E7EB]">|</span>
                <span className="text-[#D12B1F]">Closes in {challenge.deadline}</span>
                <span className="text-[#E5E7EB] hidden sm:inline">|</span>
                <span className="text-[#1E874B] bg-[#ECFEF4] px-2 py-0.5 rounded-md text-[10px] hidden sm:inline">Verified</span>
              </div>

              <h3 className="font-semibold text-[12px] text-[#62636C] mb-2 leading-tight">{challenge.title}</h3>
              <p className="text-[#747682] font-normal text-[10px] leading-relaxed mb-6 line-clamp-2">{challenge.desc}</p>

              <div className="grid grid-cols-2 mb-5">
                {challenge.thumbnails.map((img, i) => (
                  <div key={i} className="h-[140px] md:h-[180px] rounded-[20px] md:rounded-[24px] relative overflow-hidden group">
                    <Image src={img} alt="Thumbnail" fill className="object-cover transition-transform duration-500" />
                    <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
                      <span className="text-[7px]">▶</span> 0:49
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[#9CA3AF] pt-2 border-t border-gray-50 mt-2">
                <div className="flex gap-3 md:gap-5 text-[11px] md:text-[12px] font-bold">
                  <span className="flex items-center gap-1"><FiBarChart2 size={14}/> 2189</span>
                  <span className="flex items-center gap-1"><FiMail size={14}/> 87</span>
                  <span className="flex items-center gap-1"><FiClock size={14}/> 12h</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={(e) => e.preventDefault()} className="hover:text-[#111827] transition-colors"><FiBookmark size={16} /></button>
                  <button onClick={(e) => e.preventDefault()} className="hover:text-[#111827] transition-colors"><FiShare2 size={16} /></button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Active Challenges */}
      <section className="pb-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#62636C]">Active Challenges</h2>
          <Link href="/challenges" className="flex items-center gap-1.5 text-[13px] md:text-[14px] font-medium text-[#1E1F24] hover:underline">
            View All <HiArrowRight size={18} />
          </Link>
        </div>

        <div className="space-y-1">
          {activeChallenges.map((active, idx) => (
            /* WRAPPED IN LINK FOR ROUTING */
            <Link 
              key={idx} 
              href={`/dashboard/challenge/active-${idx}`}
              className="flex items-center justify-between py-4 md:py-5 border-b border-[#F3F4F6] last:border-0 hover:bg-gray-50/50 transition-colors px-2 rounded-xl"
            >
              <div className="flex items-center gap-3 md:gap-5 min-w-0">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-100 shrink-0">
                  <Image src={active.logo} alt={active.brand} fill className="object-contain p-1.5 md:p-2" />
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-[#374151] text-[13px] md:text-[14px] truncate">UGC Creators Needed for Skincare Product</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[12px] text-[#6B7280] font-bold">{active.brand}</span>
                    <MdVerified className="text-[#22C55E]" size={12} />
                    <span className="text-[11px] text-[#9CA3AF] font-medium">• ₦10M pool</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-[11px] font-bold tracking-tight shrink-0 ${active.color}`}>
                {active.status}
              </span>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center w-full mt-12 px-1">
          <button className="px-3 md:px-5 py-2 border border-[#E5E7EB] rounded-full text-[14px] font-regular text-[#111827] flex items-center gap-1 hover:bg-gray-50 transition-all">
            <HiArrowLeft size={14} /> Previous
          </button>

          <div className="flex items-center gap-1 md:gap-2">
            <button className="w-9 h-9 md:w-11 md:h-11 bg-[#F9F9FB] text-[#1E1F24] rounded-[12px] font-medium text-[14px]">1</button>
            <button className="w-9 h-9 md:w-11 md:h-11 text-[#6B7280] hover:bg-gray-50 rounded-[12px] font-medium text-[14px]">2</button>
            <button className="w-9 h-9 md:w-11 md:h-11 text-[#6B7280] font-medium text-[14px]">...</button>
            <button className="w-9 h-9 md:w-11 md:h-11 text-[#6B7280] hover:bg-gray-50 rounded-[12px] font-medium text-[14px]">4</button>
            <button className="w-9 h-9 md:w-11 md:h-11 text-[#6B7280] hover:bg-gray-50 rounded-[12px] font-medium text-[14px]">5</button>
          </div>

          <button className="px-3 md:px-5 py-2 border border-[#E5E7EB] rounded-full text-[14px] font-regular text-[#111827] flex items-center gap-1 hover:bg-gray-50 transition-all">
            Next <HiArrowRight size={14}/>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;