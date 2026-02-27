"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Payment = {
  brandName: string;
  category: string;
  amount: number;
  status: "PAID" | "PENDING";
  paymentMethod: string;
  payoutDate: string;
};

const EarningInsight = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Payouts", "Pending"];

  const payments: Payment[] = [
    { brandName: "Nivea Ltd", category: "Fashion", amount: 400, status: "PAID", paymentMethod: "Bank Transfer", payoutDate: "02/02/2023" },
    { brandName: "Nivea Ltd", category: "Fashion", amount: 400, status: "PENDING", paymentMethod: "PayPal", payoutDate: "02/02/2023" },
    { brandName: "Nivea Ltd", category: "Fashion", amount: 400, status: "PAID", paymentMethod: "Bank Transfer", payoutDate: "02/02/2023" },
    { brandName: "Nivea Ltd", category: "Fashion", amount: 400, status: "PAID", paymentMethod: "PayPal", payoutDate: "02/02/2023" },
  ];

  return (
    <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
      {/* HEADER & TABS */}
      <div className="border-b border-gray-100 mb-8">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative pb-4 px-2 text-sm font-medium transition-colors"
            >
              <span className={activeTab === tab ? "text-[#0A0A30]" : "text-gray-400"}>
                {tab === "All" ? (
                  <span className="bg-[#F9FAFB] px-6 py-2 rounded-full border border-gray-100">All</span>
                ) : (
                  tab
                )}
              </span>
              {/* Active Underline for non-pill tabs if needed, but the UI shows a pill for "All" */}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm font-normal">
              <th className="pb-6 font-normal">Brand Name</th>
              <th className="pb-6 font-normal">Category</th>
              <th className="pb-6 font-normal">Amount</th>
              <th className="pb-6 font-normal">Status</th>
              <th className="pb-6 font-normal">Payment Method</th>
              <th className="pb-6 font-normal">Payout Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.map((payment, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <td className="py-6 text-[16px] font-medium text-[#0A0A30]">
                  {payment.brandName}
                </td>
                <td className="py-6">
                  <span className="bg-orange-50/50 text-orange-400 text-xs px-3 py-1.5 rounded-md font-medium">
                    {payment.category}
                  </span>
                </td>
                <td className="py-6 text-[16px] font-normal text-[#0A0A30]">
                  ${payment.amount}
                </td>
                <td className="py-6">
                  <span className="bg-[#F9FAFB] text-gray-500 text-[10px] px-2 py-1 rounded-md font-bold tracking-tight border border-gray-50">
                    {payment.status}
                  </span>
                </td>
                <td className="py-6 text-[16px] text-[#0A0A30] font-normal">
                  {payment.paymentMethod}
                </td>
                <td className="py-6 text-[16px] text-[#0A0A30] font-normal">
                  {payment.payoutDate}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-end gap-4 mt-10">
        <button 
          className="p-2 rounded-full hover:bg-gray-50 text-gray-300 transition-colors"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm text-gray-400">
          <span className="text-gray-600 font-medium">{currentPage}</span> of 3
        </span>
        <button 
          className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default EarningInsight;