"use client";

import React from "react";
import Image from "next/image";
import { MoveLeft, ThumbsUp, MessageCircle } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EngagementChart } from "@/components/(creator)/dashboard";


interface CreatorsSubmissionPostProps {
  onBack?: () => void;
}

const CreatorsSubmissionPost = ({ onBack }: CreatorsSubmissionPostProps) => {
  return (
    <div className="w-full space-y-10 pb-20">
      
      {/* 1. NAVIGATION HEADER */}
      <div 
        onClick={onBack}
        className="flex items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <MoveLeft size={20} className="text-[#0A0A30]" />
        <h2 className="text-[20px] font-normal text-[#0A0A30]">
          Creators Submission Post
        </h2>
      </div>

      {/* 2. TOP CONTENT SECTION (70/30 Split) */}
      <div className="grid grid-cols-12 gap-8 items-start">
        
        {/* LEFT: MEDIA CAROUSEL (70%) */}
        <div className="col-span-12 lg:col-span-8 relative group">
          <div className="aspect-[16/10] relative rounded-[24px] overflow-hidden bg-gray-100 shadow-sm">
            <Image 
              src="/card22.png" 
              alt="Media Content" 
              fill 
              className="object-cover"
            />
            
            {/* Carousel Controls */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#0A0A30] opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={24} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#0A0A30] opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* RIGHT: CREATOR DETAILS CARD (30%) */}
        <div className="col-span-12 lg:col-span-4 h-full">
          <div className="bg-white rounded-[24px] border border-[#F2F4F7] p-8 h-full shadow-sm flex flex-col">
            
            {/* Profile & Score */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <Image src="/avatar.svg" alt="Profile" width={48} height={48} />
                </div>
                <div>
                  <h4 className="text-[16px] font-normal text-[#0A0A30]">Favour</h4>
                  <p className="text-[11px] text-[#98A2B3]">@favvy</p>
                </div>
              </div>
              <div className="bg-[#FFF9F5] px-2 py-2 rounded-lg ">
                <p className="text-[9px] text-[#667085] font-medium leading-none">
                Starix Score: <span className="font-bold text-[11px] text-[#0A0A30]">150</span>
                </p>
                
              </div>
            </div>

            {/* Caption */}
            <div className="flex-grow">
               <p className="text-[15px] font-semibold text-[#0A0A30] leading-relaxed">
                I’ve been using this for about a week now, and honestly, I’m genuinely surprised
               </p>
            </div>

            {/* Bottom Engagement */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-[#F2F4F7]">
               <div className="flex items-center gap-2 text-[#0A0A30]">
                 <ThumbsUp size={18} />
                 <span className="text-[14px] font-normal">500</span>
               </div>
               <div className="flex items-center gap-2 text-[#0A0A30]">
                 <MessageCircle size={18} />
                 <span className="text-[14px] font-normal">10</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ENGAGEMENT RATE SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-normal text-[#0A0A30]">Engagement Rate</h3>
          
        </div>

        <EngagementChart />
      </div>
    </div>
  );
};

export default CreatorsSubmissionPost;