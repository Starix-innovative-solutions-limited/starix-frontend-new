/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MotionTable } from "@/components/(creator)/dashboard";
import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";
import { FiMoreHorizontal, FiSearch, FiFilter } from "react-icons/fi";
import clsx from "clsx";

export default function ActiveChallenges() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterWrapRef = useRef<HTMLDivElement | null>(null);

  // close filter when clicking outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!filterWrapRef.current) return;
      if (!filterWrapRef.current.contains(e.target as Node)) setIsFilterOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // ✅ ONE content, repeated 4x (to match the Figma UI)
  const baseChallenge = {
    name: "Soap Campaign",
    category: "Fashion",
    amount: 400,
    description: "From brands run ...",
    startDate: "02/02/2023",
    endDate: "02/02/2023",
  };

  const challengesData = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        ...baseChallenge,
      })),
    []
  );

  const headers = [" ", "Challenge Name", "Category", "Amount", "Description", "Start Date", "End Date"];

  const renderRow = (item: any, index: number) => (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index }}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="py-4 px-4">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </td>

      <td className="py-4 px-4 text-sm font-medium text-dark-navy whitespace-nowrap">
        {item.name}
      </td>

      <td className="py-4 px-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-light bg-[#fff8f5] text-[#FD6C1D]">
          {item.category}
        </span>
      </td>

      <td className="py-4 px-4 text-base text-dark-navy font-medium whitespace-nowrap">
        ${item.amount}
      </td>

      <td className="py-4 px-4 text-sm text-dark-navy min-w-[220px]">
        {item.description}
      </td>

      <td className="py-4 px-4 text-sm text-dark-navy whitespace-nowrap">
        {item.startDate}
      </td>

      <td className="py-4 px-4 text-sm text-dark-navy whitespace-nowrap">
        {item.endDate}
      </td>

      <td className="py-4 px-4">
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreHorizontal className="w-5 h-5" />
        </button>
      </td>
    </motion.tr>
  );

  return (
    <div className="w-full">
      <div className="mx-auto relative w-full">
        {/* ✅ Responsive Search & Filter */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end md:gap-3 mb-6">
          {/* Search */}
          <div className="relative rounded-full w-full md:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                pl-10 pr-4 py-2 border rounded-full border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-sm w-full 
              "
            />
          </div>

          {/* Filter (with dropdown) */}
          <div ref={filterWrapRef} className="relative w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsFilterOpen((p) => !p)}
              className="flex items-center justify-center md:justify-start w-full md:w-auto rounded-full gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <FiFilter className="w-4 h-4" />
              Filter
            </button>

            {/* ✅ Keep the white square — now it's the dropdown */}
            <div
              className={clsx(
                "absolute right-0 mt-3 w-[220px] rounded-xl bg-white shadow-[0px_12px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-3 z-20",
                "max-md:w-full max-md:left-0 max-md:right-0",
                !isFilterOpen && "hidden"
              )}
            >
              <p className="text-xs text-gray-500 mb-2">Filter options</p>

              {/* placeholder content (replace with your real filters) */}
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-dark-navy">
                Category: Fashion
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-dark-navy">
                Amount: High → Low
              </button>

              <div className="mt-3 flex gap-2">
                <button
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Responsive table wrapper (mobile scroll) */}
        <div className="w-full overflow-x-auto rounded-2xl">
          <div className="w-full">
            <MotionTable
              headers={headers}
              data={challengesData}
              renderRow={renderRow}
              currentPage={currentPage}
              totalPages={3}
              onPageChange={setCurrentPage}
              emptyMessage="No challenges found"
            />
          </div>
        </div>
      </div>
    </div>
  );
}