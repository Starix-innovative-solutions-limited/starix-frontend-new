/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import { FiSearch, FiChevronDown, FiInfo } from "react-icons/fi";
import { GoCheckCircleFill, GoPlus } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WithdrawModal from "./WithdrawModal";
import JoinRequestModal from "./JoinRequestModal";

const LEADERBOARD_DATA = [
  { id: 1, name: "Jason oluwadarijimi", score: 96, trend: "neutral", avatar: "/no1.svg" },
  { id: 2, name: "Sally Rivera", score: 96, trend: "up", avatar: "/no2.svg" },
  { id: 3, name: "Sangotofunmi Oluwadar..", score: 96, trend: "down", avatar: "/no3.svg" },
  { id: 127, name: "You", score: 96, trend: "up", avatar: "/no127.svg", isUser: true },
];

const RightSideBar = ({ className, collapsed, setCollapsed }: any) => {
  const pathname = usePathname();
  
  const [earningsView, setEarningsView] = useState<'positive' | 'negative' | 'neutral' | 'all-time'>('positive');

  // Route Detection
  const isChallengeView = pathname.includes("/dashboard/challenge/");
  const isChallengesListPage = pathname.startsWith("/challenges"); 
  const isPortfolioPage = pathname.startsWith("/portfolio");
  const isCreatorCirclesPage = pathname.includes("/creator-circles");

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isJoinRequestModalOpen, setIsJoinRequestModalOpen] = useState(false);
  const [selectedCircleLogo, setSelectedCircleLogo] = useState("");
  

  const isCreatorProfileView = 
    pathname.includes("/creator-circles/creator-profile") || 
    pathname.includes("/creator-circles/circle-profile");

  const isEarningInsightPage = pathname.includes("/creator-circles/earning-insight"); 

  const handleJoinClick = (logo: string) => {
    setSelectedCircleLogo(logo);
    setIsJoinRequestModalOpen(true);
  };

  const payoutMembers = [
    { name: "Sangotofunmi Oluwadarasimi (you)", percentage: "20%", avatar: "/no1.svg" },
    { name: "Kwame Nkrumah", percentage: "20%", avatar: "/no2.svg" },
    { name: "Adebayo Chidera", percentage: "10%", avatar: "/no3.svg" },
    { name: "Isabella Martinez", percentage: "10%", avatar: "/no1.svg" },
    { name: "Agbarapo Omolile", percentage: "10%", avatar: "/no2.svg" },
    { name: "Alayemi Konibaje", percentage: "10%", avatar: "/no3.svg" },
    { name: "Ekotibaje Already", percentage: "10%", avatar: "/no1.svg" },
    { name: "Ogunonipami Tijesunimi", percentage: "10%", avatar: "/no2.svg" },
  ];

  return (
    <aside
      className={`
        fixed md:static top-0 right-0 z-50
        h-screen bg-white border-l border-gray-100 flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[88px]" : "w-[416px]"}
        ${className}
      `}
    >
      {/* TOP SECTION: Search & Toggle */}
      <div className={`flex items-center pt-6 pb-6 px-6 gap-4 ${collapsed ? "flex-col justify-start" : "justify-between"}`}>
        <button
          onClick={setCollapsed}
          className={`
              shrink-0 transition-all duration-300 active:scale-95
              ${collapsed ? "opacity-0 pointer-events-none translate-x-[-10px]" : "opacity-100"}
          `}
        >
          <Image src="/close.svg" alt="Toggle Sidebar" width={40} height={40} className="object-contain" />
        </button>
        {!collapsed ? (
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
            <input
              type="text"
              placeholder="Search Starix"
              className="w-full bg-[#F8FAFC] border-none rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
        ) : (
          <button 
            onClick={setCollapsed}
            className="p-3 rounded-full bg-[#F8FAFC] text-[#9CA3AF] hover:text-[#0047FF] transition-all duration-300 -translate-y-[150%]"
          >
            <FiSearch size={20} />
          </button>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className={`flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar ${collapsed ? "hidden" : "block"}`}>

        {isEarningInsightPage ? (
          <div className="space-y-8 py-2">
            <div className="px-2">
              <h3 className="text-[20px] font-semibold text-[#1E1F24] mb-8">Transaction Detail</h3>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="relative shrink-0">
                  <Image src="/cocacola.svg" width={56} height={56} alt="Coca Cola" className="rounded-full" />
                  <div className="absolute bottom-0 right-0 bg-[#0CC963] rounded-full p-1 border-2 border-white leading-none flex items-center justify-center">
                    <GoPlus className="text-white text-[10px] rotate-45" />
                  </div>
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-[#62636C] leading-snug">
                    Content Writers for Travel Guide Collaboration
                  </h4>
                  <p className="text-[12px] text-[#747682] font-medium mt-1">
                    8 members payout <span className="mx-0.5">•</span> 5 minutes ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[16px] font-semibold text-[#62636C]">+ ₦35,000</span>
                <span className="px-3 py-1 bg-[#FFF8DB] text-[#665201] rounded-full text-[10px] font-medium">
                  Pending
                </span>
              </div>
            </div>

            <hr className="border-[#F8FAFC]" />

            <div className="px-2 pb-10">
              <h4 className="text-[16px] font-semibold text-[#1E1F24] mb-8">
                Payout Autosplitting on this Challenge
              </h4>
              
              <div className="space-y-6">
                {payoutMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={member.avatar} fill alt={member.name} className="object-cover" />
                      </div>
                      <span className="text-[14px] font-medium text-[#62636C]">
                        {member.name}
                      </span>
                    </div>
                    <span className="text-[14px] font-semibold text-[#62636C]">
                      {member.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : isCreatorProfileView ? (
          <div className="space-y-6">
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-5">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Challenges For Your Circle</h4>
                <HiArrowRight className="text-[#1E1F24]" size={20} />
              </div>
              <div className="px-2 pb-4 space-y-1">
                {[
                  { name: "FitLife", icon: "/nivea.svg" },
                  { name: "FitLife", icon: "/spotify.svg" },
                  { name: "FitLife", icon: "/tesla.svg" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all">
                    <div className="flex items-center gap-3">
                      <Image src={item.icon} width={40} height={40} alt={item.name} className="rounded-full" />
                      <div>
                        <h5 className="text-[12px] font-semibold text-[#62636C] leading-tight">Join Our Fitness App Beta Tes..</h5>
                        <div className="flex items-center gap-1 mt-1 text-[12px] text-[#747682] font-medium">
                          <span>{item.name}</span> <GoCheckCircleFill className="text-green-500 text-[10px]" />
                          <span className="text-[#D9D9D9]">•</span> <span>₦5M prize pool</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-2 py-2 bg-white border border-[#E5E7EB] rounded-full text-[12px] font-medium text-[#1E1F24] hover:bg-gray-50 transition-all">Submit</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-5">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Circle Leaderboard</h4>
                <HiArrowRight className="text-[#1E1F24]" size={20} />
              </div>
              <div className="pb-4">
                {[
                  { id: 1, trend: "star", name: "PixelPerfect Toronto", score: 96, logo: "/tesla-circle.svg", badge: 3 },
                  { id: 2, name: "CreativeCorp London", score: 96, logo: "/fw-circle.svg", badge: 3, trend: "up" },
                  { id: 3, name: "InnovateX Berlin", score: 96, logo: "/purple-circle.svg", badge: 3, trend: "down" },
                  { id: 127, name: "Design Studio NYC", score: 96, logo: "/nvidia-circle.svg", badge: 3, trend: "up" }
                ].map((circle, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 px-5 border-t border-[#F8FAFC] first:border-t-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-semibold text-[#62636C] w-6">#{circle.id}</span>
                      <div className="relative w-10 h-10 shrink-0">
                        <Image src={circle.logo} fill alt={circle.name} className="object-contain" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#C9E9FF] border border-white rounded-full flex items-center justify-center">
                          <span className="text-[#050E81] text-[10px] font-semibold leading-none">{circle.badge}</span>
                        </div>
                      </div>
                      <span className="text-[14px] font-semibold text-[#62636C] truncate w-32">{circle.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       {circle.trend === "up" ? (
                         <span className="text-green-500 text-[16px]">↑</span>
                       ) : circle.trend === "down" ? (
                         <span className="text-red-500 text-[16px]">↓</span>
                       ) : circle.trend === "star" ? (
                         <span className="text-yellow-400 text-[16px]">★</span>
                       ) : (
                         <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                       )}
                       <span className="text-[14px] font-semibold text-[#1E1F24]">{circle.score}</span>
                       <Image src="/contact star.svg" width={16} height={16} alt="points" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : isCreatorCirclesPage ? (
          <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#F8FAFC]">
              <h4 className="font-semibold text-[#1E1F24] text-[16px]">Open Circles</h4>
              <Link href="/creator-circles/explore" className="flex items-center gap-1.5 text-[14px] font-semibold text-[#1E1F24] hover:text-blue-600 transition-all">
                View All <HiArrowRight size={16} />
              </Link>
            </div>
            <div className="p-2 space-y-1">
              {[
                { name: "PixelPerfect Toronto", members: "3 Members", logo: "/tesla-circle.svg", rank: "250k", badge: 3 },
                { name: "Design Studio NYC", members: "7 Members", logo: "/nvidia-circle.svg", rank: "250k", badge: 7 },
                { name: "CreativeCorp London", members: "3 Members", logo: "/fw-circle.svg", rank: "250k", badge: 3 },
                { name: "InnovateX Berlin", members: "5 Members", logo: "/purple-circle.svg", rank: "250k", badge: 5 }
              ].map((circle, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image src={circle.logo} fill alt={circle.name} className="object-contain" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#C9E9FF] border-2 border-white rounded-full flex items-center justify-center">
                        <span className="text-[#050E81] text-[12px] font-semibold leading-none">{circle.badge}</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[14px] font-semibold text-[#62636C] leading-tight">{circle.name}</h5>
                      <p className="text-[12px] text-[#747682] font-medium mt-0.5">
                        {circle.members} <span className="text-[#D9D9D9] mx-1">•</span> Ranked {circle.rank} Globally
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleJoinClick(circle.logo)} className="px-2 py-2 border border-[#8B8D98] rounded-full text-[12px] font-medium text-[#1E1F24] hover:bg-white hover:border-blue-600 hover:text-blue-600 transition-all">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : isPortfolioPage ? (
          <div className="space-y-6">
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[16px] font-semibold text-[#1E1F24]">Total Earnings</h4>
                <div className="relative group">
                  <button className="flex items-center gap-1 text-[14px] font-medium text-[#1E1F24]">
                    {earningsView === 'all-time' ? 'All Time' : 'This Month'} <FiChevronDown size={16} />
                  </button>
                  <div className="hidden group-hover:block absolute right-0 top-full bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 w-32">
                    {(['positive', 'negative', 'neutral', 'all-time'] as const).map(v => (
                      <button 
                        key={v} 
                        onClick={() => setEarningsView(v)} 
                        className="block w-full text-left px-4 py-2 text-xs capitalize hover:bg-gray-50 text-[#62636C]"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[24px] font-semibold text-[#1E1F24]">₦432,000</span>
                <span className="text-[24px] font-semibold text-[#80828D]">.00</span>
              </div>

              {earningsView === 'positive' && (
                <div className="flex items-center gap-1.5 text-[#22C55E] text-[14px] font-medium">
                  <span className="text-[18px]">+</span>
                  <span>12% higher than last month</span>
                </div>
              )}

              {earningsView === 'negative' && (
                <div className="flex items-center gap-1.5 text-[#FD6C1D] text-[14px] font-medium">
                  <span className="text-[18px]">—</span>
                  <span>4% lower than last month</span>
                </div>
              )}

              {earningsView === 'neutral' && (
                <div className="text-[#747682] text-[14px] font-medium">
                  Same as last month
                </div>
              )}

              {earningsView === 'all-time' && (
                <div className="flex items-center gap-1.5 text-[#747682] text-[12px] font-medium">
                  <FiInfo size={14} className="text-[#9CA3AF]" />
                  <span>Recommended challenges increase chances to Earn</span>
                </div>
              )}
            </div>

            <div className="bg-[#F9F9FB] border border-[#EFF0F3] rounded-[24px] p-6 shadow-xs">
              <h4 className="text-[16px] font-semibold text-[#1E1F24] mb-5">Withdrawal Account</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className=" flex items-center justify-center ">
                    <Image src="/zenith.svg" width={40} height={40} alt="Zenith Bank" className="object-contain" />
                  </div>
                  <div>
                    <h5 className="text-[14px] font-semibold text-[#1E1F24]">0691081727 <span className="text-[#9CA3AF] font-medium">• Zenith</span></h5>
                    <p className="text-[12px] text-[#62636C] mt-0.5">Desire Destiny Oludara</p>
                  </div>
                </div>
                <button onClick={() => setIsWithdrawModalOpen(true)} className="px-2 py-2 border border-[#E5E7EB] rounded-full text-[11px] font-medium text-[#1E1F24] hover:bg-gray-50 transition-colors">
                  Change
                </button>
              </div>
            </div>
          </div>
        ) : isChallengesListPage ? (
          <div className="space-y-6">
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFF0F3]">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Recommended For You</h4>
                <Link href="/challenges/recommended">
                    <HiArrowRight className="text-[#1E1F24] cursor-pointer hover:text-blue-600 transition-colors" size={20} />
                </Link>
              </div>
              <div className="px-2 pb-2 space-y-1">
                {[
                  { name: "Nivea", icon: "/nivea.svg", prize: "₦5M" },
                  { name: "Spotify", icon: "/spotify.svg", prize: "₦5M" },
                  { name: "Tesla", icon: "/tesla.svg", prize: "₦5M" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all">
                    <div className="flex items-center gap-1">
                      <Image src={item.icon} width={40} height={40} alt={item.name} className="rounded-full" />
                      <div>
                        <h5 className="text-[13px] font-semibold text-[#62636C] truncate w-32">Join Our Fitness App Beta Tes..</h5>
                        <div className="flex items-center gap-1 mt-0.5 text-[12px] text-[#747682]">
                          <span>{item.name}</span> <GoCheckCircleFill className="text-green-500 text-[10px]" />
                          <span className="text-[#D9D9D9]">•</span> <span>{item.prize} prize pool</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-[#E5E7EB] rounded-full text-[12px] font-semibold text-[#1E1F24] hover:bg-white transition-all">Submit</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-4 border-b mb-4 border-[#EFF0F3]">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Trending Challenges</h4>
                <Link href="/challenges/trending">
                  <HiArrowRight className="text-[#1E1F24] hover:text-blue-600 transition-colors" size={20} />
                </Link>
              </div>
              <div className="px-5 pb-6 space-y-6">
                {[
                  { title: "UGC Creators Needed for Skincare Product set La..", views: "18k views", brand: "Nivea", avatars: ["/grp.svg", "/grp1.svg", "/grp2.svg"] },
                  { title: "Seeking Artists for Limited Edition Sneakers Colla..", views: "30k views", brand: "Lobster and Beer", avatars: ["/grp.svg", "/grp1.svg", "/grp2.svg"] },
                  { title: "Influencer Partnerships for New Fitness App Rele..", views: "24k views", brand: "FitLife", avatars: ["/grp.svg", "/grp1.svg", "/grp2.svg"] }
                ].map((c, i) => (
                  <div key={i} className="space-y-1">
                    <h5 className="text-[13px] font-semibold text-[#62636C] leading-snug">{c.title}</h5>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-1">
                        {c.avatars.map((img, index) => (
                          <div key={index} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden relative">
                            <Image src={img} fill alt="user" className="object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[12px] text-[#747682] font-medium">
                        <span>{c.views}</span>
                        <span className="text-[#D9D9D9]">•</span>
                        <span>{c.brand}</span>
                        {(c.brand === "Nivea" || c.brand === "FitLife") && <GoCheckCircleFill className="text-green-500 text-[11px]" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : isChallengeView ? (
          <div className="space-y-6">
            <div className="bg-[#F5FBFF] border border-[#EBF2FF] rounded-[32px] p-4 relative overflow-hidden">
              <p className="text-[#1E1F24] text-[16px] font-semibold">Prize Pool</p>
              <h3 className="text-[#0047FF] text-[24px] font-semibold mt-1">₦10,550,000</h3>
              <p className="text-[#62636C] font-medium leading-tight text-[14px] mt-3 max-w-[220px]">Prize pool will be shared equally between the <span className="text-[#FD6C1D]">top 15 submissions</span> for this challenge.</p>
              <div className="absolute -bottom-10 -right-12">
                 <Image src="/gem.svg" alt="Prize" width={200} height={200} className="object-contain" />
              </div>
            </div>
            <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[32px] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5">
                <h4 className="font-semibold text-[#1E1F24] text-[15px]">Challenge Leaderboard</h4>
                <HiArrowRight className="text-[#9CA3AF]" size={18} />
              </div>
              <div className="bg-white rounded-t-[32px] pt-4">
                {LEADERBOARD_DATA.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-semibold text-[#62636C] w-8">#{user.id}</span>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                        <Image src={user.avatar} fill alt={user.name} className="object-cover" />
                      </div>
                      <span className={`text-[14px] ${user.isUser ? "text-[#0047FF] font-medium" : "text-[#62636C]"}`}>{user.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* CASE 4: INITIAL DASHBOARD VIEW - RECONFIGURED FOR FIGMA UI ACCURACY */
          <div className="space-y-6">
            {/* Starix Score Panel */}
            <div className="bg-[#F5FBFF] border border-[#EBF2FF] rounded-[24px] p-6 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[#1E1F24] text-[20px] font-semibold tracking-tight">Starix Score</h4>
                  <p className="text-[#62636C] text-[10px] font-regular mt-1 leading-normal max-w-[240px]">
                    A real-time measure of your creator performance, visibility, and brand readiness
                  </p>
                </div>
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/dashlogo.svg" fill alt="Star Icon" className="object-contain" />
                </div>
              </div>

              {/* Progress Container */}
              <div className="w-full h-[10px] bg-[#D4EBFF] rounded-full mt-6 overflow-hidden"> 
                <div className="w-[89%] h-full bg-[#4082FF] rounded-full" />
              </div>

              {/* Score Value & CTA Action */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-[40px] font-medium text-[#1E1F24] leading-none tracking-tight">
                  89<span className="text-[20px] text-[#747682] font-medium ml-0.5">/100</span>
                </div>
                <button className="border border-[#8B8D98] text-[#1E1F24] px-5 py-2.5 rounded-full text-[12px] font-medium  hover:bg-gray-50 transition-colors cursor-pointer">
                  Improve Score
                </button>
              </div>
            </div>

            {/* Global Leaderboard Container Panel */}
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-5 border-b border-[#F8FAFC]">
                <h4 className="font-semibold text-[#1E1F24] text-[16px] tracking-tight">Global Leaderboard</h4>
                <HiArrowRight className="text-[#62636C] cursor-pointer hover:text-blue-600 transition-colors" size={26} />
              </div>
              
              <div className="divide-y divide-[#F8FAFC]">
                {LEADERBOARD_DATA.map((user) => (
                  <div key={user.id} className="flex items-center justify-between py-4 px-5 transition-colors hover:bg-gray-50/40">
                    <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-[14px] font-semibold text-[#62636C] w-6 shrink-0">#{user.id}</span>
                    
                    {/* PROFILE IMAGE WITH GRADIENT SPLIT RING CONDITION */}
                    <div 
                      className={`
                        relative w-10 h-10 shrink-0 rounded-full flex items-center justify-center p-[2px]
                        ${user.isUser 
                          ? "[background-image:conic-gradient(#0047FF_0deg_180deg,#FD6C1D_180deg_360deg)]" 
                          : "border-2 border-[#73A4FF]"}
                      `}
                    >
                      {/* Inner structural mask container for the avatar image */}
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
                        <Image src={user.avatar} fill alt={user.name} className="object-cover" />
                      </div>
                    </div>
                    
                    <span className={`text-[14px] font-semibold truncate ${user.isUser ? "text-[#1E1F24]" : "text-[#62636C]"}`}>
                      {user.id === 127 ? "You" : user.name}
                    </span>
                  </div>

                    {/* Right-aligned Score Metrics & Status indicators */}
                    <div className="flex items-center gap-1.5 shrink-0 pl-2">
                      {user.trend === "up" && (
                        <span className="text-[#22C55E] text-[15px] font-semibold leading-none">↑</span>
                      )}
                      {user.trend === "down" && (
                        <span className="text-[#EF4444] text-[15px] font-semibold leading-none">↓</span>
                      )}
                      {user.trend === "neutral" && (
                        <span className="text-[#9CA3AF] text-[26px] font-semibold leading-none select-none">•</span>
                      )}
                      
                      <span className="text-[14px] font-semibold text-[#1E1F24]">{user.score}</span>
                      <div className="relative w-4 h-4">
                        <Image src="/contact star.svg" fill alt="Star Point Asset" className="object-contain" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="pt-4 pb-8">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] text-[#62636C] font-medium">
            <Link href="#" className="hover:text-[#111827]">Creators</Link>
            <Link href="#" className="hover:text-[#111827]">Terms</Link>
            <Link href="#" className="hover:text-[#111827]">Privacy</Link>
            <Link href="#" className="hover:text-[#111827]">Brands</Link>
            <Link href="#" className="hover:text-[#111827]">Contact</Link>
          </div>
          <p className="text-center text-[10px] text-[#62636C] mt-5 font-regular">
            ©2026 Starix. All Rights Reserved.
          </p>
        </div>
        <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} balance={432000} />
        
        <JoinRequestModal 
            isOpen={isJoinRequestModalOpen} 
            onClose={() => setIsJoinRequestModalOpen(false)} 
            circleLogo={selectedCircleLogo}
        />
      </div>
    </aside>
  );
};

export default RightSideBar;