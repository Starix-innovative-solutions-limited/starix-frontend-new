/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiSearch, FiBell, FiX } from "react-icons/fi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import JoinCircleModal from "@/components/(creator)/dashboard/JoinCircleModal";
import CreateCircleModal from "@/components/(creator)/dashboard/CreateCircleModal";

const INITIAL_DATA = [
  { id: 1, name: "InnovateTech San Francisco", role: "Member", logo: "/chase-circle.svg", color: "text-[#2D93D0] bg-[#75C0F41A]", extra: 2 },
  { id: 2, name: "Visionary Designs Tokyo", role: "Member", logo: "/tesla-circle.svg", color: "text-[#2D93D0] bg-[#75C0F41A]", extra: 0 },
  { id: 3, name: "CreativeCorp London", role: "Admin", logo: "/cc-circle.svg", color: "text-[#AC2ACF] bg-[#EC8AFF1A]", extra: 4 },
  { id: 4, name: "FutureWorks Berlin", role: "Member", logo: "/ps-circle.svg", color: "text-[#2D93D0] bg-[#75C0F41A]", extra: 0 },
  { id: 5, name: "DesignSolutions New York", role: "Admin", logo: "/indomie-circle.svg", color: "text-[#AC2ACF] bg-[#EC8AFF1A]", extra: 2 },
  { id: 6, name: "FutureWorks Berlin", role: "Member", logo: "/fw-circle.svg", color: "text-[#2D93D0] bg-[#75C0F41A]", extra: 0 },
];

