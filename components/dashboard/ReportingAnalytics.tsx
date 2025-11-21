import { variants } from "@/constant";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import React, { useState } from "react";
import EngagementChart from "./EngagementChart";
import { MotionTable } from "./MotionTable";
import StatCard from "./StatCard";

const ReportingAnalytics = () => {
  const challenges = [
    {
      name: "Campus Innovators Challenge",
      status: "Active",
      submissionDate: "2025-10-03",
      comments: "Great participation so far!",
    },
    {
      name: "Tech for Good Hackathon",
      status: "Closed",
      submissionDate: "2025-09-21",
      comments: "Winners announced last week.",
    },
    {
      name: "AI in Education Sprint",
      status: "Active",
      submissionDate: "2025-10-01",
      comments: "Submissions open till next week.",
    },
    {
      name: "Green Energy Builders",
      status: "Active",
      submissionDate: "2025-09-30",
      comments: "Focus on renewable energy ideas.",
    },
    {
      name: "Campus Creators Cup",
      status: "Closed",
      submissionDate: "2025-09-10",
      comments: "Amazing creativity from students!",
    },
    {
      name: "HealthTech Revolution",
      status: "Active",
      submissionDate: "2025-10-05",
      comments: "Judging phase starting soon.",
    },
    {
      name: "Women in STEM Challenge",
      status: "Active",
      submissionDate: "2025-09-29",
      comments: "Encouraging female innovators.",
    },
    {
      name: "Blockchain for Impact",
      status: "Closed",
      submissionDate: "2025-08-25",
      comments: "Final reports being reviewed.",
    },
    {
      name: "Smart City Designathon",
      status: "Active",
      submissionDate: "2025-10-02",
      comments: "Urban innovation at its best.",
    },
    {
      name: "Climate Action Hack",
      status: "Closed",
      submissionDate: "2025-09-15",
      comments: "Excellent turnout and solutions!",
    },
    {
      name: "NextGen Robotics Jam",
      status: "Active",
      submissionDate: "2025-10-04",
      comments: "Workshops happening this weekend.",
    },
    {
      name: "EdTech Builder Week",
      status: "Closed",
      submissionDate: "2025-09-18",
      comments: "Top 5 projects shortlisted.",
    },
    {
      name: "FinTech Disruptors League",
      status: "Active",
      submissionDate: "2025-10-03",
      comments: "200+ teams registered already.",
    },
    {
      name: "Sustainable Design Sprint",
      status: "Closed",
      submissionDate: "2025-09-12",
      comments: "Certificates distributed to finalists.",
    },
    {
      name: "Open Innovation Marathon",
      status: "Active",
      submissionDate: "2025-10-05",
      comments: "Final presentation due next week.",
    },
  ];

  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(challenges?.length / perPage);
  const currentData = challenges?.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      {/* Stats Grid */}
      <motion.div
        variants={variants?.containerVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          {
            title: "Approved submission",
            value: "10",
            subtitle: "This month",
            bgColor: "bg-[#F4FFED]",
          },
          {
            title: "Pending Submissions",
            value: "150",
            subtitle: "This month",
            bgColor: "bg-[#EDF4FF]",
          },
          {
            title: "Total Submissions",
            value: "1500",
            subtitle: "This month",
            bgColor: "bg-[#F3EDFF]",
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
            <h3 className="text-sm font-medium text-gray-700">Filter</h3>
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
            className="space-y-2 mt-6 flex flex-col gap-4"
          >
            {/* <h3>vbjnkm,./</h3> */}

            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="block mb-1 font-medium text-[#666666] text-sm"
              >
                Filter by challenge
              </label>
              <select
                name=""
                id=""
                className="input border-[#99999966] text-[#444]"
              >
                <option>Challenge name.</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="block mb-1 font-medium text-[#666666] text-sm"
              >
                Filter by status
              </label>
              <select
                name=""
                id=""
                className="input border-[#99999966] text-[#444]"
              >
                <option>Approval status.</option>
              </select>
            </div>
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
            headers={["Challenge", "Status", "Submission Date", "Comments"]}
            data={currentData}
            rowVariants={variants?.tableRowVariants}
            // totalPages={10}

            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
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
                {/* Challenge */}
                <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                  {challenge.name}
                </td>

                {/* Status */}
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

                {/* Submission Date */}
                <td className="py-4 px-4 text-sm text-gray-900">
                  {challenge.submissionDate}
                </td>

                {/* Comments */}
                <td className="py-4 px-4 text-sm text-gray-900">
                  {challenge.comments}
                </td>
              </motion.tr>
            )}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ReportingAnalytics;
