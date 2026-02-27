"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import PerformanceSidebar from "@/components/(brand)/analytics/PerfomanceSidebar";
import CardSubmission from "@/components/(brand)/submissions/CardSubmission";


export default function ChallengePerformancePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#0A0A30] hover:opacity-70 transition-opacity"
            >
              <FiArrowLeft className="w-5 h-5" />
              <h1 className="text-[24px] font-normal tracking-tight">Challenge Performance</h1>
            </button>
            
            {/* Meta Info Row with Dots */}
            <div className="flex flex-wrap items-center gap-3 text-[14px]">
              <div className="flex items-center rounded-2xl px-2 bg-[#f3f4f5] gap-2 text-[#667085]">
                <span className="w-3 h-3 rounded-full bg-[#667085]" />
                Challenge Name
              </div>
              <div className="flex items-center rounded-2xl px-2 bg-[#f3f4f5] gap-2">
                <span className="w-3 h-3 rounded-full bg-[#667085]" />
                 Category
                
              </div>
              <div className="flex items-center px-2 rounded-2xl bg-[#f3f4f5] gap-2 text-[#667085]">
                <span className="w-3 h-3 rounded-full bg-[#667085]" />
                200 Creators
              </div>
              <div className="flex items-center px-2 rounded-2xl bg-[#f3f4f5] gap-2 text-[#667085]">
                <span className="w-3 h-3 rounded-full bg-[#667085]" />
                $400
              </div>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-[#f3f4f5] transition-colors self-start md:self-center">
            <FiUpload className="w-4 h-4" />
            Export
          </button>
        </header>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Side: Submission Feed (75%) */}
          {/* This is the component you already built */}
          <div className="col-span-12 lg:col-span-8 bg-white p-8 shadow-xs">
             <CardSubmission />
             <CardSubmission />
             <CardSubmission />

          </div>

          {/* Right Side: Sidebar Metrics (25%) */}
          <div className="col-span-12 lg:col-span-4">
            <PerformanceSidebar />
          </div>

        </div>
      </div>
    </div>
  );
}