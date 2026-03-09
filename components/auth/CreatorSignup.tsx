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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Based on your backend's behavior with Brand, 
// these keys are the most likely suspects for the 422 error.
const initialForm = {
  full_name: "",   // Changed from full_name
  email: "",  // Changed from email
  password: "",
  phone_number: "",
};

type CreatorSignupProps = {
  setIsGoogleAuth: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
};

const CreatorSignup = ({ role }: CreatorSignupProps) => {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutateAsync, isPending } = useCreatorSignup();
  const { mutate: generateOtp } = useGenerateOtp();

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Basic Validation
    if (!form.full_name || !form.email || !form.password) {
      return toast.error("Please fill all required fields");
    }

    if (!validatePassword(form.password)) {
      return toast.error("Password is too weak (needs Uppercase, Lowercase, Number, and Special Char)");
    }

    if (form.password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    await toast.promise(
      mutateAsync(form as any),
      {
        loading: "Creating creator account...",
        success: () => {
          // Trigger OTP using the specific key the backend likely uses
          generateOtp({
            email: form.email,
            purpose: "email_verification",
          } as any);

          router.push(`/verify-email?email=${form.email}&role=creator`);
          return "Signup successful! Check your email.";
        },
        error: (err: any) => {
          const details = err?.response?.data?.detail;
          
          if (Array.isArray(details)) {
            // This will show you exactly which 2 fields are failing in the toast
            const errorFields = details.map((d: any) => d.loc[d.loc.length - 1]).join(" and ");
            console.error("BACKEND SAYS THESE FIELDS ARE WRONG:", details);
            return `Backend needs: ${errorFields}`;
          }
          
          return "Signup failed. Check the console.";
        },
      }
    );
  };

  return (
    <motion.div className="flex flex-col gap-6" variants={variants?.itemVariants}>
      
      <CustomInput
        label="Full Name"
        placeholder="John Doe"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />

      <CustomInput
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-2 text-dark-navy">Mobile Number</label>
        <PhoneInput
          international
          defaultCountry="NG"
          value={form.phone_number}
          onChange={(val) => setForm({ ...form, phone_number: val || "" })}
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-dark-navy"
        />
      </div>

      <CustomInput
        label="Password"
        type="password"
        placeholder="Create password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <CustomInput
        label="Confirm Password"
        type="password"
        placeholder="Retype password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <motion.div className="mt-4">
        <motion.button
          disabled={isPending}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full rounded-full py-4 font-medium text-white bg-dark-navy disabled:opacity-60"
        >
          {isPending ? <Loader /> : "Create Account"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CreatorSignup;