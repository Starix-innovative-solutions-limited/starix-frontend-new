"use client";

import React from "react";
import Image from "next/image";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";

interface CardSubmissionProps {
  image?: string;
  name?: string;
  handle?: string;
  time?: string;
  caption?: string;
  likes?: number;
  comments?: number;
  onClick?: () => void; // Added for state toggle logic
}

const CardSubmission = ({
  image = "/card22.png",
  name = "Favour",
  handle = "@favvy",
  time = "20h",
  caption = "I’ve been using this for about a week now, and honestly, I’m genuinely surprised at how well it works, so I had to share it with you guys.",
  likes = 500,
  comments = 10,
  onClick,
}: CardSubmissionProps) => {
  return (
    <div 
      onClick={onClick}
      className="w-full bg-white overflow-hidden pb-10 border-b border-[#F2F4F7] last:border-none last:pb-0 cursor-pointer group"
    >
      
      {/* 1. TOP-ROUNDED IMAGE BANNER */}
      {/* Capped style: rounded-t-[24px] and h-[240px] for the "half-showing" look */}
      <div className="w-full h-[240px] relative rounded-t-[24px] rounded-b-none overflow-hidden bg-[#F9FAFB] transition-opacity group-hover:opacity-95">
        <Image 
          src={image} 
          alt="Submission Content" 
          fill 
          className="object-cover object-top" // Priorities the top half of the image
          priority
        />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="pt-6 space-y-6">
        
        {/* User Info & Time Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-50 shadow-sm">
              <Image 
                src="/avatar.svg" // Path from your figma UI
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[17px] font-bold text-[#0A0A30] leading-tight">
                {name}
              </h4>
              <p className="text-[14px] text-[#98A2B3]">
                {handle}
              </p>
            </div>
          </div>
          <span className="text-[14px] text-[#98A2B3] font-medium">
            {time}
          </span>
        </div>

        {/* Caption & Hashtags Field */}
        <div className="space-y-2">
          <p className="text-[18px] text-[#0A0A30] leading-relaxed">
            {caption}
          </p>
          <p className="text-[16px] text-[#667085] font-medium">
            #product #life
          </p>
        </div>

        {/* Footer: Engagement Stats & Social Icons */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-2.5 text-[#0A0A30]">
              <SlLike size={20} className="stroke-[1.5px]" />
              <span className="text-[15px] font-bold">{likes}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#0A0A30]">
              <FaRegComment size={20} className="stroke-[1.5px]" />
              <span className="text-[15px] font-bold">{comments}</span>
            </div>
          </div>

          {/* Social Group - Grayscale/Subtle as per Dashboard UI */}
          <div className="flex items-center gap-4 ">
            <Image src="/x.svg" alt="x" width={24} height={24} />
            <Image src="/yt.svg" alt="youtube" width={18} height={18} />
            <Image src="/ig.svg" alt="instagram" width={18} height={18} />
            <Image src="/tt.svg" alt="tiktok" width={18} height={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSubmission;