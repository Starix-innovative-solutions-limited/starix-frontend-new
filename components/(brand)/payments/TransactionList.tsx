"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MotionTable } from "@/components/(creator)/dashboard";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMoreHorizontal, FiSearch, FiFilter } from "react-icons/fi";
import Link from "next/link";


type TransactionStatus = "funded" | "draft";

type Transaction = {
  id: number;
  transactionId: string;
  name: string;
  category: string;
  amount: number;
  description: string;
  status: TransactionStatus;
  dateFunded?: string;
  endDate: string;
};

const TABS = ["All", "Completed", "Pending", "Failed"];

export default function TransactionList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const transactionData: Transaction[] = [
    {
      id: 1,
      transactionId: "ABC-0099",
      name: "Soap Campaign",
      category: "Fashion",
      amount: 400,
      description: "From brands run ...",
      status: "funded",
      dateFunded: "02/02/2023",
      endDate: "20/02/2023",
    },
    {
      id: 2,
      transactionId: "ABC-0099",
      name: "Soap Campaign",
      category: "Fashion",
      amount: 400,
      description: "From brands run ...",
      status: "draft",
      dateFunded: "02/02/2023",
      endDate: "20/02/2023",
    },
    {
      id: 3,
      transactionId: "ABC-0099",
      name: "Soap Campaign",
      category: "Tech",
      amount: 400,
      description: "From brands run ...",
      status: "funded",
      dateFunded: "02/02/2023",
      endDate: "20/02/2023",
    },

    {
      id: 4,
      transactionId: "ABC-0099",
      name: "Soap Campaign",
      category: "Tech",
      amount: 400,
      description: "From brands run ...",
      status: "funded",
      dateFunded: "02/02/2023",
      endDate: "20/02/2023",
    },
  ];

  const headers = [
    "",
    "Challenge Name",
    "Category",
    "Description",
    "Amount",
    "Status",
    "Transaction ID",
    "Date Funded",
    "",
  ];

  const renderRow = (item: Transaction, index: number) => (
    <motion.tr
      key={item.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index }}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="py-4 px-4">
        <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
      </td>

      <td className="py-4 px-4 text-sm font-medium text-dark-navy whitespace-nowrap">
        <Link href={`/brand/payments/${item.transactionId}`}>
            {item.name}
        </Link>
      </td>

      <td className="py-4 px-4 whitespace-nowrap">
        <span className="px-2.5 py-1 rounded-full text-xs bg-[#fff8f5] text-[#FD6C1D]">
          {item.category}
        </span>
      </td>

      <td className="py-4 px-4 text-sm text-dark-navy">
        {item.description}
      </td>

      <td className="py-4 px-4 font-medium whitespace-nowrap">
        ${item.amount}
      </td>

      <td className="py-4 px-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === "funded"
              ? "bg-[#E8F7EF] text-gray-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {item.status === "funded" ? "Funded" : "Draft"}
        </span>
      </td>

      <td className="py-4 px-4 whitespace-nowrap">{item.transactionId}</td>

      <td className="py-4 px-4 whitespace-nowrap">
        {item.dateFunded ?? "--"}
      </td>

      <td className="py-4 px-4">
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreHorizontal />
        </button>
      </td>
    </motion.tr>
  );

  return (
    <div className="flex min-h-150 flex-col gap-6">
      <h2 className="text-2xl text-dark-navy">Transactions List</h2>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* TABS */}
          <div className="flex gap-6 border-b border-gray-200 pb-2 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm ${
                  activeTab === tab
                    ? "text-dark-navy border-b-2 border-dark-navy"
                    : "text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex items-center gap-3">
            <div className="relative rounded-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full border-gray-300 text-sm"
              />
            </div>

            <button className="flex items-center rounded-full gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-sm">
              <FiFilter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* TABLE */}
        <MotionTable
          headers={headers}
          data={transactionData}
          renderRow={renderRow}
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
          emptyMessage="No transactions found"
        />
      </div>
    </div>
  );
}
