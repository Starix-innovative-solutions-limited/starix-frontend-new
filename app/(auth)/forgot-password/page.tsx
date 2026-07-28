/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";
// 💡 Import useForgotPassword instead of useGenerateOtp
import { useRequestPasswordReset, useConfirmPasswordReset } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import OtpInput from "@/components/auth/OtpInput";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const { mutateAsync: requestReset, isSuccess: otpSuccess, isPending: isSendingOtp } = useRequestPasswordReset();
  const { mutateAsync: confirmReset, isPending: isResetting } = useConfirmPasswordReset();

  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email) return toast.error("Please enter your email");

    await toast.promise(
      requestReset(email.trim()), // 💡 Hits /auth/password-reset/request
      {
        loading: "Sending reset code...",
        success: "Reset code sent to your email! ✅",
        error: (err: any) => err.response?.data?.detail || "Failed to send reset code",
      }
    );
  };

  const handleReset = async (e?: React.FormEvent) => {
  e?.preventDefault();

  if (otp.length < 6) return toast.error("Enter the 6-digit code");
  if (password.length < 8) return toast.error("Password must be at least 8 characters");

  await toast.promise(
    confirmReset({
      email: email.trim().toLowerCase(),
      code: otp, // 💡 TRY CHANGING THIS TO 'otp_code' IF 'code' FAILS
      new_password: password
    } as any),
    {
      loading: "Updating password...",
      success: () => {
        router.push('/login');
        return "Password reset successful! ✅";
      },
      error: (err: any) => {
        // 1. Log the full error to your console so you can see the fix
        console.error("BACKEND VALIDATION ERROR:", err.response?.data);

        // 2. Safely extract a string for the toast to prevent the crash
        const detail = err.response?.data?.detail;
        if (Array.isArray(detail)) return detail[0].msg;
        return detail || "Reset failed. Check your code.";
      },
    }
  );
};


  return (
    <motion.div
      className="py-12 px- max-w-[480px] flex flex-col gap-4 w-full mx-auto"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex flex-col items-center gap-1 text-center md:gap-3" variants={variants?.itemVariants}>
        <div className="mb-8 flex justify-center">
          <Image
            src="/contact star.svg"
            alt="Starix Logo"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
        </div>
        <h3 className="font-medium text-3xl leading-9 text-dark-navy">
          {otpSuccess ? "Create new password" : "Forgot password??"}
        </h3>
        <p className="text-[#666666]">
          {otpSuccess 
            ? "Check your email for the code and enter your new password below." 
            : "No worries! Enter your email and we'll send you a code to reset it."}
        </p>
      </motion.div>

      <motion.form
        onSubmit={otpSuccess ? handleReset : handleSendOtp}
        className="flex flex-col gap-7 w-full"
        variants={variants?.itemVariants}
      >
        <CustomInput
          label="Email Address"
          type="email"
          placeholder="e.g. johndoe@gmail.com"
          disabled={otpSuccess}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {otpSuccess && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-col gap-7"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-dark-navy">6-Digit Code</label>
              <OtpInput length={6} value={otp} onChange={(c) => setOtp(c)} className="justify-between" />
            </div>

            <CustomInput
              label="New Password"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isSendingOtp || isResetting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-4 rounded-full font-medium text-white bg-[#0033FF] transition-all hover:opacity-90 disabled:opacity-50"
        >
          {otpSuccess ? "Update Password" : "Send Reset Code"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default PasswordResetPage;