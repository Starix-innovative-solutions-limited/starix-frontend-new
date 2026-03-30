/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { variants } from "@/constant";
import { motion } from "framer-motion";
import React, { useState } from "react";
import CustomInput from "../CustomInput"; 
import Loader from "../Loader";
import { useCreatorSignup, useGenerateOtp } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; 
import Link from "next/link";
import Image from "next/image";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const CreatorSignup = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);

  const { mutateAsync, isPending } = useCreatorSignup();
  const { mutate: generateOtp } = useGenerateOtp();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const payload = {
      ...form,
      full_name: `${form.first_name} ${form.last_name}`.trim(),
    };

    if (!form.email || !form.password || !form.first_name) {
      return toast.error("Please fill all required fields");
    }

    await toast.promise(
      mutateAsync(payload as any),
      {
        loading: "Creating account...",
        success: () => {
          generateOtp({ email: form.email, purpose: "email_verification" } as any);
          router.push(`/verify-email?email=${form.email}&role=creator`);
          return "Signup successful!";
        },
        error: (err: any) => err?.response?.data?.detail || "Signup failed",
      }
    );
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
        <h1 className="text-[40px] font-medium text-[#040136] tracking-tight mb-3">
          Create an Account
        </h1>
        <p className="text-[#6B7280] text-lg">
          Sign up to start building your creator profile on Starix.
        </p>
      </header>

      <button className="w-full flex items-center justify-center gap-3 border border-[#E5E7EB] rounded-full py-4 px-4 mb-8 hover:bg-gray-50 transition-all font-semibold text-[#1F2937] text-base">
        <FcGoogle size={24} />
        Continue with Google
      </button>

      {/* Divider - Fixed Colors */}
      <div className="w-full flex items-center gap-4 mb-8">
        <div className="bg-[#E5E7EB] flex-1"></div>
        <span className="text-[#747682] text-sm font-medium">OR</span>
        <div className="bg-[#E5E7EB] flex-1"></div>
      </div>

      {/* Form Fields - Fixed Spacing */}
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

        <CustomInput
          label="Set Password"
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Action Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full py-4 font-bold text-white bg-[#0033FF] hover:bg-[#0026CC] transition-all mt-4 flex items-center justify-center text-lg"
        >
          {isPending ? <Loader /> : "Sign Up"}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-10 text-center space-y-6">
        <p className="text-[#4B5563] font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-[#6B7280] font-bold hover:underline ml-1">
            Sign in
          </Link>
        </p>

        <p className="text-[12px] text-[#9CA3AF] leading-relaxed max-w-[300px] mx-auto">
          By Continuing, you agree to our <Link href="../footer/terms" className="underline hover:text-gray-600">terms</Link> and <Link href="../footer/privacy" className="underline hover:text-gray-600">privacy policy</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default CreatorSignup;