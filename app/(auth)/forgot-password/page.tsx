/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useGenerateOtp, useResetPassword } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import OtpInput from "@/components/auth/OtpInput";
import { useRouter } from "next/navigation";


const page = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<any | null>("")
  const [password, setPassword] = useState<string | any>("");

  const router = useRouter()

  const { mutateAsync: generateOtp, isSuccess: otpSuccess } = useGenerateOtp()

  const { mutateAsync: resetPassowrd } = useResetPassword()


  const handleReset = async (e?: React.FormEvent) => {
    e?.preventDefault();

    await toast.promise(
      resetPassowrd({
        email: `${email}`,
        otp_code: otp,
        new_password: password
      }),
      {
        loading: "Verify account...",
        success: () => {
          setOtp("");
          router.push('/login');
          return "Account verified ✅";
        },
        error: (err) => {
          return `Signup failed: ${err.response?.data?.detail || "Something went wrong"}`;
        },
      }
    );
  }


  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();

    await toast.promise(
      generateOtp({
        email: `${email}`,
        purpose: "password_reset"
      }),
      {
        loading: "Sending OTP...",
        success: () => {
          // router.push('/login');
          return "Otp sent ✅";
        },
        error: (err) => {
          return `Signup failed: ${err.response?.data?.detail || "Something went wrong"}`;
        },
      }
    );
  };
  return (
    <motion.div
      className="max-md:p-2 p-5 flex flex-col gap-4 "
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="flex flex-col gap-1 md:gap-3 "
        variants={variants?.itemVariants}
      >
        <h3 className="font-medium text-3xl leading-9">Forgot password ??</h3>
        <p className="text-[#666666]">
          A reset password link would be sent to your email address
        </p>
      </motion.div>

      <motion.form
        action=""
        className="flex flex-col gap-7"
        variants={variants?.itemVariants}
      >
        <CustomInput
          label=" "
          type="email"
          placeholder="e.g Johndoe@gmail.com"
          disabled={otpSuccess}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {
          otpSuccess && (
            <>
              <OtpInput length={6} value={otp} onChange={(c) => setOtp(c)} className="overflow-x-hidden" />

              <CustomInput
                label="New Password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>)
        }




        {
          otpSuccess ? (
            <motion.button
              variants={variants?.itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn bg-dark-navy w-full text-white "
              onClick={handleReset}
            >
              Reset Password
            </motion.button>
          ) : (
            <motion.button
              variants={variants?.itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn bg-dark-navy w-full text-white "
              onClick={handleSendOtp}
            >
              Request Otp
            </motion.button>
          )
        }
      </motion.form>
    </motion.div>
  );
};

export default page;
