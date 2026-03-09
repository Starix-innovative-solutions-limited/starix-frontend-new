/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, Suspense } from "react";
import OtpInput from "@/components/auth/OtpInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { LuMoveLeft } from "react-icons/lu";
import { useVerifyEmailOtp } from "@/hooks/useAuth";
import { sessionAuth } from "@/utils/sessionAuth";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams

const VerifyEmailContent = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. Get role and email from the URL (safest way)
const role = searchParams.get("role");
const queryEmail = searchParams.get("email");

// 2. Safely check the session storage
const pendingSignup = sessionAuth?.get() as any; // Temporary 'any' to bypass the TS error

// 3. Check every possible place the email could be stored
const displayEmail = 
  queryEmail || 
  pendingSignup?.email || 
  pendingSignup?.brand_email || 
  pendingSignup?.creator_email;

  const { mutateAsync: verifyEmail } = useVerifyEmailOtp();

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

  await toast.promise(
    verifyEmail(payload as any),
    {
      loading: "Verifying account...",
      success: () => {
        // 💡 DYNAMIC REDIRECT BASED ON ROLE
        const redirectPath = currentRole === "brand" 
          ? "/login?role=brand" 
          : "/login?role=creator";
          
        router.push(redirectPath);
        return "Account verified ✅";
      },
      error: (err: any) => {
        return err.response?.data?.detail?.[0]?.msg || "Verification failed";
      },
    }
  );
};

  return (
    <motion.div
      className="max-md:p-2 p-5 w-full flex flex-col justify-between gap-10 overflow-x-hidden"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.back()}>
        <LuMoveLeft />
        <span className="text-dark-navy/70 text-base font-light">Back to Sign up</span>
      </div>
      
      <motion.div className="flex flex-col gap-7" variants={variants?.itemVariants}>
        <h3 className="font-medium text-4xl leading-9 tracking-[0.002rem] text-dark-navy">Check your email.</h3>
        <p className="text-dark font-light text-xl">
          We’ve sent the verification code to{" "}
          <span className="font-medium text-dark-navy block truncate">
            {displayEmail ?? "your email"}
          </span>
        </p>
      </motion.div>

      <motion.form className="flex flex-col gap-7 overflow-hidden" variants={variants?.itemVariants}>
        <OtpInput length={6} value={otp} onChange={(c) => setOtp(c)} className="overflow-x-hidden" />
      </motion.form>

      <motion.button
        variants={variants?.itemVariants}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleVerifyOtp}
        className="mt-20 w-full py-4 text-white bg-dark-navy rounded-full font-medium flex items-center justify-center"
      >
        Verify
      </motion.button>
    </motion.div>
  );
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}