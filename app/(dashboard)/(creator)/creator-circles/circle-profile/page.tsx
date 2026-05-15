"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  GoSearch, 
  GoArrowLeft,
  GoArrowRight,
  GoCheckCircleFill
} from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { useRouter } from "next/navigation";
import EarningsHistory from "../earning-insight/page";
import SettingsModal from "@/components/(creator)/dashboard/SettingsModal";


const tabs = ["Active (12)", "Completed", "Saved"];

const challenges = [
  {
    title: "UGC Creators Needed for Skincare Product set Launch",
    company: "Nivea",
    prize: "₦10M prize pool",
    status: "Under Review",
    statusColor: "bg-[#FEDC4C26] text-[#665201]",
    logo: "/cocacola.svg", 
  },
  {
    title: "Seeking Artists for Music Festival Promotion",
    company: "VibeFest",
    prize: "₦7M prize pool",
    status: "Ranked",
    statusColor: "bg-[#EC8AFF1A] text-[#AC2ACF]",
    logo: "/nasa.svg",
  },
  {
    title: "Join Our Fitness App Beta Testers",
    company: "FitLife",
    prize: "₦5M prize pool",
    status: "Winner",
    statusColor: "bg-[#03FC6C1A] text-[#27AE60]",
    logo: "/fit life.svg",
  },
  {
    title: "Content Writers for Travel Guide Collaboration",
    company: "Wanderlust",
    prize: "₦3M prize pool",
    status: "Finalist",
    statusColor: "bg-[#75C0F41A] text-[#2D93D0]",
    logo: "/cocacola.svg",
  },
  {
    title: "Brand Ambassadors for Eco-Friendly Products",
    company: "GreenChoice",
    prize: "₦4M prize pool",
    status: "Not Qualified",
    statusColor: "bg-[#FD6C1D0F] text-[#FE3426]",
    logo: "/spotify.svg",
  },
];


