/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MotionTable } from "@/components/(creator)/dashboard";
import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";
import { FiMoreHorizontal, FiSearch, FiFilter } from "react-icons/fi";
import { useRouter } from "next/navigation"; 
import clsx from "clsx";

export default function ActiveChallenges() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (filterWrapRef.current && !filterWrapRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const challengesData = useMemo(
    () => [
      { id: "1", name: "Soap Campaign", category: "Fashion", count: 400, amount: 400, engagements: "100, 500", hook: "“Stop scrolling...”", deadline: "02/02/2023" },
      { id: "2", name: "Soap Campaign", category: "Fashion", count: 2400, amount: 400, engagements: "100, 500", hook: "“Do you know...”", deadline: "02/02/2023" },
      { id: "3", name: "Soap Campaign", category: "Tech", count: 100, amount: 400, engagements: "100, 500", hook: "“Stop scrolling...”", deadline: "02/02/2023" },
      { id: "4", name: "Soap Campaign", category: "Fashion", count: 350, amount: 400, engagements: "100, 500", hook: "“Have you heard...”", deadline: "02/02/2023" },
    ],
    []
  );

  const headers = [" ", "Challenge Name", "Category", "Creators Count", "Amount", "Engagements ( Views, Likes)", "Top Hooks", "Deadline", " "];

  const renderRow = (item: any, index: number) => (
    <motion.tr
      key={item.id} // ✅ Added key for stable rendering
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      // ✅ Corrected Dynamic Path
      onClick={() => router.push(`/brand/analytics/${item.id}`)}
      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors cursor-pointer group"
    >
      <td className="py-5 px-4" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          className="w-5 h-5 border-gray-300 rounded focus:ring-0 accent-black cursor-pointer"
        />
      </td>

      <td className="py-5 px-4 text-[15px] font-medium text-[#1A1C1E]">
        {item.name}
      </td>

      <td className="py-5 px-4">
        <span className={clsx(
          "px-3 py-1 rounded-md text-xs font-medium",
          item.category === "Fashion" ? "bg-[#FFF4ED] text-[#FF8A48]" : "bg-[#F0F7FF] text-[#007AFF]"
        )}>
          {item.category}
        </span>
      </td>

      <td className="py-5 px-4 text-[15px] text-[#1A1C1E]">
        {item.count}
      </td>

      <td className="py-5 px-4 text-[15px] font-semibold text-[#1A1C1E]">
        ${item.amount}
      </td>

      <td className="py-5 px-4 text-[15px] text-[#1A1C1E]">
        {item.engagements}
      </td>

      <td className="py-5 px-4">
        <span className="inline-block px-3 py-1.5 bg-[#F5F5F7] rounded-full text-[13px] text-gray-500 italic">
          {item.hook}
        </span>
      </td>

      <td className="py-5 px-4 text-[15px] font-medium text-[#1A1C1E]">
        {item.deadline}
      </td>

      <td className="py-5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <FiMoreHorizontal className="w-5 h-5 text-gray-800" />
        </button>
      </td>
    </motion.tr>
  );

  return (
    <div className="w-full bg-white p-6">
      <div className="mx-auto w-full">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end mb-8">
          <div className="relative w-full md:w-[280px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-300 text-[15px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div ref={filterWrapRef} className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors text-[15px] font-medium text-gray-600"
            >
              <FiFilter className="w-4 h-4" />
              Filter
            </button>
            {isFilterOpen && (
               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-xl text-sm">Sort by Date</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-xl text-sm">Sort by Amount</button>
               </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <MotionTable
            headers={headers}
            data={challengesData}
            renderRow={renderRow}
            currentPage={currentPage}
            totalPages={3}
            onPageChange={setCurrentPage}
            emptyMessage="No active campaigns found"
          />
        </div>
      </div>
    </div>
  );
}