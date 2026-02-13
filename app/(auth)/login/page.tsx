/* eslint-disable @typescript-eslint/no-explicit-any */
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

type FormProps = {
  email: string;
  password: string;
};

const Page = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // "brand" | null

  const router = useRouter();
  const { mutateAsync, isPending: isLoading } = useLogin();

  const redirectAfterLogin = () => {
    if (typeof window === "undefined") return;

    const savedRole = localStorage.getItem("loginRole");
    const finalRole = role || savedRole;

    if (finalRole === "brand") {
      router.push("/brand");
    } else {
      router.push("/dashboard");
    }
  };

  const initialForm: FormProps = { email: "", password: "" };
  const [form, setForm] = useState<FormProps>(initialForm);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      await toast.promise(
        mutateAsync({ email: form.email, password: form.password }),
        {
          loading: "Signing in...",
          success: "Signed in successfully ✅",
          error: (err: any) =>
            `Signin failed: ${
              err?.response?.data?.detail ||
              err?.message ||
              "Something went wrong"
            }`,
        }
      );

      setForm(initialForm);
      redirectAfterLogin();
    } catch (err) {
      console.log("SignIn Error:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] w-full flex items-center justify-center px-6 py-6 md:px-8">
      <motion.div
        className="w-full max-w-[520px] bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8"
        variants={variants?.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* HEADER */}
          <motion.div className="flex flex-col gap-2" variants={variants?.itemVariants}>
            <h3 className="font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-secondary-100">
              Welcome back
            </h3>
            <p className="text-neut/60 text-sm sm:text-base font-light">
              Login to continue to your dashboard.
            </p>
          </motion.div>

          {/* SSO */}
          <motion.div variants={variants?.itemVariants}>
            <SSOButtons
              onGoogleSign={() => {
                if (typeof window !== "undefined") {
                  const selectedRole = role === "brand" ? "brand" : "creator";
                  localStorage.setItem("loginRole", selectedRole);
                }
                redirectAfterLogin();
              }}
            />
          </motion.div>

          {/* DIVIDER */}
          <motion.div variants={variants?.itemVariants} className="flex items-center gap-4">
            <div className="h-px bg-gray-200 w-full" />
            <span className="text-xs text-gray-400 whitespace-nowrap">
              or continue with email
            </span>
            <div className="h-px bg-gray-200 w-full" />
          </motion.div>

          {/* INPUTS */}
          <motion.div variants={variants?.itemVariants} className="flex flex-col gap-4">
            <CustomInput
              label="Email Address"
              type="email"
              placeholder="e.g johndoe@email.com"
              value={form.email}
              onChange={(e: any) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <CustomInput
              label="Password"
              type="password"
              placeholder="Minimum of 8 characters"
              value={form.password}
              onChange={(e: any) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-dark-navy font-light hover:text-dark-navy/80"
              >
                Forgot password?
              </a>
            </div>
          </motion.div>

          {/* SUBMIT */}
          <motion.div variants={variants?.itemVariants} className="flex flex-col gap-4">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full py-3.5 md:py-4 font-medium text-white bg-dark-navy border border-dark-navy hover:bg-white hover:text-dark-navy disabled:opacity-60"
            >
              {isLoading ? <Loader /> : "Login"}
            </motion.button>

            <p className="text-center text-sm sm:text-base font-light text-neut/60">
              Don’t have an account?{" "}
              <a
                href={`/signup${role === "brand" ? "?role=brand" : ""}`}
                className="text-dark-navy font-normal hover:underline"
              >
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
