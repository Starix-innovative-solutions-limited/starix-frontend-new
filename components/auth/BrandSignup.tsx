/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { variants } from "@/constant";
import { motion } from "framer-motion";
import React, { useState } from "react";
import CustomInput from "../CustomInput";
import Loader from "../Loader";
import { useBrandSignup, useGenerateOtp } from "@/hooks/useAuth"; // Re-added useGenerateOtp
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const initialForm = {
  brand_email: "",
  password: "",
  brand_name: "",
  brand_address: "",
  website_or_social_link: "",
  industry: "",
};

type BrandSignupProps = {
  setIsGoogleAuth: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
};

const formatWebsite = (url: string) => {
  if (!url) return "";
  let trimmed = url.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  return trimmed;
};

const BrandSignup = ({ setIsGoogleAuth, role }: BrandSignupProps) => {
  const [form, setForm] = useState(initialForm);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const { mutateAsync, isPending } = useBrandSignup();
  const { mutate: generateOtp } = useGenerateOtp(); // Hook to trigger email

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

    if (!form.brand_name.trim()) return toast.error("Brand name is required");
    if (!form.brand_email.includes("@")) return toast.error("Enter a valid email");
    if (form.password.length < 8) return toast.error("Password too short");
    if (form.password !== confirmPassword) return toast.error("Passwords do not match");

    const payload = {
  brand_name: form.brand_name.trim(),
  brand_email: form.brand_email.trim(),
  password: form.password,
  brand_address: form.brand_address.trim(),
  website_or_social_link: formatWebsite(form.website_or_social_link),
  // 💡 THE FIX: Wrap the string in an array
  industry: [form.industry.trim()], 
  role: "brand"
};

  console.log("FINAL ATTEMPT PAYLOAD:", payload);

  await toast.promise(
    mutateAsync(payload as any),
    {
      loading: "Creating brand account...",
      success: (data) => {
        generateOtp({ email: form.brand_email } as any);
        router.push(`/verify-email?email=${form.brand_email}&role=brand`);
        return "Account created! Check email for OTP.";
      },
      error: (err: any) => {
        const details = err?.response?.data?.detail;
        if (Array.isArray(details)) {
          // This will log the path, e.g., ["body", "industry"] 
          // or ["body", "brand_data", "industry"]
          details.forEach((error: any, index: number) => {
            console.error(`ERROR ${index}:`, error.loc, error.msg);
          });
          return `Backend says: ${details[0].msg} at ${details[0].loc.join('.')}`;
        }
        return "Signup failed";
      }
    }
  );
};

  return (
    <motion.form onSubmit={handleSubmit} className="flex flex-col" variants={variants?.itemVariants}>
      <CustomInput
        label="Brand Name"
        placeholder="Brand name"
        value={form.brand_name}
        onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
      />

      <CustomInput
        label="Brand Email"
        type="email"
        placeholder="Email Address"
        value={form.brand_email}
        onChange={(e) => setForm({ ...form, brand_email: e.target.value })}
        required
      />

      <CustomInput
        label="Brand Address"
        placeholder="Physical address"
        value={form.brand_address}
        onChange={(e) => setForm({ ...form, brand_address: e.target.value })}
      />

      <CustomInput
        label="Website or Social Link"
        placeholder="example.com"
        value={form.website_or_social_link}
        onChange={(e) => setForm({ ...form, website_or_social_link: e.target.value })}
        required
      />

      <CustomInput
        label="Industry"
        placeholder="e.g. Technology"
        value={form.industry}
        onChange={(e) => setForm({ ...form, industry: e.target.value })}
        required
      />

      <CustomInput
        label="Password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <CustomInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <motion.div className="mt-9">
        <motion.button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full py-4 font-medium text-white bg-dark-navy flex items-center justify-center"
        >
          {isPending ? <Loader /> : "Sign Up"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default BrandSignup;