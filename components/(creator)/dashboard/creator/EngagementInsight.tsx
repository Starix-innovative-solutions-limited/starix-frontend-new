import { motion } from 'framer-motion';
import React from 'react'

type InsightProps = {
    whichSocial?: 'tiktok' | 'instagram' | 'youtube' | string
}

const EngagementInsight = ({
    whichSocial = ""
}: InsightProps) => {
    const stats = [
        { label: "Views:", value: "500" },
        { label: "Comments:", value: "500" },
        { label: "Likes:", value: "500" }
    ];
    return (
        <div className='w-full'>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-6 p-6 w-full bg-white rounded-2xl border border-dark/20"
            >
                {/* Caption Card */}
                <div className=" ">
                    <p className="text-base text-dark font-light mb-2">Caption:</p>
                    <p className="text-dark-navy leading-relaxed">
                        POV: You finally find a product that delivers exactly what you{"'"}ve been hoping for, and now you can{"'"}t gate keep it anymore.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="space-y-2 divide-y divide-dark/30 ">
                    {stats?.map((stat, index) => {
                        // const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="py-2 flex items-center justify-between group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-dark text-sm font-light ">{stat.label}</span>
                                </div>
                                <motion.span
                                    className="text-xl text-dark-navy font-normal"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                                >
                                    {stat.value}
                                </motion.span>
                            </motion.div>
                        );
                    })}
                </div>

                {
                    whichSocial?.length > 0 && <span className='text-secondary-100 text-sm font-light ml-auto uppercase'>
                        {whichSocial}
                    </span>
                }
            </motion.div>
        </div>
    )
}

export default EngagementInsight