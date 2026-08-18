/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { variants } from "@/constant";
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";
import CustomInput from "../CustomInput"; 
import Loader from "../Loader";
import { useCreatorSignup } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; 
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { startGoogleAuth } from "@/lib/auth";
import { CreatorSignupPayload } from "@/utils/type";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const handleGoogleSignup = async () => {
  try {
    await startGoogleAuth("creator", "signup");
  } catch (err: any) {
    console.error("GOOGLE SIGNUP ERROR:", err.response?.data || err.message);
    toast.error("Unable to connect to Google Signup.");
  }
};

const CreatorSignup = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);

  const { mutateAsync, isPending } = useCreatorSignup();

  const passwordRequirements = useMemo(
    () => [
      { label: "At least 8 characters", met: form.password.length >= 8 },
      { label: "At least one uppercase letter", met: /[A-Z]/.test(form.password) },
      { label: "At least one lowercase letter", met: /[a-z]/.test(form.password) },
      { label: "At least one number", met: /[0-9]/.test(form.password) },
      {
        label: "At least one special character",
        met: /[^A-Za-z0-9]/.test(form.password),
      },
    ],
    [form.password]
  );

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const hasTypedConfirmPassword = (form.confirm_password ?? "").length > 0;
  const passwordsMatch = form.password === (form.confirm_password ?? "");

  const firstName = form.first_name.trim();
  const lastName = form.last_name.trim();

  const isFormComplete =
    firstName.length >= 2 &&
    firstName.length <= 128 &&
    lastName.length >= 2 &&
    lastName.length <= 128 &&
    isEmailValid &&
    isPasswordValid &&
    passwordsMatch &&
    hasTypedConfirmPassword;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const payload: CreatorSignupPayload = {
      first_name: firstName,
      last_name: lastName,
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    await toast.promise(mutateAsync(payload), {
      loading: "Creating account...",
      success: () => {
        router.push(
          `/verify-email?email=${encodeURIComponent(payload.email)}&role=creator`
        );
        return "Signup successful! Check your email for the OTP.";
      },
      error: (err: any) => {
        const status = err?.response?.status;
        const detail = err?.response?.data?.detail;

        if (status === 409) return "Email already exists";
        if (status === 429) return "Too many attempts. Try again later.";
        if (Array.isArray(detail)) return detail[0]?.msg || "Validation error";
        if (typeof detail === "string") return detail;
        return "Signup failed. Please check your inputs.";
      },
    });
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={variants?.itemVariants}
      className="bg-[#fff] mx-auto w-full max-w-[650px] py-12 px-6 flex flex-col items-center font-sans"
    >
      {/* Logo & Header */}
      <header className="text-center mb-10">
        <div className="flex justify-center mb-8">
          <Image src="/contact star.svg" alt="Starix Logo" width={60} height={60} className="object-contain" />
        </div>
        <h1 className="text-[36px] md:text-[40px] font-medium text-[#040136] tracking-tight">
          Create an Account
        </h1>
        <p className="text-[#6B7280] text-lg">
          Sign up to start building your creator profile on Starix.
        </p>
      </header>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-3 border border-[#E5E7EB] rounded-full py-4 px-4 mb-8 hover:bg-gray-50 transition-all font-semibold text-[#1F2937] text-base active:scale-[0.99]"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="w-full flex items-center gap-4 mb-4">
        <div className=" h-[1px] flex-1"></div>
        <span className="text-[#747682] text-sm font-medium">OR</span>
        <div className=" h-[1px] flex-1"></div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
        <CustomInput
          label="Email Address"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            label="First Name"
            placeholder="Enter first name"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          />
          <CustomInput
            label="Last Name"
            placeholder="Enter last name"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <CustomInput
            label="Set Password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <CustomInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={form.confirm_password}
            onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
            error={hasTypedConfirmPassword && !passwordsMatch}
            errorMessage="Passwords do not match"
          />

          {/* SECURITY CHECKLIST */}
          {form.password.length > 0 && (
            <div className="bg-[#F9FAFB] p-5 rounded-[24px] space-y-3 border border-[#F3F4F6]">
              <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">
                Security Checklist
              </p>

              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-3">
                  {req.met ? (
                    <HiCheckCircle className="text-green-500 transition-colors" size={20} />
                  ) : (
                    <HiXCircle className="text-gray-300 transition-colors" size={20} />
                  )}

                  <span
                    className={`text-[13px] font-medium transition-colors ${
                      req.met ? "text-green-700" : "text-[#747682]"
                    }`}
                  >
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isPending || !isFormComplete}
          className="w-full rounded-full py-4 font-bold text-white bg-[#0033FF] hover:bg-[#0033FF] transition-all mt-4 flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-100 active:scale-[0.98]"
        >
          {isPending ? <Loader /> : "Sign Up"}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-10 text-center space-y-6">

        <p className="text-[#747682] text-[14px] font-medium">
          By continuing, you agree to our <Link href="/terms" className="underline ml-1">terms</Link> and <Link href="/privacy" className="underline ml-1">privacy policy</Link>
        </p>
        <p className="text-[#747682] text-[14px] font-medium">
          Already have an account?{" "}
          <Link href="/coming-soon" className="underline ml-1">
            Sign in
          </Link>
        </p>

        
      </div>
    </motion.div>
  );
};

export default CreatorSignup;