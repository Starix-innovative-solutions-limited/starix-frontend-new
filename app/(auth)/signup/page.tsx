"use client";

import React, { useState, Suspense, useRef, useEffect } from "react";
import Personalize from "@/components/auth/Personalize";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useSearchParams, useRouter } from "next/navigation";
import CreatorSignup from "@/components/auth/CreatorSignup";
import BrandSignup from "@/components/auth/BrandSignup";
import Link from "next/link";

const SignupForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  /* ---------- ROLE STATE ---------- */
  const [role, setRole] = useState(
    searchParams.get("role") ?? "creator"
  );

  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const roleRef = useRef<HTMLDivElement | null>(null);

  /* ---------- CLOSE DROPDOWN ---------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!roleRef.current) return;
      if (!roleRef.current.contains(e.target as Node)) {
        setIsRoleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- GOOGLE AUTH ---------- */
  if (isGoogleAuth) {
    return <Personalize onBack={() => setIsGoogleAuth(false)} />;
  }

  /* ---------- ROLE CHANGE HANDLER ---------- */
  const changeRole = (newRole: "creator" | "brand") => {
    setRole(newRole); // ← THIS triggers UI instantly
    router.replace(`/signup?role=${newRole}`); // update URL silently
    setIsRoleOpen(false);
  };

  return (
    <div className="w-full flex items-center justify-center md:py-6 md:px-8">
      <motion.div
        className="w-full p-4 sm:p-6 md:p-8"
        variants={variants?.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col gap-6">

          {/* HEADER */}
          <motion.div className="flex flex-col gap-2" variants={variants?.itemVariants}>
            <h3 className="font-medium text-3xl sm:text-4xl md:text-5xl text-secondary-100">
              Create an account
            </h3>

            <p className="text-neut/60 text-sm sm:text-base font-light">
              {role === "brand"
                ? "Sign up as a brand and start running creator challenges."
                : "Sign up as a creator and start joining challenges."}
            </p>
          </motion.div>

          {/* ROLE PILL */}
          <motion.div
            variants={variants?.itemVariants}
            className="flex items-center gap-2 relative"
            ref={roleRef}
          >
            <span className="text-xs text-gray-500">Signing up as:</span>

            <button
              onClick={() => setIsRoleOpen((p) => !p)}
              className="text-xs font-medium px-3 py-1 rounded-full border bg-[#FAFAFA]"
            >
              {role === "brand" ? "Brand" : "Creator"}
            </button>

            {isRoleOpen && (
              <div className="absolute top-8 left-28 w-32 bg-white rounded-xl shadow-md border z-50">
                <button
                  onClick={() => changeRole("creator")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Creator
                </button>

                <button
                  onClick={() => changeRole("brand")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Brand
                </button>
              </div>
            )}
          </motion.div>

          {/* DIVIDER */}
          <motion.div variants={variants?.itemVariants} className="flex items-center gap-4">
            <div className="h-px bg-gray-200 w-full" />
            <span className="text-xs text-gray-400">continue</span>
            <div className="h-px bg-gray-200 w-full" />
          </motion.div>

          {/* FORM */}
          <motion.div variants={variants?.itemVariants}>
            {role === "brand" ? (
              <BrandSignup setIsGoogleAuth={setIsGoogleAuth} role="brand" />
            ) : (
              <CreatorSignup setIsGoogleAuth={setIsGoogleAuth} role="creator" />
            )}
          </motion.div>

          {/* FOOTER */}
          <motion.div className="text-center text-sm text-neut/60">
            Already have an account?{" "}
            <Link
              href={`/login${role === "brand" ? "?role=brand" : ""}`}
              className="text-dark-navy hover:underline"
            >
              Login
            </Link>
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
