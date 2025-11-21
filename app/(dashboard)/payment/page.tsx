/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { variants } from "@/constant";
import { Plus, Upload } from "lucide-react";
import { StatCard } from "@/components/dashboard";
import { MotionTable } from "@/components/dashboard/MotionTable";
import Image from "next/image";

import { useModal } from "@/components/GlobalModal";
import AddCard from "@/components/dashboard/AddCard";

type Transaction = {
  id: string;
  service: string;
  date: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
};

const transactionsData: Transaction[] = [
  {
    id: "TXN-8723",
    service: "Airtime Purchase",
    date: "Oct 4, 2025",
    amount: "₦1,500",
    status: "Success",
  },
  {
    id: "TXN-9831",
    service: "Electricity Bill",
    date: "Oct 3, 2025",
    amount: "₦12,000",
    status: "Failed",
  },
  {
    id: "TXN-4554",
    service: "Data Subscription",
    date: "Oct 2, 2025",
    amount: "₦3,000",
    status: "Pending",
  },
  {
    id: "TXN-3433",
    service: "Cable Subscription",
    date: "Oct 1, 2025",
    amount: "₦6,500",
    status: "Success",
  },
  {
    id: "TXN-9932",
    service: "School Fees",
    date: "Sep 28, 2025",
    amount: "₦25,000",
    status: "Pending",
  },
  {
    id: "TXN-5577",
    service: "Wallet Funding",
    date: "Sep 27, 2025",
    amount: "₦10,000",
    status: "Success",
  },
];

const Page = () => {
  const [page, setPage] = useState(1);
  const perPage = 3;
  const totalPages = Math.ceil(transactionsData.length / perPage);
  const currentData = transactionsData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const { open } = useModal();

  return (
    <div className="min-h-screen ">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className="mx-auto flex flex-col gap-7"
      >
        {/* Header */}
        <motion.div
          variants={variants?.headerVariants}
          className="flex justify-between items-center"
        >
          <motion.h3
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center max-md:text-lg text-xl gap-2 pr-4 py-2 font-mono rounded-lg transition-colors"
          >
            Billing & payments
          </motion.h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Upload className="w-3 h-4" />
            Export
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={variants?.containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              title: "Escrow Balance",
              value: "1,200,780",
              // subtitle: "This month",
              bgColor: "bg-[#F4FFED]",
            },
            {
              title: "Total Submissions",
              value: "600,809",
              // subtitle: "This month",
              bgColor: "bg-[#EDF4FF]",
            },
            {
              title: "Engagement Reach",
              value: "1,600,000",
              // subtitle: "This month",
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

        <motion.div>
          <motion.div
            variants={variants?.headerVariants}
            className="flex justify-between items-center my-8"
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center max-md:text-lg text-xl gap-2 pr-4 py-2 font-mono rounded-lg  transition-colors"
            >
              Add Payment Methods
            </motion.h3>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex border border-secondary-200 text-secondary-300 items-center gap-2 py-2  hover:bg-gray-100 rounded px-6 transition-colors"
              onClick={() => open(<AddCard />)}
            >
              <Plus className="w-4 h-4 text-secondary-300" />
              Add Card
            </motion.button>
          </motion.div>
          <div className="flex items-center gap-6">
            {["visa.png", "master.png"]?.map((item: any, i: number) => (
              <div
                className="flex items-center justify-center gap-6 border border-gray-200 px-6 p-4"
                key={i}
              >
                <Image
                  src={`/images/${item}`}
                  width={100}
                  height={100}
                  alt="master"
                />
                <h3>2348**********5689</h3>
                <input type="radio" name="icon" />
              </div>
            ))}
          </div>
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
              className="text-sm font-medium text-gray-900"
            >
              Transaction history
            </motion.h2>
          </div>
          <div className="overflow-x-auto">
            <MotionTable
              headers={[
                "Transaction ID",
                "Service",
                "Date",
                "Amount",
                "Status",
              ]}
              data={currentData}
              rowVariants={variants?.tableRowVariants}
              emptyMessage="No transactions found 🚫"
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              renderRow={(txn, index) => (
                <motion.tr
                  key={txn.id}
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
                  <td className="py-4 px-4 text-sm text-gray-900">{txn.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {txn.service}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {txn.date}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {txn.amount}
                  </td>
                  <td className="py-4 px-4">
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                      className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full `}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          txn.status === "Success"
                            ? "bg-green-600"
                            : txn.status === "Pending"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                      />
                      {txn.status}
                    </motion.span>
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
