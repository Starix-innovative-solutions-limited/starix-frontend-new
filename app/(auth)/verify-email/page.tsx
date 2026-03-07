"use client";

import React, { useState, Suspense } from "react"; // Added Suspense
import OtpInput from "@/components/auth/OtpInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { LuMoveLeft } from "react-icons/lu";
import { useVerifyEmailOtp } from "@/hooks/useAuth";
import { sessionAuth } from "@/utils/sessionAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// 1. Move the logic into a content component
const VerifyEmailContent = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const pendingSignup = sessionAuth?.get();
  const email = pendingSignup?.email;
  const { mutateAsync: verifyEmail } = useVerifyEmailOtp();

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();

    await toast.promise(
      verifyEmail({
        email: `${pendingSignup?.email}`,
        otp_code: otp
      }),
      {
        loading: "Verify account...",
        success: () => {
          setOtp("");
          router.push('/login');
          return "Account verified ✅";
        },
        error: (err) => {
          return `Signup failed: ${err.response?.data?.detail || "Something went wrong"}`;
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
          <span className="font-medium text-dark-navy">
            {email ?? "your email"}
          </span>
        </p>
      </motion.div>
      <motion.form action="" className="flex flex-col gap-7 overflow-hidden" variants={variants?.itemVariants}>
        <OtpInput length={6} value={otp} onChange={(c) => setOtp(c)} className="overflow-x-hidden" />
      </motion.form>

      <motion.button
        variants={variants?.itemVariants}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleVerifyOtp}
        className="
          mt-20
          w-full
          py-4
          text-white
          bg-dark-navy
          rounded-full
          font-medium
          flex
          items-center
          justify-center
        "
      >
        Verify
      </motion.button>
    </motion.div>
  );
};

// 2. Export the page wrapped in Suspense
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}