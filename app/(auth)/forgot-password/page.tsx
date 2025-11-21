/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { motion } from "framer-motion";
import { variants } from "@/constant";

const page = () => {
  const [email, setEmail] = useState("");
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
        <h3 className="font-medium text-2xl leading-9">Forgot password</h3>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
