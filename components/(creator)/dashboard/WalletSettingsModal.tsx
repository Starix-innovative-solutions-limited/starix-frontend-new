/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  useSetWalletPin, 
  useChangeWalletPin,
  useGetWithdrawalAccount,
  useSetSecurityQuestion, // 👈 1. Imported our real-time tracking query
  useGetSecurityQuestionCatalog,
  useGetSecurityQuestion,
  useResetPinStart,      // 👈 add
  useResetPinConfirm,
  
} from "@/hooks/useWallet";
import { FiX, FiSearch, FiCheckCircle, FiHelpCircle, FiLock } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi2";
import { AxiosError } from "axios";
import Image from "next/image";

interface WalletSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFirstTimeUser: boolean;
  onSuccess?: () => void;
  onChangeWithdrawalAccount?: () => void;
}

const BANKS = [
  { name: "Access Bank", id: "1", icon: "/access.svg" },
  { name: "FCMB", id: "2", icon: "/fcmb.svg" },
  { name: "Guaranty Trust Bank", id: "3", icon: "/gtb.svg" },
  { name: "Moniepoint", id: "4", icon: "/moniepoint.svg" },
  { name: "Zenith Bank", id: "5", icon: "/zenith.svg" },
];

 

type ModalStep = "settings" | "set-pin" | "set-security-questions" | "change-pin" | "change-account" | "reset-pin-recovery";

