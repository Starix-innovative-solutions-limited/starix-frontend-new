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
import CreateCircleModal from "@/components/(creator)/dashboard/CreateCircleModal";
import BannerUploadModal from "@/components/(creator)/dashboard/BannerUploadModal";
import ConnectSocialsModal from "@/components/(creator)/dashboard/ConnectSocialsModal";

const tabs = ["Active (12)", "Completed", "Saved"];

// Mock array of members for the hover card breakdown
const circleMembers = [
  { name: "Jason oluwadarijimi", role: "Admin", avatar: "/grp1.svg" },
  { name: "Sally Rivera", role: "Member", avatar: "/grp2.svg" },
  { name: "Sangotofunmi Oluwadar..", role: "Member", avatar: "/grp3.svg" },
  { name: "You", role: "Member", avatar: "/grp1.svg" },
  { name: "Esther Howard", role: "Member", avatar: "/grp2.svg" },
  { name: "Adewale Yusuf", role: "Member", avatar: "/grp3.svg" },
  { name: "Jane Doe", role: "Member", avatar: "/grp1.svg" },
  { name: "John Smith", role: "Member", avatar: "/grp2.svg" },
];

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
  const router = useRouter(); 
  const [activeTab, setActiveTab] = useState("Active (12)");

  // Toggle this to true to see or test the exact empty state matching the design mockup image
  const [isEmpty, setIsEmpty] = useState(false);

  const [showHistory, setShowHistory] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Banner & Social Upload Modal State Logic Integrations
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  // Modal tracking states
  const [isCreateCircleOpen, setIsCreateCircleOpen] = useState(false);
  const [modalInitialStep, setModalInitialStep] = useState<"CREATE" | "SUCCESS" | "INVITE">("CREATE");

  const handleOpenInviteOnly = () => {
    setModalInitialStep("INVITE");
    setIsCreateCircleOpen(true);
  };

  const handleViewHistory = () => {
    router.push("/creator-circles/earning-insight");
    if (setIsEarningsHistoryOpen) {
      setIsEarningsHistoryOpen(true);
    }
  };

  const handleBack = () => {
    setShowHistory(false);
    if (setIsEarningsHistoryOpen) {
      setIsEarningsHistoryOpen(false);
    }
  };

  if (showHistory) {
    return <EarningsHistory onBack={handleBack} />;
  }

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24] antialiased overflow-x-hidden">
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      
      {/* Create Circle / Invite Members Overlay Modal */}
      <CreateCircleModal 
        isOpen={isCreateCircleOpen} 
        onClose={() => setIsCreateCircleOpen(false)} 
        initialStep={modalInitialStep}
      />

      {/* Banner Upload & Social Connector Modals */}
      <BannerUploadModal 
        isOpen={isBannerModalOpen} 
        onClose={() => setIsBannerModalOpen(false)} 
        onUploadSuccess={(url) => setBannerImage(url)} 
      />

      <ConnectSocialsModal 
        isOpen={isConnectModalOpen} 
        onClose={() => setIsConnectModalOpen(false)} 
      />
      
      {/* ================= HERO BANNER ================= */}
      <div className="relative w-full h-[220px] md:h-[250px] lg:h-[280px] bg-[#F3F4F6]">
        {bannerImage ? (
          <Image 
            src={bannerImage} 
            alt="Uploaded Banner Image" 
            fill 
            className="object-cover" 
            priority 
          />
        ) : (
          <Image 
            src="/Header.png" 
            alt="NYC Skyline Banner" 
            fill 
            className="object-cover" 
            priority 
          />
        )}

        {/* Action Button Row Overlayed Right aligned — Upgraded for iPad/Tablet boundaries */}
        <div className="absolute right-4 md:right-6 lg:right-8 bottom-[-72px] md:bottom-[-24px] lg:bottom-[-84px] z-20 flex flex-wrap items-center justify-end gap-2 max-w-[70%] md:max-w-none">
          {isEmpty && (
            <>
              <button 
                onClick={() => setIsConnectModalOpen(true)}
                className="px-4 lg:px-6 h-[40px] lg:h-[48px] rounded-full bg-white flex items-center justify-center border hover:bg-gray-50 transition cursor-pointer text-[13px] lg:text-[14px] font-semibold text-[#1E1F24] whitespace-nowrap shadow-sm"
              >
                Connect Socials
              </button>
              <button 
                onClick={() => setIsBannerModalOpen(true)}
                className="px-4 lg:px-6 h-[40px] lg:h-[48px] rounded-full bg-white flex items-center justify-center border hover:bg-gray-50 transition cursor-pointer text-[13px] lg:text-[14px] font-semibold text-[#1E1F24] whitespace-nowrap shadow-sm"
              >
                Upload Banner
              </button>
            </>
          )}
          <button 
            onClick={handleOpenInviteOnly} 
            className="px-4 lg:px-6 h-[40px] lg:h-[48px] rounded-full bg-white flex items-center justify-center border border-[#8B8D98] hover:bg-gray-50 transition cursor-pointer text-[13px] lg:text-[14px] font-semibold text-[#1E1F24] whitespace-nowrap shadow-sm"
          >
            Invite Member
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full bg-white flex items-center justify-center border border-[#8B8D98] hover:bg-gray-50 transition shadow-sm"
          >
            <img src="/vectros.svg" alt="" />
          </button>
        </div>

        {/* Profile Logo Overlap — Responsive sizing for iPad screens */}
        <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-6 lg:left-8 z-10">
          <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] rounded-[24px] lg:rounded-[32px] overflow-hidden  flex items-center justify-center">
            <Image src="/brands.svg" alt="Logo" width={150} height={150} className="object-contain w-full h-full" />
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-10 lg:pt-16 pb-24">
        
        {/* Header Info */}
        <div className="mb-10">
          <h1 className="text-[28px] md:text-[32px] lg:text-[26px] font-semibold tracking-tight mb-2">The New Yorker</h1>
          
          <div className="flex items-center gap-3 mb-2">
            {isEmpty ? (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden relative bg-orange-500">
                  <Image src="/avatar.svg" fill alt="Admin Avatar" className="object-cover" />
                </div>
                <span className="text-[#6B7280] text-[15px] font-medium">1 member</span>
              </div>
            ) : (
              /* Group container allowing children interactions via continuous group targeting hover transitions */
              <div className="relative group/avatar flex items-center gap-3">
                <div className="flex -space-x-2 group-hover/avatar:space-x-1 transition-all duration-300 ease-out">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white bg-gray-200 transition-transform duration-300 ease-out group-hover/avatar:scale-105">
                      <Image src={`/grp${i}.svg`} alt="Avatar" fill className="object-cover" />
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full bg-[#EAF2FF] border-2 border-white flex items-center justify-center text-[10px] font-semibold text-[#245BFF] transition-transform duration-300 ease-out group-hover/avatar:scale-105">
                    +5
                  </div>
                </div>
                <span className="text-[#6B7280] text-[15px] font-medium">8 members</span>

                {/* Floating Breakdown Card matching the exact UX/Typography guidelines */}
                <div className="absolute top-9 left-0 z-30 w-[280px] bg-white rounded-2xl border border-gray-100 shadow-xl opacity-0 scale-95 invisible group-hover/avatar:opacity-100 group-hover/avatar:scale-100 group-hover/avatar:visible transition-all duration-200 ease-out p-3 pointer-events-auto">
                  <div className="text-[12px] font-semibold text-[#7B8190] uppercase tracking-wider mb-2 px-1">
                    Circle Members ({circleMembers.length})
                  </div>
                  <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-0.5 custom-scrollbar">
                    {circleMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                          </div>
                          <span className="text-[13px] font-medium text-[#1E1F24] truncate">
                            {member.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          member.role === "Admin" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[14px] text-[#6B7280] font-medium mb-3">
            <span>{isEmpty ? "No Active Challenges" : "12 Active Challenges"}</span>
            <span className="text-gray-300">•</span>
            <span>{isEmpty ? "Unranked" : "Ranked 251 Globally"}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            {!isEmpty && (
              <div className="flex items-center gap-2 mr-2">
                 <Image src="/yt.svg" alt="YT" width={22} height={22} />
                 <Image src="/ig.svg" alt="IG" width={20} height={20} />
                 <Image src="/tt.svg" alt="TK" width={18} height={18} />
              </div>
            )}
            {["Beauty", "family and lifestyle", "skincare"].map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-[#3379A5] bg-[#F5FBFF] text-[12px] rounded-md font-medium cursor-pointer whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ================= STATS CARDS — Fully optimized for iPad 2-Column Grid splitting up to Desktop layout ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.3fr_0.3fr_0.4fr] gap-4 mb-12">
          
          {/* 1. Total Earnings */}
          <div className="group relative overflow-hidden bg-[#E5FFE5] rounded-[24px] md:rounded-[28px] lg:rounded-[32px] p-6 h-[140px] flex flex-col justify-between border border-[#E5FFE5]">
              <div>
                  <div className="flex items-center gap-2 mb-3 lg:mb-4">
                      <img src="/coin.svg" alt="Earnings Icon" className="w-6 h-6" />
                      <h3 className="text-[15px] lg:text-[16px] font-medium text-[#1E1F24]">Total Earnings</h3>
                  </div>
                  <h2 className="text-[24px] lg:text-[26px] font-semibold text-[#1E1F24] leading-none tracking-tight">
                      {isEmpty ? "₦0" : "₦800,000"}<span className="text-[#80828D] font-medium">.00</span>
                  </h2>
              </div>
              <button onClick={handleViewHistory} className="w-fit flex items-center gap-2 text-[#5C6473] text-[12px] font-medium hover:opacity-70 mt-4 transition-opacity">
                  View History <GoArrowRight size={20} />
              </button>
          </div>

          {/* 2. Total Engagement */}
          <div className="group relative overflow-hidden bg-[#FFF0FD] rounded-[24px] md:rounded-[28px] lg:rounded-[32px] p-5 h-[140px] flex flex-col border border-[#FFF0FD] w-full">
              <div className="flex items-center gap-2 mb-3 lg:mb-6 shrink-0">
                  <img src="/diamonddd.svg" alt="Engagement Icon" className="w-6 h-6 shrink-0" />
                  <h3 className="text-[15px] lg:text-[16px] font-medium text-[#1E1F24] truncate">Total Engagement</h3>
              </div>
              
              <div className="flex-1 flex items-end justify-between min-h-0 relative z-10 w-full">
                  <div className="flex flex-col justify-end h-full">
                      <div className="flex items-baseline gap-1 mb-3 lg:mb-4">
                          <h2 className="text-[24px] lg:text-[26px] font-semibold text-[#1E1F24] leading-none tracking-tight">
                              {isEmpty ? "0" : "24K"}
                          </h2>
                          <span className="text-[#1E1F24] text-[10px] font-semibold">Views</span>
                      </div>
                      <button className="flex items-center  gap-2 text-[#62636C] text-[12px] font-medium hover:opacity-70 transition-opacity whitespace-nowrap">
                          View Trend <GoArrowRight size={22} className="shrink-0" />
                      </button>
                  </div>

                  <div className="bg-white rounded-[10px] flex flex-col w-[35%] max-w-[120px] min-w-[75px] h-[65px] lg:h-[70px] justify-between p-1.5 shrink-0">
                      <span className="text-[11px] lg:text-[12px] text-[#EE0001] font-medium leading-none">
                          {isEmpty ? "0%" : "15% ↓"}
                      </span>
                      <div className="w-full flex-1 flex items-end min-h-0 mt-1">
                          <img 
                              src="/Stroke.svg" 
                              alt="trend line" 
                              className="w-full h-full object-contain object-bottom" 
                          />
                      </div>
                  </div>
              </div>
          </div>

          {/* 3. Circle Score — Full-width stretch on tablets for optimal spacing */}
          <div className="group relative overflow-hidden bg-[#E9F6FF] rounded-[24px] md:rounded-[28px] lg:rounded-[32px] p-6 h-[140px] flex flex-row items-center justify-between border border-[#E9F6FF] md:col-span-2 lg:col-span-1">
              <div className="flex flex-col justify-between h-full max-w-[65%]">
                  <div>
                      <div className="flex items-center gap-2 mb-2 lg:mb-3">
                          <img src="/candyyy.svg" alt="Score Icon" className="w-6 h-6" />
                          <h3 className="text-[15px] lg:text-[16px] font-medium text-[#1E1F24]">Circle Score</h3>
                      </div>
                      <p className="text-[11px] lg:text-[12px] text-[#62636C] mb-3 leading-snug font-medium">
                          Circle score is the average of the starix score of all the members.
                      </p>
                  </div>
                  <button className="w-fit flex items-center gap-2 text-[#5C6473] text-[12px] font-medium hover:opacity-70 transition-opacity">
                      View Breakdown <GoArrowRight size={20} />
                  </button>
              </div>

              <div className="relative flex items-center justify-center flex-shrink-0">
                  <svg className="w-[105px] h-[105px] lg:w-[120px] lg:h-[120px] -rotate-90">
                      <circle cx="52" cy="52" r="42" stroke="#D1E9FF" strokeWidth="5" fill="transparent" className="lg:cx-60 lg:cy-60 lg:r-44" />
                      <circle
                          cx="52"
                          cy="52"
                          r="42"
                          className="lg:cx-60 lg:cy-60 lg:r-44"
                          stroke="#0033FF"
                          strokeWidth="5"
                          fill="transparent"
                          strokeDasharray="263.89"
                          strokeDashoffset={263.89 * (1 - (isEmpty ? 0 : 82) / 100)}
                          strokeLinecap="round"
                      />
                  </svg>
                  <span className="absolute text-[28px] lg:text-[32px] left-[30px] bottom-[28px] font-medium text-[#0033FF]">
                      {isEmpty ? "0" : "82"}
                  </span>
              </div>
          </div>
        </div>

        {/* ================= CHALLENGES SECTION ================= */}
        <div className="mt-12">
          {isEmpty ? (
            /* ================= FIGMA CONTAINER EMPTY SLATE ================= */
            <div className="w-full flex flex-col items-center justify-center text-center py-16 border-t border-[#EFF0F3]">
              <div className="block rounded-full mb-8 lg:mb-10 max-w-[140px] md:max-w-[180px]">
                <img src="/circle.svg" alt="Empty Slate Visual Indicator" className="w-full h-auto" />
              </div>
              <h3 className="text-[20px] md:text-[24px] font-semibold mb-3 tracking-tight text-[#1E1F24]">
                Your circle has not joined any Challenges
              </h3>
              <p className="text-gray-500 text-[14px] md:text-[16px] max-w-[450px] mb-8 lg:mb-10 leading-normal px-4">
                Your team hasn't joined any challenges yet. Pick a campaign 
                and submit as a team for a chance to win.
              </p>
              <button 
                onClick={() => router.push("/challenges")}
                className="px-10 lg:px-12 py-3.5 lg:py-4 bg-[#0033FF] text-white rounded-full font-semibold text-[15px] lg:text-[16px] hover:bg-[#0026CC] transition-all shadow-lg shadow-blue-600/10"
              >
                Find Challenges
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
                <h2 className="text-[18px] md:text-[20px] text-[#1E1F24] font-semibold">
                  Circle Challenges <span className="text-[#7B8190] font-semibold text-[18px] md:text-[20px]">(79)</span>
                </h2>
                <div className="relative w-full sm:max-w-[340px]">
                  <GoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search Challenges"
                    className="w-full pl-12 pr-4 py-2.5 lg:py-3 border border-gray-100 rounded-full text-[14px] outline-none focus:border-blue-400 transition"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex px-2 gap-6 border-b border-[#EFF0F3] mb-">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-[12px] lg:text-[16px] transition-all relative ${
                      activeTab === tab ? "text-[#0033FF] font-semibold" : "text-[#7B8190] font-medium"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#0033FF] rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Challenge List */}
              <div className="divide-y border-b border-[#EFF0F3] divide-[#EFF0F3]">
                {challenges.map((challenge, idx) => (
                  <div key={idx} className="flex flex-row items-center justify-between py-2 gap-4">
                    <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                      <img src={challenge.logo} alt="Logo" className="w-12 h-12 lg:w-15 lg:h-15 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-[12px] lg:text-[14px] font-semibold text-[#62636C] leading-snug truncate">
                          {challenge.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[#747682] text-[11px] lg:text-[12px] mt-0.5 font-medium">
                          <span className="flex items-center gap-0.5 whitespace-nowrap">
                            {challenge.company} <GoCheckCircleFill className="text-[#0CC963] ml-1 shrink-0" />
                          </span>
                          <span className="text-gray-300 hidden xl:inline">•</span>
                          <span className="whitespace-nowrap text-blue-600 sm:text-[#747682]">{challenge.prize}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 lg:px-2 py-1 rounded-full text-[10px] lg:text-[12px] font-medium whitespace-nowrap flex-shrink-0 ${challenge.statusColor}`}>
                      {challenge.status}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Row */}
              <div className="flex items-center justify-between mt-12 gap-4">
                <button className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 border border-gray-200 rounded-full text-[13px] lg:text-[14px] font-regular text-[#5C6473] hover:bg-gray-50 transition">
                  <GoArrowLeft /> Previous
                </button>

                <div className="flex items-center gap-3 lg:gap-4 text-[14px] lg:text-[15px] font-medium">
                  <button className="w-9 h-9 lg:w-10 lg:h-10 bg-[#F3F4F6] rounded-xl font-semibold flex items-center justify-center">1</button>
                  <span className="text-[#9CA3AF]">...</span>
                  <button className="text-[#6B7280]">4</button>
                </div>

                <button className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 border border-gray-200 rounded-full text-[13px] lg:text-[14px] font-regular text-[#5C6473] hover:bg-gray-50 transition">
                  Next <GoArrowRight />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircleProfilePage;