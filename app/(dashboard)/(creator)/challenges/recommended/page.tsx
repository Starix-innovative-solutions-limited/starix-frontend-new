/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FiSearch, FiSliders, FiBarChart2, FiMail, FiClock, FiBookmark, FiShare2 } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import ChallengeMediaGrid from "@/components/(creator)/challenge/ChallengeMediaGrid";
import { useGetRecommendedChallenges, useGetTrendingChallenges } from "@/hooks/useChallenges";
import { getChallengePreviewImages } from "@/lib/challengeMedia";
import { formatCompactNaira } from "@/lib/formatMoney";

type RecommendedCard = {
  id: string | number;
  brand: string;
  logoUrl?: string | null;
  time: string;
  niche: string[];
  prize: string;
  deadline: string;
  verified: boolean;
  images: string[];
  title?: string;
  desc?: string;
  views?: string;
  mail?: string;
};

const Recommended = ({ isAnySidebarOpen = false }: { isAnySidebarOpen?: boolean }) => {
  const { data: recommendedData, isLoading: recommendedLoading } =
    useGetRecommendedChallenges(50, 0);
  const { data: trendingData, isLoading: trendingLoading } =
    useGetTrendingChallenges(50, 0);

  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return "Just now";
    const hours = Math.floor(
      (new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60)
    );
    if (hours < 1) return "Just now";
    return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
  };

  const cards = React.useMemo<RecommendedCard[]>(() => {
    const byId = new Map<string, any>();
    for (const challenge of [
      ...(recommendedData?.challenges ?? []),
      ...(trendingData?.challenges ?? []),
    ]) {
      if (challenge?.id && !byId.has(challenge.id)) byId.set(challenge.id, challenge);
    }

    return Array.from(byId.values()).map((challenge: any, idx: number): RecommendedCard => {
      const images = getChallengePreviewImages(challenge, 4);

      return {
        id: challenge.id || idx + 1,
        brand: challenge.brand_name || "Brand",
        logoUrl: challenge.brand_profile_picture_url,
        time: formatTimeAgo(challenge.created_at),
        niche: challenge.category_name
          ? [challenge.category_name]
          : ["Challenge"],
        prize: formatCompactNaira(
          challenge.prize_pool_display ||
            (typeof challenge.prize_pool === "number"
              ? challenge.prize_pool / 100
              : 0),
          challenge.currency_symbol || "₦"
        ),
        deadline: "Open",
        verified: challenge.is_funded ?? challenge.is_published ?? true,
        title: challenge.title,
        desc: challenge.description,
        images,
        views: challenge.viewer_count
          ? `${(challenge.viewer_count / 1000).toFixed(1)}k`
          : "0",
        mail: challenge.participant_count?.toString() || "0",
      };
    });
  }, [recommendedData, trendingData]);

  const isLoading = recommendedLoading || trendingLoading;

  return (
    <div className="min-h-screen bg-white font-['Geist'] py-2">
      <div className="max-w-7xl mx-auto px-4 md:px-1">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Link href="/challenges" className="inline-flex items-center gap-2 text-[#1E1F24] mb-4 hover:opacity-70 transition-opacity">
              <HiArrowLeft size={20} />
            </Link>
            <h1 className="text-[22px] md:text-[24px] font-semibold text-[#000000] tracking-tight">
              Recommended For You
            </h1>
            <p className="text-[#62636C] text-[12px] mt-1 font-regular">
              Earn from challenges tailored to your content, style, and potential
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <button className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 border border-[#8B8D98] rounded-full text-[11px] md:text-sm font-medium text-[#374151] hover:bg-gray-50 transition-all flex-shrink-0 cursor-pointer">
              <FiSliders className="text-sm md:text-lg" />
              <span className=" xs:inline">Filter</span>
            </button>
            
            <div className="relative w-full max-w-xs xs:max-w-[180px] md:max-w-sm transition-all duration-300">
              <FiSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#62636C] text-sm md:text-lg" />
              <input 
                type="text" 
                placeholder="Search Trending Challenges"
                className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-2.5 bg-[#F9F9FB] border border-[#EFF0F3] rounded-full text-[11px] md:text-sm focus:outline-none focus:ring focus:ring-[#8B8D98]"
              />
            </div>
          </div>
        </header>

        {/* 3-COLUMN CONTROL GRID */}
        <div className="relative w-full">
          <div className={`
            grid gap-6 pb-10
            ${isAnySidebarOpen 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}
          `}>
            {isLoading ? (
              <p className="col-span-full py-16 text-center text-[14px] text-[#62636C]">
                Loading challenges...
              </p>
            ) : cards.length === 0 ? (
              <div className="col-span-full rounded-[24px] border border-dashed border-[#E0E1E6] px-6 py-16 text-center">
                <p className="text-[14px] font-medium text-[#1E1F24]">
                  No open challenges yet
                </p>
                <p className="mt-1 text-[12px] text-[#62636C]">
                  Funded brand challenges will appear here once they are active.
                </p>
              </div>
            ) : (
              cards.map((card) => (
              <Link
              key={card.id}
              href={`/dashboard/challenge/${card.id}`}
              className="bg-white border border-[#E0E1E6] rounded-[24px] md:rounded-[32px] p-4 md:p-4 shadow-xs transition-all group flex flex-col h-full cursor-pointer"
            >
                {/* Card Top Info */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <BrandAvatar
                      name={card.brand}
                      src={card.logoUrl}
                      className="h-10 w-10 border border-gray-50 md:h-11 md:w-11"
                      letterClassName="text-sm"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-[12px] text-[#1E1F24] truncate">{card.brand}</span>
                        <MdVerified className="text-[#22C55E] shrink-0" size={14} />
                        <span className="text-[#9CA3AF] text-[10px] md:text-[12px] font-medium ml-1 shrink-0">• {card.time}</span>
                      </div>
                      <div className="flex gap-1.5 mt-1 overflow-hidden">
                        {card.niche.slice(0, 2).map((n) => (
                          <span key={n} className="text-[9px] bg-[#F5FBFF] text-[#3379A5] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 border border-[#D1D5DB] rounded-full text-[11px] font-medium text-[#1E1F24] hover:bg-gray-50 transition-colors shrink-0 cursor-pointer">
                    Submit
                  </div>
                </div>

                {/* Prize & Status Labels */}
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <span className="text-[#1E1F24] text-[12px] whitespace-nowrap">{card.prize} prize pool</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="text-[#D12B1F] text-[10px] whitespace-nowrap">Closes in {card.deadline}</span>
                  {card.verified && (
                    <>
                      <span className="text-[#E5E7EB]">|</span>
                      <span className="text-[#1E874B] bg-[#ECFEF4] text-[10px] px-1.5 py-0.5 rounded">Verified</span>
                    </>
                  )}
                </div>

                {/* Inline Fallbacks added here to guard against blank data tokens inside active objects */}
                <h3 className="mb-3 line-clamp-2 text-[11px] font-semibold leading-tight text-[#62636C]">
                  {card.title || "Challenge"}
                </h3>
                {card.desc ? (
                  <p className="mb-2.5 line-clamp-2 text-[10px] font-normal text-[#747682]">
                    {card.desc}
                  </p>
                ) : null}

                <ChallengeMediaGrid
                  images={card.images}
                  className="mb-1 h-[157px] w-full"
                />

                {/* Metrics row */}
                <div className="flex items-center justify-between text-[#62636C] pt-2 border-t border-gray-50 mt-auto">
                  <div className="flex gap-3 md:gap-5 text-[10px] md:text-[12px] font-medium">
                    <span className="flex items-center gap-1"><FiBarChart2 size={14}/> {card.views || "2.1k"}</span>
                    <span className="flex items-center gap-1"><FiMail size={14}/> {card.mail || "87"}</span>
                    <span className="flex items-center gap-1"><FiClock size={14}/> {card.deadline}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="hover:text-[#111827] transition-colors cursor-pointer"><FiBookmark size={16} /></button>
                    <button className="hover:text-[#111827] transition-colors cursor-pointer"><FiShare2 size={16} /></button>
                  </div>
                </div>
              </Link>
            ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center w-full mt-6 px-1 pb-10">
          <button className="px-3 md:px-5 py-2 border border-[#E5E7EB] rounded-full text-[14px] font-regular text-[#111827] flex items-center gap-1 hover:bg-gray-50 transition-all cursor-pointer">
            <HiArrowLeft size={14} /> Previous
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <button className="w-11 h-11 bg-[#F9F9FB] text-[#1E1F24] rounded-[12px] font-medium text-[14px] cursor-pointer">1</button>
            <button className="w-11 h-11 text-[#6B7280] hover:bg-gray-50 rounded-[12px] font-medium text-[14px] cursor-pointer">2</button>
          </div>
          <button className="px-3 md:px-5 py-2 border border-[#E5E7EB] rounded-full text-[14px] font-regular text-[#111827] flex items-center gap-1 hover:bg-gray-50 transition-all cursor-pointer">
            Next <HiArrowRight size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommended;