"use client";

import React, { useState } from "react";
import Image from "next/image";
import EditProfileModal from "@/components/(creator)/dashboard/EditProfileModal";
import ConnectSocialsModal from "@/components/(creator)/dashboard/ConnectSocialsModal";
import { FiSearch } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/hooks/useAuth"; // import the hook

const ViewPortfolioModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[28px] p-6 shadow-xl relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-xl font-bold text-[#1E1F24] mb-2">Live Portfolio</h3>
        <p className="text-sm text-[#747682] mb-4">A showcase of verified asset submissions and creators set deliverables.</p>
        <div className="bg-gray-50 rounded-2xl p-4 text-center text-sm text-gray-400 border border-dashed border-gray-200 py-12">
          Portfolio asset carousel or fullscreen expansion loads here.
        </div>
        <button onClick={onClose} className="w-full mt-6 h-11 bg-[#1E1F24] text-white rounded-full font-semibold text-sm hover:opacity-90 transition">
          Done
        </button>
      </div>
    </div>
  );
};

// Keep static circles data since it's not in /auth/me
const staticCircles = [
  {
    name: "InnovateTech San Francisco",
    challenges: 28,
    logo: "/nvidia.svg",
    role: "Member",
    roleType: "member",
    avatars: ["/grp.svg", "/grp1.svg"],
    extraMembers: 2,
  },
  {
    name: "Visionary Designs Tokyo",
    challenges: 28,
    logo: "/walmart.svg",
    role: "Member",
    roleType: "member",
    avatars: ["/grp2.svg", "/grp.svg", "/grp1.svg"],
    extraMembers: 0,
  },
  {
    name: "CreativeCorp London",
    challenges: 28,
    logo: "/brands.svg",
    role: "Admin",
    roleType: "admin",
    avatars: ["/grp1.svg"],
    extraMembers: 4,
  },
  {
    name: "FutureWorks Berlin",
    challenges: 28,
    logo: "/figma.svg",
    role: "Member",
    roleType: "member",
    avatars: ["/grp.svg", "/grp2.svg"],
    extraMembers: 1,
  },
];

