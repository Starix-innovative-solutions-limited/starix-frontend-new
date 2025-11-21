/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { TrendingUp, Filter, Plus, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  StatCard,
  ActivityItem,
  EngagementChart,
} from "@/components/dashboard";
import { activities, challenges } from "@/constant";
import { variants } from "@/constant";
import { MotionTable } from "@/components/dashboard/MotionTable";

const Page = () => {
  return (
    <div className="min-h-screen ">
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 0.5 }}
              whileHover={{ rotate: 90 }}
            >
              <Plus className="w-4 h-4" />
            </motion.div>
            Create Challenge
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={variants?.containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              title: "Active Challenges",
              value: "10",
              subtitle: "This month",
              bgColor: "bg-[#F4FFED]",
            },
            {
              title: "Total Submissions",
              value: "150",
              subtitle: "This month",
              bgColor: "bg-[#EDF4FF]",
            },
            {
              title: "Engagement Reach",
              value: "15,000",
              subtitle: "This month",
              bgColor: "bg-[#F3EDFF]",
            },
            {
              title: "Budget Spent",
              value: "#500,000",
              subtitle: "This month",
              bgColor: "bg-[#FFEDFD]",
            },
          ].map((stat, i) => (
            <motion.div key={i} variants={variants?.itemVariants}>
              <motion.div
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <StatCard {...stat} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart and Activity */}
        <motion.div
          variants={variants?.containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            variants={variants?.itemVariants}
            className="lg:col-span-2 shadow border border-gray-200"
            whileHover={{
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <EngagementChart />
          </motion.div>
          <motion.div
            variants={variants?.itemVariants}
            whileHover={{
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              transition: { duration: 0.3 },
            }}
            className="bg-white rounded border border-gray-200 shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Activity</h3>
              <motion.button
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400 hover:text-gray-600"
              >
                <Info className="w-4 h-4" />
              </motion.button>
            </div>
            <motion.div
              variants={variants?.containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              {activities.map((activity, i) => (
                <motion.div
                  key={i}
                  variants={variants?.itemVariants}
                  whileHover={{
                    x: 5,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                >
                  <ActivityItem text={activity.text} time={activity.time} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Challenges Table */}
        <motion.div
          variants={variants?.itemVariants}
          whileHover={{
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
            transition: { duration: 0.3 },
          }}
          className="bg-white rounded-lg border border-gray-200 shadow overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-medium text-gray-900"
            >
              Challenges Overview
            </motion.h2>
          </div>
          <div className="overflow-x-auto">
            <MotionTable
              headers={[
                "Challenge",
                "Status",
                "Submissions",
                "Engagements",
                "Budget",
              ]}
              data={challenges}
              rowVariants={variants?.tableRowVariants}
              renderRow={(challenge, index) => (
                <motion.tr
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={variants?.tableRowVariants}
                  whileHover={{
                    backgroundColor: "rgba(249, 250, 251, 1)",
                    transition: { duration: 0.2 },
                  }}
                  className="border-b border-gray-100"
                >
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {challenge.name}
                  </td>
                  <td className="py-4 px-4">
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                      className={`inline-flex items-center gap-1 text-sm ${
                        challenge.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className={`w-2 h-2 rounded-full ${
                          challenge.status === "Active"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      />
                      {challenge.status}
                    </motion.span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {challenge.submissions}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                      </motion.div>
                      <span className="text-sm text-gray-900">
                        {challenge.engagements}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {challenge.budget}
                  </td>
                </motion.tr>
              )}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
