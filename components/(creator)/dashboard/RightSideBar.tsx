/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
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
  const isChallengeView = pathname.includes("/dashboard/challenge/");

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
      {/* TOP SECTION: Search & Toggle (Preserving your exact original styling) */}
      <div className={`flex items-center pt-8 pb-6 px-6 gap-4 ${collapsed ? "flex-col justify-start" : "justify-between"}`}>
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
            className="p-3 rounded-full bg-[#F8FAFC] text-[#9CA3AF] hover:text-[#0047FF] transition-colors mb-2"
          >
            <FiSearch size={20} />
          </button>
        )}

        <button
          onClick={setCollapsed}
          className="shrink-0 transition-transform active:scale-95"
        >
          <Image src="/dashlogo.svg" alt="Toggle Sidebar" width={40} height={40} className="object-contain" />
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className={`flex-1 overflow-y-auto px-4 space-y-6 no-scrollbar ${collapsed ? "hidden" : "block"}`}>
        
        {isChallengeView ? (
          /* --- CHALLENGE VIEW CONTENT (New Integration) --- */
          <>
            <div className="bg-[#F5FBFF] border border-[#EBF2FF] rounded-[32px] p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[#1E1F24] text-[16px] font-semibold">Prize Pool</p>
                <h3 className="text-[#0047FF] text-[24px] font-semibold mt-1 leading-none">₦10,550,000</h3>
                <p className="text-[#62636C] text-[14px] font-medium mt-3 max-w-[220px] leading-relaxed">
                  This reward will be distributed among the <span className="text-[#FD6C1D]">top 15 ranked submissions</span> based on final performance scores.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-12 w-45 h-45">
                 <Image src="/gem.svg" alt="Prize" fill className="object-contain" />
              </div>
            </div>

            <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[32px] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5">
                <h4 className="font-semibold text-[#1E1F24] text-[15px]">Challenge Leader-board</h4>
                <HiArrowRight className="text-[#9CA3AF]" size={18} />
              </div>
              <div className="bg-white rounded-t-[32px] pt-4">
                <div className="flex items-center px-6 pb-2 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">
                    <span className="w-12">Rank</span>
                    <span className="flex-1 ml-2">Username</span>
                    <span className="w-30 text-right">Challenge Score</span>
                </div>
                <div className="divide-y divide-[#F9FAFB]">
                  {LEADERBOARD_DATA.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[14px] font-bold text-[#62636C] w-8">#{user.id}</span>
                        <div className={`relative w-8 h-8 rounded-full p-[1.5px] shrink-0 ${user.isUser ? "bg-[conic-gradient(#0033FF_0%_50%,#FD6C1D_50%_100%)]" : "bg-gray-200"}`}>
                           <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
                              <Image src={user.avatar} fill alt={user.name} className="object-cover" />
                           </div>
                        </div>
                        <span className={`text-[14px] truncate max-w-[110px] ${user.isUser ? "font-medium text-[#0047FF]" : "font-medium text-[#62636C]"}`}>
                          {user.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 w-20 justify-end">
                        <span className="text-[10px] text-gray-300">●</span>
                        <span className="text-[14px] font-medium text-[#111827]">{user.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* --- INITIAL DASHBOARD VIEW (Strictly Untouched) --- */
          <>
            <div className="bg-[#F5FBFF] border border-[#EBF2FF] rounded-[32px] p-6 relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-[#111827] text-[20px] font-semibold">Starix Score</h4>
                  <p className="text-[#6B7280] text-[10px] font-normal leading-tight mt-1 max-w-[180px]">
                    A real-time measure of your creator performance, visibility, and brand readiness
                  </p>
                </div>
                <div className="relative w-10 h-10">
                    <Image src="/dashlogo.svg" fill alt="Star" className="object-contain" />
                </div>
              </div>

              <div className="w-full h-2.5 bg-[#C9E9FF] rounded-full mt-4 overflow-hidden"> 
                <div className="w-[89%] h-full bg-[#73A4FF] rounded-full" />
              </div>

              <div className="flex justify-between items-end mt-4">
                <div className="text-[40px] font-medium text-[#111827] leading-none tracking-tight">
                  89<span className="text-[24px] text-[#1E1F24] font-medium ml-1">/100</span>
                </div>
                <button className="bg-white border border-[#8B8D98] text-[#111827] px-3 py-3 rounded-full text-[12px] font-medium hover:bg-gray-50 transition-colors ">
                  Improve Score
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#F3F4F6] rounded-[32px] p-2 shadow-sm">
              <div className="flex items-center justify-between px-4 py-4">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Global Leaderboard</h4>
                <HiArrowRight className="text-[#9CA3AF] cursor-pointer hover:text-black transition-colors" size={18} />
              </div>

              <div className="divide-y divide-[#F9FAFB]">
                {LEADERBOARD_DATA.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50/50 rounded-2xl transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-semibold text-[#62636C] w-6">#{user.id}</span>
                      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                        ${user.isUser ? "p-[2px] bg-[conic-gradient(#0033FF_0%_50%,#FD6C1D_50%_100%)]" : "bg-gray-100 border-2 border-[#6eb3e0]"}`}
                      >
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                          <Image src={user.avatar} fill alt={user.name} className="object-cover" />
                        </div>
                      </div>
                      <span className={`text-[14px] truncate max-w-[110px] ${user.isUser ? "font-semibold text-[#0047FF]" : "font-medium text-[#62636C]"}`}>
                        {user.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-[#111827]">{user.score}</span>
                      <div className="relative w-3.5 h-3.5"><Image src="/dashlogo.svg" fill alt="Star" className="object-contain" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* FOOTER LINKS (Always Visible) */}
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