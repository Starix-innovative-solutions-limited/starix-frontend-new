"use client";

import React, { useState, Suspense } from "react";
import Personalize from "@/components/auth/Personalize";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useSearchParams } from "next/navigation";
import CreatorSignup from "@/components/auth/CreatorSignup";
import BrandSignup from "@/components/auth/BrandSignup";

// Logic component
const SignupForm = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [isGoogleAuth, setIsGoogleAuth] = useState<boolean>(false);

  if (isGoogleAuth) {
    return <Personalize onBack={() => setIsGoogleAuth(false)} />;
  }

  return (
    <motion.div
      className="max-md:p-2 p-5 flex flex-col gap-4 justify-between"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex flex-col gap-1 mb-6" variants={variants?.itemVariants}>
        <h3 className="font-medium text-5xl leading-9 tracking-[0.02rem]">
          Create an account
        </h3>
      </motion.div>

      {role === "brand" ? <BrandSignup /> : <CreatorSignup />}

      <motion.div className="flex flex-col gap-3.5 mt-3" variants={variants?.itemVariants}>
        <p className="max-md:text-xs text-lg font-light text-center text-neut/60">
          Already have an account?{" "}
          <a href="/login" className="text-dark-navy font-normal ml-1">
            Login.
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

// Main Page Export - This must be the default export to satisfy Next.js
export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}