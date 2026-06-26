/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import WithdrawModal from "@/components/(creator)/dashboard/WithdrawModal"; 
import WalletSettingsModal from "@/components/(creator)/dashboard/WalletSettingsModal"; 
import { useGetWalletBalances, useGetWalletEarnings } from "@/hooks/useWallet";

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("Earnings");
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Integrate live backend queries
  const { data: balanceData, isLoading: isBalanceLoading } = useGetWalletBalances();
  const { data: earningsData, isLoading: isEarningsLoading } = useGetWalletEarnings(currentPage);

  /** * FIRST TIME USER LOGIC */
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  // Mock withdrawals array remains as structural fallback for UI context switches
  const withdrawals = [
    { id: "w1", challenge_title: "Withdrawal to Desire Destiny", earned_at: "2026-06-04T12:00:00Z", amount: "35000", currency: "NGN", status: "successful", brand_logo_url: "/withdraw.svg" },
    { id: "w2", challenge_title: "Withdrawal to Desire Destiny", earned_at: "2026-06-03T10:00:00Z", amount: "42000", currency: "NGN", status: "pending", brand_logo_url: "/withdraw.svg" },
  ];

  // Map backend earnings response array seamlessly 
  const currentData = useMemo(() => {
    if (activeTab === "Earnings") {
      return earningsData?.items || [];
    }
    return withdrawals;
  }, [activeTab, earningsData, withdrawals]);

  // Handle pagination limits safely from metadata
  const totalPages = earningsData?.total_pages || 1;

  // Process live balance components to split major unit numbers and decimals cleanly
  const balanceUI = useMemo(() => {
    const rawString = balanceData?.available_balance || "₦0.00";
    
    const parts = rawString.split(".");
    const majorUnit = parts[0] || "₦0";
    const minorUnit = parts[1] ? `.${parts[1]}` : ".00";
    const numericValue = parseFloat(rawString.replace(/[^0-9.]/g, "")) || 0;

    return { majorUnit, minorUnit, numericValue };
  }, [balanceData]);

  // Helper calculation to turn raw values or ISO dates into readable templates
  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} minutes ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      return `${diffDays} days ago`;
    } catch {
      return "Recently";
    }
  };

  const formatCurrencyAmount = (amount: string, currency: string) => {
    if (amount.includes("₦") || amount.includes("$")) return amount;
    const num = parseFloat(amount) || 0;
    const symbol = currency === "NGN" ? "₦" : "$";
    return `${symbol}${num.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-white font-['Geist']">
      <div className="max-w-[1200px] ">
        
        {/* TOP HEADER */}
        <header className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[24px] font-semibold text-[#000000] tracking-tight">Wallet</h1>
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
        <div className="relative w-full h-[200px] rounded-[32px] overflow-hidden mb-8 bg-[#E9F6FF]">
          <div className="absolute right-0 bottom-0 h-full w-[50%] md:w-[60%] pointer-events-none flex items-end justify-end">
            <div className="relative h-[100%] w-full">
              <Image 
                src="/groupss.svg" 
                alt="Decorative background" 
                fill 
                className="object-contain object-right-bottom"
                priority
              />
            </div>
          </div>

          <div className="relative p-6 flex flex-col justify-between h-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <img src="/candyyy.svg" alt="Icon" className="w-5 h-5" />
                <span className="text-[12px] font-semibold text-[#747682] uppercase tracking-[0.1em]">
                  Wallet Balance
                </span>
                {/* {balanceData?.pending_balance && (
                  <span className="text-[11px] font-medium text-[#747682] normal-case bg-white/60 px-2.5 py-0.5 rounded-full ml-1">
                    Pending: {balanceData.pending_balance}
                  </span>
                )} */}
              </div>
              <div className="flex items-baseline gap-1">
                {isBalanceLoading ? (
                  <div className="h-10 w-48 bg-black/5 animate-pulse rounded-lg " />
                ) : (
                  <>
                    <span className="text-[40px] font-semibold text-[#000000]">{balanceUI.majorUnit}</span>
                    <span className="text-[40px] font-semibold text-[#8B8D98]">{balanceUI.minorUnit}</span>
                  </>
                )}
              </div>
            </div>

            <button 
              onClick={() => setIsWithdrawModalOpen(true)}
              disabled={isBalanceLoading}
              className="w-fit px-3 py-2 bg-[#0033FF] text-white rounded-full font-semibold text-[12px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 disabled:opacity-50"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex mx-2 gap-10 border-b border-[#F3F4F6]">
          {["Earnings", "Withdrawals"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
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

        {/* TRANSACTION LIST CONTAINER */}
        <div className="flex flex-col min-h-[250px] justify-center">
          {isEarningsLoading ? (
            /* LOADING SKELETON */
            <div className="space-y-4 py-4 w-full">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex justify-between items-center border-b border-gray-100 pb-4 animate-pulse">
                  <div className="flex items-center gap-4 w-2/3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/4" />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="h-4 bg-gray-100 rounded w-16 ml-auto" />
                    <div className="h-5 bg-gray-50 rounded-full w-20 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : currentData.length === 0 ? (
            /* AUTHENTICATED STATE EMPTY FALLBACK UI */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center"
            >
              <div className="w-20 h-20 bg-[#F4F7FF] rounded-full flex items-center justify-center mb-4">
                <Image src="/candyyy.svg" alt="No transactions" width={40} height={40}  />
              </div>
              <h3 className="text-[15px] font-semibold text-[#1E1F24] mb-1">No transaction records found</h3>
              <p className="text-[#747682] text-[12px] max-w-xs">
                Your activities from campaigns, brand challenges, and payouts will be displayed here
              </p>
            </motion.div>
          ) : (
            /* DATA POPULATED RENDER LIST */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {currentData.map((item: any) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between border-b border-[#EFF0F3] hover:bg-[#F9FAFB]/50 transition-colors py-2.5"
                  >
                    <div className="flex items-center gap-5">
                      <div className="relative w-[50px] h-[50px] flex items-center justify-center rounded-xl overflow-hidden bg-[#F9F9FB] shrink-0 border border-gray-50">
                        <Image 
                          src={item.brand_logo_url || (activeTab === "Earnings" ? "/Parent.svg" : "/withdraw.svg")} 
                          alt={item.challenge_title || "Transaction"} 
                          fill
                          className="object-contain p-1" 
                        />
                      </div>
                      
                      <div className="flex flex-col gap-0.5 max-w-[200px] md:max-w-md lg:max-w-lg">
                        <h3 className="text-[12px] md:text-[14px] font-semibold text-[#62636C] leading-tight truncate">
                          {item.challenge_title || "Campaign Event"}
                        </h3>
                        <p className="text-[#747682] text-[10px] md:text-[12px] font-medium">
                          {activeTab === "Earnings" && <span className="text-[#747682] font-medium">Payout • </span>}
                          {formatTimeAgo(item.earned_at)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-2 shrink-0 ml-4">
                      <span className={`text-[12px] md:text-[14px] font-semibold ${activeTab === 'Earnings' ? 'text-[#27AE60]' : 'text-[#1E1F24]'}`}>
                        {activeTab === 'Earnings' ? "+ " : "- "}
                        {formatCurrencyAmount(item.amount, item.currency)}
                      </span>
                      <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full capitalize tracking-wide ${
                        item.status.toLowerCase() === 'successful' 
                          ? 'bg-[#03FC6C1A] text-[#27AE60]' 
                          : item.status.toLowerCase() === 'pending'
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
          )}
        </div>

        {/* PAGINATION */}
        {currentData.length > 0 && (
          <div className="flex justify-between items-center mt-12 mb-10">
            <button 
              disabled={currentPage === 1 || isEarningsLoading}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 border border-[#E5E7EB] rounded-full text-[12px] md:text-[14px] font-normal text-[#62636C] hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              <HiArrowLeft size={18} /> Previous
            </button>
            
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 bg-[#F9F9FB] text-[#1E1F24] rounded-xl font-semibold text-[14px] border border-[#EFF0F3]">
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <>
                  <span className="text-[#9CA3AF] px-1 font-semibold">...</span>
                  <button 
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-10 h-10 text-[#6B7280] hover:bg-gray-50 rounded-xl font-semibold text-[14px]"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button 
              disabled={currentPage === totalPages || isEarningsLoading}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 border border-[#E5E7EB] rounded-full text-[12px] md:text-[14px] font-semibold text-[#62636C] hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              Next <HiArrowRight size={18} />
            </button>
          </div>
        )}

      </div>

      {/* WITHDRAW MODAL */}
      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)} 
        balance={balanceUI.numericValue} 
      />

      {/* WALLET SETTINGS MODAL */}
      <WalletSettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        isFirstTimeUser={isFirstTimeUser}
        onChangeWithdrawalAccount={() => {
           setIsSettingsModalOpen(false);
           setIsWithdrawModalOpen(true);
        }}
        onSuccess={() => {
          setIsFirstTimeUser(false);
        }}
      />
    </div>
  );
};

export default WalletPage;