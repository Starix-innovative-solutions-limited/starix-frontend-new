/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSearch, FiCheckCircle } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi2";
import Image from "next/image";

interface WalletSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFirstTimeUser: boolean;
  onSuccess?: () => void;
}

const BANKS = [
  { name: "Access Bank", id: "1", icon: "/access.svg" },
  { name: "FCMB", id: "2", icon: "/fcmb.svg" },
  { name: "Guaranty Trust Bank", id: "3", icon: "/gtb.svg" },
  { name: "Moniepoint", id: "4", icon: "/moniepoint.svg" },
  { name: "Zenith Bank", id: "5", icon: "/zenith.svg" },
];

const WalletSettingsModal: React.FC<WalletSettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  isFirstTimeUser,
  onSuccess 
}) => {
  const [step, setStep] = useState<"settings" | "set-pin" | "change-pin" | "change-account">("settings");
  
  // Logic to handle initial step
  React.useEffect(() => {
    if (isOpen) setStep(isFirstTimeUser ? "set-pin" : "settings");
  }, [isOpen, isFirstTimeUser]);

  // Bank Selection Logic
  const [accountNumber, setAccountNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<{name: string, icon: string} | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  // Form States
  const [pins, setPins] = useState({ current: "", new: "", confirm: "" });
  const [errors, setErrors] = useState({ pin: "", account: "" });

  const filteredBanks = useMemo(() => {
    if (!searchQuery) return BANKS;
    return BANKS.filter((bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectBank = (bank: {name: string, icon: string}) => {
    setSelectedBank(bank);
    setSearchQuery(bank.name);
    setShowResults(false);
  };

  const handleBack = () => {
    if (step === "settings") onClose();
    else setStep("settings");
  };

  const handleClose = () => {
    setPins({ current: "", new: "", confirm: "" });
    setAccountNumber("");
    setSearchQuery("");
    setSelectedBank(null);
    onClose();
  };

  const isAccountValid = accountNumber.length >= 10 && !!selectedBank && pins.new.length >= 4;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div 
            className="bg-white rounded-[24px] w-full max-w-[460px] shadow-2xl overflow-hidden font-['Geist'] px-8 py-7"
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <header className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                {step !== "settings" && !isFirstTimeUser && (
                  <button onClick={handleBack} className="hover:bg-gray-100 p-1 rounded-full">
                    <HiArrowLeft size={20} className="text-[#111827]" />
                  </button>
                )}
                <h2 className="text-[18px] font-bold text-[#111827] tracking-tight">
                  {step === "settings" && "Wallet Settings"}
                  {(step === "set-pin" || step === "change-pin") && (isFirstTimeUser ? "Set Wallet PIN" : "Change Wallet PIN")}
                  {step === "change-account" && "Change Withdrawal Account"}
                </h2>
              </div>
              <button onClick={handleClose} className="text-[#9CA3AF] hover:text-black transition-colors">
                <FiX size={22} />
              </button>
            </header>

            <div className="space-y-5">
              {/* --- STEP: MAIN SETTINGS --- */}
              {step === "settings" && (
                <div className="divide-y divide-[#F3F4F6]">
                  <button 
                    onClick={() => setStep("change-pin")}
                    className="w-full text-left py-4 text-[14px] font-semibold text-[#62636C] hover:text-blue-600 transition-colors"
                  >
                    Change Wallet PIN
                  </button>
                  <button 
                    onClick={() => setStep("change-account")}
                    className="w-full text-left py-4 text-[14px] font-semibold text-[#62636C] hover:text-blue-600 transition-colors"
                  >
                    Change Withdrawal Account
                  </button>
                </div>
              )}

              {/* --- STEP: PIN FLOWS (Set/Change) --- */}
              {(step === "set-pin" || step === "change-pin") && (
                <div className="space-y-4">
                   {!isFirstTimeUser && (
                     <div className="space-y-1.5">
                       <label className="text-[13px] font-semibold text-[#1E1F24]">Current PIN</label>
                       <input 
                         type="password" placeholder="Enter your current PIN" maxLength={6}
                         className="w-full px-4 py-3.5 border border-[#E5E7EB] rounded-[14px] text-[14px] focus:ring-1 focus:ring-blue-500 outline-none"
                         onChange={(e) => setPins({...pins, current: e.target.value})}
                       />
                     </div>
                   )}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">{isFirstTimeUser ? "Set PIN" : "New PIN"}</label>
                    <input 
                      type="password" placeholder="6 digit PIN" maxLength={6}
                      className="w-full px-4 py-3.5 border border-[#E5E7EB] rounded-[14px] text-[14px] focus:ring-1 focus:ring-blue-500 outline-none"
                      onChange={(e) => setPins({...pins, new: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Confirm PIN</label>
                    <input 
                      type="password" placeholder="Confirm your PIN" maxLength={6}
                      className="w-full px-4 py-3.5 border border-[#E5E7EB] rounded-[14px] text-[14px] focus:ring-1 focus:ring-blue-500 outline-none"
                      onChange={(e) => setPins({...pins, confirm: e.target.value})}
                    />
                  </div>
                  <button className="w-full py-4 bg-[#8C9FFF] text-white rounded-full font-bold text-[15px] mt-2 shadow-lg shadow-blue-100 disabled:opacity-50">
                    Save PIN
                  </button>
                </div>
              )}

              {/* --- STEP: CHANGE ACCOUNT (Integrated logic from WithdrawModal) --- */}
              {step === "change-account" && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Account Number</label>
                    <input 
                      type="text" value={accountNumber} placeholder="Enter your bank account number"
                      className="w-full px-4 py-3.5 border border-[#E5E7EB] rounded-[14px] text-[14px] outline-none"
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Choose your bank</label>
                    <div className="relative">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
                      <input 
                        type="text" value={searchQuery} placeholder="Find your bank"
                        className={`w-full pl-11 pr-4 py-3.5 border rounded-[14px] text-[14px] outline-none transition-all ${showResults ? "border-blue-500" : "border-[#E5E7EB] bg-[#F9FAFB]"}`}
                        onFocus={() => setShowResults(true)}
                        onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                      />
                    </div>
                    
                    {showResults && (
                      <div className="absolute z-20 left-0 right-0 mt-1 border border-[#E5E7EB] rounded-[18px] bg-white shadow-xl max-h-[200px] overflow-y-auto">
                        {filteredBanks.map((bank) => (
                          <div 
                            key={bank.id} onClick={() => handleSelectBank(bank)}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-[#F9F9FB] cursor-pointer last:border-none"
                          >
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center p-1">
                                 <Image src={bank.icon} alt={bank.name} width={24} height={24} className="object-contain" />
                               </div>
                               <span className="text-[13px] font-bold text-[#111827]">{bank.name}</span>
                            </div>
                            {selectedBank?.name === bank.name && (
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#9CA3AF]">Desire Destiny Oludara</span>
                                <FiCheckCircle className="text-[#22C55E]" size={16} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-dashed border-[#E5E7EB] my-1" />

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">PIN</label>
                    <input 
                      type="password" placeholder="Enter your PIN" maxLength={6}
                      className="w-full px-4 py-3.5 border border-[#E5E7EB] rounded-[14px] text-[14px] outline-none focus:ring-1 focus:ring-blue-500"
                      onChange={(e) => setPins({...pins, new: e.target.value})}
                    />
                  </div>

                  <button 
                    disabled={!isAccountValid}
                    className="w-full py-4 bg-[#8C9FFF] text-white rounded-full font-bold text-[15px] mt-2 shadow-lg shadow-blue-100 disabled:opacity-50 transition-all"
                  >
                    Save New Account
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WalletSettingsModal;