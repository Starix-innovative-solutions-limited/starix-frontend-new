/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { FiSearch, FiSliders } from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";
import Image from "next/image";

const ChallengesPage = () => {
  const [activeTab, setActiveTab] = useState("Active");

  // Data updated to reflect the outcomes in the Completed view
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
    <div className="min-h-screen bg-white p-4 md:p-8 font-['Geist']">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-[#000000] mb-2">Challenges</h1>
            <p className="text-[#62636C] text-[12px]">
              You have 3 new campaign matches today
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-[#8B8D98] rounded-full text-sm font-medium text-[#374151] hover:bg-gray-50 transition-all">
              <FiSliders className="text-lg" />
              Filter
            </button>
            
            <div className="relative flex-1 md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62636C] text-lg" />
              <input 
                type="text" 
                placeholder="Search Starix"
                className="w-full pl-12 pr-4 py-2.5 bg-[#F9F9FB] border border-[#EFF0F3] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-8 border-b border-[#F3F4F6] mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm md:text-base font-semibold transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-[#0033FF]" : "text-[#747682] hover:text-gray-900"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full" 
                />
              )}
            </button>
          ))}
        </div>

        {/* CHALLENGE LIST */}
        <div className="flex flex-col border-t border-[#F3F4F6]">
          {challenges.map((item) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 border-b border-[#F3F4F6] hover:bg-gray-50/50 transition-all px-2 md:px-4 group"
            >
              <div className="flex items-center gap-1 mb-4 md:mb-0">
                <div className="w-14 h-14 rounded-full flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                  <Image src={`${item.brand.toLowerCase()}.svg`} alt={item.brand} fill className="object-cover" />
                </div>
                
                <div>
                  <h3 className="text-[#62636C] font-semibold text-[14px] md:text-lg leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-[#747682] font-medium text-[12px]">{item.brand}</span>
                    <GoCheckCircleFill className="text-[#0CC963] mx-1 text-sm" />
                    <span className="text-[#9CA3AF] mx-1">•</span>
                    <span className="text-[#747682] font-medium text-[12px]">{item.prize} prize pool</span>
                  </div>
                </div>
              </div>

              {/* INTEGRATED CONDITIONAL FEATURE */}
              {activeTab === "Saved" ? (
                <button className="px-6 py-2 border border-[#8B8D98] rounded-full text-sm font-semibold text-[#1E1F24] hover:bg-gray-50 transition-colors">
                  Continue Submission
                </button>
              ) : (
                <div className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap ${item.statusColor}`}>
                  {item.status}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-10 pb-20">
          <button className="flex items-center gap-2 px-6 py-2 border border-[#E5E7EB] rounded-full text-sm font-medium text-[#62636C] hover:bg-gray-50 transition-all">
            <span>←</span> Previous
          </button>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F9F9FB] text-[#1E1F24] font-semibold">1</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-gray-50">4</button>
          </div>

          <button className="flex items-center gap-2 px-6 py-2 border border-[#E5E7EB] rounded-full text-sm font-medium text-[#62636C] hover:bg-gray-50 transition-all">
            Next <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChallengesPage;