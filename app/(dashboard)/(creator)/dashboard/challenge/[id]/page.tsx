/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import { FiBarChart2, FiMail, FiClock, FiDownload } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";

const ChallengeDetailPage = () => {
  const params = useParams();
  const router = useRouter();

  // In a real app, you'd fetch data based on params.id
  // For now, we use your Nivea data as the layout template
  return (
    <div className="min-h-screen bg-white px-4 md:px-8 py-8 max-w-[1200px] mx-auto">
      {/* NAVIGATION BAR */}
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-2 text-[#1E1F24]"
        >
          <HiArrowLeft size={24} />
        </button>
        
        <div className="flex gap-3">
          <button className="px-6 py-2.5 border border-[#E5E7EB] rounded-full text-[14px] font-semibold text-[#1E1F24] hover:bg-gray-50">
            Save Challenge
          </button>
          <button className="px-8 py-2.5 bg-[#0047FF] text-white rounded-full text-[14px] font-semibold shadow-md hover:bg-blue-700 transition-all">
            Submit Entry
          </button>
        </div>
      </div>

      {/* TITLE SECTION */}
      <h1 className="text-[28px] md:text-[36px] font-semibold text-[#1E1F24] leading-[1.2] mb-8">
        UGC Creators Needed for Skincare Product set Launch
      </h1>

      {/* BRAND INFO */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-100">
          <Image src="/nivea.svg" alt="Nivea" fill className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[16px] text-[#111827]">Nivea</span>
            <MdVerified className="text-[#22C55E]" size={18} />
            <span className="text-[#9CA3AF] text-[14px] font-medium ml-2">• 12h ago</span>
          </div>
          <div className="flex gap-2 mt-1">
            {["Beauty", "family and lifestyle", "skincare"].map((tag) => (
              <span key={tag} className="text-[11px] bg-[#F5FBFF] text-[#3379A5] px-3 py-1 rounded-full font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="flex items-center gap-4 text-[13px] font-bold mb-2">
        <span className="text-[#1E1F24]">₦10M prize pool</span>
        <span className="text-[#E5E7EB]">|</span>
        <span className="text-[#D12B1F]">Closes in 12h</span>
        <span className="text-[#E5E7EB]">|</span>
        <span className="text-[#1E874B] bg-[#ECFEF4] px-3 py-1 rounded-md">Verified Challenge</span>
      </div>

      {/* BODY CONTENT */}
      <div className="space-y-6">
        <section>
          <h2 className="text-[14px] font-semibold text-[#1E1F24] ">About This Challenge</h2>
          <p className="text-[#62636C] text-[14px] leading-[1.6]">
            NIVEA is launching its new Radiance Boost Skincare Collection and is looking for authentic, engaging user-generated content that highlights real skin journeys, glow transformations, and everyday skincare routines.
          </p>
          <p className="text-[#62636C] text-[15px] leading-[1.6] mt-4">
            Creators are expected to produce short-form video or photo content that demonstrates product usage, results, and emotional storytelling. Content should feel natural, relatable, and aligned with NIVEA&apos;s clean, trusted, and inclusive brand voice. Selected submissions will be used across NIVEA’s digital campaigns, social media platforms, and paid promotions.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold text-[#1E1F24] mb-3">Objective</h2>
          <p className="text-[#62636C] text-[14px] mb-4">Create engaging content that:</p>
          <ul className="space-y-2 text-[#62636C] text-[14px]">
            <li className="flex gap-2">• <span>Showcases real skincare routines using the Radiance Boost products</span></li>
            <li className="flex gap-2">• <span>Highlights visible glow, hydration, or transformation</span></li>
            <li className="flex gap-2">• <span>Connects emotionally with everyday skincare users</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[#1E1F24] mb-5">Sample Content and Attachments</h2>
          <p className="text-[#9CA3AF] text-[12px] mb-4 font-normal">Your Content must meet the requirements below to be considered viable for this challenge</p>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {["/left1.svg", "/skincare.svg", "/pdf.svg", "/products.svg", "/orange.svg"].map((img, i) => (
              <div key={i} className="min-w-[250px] h-[260px] relative rounded-[24px] overflow-hidden">
                <Image src={img} alt="Sample" fill className="object-cover" />
                
              </div>
            ))}
            
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[#1E1F24] mb-4">Mandatory Requirements</h2>
          <div className="divide-y divide-[#F3F4F6] border-t border-[#F3F4F6]">
            {[
              "Content must feature at least one NIVEA Radiance Boost product",
              "Video length must be between 15–60 seconds OR 1–3 high-quality images",
              "Lighting must be clear and natural (no heavy filters)",
              "Creator must appear in the content (face or voice required)",
              "Include at least one storytelling element (routine, transformation, or testimonial)",
              "Brand tone must remain clean, authentic, and positive",
              "No competitor products visible in content",
              "Content must be original and not previously published"
            ].map((req, idx) => (
              <div key={idx} className="py-4 flex gap-4 text-[14px]">
                <span className="text-[#9CA3AF] font-semibold">{idx + 1}.</span>
                <p className="text-[#62636C] text-[14px] font-normal">{req}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER METRICS */}
      <footer className=" pt-8 border-t border-[#F3F4F6] flex justify-between items-center text-[#62636C]">
        <div className="flex gap-6 text-[10px] font-medium">
          <span className="flex items-center gap-1.5"><FiBarChart2 size={18}/> 2189</span>
          <span className="flex items-center gap-1.5"><FiMail size={18}/> 87</span>
          <span className="flex items-center gap-1.5"><FiClock size={18}/> 12h</span>
        </div>
        <button className="text-[12px] font-medium hover:text-[#111827]">Read Terms of Service Here</button>
      </footer>
    </div>
  );
};

export default ChallengeDetailPage;