const UserProfilePage = () => {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetMe(); // fetch real user

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState("/header1.png");
  const [profileImage, setProfileImage] = useState("/no127.svg");
  const [scoreVisibility, setScoreVisibility] = useState("anyone");

  const handleSaveProfile = (updatedData: {
    profileImage: string;
    bannerImage: string;
    scoreVisibility: string;
  }) => {
    setProfileImage(updatedData.profileImage);
    setBannerImage(updatedData.bannerImage);
    setScoreVisibility(updatedData.scoreVisibility);
    setIsModalOpen(false);
  };

  const handleViewHistory = () => {
    router.push("/creator-circles/earning-insight");
  };

  const getRoleBadgeStyles = (roleType: string) => {
    switch (roleType) {
      case "admin":
        return "bg-[#FFEBF6] text-[#FF2D9B]";
      case "manager":
        return "bg-[#F3E6FF] text-[#A62DFF]";
      default:
        return "bg-[#EBF5FF] text-[#2D9CFF]";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <p className="text-[#747682] text-sm font-medium animate-pulse">Loading profile...</p>
      </div>
    );
  }

  // Error state
  if (isError || !user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-400 text-sm font-medium">Failed to load profile. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24] antialiased overflow-x-hidden relative">

      {/* ================= HERO BANNER ================= */}
      <div className="relative w-full h-[120px] md:h-[150px] lg:h-[200px] bg-[#EAF2FF]">
        {bannerImage ? (
          <Image
            src={bannerImage}
            alt="User Profile Cover Art"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#EAF2FF]" />
        )}

        <div className="absolute right-4 md:right-6 lg:right-8 bottom-[-60px] md:bottom-[-24px] lg:bottom-[-70px] z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSocialsOpen(true)}
              className="px-6 h-[40px] md:h-[44px] rounded-full bg-white flex items-center justify-center border border-[#BFC5CF] hover:bg-gray-50 transition font-semibold text-[14px] text-[#4B4F5C] cursor-pointer"
            >
              Connect Socials
            </button>
            <button
              onClick={() => setIsPortfolioOpen(true)}
              className="px-6 h-[40px] md:h-[44px] rounded-full bg-white flex items-center justify-center border border-[#BFC5CF] hover:bg-gray-50 transition font-semibold text-[14px] text-[#4B4F5C] cursor-pointer"
            >
              View Portfolio
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 h-[40px] md:h-[44px] rounded-full bg-white flex items-center justify-center border border-[#BFC5CF] hover:bg-gray-50 transition font-semibold text-[14px] text-[#4B4F5C] cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="absolute -bottom-14 md:-bottom-12 left-4 md:left-6 lg:left-8 z-10">
          <div className="w-[110px] h-[110px] md:w-[100px] md:h-[100px] lg:w-[100px] lg:h-[100px] rounded-full p-[4px] bg-[conic-gradient(#245BFF_180deg,#FF5A1F_180deg)] flex items-center justify-center shadow-sm">
            <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
              <Image
                src={user.profile_picture_url ?? profileImage}
                alt="User Portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT MAIN WRAPPER ================= */}
      <div className="mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-10 lg:pt-14">

        {/* User Descriptive Identification Header */}
        <div className="mb-5">
          {/* ✅ Real name from API */}
          <h1 className="text-[20px] md:text-[24px] font-semibold tracking-tight text-[#1E1F24]">
            {user.first_name} {user.last_name}
          </h1>

          {/* ✅ Real email from API */}
          <h2 className="text-[12px] text-[#747682] font-semibold">{user.email}</h2>

          <div className="flex items-center gap-2 text-[12px] text-[#747682] font-medium">
            <span><span className="font-semibold text-[#1E1F24]">98</span> Challenges completed</span>
            <span className="text-gray-300 text-2xl">•</span>
            <span><span className="font-semibold text-[#1E1F24]">25k</span> Engagements</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="flex items-center gap-2 mr-1">
              <div className="w-5 h-5 relative flex items-center justify-center"><img src="/yt.svg" alt="YouTube" /></div>
              <div className="w-5 h-5 relative flex items-center justify-center"><img src="/ig.svg" alt="Instagram" /></div>
              <div className="w-5 h-5 relative flex items-center justify-center"><img src="/tt.svg" alt="TikTok" /></div>
            </div>
          </div>

          {/* ✅ Real bio from API, fallback to placeholder */}
          <div className="mt-5">
            <p className="text-[14px] text-[#747682]">
              {user.bio ?? "No bio yet. Edit your profile to add one."}
            </p>
          </div>

          {/* ✅ Verification badges from API */}
          <div className="flex items-center gap-2 mt-2">
            {user.is_email_verified && (
              <span className="px-2 py-0.5 text-[#1E874B] bg-[#E5FFE5] text-[11px] rounded-lg font-medium">
                ✓ Email Verified
              </span>
            )}
            {user.is_phone_verified && (
              <span className="px-2 py-0.5 text-[#1E874B] bg-[#E5FFE5] text-[11px] rounded-lg font-medium">
                ✓ Phone Verified
              </span>
            )}
            {!user.is_email_verified && (
              <span className="px-2 py-0.5 text-[#CC6600] bg-[#FFF4E5] text-[11px] rounded-lg font-medium">
                ⚠ Email Not Verified
              </span>
            )}
          </div>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.3fr_0.3fr_0.4fr] gap-4 mb-12">

          {/* Total Earnings */}
          <div className="group relative overflow-hidden bg-[#E5FFE5] rounded-[24px] md:rounded-[28px] lg:rounded-[32px] p-4 h-[140px] flex flex-col justify-between border border-[#E5FFE5]">
            <div>
              <div className="flex items-center gap-2 mb-3 lg:mb-6">
                <img src="/coin.svg" alt="Earnings Icon" className="w-6 h-6" />
                <h3 className="text-[15px] lg:text-[16px] font-medium text-[#1E1F24]">Total Earnings</h3>
              </div>
              <h2 className="text-[24px] lg:text-[26px] font-semibold text-[#1E1F24] leading-none tracking-tight">
                ₦800,000<span className="text-[#80828D] font-medium">.00</span>
              </h2>
            </div>
            <button onClick={handleViewHistory} className="w-fit flex items-center gap-2 text-[#5C6473] text-[12px] font-medium hover:opacity-90 transition-opacity">
              View History <GoArrowRight size={20} />
            </button>
          </div>

          {/* Total Engagement */}
          <div className="group relative overflow-hidden bg-[#FFF0FD] rounded-[24px] md:rounded-[28px] lg:rounded-[32px] p-4 h-[140px] flex flex-col border border-[#FFF0FD] w-full">
            <div className="flex items-center gap-2 mb-3 lg:mb-6 shrink-0">
              <img src="/diamonddd.svg" alt="Engagement Icon" className="w-6 h-6 shrink-0" />
              <h3 className="text-[15px] lg:text-[16px] font-medium text-[#1E1F24] truncate">Total Engagement</h3>
            </div>
            <div className="flex-1 flex items-end justify-between min-h-0 relative z-10 w-full">
              <div className="flex flex-col justify-end h-full">
                <div className="flex items-baseline gap-1 mb-3 lg:mb-4">
                  <h2 className="text-[24px] lg:text-[26px] font-semibold text-[#1E1F24] leading-none tracking-tight">24K</h2>
                  <span className="text-[#1E1F24] text-[10px] font-semibold">Views</span>
                </div>
                <button className="flex items-center gap-2 text-[#62636C] text-[12px] font-medium hover:opacity-70 transition-opacity whitespace-nowrap">
                  View Trend <GoArrowRight size={22} className="shrink-0" />
                </button>
              </div>
              <div className="bg-white rounded-[10px] flex flex-col w-[35%] max-w-[120px] min-w-[75px] h-[65px] lg:h-[70px] justify-between p-1.5 shrink-0">
                <span className="text-[11px] lg:text-[12px] text-[#EE0001] font-medium leading-none">15% ↓</span>
                <div className="w-full flex-1 flex items-end min-h-0 mt-1">
                  <img src="/Stroke.svg" alt="trend line" className="w-full h-full object-contain object-bottom" />
                </div>
              </div>
            </div>
          </div>

          {/* Global Rank */}
          <div className="bg-[#EBF6FF] rounded-[24px] p-4 h-[140px] flex flex-col justify-between border border-transparent">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/coin.svg" alt="" className="w-4 h-4 object-contain" />
                <h3 className="text-[15px] font-medium text-[#1E1F24]">Global Rank</h3>
              </div>
              <div className="flex items-baseline gap-2 leading-none">
                <h2 className="text-[26px] font-semibold text-[#1E1F24] tracking-tight">1,391,900</h2>
                <span className="text-[#1E874B] text-[12px] font-semibold flex items-center gap-0.5">+29 ↑</span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[#62636C] text-[12px] font-medium hover:opacity-70 transition-opacity whitespace-nowrap">
              View Leaderboard <GoArrowRight size={22} className="shrink-0" />
            </button>
          </div>
        </div>

        {/* ================= CIRCLES ================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] md:text-[22px] font-bold text-[#1E1F24]">Circles</h3>
            <div className="relative max-w-xs w-full hidden md:block">
              <input
                type="text"
                placeholder="Search your Circles"
                className="w-full h-10 pl-10 pr-4 bg-[#F5F6F8] rounded-full text-sm text-[#1E1F24] placeholder-[#8B8D98] outline-hidden border border-transparent focus:border-[#BFC5CF]"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8D98]" />
            </div>
          </div>

          <div className="divide-y divide-[#EAECEF] border-t border-b border-[#EAECEF]">
            {staticCircles.map((circle, index) => (
              <div key={index} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 overflow-hidden flex items-center justify-center">
                    <Image src={circle.logo} alt={`${circle.name} Brand Icon`} fill className="object-contain" unoptimized />
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-[14px] font-semibold text-[#62636C] leading-tight">{circle.name}</h4>
                    <p className="text-[12px] text-[#747682] font-medium">{circle.challenges} Active Challenges &nbsp;•&nbsp; Ranked 250k Globally</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-1.5 hidden sm:flex">
                    {circle.avatars?.map((avatarImg, imgIdx) => (
                      <div key={imgIdx} className="w-6 h-6 rounded-full border border-white overflow-hidden relative bg-gray-100">
                        <Image src={avatarImg} alt="Stacked User Avatar" fill className="object-cover" />
                      </div>
                    ))}
                    {circle.extraMembers > 0 && (
                      <div className="w-6 h-6 rounded-full border border-white bg-[#C9E9FF] text-[#050E81] text-[10px] font-semibold flex items-center justify-center z-10 relative">
                        +{circle.extraMembers}
                      </div>
                    )}
                  </div>
                  <span className={`px-1.5 py-0.5 rounded-full text-[12px] font-medium tracking-wider ${getRoleBadgeStyles(circle.roleType)}`}>
                    {circle.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentProfile={{
          profileImage: user.profile_picture_url ?? profileImage,
          bannerImage,
          scoreVisibility,
        }}
        onSave={handleSaveProfile}
      />

      <ConnectSocialsModal
        isOpen={isSocialsOpen}
        onClose={() => setIsSocialsOpen(false)}
      />

      <ViewPortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
      />
    </div>
  );
};

export default UserProfilePage;