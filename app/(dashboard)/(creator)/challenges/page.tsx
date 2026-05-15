/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiSliders } from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";
import Image from "next/image";

const ChallengesPage = () => {
  const [activeTab, setActiveTab] = useState("Active");

  const challenges = [
    { id: 1, title: "UGC Creators Needed for Skincare Product set Launch", brand: "Nasa", prize: "₦10M", status: "Not Qualified", statusColor: "bg-[#FE34260F] text-[#FE3426]" },
    { id: 2, title: "Seeking Artists for Music Festival Promotion", brand: "Spotify", prize: "₦7M", status: "Ranked", statusColor: "bg-[#EC8AFF1A] text-[#AC2ACF]" },
    { id: 3, title: "Join Our Fitness App Beta Testers", brand: "Google", prize: "₦5M", status: "Winner", statusColor: "bg-[#03FC6C1A] text-[#27AE60]" },
    { id: 4, title: "Content Writers for Travel Guide Collaboration", brand: "Tesla", prize: "₦3M", status: "Finalist", statusColor: "bg-[#75C0F41A] text-[#2D93D0]" },
    { id: 5, title: "Brand Ambassadors for Eco-Friendly Products", brand: "Cocacola", prize: "₦4M", status: "Not Qualified", statusColor: "bg-[#FE34260F] text-[#FE3426]" },
    { id: 6, title: "Video Editors for New Cooking Show", brand: "Fit Life", prize: "₦6M", status: "Winner", statusColor: "bg-[#03FC6C1A] text-[#27AE60]" },
    { id: 7, title: "UGC Creators Needed for Skincare Product set Launch ", brand: "Red Line", prize: "₦4M", status: "Finalist", statusColor: "bg-[#75C0F41A] text-[#2D93D0]" },
    { id: 8, title: "Social Media Influencers for Fashion Line Launch ", brand: "Mercedes", prize: "₦6M", status: "Ranked", statusColor: "bg-[#EC8AFF1A] text-[#AC2ACF]" },
  ];

  const tabs = ["Active", "Completed", "Saved"];

  return (
    <div className="min-h-screen bg-white font-['Geist']">
      <div className="max-w-6xl ">
        
        {/* TOP HEADER SECTION */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex-shrink-0">
            <h1 className="text-lg md:text-xl xl:text-2xl font-semibold text-[#000000]">Challenges</h1>
            <p className="text-[#62636C] text-[10px] md:text-[12px] hidden sm:block">
              You have 3 new campaign matches today
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <button className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 border border-[#8B8D98] rounded-full text-[11px] md:text-sm font-medium text-[#374151] hover:bg-gray-50 transition-all flex-shrink-0">
              <FiSliders className="text-sm md:text-lg" />
              <span className=" xs:inline">Filter</span>
            </button>
            
            <div className="relative w-full max-w-[120px] xs:max-w-[180px] md:max-w-md transition-all duration-300">
              <FiSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#62636C] text-sm md:text-lg" />
              <input 
                type="text" 
                placeholder="Search"
                className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-2.5 bg-[#F9F9FB] border border-[#EFF0F3] rounded-full text-[11px] md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-4 md:gap-8 border-b border-[#F3F4F6] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs md:text-base font-semibold transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-[#0033FF]" : "text-[#747682] hover:text-gray-900"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-blue-600 rounded-full" 
                />
              )}
            </button>
          ))}
        </div>

        {/* CHALLENGE LIST */}
        <div className="flex flex-col border-t border-[#F3F4F6]">
          {challenges.map((item) => (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={item.id}
              className="flex items-center justify-between py-5 border-b border-[#F3F4F6] hover:bg-gray-50/50 transition-all px-1 md:px-4 group gap-4"
            >
              <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                  <Image src={`${item.brand}.svg`} alt={item.brand} fill className="object-cover" />
                </div>
                
                <div className="min-w-0">
                  <h3 className="text-[#62636C] font-semibold text-[11px] md:text-sm xl:text-[16px] leading-tight truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center mt-0.5 text-[9px] md:text-[12px] text-[#747682]">
                    <span className="truncate max-w-[60px] md:max-w-none">{item.brand}</span>
                    <GoCheckCircleFill className="text-[#0CC963] mx-1 shrink-0" />
                    <span className="mx-1">•</span>
                    <span className="whitespace-nowrap">{item.prize} prize</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                {activeTab === "Saved" ? (
                  <button className="px-3 py-1.5 md:px-6 md:py-2 border border-[#8B8D98] rounded-full text-[9px] md:text-sm font-semibold text-[#1E1F24] hover:bg-gray-100 whitespace-nowrap transition-all">
                    Continue Submission
                  </button>
                ) : (
                  <div className={`px-2 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${item.statusColor}`}>
                    {item.status}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-10 pb-20">
          <button className="p-2 md:px-6 md:py-2 border border-[#E5E7EB] rounded-full text-[10px] md:text-sm font-medium text-[#62636C]">
            <span className="hidden md:inline">← Previous</span>
            <span className="md:hidden">←</span>
          </button>

          <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
            <button className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-[#F9F9FB] text-[#1E1F24] font-semibold">1</button>
            <span className="text-gray-400">...</span>
            <button className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-[#6B7280]">4</button>
          </div>

          <button className="p-2 md:px-6 md:py-2 border border-[#E5E7EB] rounded-full text-[10px] md:text-sm font-medium text-[#62636C]">
            <span className="hidden md:inline">Next →</span>
            <span className="md:hidden">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChallengesPage;