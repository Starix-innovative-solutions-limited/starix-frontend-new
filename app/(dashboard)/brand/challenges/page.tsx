"use client"

import ActiveChallenges from '@/components/(brand)/overview/ActiveChallenges';
import LinearGradientBorder from '@/components/ui/LinearGradientBorder';
import { variants } from '@/constant';
import { motion } from 'framer-motion';
import React from 'react'
import { CiCreditCard2 } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa6';
import { useModal } from '@/hooks/useModal';
import CreateChallenge from '@/components/(brand)/challenge/CreateChallenge';

const Page = () => {
    const CHALLENGE_STATS = [
        {
            key: "totalChallenges",
            title: "All",
            value: 150,
        },
        {
            key: "totalCreators",
            title: "Ongoing",
            value: 150,
        },
        {
            key: "avgCostEngagement",
            title: "Past",
            value: "$150",
        },
        {
            key: "totalUGC",
            title: "Draft",
            value: 150,
        },
    ]

    const { open } = useModal()
    return (
        <div className='general-space'>


            <motion.div
                variants={variants?.headerVariants}
                className="flex flex-col mb-3 gap-6 "
            >
                <motion.div className='flex items-center justify-between'>
                    <motion.span
                       
                        className="flex items-center gap-2 py-2 text-[28px] font-normal  transition-colors text-secondary-100 "
                    >
                        Challenge
                    </motion.span>

                    <motion.button
                        onClick={() => open(<CreateChallenge />)}
                        className="flex items-center gap-3 bg-dark-navy text-white rounded-full px-3 py-1.5">
                        <FaPlus />
                        <span className='text-base'>Create new</span>
                    </motion.button>
                </motion.div>

                <motion.div variants={variants?.containerVariants} className="grid md:grid-cols-4 gap-3 md:gap-6">
                    {CHALLENGE_STATS.map((item, i) => {
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

            <div
            className="
                bg-white
                rounded-2xl
                shadow-sm
                p-4 md:p-6
            "
            >
            <ActiveChallenges />
            </div>
            </div>
    )
}

export default Page