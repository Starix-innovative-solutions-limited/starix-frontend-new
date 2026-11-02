/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, Suspense, useEffect } from "react";
import OtpInput from "@/components/auth/OtpInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useVerifyEmailOtp, useGenerateOtp } from "@/hooks/useAuth"; // Added useGenerateOtp
import { sessionAuth } from "@/utils/sessionAuth";
import Image from "next/image";
import { getAuthErrorMessage } from "@/lib/authErrors";
import AuthFormMessage from "@/components/auth/AuthFormMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const VerifyEmailContent = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const role = searchParams.get("role");
  const queryEmail = searchParams.get("email");
  const pendingSignup = sessionAuth?.get() as any;

  const displayEmail = queryEmail || pendingSignup?.email || pendingSignup?.brand_email || pendingSignup?.creator_email;

  const { mutateAsync: verifyEmail } = useVerifyEmailOtp();
  const { mutateAsync: requestOtp, isPending: isRequestingOtp } = useGenerateOtp();

  // TIMER LOGIC
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    if (!canResend || isRequestingOtp) return;
    setOtpError("");
    setOtpSuccess("");

    try {
      const data = await requestOtp();
      setTimeLeft(60);
      setCanResend(false);
      setOtpSuccess(data?.message || "We sent you a new code.");
    } catch (err: unknown) {
      setOtpError(getAuthErrorMessage(err, "generic"));
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent, codeOverride?: string) => {
    e?.preventDefault();
    const codeToVerify = (codeOverride ?? otp).trim();
    if (codeToVerify.length !== 6 || isLoading) return;

    const currentRole = role || pendingSignup?.role || "creator";

    setOtpError("");
    setOtpSuccess("");
    setIsLoading(true);

    try {
      await verifyEmail({ code: codeToVerify });
      sessionAuth.clear();
      const redirectPath =
        currentRole === "brand" ? "/brand-onboarding" : "/onboarding";
      router.push(redirectPath);
    } catch (err: unknown) {
      setOtpError(getAuthErrorMessage(err, "generic"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (code: string) => {
    setOtp(code);
    if (otpError) setOtpError("");

    if (code.length === 6) {
      handleVerifyOtp(undefined, code);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto flex flex-col items-center text-center justify-center min-h-[80vh] px-6"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={variants?.itemVariants} className="mb-12">
        <Image src="/contact star.webp" alt="Starix Logo" width={60} height={60} className="object-contain" />
      </motion.div>
      
      <motion.div className="flex flex-col gap-3 mb-10" variants={variants?.itemVariants}>
        <h3 className="font-semibold md:text-[40px] text-[32px] tracking-tight text-[#040136]">Verify your email</h3>
        <p className="text-[#747682] text-base font-normal">
          {displayEmail
            ? `Enter the code sent to ${displayEmail}.`
            : "Enter the code sent to your email address."}
        </p>
      </motion.div>

      <motion.form 
        className="w-full flex flex-col items-center gap-8" 
        variants={variants?.itemVariants}
        onSubmit={handleVerifyOtp}
      >
        <OtpInput
          length={6}
          value={otp}
          onChange={handleOtpChange}
          hasError={!!otpError}
          disabled={isLoading}
          className="flex justify-center gap-3"
        />

        {isLoading && <Loader2 className="h-5 w-5 animate-spin text-[#0033FF]" />}
        <AuthFormMessage error={otpError} success={otpSuccess} />

        <div className="flex flex-col gap-1 text-sm">
           <span className="text-[#667085]">Didn’t get a Code?</span>
           <button 
             type="button"
             disabled={!canResend || isRequestingOtp}
             className={`font-semibold ${canResend && !isRequestingOtp ? "text-[#000842] hover:underline" : "text-gray-400 cursor-not-allowed"}`}
             onClick={handleResend}
           >
             {canResend ? (isRequestingOtp ? "Sending..." : "Resend Code") : <>Resend Code in <span className="font-semibold">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span></>}
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