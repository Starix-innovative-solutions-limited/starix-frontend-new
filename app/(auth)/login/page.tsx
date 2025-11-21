/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SSOButtons from "@/components/auth/SSOButtons";
import CustomInput from "@/components/CustomInput";
import { variants } from "@/constant";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

type FormProps = {
  email: string;
  password: string;
};

const Page = () => {
  const [form, setForm] = useState<FormProps>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    router.push("/dashboard");
  };

  return (
    <motion.div
      className="max-md:p-2 p-5 flex flex-col gap-4"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col gap-1"
        variants={variants?.itemVariants}
      >
        <h3 className="font-medium text-2xl leading-9">Welcome back,</h3>
        <p className="text-[#666666]">Login to continue</p>
      </motion.div>

      {/* Form */}
      <motion.div
        className="flex flex-col gap-7"
        variants={variants?.itemVariants}
      >
        <SSOButtons onGoogleSign={() => router.push("/dashboard")} />

        <CustomInput
          label="Email Address"
          type="email"
          placeholder="e.g Johndoe@gmail.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <CustomInput
          label="Password"
          type="password"
          // variants={itemVariants}
          placeholder="minimum of 8 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <motion.button
          variants={variants?.itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn bg-secondary-300 w-full text-white"
          onClick={handleSubmit}
        >
          {isLoading ? <Loader /> : " Login"}
        </motion.button>

        <motion.div
          className="-mt-1 flex flex-col gap-3.5"
          variants={variants?.itemVariants}
        >
          <a
            href="/forgot-password"
            className="ml-auto text-[#666666] font-extralight max-md:text-xs"
          >
            forgot password?
          </a>

          <p className="font-mono max-md:text-xs text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-secondary-300 font-semibold">
              Sign up
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
