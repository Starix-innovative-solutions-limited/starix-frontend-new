/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import WithdrawModal from "@/components/(creator)/dashboard/WithdrawModal"; 
import WalletSettingsModal from "@/components/(creator)/dashboard/WalletSettingsModal"; 

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("Earnings");
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  /** * FIRST TIME USER LOGIC
   * You can replace this with a real check from your backend/auth state
   */
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  const earnings = [
    { id: 1, title: "Content Writers for Travel Guide Collaboration", subtitle: "Circle Payout", time: "5 minutes ago", amount: "+ ₦35,000", status: "Successful", icon: "/Parent.svg" },
    { id: 2, title: "Graphic Designers for Social Media Campaign", subtitle: "", time: "10 minutes ago", amount: "+ ₦42,000", status: "Pending", icon: "/Parent (1).svg" },
    { id: 3, title: "Web Developers for E-commerce Site Upgrade", subtitle: "", time: "15 minutes ago", amount: "+ ₦80,000", status: "Successful", icon: "/Parent (2).svg" },
    { id: 4, title: "SEO Specialists for Blog Optimization", subtitle: "Circle Payout", time: "12 hours ago", amount: "+ ₦29,800", status: "Pending", icon: "/Parent (3).svg" },
    { id: 5, title: "UI/UX Designers for Mobile App Redesign", subtitle: "", time: "4 days ago", amount: "+ ₦64,700", status: "Successful", icon: "/Parent (4).svg" },
  ];

  const withdrawals = [
    { id: 1, title: "Withdrawal to Desire Destiny", time: "42 minutes ago", amount: "- ₦35,000", status: "Successful", icon: "/withdraw.svg" },
    { id: 2, title: "Withdrawal to Desire Destiny", time: "17 hours ago", amount: "- ₦42,000", status: "Pending", icon: "/withdraw.svg" },
    { id: 3, title: "Withdrawal to Desire Destiny", time: "21 hours ago", amount: "- ₦80,000", status: "Failed", icon: "/withdraw.svg" },
    { id: 4, title: "Withdrawal to Desire Destiny", time: "3 days ago", amount: "- ₦29,800", status: "Successful", icon: "/withdraw.svg" },
    { id: 5, title: "Withdrawal to Desire Destiny", time: "26 days ago", amount: "- ₦64,700", status: "Successful", icon: "/withdraw.svg" },
  ];

  const currentData = activeTab === "Earnings" ? earnings : withdrawals;

  return (
    <div className="min-h-screen bg-white font-['Geist']">
      <div className="max-w-[1200px] ">
        
        {/* TOP HEADER */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[24px] font-semibold mb-2 text-[#000000] tracking-tight">Wallet</h1>
            <p className="text-[#62636C] font-regular text-[12px]">Track your balance and manage your payouts</p>
          </div>
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-4 bg-[#F9F9FB] rounded-full hover:bg-gray-100 transition-colors active:scale-95"
          >
            <img src="/vectros.svg" alt="Settings" />
          </button>
        </header>

        {/* BALANCE CARD */}
<div className="relative w-full h-[240px] rounded-[32px] overflow-hidden mb-12 bg-[#E9F6FF]">
  
  {/* DECORATIVE BACKGROUND LAYER */}
  {/* Logic: 
    1. We give the wrapper a width that is slightly larger than the graphic usually needs (e.g., 60%).
    2. We use flex and justify-end to keep it pinned to the right.
    3. 'object-contain' ensures the full SVG is always visible within that scaling box.
  */}
  <div className="absolute right-0 bottom-0 h-full w-[50%] md:w-[60%] pointer-events-none flex items-end justify-end p-4 md:p-0">
    <div className="relative h-[90%] w-full transition-all duration-500 ease-in-out">
      <Image 
        src="/groupss.svg" 
        alt="Decorative background" 
        fill 
        className="object-contain object-right-bottom"
        priority
      />
    </div>
  </div>

  {/* MAIN CONTENT LAYER */}
  <div className="relative z-10 p-10 flex flex-col justify-between h-full">
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
         <img src="/candyyy.svg" alt="Icon" className="w-5 h-5" />
         <span className="text-[12px] font-semibold text-[#747682] uppercase tracking-[0.1em]">
           Wallet Balance
         </span>
      </div>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-[40px] font-semibold text-[#000000]">₦800,000</span>
        <span className="text-[40px] font-semibold text-[#8B8D98]">.00</span>
      </div>
    </div>

    <button 
      onClick={() => setIsWithdrawModalOpen(true)}
      className="w-fit px-6 py-3.5 bg-[#0033FF] text-white rounded-full font-semibold text-[12px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
    >
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentData.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between border-b border-[#F9FAFB] hover:bg-[#F9FAFB]/50 transition-colors"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative overflow-hidden flex items-center justify-center p-2.5">
                      <Image 
                        src={item.icon} 
                        alt={item.title} 
                        width={60} 
                        height={60} 
                        className="object-contain" 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-0.5 max-w-[200px] md:max-w-md lg:max-w-lg">
                      <h3 className="text-[12px] md:text-[14px] font-semibold text-[#62636C] leading-tight truncate">
                        {item.title}
                      </h3>
                      <p className="text-[#747682] text-[10px] md:text-[12px] font-medium">
                        {(item as any).subtitle && <span className="text-[#747682] font-medium">{(item as any).subtitle} • </span>}
                        {item.time}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2 shrink-0 ml-4">
                    <span className={`text-[12px] md:text-[14px] font-semibold ${activeTab === 'Earnings' ? 'text-[#62636C]' : 'text-[#1E1F24]'}`}>
                      {item.amount}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full tracking-wide ${
                      item.status === 'Successful' 
                        ? 'bg-[#03FC6C1A] text-[#27AE60]' 
                        : item.status === 'Pending'
                        ? 'bg-[#FEDC4C33] text-[#665201]'
                        : 'bg-[#FE34261A] text-[#FE3426]'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
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

      {/* WITHDRAW MODAL */}
      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)} 
        balance={800000} 
      />

      {/* WALLET SETTINGS MODAL */}
      <WalletSettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        isFirstTimeUser={isFirstTimeUser} // Pass the state here
        onChangeWithdrawalAccount={() => {
           setIsSettingsModalOpen(false);
           setIsWithdrawModalOpen(true);
        }}
        onSuccess={() => {
          // After a first-time user sets their PIN, update local state
          setIsFirstTimeUser(false);
        }}
      />
    </div>
  );
};

export default WalletPage;