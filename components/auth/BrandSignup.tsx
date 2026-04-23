/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { variants } from "@/constant";
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";
import CustomInput from "../CustomInput";
import Loader from "../Loader";
import { useBrandSignup, useGenerateOtp } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

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

  // --- PASSWORD VALIDATION (Same as Creator for consistency) ---
  const passwordRequirements = useMemo(() => [
    { label: "At least 8 characters", met: form.password.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(form.password) },
    { label: "At least one number", met: /[0-9]/.test(form.password) },
    { label: "At least one special character", met: /[^A-Za-z0-9]/.test(form.password) },
  ], [form.password]);

  const isPasswordValid = passwordRequirements.every(req => req.met);
  const isFormComplete = form.brand_email && form.brand_name && form.industry && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // MATCHING YOUR SCHEMA EXACTLY:
    // Schema says: brand_name, email, password, brand_address, industry
    const payload = {
      brand_name: form.brand_name.trim(),
      email: form.brand_email.trim(), // Backend wants "email", not "brand_email"
      password: form.password,
      brand_address: form.brand_address.trim(),
      industry: form.industry, // Backend wants "string", not "[string]"
    };

    await toast.promise(mutateAsync(payload as any), {
      loading: "Creating brand account...",
      success: (data: any) => {
        if (data?.access_token) localStorage.setItem("accessToken", data.access_token);
        // Ensure generateOtp uses the correct key for brand verification
        generateOtp({ email: form.brand_email, purpose: "email_verification" } as any);
        router.push(`/verify-email?email=${form.brand_email}&role=brand`);
        return "Brand account created!";
      },
      error: (err: any) => {
        const detail = err?.response?.data?.detail;
        // Fix for the "Objects are not valid as React child" crash
        if (Array.isArray(detail)) {
          return `${detail[0].msg}`;
        }
        return typeof detail === "string" ? detail : "Signup failed";
      },
    });
  };

  return (
    <div className="max-w-[650px] mx-auto w-full py-12 px-6 flex flex-col items-center font-sans">
      <header className="text-center mb-10">
        <div className="flex justify-center mb-8">
          <Image src="/contact star.svg" alt="Starix Logo" width={60} height={60} className="object-contain" />
        </div>
        <h1 className="text-[36px] md:text-[40px] font-medium text-[#040136] tracking-tight mb-3">
          Create your brand account
        </h1>
        <p className="text-[#747682] text-lg">
          Set up your brand on Starix and start running campaigns.
        </p>
      </header>

      <button className="w-full flex items-center justify-center gap-3 border border-[#E5E7EB] rounded-full py-4 mb-8 hover:bg-gray-50 transition-all font-semibold text-[#1F2937]">
        <FcGoogle size={24} /> Continue with Google
      </button>

      <div className="w-full flex items-center gap-4 mb-8">
        <div className="h-[1px] bg-[#E5E7EB] flex-1"></div>
        <span className="text-[#9CA3AF] text-sm font-medium">OR</span>
        <div className="h-[1px] bg-[#E5E7EB] flex-1"></div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <CustomInput
          label="Brand Email"
          placeholder="Enter company email"
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
              { name: "Technology", code: "Technology" },
              { name: "Fashion", code: "Fashion" },
              { name: "Food & Beverage", code: "Food & Beverage" }
            ]}
          />
        </div>

        <CustomInput
          label="Brand Address"
          placeholder="Enter physical address"
          value={form.brand_address}
          onChange={(e) => setForm({ ...form, brand_address: e.target.value })}
        />

        <div className="space-y-4">
          <CustomInput
            label="Set Password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          
          {/* Security Checklist */}
          <div className="bg-[#F9FAFB] p-5 rounded-[24px] space-y-3 border border-[#F3F4F6]">
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center gap-3">
                {req.met ? <HiCheckCircle className="text-green-500" size={20} /> : <HiXCircle className="text-gray-300" size={20} />}
                <span className={`text-[13px] font-medium ${req.met ? "text-green-700" : "text-[#747682]"}`}>{req.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending || !isFormComplete}
          className="w-full rounded-full py-4 font-bold text-white bg-[#0033FF] hover:bg-[#0026CC] shadow-lg shadow-blue-200 transition-all mt-4 flex items-center justify-center text-lg disabled:opacity-50"
        >
          {isPending ? <Loader /> : "Sign Up"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-[#4B5563] font-medium">
          Already have an account? <Link href="/login" className="text-[#0033FF] font-bold hover:underline ml-1">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default BrandSignup;