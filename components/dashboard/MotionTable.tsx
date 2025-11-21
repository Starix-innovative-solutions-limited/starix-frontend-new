"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

type MotionTableProps<T> = {
  headers: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  rowVariants?: Variants;
  emptyMessage?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export function MotionTable<T>({
  headers,
  data,
  renderRow,
  // rowVariants,
  emptyMessage = "No data found",
  currentPage,
  totalPages,
  onPageChange,
}: MotionTableProps<T>) {
  return (
    <div className=" overflow-y-hidden  bg-white">
      <motion.table className="w-full ">
        {/* Table Header */}
        <motion.thead
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 border-b border-gray-200"
        >
          <tr>
            {headers.map((header, i) => (
              <motion.th
                key={header}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="py-3 px-4 text-left text-sm font-semibold text-gray-700"
              >
                {header}
              </motion.th>
            ))}
          </tr>
        </motion.thead>

        {/* Table Body */}
        <motion.tbody className="">
          {data.length > 0 ? (
            data.map((item, index) => (
              <React.Fragment key={index}>
                {renderRow(item, index)}
              </React.Fragment>
            ))
          ) : (
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <td
                colSpan={headers.length}
                className="py-10 text-center text-gray-500 text-sm"
              >
                {emptyMessage}
              </td>
            </motion.tr>
          )}
        </motion.tbody>
      </motion.table>

      {/* Pagination */}
      {totalPages && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border border-gray-200 bg-gray-50">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange && onPageChange(currentPage! - 1)}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentPage}
            className="text-sm text-gray-600"
          >
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </motion.div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange && onPageChange(currentPage! + 1)}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
