/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SSOButtons from "@/components/auth/SSOButtons";
import CustomInput from "@/components/CustomInput";
import { variants } from "@/constant";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useLogin } from "@/hooks/useAuth";
import toast from "react-hot-toast";

type FormProps = {
  email: string;
  password: string;
};

const Page = () => {
  const router = useRouter();
  const { mutateAsync, isPending: isLoading } = useLogin();

  const initialForm: FormProps = { email: "", password: "" };
  const [form, setForm] = useState<FormProps>(initialForm);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      const res: any = await toast.promise(
        mutateAsync({ email: form.email, password: form.password }),
        {
          loading: "Signing in...",
          success: "Signed in successfully ✅",
          error: (err: any) =>
            `Signin failed: ${err?.response?.data?.detail || err?.message || "Something went wrong"}`,
        }
      );

      setForm(initialForm);

      if (res?.user_type === "brand") return router.push("/brand");
      if (res?.user_type === "creator") return router.push("/dashboard");

      router.push("/dashboard");
    } catch (err) {
      console.log("SignIn Error:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] w-full flex items-center justify-center px-4 py-6 md:px-8">
      {/* Card */}
      <motion.div
        className="
          w-full
          max-w-[520px]
          bg-white
          border border-gray-100
          rounded-2xl
          shadow-sm
          p-4 sm:p-6 md:p-8
        "
        variants={variants?.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <motion.div className="flex flex-col gap-2" variants={variants?.itemVariants}>
            <h3 className="font-medium text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[0.02rem] text-secondary-100">
              Welcome back
            </h3>
            <p className="text-neut/60 text-sm sm:text-base font-light">
              Login to continue to your dashboard.
            </p>
          </motion.div>

          {/* SSO */}
          <motion.div variants={variants?.itemVariants} className="w-full">
            <SSOButtons onGoogleSign={() => router.push("/dashboard")} />
          </motion.div>

          {/* Divider */}
          <motion.div variants={variants?.itemVariants} className="flex items-center gap-4">
            <div className="h-px bg-gray-200 w-full" />
            <span className="text-xs text-gray-400 whitespace-nowrap">or continue with email</span>
            <div className="h-px bg-gray-200 w-full" />
          </motion.div>

          {/* Inputs */}
          <motion.div variants={variants?.itemVariants} className="flex flex-col gap-4">
            <CustomInput
              label="Email Address"
              type="email"
              placeholder="e.g johndoe@email.com"
              value={form.email}
              onChange={(e: any) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            />

            <CustomInput
              label="Password"
              type="password"
              placeholder="Minimum of 8 characters"
              value={form.password}
              onChange={(e: any) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            />

            <div className="flex items-center justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-dark-navy font-light hover:text-dark-navy/80 transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div variants={variants?.itemVariants} className="flex flex-col gap-4">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
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
              {isLoading ? <Loader /> : "Login"}
            </motion.button>

            <p className="text-center text-sm sm:text-base font-light text-neut/60">
              Don’t have an account?{" "}
              <a href="/signup" className="text-dark-navy font-normal hover:underline">
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
