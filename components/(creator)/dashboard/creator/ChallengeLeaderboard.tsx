"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { FaPeopleGroup } from "react-icons/fa6";

const ChallengeLeaderboard = () => {
  const leaders = [
    { rank: 1, name: "Favour", handle: "@favvy", score: 500, views: 500, likes: 500, hasTrophy: true },
    { rank: 2, name: "Favour", handle: "@favvy", score: 500, views: 500, likes: 500 },
    { rank: 3, name: "Favour", handle: "@favvy", score: 500, views: 500, likes: 500 },
  ];

  const rankings = [
    { rank: 1, score: 1000, social: "Tiktok", status: "Under Review" },
    { rank: 2, score: 800, social: "IG", status: "Accepted" },
    { rank: 3, score: 500, social: "Youtube", status: "Under Review" },
    { rank: 4, score: 200, social: "Tiktok", status: "Under Review" },
    { rank: 5, score: 200, social: "Tiktok", status: "Under Review" },
    { rank: 6, score: 200, social: "Tiktok", status: "Under Review" },
  ];

  return (
    <div className="min-h-screen  p-6 lg:p-10 text-[#0F172A] font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <ArrowLeft className="w-6 h-6 text-[#101828] cursor-pointer" />
          <h1 className="text-[26px] font-semibold text-[#101828]">
            Challenge Leaderboard
          </h1>
        </div>

        {/* SUMMARY CARDS - ASYMMETRICAL 40/60 SPLIT */}
        <div className="grid  w-full grid-cols-10 gap-6">
          
          {/* Total Creators (40%) */}
          <div className="col-span-10 md:col-span-4 relative p-[1.5px] rounded-[24px] bg-gradient-to-br from-[#FD6C1D] via-[#06FF89] to-[#040136] shadow-xs border-0.4 border-[#F2F4F7]">
            <div className="bg-white rounded-[23px] p-8 h-full flex justify-between items-center">
              <div>
                <p className="text-[#667085] text-sm font-medium mb-3">Total Creators:</p>
                <h2 className="text-[26px] font-normal text-[#101828] leading-none">150</h2>
              </div>
              <div className="text-xl opacity-70">
                <FaPeopleGroup />
              </div>
            </div>
          </div>

          {/* Time Left (60%) */}
          <div className="col-span-10 md:col-span-6 relative p-[1.5px] rounded-[24px] bg-gradient-to-br from-[#FD6C1D] via-[#06FF89] to-[#040136] shadow-xs border border-[#F2F4F7]">
            <div className="bg-white rounded-[23px] p-8 h-full flex justify-between items-center">
              <div>
                
                <div className="flex items-start gap-12">
                  {/* Each unit is now a column */}
                  <p className="text-[#667085] text-sm font-medium mb-3">Time Left:</p>
                  <div className="flex flex-col items-start">
                    <span className="text-[26px] font-normal text-[#101828] leading-none">20</span>
                    <span className="text-[#667085] text-xs font-medium mt-1">Days</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[26px] font-normal text-[#101828] leading-none">07</span>
                    <span className="text-[#667085] text-xs font-medium mt-1">Hours</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[26px] font-normal text-[#101828] leading-none">10</span>
                    <span className="text-[#667085] text-xs font-medium mt-1">Mins</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-24 h-24 rounded-full flex items-center justify-center transform rotate-12">
                   <img src="/Badge 1.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CURRENT LEADERS */}
        <section>
          <h2 className="text-[20px] font-bold text-[#101828] mb-4">Current Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.map((leader, index) => (
              <div key={index} className="bg-white p-6 border border-[#FAFAFA] shadow-xxs relative min-h-[260px]">
                
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#EAECF0] overflow-hidden">
                      <img src="/avatar.svg" alt="" className="rounded-full w-14 h-14" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-[#101828] leading-tight">{leader.name}</h3>
                      <p className="text-sm text-[#667085] font-medium">{leader.handle}</p>
                    </div>
                  </div>
                  {leader.hasTrophy && (
                     <div className="w-20 h-20 -mt-2 -mr-4 drop-shadow-lg">
                        <img src="/Trophy22.svg" alt="" />
                     </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-[#F2F4F7]">
                  <div>
                    <p className="text-[10px] text-[#98A2B3] uppercase font-bold tracking-widest mb-1">Starix Score:</p>
                    <p className="text-[18px] font-normal text-[#101828]">{leader.score}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#98A2B3] uppercase font-bold tracking-widest mb-1">Views:</p>
                    <p className="text-[18px] font-normal text-[#101828]">{leader.views}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#98A2B3] uppercase font-bold tracking-widest mb-1">Likes:</p>
                    <p className="text-[18px] font-normal text-[#101828]">{leader.likes}</p>
                  </div>
                </div>

                {/* Rank Badge - EXTREME LEFT BOTTOM */}
                <div className="absolute bottom-6 left-6">
                  <div className="w-6 h-6 rounded-full border-[1.5px] border-dashed border-[#FDB022] flex items-center justify-center">
                    <span className="text-[#101828] font-bold text-sm">{leader.rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GLOBAL RANKING */}
        <section>
          <h2 className="text-[20px] font-bold text-[#101828] mb-8">Global Ranking</h2>
          <div className="bg-white rounded-[24px] border border-[#FAFAFA] shadow-xxs overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F2F4F7]">
                  <th className="px-8 py-5 text-[13px] font-semibold text-[#667085]">Rank</th>
                  <th className="px-6 py-5 text-[13px] font-semibold text-[#667085]">Creator</th>
                  <th className="px-6 py-5 text-[13px] font-semibold text-[#667085]">
                    Engagements <br/> <span className="text-[#98A2B3] font-normal ml-1">(Views, Likes)</span>
                  </th>
                  <th className="px-6 py-5 text-[13px] font-semibold text-[#667085]">Starix Score</th>
                  <th className="px-6 py-5 text-[13px] font-semibold text-[#667085]">Social Media</th>
                  <th className="px-6 py-5 text-[13px] font-semibold text-[#667085]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F7]">
                {rankings.map((item) => (
                  <tr key={item.rank} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-8 py-6 font-semibold text-[#101828]">#{item.rank}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <img src="/avatar.svg" alt="" className="rounded-full"/>
                        <div>
                          <p className="font-semibold text-[#101828] text-sm">Favour</p>
                          <p className="text-xs text-[#667085]">@favvy</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm font-semibold text-[#344054]">100, 500</td>
                    <td className="px-6 py-6 text-[15px] font-semibold text-[#101828]">{item.score}</td>
                    <td className="px-6 py-6 text-sm text-[#344054] font-semibold">{item.social}</td>
                    <td className="px-6 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-tight uppercase ${
                          item.status === "Accepted"
                            ? "bg-[#FEF0C7] text-[#B54708]"
                            : "bg-[#F2F4F7] text-[#344054]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChallengeLeaderboard;