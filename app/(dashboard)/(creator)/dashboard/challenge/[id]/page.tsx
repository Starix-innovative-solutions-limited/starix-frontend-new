/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import { FiBarChart2, FiMail, FiClock } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import SubmitEntryModal from "@/components/(creator)/dashboard/SubmitEntryModal";
import { useGetChallengeById } from "@/hooks/useChallenges";

// --- MAIN PAGE ---
const ChallengeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract the target identifier dynamically from your route parameters
  const challengeId = params?.id as string;

  // Integrate API hook parameter context
  const { data: challenge } = useGetChallengeById(challengeId);

  // Helper utility formatting time deltas for the brand info header
  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return "12h ago";
    const hours = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60));
    return hours < 24 ? `${hours || 12}h ago` : `${Math.floor(hours / 24)}d ago`;
  };

  // Safe assembly of dynamic or static images for preview tracks
  const mediaPreviews = React.useMemo(() => {
    if (challenge?.media && challenge.media.length > 0) {
      return challenge.media
        .sort((a: any, b: any) => a.display_order - b.display_order)
        .map((m: any) => m.media_url);
    }
    // Fallback precisely to your requested static layout images
    return ["/left1.svg", "/skincare.svg", "/pdf.svg", "/products.svg", "/orange.svg"];
  }, [challenge]);

  return (
    <div className="min-h-screen font-geist bg-white max-w-[1200px] mx-auto">
      {/* NAVIGATION BAR */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-2 text-[#1E1F24]"
        >
          <HiArrowLeft size={24} />
        </button>
      </div>

      {/* TITLE SECTION */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[20px] md:text-[26px] font-semibold text-[#1E1F24] leading-[1] mb-4">
          {challenge?.title || "UGC Creators Needed for Skincare Product set Launch"}
        </h1>
        <div className="flex gap-3">
          <div className="flex w-full items-center justify-end gap-2 sm:gap-3">
            <button className="flex-1 sm:flex-initial min-w-0 whitespace-nowrap px-3 sm:px-6 py-2.5 border border-[#E5E7EB] rounded-full text-[13px] sm:text-[14px] font-semibold text-[#1E1F24] hover:bg-gray-50 transition-all text-center">
              {challenge?.is_saved ? "Saved" : "Save Challenge"}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-initial min-w-0 whitespace-nowrap px-3 sm:px-6 py-2.5 bg-[#0047FF] text-white rounded-full text-[13px] sm:text-[14px] font-semibold shadow-md hover:bg-blue-700 transition-all text-center"
            >
              Submit Entry
            </button>
          </div>
        </div>
      </div>
        

      {/* BRAND INFO */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-100">
          <Image 
            src={challenge?.brand_profile_picture_url || "/nivea.svg"} 
            alt={challenge?.brand_name || "Nivea"} 
            fill 
            className="object-cover" 
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[12px] text-[#111827]">
              {challenge?.brand_name || "Nivea"}
            </span>
            <MdVerified className="text-[#22C55E]" size={14} />
            <span className="text-[#9CA3AF] text-[12px] font-medium ml-2">
              • {challenge?.created_at ? formatTimeAgo(challenge.created_at) : "12h ago"}
            </span>
          </div>
          <div className="flex gap-1 mt-1">
            {challenge?.category_name ? (
              <span className="text-[10px] bg-[#F5FBFF] text-[#3379A5] px-1 rounded-full font-semibold">
                {challenge.category_name}
              </span>
            ) : (
              ["Beauty", "family and lifestyle", "skincare"].map((tag) => (
                <span key={tag} className="text-[10px] bg-[#F5FBFF] text-[#3379A5] px-1 rounded-full font-semibold">
                  {tag}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="flex items-center gap-4 text-[11px] font-semibold mb-2">
        <span className="text-[#1E1F24]">
          {challenge?.prize_pool_display || `${challenge?.currency_symbol || "₦"}${challenge?.prize_pool || "10M"}`} prize pool
        </span>
        <span className="text-[#E5E7EB]">|</span>
        <span className="text-[#D12B1F]">Closes in 12h</span>
        {challenge?.is_funded !== false && (
          <>
            <span className="text-[#E5E7EB]">|</span>
            <span className="text-[#1E874B] bg-[#ECFEF4] px-1 rounded-full">Verified Challenge</span>
          </>
        )}
      </div>

      {/* BODY CONTENT */}
      <div className="space-y-4">
        <section>
          <h2 className="text-[14px] font-semibold text-[#1E1F24] ">About This Challenge</h2>
          <p className="text-[#62636C] text-[14px] leading-[1.6]">
            {challenge?.description || "NIVEA is launching its new Radiance Boost Skincare Collection and is looking for authentic, engaging user-generated content that highlights real skin journeys, glow transformations, and everyday skincare routines."}
          </p>
          <p className="text-[#62636C] text-[15px] leading-[1.6] mt-2">
            {challenge?.brief || "Creators are expected to produce short-form video or photo content that demonstrates product usage, results, and emotional storytelling. Content should feel natural, relatable, and aligned with NIVEA's clean, trusted, and inclusive brand voice. Selected submissions will be used across NIVEA’s digital campaigns, social media platforms, and paid promotions."}
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold text-[#1E1F24] mb-2">Objective</h2>
          <p className="text-[#62636C] text-[14px] mb-2">Create engaging content that:</p>
          <ul className="space-y-2 text-[#62636C] text-[14px]">
            <li className="flex gap-2">• <span>Showcases real skincare routines using the Radiance Boost products</span></li>
            <li className="flex gap-2">• <span>Highlights visible glow, hydration, or transformation</span></li>
            <li className="flex gap-2">• <span>Connects emotionally with everyday skincare users</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[#1E1F24] mb-2">Sample Content and Attachments</h2>
          <p className="text-[#9CA3AF] text-[12px] mb-4 font-normal">Your Content must meet the requirements below to be considered viable for this challenge</p>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {mediaPreviews.map((img: string, i: number) => (
              <div key={i} className="min-w-[250px] h-[260px] relative rounded-[24px] overflow-hidden bg-gray-100">
                {img.endsWith(".mp4") ? (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">▶ Video Clip</span>
                  </div>
                ) : (
                  <Image src={img} alt="Sample Attachment Track" fill className="object-cover" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[#1E1F24] mb-2">Mandatory Requirements</h2>
          <div className="divide-y divide-[#F3F4F6] border-t border-[#F3F4F6]">
            {challenge?.content_requirements && challenge.content_requirements.length > 0 ? (
              challenge.content_requirements.map((req: string, idx: number) => (
                <div key={idx} className="py-3 flex gap-2 text-[14px]">
                  <span className="text-[#9CA3AF] font-semibold">{idx + 1}.</span>
                  <p className="text-[#62636C] text-[14px] font-normal">{req}</p>
                </div>
              ))
            ) : (
              [
                "Content must feature at least one NIVEA Radiance Boost product",
                "Video length must be between 15–60 seconds OR 1–3 high-quality images",
                "Lighting must be clear and natural (no heavy filters)",
                "Creator must appear in the content (face or voice required)",
                "Include at least one storytelling element (routine, transformation, or testimonial)",
                "Brand tone must remain clean, authentic, and positive",
                "No competitor products visible in content",
                "Content must be original and not previously published"
              ].map((req, idx) => (
                <div key={idx} className="py-3 flex gap-2 text-[14px]">
                  <span className="text-[#9CA3AF] font-semibold">{idx + 1}.</span>
                  <p className="text-[#62636C] text-[14px] font-normal">{req}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <footer className=" pt-8 border-t border-[#F3F4F6] flex justify-between items-center text-[#62636C]">
        <div className="flex gap-6 text-[10px] font-medium">
          <span className="flex items-center gap-1.5"><FiBarChart2 size={18}/> {challenge?.viewer_count || "2189"}</span>
          <span className="flex items-center gap-1.5"><FiMail size={18}/> {challenge?.participant_count || "87"}</span>
          <span className="flex items-center gap-1.5"><FiClock size={18}/> 12h</span>
        </div>
        <button className="text-[12px] font-medium hover:text-[#111827]">Read Terms of Service Here</button>
      </footer>

      {/* EXTERNAL MODAL COMPONENT */}
      <SubmitEntryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ChallengeDetailPage;