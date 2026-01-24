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
  const initialForm: FormProps = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState<FormProps>(initialForm);

  const { mutateAsync, isPending: isLoading } = useLogin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      const res = await toast.promise(
        mutateAsync({
          email: form.email,
          password: form.password,
        }),
        {
          loading: "Signing in...",
          success: "Signed in successfully ✅",
          error: (err: any) =>
            `Signin failed: ${err?.response?.data?.detail || err?.message || "Something went wrong"}`,
        }
      );

      // Clear the form (optional)
      setForm(initialForm);

      // ✅ Redirect ONCE (after successful login)
      if (res?.user_type === "brand") {
        router.push("/brand");
        return;
      }
      if (res?.user_type === "creator") {
        router.push("/dashboard");
        return;
      }

      // Fallback if user_type is missing/unexpected
      router.push("/dashboard");
    } catch (err) {
      console.log("SignIn Error:", err);
    }
  };

  return (
    <motion.div
      className="max-md:p-2 p-5 flex flex-col justify-between h-full gap-4"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ✅ Use a real form so Enter key works and events are correct */}
      <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full gap-4">
        {/* Form Top */}
        <motion.div className="flex flex-col" variants={variants?.itemVariants}>
          {/* Header */}
          <motion.div className="flex flex-col gap-1 mb-12" variants={variants?.itemVariants}>
            <h3 className="font-medium text-3xl md:text-5xl leading-9 tracking-[0.02rem]">
              Welcome back
            </h3>
          </motion.div>

          {/* SSO */}
          <SSOButtons onGoogleSign={() => router.push("/dashboard")} />

          <CustomInput
            label="Email Address"
            type="email"
            placeholder="e.g Johndoe@gmail.com"
            value={form.email}
            onChange={(e: any) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="minimum of 8 characters"
            value={form.password}
            onChange={(e: any) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />

          <a href="/forgot-password" className="ml-auto text-dark-navy font-light max-md:text-xs">
            forgot password?
          </a>
        </motion.div>

        {/* Form Bottom */}
        <motion.div className="mt-9">
          <motion.button
            type="submit"
            variants={variants?.itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
            className="btn bg-dark-navy !py-4 w-full text-white"
          >
            {isLoading ? <Loader /> : "Login"}
          </motion.button>

          <motion.div className="flex flex-col gap-3.5 mt-3" variants={variants?.itemVariants}>
            <p className="max-md:text-xs text-lg font-light text-center text-neut/60">
              Don’t have an account?{" "}
              <a href="/signup" className="text-dark-navy font-normal ml-1">
                Sign up
              </a>
            </p>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Page;
