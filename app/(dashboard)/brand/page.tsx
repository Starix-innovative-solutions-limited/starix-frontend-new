/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ActiveChallenges from '@/components/(brand)/overview/ActiveChallenges'
import TopChallengeInsights from '@/components/(brand)/overview/ChallengeInsight'
import LinearGradientBorder from '@/components/ui/LinearGradientBorder'
import { variants } from '@/constant'
import { motion } from 'framer-motion'
import { FaBullhorn, FaUsers, FaWallet, FaImages } from 'react-icons/fa'
import { useAuthStore } from '@/store/useAuthStore'

const Page = () => {
    const { profile } = useAuthStore()
    const DASHBOARD_STATS = [
        {
            key: "totalChallenges",
            title: "Total Challenges",
            value: 150,
            icon: FaBullhorn,
        },
        {
            key: "totalCreators",
            title: "Total Creators",
            value: 150,
            icon: FaUsers,
        },
        {
            key: "avgCostEngagement",
            title: "Avg Cost Engagement",
            value: "$150",
            icon: FaWallet,
        },
        {
            key: "totalUGC",
            title: "Total UGC",
            value: 150,
            icon: FaImages,
        },
    ]
    return (
        <div className="min-h-screen">
            {/* Header */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants?.containerVariants}
                className="mx-auto general-space"
            >
                {/* Header */}
                <motion.div
                    variants={variants?.headerVariants}
                    className="flex flex-col gap-6"
                >
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 py-2 text-[28px] font-normal  transition-colors text-secondary-100 "
                    >
                        Hello, {profile?.brand_name}
                    </motion.span>


                    <motion.div variants={variants?.containerVariants} className="grid md:grid-cols-4 gap-3 md:gap-6">
                        {DASHBOARD_STATS.map((item, i) => {
                            const Icon = item.icon;

                            return (
                                <LinearGradientBorder key={i}>
                                    <div className="flex items-start justify-between py-2 px-2">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-dark text-sm">
                                                {item.title}
                                            </span>

                                            <p className="text-2xl text-secondary-100">
                                                {item.value}
                                            </p>
                                        </div>

                                        <span className="text-secondary-100">
                                            <Icon size={10} className='text-dark-navy' />
                                        </span>
                                    </div>
                                </LinearGradientBorder>
                            );
                        })}

                    </motion.div>

                </motion.div>

                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-[28px] text-dark-navy">Active Challenges</h1>
                        <button className="text-sm font-light text-dark-navy  hover:text-gray-900">
                            See All
                        </button>
                    </div>
                    <ActiveChallenges />
                </div>

               <TopChallengeInsights />

            </motion.div>
        </div>
    )
}

export default Page