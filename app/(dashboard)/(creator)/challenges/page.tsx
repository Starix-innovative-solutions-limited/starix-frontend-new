/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch as SearchIcon, FiSliders as FilterIcon } from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";
import Image from "next/image";
import { 
  useGetChallenges, 
  useGetJoinedActiveChallenges, 
  useGetJoinedCompletedChallenges ,
  useGetSavedChallenges
} from "@/hooks/useChallenges"; 
import Loader from "@/components/Loader"; 

const ChallengesPage = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Core Endpoints Wiring (React Query optimizes cache & refetches automatically)
  const { 
    data: activeData, 
    isLoading: activeLoading, 
    isError: activeError 
  } = useGetJoinedActiveChallenges();

  const { 
    data: completedData, 
    isLoading: completedLoading, 
    isError: completedError 
  } = useGetJoinedCompletedChallenges();

  const { 
  data: savedData, 
  isLoading: savedLoading, 
  isError: savedError 
} = useGetSavedChallenges();

  // 2. Compute dynamic lifecycle state based on current tab contextual placement
  const isLoading = 
    activeTab === "Active" ? activeLoading : 
    activeTab === "Completed" ? completedLoading : savedLoading;

  const isError = 
    activeTab === "Active" ? activeError : 
    activeTab === "Completed" ? completedError : savedError;

  const tabs = ["Active", "Completed", "Saved"];

  // 3. Normalize multiple server schemas smoothly down into a clean, unified runtime shape
  const normalizedChallenges = React.useMemo(() => {
    // ACTIVE TAB ROUTING
    if (activeTab === "Active") {
      if (!activeData?.items) return [];
      return activeData.items.map((item) => ({
        id: item.challenge_id,
        title: item.title,
        brand_name: item.brand_name,
        brand_profile_picture_url: item.brand_logo_url,
        prize_pool_display: item.prize_pool_formatted,
        status: item.status === "in_progress" ? "In Progress" : item.status,
      }));
    }

    // COMPLETED TAB ROUTING
    if (activeTab === "Completed") {
      if (!completedData?.items) return [];
      return completedData.items.map((item) => ({
        id: item.challenge_id,
        title: item.title,
        brand_name: item.brand_name,
        brand_profile_picture_url: item.brand_logo_url,
        prize_pool_display: item.prize_pool_formatted,
        status: item.status || "Completed",
      }));
    }

    // SAVED TAB ROUTING
    if (activeTab === "Saved") {
    if (!savedData?.items) return [];
    return savedData.items.map((item) => ({
      id: item.challenge_id,
      title: item.title,
      brand_name: item.brand_name,
      brand_profile_picture_url: item.brand_logo_url,
      prize_pool_display: item.prize_pool_formatted,
      status: "Saved",
    }));
  }
  return [];
}, [activeTab, activeData, completedData, savedData]);

  // 4. Client Side Dynamic Parameter Keyword Filters
  const filteredChallenges = React.useMemo(() => {
    return normalizedChallenges.filter((challenge) => {
      const matchesSearch =
        challenge.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.brand_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [normalizedChallenges, searchQuery]);

  // Design system helper mapping pill backgrounds cleanly
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "winner":
        return "bg-[#03FC6C1A] text-[#27AE60]";
      case "ranked":
        return "bg-[#EC8AFF1A] text-[#AC2ACF]";
      case "finalist":
        return "bg-[#75C0F41A] text-[#2D93D0]";
      case "in progress":
      case "in_progress":
        return "bg-[#0033FF1A] text-[#0033FF]";
      case "completed":
        return "bg-gray-100 text-gray-700";
      case "not qualified":
      case "failed":
        return "bg-[#FE34260F] text-[#FE3426]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Geist']">
      <div>
        
        {/* TOP HEADER SECTION */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-shrink-0">
            <h1 className="text-lg md:text-xl xl:text-[24px] font-semibold text-[#000000]">Challenges</h1>
            <p className="text-[#62636C] text-[10px] md:text-[12px] hidden sm:block">
              {isLoading ? "Checking matches..." : `You have ${filteredChallenges.length} campaigns listed`}
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <button className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 border border-[#8B8D98] rounded-full text-[11px] md:text-sm font-medium text-[#374151] hover:bg-gray-50 transition-all flex-shrink-0 cursor-pointer">
              <FilterIcon className="text-sm md:text-lg" />
              <span>Filter</span>
            </button>
            
            <div className="relative w-1/3 max-w-[120px] xs:max-w-[180px] md:max-w-md transition-all duration-300">
              <SearchIcon className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#62636C] text-sm md:text-lg" />
              <input 
                type="text" 
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-2.5 bg-[#F9F9FB] border border-[#EFF0F3] rounded-full text-[11px] md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center mx-3 gap-4 md:gap-12 border-b border-[#F3F4F6]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs md:text-[14px] font-medium transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === tab ? "text-[#0033FF] font-semibold" : "text-[#747682] hover:text-gray-900"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-blue-600 rounded-full" 
                />
              )}
            </button>
          ))}
        </div>

        {/* LOADING & ERROR STATES HANDLING */}
        {isLoading && (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-3 border-t border-[#F3F4F6]">
            <Loader />
            <p className="text-xs text-[#747682] font-medium tracking-wide">Syncing real-time challenges...</p>
          </div>
        )}

        {isError && (
          <div className="w-full my-6 p-6 text-center bg-red-50/50 border border-red-100 rounded-[24px]">
            <p className="text-xs font-semibold text-[#D12B1F]">Failed to sync database entries. Please check network connection.</p>
          </div>
        )}

        {/* CHALLENGE LIST VIEW PANEL */}
        {!isLoading && !isError && (
          <div className="flex flex-col border-t border-[#F3F4F6]">
            <AnimatePresence mode="popLayout">
              {filteredChallenges.length === 0 ? (
                /* DYNAMIC EMPTY STATE UI ELEMENT */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center justify-center py-16 px-4 text-center"
                >
                  <div className="flex items-center justify-center mb-4 ">
                    <Image 
                      src="/dashlogo.svg" 
                      alt="Logo" 
                      width={100} 
                      height={100} 
                      className="w-10 h-auto" 
                    />
                  </div>
                  
                  <h3 className="text-[#1E1F24] text-[16px] font-bold mb-1">
                    No {activeTab} Challenges Found
                  </h3>
                  
                  <p className="text-[#62636C] text-[13px] max-w-sm mb-6 leading-relaxed font-medium">
                    {searchQuery 
                      ? `We couldn't find any match variations for "${searchQuery}". Try refining your keywords.`
                      : `You don't have any challenges under the ${activeTab.toLowerCase()} filtering layer right now.`}
                  </p>

                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="px-5 py-2.5 bg-[#0033FF] hover:bg-blue-700 text-white font-semibold text-[13px] rounded-full transition shadow-xs active:scale-95 cursor-pointer"
                    >
                      Clear Search Parameters
                    </button>
                  )}
                </motion.div>
              ) : (
                filteredChallenges.map((item: any) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b border-[#F3F4F6] hover:bg-gray-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex-shrink-0 relative overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                        <Image 
                          src={item.brand_profile_picture_url || "/dash-logo.svg"} 
                          alt={item.brand_name || "Brand"} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      
                      <div className="min-w-0">
                        <h3 className="text-[#1E1F24] font-semibold text-xs md:text-sm xl:text-[15px] leading-tight truncate group-hover:text-[#0033FF] transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center text-[10px] md:text-[12px] text-[#747682] mt-0.5 font-medium">
                          <span className="truncate max-w-[80px] md:max-w-none">{item.brand_name}</span>
                          <GoCheckCircleFill className="text-[#0CC963] mx-1 shrink-0" size={14} />
                          <span className="mx-1">•</span>
                          <span className="whitespace-nowrap text-[#00C566] font-bold">{item.prize_pool_display} pool</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      {activeTab === "Saved" ? (
                        <button className="px-3 py-1.5 md:px-4 border border-[#8B8D98] rounded-full text-[10px] md:text-[12px] font-bold text-[#1E1F24] hover:bg-gray-100 whitespace-nowrap transition-all cursor-pointer">
                          Continue Submission
                        </button>
                      ) : (
                        <div className={`px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap text-center min-w-[95px] ${getStatusStyle(item.status)}`}>
                          {item.status || "Active"}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}

        {/* PAGINATION SECTION */}
        {filteredChallenges.length > 0 && (
          <div className="flex items-center justify-between mt-10 pb-20">
            <button className="p-2 md:px-6 md:py-2 border border-[#B9BBC6] rounded-full text-[10px] md:text-sm font-medium text-[#62636C] hover:bg-gray-50 cursor-pointer transition-colors">
              <span className="hidden md:inline">← Previous</span>
              <span className="md:hidden">←</span>
            </button>

            <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
              <button className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-[#F9F9FB] text-[#1E1F24] font-semibold">1</button>
              <span className="text-gray-400">...</span>
              <button className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-[#6B7280]">4</button>
            </div>

            <button className="p-2 md:px-6 md:py-2 border border-[#B9BBC6] rounded-full text-[10px] md:text-sm font-medium text-[#62636C] hover:bg-gray-50 cursor-pointer transition-colors">
              <span className="hidden md:inline">Next →</span>
              <span className="md:hidden">→</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChallengesPage;