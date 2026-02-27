"use client";

import React from "react";
import { SlLike } from "react-icons/sl";
import { FiEye, FiMessageCircle } from "react-icons/fi";
import { HiFire } from "react-icons/hi"; // Switched to solid for closer match

const GlowCard = ({ children }: { children: React.ReactNode }) => (
  <div className="relative p-[1.5px] rounded-[32px] overflow-hidden group">
    {/* The Glow/Border Layer */}
    <div 
      className="absolute inset-0 opacity-100 transition-opacity"
      style={{
        background: `linear-gradient(135deg, #FF8A48 0%, #00FF85 50%, #001AFF 100%)`,
      }}
    />
    {/* Inner Content Layer */}
    <div className="relative bg-white rounded-[31px] p-7 h-full flex flex-col justify-center">
      {children}
    </div>
  </div>
);

const PerformanceSidebar = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[450px] p-4">
      {/* 1. Total Engagements Card */}
      <GlowCard>
        <div className="mb-4">
          <span className="bg-[#F2F4F7] px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#667085]">
            Total Engagements
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <SlLike className="text-[#0A0A30] w-5 h-5" />
            <span className="text-[20px] font-medium text-[#0A0A30]">500</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FiEye className="text-[#0A0A30] w-6 h-6" />
            <span className="text-[20px] font-medium text-[#0A0A30]">500</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FiMessageCircle className="text-[#0A0A30] w-6 h-6" />
            <span className="text-[20px] font-medium text-[#0A0A30]">500</span>
          </div>
        </div>
      </GlowCard>

      {/* 2. Top Hooks Card */}
      <GlowCard>
        <div className="mb-4">
          <span className="bg-[#F2F4F7] px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#667085]">
            Top Hooks
          </span>
        </div>
        <div className="flex items-center gap-3">
          <HiFire className="text-[#FD6C1D] w-6 h-6 shrink-0" />
          <p className="text-[18px] text-[#0A0A30] font-medium tracking-tight">
            “Stop scrolling now, i have good news...”
          </p>
        </div>
      </GlowCard>

      {/* 3. Trending Hashtags Card */}
      <GlowCard>
        <div className="mb-4">
          <span className="bg-[#F2F4F7] px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#667085]">
            Trending Hashtags
          </span>
        </div>
        <div className="flex items-center gap-3">
          <HiFire className="text-[#FD6C1D] w-6 h-6 shrink-0" />
          <div className="flex flex-wrap gap-4">
            {["#DayInMyLife", "#Creator", "#FYP"].map((tag) => (
              <span key={tag} className="text-[18px] font-medium text-[#0A0A30]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

export default PerformanceSidebar;