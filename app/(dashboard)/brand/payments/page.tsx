"use client"

import LinearGradientBorder from '@/components/ui/LinearGradientBorder';
import { variants } from '@/constant';
import { motion } from 'framer-motion';
import React from 'react'
import { CiCreditCard2 } from 'react-icons/ci';
import TransactionList from '@/components/(brand)/payments/TransactionList';

const Page = () => {
    const PAYMENT_STATS = [
        {
            key: "totalPayment",
            title: "Total Payments",
            value: "$ 95432.49",
        },
        {
            key: "totalFunded",
            title: "Total Funded",
            value: "$ 234.4",
        },
        {
            key: "totalPending",
            title: "Total Pending",
            value: "$ 2,750.3",
        },
        {
            key: "Failed",
            title: "Failed Payment",
            value: 10,
        },
    ]

    // const { open } = useModal()
    return (
        <div className='general-space'>


            <motion.div
                variants={variants?.headerVariants}
                className="flex flex-col mb-3 gap-6 md:-mt-10"
            >
                <motion.div className='flex items-center justify-between'>
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 py-2 text-[28px] font-normal  transition-colors text-secondary-100 "
                    >
                        Payments
                    </motion.span>

                    {/* <motion.button
                        onClick={() => open(<CreateChallenge />)}
                        className="flex items-center gap-3 bg-dark-navy text-white rounded-full px-3 py-1.5">
                        <FaPlus />
                        <span className='text-base'>Create new</span>
                    </motion.button> */}
                </motion.div>

                <motion.div variants={variants?.containerVariants} className="grid md:grid-cols-4 gap-3 md:gap-6">
                    {PAYMENT_STATS.map((item, i) => {
                        // const Icon = item.icon;

                        return (
                            <LinearGradientBorder key={i}>
                                <div className="flex items-start justify-between py-2 px-4">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-dark text-sm">
                                            {item?.title}&nbsp;challenges
                                        </span>
                                        <p className="text-2xl text-secondary-100">
                                            {item?.value}
                                        </p>
                                    </div>

                                    <span>
                                        <CiCreditCard2 className="text-secondary-100" />
                                    </span>
                                </div>
                            </LinearGradientBorder>
                        );
                    })}

                </motion.div>

            </motion.div>

            <TransactionList />
        </div>
    )
}

export default Page