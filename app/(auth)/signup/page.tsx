/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import SSOButtons from "@/components/auth/SSOButtons";
import CustomInput from "@/components/CustomInput";
import Personalize from "@/components/auth/Personalize";

import { motion } from "framer-motion";
import { variants } from "@/constant";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

type FormProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const page = () => {
  const [form, setForm] = useState<FormProps | any>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isGoogleAuth, setIsGoogleAUth] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    router.push("/verify-account");
  };

  if (isGoogleAuth)
    return <Personalize onBack={() => setIsGoogleAUth(false)} />;
  return (
    <motion.div
      className="max-md:p-2 p-5 flex flex-col gap-4 "
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="flex flex-col gap-1"
        variants={variants?.itemVariants}
      >
        <h3 className="font-medium text-2xl leading-9">Create Your Account</h3>
        <p className="text-[#666666]">Let’s get you started in 2 mins</p>
      </motion.div>

      <motion.div
        className="flex flex-col gap-5"
        variants={variants?.itemVariants}
      >
        <SSOButtons onGoogleSign={() => setIsGoogleAUth(true)} />

        <CustomInput
          label="First Name"
          placeholder=" John"
          value={form?.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <CustomInput
          label="Last Name"
          placeholder=" Doe"
          value={form?.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <CustomInput
          label="Email Address"
          type="email"
          placeholder="e.g Johndoe@gmail.com"
          value={form?.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <CustomInput
          label="Password"
          type="password"
          placeholder="minimum of 8 characters"
          value={form?.password}
          // onChange={() => {}}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="flex items-center gap-3 my-3">
          <input type="checkbox" className="size-4" />
          <p className="text-[#333333] text-sm">
            I agree to the Terms & conditions{" "}
          </p>
        </div>

        <motion.button
          variants={variants?.itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn bg-secondary-300 w-full text-white"
          onClick={handleSubmit}
        >
          {isLoading ? <Loader /> : "Sign up."}
        </motion.button>

        <motion.div className="-mt-1 flex flex-col gap-3.5">
          <a
            href="/forgot-password"
            className="ml-auto text-[#666666] font-extralight"
          >
            forgot password?
          </a>

          <p className="font-mono text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-secondary-300 font-semibold">
              Login
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default page;
