/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSearch, FiCheckCircle } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi2";
import Image from "next/image";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

// Design Update: Data structure with unique icons
const BANKS = [
  { name: "Access Bank", id: "1", icon: "/access.svg" },
  { name: "FCMB", id: "2", icon: "/fcmb.svg" },
  { name: "Guaranty Trust Bank", id: "3", icon: "/gtb.svg" },
  { name: "Moniepoint", id: "4", icon: "/moniepoint.svg" },
  { name: "Zenith Bank", id: "5", icon: "/zenith.svg" },
];

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, balance }) => {
  const [step, setStep] = useState<"withdraw" | "change-bank">("withdraw");
  const [rawAmount, setRawAmount] = useState<string>(""); 
  const [displayAmount, setDisplayAmount] = useState<string>(""); 
  const [pin, setPin] = useState("");
  
  // Bank Selection States
  const [accountNumber, setAccountNumber] = useState("0691081727");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<{name: string, icon: string} | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [newAccountPin, setNewAccountPin] = useState("");

  const [errors, setErrors] = useState({ amount: "", pin: "" });

  const MINIMUM_WITHDRAWAL = 2000;
  const WITHDRAWAL_FEE = 50;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setRawAmount("");
      setDisplayAmount("");
      return;
    }
    const numberValue = parseInt(value);
    setRawAmount(value);
    const formatted = new Intl.NumberFormat("en-NG").format(numberValue);
    setDisplayAmount(formatted);
  };

  const filteredBanks = useMemo(() => {
    if (!searchQuery) return BANKS; // Design: show all initially when focused
    return BANKS.filter((bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectBank = (bank: {name: string, icon: string}) => {
    setSelectedBank(bank);
    setSearchQuery(bank.name);
    setShowResults(false);
  };

  useEffect(() => {
    const numAmount = parseInt(rawAmount);
    if (rawAmount && numAmount > balance) {
      setErrors((prev) => ({ ...prev, amount: "Insufficient funds" }));
    } else {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  }, [rawAmount, balance]);

  const handleClose = () => {
    setStep("withdraw");
    setRawAmount("");
    setDisplayAmount("");
    setPin("");
    setSearchQuery("");
    setSelectedBank(null);
    setNewAccountPin("");
    setErrors({ amount: "", pin: "" });
    onClose();
  };

  // Validation for Step 2 Save button
  const isNewAccountValid = accountNumber.length >= 10 && !!selectedBank && newAccountPin.length >= 4;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-[32px] w-full max-w-[500px] shadow-2xl overflow-hidden font-['Geist']"
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {step === "withdraw" ? (
              <>
                <header className="flex justify-between items-center p-8 pb-6 border-b border-gray-50">
                  <h2 className="text-[20px] font-bold text-[#111827]">Withdraw</h2>
                  <button onClick={handleClose} className="text-[#9CA3AF] hover:text-[#111827] transition-colors"><FiX size={24} /></button>
                </header>

                <div className="p-8 pt-6 flex flex-col gap-6">
                  {/* Account Selection */}
                  <div className="space-y-4">
                    <h4 className="text-[14px] font-semibold text-[#1E1F24]">Withdrawal Account</h4>
                    <div className="bg-[#F9F9FB] border border-[#EFF0F3] rounded-[24px] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center p-3 shrink-0">
                           <Image src="/zenith.svg" alt="Zenith" width={40} height={40} className="object-contain" priority />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="text-[14px] font-bold text-[#1E1F24] truncate">0691081727 <span className="text-[#9CA3AF] font-medium">• Zenith Bank</span></h5>
                          <p className="text-[12px] text-[#62636C] truncate">Desire Destiny Oludara</p>
                        </div>
                      </div>
                      <button onClick={() => setStep("change-bank")} className="px-4 py-2 border border-[#8B8D98] rounded-full text-[12px] font-bold text-[#1E1F24] hover:bg-white active:scale-95 transition-all shrink-0">Change</button>
                    </div>
                  </div>

                  {/* Balance Divider */}
                  <div className="flex justify-between items-center text-[14px] font-semibold text-[#62636C] py-1">
                    <span className="shrink-0">Wallet Balance</span>
                    <div className="flex-1 border-t-2 border-dashed border-[#E5E7EB] mx-4" />
                    <div className="flex items-baseline shrink-0">
                        <span className="text-[#111827] font-semibold">₦{balance.toLocaleString()}</span>
                        <span className="text-[#9CA3AF] font-bold">.00</span>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">Amount</label>
                    <div className={`flex items-center border rounded-[16px] px-5 py-4 transition-all ${errors.amount ? "border-red-500 bg-red-50/5" : "border-[#E5E7EB] focus-within:border-[#111827]"}`}>
                      <span className="text-[16px] font-semibold text-[#111827] mr-1">₦</span>
                      <input type="text" value={displayAmount} onChange={handleAmountChange} placeholder={`Min ${MINIMUM_WITHDRAWAL.toLocaleString()}`} className="w-full text-[16px] font-semibold focus:outline-none bg-transparent placeholder:font-normal placeholder:text-[#9CA3AF]" />
                      {displayAmount && <span className="text-[#9CA3AF] font-bold ml-1">.00</span>}
                      {errors.amount && <span className="text-[12px] font-bold text-red-500 whitespace-nowrap ml-2">{errors.amount}</span>}
                    </div>
                    <p className="text-[11px] font-medium text-[#747682]">Withdrawal Fee: ₦{WITHDRAWAL_FEE}</p>
                  </div>

                  {/* PIN Input */}
                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">PIN</label>
                    <div className="relative">
                      <input type="password" value={pin} maxLength={6} onChange={(e) => { setPin(e.target.value); setErrors(p => ({ ...p, pin: "" })); }} placeholder="Enter your PIN" className={`w-full px-5 py-4 border rounded-[16px] text-[16px] focus:outline-none transition-all ${errors.pin ? "border-red-500" : "border-[#E5E7EB] focus:border-[#111827]"}`} />
                      {errors.pin && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-red-500">{errors.pin}</span>}
                    </div>
                  </div>

                  {/* Design Update: Matches image_0.png style */}
                  <button disabled={!rawAmount || !pin || !!errors.amount} className="w-full py-4.5 bg-[#8C9FFF] text-white rounded-full font-bold text-[16px] shadow-lg shadow-blue-100 disabled:opacity-60 active:scale-[0.98] transition-all">Withdraw</button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2 View */}
                <header className="flex items-center gap-4 p-8 pb-6 border-b border-gray-50">
                  <button onClick={() => setStep("withdraw")} className="text-[#111827] p-1.5 rounded-full hover:bg-gray-50"><HiArrowLeft size={20} /></button>
                  <h2 className="text-[20px] font-bold text-[#111827]">Change Withdrawal Account</h2>
                  <button onClick={handleClose} className="ml-auto text-[#9CA3AF]"><FiX size={24} /></button>
                </header>

                <div className="p-8 pt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">Account Number</label>
                    <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ""))} placeholder="Enter your account number" className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] focus:outline-none focus:border-[#111827] placeholder:text-[#9CA3AF] text-[14px]" />
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">Choose your bank</label>
                    <div className="relative">
                      <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[#111827]" size={18} />
                      <input 
                        type="text" value={searchQuery} onFocus={() => setShowResults(true)}
                        onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); if(selectedBank && e.target.value !== selectedBank.name) setSelectedBank(null); }}
                        className="w-full pl-14 pr-6 py-4 border border-[#111827] rounded-full text-[14px] focus:outline-none placeholder:text-[#9CA3AF]" placeholder="Find your bank"
                      />
                    </div>
                    
                    {/* Design Update: unique icons list */}
                    {showResults && (
                      <div className="absolute z-20 left-0 right-0 mt-2 border border-[#E5E7EB] rounded-[24px] bg-white shadow-xl max-h-[250px] overflow-y-auto">
                        {filteredBanks.map((bank) => (
                          <div 
                            key={bank.id} onClick={() => handleSelectBank({name: bank.name, icon: bank.icon})}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-[#F9F9FB] cursor-pointer last:border-none"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                               {/* unique bank logo */}
                               <div className="w-10 h-10 rounded-full border border-gray-100 bg-white flex items-center justify-center p-1.5 shrink-0">
                                 <Image src={bank.icon} alt={bank.name} width={32} height={32} className="object-contain" />
                               </div>
                               <span className="text-[14px] font-bold text-[#111827] truncate">{bank.name}</span>
                            </div>
                            {/* Auto Confirmation */}
                            {selectedBank?.name === bank.name && bank.name === "Guaranty Trust Bank" && (
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[12px] text-[#9CA3AF] font-medium">Desire Destiny Oludara</span>
                                <FiCheckCircle className="text-[#22C55E]" size={20} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">PIN</label>
                    <input type="password" value={newAccountPin} maxLength={6} onChange={e => setNewAccountPin(e.target.value)} placeholder="Enter your PIN" className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] focus:outline-none focus:border-[#111827] placeholder:text-[#9CA3AF]" />
                  </div>

                  {/* Design Update: opacity control */}
                  <button 
                    onClick={() => setStep("withdraw")} 
                    disabled={!isNewAccountValid}
                    className="w-full py-4.5 bg-[#8C9FFF] text-white rounded-full font-bold text-[16px] shadow-lg shadow-blue-100 disabled:opacity-60 transition-all"
                  >
                    Save New Account
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WithdrawModal;