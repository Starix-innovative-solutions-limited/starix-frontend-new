/* eslint-disable @typescript-eslint/no-explicit-any */
import { MotionTable } from "@/components/(creator)/dashboard";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMoreHorizontal, FiSearch, FiFilter } from "react-icons/fi";



export default function ActiveChallenges() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const challengesData = [
        {
            id: 1,
            name: 'Soap Campaign',
            category: 'Fashion',
            amount: 400,
            description: 'From brands run ...',
            startDate: '02/02/2023',
            endDate: '02/02/2023',
        },
        {
            id: 2,
            name: 'Soap Campaign',
            category: 'Fashion',
            amount: 400,
            description: 'From brands run ...',
            startDate: '02/02/2023',
            endDate: '02/02/2023',
        },
        {
            id: 3,
            name: 'Soap Campaign',
            category: 'Fashion',
            amount: 400,
            description: 'From brands run ...',
            startDate: '02/02/2023',
            endDate: '02/02/2023',
        },
        {
            id: 4,
            name: 'Soap Campaign',
            category: 'Fashion',
            amount: 400,
            description: 'From brands run ...',
            startDate: '02/02/2023',
            endDate: '02/02/2023',
        },
    ];


    const headers = [
        '',
        'Challenge Name',
        'Category',
        'Amount',
        'Description',
        'Start Date',
        'End Date',
        '',
    ];

    const renderRow = (item: any, index: number) => (
        <motion.tr
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
            <td className="py-4 px-4 text-sm font-medium text-dark-navy">{item.name}</td>
            <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-light bg-[#fff8f5] text-[#FD6C1D]">
                    {item.category}
                </span>
            </td>
            <td className="py-4 px-4 text-base text-dark-navy font-medium">${item.amount}</td>
            <td className="py-4 px-4 text-sm text-dark-navy">{item.description}</td>
            <td className="py-4 px-4 text-sm text-dark-navy">{item.startDate}</td>
            <td className="py-4 px-4 text-sm text-dark-navy">{item.endDate}</td>
            <td className="py-4 px-4">
                <button className="text-gray-400 hover:text-gray-600">
                    <FiMoreHorizontal className="w-5 h-5" />
                </button>
            </td>
        </motion.tr>
    );

    return (
        <div className="">
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
                    data={challengesData}
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