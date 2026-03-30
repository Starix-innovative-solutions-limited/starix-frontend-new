/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { variants } from "@/constant";
import { motion } from "framer-motion";
import React, { useState } from "react";
import CustomInput from "../CustomInput";
import Loader from "../Loader";
import { useBrandSignup, useGenerateOtp } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const initialForm = {
  brand_email: "",
  password: "",
  brand_name: "",
  brand_address: "",
  industry: "",
};

const BrandSignup = () => {
  const [form, setForm] = useState(initialForm);
  const router = useRouter();

  const { mutateAsync, isPending } = useBrandSignup();
  const { mutate: generateOtp } = useGenerateOtp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... validation logic
    const payload = { ...form, industry: [form.industry.trim()], role: "brand" };

    await toast.promise(mutateAsync(payload as any), {
      loading: "Creating account...",
      success: (data: any) => {
        if (data?.access_token) localStorage.setItem("accessToken", data.access_token);
        generateOtp({ email: form.brand_email } as any);
        router.push(`/verify-email?email=${form.brand_email}&role=brand`);
        return "Account created!";
      },
      error: (err) => err?.response?.data?.detail || "Signup failed",
    });
  };

  return (
    <div className="max-w-[650px] mx-auto w-full py-12 px-6 flex flex-col items-center font-sans">
      {/* Header Section */}
      <header className="text-center mb-10">
        <div className="flex justify-center mb-8">
          <Image src="/contact star.svg" alt="Starix Logo" width={60} height={60} className="object-contain" />
        </div>
        <h1 className="text-[40px] font-medium text-[#040136] tracking-tight mb-3">
          Create your brand account
        </h1>
        <p className="text-[#747682] font-normal text-[16px]">
          Set up your brand on Starix and start running campaigns.
        </p>
      </header>

      {/* Google Auth Button */}
      <button 
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-[#E5E7EB] rounded-full py-4 px-4 mb-8 hover:bg-gray-50 transition-all font-semibold text-[#1F2937] text-base"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      {/* Divider - Fixed Colors */}
      <div className="w-full flex items-center gap-4 mb-8">
        <div className="h-[1px] bg-[#E5E7EB] flex-1"></div>
        <span className="text-[#9CA3AF] text-sm font-medium">OR</span>
        <div className="h-[1px] bg-[#E5E7EB] flex-1"></div>
      </div>

      {/* Form Section */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="w-full space-y-6" 
        variants={variants?.itemVariants}
      >
        <CustomInput
          label="Brand Email"
          placeholder="Enter your email"
          value={form.brand_email}
          onChange={(e) => setForm({ ...form, brand_email: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <CustomInput
            label="Brand Name"
            placeholder="Enter Brand Name"
            value={form.brand_name}
            onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
          />
        
          <CustomInput
            label="Select Industry"
            type="select"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            options={[
              { name: "- select industry", code: "" },
              { name: "Technology", code: "tech" },
              { name: "Fashion", code: "fashion" },
              { name: "Food & Beverage", code: "food" }
            ]}
          />
        </div>

        <CustomInput
          label="Brand Address"
          placeholder="Enter your email" // Matching your screenshot's placeholder quirk
          value={form.brand_address}
          onChange={(e) => setForm({ ...form, brand_address: e.target.value })}
        />

        <CustomInput
          label="Set Password"
          type="password" // This triggers the show/hide logic in your component
          placeholder="Create a password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full py-4 font-bold text-white bg-[#0033FF] hover:bg-[#0026CC] shadow-lg shadow-blue-200 transition-all mt-4 flex items-center justify-center text-lg"
        >
          {isPending ? <Loader /> : "Sign Up"}
        </button>
      </motion.form>

      {/* Footer Links */}
      <div className="mt-10 text-center space-y-6">
        <p className="text-[#4B5563] font-medium">
          Already have an account? <Link href="/login" className="text-[#6B7280] font-bold hover:underline ml-1">Sign in</Link>
        </p>
        
        <p className="text-[12px] text-[#9CA3AF] leading-relaxed max-w-[300px] mx-auto">
          By Continuing, you agree to our <Link href="../footer/terms" className="underline hover:text-gray-600 transition-colors">terms</Link> and <Link href="../footer/privacy" className="underline hover:text-gray-600 transition-colors">privacy policy</Link>
        </p>
      </div>
    </div>
  );
};

export default BrandSignup;