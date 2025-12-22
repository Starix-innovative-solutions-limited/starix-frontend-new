/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'

import { motion } from 'framer-motion'
import { variants } from '@/constant'
import { useModal } from '@/components/GlobalModal'
import ChallengeDetails from './ChallengeDetails'
import NewPostComponent from './NewPost'

interface challengeProps {
    challenge: any,
    index: number,
    post?: boolean,

}

const ChallengeCard = ({ challenge, index, post }: challengeProps) => {
    const { open } = useModal()
    return (
        <motion.div variants={variants?.itemVariants} className="bg-white rounded-xl shadow-sm px-6 py-3 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start gap-5 mb-4">
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`}
                    alt="Brand Avatar"
                    className="w-12 h-12 rounded-full border border-secondary-10"
                />
                <div>
                    <h3 className="text-lg font-semibold text-secondary-100">
                        {challenge.title}
                    </h3>


                    {/* Description */}
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed text-dark">
                        {challenge.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <span className="text-orange-500 font-semibold text-lg">
                            {challenge.prize}
                        </span>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                                <AiOutlineClockCircle />
                                <span>{challenge.timeLeft}</span>
                            </div>

                            {
                                post ? (
                                    <button className="text-[#040136B2] text-sm font-medium hover:text-gray-900 transition-colors underline" onClick={() => open(<NewPostComponent />, { position: 'center' })}>
                                        Post
                                    </button>
                                ) : (
                                    <button className="text-[#040136B2] text-sm font-medium hover:text-gray-900 transition-colors underline" onClick={() => open(<ChallengeDetails />, { position: 'center' })}>
                                        View Details
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default ChallengeCard