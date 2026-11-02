/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";
// 💡 Import useForgotPassword instead of useGenerateOtp
import { useRequestPasswordReset, useConfirmPasswordReset } from "@/hooks/useAuth";
import OtpInput from "@/components/auth/OtpInput";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAuthErrorMessage } from "@/lib/authErrors";
import AuthFormMessage from "@/components/auth/AuthFormMessage";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const router = useRouter();

  const { mutateAsync: requestReset, isSuccess: otpSuccess, isPending: isSendingOtp } = useRequestPasswordReset();
  const { mutateAsync: confirmReset, isPending: isResetting } = useConfirmPasswordReset();

  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!email) {
      setFormError("Please enter your email.");
      return;
    }

    try {
      await requestReset(email.trim());
      setFormSuccess("We sent a reset code to your email.");
    } catch (err: unknown) {
      setFormError(getAuthErrorMessage(err, "generic"));
    }
  };

  const handleReset = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (otp.length < 6) {
      setFormError("Enter the 6-digit code.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    try {
      await confirmReset({
        email: email.trim().toLowerCase(),
        code: otp,
        new_password: password,
      } as any);
      router.push("/login?reset=1");
    } catch (err: unknown) {
      console.error("BACKEND VALIDATION ERROR:", (err as any)?.response?.data);
      setFormError(getAuthErrorMessage(err, "generic"));
    }
  };


  return (
    <motion.div
      className="mx-auto flex w-full max-w-[480px] flex-col gap-4 px-6 py-12 md:max-w-none md:px-8 md:py-10 xl:max-w-[480px] xl:px-6 xl:py-12"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex flex-col items-center gap-1 text-center md:gap-3" variants={variants?.itemVariants}>
        <div className="mb-8 flex justify-center">
          <Image
            src="/contact star.webp"
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

        <AuthFormMessage error={formError} success={formSuccess} />

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