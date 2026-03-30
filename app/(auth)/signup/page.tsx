"use client";

import React, { useState, Suspense } from "react";
import Personalize from "@/components/auth/Personalize";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "@/constant";
import { useSearchParams } from "next/navigation";
import CreatorSignup from "@/components/auth/CreatorSignup";
import BrandSignup from "@/components/auth/BrandSignup";

const SignupForm = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "brand" ? "brand" : "creator";
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);

  if (isGoogleAuth) {
    return <Personalize onBack={() => setIsGoogleAuth(false)} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role}
        className="w-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {role === "brand" ? (
          // @ts-ignore
          <BrandSignup setIsGoogleAuth={setIsGoogleAuth} />
        ) : (
          // @ts-ignore
          <CreatorSignup setIsGoogleAuth={setIsGoogleAuth} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center text-gray-400">Loading form...</div>}>
      <SignupForm />
    </Suspense>
  );
}