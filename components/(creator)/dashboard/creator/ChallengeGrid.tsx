import React, { useState } from 'react';
import { IoFilterOutline } from 'react-icons/io5';
// import { useModal } from '@/components/GlobalModal';
import PostCard from '../PostCard';
import { motion } from 'framer-motion';
import { variants } from '@/constant';
import ChallengeCard from './ChallengeCard';

const ChallengeGrid = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    // const { open } = useModal()

    const challenges = Array(6).fill({
        title: 'Tiktok Brand',
        description: 'From brands running high-impact challenges to creators winning rewards and buildin...',
        prize: '$400',
        timeLeft: '7 days'
    });



    const tabs = [
        { id: 0, label: 'New', count: '20+' },
        { id: 1, label: 'Joined', count: '20' },
        { id: 2, label: 'Post', count: '20' },
        { id: 3, label: 'Submissions', count: '20' },
        { id: 4, label: 'Winnings', count: '20' }
    ];

    return (
        <motion.div className=" py-10 mt-5">
            {/* Tabs */}
            <motion.div className="flex items-center justify-between mb-8 ">
                <div className="flex items-center justify-between gap-1 border-b-[0.4px] border-dark p-2 px-4 max-md:overflow-x-scroll grow max-w-3xl">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'text-secondary-100'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && tab.count && (
                                <span className={`ml-2 text-xs p-1 rounded-lg ${activeTab === tab.id
                                    ? 'bg-gray-900 text-white !text-sm font-bold' : ''} `}>{tab.count}</span>
                            )}
                        </button>
                    ))}
                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <IoFilterOutline className="text-lg" />
                    <span className="text-sm font-medium">Filter</span>
                </button>
            </motion.div>

            {/* Grid */}
            <motion.div variants={variants.containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {
                    activeTab <= 1 && (
                        <>
                            {
                                challenges.map((challenge, index) => (
                                    <ChallengeCard key={index} challenge={challenge} index={index} post={activeTab == 1} />
                                ))
                            }
                        </>
                    )
                }


                {activeTab >= 2 && (
                    <>
                        {
                            challenges.slice(0, 4).map((index) => (
                                <PostCard key={index} viewSubmitLink={activeTab == 2} isWin={activeTab == 4} price='$400' />
                            ))
                        }
                    </>
                )
                }
            </motion.div>
        </motion.div>
    );
}

export default ChallengeGrid