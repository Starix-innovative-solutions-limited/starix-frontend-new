/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import CustomInput from "../CustomInput";
import Loader from "../Loader";
import { useBrandSignup } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { startGoogleAuth } from "@/lib/auth";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { BrandSignupPayload } from "@/utils/type";
import { useGetCategories } from "@/hooks/useCategories";

const initialForm = {
  email: "",
  password: "",
  confirm_password: "",
  brand_name: "",
  brand_address: "",
  industry: "",
};

const handleGoogleSignup = async () => {
  try {
    await startGoogleAuth("brand", "signup");
  } catch (err: any) {
    console.error("GOOGLE SIGNUP ERROR:", err.response?.data || err.message);
    toast.error("Unable to connect to Google Signup.");
  }
};

const BrandSignup = () => {
  const [form, setForm] = useState(initialForm);
  const router = useRouter();

  const { mutateAsync, isPending } = useBrandSignup();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategories();

  const industryOptions = useMemo(
    () => [
      { name: "- select industry", code: "" },
      ...categories.map((c) => ({
        name: c.name.charAt(0).toUpperCase() + c.name.slice(1),
        code: c.name, // API expects lowercase category name
      })),
    ],
    [categories]
  );

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
  const confirmPassword = form.confirm_password ?? "";
  const hasTypedConfirmPassword = confirmPassword.length > 0;
  const passwordsMatch = (form.password ?? "") === confirmPassword;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const brandName = form.brand_name.trim();
  const brandAddress = form.brand_address.trim();
  const industry = form.industry.trim();

  const isFormComplete =
    isEmailValid &&
    brandName.length >= 2 &&
    brandName.length <= 255 &&
    brandAddress.length >= 2 &&
    brandAddress.length <= 500 &&
    industry.length >= 2 &&
    industry.length <= 100 &&
    isPasswordValid &&
    hasTypedConfirmPassword &&
    passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: BrandSignupPayload = {
      brand_name: brandName,
      email: form.email.trim().toLowerCase(),
      password: form.password,
      brand_address: brandAddress,
      industry,
    };

    await toast.promise(mutateAsync(payload), {
      loading: "Creating brand account...",
      success: () => {
        router.push(
          `/verify-email?email=${encodeURIComponent(payload.email)}&role=brand`
        );
        return "Brand account created! Check your email for the OTP.";
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
    <div className="mx-auto flex w-full max-w-[650px] flex-col items-center px-6 py-12 font-sans">
      <header className="mb-10 text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/contact star.svg"
            alt="Starix Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <h1 className="text-[36px] font-medium tracking-tight text-[#040136] md:text-[40px]">
          Create your brand account
        </h1>
        <p className="text-lg text-[#747682]">
          Set up your brand on Starix and start running campaigns.
        </p>
      </header>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="mb-8 flex w-full items-center justify-center gap-3 rounded-full border border-[#E5E7EB] py-4 font-semibold text-[#1F2937] transition-all hover:bg-gray-50"
      >
        <FcGoogle size={24} /> Continue with Google
      </button>

      <div className="mb-5 flex w-full items-center gap-4">
        <div className="h-[1px] flex-1"></div>
        <span className="text-sm font-medium text-[#9CA3AF]">OR</span>
        <div className="h-[1px] flex-1"></div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <CustomInput
          label="Brand Email"
          placeholder="Enter company email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <CustomInput
            label="Brand Name"
            placeholder="Enter Brand Name"
            value={form.brand_name}
            onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
          />
          <CustomInput
            label="Industry"
            type="select"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            disabled={isCategoriesLoading}
            options={industryOptions}
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
          <CustomInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, confirm_password: e.target.value }))
            }
            error={hasTypedConfirmPassword && !passwordsMatch}
            errorMessage="Passwords do not match"
          />

          {(form.password ?? "").length > 0 && (
            <div className="space-y-3 rounded-[24px] border border-[#F3F4F6] bg-[#F9FAFB] p-5">
              <p className="mb-1 text-[11px] font-bold tracking-widest text-[#9CA3AF] uppercase">
                Security Checklist
              </p>
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-3">
                  {req.met ? (
                    <HiCheckCircle className="text-green-500" size={20} />
                  ) : (
                    <HiXCircle className="text-gray-300" size={20} />
                  )}
                  <span
                    className={`text-[13px] font-medium ${
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

        <button
          type="submit"
          disabled={isPending || !isFormComplete}
          className="mt-4 flex w-full items-center justify-center rounded-full bg-[#0033FF] py-4 text-lg font-bold text-white shadow-sm shadow-blue-200 transition-all disabled:opacity-50"
        >
          {isPending ? <Loader /> : "Sign Up"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="mb-2 text-[16px] font-medium text-[#747682]">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="ml-1 underline">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="ml-1 underline">
            privacy policy
          </Link>
        </p>
        <p className="text-[16px] font-medium text-[#747682]">
          Already have an account?{" "}
          <Link href="/login" className="ml-1 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BrandSignup;
