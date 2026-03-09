/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useGenerateOtp, useResetPassword } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import OtpInput from "@/components/auth/OtpInput";
import { useRouter } from "next/navigation";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  // Assuming these hooks are already setup in your useAuth.ts
  const { mutateAsync: generateOtp, isSuccess: otpSuccess, isPending: isSendingOtp } = useGenerateOtp();
  const { mutateAsync: resetPassword, isPending: isResetting } = useResetPassword();

  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email) return toast.error("Please enter your email");

    await toast.promise(
      generateOtp({
        email: email.trim(),
        purpose: "password_reset" // Backend uses this to route the email template
      } as any),
      {
        loading: "Sending OTP...",
        success: "OTP sent to your email ✅",
        error: (err: any) => {
          return err.response?.data?.detail || "Failed to send OTP";
        },
      }
    );
  };

  const handleReset = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (otp.length < 6) return toast.error("Enter the 6-digit code");
    if (password.length < 8) return toast.error("Password must be at least 8 characters");

    await toast.promise(
      resetPassword({
        email: email.trim(),
        code: otp, // 💡 Changed from otp_code to code to match backend verification logic
        new_password: password
      } as any),
      {
        loading: "Resetting password...",
        success: () => {
          router.push('/login');
          return "Password reset successful! Please login. ✅";
        },
        error: (err: any) => {
          // If the backend returns a 422 here, check the console for missing fields
          console.error("RESET ERROR:", err.response?.data);
          return err.response?.data?.detail || "Reset failed. Check your code.";
        },
      }
    );
  };

  return (
    <motion.div
      className="max-md:p-2 p-5 flex flex-col gap-4 w-full max-w-md mx-auto"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex flex-col gap-1 md:gap-3" variants={variants?.itemVariants}>
        <h3 className="font-medium text-3xl leading-9 text-dark-navy">
          {otpSuccess ? "Create new password" : "Forgot password??"}
        </h3>
        <p className="text-[#666666]">
          {otpSuccess 
            ? "Enter the code sent to your email and your new password." 
            : "Enter your email address to receive a verification code."}
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
              <label className="text-sm font-medium text-dark-navy">Verification Code</label>
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
          className="w-full py-4 rounded-full font-medium text-white bg-dark-navy transition-all hover:opacity-90 disabled:opacity-50"
        >
          {otpSuccess ? "Reset Password" : "Request OTP"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default PasswordResetPage;