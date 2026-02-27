"use client";

import React, { useState } from "react";
import { List } from "lucide-react";
import { IoFilter } from "react-icons/io5";
import CardSubmission from "@/components/(brand)/submissions/CardSubmission";
import CreatorsSubmissionPost from "@/components/(brand)/submissions/CreatorsSubmissionPost";
// ✅ Import the Leaderboard component
import ChallengeLeaderboard from "@/components/(creator)/dashboard/creator/ChallengeLeaderboard";

const SubmissionsPage = () => {
  const [activeTab, setActiveTab] = useState("Creators Submissions");
  const [activeCampaign, setActiveCampaign] = useState(0);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const campaigns = Array(4).fill("Soap Campaign");

  const handleViewPost = (postData: any) => setSelectedPost(postData);
  const handleBackToFeed = () => setSelectedPost(null);

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-[#0A0A30] font-sans">
      <div className="max-w-[1440px] mx-auto px-12 pt-12 pb-20">
        
        {/* SECTION TITLE & FILTER */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-[28px] font-normal tracking-tight text-[#0A0A30]">
            Submissions
          </h1>
          {/* Hide filter when in detailed view or on the Leaderboard tab to match Figma hierarchy */}
          {!selectedPost && activeTab === "Creators Submissions" && (
            <button className="flex items-center gap-2 px-6 py-3 border border-[#F2F4F7] bg-white rounded-full text-[#667085] shadow-sm hover:shadow-md transition-all">
              <IoFilter size={18} />
              <span className="text-sm font-semibold">Filter</span>
            </button>
          )}
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-12 gap-12">
          
          {/* LEFT INNER SIDEBAR (30%) */}
          <div className="col-span-3">
            <div className="bg-white rounded-[24px] border border-[#F2F4F7] shadow-sm overflow-hidden sticky top-8">
              <div className="px-6 py-6 border-b border-[#F2F4F7] flex items-center gap-3">
                <List size={20} className="text-[#98A2B3]" />
                <span className="text-[13px] font-bold text-[#98A2B3] uppercase tracking-[0.1em]">
                  Challenge List
                </span>
              </div>
              <div className="p-4 space-y-2">
                {campaigns.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveCampaign(i);
                      handleBackToFeed();
                    }}
                    className={`w-full text-left px-6 py-4 rounded-[16px] text-[15px] font-medium transition-all ${
                      activeCampaign === i 
                      ? "bg-[#F9FAFB] text-[#0A0A30]" 
                      : "text-[#98A2B3] hover:bg-gray-50/50"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT FEED (70%) */}
          <div className="col-span-9">
            {selectedPost ? (
              <div className="bg-white rounded-[32px] border border-[#F2F4F7] shadow-sm p-12">
                <CreatorsSubmissionPost onBack={handleBackToFeed} />
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border border-[#F2F4F7] shadow-sm p-12">
                {/* TABS */}
                <div className="flex items-center gap-4 border-b border-[#F2F4F7] mb-12 pb-2">
                {["Creators Submissions", "Challenge Leaderboard"].map((tab) => (
                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 text-[20px] font-medium transition-all rounded-3xl ${
                        activeTab === tab 
                        ? "bg-gray-100 text-[#0A0A30]" 
                        : "bg-transparent text-[#98A2B3] hover:text-[#0A0A30]"
                    }`}
                    >
                    {tab}
                    </button>
                ))}
                </div>

                {/* ✅ CONDITIONAL CONTENT SWITCHING */}
                {activeTab === "Creators Submissions" ? (
                  <div className="flex flex-col gap-12">
                    <CardSubmission onClick={() => handleViewPost({ id: 1 })} />
                    <CardSubmission onClick={() => handleViewPost({ id: 2 })} />
                    <CardSubmission onClick={() => handleViewPost({ id: 3 })} />
                  </div>
                ) : (
                  /* ✅ CHALLENGE LEADERBOARD COMPONENT */
                  <ChallengeLeaderboard />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;