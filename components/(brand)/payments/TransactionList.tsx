/* eslint-disable @typescript-eslint/no-explicit-any */
import { MotionTable } from "@/components/(creator)/dashboard";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMoreHorizontal, FiSearch, FiFilter } from "react-icons/fi";


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


export default function TransactionList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const transactionData: Transaction[] = [
        {
            id: 1,
            transactionId: "56datac67ra5c",
            name: "Soap Campaign",
            category: "Fashion",
            amount: 400,
            description: "From brands run to give thanks",
            status: "funded",
            dateFunded: "02/02/2023",
            endDate: "20/02/2023",
        },
        {
            id: 2,
            transactionId: "89kfd23la90x",
            name: "Campus Influencer Drive",
            category: "Marketing",
            amount: 250,
            description: "Boosting brand visibility on campus",
            status: "draft",
            endDate: "10/03/2023",
        },
        {
            id: 3,
            transactionId: "a90fd32kdsa9",
            name: "Skincare Launch",
            category: "Beauty",
            amount: 800,
            description: "Product awareness for new skincare line",
            status: "funded",
            dateFunded: "15/01/2023",
            endDate: "15/02/2023",
        },
        {
            id: 4,
            transactionId: "xy239dkd923k",
            name: "Tech Giveaway",
            category: "Technology",
            amount: 1200,
            description: "Giveaway campaign for students",
            status: "draft",
            endDate: "30/03/2023",
        },
    ];



    const headers = [
        "",
        "Transaction ID",
        "Challenge Name",
        "Category",
        "Amount",
        "Description",
        "Status",
        "Date Funded",
        "End Date",
        "",
    ];


    const renderRow = (item: Transaction, index: number) => (
        <motion.tr
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="hover:bg-gray-50 transition-colors"
        >
            <td className="py-4 px-4">
                <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </td>

            <td className="py-4 px-4 text-sm text-dark-navy">
                {item.transactionId}
            </td>

            <td className="py-4 px-4 text-sm font-medium text-dark-navy">
                {item.name}
            </td>

            <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-light bg-[#fff8f5] text-[#FD6C1D]">
                    {item.category}
                </span>
            </td>

            <td className="py-4 px-4 text-base text-dark-navy font-medium">
                ${item.amount}
            </td>

            <td className="py-4 px-4 text-sm text-dark-navy">
                {item.description}
            </td>

            {/* STATUS */}
            <td className="py-4 px-4">
                <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium
          ${item.status === "funded"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {item.status}
                </span>
            </td>

            <td className="py-4 px-4 text-sm text-dark-navy">
                {item.dateFunded ?? "--"}
            </td>

            <td className="py-4 px-4 text-sm text-dark-navy">
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
        <div className="">
            <span className="text-2xl text-dark-navy">Transaction List</span>
            <div className="mx-auto relative">
                {/* Search and Filter */}
                <div className="flex items-center justify-end gap-3 mb-6">
                    <div className="relative rounded-full">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border w-fit rounded-full border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                    <button className="flex items-center rounded-full gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        <FiFilter className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                {/* Table */}
                <MotionTable
                    headers={headers}
                    data={transactionData}
                    renderRow={renderRow}
                    currentPage={currentPage}
                    totalPages={3}
                    onPageChange={setCurrentPage}
                    emptyMessage="No challenges found"
                />
            </div>
        </div>
    );
}