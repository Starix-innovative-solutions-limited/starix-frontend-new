/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { variants } from "@/constant";
import { motion } from "framer-motion";
import React, { useState } from "react";
import CustomInput from "../CustomInput";
import Loader from "../Loader";
import { BrandSignupPayload } from "@/utils/type";
import { useBrandSignup } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Fashion",
  "Gaming",
  "Real Estate",
  "Education",
  "Travel",
  "Marketing",
  "Music",
  "Fitness",
  "Food & Beverage",
  "Beauty",
  "Sports",
  "E-commerce",
];

const initialForm: BrandSignupPayload = {
  email: "",
  password: "",
  brand_name: "",
  website: "",
  industry: [],
};
type BrandSignupProps = {
  setIsGoogleAuth: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
};


const BrandSignup = ({ setIsGoogleAuth, role }: BrandSignupProps) => {

  const [form, setForm] = useState<BrandSignupPayload>(initialForm);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [industryInput, setIndustryInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { mutateAsync, isPending } = useBrandSignup();
  const router = useRouter();

  
  /* ---------------- INDUSTRY LOGIC ---------------- */

  const filteredIndustries = INDUSTRIES.filter(
    (item) =>
      item.toLowerCase().includes(industryInput.toLowerCase()) &&
      !form.industry.includes(item)
  );

  const addIndustry = (industry: string) => {
    if (form.industry.length >= 4) return;

    setForm({
      ...form,
      industry: [...form.industry, industry],
    });

    setIndustryInput("");
    setShowDropdown(false);
  };

  const removeIndustry = (industry: string) => {
    setForm({
      ...form,
      industry: form.industry.filter((i) => i !== industry),
    });
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await toast.promise(mutateAsync(form), {
      loading: "Creating account...",
      success: () => {
        setForm(initialForm);
        setConfirmPassword("");
        router.push("/verify-email?role=brand");
        return "Account created successfully 🎉";
      },
      error: (err: any) => {
        return `Signup failed: ${err.response?.data?.detail || "Error"}`;
      },
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col"
      variants={variants?.itemVariants}
    >
      {/* BRAND NAME */}
      <CustomInput
        label="Brand Name"
        placeholder="Brand name"
        value={form.brand_name}
        onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
      />

      {/* EMAIL */}
      <CustomInput
        label="Brand Email"
        type="email"
        placeholder="Brand Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      {/* WEBSITE */}
      <CustomInput
        label="Website or Social Media Link"
        placeholder="https://example.com/"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
      />

      {/* INDUSTRY MULTI SELECT */}
      <div className="w-full relative mt-4">
        <label className="text-sm text-dark-navy mb-2 block">
          Industry (max 4)
        </label>

        <div className="w-full min-h-[56px] border border-gray-300 rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center focus-within:border-dark-navy transition bg-white">
          {form.industry.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-[#EEF1FF] text-[#1A1F6B] px-3 py-1 rounded-full text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => removeIndustry(item)}
                className="text-xs"
              >
                ✕
              </button>
            </div>
          ))}

          {form.industry.length < 4 && (
            <input
              value={industryInput}
              onChange={(e) => {
                setIndustryInput(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Add industry..."
              className="flex-1 outline-none text-sm min-w-[120px]"
            />
          )}
        </div>

        {showDropdown && filteredIndustries.length > 0 && (
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {filteredIndustries.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => addIndustry(item)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PASSWORD */}
      <CustomInput
        label="Password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {/* CONFIRM PASSWORD */}
      <CustomInput
        label="Retype Password"
        type="password"
        placeholder="Retype password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* SUBMIT */}
      <motion.div className="mt-9">
        <motion.button
          type="submit"
          variants={variants?.itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
                w-full
                rounded-full
                py-3.5 md:py-4
                font-medium
                text-white
                bg-dark-navy
                border border-dark-navy
                transition-all duration-200
                hover:bg-white hover:text-dark-navy
                hover:shadow-md
                disabled:opacity-60 disabled:cursor-not-allowed
                focus:outline-none
                focus:ring-2 focus:ring-dark-navy/20
              "
        >
          {isPending ? <Loader /> : "Sign Up"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};


