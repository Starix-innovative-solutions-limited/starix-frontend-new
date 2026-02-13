"use client";

import React, { useState, Suspense } from "react";
import Personalize from "@/components/auth/Personalize";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useSearchParams } from "next/navigation";
import CreatorSignup from "@/components/auth/CreatorSignup";
import BrandSignup from "@/components/auth/BrandSignup";
import Link from "next/link";

const SignupForm = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "creator";
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  

  if (isGoogleAuth) {
    return <Personalize onBack={() => setIsGoogleAuth(false)} />;
  }

  return (
    <div className="w-full flex items-center justify-center md:py-6 md:px-8">
      {/* Card */}
      <motion.div
        className="
          w-full
          
          md:bg-none
          
          md:border-0
          
          p-4 sm:p-6 md:p-8
        "
        variants={variants?.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <motion.div className="flex flex-col gap-2" variants={variants?.itemVariants}>
            <h3 className="font-medium text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[0.02rem] text-secondary-100">
              Create an account
            </h3>

            <p className="text-neut/60 text-sm sm:text-base font-light">
              {role === "brand"
                ? "Sign up as a brand and start running creator challenges."
                : "Sign up as a creator and start joining challenges."}
            </p>
          </motion.div>

          {/* Optional: role pill */}
          <motion.div variants={variants?.itemVariants} className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Signing up as:</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full border border-gray-200 bg-[#FAFAFA] text-secondary-100">
              {role === "brand" ? "Brand" : "Creator"}
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div variants={variants?.itemVariants} className="flex items-center gap-4">
            <div className="h-px bg-gray-200 w-full" />
            <span className="text-xs text-gray-400 whitespace-nowrap">continue</span>
            <div className="h-px bg-gray-200 w-full" />
          </motion.div>

          {/* Form body */}
          <motion.div variants={variants?.itemVariants}>
            {role === "brand" ? (
            <BrandSignup setIsGoogleAuth={setIsGoogleAuth} role="brand" />
          ) : (
            <CreatorSignup setIsGoogleAuth={setIsGoogleAuth} role="creator" />
          )}
          </motion.div>

          {/* Footer */}
          <motion.div className="flex flex-col gap-3 mt-1" variants={variants?.itemVariants}>
            <p className="text-center text-sm sm:text-base font-light text-neut/60">
              Already have an account?{" "}
              <Link
              href={`/login${role === "brand" ? "?role=brand" : ""}`}
              className="text-dark-navy font-normal hover:underline"
            >
              Login
            </Link>
              .
            </p>

            {/* OPTIONAL: if you want to trigger Personalize (google auth) from inside signup components,
                pass setIsGoogleAuth down as a prop and call it from your Google button. */}
            {/* <button
              type="button"
              onClick={() => setIsGoogleAuth(true)}
              className="text-sm text-secondary-100 hover:text-secondary-100/80 transition-colors mx-auto"
            >
              Continue with Google
            </button> */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
