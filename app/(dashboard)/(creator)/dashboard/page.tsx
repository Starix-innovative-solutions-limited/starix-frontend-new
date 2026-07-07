/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import { FiBarChart2, FiMail, FiClock, FiBookmark, FiShare2 } from "react-icons/fi";
import { useGetMe } from "@/hooks/useAuth";
import { useGetJoinedActiveChallenges } from "@/hooks/useChallenges";

const Page = () => {
  const { data: user } = useGetMe();
  
  // 1. Fetch real-time active joined challenges from the server
  const { data: joinedData, isLoading: isChallengesLoading } = useGetJoinedActiveChallenges();

  const recommendedChallenges = [
    {
      id: 1,
      brand: "Nivea",
      logo: "/nivea.svg", 
      time: "12h ago",
      niche: ["Beauty", "Family and lifestyle"],
      prize: "₦10M",
      deadline: "12h",
      title: "UGC Creators Needed for Skincare Product set Launch",
      desc: "A real-time measure of your creator performance, visibility, and brand readiness..",
      thumbnails: ["/left1.svg", "/right1.svg"], 
    },
    {
      id: 2,
      brand: "Indomie",
      logo: "/indomie.svg", 
      time: "2d ago",
      niche: ["Food", "Family and lifestyle"],
      prize: "₦8M",
      deadline: "12h",
      title: "UGC Creators Needed for Skincare Product set Launch",
      desc: "A real-time measure of your creator performance, visibility, and brand readiness..",
      thumbnails: ["/left2.svg", "/right21.svg"], 
    },
    {
      id: 3,
      brand: "Indomie",
      logo: "/indomie.svg", 
      time: "2d ago",
      niche: ["Food", "Family and lifestyle"],
      prize: "₦8M",
      deadline: "12h",
      title: "UGC Creators Needed for Skincare Product set Launch",
      desc: "A real-time measure of your creator performance, visibility, and brand readiness..",
      thumbnails: ["/left2.svg", "/right21.svg"], 
    },
  ];

  // Static fallback data matrix used if database returns zero rows
  const staticActiveChallenges = [
    { 
      id: "active-0",
      title: "UGC Creators Needed for Skincare Product",
      brand: "Starbucks", 
      logo: "/starbucks.svg", 
      status: "In Progress", 
      pool: "₦10M pool",
      color: "bg-[#FEFCE8] text-[#854D0E]" 
    },
    { 
      id: "active-1",
      title: "UGC Creators Needed for Skincare Product",
      brand: "PlayStation", 
      logo: "/ps.svg", 
      status: "Awaiting Review", 
      pool: "₦10M pool",
      color: "bg-[#F5F3FF] text-[#5B21B6]" 
    },
    { 
      id: "active-2",
      title: "UGC Creators Needed for Skincare Product",
      brand: "McDonalds", 
      logo: "/mcdonald.svg", 
      status: "Approved", 
      pool: "₦10M pool",
      color: "bg-[#75C0F41A] text-[#2D93D0]" 
    },
  ];

  // Helper function to dynamically map arbitrary backend string tokens to pristine styling tags
  const getStatusColorStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "under_review":
      case "Under Review":
        return "bg-[#FEFCE8] text-[#854D0E]";
      case "ranked":
      case "Ranked":
      case "under_review":
        return "bg-[#F5F3FF] text-[#5B21B6]";
      case "winner":
      case "winner":
        return "bg-[#75C0F41A] text-[#2D93D0]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  // Helper function to clarify machine-friendly status variants into gorgeous text symbols
  const formatStatusText = (status: string) => {
    if (!status) return "In Progress";
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // 2. Compute dynamic dataset: Use database response if items exist, otherwise fall back to static list
  const activeChallenges = React.useMemo(() => {
    if (joinedData && joinedData.items && joinedData.items.length > 0) {
      return joinedData.items.map((item) => ({
        id: item.challenge_id,
        title: item.title,
        brand: item.brand_name,
        logo: item.brand_logo_url || "/dash-logo.svg",
        status: formatStatusText(item.status),
        pool: `${item.prize_pool_formatted} pool`,
        color: getStatusColorStyle(item.status),
      }));
    }
    return staticActiveChallenges;
  }, [joinedData]);

  return (
    <div className="min-h-screen w-full bg-white min-w-0 overflow-hidden">
      {/* 1. Header Section */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-[22px] md:text-[24px] font-semibold text-[#1E1F24] flex items-center gap-2 tracking-tight">
            Welcome Back {user ? user.first_name : "Creator"}!
          </h1>
          <p className="text-[#6B7280] text-[14px] mt-1 font-medium">
            You have {activeChallenges.length} campaign matches moving today
          </p>
        </div>
        
        <div
          className="relative w-[48px] h-[48px] rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{
            background: "conic-gradient(#0033FF 0% 50%, #FD6C1D 50% 100%)",
          }}
        >
          <Link 
            href="/profile"
            className="
              relative w-[48px] h-[48px] rounded-full flex items-center justify-center overflow-hidden shrink-0 
              hover:opacity-90 transition-opacity cursor-pointer
            "
            style={{
              background: "conic-gradient(#0033FF 0% 50%, #FD6C1D 50% 100%)",
            }}
          >
            <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center overflow-hidden">
            {user?.profile_picture_url?.trim() ? (
  <Image
    src={user.profile_picture_url}
    width={42}
    height={42}
    alt="Profile"
    className="h-full w-full object-cover"
    priority
  />
) : (
  <div
    className="h-full w-full rounded-full bg-[#F5F6F8]"
    aria-label="No profile picture"
  />
)}
            </div>
          </Link>
        </div>
      </header>

      {/* 2. Recommended Challenges */}
      <section className="mb-10 w-full min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#62636C]">Recommended Challenges For You</h2>
          <Link href="/challenges/recommended" className="flex items-center gap-1.5 text-[13px] md:text-[14px] font-medium text-[#1E1F24] hover:underline shrink-0">
            View All <HiArrowRight size={18} />
          </Link>
        </div>
          
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory w-full min-w-0">
          {recommendedChallenges.map((challenge) => (
            <Link 
              href={`/dashboard/challenge/${challenge.id}`}
              key={challenge.id} 
              className="
                flex-none 
                basis-[85%] 
                md:basis-[48%] 
                lg:basis-[36%] 
                xl:basis-[34%]
                snap-start
                bg-white 
                border border-[#F3F4F6] 
                rounded-[24px] md:rounded-[28px] 
                p-4 md:p-5 
                shadow-sm
                hover:border-blue-200
                transition-all
                cursor-pointer
                flex flex-col
                justify-between
              "
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-50 shrink-0">
                      <Image src={challenge.logo} alt={challenge.brand} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-[12px] text-[#1E1F24] truncate">{challenge.brand}</span>
                        <MdVerified className="text-[#22C55E] shrink-0" size={13} />
                        <span className="text-[#9CA3AF] text-[10px] md:text-[11px] font-medium ml-0.5 shrink-0">• {challenge.time}</span>
                      </div>
                      <div className="flex gap-1 mt-0.5 overflow-hidden">
                        {challenge.niche.map((n) => (
                          <span key={n} className="text-[8px] bg-[#F5FBFF] text-[#3379A5] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-2.5 py-2.5 border border-[#8B8D98] rounded-full text-[10px] font-medium text-[#1E1F24] hover:bg-gray-50 transition-colors shrink-0">
                    Submit
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mb-3 text-[10px] font-semibold overflow-x-auto no-scrollbar whitespace-nowrap">
                  <span className="text-[#1E1F24]">{challenge.prize} prize pool</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="text-[#D12B1F]">Closes in {challenge.deadline}</span>
                  <span className="text-[#E5E7EB] hidden sm:inline">|</span>
                  <span className="text-[#1E874B] bg-[#ECFEF4] px-1.5 py-0.5 rounded-md text-[9px] hidden sm:inline">Verified</span>
                </div>

                <h3 className="font-semibold text-[12px] text-[#62636C] mb-1 leading-snug line-clamp-2">
                  {challenge.title}
                </h3>
                <p className="text-[#747682] font-normal text-[10px] leading-relaxed mb-4 line-clamp-2">
                  {challenge.desc}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 mb-2">
                  {challenge.thumbnails.map((img, i) => (
                    <div key={i} className="aspect-[4/3] w-full rounded-[16px] relative overflow-hidden group border-[#E7E8EC]">
                      <Image src={img} alt="Thumbnail" fill className="object-cover transition-transform duration-500" />
                      
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[#9CA3AF] pt-2 border-t border-gray-50">
                  <div className="flex gap-3 text-[11px] font-semibold">
                    <span className="flex items-center gap-1"><FiBarChart2 size={13}/> 2189</span>
                    <span className="flex items-center gap-1"><FiMail size={13}/> 87</span>
                    <span className="flex items-center gap-1"><FiClock size={13}/> 12h</span>
                  </div>
                  <div className="flex gap-2.5">
                    <button onClick={(e) => e.preventDefault()} className="hover:text-[#111827] transition-colors"><FiBookmark size={15} /></button>
                    <button onClick={(e) => e.preventDefault()} className="hover:text-[#111827] transition-colors"><FiShare2 size={15} /></button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Active Challenges Section */}
      <section className="pb-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#62636C]">Active Challenges</h2>
          <Link href="/challenges" className="flex items-center gap-1.5 text-[13px] md:text-[14px] font-medium text-[#1E1F24] hover:underline">
            View All <HiArrowRight size={18} />
          </Link>
        </div>

        <div className="space-y-1">
          {isChallengesLoading ? (
            <div className="w-full py-6 text-center text-xs text-gray-400 font-medium">
              Syncing active campaigns...
            </div>
          ) : (
            activeChallenges.map((active) => (
              <Link 
                key={active.id} 
                href={`/dashboard/challenge/${active.id}`}
                className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0 hover:bg-gray-50/50 transition-colors px-2 rounded-xl"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                    <Image src={active.logo} alt={active.brand} fill className="object-cover" />
                  </div>
                  <div className="truncate">
                    <h4 className="font-semibold text-[#374151] text-[13px] md:text-[14px] truncate">
                      {active.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[12px] text-[#6B7280] font-semibold truncate max-w-[120px]">{active.brand}</span>
                      <MdVerified className="text-[#22C55E] shrink-0" size={12} />
                      <span className="text-[11px] text-[#9CA3AF] font-medium shrink-0">• {active.pool}</span>
                    </div>
                  </div>
                </div>
                <span className={`p-1 rounded-full text-[12px] font-medium tracking-wide text-center min-w-[95px] shrink-0 ${active.color}`}>
                  {active.status}
                </span>
              </Link>
            )
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center w-full mt-12 px-1">
          <button className="px-3 md:px-5 py-2 border border-[#E5E7EB] rounded-full text-[14px] font-regular text-[#111827] flex items-center gap-1 hover:bg-gray-50 transition-all">
            <HiArrowLeft size={14} /> Previous
          </button>

          <div className="flex items-center gap-1 md:gap-2">
            <button className="w-9 h-9 md:w-11 md:h-11 bg-[#F9F9FB] text-[#1E1F24] rounded-[12px] font-medium text-[14px]">1</button>
            <button className="w-9 h-9 md:w-11 md:h-11 text-[#6B7280] hover:bg-gray-50 rounded-[12px] font-medium text-[14px]">2</button>
            <button className="w-9 h-9 md:w-11 md:h-11 text-[#6B7280] font-medium text-[14px]">...</button>
            <button className="w-9 h-9 md:w-11 md:h-11 text-[#6B7280] hover:bg-gray-50 rounded-[12px] font-medium text-[14px]">4</button>
            <button className="w-9 h-9 md:w-11 md:h-11 text-[#6B7280] hover:bg-gray-50 rounded-[12px] font-medium text-[14px]">5</button>
          </div>

          <button className="px-3 md:px-5 py-2 border border-[#E5E7EB] rounded-full text-[14px] font-regular text-[#111827] flex items-center gap-1 hover:bg-gray-50 transition-all">
            Next <HiArrowRight size={14}/>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;