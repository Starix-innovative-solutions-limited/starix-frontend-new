/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FiSearch, FiSliders, FiBarChart2, FiMail, FiClock, FiBookmark, FiShare2 } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { useGetTrendingChallenges } from "@/hooks/useChallenges";

type TrendingCard = {
  id: string | number;
  brand: string;
  logo: string;
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

const TrendingChallenges = ({ isAnySidebarOpen = false }: { isAnySidebarOpen?: boolean }) => {
  // 1. Integrated trending API custom hook query
  const { data: apiResponse } = useGetTrendingChallenges();

  // Your original static template array matching your design specs perfectly
  const staticCards: TrendingCard[] = [
    { id: 1, brand: "Nivea", logo: "/nivea.svg", time: "12h ago", niche: ["Beauty", "Family"], prize: "₦10M", deadline: "12h", verified: true, images: ["/left1.svg", "/right1.svg"] },
    { id: 2, brand: "Indomie", logo: "/indomie.svg", time: "2d ago", niche: ["Food", "Family"], prize: "₦8m", deadline: "12h", verified: false, images: ["/right21.svg", "/right22.svg", "/right21.svg"] },
    { id: 3, brand: "Nivea", logo: "/nivea.svg", time: "12h ago", niche: ["Beauty", "Family"], prize: "₦10M", deadline: "12h", verified: true, images: ["/left1.svg", "/right1.svg"] },
    { id: 4, brand: "Indomie", logo: "/indomie.svg", time: "2d ago", niche: ["Food", "Family"], prize: "₦8m", deadline: "12h", verified: false, images: ["/right21.svg", "/right22.svg"] },
    { id: 5, brand: "Indomie", logo: "/indomie.svg", time: "2d ago", niche: ["Food", "Family"], prize: "₦8m", deadline: "12h", verified: false, images: ["/right22.svg", "/right21.svg"] },
    { id: 6, brand: "Nivea", logo: "/nivea.svg", time: "12h ago", niche: ["Beauty", "Family"], prize: "₦10M", deadline: "12h", verified: true, images: ["/left1.svg", "/right1.svg"] },
  ];

  // Helper utility mapping timestamp tokens safely
  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return "12h ago";
    const hours = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60));
    return hours < 24 ? `${hours || 12}h ago` : `${Math.floor(hours / 24)}d ago`;
  };

  // 2. Map dynamic payload into structured cards with native design protections
  const cards = React.useMemo<TrendingCard[]>(() => {
    if (apiResponse && apiResponse.challenges && apiResponse.challenges.length > 0) {
      return apiResponse.challenges.map((challenge: any, idx: number): TrendingCard => {
        const mediaUrls =
          challenge.media
            ?.sort((a: any, b: any) => a.display_order - b.display_order)
            .map((m: any) => m.media_url) || [];
  
        return {
          id: challenge.id || idx + 1,
          brand: challenge.brand_name || "Brand",
          logo: challenge.brand_profile_picture_url || "/nivea.svg",
          time: formatTimeAgo(challenge.created_at),
          niche: challenge.category_name ? [challenge.category_name, "Family"] : ["Beauty", "Family"],
          prize: challenge.prize_pool_display || "₦10M",
          deadline: "12h",
          verified: challenge.is_funded ?? true,
          title: challenge.title,
          desc: challenge.description,
          images: mediaUrls.length > 0 ? mediaUrls : ["/left1.svg", "/right1.svg"],
          views: challenge.viewer_count ? `${(challenge.viewer_count / 1000).toFixed(1)}k` : "2.1k",
          mail: challenge.participant_count?.toString() || "87",
        };
      });
    }
  
    return staticCards;
  }, [apiResponse]);

  return (
    <div className="min-h-screen bg-white py-2 font-['Geist']">
      <div className="max-w-7xl mx-auto px-4 md:px-1">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Link href="/challenges" className="inline-flex items-center gap-2 text-[#1E1F24] mb-3 hover:opacity-70 transition-opacity">
              <HiArrowLeft size={20} />
            </Link>
            <h1 className="text-[22px] md:text-[24px] font-semibold text-[#000000] tracking-tight">
              Trending Challenges
            </h1>
            <p className="text-[#62636C] text-[12px] mt-1 font-normal">
              Discover trending challenges and compete where the spotlight is
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <button className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 border border-[#8B8D98] rounded-full text-[11px] md:text-sm font-medium text-[#374151] hover:bg-gray-50 transition-all flex-shrink-0">
              <FiSliders className="text-sm md:text-lg" />
              <span className=" xs:inline">Filter</span>
            </button>
            
            <div className="relative w-full max-w-xs xs:max-w-[180px] md:max-w-sm transition-all duration-300">
              <FiSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#62636C] text-sm md:text-lg" />
              <input 
                type="text" 
                placeholder="Search Trending Challenges"
                className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-2.5 bg-[#F9F9FB] border border-[#EFF0F3] rounded-full text-[11px] md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </header>

        {/* RESTRUCTURED 3-COLUMN RESPONSIVE GRID LAYOUT */}
        <div className="relative w-full">
          <div className={`
            grid gap-6 pb-10
            ${isAnySidebarOpen 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}
          `}>
            {cards.map((card) => (
              <Link
              key={card.id}
              href={`/dashboard/challenge/${card.id}`}
              className="bg-white border border-[#E0E1E6] rounded-[24px] md:rounded-[32px] p-4 md:p-4 shadow-xs transition-all group flex flex-col h-full cursor-pointer"
            >
                {/* Card Top Info */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-gray-50 shrink-0">
                      <Image src={card.logo} alt={card.brand} fill className="object-cover" />
                    </div>
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
                <div className="flex items-center gap-2 mb-2 ">
                  <span className="text-[#1E1F24] font-semibold text-[12px]">{card.prize} prize pool</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="text-[#D12B1F] font-medium text-[10px]">Closes in {card.deadline}</span>
                  {card.verified && (
                    <>
                      <span className="text-[#E5E7EB]">|</span>
                      <span className="text-[#1E874B] bg-[#ECFEF4] font-medium text-[10px] px-1 py-0.5 rounded-2xl">Verified Challenge</span>
                    </>
                  )}
                </div>

                <h3 className="font-semibold text-[12px] text-[#62636C] line-clamp-2 mb-1">
                  {card.title || "UGC Creators Needed for Skincare Product set Launch"}
                </h3>
                <p className="text-[#747682] text-[10px] mb-2.5 font-normal line-clamp-2">
                  {card.desc || "NIVEA is launching its new Radiance Boost Skincare Collection and is now looking for authentic, engaging user-generated content that highlights rea..."}
                </p>

                {/* FIXED-SIZE DYNAMIC IMAGE PREVIEW */}
                <div className="relative h-[157px] w-full mb-3 rounded-[20px] md:rounded-[24px] overflow-hidden bg-gray-50">
                  <div className={`
                    grid h-full w-full gap-0.5
                    ${card.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}
                    ${card.images.length > 2 ? 'grid-rows-2' : 'grid-rows-1'}
                  `}>
                    {card.images.slice(0, 4).map((img, i) => (
                      <div 
                        key={i} 
                        className={`relative w-full h-full overflow-hidden ${card.images.length === 3 && i === 0 ? 'row-span-2' : ''}`}
                      >
                        <Image src={img} alt="Thumbnail" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics row */}
                <div className="flex items-center justify-between text-[#62636C] border-t border-gray-50 mt-auto pt-2">
                  <div className="flex gap-3 md:gap-5 text-[11px] md:text-[10px] font-medium">
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
            ))}
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

export default TrendingChallenges;