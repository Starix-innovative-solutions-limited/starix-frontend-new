/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import LeaderboardAnalytics from "@/components/dashboard/LeaderboardAnalytics";
import { variants } from "@/constant";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import React from "react";
import ReportingAnalytics from "@/components/dashboard/ReportingAnalytics";

const Page = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = [
    {
      label: "Analytics",
      Component: <LeaderboardAnalytics />,
    },

    {
      label: "Reporting",
      Component: <LeaderboardAnalytics />,
    },
  ];
  return (
    <div className="min-h-screen ">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className="mx-auto flex flex-col gap-7 bg-[#FEFEFE]"
      >
        {/* Header */}
        <motion.div
          variants={variants?.headerVariants}
          className="flex max-md:flex-col justify-between md:items-center"
        >
          <div className="flex items-center max-md:gap-2 gap-8 ">
            {tabs?.map((item: any, i: number) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center max-md:text-lg text-xl pr-4 py-2 md:font-mono rounded-lg transition-colors ${
                  i == activeTab
                    ? "text-secondary-300 underline leading-20"
                    : "text-[#999999]"
                }`}
                key={i}
                onClick={() => setActiveTab(i)}
              >
                {item?.label}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <motion.select
              className="input"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={variants?.itemVariants}
            >
              <option value="This month">This month</option>
            </motion.select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Upload className="w-3 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

        <motion.div>
          {activeTab == 0 ? <LeaderboardAnalytics /> : <ReportingAnalytics />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
