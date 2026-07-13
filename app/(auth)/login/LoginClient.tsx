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

const Page = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();
  const { mutateAsync: login, isPending: isLoading } = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });

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
    if (!form.email || !form.password) return toast.error("Fields cannot be empty");

    try {
      const res = await toast.promise(
        login({ email: form.email, password: form.password }),
        {
          loading: "Signing in...",
          success: "Signed in successfully ✅",
          error: "Invalid login credentials",
        }
      );
      
      // localStorage.setItem("token", res.access_token);
      router.push(res.user_type === "brand" ? "/brand" : "/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-6 py-6">
      <motion.div 
        className="w-full max-w-[600px]" 
        variants={variants?.containerVariants} 
        initial="hidden" animate="visible"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <motion.div className="flex flex-col items-center" variants={variants?.itemVariants}>
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
