
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MotionTable } from "../../MotionTable";

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

  const payments: Payment[] = [
    {
      brandName: "Nivea Ltd",
      category: "Fashion",
      amount: 400,
      status: "PAID",
      paymentMethod: "Bank Transfer",
      payoutDate: "02/02/2023",
    },
    {
      brandName: "Nivea Ltd",
      category: "Fashion",
      amount: 400,
      status: "PENDING",
      paymentMethod: "PayPal",
      payoutDate: "02/02/2023",
    },
    {
      brandName: "Nivea Ltd",
      category: "Fashion",
      amount: 400,
      status: "PAID",
      paymentMethod: "Bank Transfer",
      payoutDate: "02/02/2023",
    },
    {
      brandName: "Nivea Ltd",
      category: "Fashion",
      amount: 400,
      status: "PAID",
      paymentMethod: "PayPal",
      payoutDate: "02/02/2023",
    },
  ];

  const headers = [
    "Brand Name",
    "Category",
    "Amount",
    "Status",
    "Payment Method",
    "Payout Date",
  ];

  const renderRow = (payment: Payment, index: number) => (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.05 }}
      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
    >
      <td className="py-4 px-6 text-sm font-medium text-gray-900">
        {payment.brandName}
      </td>
      <td className="py-4 px-6 text-sm text-orange-400 font-medium">
        {payment.category}
      </td>
      <td className="py-4 px-6 text-sm font-semibold text-gray-900">
        ${payment.amount}
      </td>
      <td className="py-4 px-6 text-sm">
        <span
          className={`font-medium ${payment.status === "PAID" ? "text-gray-600" : "text-gray-400"
            }`}
        >
          {payment.status}
        </span>
      </td>
      <td className="py-4 px-6 text-sm text-gray-700">
        {payment.paymentMethod}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700">
        {payment.payoutDate}
      </td>
    </motion.tr>
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gap-2 py-2 text-2xl font-normal hover:bg-gray-100 transition-colors text-secondary-100 "
        >
          Earning Insight
        </motion.span>
      </div>

      <div className="mt-10 py-4 grid max-md:grid-cols-1 md:grid-cols-3 gap-10 overflow-x-auto hide-scrollbar">
        <MotionTable
          headers={headers}
          data={payments}
          renderRow={renderRow}
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}


export default EarningInsight