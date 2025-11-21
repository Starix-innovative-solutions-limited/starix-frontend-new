/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import OtpInput from "@/components/auth/OtpInput";

import { motion } from "framer-motion";
import { variants } from "@/constant";

const page = () => {
  const [otp, setOtp] = useState("");
  return (
    <motion.div
      className="max-md:p-2 p-5 flex flex-col gap-4 overflow-x-hidden"
      variants={variants?.containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="flex flex-col gap-1"
        variants={variants?.itemVariants}
      >
        <h3 className="font-medium text-2xl leading-9">Verify your account</h3>
        <p className="text-[#666666]">
          A 6 digit code has been sent to your email
        </p>
      </motion.div>
      <motion.form
        action=""
        className="flex flex-col gap-7 overflow-hidden"
        variants={variants?.itemVariants}
      >
        <OtpInput
          length={6}
          value={otp}
          onChange={(c) => setOtp(c)}
          className="overflow-x-hidden"
        />
        <motion.button
          variants={variants?.itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn bg-secondary-300 w-full text-white "
        >
          Reset Password
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default page;
