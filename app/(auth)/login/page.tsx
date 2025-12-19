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

  // const { mutate, isSuccess, isError, error, data } = useLogin();

  const [form, setForm] = useState<FormProps | any>(initialForm);

  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useLogin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent form default submit

    setIsLoading(true)

    if (!form?.email || !form?.password) {
      console.log("Email or password is missing");
      return;
    }

    await toast.promise(
      mutateAsync({
        email: form.email,
        password: form.password,
      }),
      {
        loading: "Signing in...",
        success: () => {
          setForm(initialForm); // ✅ clear form
          router.push('/dashboard')
          return "Signed in successfully ✅";
        },
        error: (err: any) => {
          console.log("SignIn Error:", err); // ✅ log the full error object

          return `Signin failed: ${err.response.data.detail}`;
        },
      }
    );

    setIsLoading(false)
  };


  return (

    <motion.div
      className="max-md:p-2 p-5 flex flex-col justify-between h-full gap-4"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >


      {/* Form */}
      <motion.div
        className="flex flex-col"
        variants={variants?.itemVariants}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col gap-1 mb-12"
          variants={variants?.itemVariants}
        >
          <h3 className="font-medium text-5xl leading-9 tracking-[0.02rem]">Welcome back</h3>
          {/* <p className="text-[#666666]">Login to continue</p> */}
        </motion.div>

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

        <a
          href="/forgot-password"
          className="ml-auto text-dark-navy font-light max-md:text-xs"
        >
          forgot password?
        </a>


      </motion.div>

      <motion.div className="">
        <motion.button
          variants={variants?.itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn bg-dark-navy !py-4 w-full text-white"
          onClick={handleSubmit}
        >
          {isLoading ? <Loader /> : " Login"}
        </motion.button>

        <motion.div
          className=" flex flex-col gap-3.5  mt-3"
          variants={variants?.itemVariants}
        >
          <p className="max-md:text-xs text-lg font-light text-center text-neut/60">
            Don’t have an account?{" "}
            <a href="/signup" className="text-dark-navy font-normal ml-1">
              Sign up
            </a>
          </p>
        </motion.div>
      </motion.div>

    </motion.div>

  );
};

export default Page;
