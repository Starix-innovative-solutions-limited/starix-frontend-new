/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import JoinCircleModal from "@/components/(creator)/dashboard/JoinCircleModal";
import CreateCircleModal from "@/components/(creator)/dashboard/CreateCircleModal";
import RequestsModal from "@/components/(creator)/dashboard/RequestsModal";
import { useGetCircles } from "@/hooks/useCircles";
import { CircleMembersAvatar } from "@/components/(creator)/dashboard/CircleMembersAvatar";
import NotificationDropdown from "@/components/(creator)/dashboard/NotificationDropdown";
import Link from "next/link";

const CreatorCircles = () => {
  const [page, setPage] = useState(1);
  const { data: circleData, isLoading } = useGetCircles(page);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);

  const circles = circleData?.items || [];
  const totalPages = circleData?.total_pages || 1;

  const filteredCircles = circles.filter((circle: any) =>
    circle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const shouldShowEmpty = !isLoading && circles.length === 0;

  return (
    <div className="max-w-[1200px] font-geist text-[#111827]">
      
      {/* HEADER SECTION */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[20px] md:text-[24px] text-[#1E1F24] font-semibold tracking-tight">Creator Circles</h1>
          <p className="text-[#62636C] text-[15px] font-normal md:text-[12px]">Collaborate and grow with creators in your network</p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-600 p-0.5 cursor-pointer">
            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden relative flex items-center justify-center">
              <Link href="/creator-circles/circle-profile">
                <div className="w-full h-full bg-gray-300" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* TOP ACTION CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4">
        <div className="group relative overflow-hidden bg-[#FFEBE4] rounded-[24px] md:rounded-[32px] p-4 md:p-5 h-[180px] md:h-[200px] flex flex-col justify-between border border-[#FBE8E5]">
            <div className="w-[55%] sm:w-[180px] z-10">
                <h2 className="text-[16px] md:text-[18px] font-semibold mb-1">Start a Circle</h2>
                <p className="text-[#62636C] min-w-[200px] text-[10px] md:text-[12px]">Build your own team and invite creators to earn and grow together</p>
            </div>
            <button onClick={() => setIsCreateModalOpen(true)} className="w-fit px-6 py-2.5 bg-transparent border border-[#8B8D98] rounded-full font-semibold text-[12px] z-10 hover:shadow-sm transition-all">Create Circle</button>
            <div className="absolute top-0 right-0 h-full w-[80%] pointer-events-none">
                <Image src="/sw1.svg" fill className="object-contain object-right" alt="Graphic" />
                <Image src="/sw2.svg" fill className="object-contain object-right" alt="Graphic" />
            </div>
        </div>

        <div className="group relative overflow-hidden bg-[#E9F6FF] rounded-[24px] md:rounded-[32px] p-4 md:p-5 h-[180px] md:h-[200px] flex flex-col justify-between border border-[#E5F1FF]">
            <div className="w-[55%] sm:w-[180px] z-10">
                <h2 className="text-[16px] md:text-[18px] font-semibold text-[#1E1F24] mb-1">Join a Circle</h2>
                <p className="text-[#62636C] min-w-[200px] text-[10px] md:text-[12px]">Enter a circle using an invitation code and start collaborating.</p>
            </div>
            <button onClick={() => setIsJoinModalOpen(true)} className="w-fit px-6 py-2.5 bg-transparent border border-[#8B8D98] rounded-full font-semibold text-[12px] z-10 hover:shadow-sm transition-all">Enter Code</button>
            <div className="absolute top-0 right-0 h-full w-[100%] pointer-events-none">
                <Image src="/puzzle.svg" fill className="object-contain object-right" alt="Graphic" />
            </div>
        </div>
      </div>

      {/* REQUESTS LINK */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={() => setIsRequestsModalOpen(true)}
          className="text-[12px] font-semibold text-[#62636C] hover:text-[#0047FF] underline underline-offset-4 decoration-2 transition-all"
        >
          View Pending Join Requests
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-[20px] font-semibold text-[#62636C]">Your Circles</h3>
        <div className="relative w-full md:w-[320px]">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your Circles"
            className="w-full bg-white border border-[#E5E7EB] rounded-full py-3.5 pl-12 pr-12 text-sm outline-none"
          />
        </div>
      </div>

      {/* LIST */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400">Loading your circles...</div>
      ) : shouldShowEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-[22px] font-semibold mb-3">No circles yet</h3>
          <button onClick={() => setIsCreateModalOpen(true)} className="px-6 py-3 bg-[#0047FF] text-white rounded-full font-normal">Create Circle</button>
        </div>
      ) : (
        <>
          <div className="bg-white overflow-x-auto no-scrollbar mb-12">
            <div className="min-w-[800px] md:min-w-full divide-y divide-[#EFF0F3]">
              {filteredCircles.map((circle: any) => (
                <Link 
                  key={circle.circle_id} 
                  href={`/creator-circles/${circle.circle_id}/circle-profile`} 
                  className="block"
                >
                  <div className="flex items-center justify-between py-4 hover:bg-gray-50/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 relative bg-gray-200 flex items-center justify-center">
                        {circle.profile_picture_url ? (
                          <Image src={circle.profile_picture_url} fill alt={circle.name} className="object-cover" />
                        ) : (
                          <span className="text-sm font-bold text-gray-500 uppercase">{circle.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[14px] text-[#111827]">{circle.name}</h4>
                        <div className="flex items-center gap-2 text-[12px] text-[#747682] mt-1">
                          <span>{circle.active_challenge_count} Active Challenges</span>
                          <span>•</span>
                          <span>Ranked {circle.global_rank} Globally</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <CircleMembersAvatar circleId={circle.circle_id} />
                      
                      <span className={`px-4 py-1.5 rounded-full text-[12px] font-medium ${
                        circle.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {circle.role === 'admin' ? 'Admin' : 'Member'}
                      </span>
                    </div>
                    
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between mt-10">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="flex items-center gap-2 px-8 py-3 border rounded-full text-[14px] font-semibold text-[#4B5563] disabled:opacity-50">
              <HiArrowLeft size={18} /> Previous
            </button>
            <span className="text-sm font-medium">Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="flex items-center gap-2 px-8 py-3 border rounded-full text-[14px] font-semibold text-[#4B5563] disabled:opacity-50">
              Next <HiArrowRight size={18} />
            </button>
          </div>
        </>
      )}

      <JoinCircleModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} circleId={""} circleName={""} />
      <CreateCircleModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <RequestsModal 
        isOpen={isRequestsModalOpen} 
        onClose={() => setIsRequestsModalOpen(false)} 
      />
    </div>
  );
};

export default CreatorCircles;