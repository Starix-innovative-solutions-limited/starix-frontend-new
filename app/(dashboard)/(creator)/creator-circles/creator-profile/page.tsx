"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiSettings, FiSearch } from "react-icons/fi";
import BannerUploadModal from "@/components/(creator)/dashboard/BannerUploadModal";
import ConnectSocialsModal from "@/components/(creator)/dashboard/ConnectSocialsModal";

const CircleProfile = () => {
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    
    // 1. ADD STATE FOR THE BANNER IMAGE
    const [bannerImage, setBannerImage] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24] antialiased">
      {/* 2. PASS THE SETTER FUNCTION TO THE MODAL */}
      <BannerUploadModal 
        isOpen={isBannerModalOpen} 
        onClose={() => setIsBannerModalOpen(false)} 
        onUploadSuccess={(url) => setBannerImage(url)} 
      />

      <ConnectSocialsModal 
        isOpen={isConnectModalOpen} 
        onClose={() => setIsConnectModalOpen(false)} 
      />
      
      {/* 3. UPDATED BANNER AREA TO SHOW THE UPLOADED IMAGE */}
      <div className="relative w-full h-[180px] bg-[#F3F4F6] ">
        {bannerImage ? (
            <Image 
                src={bannerImage} 
                alt="Banner" 
                fill 
                className="object-cover" 
                priority
            />
        ) : (
            // Default placeholder state when no image is uploaded
            <div className="w-full h-full flex items-center justify-center text-gray-300">
               
            </div>
        )}

        {/* Profile Avatar Overlap */}
        <div className="absolute -bottom-10 left-8 md:left-16 z-10">
          <div className="w-[150px] h-[150px] bg-white rounded-[32px] flex items-center justify-center p-2 shadow-sm border border-gray-50">
            <div className="relative w-full h-full rounded-[24px] flex items-center justify-center overflow-hidden bg-white">
               <Image 
                  src="/gr8.svg" 
                  alt="Logo"
                  width={90}
                  height={90}
                  className="object-contain"
                />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-5 pt-16 pb-24">
        
        {/* 2. Title & Pill Buttons Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <h1 className="text-[24px] font-semibold tracking-tight">The New Yorker</h1>

          <div className="flex flex-wrap items-center gap-1">
            <button onClick={() => setIsConnectModalOpen(true)} className="px-4 py-2 border border-[#1E1F24] rounded-full text-[12px] font-medium hover:bg-gray-50 transition-colors">
              Connect Socials
            </button>
            <button onClick={() => setIsBannerModalOpen(true)} className="px-4 py-2 border border-[#1E1F24] rounded-full text-[12px] font-medium hover:bg-gray-50 transition-colors">
              Upload Banner Image
            </button>
            <button className="px-4 py-2 border border-[#1E1F24] rounded-full text-[12px] font-medium hover:bg-gray-50 transition-colors">
              Invite Member
            </button>
            <button className="p-2 border border-[#1E1F24] rounded-full hover:bg-gray-50 transition-colors">
              <FiSettings size={18} />
            </button>
          </div>
        </div>

       
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden relative bg-orange-500">
              <Image src="/avatar.svg" fill alt="Admin" className="object-cover" />
            </div>
            <span className="text-[12px] font-medium">1 member</span>
          </div>

          <div className="flex items-center gap-2 text-[#9CA3AF] text-[12px]">
            <span>No Active Challenges</span>
            <span className="text-gray-300">•</span>
            <span>Unranked</span>
          </div>

          <div className="flex gap-2">
            {["Beauty", "family and lifestyle", "skincare"].map((tag) => (
              <span key={tag} className="px-2 text-[#3379A5] bg-[#F5FBFF] text-[12px] rounded-md font-medium cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[0.3fr_0.3fr_0.4fr] gap-4 mb-12">
          <div className="group relative overflow-hidden bg-[#E5FFE5] rounded-[24px] md:rounded-[32px] p-4 md:p-8 h-[180px] md:h-[180px] flex flex-col justify-between border border-[#E5FFE5]"></div>
          <div className="group relative overflow-hidden bg-[#FFF0FD] rounded-[24px] md:rounded-[32px] p-6 md:p-8 h-[180px] md:h-[180px] flex flex-col border border-[#FFF0FD]"></div>
          <div className="group relative overflow-hidden bg-[#E5F0FD] rounded-[24px] md:rounded-[32px] p-6 md:p-8 h-[180px] md:h-[180px] flex flex-col border border-[#E5F0FD]"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
          <h2 className="text-[20px] font-semibold tracking-tight self-start sm:self-center">Circle Challenges</h2>
          <div className="relative w-full max-w-[320px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Challenges"
              className="w-full pl-12 pr-4 py-3 border border-gray-100 rounded-full text-[12px] outline-none focus:border-gray-300 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <div className="block rounded-full mb-10">
            <img src="/circle.svg" alt="" />
          </div>
          <h3 className="text-[24px] font-semibold mb-3 tracking-tight">
            You circle has not joined any Challenges
          </h3>
          <p className="text-gray-500 text-[16px] max-w-[450px] mb-10 leading-normal">
            Your team hasn't joined any challenges yet. Pick a campaign 
            and submit as a team for a chance to win.
          </p>
          <button className="px-12 py-4 bg-[#0033FF] text-white rounded-full font-semibold text-[16px] hover:bg-[#0026CC] transition-all shadow-lg shadow-blue-600/10">
            Find Challenges
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircleProfile;