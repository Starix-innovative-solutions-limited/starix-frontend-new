/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import { FiSearch, FiChevronDown, FiInfo } from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LEADERBOARD_DATA = [
  { id: 1, name: "Jason oluwadarijimi", score: 96, trend: "neutral", avatar: "/no1.svg" },
  { id: 2, name: "Sally Rivera", score: 96, trend: "up", avatar: "/no2.svg" },
  { id: 3, name: "Sangotofunmi Oluwadar..", score: 96, trend: "down", avatar: "/no3.svg" },
  { id: 127, name: "You", score: 96, trend: "up", avatar: "/no127.svg", isUser: true },
];

const RightSideBar = ({ className, collapsed, setCollapsed }: any) => {
  const pathname = usePathname();
  
  /**
   * Local state to cycle through the different Wallet UI instances:
   * 'positive' | 'negative' | 'neutral' | 'all-time'
   */
  const [earningsView, setEarningsView] = useState<'positive' | 'negative' | 'neutral' | 'all-time'>('positive');

  // Route Detection
  const isChallengeView = pathname.includes("/dashboard/challenge/");
  const isChallengesListPage = pathname.startsWith("/challenges"); 
  const isPortfolioPage = pathname.startsWith("/portfolio");

  return (
    <aside
      className={`
        fixed md:static top-0 right-0 z-50
        h-screen bg-white border-l border-gray-100 flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[88px]" : "w-[360px]"}
        ${className}
      `}
    >
      {/* TOP SECTION: Search & Toggle */}
      <div className={`flex items-center pt-8 pb-6 px-6 gap-4 ${collapsed ? "flex-col justify-start" : "justify-between"}`}>
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
      <div className={`flex-1 overflow-y-auto px-4 space-y-6 no-scrollbar ${collapsed ? "hidden" : "block"}`}>
        
        {/* CASE 1: PORTFOLIO / WALLET VIEWS */}
        {isPortfolioPage ? (
          <div className="space-y-6">
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[16px] font-semibold text-[#1E1F24]">Total Earnings</h4>
                <div className="relative group">
                  <button className="flex items-center gap-1 text-[14px] font-medium text-[#1E1F24]">
                    {earningsView === 'all-time' ? 'All Time' : 'This Month'} <FiChevronDown size={16} />
                  </button>
                  {/* Dropdown to switch between the 4 figma instances */}
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

              {/* DYNAMIC EARNINGS INSTANCES BASED ON FIGMA UI */}
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

            {/* WITHDRAWAL ACCOUNT CARD */}
            <div className="bg-[#F9F9FB] border border-[#EFF0F3] rounded-[24px] p-6 shadow-xs">
              <h4 className="text-[16px] font-semibold text-[#1E1F24] mb-5">Withdrawal Account</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className=" flex items-center justify-center ">
                    <Image src="/zenith.svg" width={40} height={40} alt="Zenith Bank" className="object-contain" />
                  </div>
                  <div>
                    <h5 className="text-[14px] font-bold text-[#1E1F24]">0691081727 <span className="text-[#9CA3AF] font-medium">• Zenith</span></h5>
                    <p className="text-[12px] text-[#62636C] mt-0.5">Desire Destiny Oludara</p>
                  </div>
                </div>
                <button className="px-2 py-2 border border-[#E5E7EB] rounded-full text-[11px] font-medium text-[#1E1F24] hover:bg-gray-50 transition-colors">
                  Change
                </button>
              </div>
            </div>
          </div>

        /* CASE 2: CHALLENGES LIST VIEW */
        ) : isChallengesListPage ? (
          <div className="space-y-6">
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-4">
                <h4 className="font-bold text-[#1E1F24] text-[16px]">Recommended For You</h4>
                <Link href="/challenges/recommended">
                    <HiArrowRight className="text-[#1E1F24] cursor-pointer hover:text-blue-600 transition-colors" size={20} />
                </Link>
              </div>
              <div className="px-2 pb-2 space-y-1">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all">
                    <div className="flex items-center gap-1">
                      <Image src="/Spotify.svg" width={40} height={40} alt="Brand" />
                      <div>
                        <h5 className="text-[13px] font-semibold text-[#62636C] truncate w-32">Join Our Fitness App Beta Tes..</h5>
                        <div className="flex items-center gap-1 mt-0.5 text-[12px] text-[#747682]">
                          <span>FitLife</span> <GoCheckCircleFill className="text-green-500 text-[10px]" />
                          <span className="text-[#D9D9D9]">•</span> <span>₦5M prize pool</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-[#E5E7EB] rounded-full text-[12px] font-semibold text-[#1E1F24]">Submit</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-4">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Trending Challenges</h4>
                <HiArrowRight className="text-[#1E1F24]" size={20} />
              </div>
              <div className="px-5 pb-6 space-y-6">
                {[{ title: "UGC Creators Needed...", brand: "Nivea" }].map((c, i) => (
                  <div key={i} className="space-y-3">
                    <h5 className="text-[14px] font-semibold text-[#62636C]">{c.title}</h5>
                    <div className="flex items-center gap-2 text-[12px] text-[#747682]">
                      <span>18k views</span> <span className="text-[#D9D9D9]">•</span> <span>{c.brand}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        /* CASE 3: CHALLENGE DETAIL VIEW */
        ) : isChallengeView ? (
          <div className="space-y-6">
            <div className="bg-[#F5FBFF] border border-[#EBF2FF] rounded-[32px] p-4 relative overflow-hidden">
              <p className="text-[#1E1F24] text-[16px] font-semibold">Prize Pool</p>
              <h3 className="text-[#0047FF] text-[24px] font-semibold mt-1">₦10,550,000</h3>
              <p className="text-[#62636C] text-[14px] mt-3 max-w-[220px]">Reward distributed among top 15 ranked submissions.</p>
              <div className="absolute -bottom-10 -right-12 opacity-20">
                 <Image src="/gem.svg" alt="Prize" width={180} height={180} className="object-contain" />
              </div>
            </div>

            <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[32px] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5">
                <h4 className="font-semibold text-[#1E1F24] text-[15px]">Leaderboard</h4>
                <HiArrowRight className="text-[#9CA3AF]" size={18} />
              </div>
              <div className="bg-white rounded-t-[32px] pt-4">
                {LEADERBOARD_DATA.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-bold text-[#62636C] w-8">#{user.id}</span>
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

        /* CASE 4: INITIAL DASHBOARD VIEW */
        ) : (
          <div className="space-y-6">
            <div className="bg-[#F5FBFF] border border-[#EBF2FF] rounded-[32px] p-6 relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-[#111827] text-[20px] font-semibold">Starix Score</h4>
                  <p className="text-[#747682] text-[10px] mt-1 max-w-[180px]">Real-time measure of performance...</p>
                </div>
                <div className="relative w-10 h-10"><Image src="/dashlogo.svg" fill alt="Star" /></div>
              </div>
              <div className="w-full h-2.5 bg-[#C9E9FF] rounded-full mt-4 overflow-hidden"> 
                <div className="w-[89%] h-full bg-[#73A4FF] rounded-full" />
              </div>
              <div className="flex justify-between items-end mt-4">
                <div className="text-[40px] font-medium text-[#111827]">89<span className="text-[24px] ml-1">/100</span></div>
                <button className="bg-white border border-[#8B8D98] text-[#111827] px-3 py-3 rounded-full text-[12px] font-medium">Improve Score</button>
              </div>
            </div>

            <div className="bg-white border border-[#F3F4F6] rounded-[32px] p-2">
              <div className="flex items-center justify-between px-4 py-4"><h4 className="font-semibold text-[#1E1F24]">Global Leaderboard</h4><HiArrowRight className="text-[#9CA3AF]" size={18} /></div>
              {LEADERBOARD_DATA.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50/50 rounded-2xl transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-semibold text-[#62636C] w-6">#{user.id}</span>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100"><Image src={user.avatar} fill alt={user.name} /></div>
                    <span className={`text-[14px] ${user.isUser ? "text-[#0047FF] font-semibold" : "text-[#62636C]"}`}>{user.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="pt-4 pb-8">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] text-[#62636C] font-medium">
            <Link href="#" className="hover:text-[#111827]">About</Link>
            <Link href="#" className="hover:text-[#111827]">Terms</Link>
            <Link href="#" className="hover:text-[#111827]">Privacy</Link>
            <Link href="#" className="hover:text-[#111827]">Brands</Link>
            <Link href="#" className="hover:text-[#111827]">Contact</Link>
          </div>
          <p className="text-center text-[10px] text-[#62636C] mt-5 font-regular">
            ©2026 Starix. All Rights Reserved.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;