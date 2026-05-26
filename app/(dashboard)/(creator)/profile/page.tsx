"use client";

import React, { useState } from "react";
import Image from "next/image";
import EditProfileModal from "@/components/(creator)/dashboard/EditProfileModal"; 
const initialUserProfile = {
  name: "Jason Oluwamapadarijimi",
  challengesCompleted: 12,
  globalRank: 251,
  currentGlobalRankScore: 391,
  totalEarnings: "800,000",
  totalViews: "24K",
  tags: ["Beauty", "family and lifestyle", "skincare"],
  profileImage: "/no127.svg",
  bannerImage: "/header1.png",
  scoreVisibility: "anyone",
  circles: [
    { name: "Nvidia", count: 5, logo: "/nvidia.svg" },
    { name: "Walmart", count: 7, logo: "/walmart.svg" },
    { name: "Blogger", count: 3, logo: "/brands.svg" },
    { name: "Figma", count: 4, logo: "/figma.svg", border: false },
  ],
  portfolio: [
    { id: 1, type: "video", thumbnail: "/portfolio1.png" },
    { id: 2, type: "image", thumbnail: "/portfolio2.png" },
    { id: 3, type: "video", thumbnail: "/portfolio3.png" },
    { id: 4, type: "image", thumbnail: "/portfolio4.png" },
    { id: 5, type: "image", thumbnail: "/portfolio5.png" },
    { id: 6, type: "image", thumbnail: "/portfolio6.png" },
    { id: 7, type: "image", thumbnail: "/portfolio7.png" },
    { id: 8, type: "image", thumbnail: "/portfolio8.png" },
  ]
};

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveProfile = (updatedData: {
    profileImage: string;
    bannerImage: string;
    scoreVisibility: string;
  }) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedData,
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24] antialiased overflow-x-hidden relative">
      
      {/* ================= HERO BANNER ================= */}
      <div className="relative w-full h-[120px] md:h-[150px] lg:h-[200px] bg-[#EAF2FF]">
        {userProfile.bannerImage ? (
          <Image 
            src={userProfile.bannerImage} 
            alt="User Profile Cover Art" 
            fill 
            className="object-cover" 
            priority 
          />
        ) : (
          <div className="w-full h-full bg-[#EAF2FF]" />
        )}

        <div className="absolute right-4 md:right-6 lg:right-8 bottom-[-60px] md:bottom-[-24px] lg:bottom-[-70px] z-20">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 h-[40px] md:h-[44px] rounded-full bg-white flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition font-semibold text-[14px] text-[#1E1F24] cursor-pointer shadow-xs"
          >
            Edit Profile
          </button>
        </div>

        <div className="absolute -bottom-14 md:-bottom-12 left-4 md:left-6 lg:left-8 z-10">
          <div className="w-[110px] h-[110px] md:w-[100px] md:h-[100px] lg:w-[100px] lg:h-[100px] rounded-full border-[4px] border-[#245BFF] bg-white overflow-hidden relative">
            <Image 
              src={userProfile.profileImage} 
              alt="User Portrait" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </div>

      {/* ================= CONTENT MAIN WRAPPER ================= */}
      <div className="mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-10 lg:pt-14">
        
        {/* User Descriptive Identification Header */}
        <div className="mb-5">
          <h1 className="text-[20px] md:text-[24px] font-semibold tracking-tight text-[#1E1F24]">
            {userProfile.name}
          </h1>
          
          <div className="flex items-center gap-2 text-[12px] text-[#747682] font-medium ">
            <span>{userProfile.challengesCompleted} Challenges completed</span>
            <span className="text-gray-300 text-2xl">•</span>
            <span>Ranked {userProfile.globalRank} Globally</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="flex items-center gap-2 mr-1">
              <div className="w-5 h-5 relative flex items-center justify-center"><img src="/yt.svg" alt="YouTube" /></div>
              <div className="w-5 h-5 relative flex items-center justify-center"><img src="/ig.svg" alt="Instagram" /></div>
              <div className="w-5 h-5 relative flex items-center justify-center"><img src="/tt.svg" alt="TikTok" /></div>
            </div>
            
            {userProfile.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-0.5 text-[#3379A5] bg-[#F5FBFF] text-[12px] rounded-lg font-medium cursor-pointer transition hover:bg-blue-50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ================= CIRCLES SECTION ================= */}
        <div className=" ">
          <h3 className="text-[16px] md:text-[20px] font-semibold text-[#1E1F24] mb-1">
            Circles
          </h3>
          <div className="flex flex-wrap items-center">
            {userProfile.circles.map((circle, index) => (
              <div key={index} className="relative">
                <div 
                  className={`w-[100px] h-[100px] rounded-[25px] flex items-center justify-center relative overflow-hidden ${
                    circle.border ? "border border-gray-200" : "border border-transparent"
                  }`}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={circle.logo}
                      alt={`${circle.name} Circle Logo`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <span className="absolute bottom-[15px] right-[1px] bg-[#C9E9FF] text-[#050E81] font-semibold text-[9px] w-[18px] h-[18px] rounded-full border-2 border-white flex items-center justify-center z-10">
                  {circle.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ANALYTICS METRIC DISPLAY CARDS ================= */}
        <div className="mb-12">
          <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1E1F24] mb-4">
            Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-[#E5FFE5] rounded-[20px] p-5 lg:p-6 border border-[#E5FFE5] flex flex-col justify-center h-[100px]">
              <div className="flex items-center gap-1.5 text-[#1E1F24] text-[13px] lg:text-[16px] font-medium mb-1">
                <img src="/coin.svg" alt="" />
                <h4>Total Earnings</h4>
              </div>
              <h2 className="text-[22px] lg:text-[26px] font-semibold text-[#1E1F24] tracking-tight">
                ₦{userProfile.totalEarnings}<span className="text-[#80828D] font-medium text-[26px]">.00</span>
              </h2>
            </div>

            <div className="bg-[#FFF0FD] rounded-[20px] p-5 lg:p-6 border border-[#FFF0FD] flex flex-col justify-center h-[100px]">
              <div className="flex items-center gap-1.5 text-[#1E1F24] text-[13px] lg:text-[16px] font-medium mb-1">
                <img src="/diamonddd.svg" alt="" />
                <h4>Total Engagement</h4>
              </div>
              <h2 className="text-[22px] lg:text-[26px] font-semibold text-[#1E1F24] tracking-tight">
                {userProfile.totalViews}<span className="text-gray-500 font-medium text-[8px] lg:text-[10px]">Views</span>
              </h2>
            </div>

            <div className="bg-[#E9F6FF] rounded-[20px] p-5 lg:p-6 border border-[#E9F6FF] flex flex-col justify-center h-[100px]">
              <div className="flex items-center gap-1.5 text-[#1E1F24] text-[13px] lg:text-[16px] font-medium mb-1">
                <img src="/coin.svg" alt="" />
                <h4>Global Rank</h4>
              </div>
              <h2 className="text-[22px] lg:text-[26px] font-semibold text-[#1E1F24] tracking-tight">
                {userProfile.currentGlobalRankScore}
              </h2>
            </div>

          </div>
        </div>

        {/* ================= MEDIA PORTFOLIO SHOWCASE GRID ================= */}
        <div>
          <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1E1F24] mb-4">
            Portfolio
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 rounded-[24px] overflow-hidden">
            {userProfile.portfolio.map((asset) => (
              <div 
                key={asset.id} 
                className="relative aspect-square w-full bg-gray-100 group overflow-hidden cursor-pointer"
              >
                <Image 
                  src={asset.thumbnail} 
                  alt="Portfolio Submission Asset Display Card" 
                  fill 
                  className="object-cover transition duration-500 ease-out group-hover:scale-105 fallback-img"
                  unoptimized
                />

                {asset.type === "video" && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition group-hover:bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-gray-800 ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= EXTERNALIZED EDIT PROFILE MODAL ================= */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentProfile={{
          profileImage: userProfile.profileImage,
          bannerImage: userProfile.bannerImage,
          scoreVisibility: userProfile.scoreVisibility,
        }}
        onSave={handleSaveProfile}
      />

    </div>
  );
};

export default UserProfilePage;