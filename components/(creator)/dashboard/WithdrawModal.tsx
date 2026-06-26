/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetWithdrawalAccount, 
  useUpdateWithdrawalAccount, 
  useExecuteWithdrawal,
  useGetBanksList,
  useGetWithdrawalQuote // 👈 Added custom hook hook invocation mapping
} from "@/hooks/useWallet";
import { FiX, FiSearch } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi2";
import { AxiosError } from "axios";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export default function WithdrawModal({ isOpen, onClose, balance: initialBalance }: WithdrawModalProps) {
  const queryClient = useQueryClient();
  
  // 🧪 TESTING OVERRIDE: Hardcoding wallet layer context to 100,000 Naira
  const balance = 100000;

  const { data: activeAccount, isLoading: isLoadingAccount } = useGetWithdrawalAccount();
  const { data: NIGERIAN_BANKS = [], isLoading: isLoadingBanks } = useGetBanksList();
  
  const updateAccountMutation = useUpdateWithdrawalAccount();
  const executeWithdrawalMutation = useExecuteWithdrawal();
  const getQuoteMutation = useGetWithdrawalQuote(); // 👈 Mutation tracking instance

  // Managed Wizard Layout: "withdraw" | "preview" | "change-bank"
  const [step, setStep] = useState<"withdraw" | "preview" | "change-bank">("withdraw");
  const [rawAmount, setRawAmount] = useState<string>(""); 
  const [displayAmount, setDisplayAmount] = useState<string>(""); 
  const [pin, setPin] = useState("");
  
  const [accountNumber, setAccountNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<{name: string; code: string} | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [newAccountPin, setNewAccountPin] = useState("");

  const [errors, setErrors] = useState({ amount: "", pin: "", global: "" });

  const MINIMUM_WITHDRAWAL = 2000;

  const updateError = updateAccountMutation.error as AxiosError<{ message?: string; detail?: string }> | null;
  const withdrawError = executeWithdrawalMutation.error as AxiosError<{ message?: string; detail?: string }> | null;
  const quoteError = getQuoteMutation.error as AxiosError<{ message?: string; detail?: string }> | null;

  let activeGlobalErrorMessage = errors.global;
  if (updateError?.response) {
    activeGlobalErrorMessage = updateError.response.data?.detail || updateError.response.data?.message || "Failed to save bank account parameters.";
  } else if (withdrawError?.response) {
    activeGlobalErrorMessage = withdrawError.response.data?.detail || withdrawError.response.data?.message || "Withdrawal failed.";
  } else if (quoteError?.response) {
    activeGlobalErrorMessage = quoteError.response.data?.detail || quoteError.response.data?.message || "Could not fetch withdrawal preview confirmation parameters.";
  }

  useEffect(() => {
    if (errors.global) {
      setErrors((prev) => ({ ...prev, global: "" }));
    }
  }, [accountNumber, selectedBank, step]);

  useEffect(() => {
    if (updateAccountMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["withdrawalAccount"] });
      const timer = setTimeout(() => {
        setStep("withdraw");
        resetBankSelectionSubForm();
        updateAccountMutation.reset(); 
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [updateAccountMutation.isSuccess]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setRawAmount("");
      setDisplayAmount("");
      setErrors((prev) => ({ ...prev, amount: "" }));
      return;
    }
    const numberValue = parseInt(value);
    setRawAmount(value);
    setDisplayAmount(new Intl.NumberFormat("en-NG").format(numberValue));

    if (numberValue > balance) {
      setErrors((prev) => ({ ...prev, amount: "Insufficient funds" }));
    } else if (numberValue < MINIMUM_WITHDRAWAL) {
      setErrors((prev) => ({ ...prev, amount: `Minimum is ₦${MINIMUM_WITHDRAWAL.toLocaleString()}` }));
    } else {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  const filteredBanks = useMemo(() => {
    const rawBanksArray = Array.isArray(NIGERIAN_BANKS) 
      ? NIGERIAN_BANKS 
      : (NIGERIAN_BANKS as any)?.data || (NIGERIAN_BANKS as any)?.banks || [];

    if (!searchQuery) return rawBanksArray;
    
    const query = searchQuery.toLowerCase();
    return rawBanksArray.filter((bank: any) =>
      bank.name?.toLowerCase().includes(query) || bank.code?.includes(query)
    );
  }, [searchQuery, NIGERIAN_BANKS]);

  const handleSelectBank = (bank: {name: string; code: string}) => {
    setSelectedBank(bank);
    setSearchQuery(bank.name);
    setShowResults(false);
  };

  // Step 1: Request live validation preview data block
  const handleProceedToPreview = () => {
    if (!rawAmount || !!errors.amount || !activeAccount?.id || getQuoteMutation.isPending) return;
    
    getQuoteMutation.mutate({
      amount: parseInt(rawAmount),
      bank_detail_id: activeAccount.id,
      currency: "NGN"
    }, {
      onSuccess: (data) => {
        if (!data.sufficient) {
          setErrors((prev) => ({ ...prev, amount: "Insufficient balance for this transaction." }));
          return;
        }
        setStep("preview");
      }
    });
  };

  const handleSaveNewAccount = () => {
    if (!isNewAccountValid || updateAccountMutation.isPending) return;
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://example.com";

    updateAccountMutation.mutate({
      bank_name: selectedBank!.name,
      bank_code: selectedBank!.code,
      account_number: accountNumber,
      pin: newAccountPin, 
      revert_redirect_url: `${currentOrigin}/wallet`,
    });
  };

  // Step 2: Live ultimate movement validation block execution
  const handleWithdrawalSubmission = () => {
    if (!rawAmount || !pin || !activeAccount?.id || executeWithdrawalMutation.isPending) return;
    
    executeWithdrawalMutation.mutate({
      amount: parseInt(rawAmount),
      bank_detail_id: activeAccount.id, // 👈 Passing your active UUID bank reference
      pin: pin,
      currency: "NGN"
    }, {
      onSuccess: (data) => {
        // 🎉 If the transaction immediately accepted or replayed:
        if (data.status === "processing") {
          // You could easily fire a success toast notification here
          queryClient.invalidateQueries({ queryKey: ["walletBalance"] }); 
        }
        handleClose();
      },
      onError: (err: any) => {
        const statusCode = err.response?.status;
        const serverMessage = err.response?.data?.detail || err.response?.data?.message;

        
        if (statusCode === 401) {
          setErrors((prev) => ({ ...prev, global: "Incorrect wallet PIN. Please try again." }));
        } else if (statusCode === 429) {
          setErrors((prev) => ({ ...prev, global: "Security Lockout: Your wallet PIN is locked due to too many failed attempts." }));
        } else if (statusCode === 409) {
          setErrors((prev) => ({ ...prev, global: serverMessage || "Transaction failed: Insufficient balance or limit reached." }));
        } else {
          setErrors((prev) => ({ ...prev, global: serverMessage || "An error occurred during withdrawal processing." }));
        }
      }
    });
  };

  const resetBankSelectionSubForm = () => {
    setAccountNumber("");
    setSearchQuery("");
    setSelectedBank(null);
    setNewAccountPin("");
    setErrors({ amount: "", pin: "", global: "" });
  };

  const handleClose = () => {
    setStep("withdraw");
    setRawAmount("");
    setDisplayAmount("");
    setPin("");
    resetBankSelectionSubForm();
    updateAccountMutation.reset();
    executeWithdrawalMutation.reset();
    getQuoteMutation.reset();
    onClose();
  };

  const isNewAccountValid = accountNumber.length === 10 && !!selectedBank && newAccountPin.length === 4;
  
  // Validation checks to manage clean UX colors natively
  const isWithdrawSetupDisabled = !rawAmount || !!errors.amount || !activeAccount?.is_active || getQuoteMutation.isPending;
  const isConfirmWithdrawDisabled = pin.length < 4 || executeWithdrawalMutation.isPending;
  const isBankButtonDisabled = !isNewAccountValid || updateAccountMutation.isPending;

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
                  {getQuoteMutation.isError && activeGlobalErrorMessage && (
                    <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{activeGlobalErrorMessage}</p>
                  )}

                  <div className="space-y-4">
                    <h4 className="text-[14px] font-semibold text-[#1E1F24]">Withdrawal Account</h4>
                    <div className="bg-[#F9F9FB] border border-[#EFF0F3] rounded-[24px] p-5 flex items-center justify-between min-h-[88px]">
                      {isLoadingAccount ? (
                        <div className="flex items-center justify-center w-full py-2">
                          <div className="w-5 h-5 border-2 border-[#0047FF] border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : activeAccount && activeAccount.is_active ? (
                        <>
                          <div className="min-w-0 flex-1 mr-2">
                            <h5 className="text-[14px] font-bold text-[#1E1F24] truncate">
                              {activeAccount.account_number} 
                              <span className="text-[#9CA3AF] font-medium"> • {activeAccount.bank_name}</span>
                            </h5>
                            <p className="text-[12px] text-[#62636C] truncate mt-0.5">{activeAccount.account_name}</p>
                          </div>
                          <button onClick={() => setStep("change-bank")} className="px-4 py-2 border border-[#8B8D98] rounded-full text-[12px] font-bold text-[#1E1F24] hover:bg-white active:scale-95 transition-all shrink-0">Change</button>
                        </>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <p className="text-sm font-medium text-[#62636C]">No withdrawal account linked yet.</p>
                          <button onClick={() => setStep("change-bank")} className="px-4 py-2 bg-[#111827] text-white rounded-full text-[12px] font-bold hover:bg-black active:scale-95 transition-all shrink-0">Link Bank</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[14px] font-semibold text-[#62636C] py-1">
                    <span className="shrink-0">Wallet Balance</span>
                    <div className="flex-1 border-t-2 border-dashed border-[#E5E7EB] mx-4" />
                    <div className="flex items-baseline shrink-0">
                        <span className="text-[#111827] font-semibold">₦{balance.toLocaleString()}</span>
                        <span className="text-[#9CA3AF] font-bold">.00</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">Amount</label>
                    <div className={`flex items-center border rounded-[16px] px-5 py-4 transition-all ${errors.amount ? "border-red-500 bg-red-50/5" : "border-[#E5E7EB] focus-within:border-[#111827]"}`}>
                      <span className="text-[16px] font-semibold text-[#111827] mr-1">₦</span>
                      <input type="text" value={displayAmount} onChange={handleAmountChange} placeholder={`Min ${MINIMUM_WITHDRAWAL.toLocaleString()}`} className="w-full text-[16px] font-semibold focus:outline-none bg-transparent placeholder:font-normal placeholder:text-[#9CA3AF]" />
                      {displayAmount && <span className="text-[#9CA3AF] font-bold ml-1">.00</span>}
                      {errors.amount && <span className="text-[12px] font-bold text-red-500 whitespace-nowrap ml-2">{errors.amount}</span>}
                    </div>
                  </div>

                  <button 
                    onClick={handleProceedToPreview} 
                    disabled={isWithdrawSetupDisabled} 
                    className={`w-full py-4.5 text-white rounded-full font-bold text-[16px] transition-all flex items-center justify-center h-[54px]
                      ${isWithdrawSetupDisabled 
                        ? "bg-[#8C9FFF] opacity-60 cursor-not-allowed shadow-none" 
                        : "bg-[#0047FF] shadow-lg shadow-blue-100/50 active:scale-[0.98]"
                      }
                    `}
                  >
                    {getQuoteMutation.isPending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Review Withdrawal"}
                  </button>
                </div>
              </>
            ) : step === "preview" ? (
              /* PREVIEW BREAKDOWN DESIGN LAYER DEFINITION */
              <>
                <header className="flex items-center gap-4 p-8 pb-6 border-b border-gray-50">
                  <button onClick={() => setStep("withdraw")} className="text-[#111827] p-1.5 rounded-full hover:bg-gray-50"><HiArrowLeft size={20} /></button>
                  <h2 className="text-[20px] font-bold text-[#111827]">Confirm Payout</h2>
                  <button onClick={handleClose} className="ml-auto text-[#9CA3AF] hover:text-[#111827] transition-colors"><FiX size={24} /></button>
                </header>

                <div className="p-8 pt-6 flex flex-col gap-6">
                  {executeWithdrawalMutation.isError && activeGlobalErrorMessage && (
                    <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{activeGlobalErrorMessage}</p>
                  )}

                  {/* Authorization Breakdown Context Records Mapping */}
                  <div className="bg-[#F9F9FB] border border-[#EFF0F3] rounded-[24px] p-6 space-y-4">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#62636C] font-medium">Withdrawal Amount</span>
                      <span className="text-[#111827] font-bold">{getQuoteMutation.data?.amount}</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#62636C] font-medium">Provider Fee (Flutterwave)</span>
                      <span className="text-red-500 font-semibold">+ {getQuoteMutation.data?.fee}</span>
                    </div>
                    <hr className="border-[#EFF0F3] border-dashed" />
                    <div className="flex justify-between items-center text-[15px]">
                      <span className="text-[#111827] font-bold">Net Payout Deducted</span>
                      <span className="text-[#0047FF] font-bold text-[16px]">{getQuoteMutation.data?.net_amount}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">Secure 4-Digit Wallet PIN</label>
                    <input 
                      type="password" 
                      value={pin} 
                      maxLength={4} 
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} 
                      placeholder="••••" 
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-center tracking-widest text-[20px] focus:outline-none focus:border-[#0047FF]" 
                    />
                  </div>

                  <button 
                    onClick={handleWithdrawalSubmission} 
                    disabled={isConfirmWithdrawDisabled} 
                    className={`w-full py-4.5 text-white rounded-full font-bold text-[16px] transition-all flex items-center justify-center h-[54px]
                      ${isConfirmWithdrawDisabled 
                        ? "bg-[#8C9FFF] opacity-60 cursor-not-allowed shadow-none" 
                        : "bg-[#0047FF] shadow-xs shadow-blue-100/50 active:scale-[0.98]"
                      }
                    `}
                  >
                    {executeWithdrawalMutation.isPending ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Confirm & Execute"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <header className="flex items-center gap-4 p-8 pb-6 border-b border-gray-50">
                  <button onClick={() => { setStep("withdraw"); resetBankSelectionSubForm(); }} className="text-[#111827] p-1.5 rounded-full hover:bg-gray-50"><HiArrowLeft size={20} /></button>
                  <h2 className="text-[20px] font-bold text-[#111827]">Change Withdrawal Account</h2>
                  <button onClick={handleClose} className="ml-auto text-[#9CA3AF]"><FiX size={24} /></button>
                </header>

                <div className="p-8 pt-6 space-y-6">
                  {updateAccountMutation.isError && activeGlobalErrorMessage && (
                    <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{activeGlobalErrorMessage}</p>
                  )}

                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">Account Number</label>
                    <div className="relative flex items-center">
                      <input type="text" maxLength={10} value={accountNumber} onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ""))} placeholder="Enter your 10-digit account number" className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] focus:outline-none focus:border-[#111827] placeholder:text-[#9CA3AF] text-[14px]" />
                    </div>
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">Choose your bank</label>
                    <div className="relative">
                      <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[#111827]" size={18} />
                      <input 
                        type="text" value={searchQuery} onFocus={() => setShowResults(true)}
                        disabled={isLoadingBanks}
                        onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); if(selectedBank && e.target.value !== selectedBank.name) setSelectedBank(null); }}
                        className="w-full pl-14 pr-6 py-4 border border-[#E5E7EB] focus:border-[#111827] rounded-full text-[14px] focus:outline-none placeholder:text-[#9CA3AF] disabled:bg-gray-50" 
                        placeholder={isLoadingBanks ? "Loading available banks..." : "Find your bank"}
                      />
                    </div>
                    
                    {showResults && (
                      <div className="absolute z-20 left-0 right-0 mt-2 border border-[#E5E7EB] rounded-[24px] bg-white shadow-xl max-h-[250px] overflow-y-auto scrollbar-none">
                        {filteredBanks.map((bank: any, index: number) => (
                          <div 
                            key={`${bank.code}-${index}`} 
                            onClick={() => handleSelectBank({name: bank.name, code: bank.code})}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-[#F9F9FB] cursor-pointer last:border-none"
                          >
                            <div className="flex flex-col min-w-0 py-0.5">
                              <span className="text-[14px] font-bold text-[#111827] truncate">{bank.name}</span>
                              <span className="text-[11px] text-[#9CA3AF] font-medium mt-0.5">Code: {bank.code}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold text-[#1E1F24]">PIN</label>
                    <input 
                      type="password" 
                      value={newAccountPin} 
                      maxLength={4} 
                      onChange={e => setNewAccountPin(e.target.value.replace(/\D/g, ""))} 
                      placeholder="Enter 4-digit PIN to confirm"
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] focus:outline-none focus:border-[#111827] placeholder:text-[#9CA3AF] text-[14px]" 
                    />
                  </div>

                  <button 
                    onClick={handleSaveNewAccount} 
                    disabled={isBankButtonDisabled}
                    className={`w-full py-4.5 text-white rounded-full font-bold text-[16px] transition-all flex items-center justify-center h-[54px]
                      ${isBankButtonDisabled 
                        ? "bg-[#8C9FFF] opacity-60 cursor-not-allowed shadow-none" 
                        : "bg-[#0047FF] shadow-lg shadow-blue-100/50 active:scale-[0.98]"
                      }
                    `}
                  >
                    {updateAccountMutation.isPending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Save New Account"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}