const CircleProfilePage = ({ setIsEarningsHistoryOpen }: any) => {
  const router = useRouter(); // Initialize the router
  const [activeTab, setActiveTab] = useState("Active (12)");

  // 2. Add state to track which "page" to show
  const [showHistory, setShowHistory] = useState(false);

  // 3. Create a handler to open history and update sidebar
  const handleViewHistory = () => {
    // Navigate to the route you created for earning insights
    router.push("/creator-circles/earning-insight");
    if (setIsEarningsHistoryOpen) {
      setIsEarningsHistoryOpen(true);
    }
  };

  // 4. Create a handler to go back
  const handleBack = () => {
    setShowHistory(false);
    if (setIsEarningsHistoryOpen) {
      setIsEarningsHistoryOpen(false);
    }
  };

  // 5. Conditional Rendering
  if (showHistory) {
    return <EarningsHistory onBack={handleBack} />;
  }
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24] antialiased">
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      
      {/* ================= HERO BANNER ================= */}
      <div className="relative w-full h-[240px] md:h-[280px]">
        <Image 
          src="/Header.png" 
          alt="NYC Skyline Banner" 
          fill 
          className="object-cover" 
          priority 
        />

        {/* Settings Icon - Positioned exactly as per Figma */}
        <button 
              onClick={() => setIsSettingsOpen(true)}
         className="absolute right-6 md:right-12 bottom-[-84px] z-20 w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center border hover:bg-gray-50 transition">
          <FiSettings size={24} className="text-[#6B7280]" />
        </button>

        {/* Settings Icon - Positioned exactly as per Figma */}
        <button className="absolute right-6 md:right-26 bottom-[-84px] z-20 w-1/6 h-[48px] rounded-full bg-white flex items-center justify-center border hover:bg-gray-50 transition">
          <div><h2>Invite Member</h2></div>
        </button>

        {/* Profile Logo Overlap */}
        <div className="absolute -bottom-16 z-10">
          <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[32px] flex items-center justify-center">
            <Image src="/brands.svg" alt="Logo" width={120} height={120} className="object-contain" />
          </div>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className=" mx-auto px-6 md:px-8 pt-16 pb-24">
        
        {/* Header Info */}
        <div className="mb-10">
          <h1 className="text-[34px] md:text-[26px] font-semibold tracking-tight mb-2">The New Yorker</h1>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white bg-gray-200">
                  <Image src={`/grp${i}.svg`} alt="Avatar" fill className="object-cover" />
                </div>
              ))}
              <div className="w-7 h-7 rounded-full bg-[#EAF2FF] border-2 border-white flex items-center justify-center text-[10px] font-semibold text-[#245BFF]">
                +5
              </div>
            </div>
            <span className="text-[#6B7280] text-[15px] font-medium">8 members</span>
          </div>

          <div className="flex items-center gap-2 text-[14px] text-[#6B7280] font-medium mb-3">
            <span>12 Active Challenges</span>
            <span className="text-gray-300">•</span>
            <span>Ranked 251 Globally</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
               <Image src="/yt.svg" alt="YT" width={22} height={22} />
               <Image src="/ig.svg" alt="IG" width={20} height={20} />
               <Image src="/tt.svg" alt="TK" width={18} height={18} />
            </div>
            {["Beauty", "family and lifestyle", "skincare"].map((tag) => (
              <span key={tag} className="px-2 text-[#3379A5] bg-[#F5FBFF] text-[12px] rounded-md font-medium cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ================= STATS CARDS ================= */}
       <div className="grid grid-cols-1 md:grid-cols-[0.3fr_0.3fr_0.4fr] gap-4 mb-12">
        
        {/* 1. Total Earnings - Light Mint Green */}
        <div className="group relative overflow-hidden bg-[#E5FFE5] rounded-[24px] md:rounded-[32px] p-4 md:p-8 h-[180px] md:h-[180px] flex flex-col justify-between border border-[#E5FFE5]">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <img src="/coin.svg" alt="Earnings Icon" className="w-6 h-6" />
                    <h3 className="text-[16px] font-medium text-[#1E1F24]">Total Earnings</h3>
                </div>
                <h2 className="text-[26px] font-semibold text-[#1E1F24] leading-none tracking-tight">
                    ₦800,000<span className="text-[#80828D] font-medium">.00</span>
                </h2>
            </div>
            <button onClick={handleViewHistory} className="flex items-center gap-2 text-[#5C6473] text-[12px] font-medium hover:opacity-70 mt-4 transition-opacity">
                View History <GoArrowRight size={20} />
            </button>
        </div>

        {/* 2. Total Engagement - Soft Pink */}
        <div className="group relative overflow-hidden bg-[#FFF0FD] rounded-[24px] md:rounded-[32px] p-6 md:p-8 h-[180px] md:h-[180px] flex flex-col border border-[#FFF0FD]">
            
            {/* Title Section */}
            <div className="flex items-center gap-2 mb-4">
                <img src="/diamonddd.svg" alt="Engagement Icon" className="w-8 h-8" />
                <h3 className="text-[16px] font-medium text-[#1E1F24]">Total Engagement</h3>
            </div>
            
            {/* Stats & CTA Section */}
            <div className="mt-auto relative z-10">
                <div className="flex items-baseline gap-1 mb-4">
                    <h2 className="text-[26px] font-semibold text-[#1E1F24] leading-none tracking-tight">24K</h2>
                    <span className="text-[#1E1F24] text-[10px] font-semibold">Views</span>
                </div>

                <button className="flex items-center gap-2 text-[#62636C] text-[12px] font-medium hover:opacity-70 transition-opacity">
                    View Trend <GoArrowRight size={22} />
                </button>
            </div>

            {/* Trend Box */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-15 bg-white  rounded-[10px] flex flex-col w-[100px] md:w-[120px] h-[60px] md:h-[70px] justify-between">
                <span className="text-[14px] md:text-[12px] text-[#EE0001] font-medium ml-2 mt-2">
                    15% ↓
                </span>
                <div className="w-full h-full flex items-end">
                    <img 
                        src="/Stroke.svg" 
                        alt="trend line" 
                        className="w-full h-full object-contain" 
                    />
                </div>
            </div>
        </div>

        {/* 3. Circle Score - Light Sky Blue */}
        <div className="group relative overflow-hidden bg-[#E9F6FF] rounded-[24px] md:rounded-[32px] p-8 h-[200px] md:h-[180px] flex flex-row items-center justify-between border border-[#E9F6FF]">
            
            {/* Text Section */}
            <div className="flex flex-col justify-between h-full max-w-[62%]">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <img src="/candyyy.svg" alt="Score Icon" className="w-6 h-6" />
                        <h3 className="text-[16px] font-medium text-[#1E1F24]">Circle Score</h3>
                    </div>
                    <p className="text-[12px] text-[#62636C] leading-snug font-medium">
                        Circle score is the average of the starix score of all the members.
                    </p>
                </div>
                <button className="flex items-center gap-2 text-[#5C6473] text-[12px] font-medium hover:opacity-70 transition-opacity">
                    View Breakdown <GoArrowRight size={20} />
                </button>
            </div>

            {/* Circular Progress Ring - Moved 50% Right and 40% Up */}
            <div className="relative flex items-center justify-center flex-shrink-0 transform  ">
                <svg className="w-[120px] h-[120px] -rotate-90">
                    {/* Background Circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r="44"
                        stroke="#D1E9FF"
                        strokeWidth="5"
                        fill="transparent"
                    />
                    {/* Progress Circle (82%) */}
                    <circle
                        cx="60"
                        cy="60"
                        r="44"
                        stroke="#245BFF"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray="276.46"
                        strokeDashoffset={276.46 * (1 - 82 / 100)}
                        strokeLinecap="round"
                    />
                </svg>
                <span className="absolute text-[32px] font-bold text-[#245BFF]">82</span>
            </div>
        </div>

        </div>
        {/* ================= CHALLENGES SECTION ================= */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <h2 className="text-[16px] md:text-[20px] text-[#1E1F24] font-semibold">
              Circle Challenges <span className="text-[#7B8190] font-semibold text-[20px]">(79)</span>
            </h2>
            <div className="relative w-full max-w-[340px]">
              <GoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Challenges"
                className="w-full pl-12 pr-4 py-3 border border-gray-100 rounded-full text-[14px] outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#EFF0F3] mb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[16px] transition-all relative ${
                  activeTab === tab ? "text-[#0033FF] font-semibold" : "text-[#7B8190] font-medium"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#245BFF] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Challenge List */}
          <div className="divide-y divide-[#EFF0F3]">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-4">
                <div className="flex items-center gap-4">
                  <img src={challenge.logo} alt="Logo" className="w-15 h-15" />
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#62636C] leading-tight">
                      {challenge.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[#747682] text-[12px] mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        {challenge.company} <GoCheckCircleFill className="text-[#0CC963] mx-1 shrink-0" />
                      </span>
                      <span className="text-gray-300">•</span>
                      <span>{challenge.prize}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-5 py-1.5 rounded-full text-[12px] font-medium w-fit ${challenge.statusColor}`}>
                  {challenge.status}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-12 gap-4">
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-[14px] font-semibold text-[#5C6473] hover:bg-gray-50 transition">
              <GoArrowLeft /> Previous
            </button>

            <div className="flex items-center gap-4 text-[15px] font-medium">
              <button className="w-10 h-10 bg-[#F3F4F6] rounded-xl font-semibold flex items-center justify-center">1</button>
              <span className="text-[#9CA3AF]">...</span>
              <button className="text-[#6B7280]">4</button>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-[14px] font-semibold text-[#5C6473] hover:bg-gray-50 transition">
              Next <GoArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleProfilePage;