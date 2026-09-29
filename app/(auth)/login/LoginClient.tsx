"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SSOButtons from "@/components/auth/SSOButtons";
import CustomInput from "@/components/CustomInput";
import { variants } from "@/constant";
import Loader from "@/components/Loader";
import { useLogin } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { startGoogleAuth } from "@/lib/auth";
import Image from "next/image";

const Page = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const emailFromQuery = searchParams.get("email")?.trim().toLowerCase() || "";
  const router = useRouter();
  const { mutateAsync: login, isPending: isLoading } = useLogin();
  const [form, setForm] = useState({ email: emailFromQuery, password: "" });

  const handleGoogleLogin = async () => {
    try {
      const selectedRole = role === "brand" ? "brand" : "creator";
      await startGoogleAuth(selectedRole, "login");
    } catch (err: any) {
      console.error("GOOGLE LOGIN ERROR:", err.response?.data || err.message);
      toast.error("Unable to connect to Google Login.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      return toast.error("Fields cannot be empty");
    }

    try {
      const res = await toast.promise(
        login({ email, password }),
        {
          loading: "Signing in...",
          success: "Signed in successfully",
          error: (err: any) => {
            const status = err?.response?.status;
            const detail = err?.response?.data?.detail;

            if (status === 429) {
              return "Too many attempts. Try again later.";
            }
            if (status === 401) {
              if (typeof detail === "string" && detail.toLowerCase().includes("deactivat")) {
                return "Account is deactivated";
              }
              return typeof detail === "string"
                ? detail
                : "Invalid email or password";
            }
            if (Array.isArray(detail)) return detail[0]?.msg || "Validation error";
            if (typeof detail === "string") return detail;
            return "Login failed. Please try again.";
          },
        }
      );

      const userType = res.user?.user_type;

      const needsOnboarding =
        userType === "creator" &&
        (!res.user?.username ||
          !res.user?.bio ||
          !res.user?.profile_picture_url);

      router.push(
        userType === "brand"
          ? "/brand-onboarding"
          : needsOnboarding
            ? "/onboarding"
            : "/dashboard"
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-12 md:px-8 md:py-10 xl:px-2 xl:py-12">
      <motion.div 
        className="w-full max-w-[600px] md:max-w-none xl:max-w-[600px]" 
        variants={variants?.containerVariants} 
        initial="hidden" animate="visible"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <motion.div className="flex flex-col items-center" variants={variants?.itemVariants}>
            <div className="mb-8 flex justify-center">
              <Image
                src="/contact star.webp"
                alt="Starix Logo"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            <h3 className="font-medium text-3xl sm:text-4xl leading-tight text-secondary-100">
              Welcome back
            </h3>
          </motion.div>

          <motion.div variants={variants?.itemVariants}>
            <SSOButtons onGoogleSign={handleGoogleLogin} />
          </motion.div>

          <motion.div variants={variants?.itemVariants} className="flex items-center gap-4">
            <div className="h-px  w-full" />
            <span className="text-xs text-gray-400 whitespace-nowrap">or continue with email</span>
            <div className="h-px w-full" />
          </motion.div>

          <motion.div variants={variants?.itemVariants} className="flex flex-col gap-4">
            <CustomInput
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e: any) => setForm(p => ({ ...p, email: e.target.value }))}
            />
            <CustomInput
              label="Password"
              type="password"
              value={form.password}
              onChange={(e: any) => setForm(p => ({ ...p, password: e.target.value }))}
            />
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-dark-navy hover:underline">
                Forgot password?
              </a>
            </div>
          </motion.div>

          <motion.div variants={variants?.itemVariants} className="flex flex-col gap-4">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full py-4 font-medium text-white bg-[#0033FF] hover:shadow-sm transition-all"
            >
              {isLoading ? <Loader /> : "Login"}
            </motion.button>
            <p className="text-center text-sm font-light text-neut/60">
              Don’t have an account?{" "}
              <a href={`/signup${role === "brand" ? "?role=brand" : ""}`} className="text-dark-navy font-normal hover:underline">
                Sign up
              </a>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Page;
