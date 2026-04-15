/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiSettings } from "react-icons/fi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("Earnings");

  // Using brand-safe local or generic paths for icons
  const transactions = [
    { id: 1, title: "Content Writers for Travel Guide Collaboration", subtitle: "Circle Payout", time: "5 minutes ago", amount: "+ ₦35,000", status: "Successful", icon: "/Parent.svg" },
    { id: 2, title: "Graphic Designers for Social Media Campaign", subtitle: "", time: "10 minutes ago", amount: "+ ₦42,000", status: "Pending", icon: "/Parent (1).svg" },
    { id: 3, title: "Web Developers for E-commerce Site Upgrade", subtitle: "", time: "15 minutes ago", amount: "+ ₦80,000", status: "Successful", icon: "/Parent (2).svg" },
    { id: 4, title: "SEO Specialists for Blog Optimization", subtitle: "Circle Payout", time: "12 hours ago", amount: "+ ₦29,800", status: "Pending", icon: "/Parent (3).svg" },
    { id: 5, title: "UI/UX Designers for Mobile App Redesign", subtitle: "", time: "4 days ago", amount: "+ ₦64,700", status: "Successful", icon: "/Parent (4).svg" },
  ];

  return (
    <div className="min-h-screen bg-white py-10 font-['Geist']">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* TOP HEADER */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[24px] font-semibold mb-2 text-[#000000] tracking-tight">Wallet</h1>
            <p className="text-[#62636C] font-regular text-[12px]">Track your balance and manage your payouts</p>
          </div>
          <button className="p-4 bg-[#F9F9FB] rounded-full transition-colors">
            
            <img src="/vectros.svg" alt="" />
          </button>
        </header>

        {/* BALANCE CARD */}
<div className="relative w-full h-[240px] rounded-[32px] overflow-hidden mb-12 bg-[#E9F6FF]">
  
  {/* DECORATIVE BACKGROUND - MOBILE OPTIMIZED */}
  <div className="absolute right-0 bottom-0 h-full w-[85%] md:w-[60%] pointer-events-none flex items-end justify-end">
    <div className="relative h-full w-full">
       <Image 
        src="/groupss.svg" 
        alt="Decorative background" 
        fill 
        
        className="object-contain object-right object-bottom"
        priority
      />
    </div>
  </div>

  <div className="relative z-10 p-10 flex flex-col justify-between h-full">
    
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
         <img src="/candyyy.svg" alt="" />
         <span className="text-[12px] font-semibold text-[#747682] uppercase tracking-[0.1em]">Wallet Balance</span>
      </div>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-[40px] font-semibold text-[#000000]">₦800,000</span>
        <span className="text-[40px] font-semibold text-[#8B8D98]">.00</span>
      </div>
    </div>

    <button className="w-fit px-6 py-3.5 bg-[#0033FF] text-white rounded-full font-semibold text-[12px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95">
      Withdraw
    </button>
  </div>
</div>

        {/* TABS */}
        <div className="flex gap-10 border-b border-[#F3F4F6] mb-8">
          {["Earnings", "Withdrawals"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[12px] md:text-[14px] font-semibold transition-all relative ${
                activeTab === tab ? "text-[#0033FF]" : "text-[#747682]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabUnderline" 
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0033FF] rounded-t-full" 
                />
              )}
            </button>
          ))}
        </div>

        {/* TRANSACTION LIST */}
        <div className="flex flex-col">
          {transactions.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between  border-b border-[#F9FAFB] hover:bg-[#F9FAFB]/50 transition-colors "
            >
              <div className="flex items-center gap-5">
                <div className="relative  overflow-hidden flex items-center justify-center p-2.5">
                  {/* Using standard icon placeholders - update paths as needed */}
                  <Image src={item.icon} alt={item.title} width={60} height={60} className="object-contain" />

                  
                </div>
                
                <div className="flex flex-col gap-0.5 max-w-[200px] md:max-w-md lg:max-w-lg">
                  <h3 className="text-[12px] md:text-[14px] font-semibold text-[#62636C] leading-tight truncate">{item.title}</h3>
                  <p className="text-[#747682] text-[10px] md:text-[12px] font-medium">
                    {item.subtitle && <span className="text-[#747682] font-medium">{item.subtitle} • </span>}
                    {item.time}
                  </p>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-2 shrink-0 ml-4">
                <span className="text-[12px] md:text-[14px] font-semibold text-[#62636C]">{item.amount}</span>
                <span className={`text-[10px] font-medium px-2 py-1 rounded-full tracking-wide ${
                  item.status === 'Successful' 
                  ? 'bg-[#03FC6C1A] text-[#27AE60]' 
                  : 'bg-[#FEDC4C33] text-[#665201]'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-12 mb-10">
          <button className="flex items-center gap-2 px-4 md:px-6 py-2.5 border border-[#E5E7EB] rounded-full text-[12px] md:text-[14px] font-normal text-[#62636C] hover:bg-gray-50 transition-all active:scale-95">
            <HiArrowLeft size={18} /> Previous
          </button>
          
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-[#F9F9FB] text-[#1E1F24] rounded-xl font-bold text-[14px] border border-[#EFF0F3]">1</button>
            <span className="text-[#9CA3AF] px-1 font-bold">...</span>
            <button className="w-10 h-10 text-[#6B7280] hover:bg-gray-50 rounded-xl font-bold text-[14px]">4</button>
          </div>

          <button className="flex items-center gap-2 px-4 md:px-6 py-2.5 border border-[#E5E7EB] rounded-full text-[12px] md:text-[14px] font-bold text-[#62636C] hover:bg-gray-50 transition-all active:scale-95">
            Next <HiArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default WalletPage;