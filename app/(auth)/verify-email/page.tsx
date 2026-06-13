/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, Suspense, useEffect } from "react";
import OtpInput from "@/components/auth/OtpInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useVerifyEmailOtp, useGenerateOtp } from "@/hooks/useAuth"; // Added useGenerateOtp
import { sessionAuth } from "@/utils/sessionAuth";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const VerifyEmailContent = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const role = searchParams.get("role");
  const queryEmail = searchParams.get("email");
  const pendingSignup = sessionAuth?.get() as any;

  const displayEmail = queryEmail || pendingSignup?.email || pendingSignup?.brand_email || pendingSignup?.creator_email;

  const { mutateAsync: verifyEmail } = useVerifyEmailOtp();
  const { mutate: generateOtp } = useGenerateOtp();

  // TIMER LOGIC
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    if (!canResend) return;
    generateOtp({ email: displayEmail, purpose: "email_verification" } as any);
    setTimeLeft(60);
    setCanResend(false);
    toast.success("Code resent successfully!");
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (otp.length < 6) return toast.error("Please enter the 6-digit code");

    const currentRole = role || pendingSignup?.role || "creator";
    const emailKey = currentRole === "brand" ? "brand_email" : "creator_email";

    const payload = {
      [emailKey]: displayEmail,
      code: otp, 
      role: currentRole,
    };

    setIsLoading(true);
    await toast.promise(
      verifyEmail(payload as any),
      {
        loading: "Verifying account...",
        success: () => {
          localStorage.removeItem("token"); 
          sessionAuth.clear(); 
          const redirectPath = currentRole === "brand" ? "/login?role=brand" : "/login?role=creator";
          router.push(redirectPath);
          return "Account verified! Please log in.";
        },
        error: (err: any) => {
          setIsLoading(false);
          return err.response?.data?.detail?.[0]?.msg || "Verification failed";
        }
      }
    );
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto flex flex-col items-center text-center justify-center min-h-[80vh] px-6"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={variants?.itemVariants} className="mb-12">
        <Image src="/contact star.svg" alt="Starix Logo" width={60} height={60} className="object-contain" />
      </motion.div>
      
      <motion.div className="flex flex-col gap-3 mb-10" variants={variants?.itemVariants}>
        <h3 className="font-bold md:text-[40px] text-[32px] tracking-tight text-[#040136]">Verify your email</h3>
        <p className="text-[#747682] text-base font-normal">
          Enter the code sent to <span className="text-[#040136] font-medium">{displayEmail}</span>
        </p>
      </motion.div>

      <motion.form 
        className="w-full flex flex-col items-center gap-10" 
        variants={variants?.itemVariants}
        onSubmit={handleVerifyOtp}
      >
        <OtpInput length={6} value={otp} onChange={(c) => setOtp(c)} className="flex justify-center gap-3" />

        <button
          type="submit"
          disabled={otp.length < 6 || isLoading}
          className={`w-full h-[56px] rounded-full font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 ${otp.length === 6 && !isLoading ? "bg-[#040136] text-white hover:bg-[#06024d]" : "bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed"}`}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
        </button>

        <div className="flex flex-col gap-1 text-sm">
           <span className="text-[#667085]">Didn’t get a Code?</span>
           <button 
             type="button"
             disabled={!canResend}
             className={`font-semibold ${canResend ? "text-[#000842] hover:underline" : "text-gray-400 cursor-not-allowed"}`}
             onClick={handleResend}
           >
             {canResend ? "Resend Code" : <>Resend Code in <span className="font-bold">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span></>}
           </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-medium">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}