export default function WalletSettingsModal({ 
  isOpen, 
  onClose, 
  isFirstTimeUser,
  onSuccess,
  onChangeWithdrawalAccount
}: WalletSettingsModalProps) {
  
  const { data: activeAccount } = useGetWithdrawalAccount();

  const setSecurityQuestionMutation = useSetSecurityQuestion();

  const {
    data: serverQuestion,
    isLoading: isLoadingQuestion,
    data: existingQuestion,
  } = useGetSecurityQuestion();

  

  const handleSaveSecurityQuestion = async () => {
  try {
    await setSecurityQuestionMutation.mutateAsync({
  question_key: chosenQuestionKey,
  answer: securityAnswer.trim(),
});

    // now actually save the PIN
    handleSavePinSubmission();
  } catch (error: any) {
    console.log(error?.response?.data);

    if (error?.response?.status === 409) {
      // question already exists
      handleSavePinSubmission();
      return;
    }
  }
};
  
  const [step, setStep] = useState<ModalStep>("settings");
  const [historyStack, setHistoryStack] = useState<ModalStep[]>([]);
  
  // 👈 2. Only activate the API call when the recovery step layout is active
  const isRecoveryActive = step === "reset-pin-recovery";
  const { data: questionCatalog, isLoading: isLoadingCatalog } = useGetSecurityQuestionCatalog();

  const [chosenQuestionKey, setChosenQuestionKey] = useState<string>("");
  useEffect(() => {
  if (questionCatalog && questionCatalog.length > 0 && !chosenQuestionKey) {
    setChosenQuestionKey(questionCatalog[0].key);
  }
}, [questionCatalog]);
  
  const setPinMutation = useSetWalletPin();
  const changePinMutation = useChangeWalletPin();

  const isCurrentActionChange = step === "change-pin";
  const activeMutation = isCurrentActionChange ? changePinMutation : setPinMutation;

  const resetPinStartMutation = useResetPinStart();
  const resetPinConfirmMutation = useResetPinConfirm();

  const navigateToStep = (nextStep: ModalStep) => {
    setHistoryStack((prev) => [...prev, step]);
    setStep(nextStep);
  };

  const handleBack = () => {
    if (historyStack.length > 0) {
      const prevStep = historyStack[historyStack.length - 1];
      setHistoryStack((prev) => prev.slice(0, -1));
      setStep(prevStep);
    } else {
      setStep("settings");
    }
  };

  useEffect(() => {
    if (isOpen) {
      const localPinVerificationFlag = typeof window !== "undefined" ? localStorage.getItem("starix_pin_configured") : null;
      setHistoryStack([]);
      
      if (isFirstTimeUser && !activeAccount?.account_number && !localPinVerificationFlag) {
        setStep("set-pin");
      } else {
        setStep("settings");
      }
    }
  }, [isOpen, isFirstTimeUser, activeAccount]);

  const [accountNumber, setAccountNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<{name: string, icon: string} | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const [pins, setPins] = useState({ current: "", new: "", confirm: "" });
  const [errors, setErrors] = useState({ pin: "", account: "", global: "" });

 
  const [securityAnswer, setSecurityAnswer] = useState("");

  const [recoveryAnswer, setRecoveryAnswer] = useState("");
  const [recoveryPins, setRecoveryPins] = useState({ new: "", confirm: "" });

  const apiError = activeMutation.error as AxiosError<{ message?: string; detail?: string }> | null;
  
  let activeGlobalErrorMessage = errors.global;
  if (apiError?.response) {
    const status = apiError.response.status;
    if (status === 400) activeGlobalErrorMessage = "PIN is too common or matches your current credentials.";
    else if (status === 401) activeGlobalErrorMessage = "Incorrect current PIN credentials entered.";
    else if (status === 404) activeGlobalErrorMessage = "Resource parameters missing from server records.";
    else if (status === 429) activeGlobalErrorMessage = "Wallet operations locked due to too many failed validation records.";
    else activeGlobalErrorMessage = apiError.response.data?.detail || apiError.response.data?.message || "Failed to finalize structural modification.";
  }

  useEffect(() => {
    if (errors.global || activeMutation.isError) {
      setErrors((prev) => ({ ...prev, global: "" }));
      activeMutation.reset();
    }
  }, [pins.current, pins.new, pins.confirm, recoveryPins.new, recoveryPins.confirm]);

  useEffect(() => {
    if (activeMutation.isSuccess) {
      if (!isCurrentActionChange) {
        if (typeof window !== "undefined") {
          localStorage.setItem("starix_pin_configured", "true");
        }
      }
      if (onSuccess) onSuccess();
      const timer = setTimeout(() => handleClose(), 1400);
      return () => clearTimeout(timer);
    }
  }, [activeMutation.isSuccess]);

  const filteredBanks = useMemo(() => {
    if (!searchQuery) return BANKS;
    return BANKS.filter((bank) => bank.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleSelectBank = (bank: {name: string, icon: string}) => {
    setSelectedBank(bank);
    setSearchQuery(bank.name);
    setShowResults(false);
  };

  const handleClose = () => {
    setPins({ current: "", new: "", confirm: "" });
    setRecoveryPins({ new: "", confirm: "" });
    setAccountNumber("");
    setSearchQuery("");
    setSelectedBank(null);
    setSecurityAnswer("");
    setRecoveryAnswer("");
    setErrors({ pin: "", account: "", global: "" });
    setPinMutation.reset();
    changePinMutation.reset();
    onClose();
  };

  const handleInitialPinNextStep = () => {
  if (pins.new !== pins.confirm) {
    setErrors((prev) => ({
      ...prev,
      global: "PIN entries do not match.",
    }));
    return;
  }

  if (pins.new.length !== 4) {
    setErrors((prev) => ({
      ...prev,
      global: "PIN must be 4 digits.",
    }));
    return;
  }

  if (existingQuestion) {
    handleSavePinSubmission();
    return;
  }

  navigateToStep("set-security-questions");
};

  const handleSavePinSubmission = () => {
    if (isCurrentActionChange) {
      changePinMutation.mutate({
        current_pin: pins.current,
        new_pin: pins.new,
        new_pin_confirmation: pins.confirm,
      });
    } else {
      setPinMutation.mutate({
        pin: pins.new,
        pin_confirmation: pins.confirm,
        // include question/answer payload keys if your initialization pipeline processes them simultaneously
      });
    }
  };

  const handleExecuteRecoveryReset = async () => {
  if (recoveryPins.new !== recoveryPins.confirm) {
    setErrors((prev) => ({ ...prev, global: "Recovery PIN confirmations do not match." }));
    return;
  }
  if (!recoveryAnswer.trim() || recoveryPins.new.length !== 4) {
    setErrors((prev) => ({ ...prev, global: "Please complete all fields with correct parameter formatting." }));
    return;
  }

  try {
    // Step 1: verify answer, get token
    const { reset_token } = await resetPinStartMutation.mutateAsync({
      answer: recoveryAnswer.trim().toLowerCase(),
    });

    // Step 2: confirm with token + new PIN
    await resetPinConfirmMutation.mutateAsync({
      reset_token,
      new_pin: recoveryPins.new,
      new_pin_confirmation: recoveryPins.confirm,
    });

    // success — close modal
    if (onSuccess) onSuccess();
    setTimeout(() => handleClose(), 1400);

  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 401) {
      setErrors((prev) => ({ ...prev, global: "Incorrect answer to your security question." }));
    } else if (status === 429) {
      setErrors((prev) => ({ ...prev, global: "Too many failed attempts. Please try again later." }));
    } else if (status === 404) {
      setErrors((prev) => ({ ...prev, global: "No PIN or security question found for this account." }));
    } else if (status === 400) {
      setErrors((prev) => ({ ...prev, global: "PIN is too easy to guess. Please choose a stronger PIN." }));
    } else {
      setErrors((prev) => ({ ...prev, global: "Reset failed. Please try again." }));
    }
  }
};

  const isAccountValid = accountNumber.length >= 10 && !!selectedBank && pins.new.length === 4;
  const isPinFormValid = pins.new.length === 4 && pins.confirm.length === 4 && (!isCurrentActionChange || pins.current.length === 4);
  const isQuestionsFormValid = securityAnswer.trim().length >= 2;
  const isRecoveryFormValid = recoveryAnswer.trim().length > 0 && recoveryPins.new.length === 4 && recoveryPins.confirm.length === 4 && !isLoadingQuestion;

  const [hasPinConfigured, setHasPinConfigured] = useState(false);

useEffect(() => {
  setHasPinConfigured(
    localStorage.getItem("starix_pin_configured") === "true"
  );
}, []);

const isSetupFlowActive =
  step === "set-pin" && !hasPinConfigured;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div 
            className="bg-white rounded-[32px] w-full max-w-[460px] shadow-2xl overflow-hidden font-['Geist'] px-8 py-8"
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {step !== "settings" && !isSetupFlowActive && (
                  <button onClick={handleBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <HiArrowLeft size={20} className="text-[#111827]" />
                  </button>
                )}
                <h2 className="text-[18px] font-bold text-[#111827] tracking-tight">
                  {step === "settings" && "Wallet Settings"}
                  {step === "set-pin" && "Set Wallet PIN"}
                  {step === "change-pin" && "Change Wallet PIN"}
                  {step === "change-account" && "Change Withdrawal Account"}
                  {step === "reset-pin-recovery" && "Reset Wallet PIN"}
                </h2>
              </div>
              <button onClick={handleClose} className="text-[#9CA3AF] hover:text-black transition-colors p-1">
                <FiX size={22} />
              </button>
            </header>

            <div className="space-y-5">
              {activeGlobalErrorMessage && (
                <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{activeGlobalErrorMessage}</p>
              )}

              {activeMutation.isSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-xs font-bold">
                  <FiCheckCircle size={16} />
                  <span>Wallet Security context configured successfully!</span>
                </div>
              )}

              {/* --- STEP 1: MAIN SETTINGS LAYOUT --- */}
              {step === "settings" && (
                <div className="divide-y divide-[#F3F4F6]">
                  <button 
                    onClick={() => navigateToStep("change-pin")}
                    className="w-full text-left py-4 text-[14px] font-semibold text-[#62636C] hover:text-[#0047FF] transition-colors flex justify-between items-center"
                  >
                    <span>Change Wallet PIN</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (onChangeWithdrawalAccount) onChangeWithdrawalAccount();
                      else navigateToStep("change-account");
                    }}
                    className="w-full text-left py-4 text-[14px] font-semibold text-[#62636C] hover:text-[#0047FF] transition-colors flex justify-between items-center"
                  >
                    <span>Change Withdrawal Account</span>
                  </button>
                </div>
              )}

              {/* --- STEP 2: INITIAL PIN SETUP OR MODIFICATION PANEL --- */}
              {(step === "set-pin" || step === "change-pin") && (
                <div className="space-y-4">
                   {isCurrentActionChange && (
                     <div className="space-y-1.5">
                       <div className="flex justify-between items-center">
                         <label className="text-[13px] font-semibold text-[#1E1F24]">Current PIN</label>
                         <button 
                           onClick={() => navigateToStep("reset-pin-recovery")}
                           className="text-[12px] font-bold text-[#0047FF] hover:underline"
                         >
                           Forgot PIN?
                         </button>
                       </div>
                       <input 
                         type="password" placeholder="Enter current 4-digit PIN" maxLength={4}
                         value={pins.current}
                         className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-[14px] focus:border-[#0047FF] outline-none transition-all"
                         onChange={(e) => setPins({...pins, current: e.target.value.replace(/\D/g, "")})}
                       />
                     </div>
                   )}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">{!isSetupFlowActive ? "New PIN" : "Choose 4-Digit PIN"}</label>
                    <input 
                      type="password" placeholder="••••" maxLength={4}
                      value={pins.new}
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-center tracking-widest text-[18px] font-bold focus:border-[#0047FF] outline-none transition-all"
                      onChange={(e) => setPins({...pins, new: e.target.value.replace(/\D/g, "")})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Confirm PIN</label>
                    <input 
                      type="password" placeholder="••••" maxLength={4}
                      value={pins.confirm}
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-center tracking-widest text-[18px] font-bold focus:border-[#0047FF] outline-none transition-all"
                      onChange={(e) => setPins({...pins, confirm: e.target.value.replace(/\D/g, "")})}
                    />
                  </div>
                  <button 
                    onClick={handleInitialPinNextStep}
                    disabled={!isPinFormValid}
                    className={`w-full py-4 text-white rounded-full font-bold text-[15px] mt-2 transition-all flex items-center justify-center h-[52px]
                      ${!isPinFormValid 
                        ? "bg-[#8C9FFF] opacity-60 cursor-not-allowed" 
                        : "bg-[#0047FF] shadow-lg shadow-blue-100/50 active:scale-[0.98]"
                      }
                    `}
                  >
                    {activeMutation.isPending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : step === "set-pin" ? "Continue" : "Save PIN"}
                  </button>
                </div>
              )}

              {/* --- STEP 3: NEW SECURITY QUESTIONS INTERFACE --- */}
              
              {step === "set-security-questions" && (
                <div className="space-y-4">
                  <div className="bg-blue-50/60 border border-blue-100 rounded-[20px] p-4 flex gap-3 items-start">
                    <FiHelpCircle className="text-[#0047FF] shrink-0 mt-0.5" size={18} />
                    <p className="text-[12px] text-[#4B5563] leading-relaxed">
                      Choose a security question down below. This answer will serve to instantly recover your funds if you ever forget your wallet PIN context.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Select Question</label>
                    {isLoadingCatalog ? (
                      <div className="w-full py-4 text-center text-sm">Loading questions...</div>
                    ) : (
                      <select 
                        value={chosenQuestionKey}
                        onChange={(e) => setChosenQuestionKey(e.target.value)}
                        className="w-full px-4 py-3.5 border border-[#E5E7EB] bg-white rounded-[16px] text-[14px] font-medium text-[#111827] focus:border-[#0047FF] outline-none appearance-none cursor-pointer"
                      >
                        {/* ✅ FIXED: Use the array from your API catalog */}
                        {(Array.isArray(questionCatalog) ? questionCatalog : []).map((q) => (
                        <option key={q.key} value={q.key}>{q.label}</option>
                      ))}
                      </select>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Your Secret Answer</label>
                    <input 
                      type="text" 
                      placeholder="Type your secure answer here..."
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-[14px] focus:border-[#0047FF] outline-none transition-all"
                    />
                  </div>

                  <button 
                    // ✅ FIXED: Use the new handleSaveSecurityQuestion function
                    onClick={handleSaveSecurityQuestion}
                    disabled={!isQuestionsFormValid || setSecurityQuestionMutation.isPending}
                    className={`w-full py-4 text-white rounded-full font-bold text-[15px] mt-2 transition-all flex items-center justify-center h-[52px]
                      ${!isQuestionsFormValid || setSecurityQuestionMutation.isPending
                        ? "bg-[#8C9FFF] opacity-60 cursor-not-allowed" 
                        : "bg-[#0047FF] shadow-lg shadow-blue-100/50 active:scale-[0.98]"
                      }
                    `}
                  >
                    {setSecurityQuestionMutation.isPending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Complete Setup"}
                  </button>
                </div>
              )}

              {/* --- STEP 4: FORGOT PIN REAL-TIME RECOVERY ACTIONS --- */}
              {step === "reset-pin-recovery" && (
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-100 rounded-[20px] p-4 flex gap-3 items-start">
                    <FiLock className="text-amber-600 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-0.5">
                      <h5 className="text-[12px] font-bold text-amber-900">Wallet Identification Required</h5>
                      <p className="text-[11px] text-amber-800 leading-normal">
                        Answer your configured security fallback prompt to authorize a new PIN issuance.
                      </p>
                    </div>
                  </div>

                  {/* ⚡ REAL-TIME VIEW SWITCHBOARD */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-[#9CA3AF] tracking-wider">Your Active Question Profile</span>
                    {isLoadingQuestion ? (
                      <div className="w-full bg-[#F9F9FB] border border-[#EFF0F3] p-5 rounded-[16px] flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-[#0047FF] border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-[#62636C] font-semibold ml-2.5">Fetching security profile...</span>
                      </div>
                    ) : (
                      <p className="text-[14px] font-bold text-[#111827] bg-[#F9F9FB] border border-[#EFF0F3] p-4 rounded-[16px] leading-relaxed">
                        {serverQuestion?.question_label || "No security question configured for this account profile."}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Your Answer</label>
                    <input 
                      type="text" 
                      placeholder="Type answer here..."
                      disabled={isLoadingQuestion || !serverQuestion?.question_label}
                      value={recoveryAnswer}
                      onChange={(e) => setRecoveryAnswer(e.target.value)}
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-[14px] focus:border-[#0047FF] outline-none transition-all disabled:bg-gray-50 text-[#111827]"
                    />
                  </div>

                  <div className="border-t border-dashed border-[#EFF0F3] my-2" />

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Declare New 4-Digit PIN</label>
                    <input 
                      type="password" placeholder="••••" maxLength={4}
                      disabled={isLoadingQuestion || !serverQuestion?.question_label}
                      value={recoveryPins.new}
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-center tracking-widest text-[16px] focus:border-[#0047FF] outline-none disabled:bg-gray-50"
                      onChange={(e) => setRecoveryPins({...recoveryPins, new: e.target.value.replace(/\D/g, "")})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Confirm Recovery PIN</label>
                    <input 
                      type="password" placeholder="••••" maxLength={4}
                      disabled={isLoadingQuestion || !serverQuestion?.question_label}
                      value={recoveryPins.confirm}
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-center tracking-widest text-[16px] focus:border-[#0047FF] outline-none disabled:bg-gray-50"
                      onChange={(e) => setRecoveryPins({...recoveryPins, confirm: e.target.value.replace(/\D/g, "")})}
                    />
                  </div>
                  {resetPinConfirmMutation.isSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-xs font-bold">
                    <FiCheckCircle size={16} />
                    <span>PIN reset successfully!</span>
                  </div>
                )}

                  <button 
                  onClick={handleExecuteRecoveryReset}
                  disabled={!isRecoveryFormValid || resetPinStartMutation.isPending || resetPinConfirmMutation.isPending}
                  className={`w-full py-4 text-white rounded-full font-bold text-[15px] mt-2 transition-all flex items-center justify-center h-[52px]
                    ${!isRecoveryFormValid || resetPinStartMutation.isPending || resetPinConfirmMutation.isPending
                      ? "bg-[#8C9FFF] opacity-60 cursor-not-allowed" 
                      : "bg-[#0047FF] shadow-lg shadow-blue-100/50 active:scale-[0.98]"
                    }
                  `}
                >
                  {(resetPinStartMutation.isPending || resetPinConfirmMutation.isPending)
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : "Reset Pin"
                  }
                </button>
                </div>
              )}

              {/* --- STEP 5: CHANGE WITHDRAWAL ACCOUNT --- */}
              {step === "change-account" && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Account Number</label>
                    <input 
                      type="text" value={accountNumber} placeholder="Enter your bank account number" maxLength={10}
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-[14px] outline-none focus:border-[#0047FF]"
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">Choose your bank</label>
                    <div className="relative">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
                      <input 
                        type="text" value={searchQuery} placeholder="Find your bank"
                        className={`w-full pl-11 pr-4 py-3.5 border rounded-[16px] text-[14px] outline-none transition-all ${showResults ? "border-[#0047FF]" : "border-[#E5E7EB] bg-[#F9FAFB]"}`}
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
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-dashed border-[#E5E7EB] my-1" />

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#1E1F24]">PIN</label>
                    <input 
                      type="password" placeholder="Enter 4-digit PIN" maxLength={4}
                      className="w-full px-5 py-4 border border-[#E5E7EB] rounded-[16px] text-[14px] outline-none focus:border-[#0047FF]"
                      onChange={(e) => setPins({...pins, new: e.target.value.replace(/\D/g, "")})}
                    />
                  </div>

                  <button 
                    disabled={!isAccountValid}
                    className={`w-full py-4 text-white rounded-full font-bold text-[15px] mt-2 transition-all flex items-center justify-center h-[52px]
                      ${!isAccountValid
                        ? "bg-[#8C9FFF] opacity-60 cursor-not-allowed" 
                        : "bg-[#0047FF] shadow-lg shadow-blue-100/50 active:scale-[0.98]"
                      }
                    `}
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
}