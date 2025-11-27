/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import LinearGradientBorder from "@/components/ui/LinearGradientBorder";
import { CiCreditCard2 } from "react-icons/ci";
import ChallengeGrid from "@/components/dashboard/creator/ChallengeGrid";

const page = () => {
  const challenges = [
    {
      category: "All",
      text: "150",
    },
    {
      category: "Ongoing",
      text: "150",
    },
    {
      category: "Past",
      text: "150",
    },
  ];
  return (
    <div className="min-h-screen">

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className="mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={variants?.headerVariants}
          className="flex justify-between items-center mb-8"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 py-2 text-4xl font-bold hover:bg-gray-100 transition-colors text-secondary-100 "
          >
            Challenges
          </motion.span>
        </motion.div>

      </motion.div>


      <div className="grid grid-cols-3 gap-6">
        {
          challenges?.map((item: any, i: number) => (
            <LinearGradientBorder key={i}>
              <div className="flex items-start justify-between py-2 px-4">
                <div className="flex flex-col gap-2">
                  <span className="text-dark text-sm">
                    {item?.category}&nbsp;challenges
                  </span>
                  <p className="text-2xl text-secondary-100">
                    {item?.text}
                  </p>
                </div>

                <span>
                  <CiCreditCard2 className="text-secondary-100" />
                </span>
              </div>
            </LinearGradientBorder>
          ))
        }
      </div>

      <ChallengeGrid />


    </div>
  );
};

export default page;