const CreatorCircles = () => {
  const [circles] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  
  // NEW STATE: Force the empty state view
  const [forceEmptyState, setForceEmptyState] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Logic: Show empty state if forceEmptyState is true OR if the data array is actually empty
  const shouldShowEmpty = forceEmptyState || circles.length === 0;

  const filteredCircles = circles.filter((circle) =>
    circle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] font-sans text-[#111827]">
      
      {/* HEADER SECTION */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-[20px] md:text-[24px] text-[#1E1F24] font-semibold tracking-tight">Creator Circles</h1>
          <p className="text-[#62636C] text-[15px] font-normal md:text-[12px]">Collaborate and grow with creators in your network</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative p-3 bg-white border border-gray-100 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <FiBell size={24} className="text-[#111827]" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
          </div>
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#FFB800] p-0.5 cursor-pointer">
            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden relative">
              <Image src="/avatar.svg" fill alt="Profile" className="object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* TOP ACTION CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-16">
        <div className="group relative overflow-hidden bg-[#FFEBE4] rounded-[24px] md:rounded-[32px] p-6 md:p-8 h-[180px] md:h-[230px] flex flex-col justify-between border border-[#FBE8E5]">
            <div className="w-[55%] sm:w-[180px] z-10">
                <h2 className="text-[15px] md:text-[18px] font-semibold mb-2">Start a Circle</h2>
                <p className="text-[#62636C] text-[10px] md:text-[12px]">Build your own team and invite creators to earn and grow together</p>
            </div>
            {/* UPDATED: onClick sets forceEmptyState to true */}
            <button 
              onClick={() => setForceEmptyState(true)}
              className="w-fit px-6 py-2.5 bg-transparent border border-[#8B8D98] rounded-full font-bold text-[12px] z-10 hover:bg-gray-50 transition-all"
            >
                Create Circle
            </button>
            <div className="absolute top-0 right-0 h-full w-[80%] pointer-events-none">
                <Image src="/sw1.svg" fill className="object-contain object-right" alt="Graphic" />
                <Image src="/sw2.svg" fill className="object-contain object-right" alt="Graphic" />
            </div>
        </div>

        <div className="group relative overflow-hidden bg-[#E9F6FF] rounded-[24px] md:rounded-[32px] p-6 md:p-8 h-[180px] md:h-[230px] flex flex-col justify-between border border-[#E5F1FF]">
            <div className="w-[55%] sm:w-[180px] z-10">
                <h2 className="text-[15px] md:text-[18px] font-semibold text-[#1E1F24] mb-2">Join a Circle</h2>
                <p className="text-[#62636C] text-[10px] md:text-[12px]">Enter a circle using an invitation code and start collaborating.</p>
            </div>
            <button onClick={() => setIsJoinModalOpen(true)} className="w-fit px-6 py-2.5 bg-transparent border border-[#8B8D98] rounded-full font-bold text-[12px] z-10 hover:bg-gray-50 transition-all">
                Enter Code
            </button>
            <div className="absolute top-0 right-0 h-full w-[100%] pointer-events-none">
                <Image src="/puzzle.svg" fill className="object-contain object-right" alt="Graphic" />
            </div>
        </div>
      </div>

      {/* SEARCH AND TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-[20px] font-semibold text-[#1E1F24]">Your Circles</h3>
          {forceEmptyState && (
            <button 
              onClick={() => setForceEmptyState(false)}
              className="text-xs text-blue-600 underline"
            >
              Reset View
            </button>
          )}
        </div>
        <div className="relative w-full md:w-[320px]">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your Circles"
            className="w-full bg-white border border-[#E5E7EB] rounded-full py-3.5 pl-12 pr-12 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><FiX size={18} /></button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {shouldShowEmpty ? (
        /* INSTANCE: USER HAS NO CIRCLES OR BUTTON WAS CLICKED */
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-[#F3F4F6] rounded-full mb-8 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-gray-300 text-6xl">○</span>
            </div>
          </div>
          <h3 className="text-[22px] md:text-[26px] font-bold text-[#1E1F24] mb-3">No circles yet</h3>
          <p className="text-[#62636C] text-[14px] md:text-[16px] max-w-[340px] leading-relaxed mb-8">
            Create a circle or join one to start collaborating on challenges.
          </p>
          <button onClick={() => setIsCreateModalOpen(true)} className="px-10 py-4 bg-[#0047FF] text-white rounded-full font-bold text-[15px] transition-all shadow-lg shadow-blue-200">
            Create Circle
          </button>
        </div>
      ) : filteredCircles.length === 0 ? (
        /* INSTANCE: SEARCH RETURNED NO RESULTS */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-[#F3F4F6] rounded-full mb-8" />
          <h3 className="text-[22px] md:text-[26px] font-bold text-[#1E1F24] mb-3">No circles found</h3>
          <p className="text-[#62636C] text-[14px] md:text-[16px] max-w-[340px] leading-relaxed">
            We couldn't find any circles matching your search. Try a different name or keyword.
          </p>
        </div>
      ) : (
        /* INSTANCE: DATA FOUND */
        <>
          <div className="bg-white overflow-x-auto no-scrollbar mb-12">
            <div className="min-w-[800px] md:min-w-full divide-y divide-[#EFF0F3]">
              {filteredCircles.map((circle) => (
                <div key={circle.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-all cursor-pointer">
                  {/* ... same circle content as before ... */}
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Image src={circle.logo} width={60} height={60} alt="Logo" className="object-contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#62636C]">{circle.name}</h4>
                      <div className="flex items-center gap-2 text-[12px] text-[#747682] mt-1 font-medium">
                        <span>28 Active Challenges</span>
                        <span className="text-gray-300">•</span>
                        <span>Ranked 250k Globally</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="flex -space-x-2.5">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden relative">
                          <Image src={`/grp${i}.svg`} fill alt="User" className="object-cover" />
                        </div>
                      ))}
                      {circle.extra > 0 && (
                        <div className="w-9 h-9 rounded-full border-2 border-white bg-[#D6E9FF] flex items-center justify-center text-[11px] font-bold text-[#2D93D0]">+{circle.extra}</div>
                      )}
                    </div>
                    <span className={`px-5 py-2 rounded-full text-[12px] font-medium min-w-[90px] text-center ${circle.color}`}>{circle.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between mt-10">
            <button className="flex items-center gap-2 px-8 py-3 border border-[#E5E7EB] rounded-full text-[14px] font-bold text-[#4B5563] hover:bg-gray-50 transition-all"><HiArrowLeft size={18} /> Previous</button>
            <div className="flex items-center gap-3">
              <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#F9F9FB] text-[14px] text-[#1E1F24] font-medium">1</button>
              <span className="text-gray-400 font-bold px-1">...</span>
              <button className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-500 text-[14px] font-medium hover:bg-gray-50">2</button>
            </div>
            <button className="flex items-center gap-2 px-8 py-3 border border-[#E5E7EB] rounded-full text-[14px] font-medium text-[#4B5563] hover:bg-gray-50 transition-all">Next <HiArrowRight size={18} /></button>
          </div>
        </>
      )}

      {/* MODAL INSTANCE */}
      <JoinCircleModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />

      <CreateCircleModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default CreatorCircles;