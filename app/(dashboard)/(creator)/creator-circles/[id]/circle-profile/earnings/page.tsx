"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { GoSearch, GoArrowLeft, GoArrowRight, GoPlus, GoX } from "react-icons/go";
import { useGetCircleEarnings, useGetEarningDetail } from "@/hooks/useCircles";

const EarningsHistory = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: earnings, isLoading } = useGetCircleEarnings(id);
  const { data: detail } = useGetEarningDetail(id, selectedId || "");

  const earningItems = earnings?.items ?? [];

  // Safe calculation for total earnings (defaults to 0 if data is missing)
  const totalEarnings = earnings?.items?.reduce((acc: number, cur: any) => acc + (cur.gross_prize || 0), 0) || 0;




  const handleBackNavigation = () => {
    if (selectedId) setSelectedId(null);
    else router.push(`/creator-circles/${id}/circle-profile`);
  };

  // --- DETAIL VIEW ---
  if (selectedId && detail) {
    return (
      <div className="w-full min-h-screen bg-white p-8 font-sans">
        <button onClick={() => setSelectedId(null)} className="mb-6 hover:bg-gray-50 rounded-full p-2 transition-colors">
          <GoX size={24} />
        </button>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <img src={detail.brand_logo_url || "/default.svg"} className="w-16 h-16 rounded-full object-cover" alt="Brand" />
            <div>
              <h2 className="text-[20px] font-semibold text-[#1E1F24]">{detail.title}</h2>
              <p className="text-[14px] text-gray-500">Gross Prize: ₦{(detail.gross_prize / 100).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-[#1E1F24] mb-4">Payout Breakdown</h3>
            {detail.payout_splits?.map((split: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <img src={split.profile_picture_url || "/default.svg"} className="w-8 h-8 rounded-full" />
                  <span className="font-medium text-[#1E1F24]">{split.full_name}</span>
                </div>
                <span className="font-semibold text-blue-600">{split.split_percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24] antialiased">
      <div className="max-w-screen mx-auto">
        
        <button onClick={handleBackNavigation} className="-ml-2 hover:bg-gray-50 rounded-full transition-colors p-2">
          <GoArrowLeft size={32} />
        </button>

        <h1 className="text-[24px] font-semibold tracking-tight mb-5">Circle Total Earnings</h1>

        {/* Hero Stats Card */}
        <div className="bg-[#F9FAFB] rounded-[32px] p-6 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <img src="/coin.svg" alt="Coin" className="w-6 h-6" />
            <span className="text-[20px] font-medium text-[#1E1F24]">Total Earnings</span>
          </div>
          
          <div className="flex items-baseline gap-1 mb-1">
            <h2 className="text-[40px] font-semibold text-black tracking-tighter">
              ₦{(totalEarnings / 100).toLocaleString()}
            </h2>
            <span className="text-[40px] font-semibold text-[#80828D]">.00</span>
          </div>

          <div className="flex items-center gap-1 text-[#1E874B] font-medium text-[12px]">
            <GoPlus size={16} /> {totalEarnings}% higher than last month
          </div>
        </div>

        {/* List Header */}
        <div className="flex items-center justify-between gap-12 mb-6">
          <h3 className="text-[20px] font-semibold text-[#1E1F24]">Earnings History</h3>
          <div className="relative w-[250px]">
            <GoSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search Challenges"
              className="w-full pl-14 pr-6 py-3.5 border border-[#EFF0F3] rounded-full text-[12px] outline-none focus:ring-2 focus:ring-blue-50"
            />
          </div>
        </div>

        {/* History List */}
        <div className="divide-y divide-[#EFF0F3] border-t border-[#EFF0F3]">
          {isLoading ? (
            <div className="py-20 text-center text-gray-400">Loading history...</div>
          ) : earningItems.length > 0 ? (
            earningItems.map((item: any) => (
              <div 
                key={item.challenge_id} 
                onClick={() => setSelectedId(item.challenge_id)}
                className="flex items-center justify-between py-5 px-2 cursor-pointer hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className="relative w-14 h-14 shrink-0">
                    <Image src={item.brand_logo_url || "/default.svg"} fill alt="Brand" className="rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#0CC963] rounded-full border-2 border-white flex items-center justify-center">
                      <GoArrowRight className="text-white -rotate-90" size={10} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#62636C] mb-1">{item.challenge_title}</h4>
                    <p className="text-[12px] text-[#747682] font-medium">
                      {item.paid_out_members} members payout • {item.credited_at ? new Date(item.credited_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-[14px] font-semibold text-[#62636C] mb-2">
                    + ₦{(item.gross_prize / 100).toLocaleString()}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-medium ${
                    item.credit_status === 'Successful' 
                      ? 'bg-[#03FC6C1A] text-[#27AE60]' 
                      : 'bg-[#FFF8DB] text-[#665201]'
                  }`}>
                    {item.credit_status?.charAt(0).toUpperCase() + item.credit_status?.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-400">
              <p>No earnings history recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarningsHistory;