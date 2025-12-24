/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'

import { motion } from 'framer-motion'
import { variants } from '@/constant'
import { useModal } from '@/components/GlobalModal'
import ChallengeDetails from './ChallengeDetails'
import NewPostComponent from './NewPost'
import Image from 'next/image'
import { FaEllipsisVertical } from 'react-icons/fa6'

interface challengeProps {
    challenge: any,
    index: number,
    post?: boolean,

}

const ChallengeCard = ({ challenge, post }: challengeProps) => {
    const { open } = useModal()
    return (
        <motion.div variants={variants?.itemVariants} className="bg-white  px-5 pt-4.5 pb-4 transition-shadow">
            {/* Header */}
            <div className="flex items-start gap-5 ">
                <Image
                    src={'/profile.png'}
                    alt='profile_pic'
                    width={100}
                    height={100}
                    className='w-12 h-12'
                />
                <div className='flex flex-col gap-2'>
                    <div className="flex-between">
                        <h3 className="text-xl text-dark-navy">
                            {challenge.title}
                        </h3>
                        <FaEllipsisVertical size={18} className="text-dark-navy" />
                    </div>



                    {/* Description */}
                    <p className="text-neut/60 text-base font-light  mb-5">
                        {challenge.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <span className="text-primary-orange font-light text-xs">
                            {challenge.prize}
                        </span>
                        <div className="flex items-center gap-1 text-neut/60 text-xs bg-[#f5f5f5] px-2 py-1">
                            <AiOutlineClockCircle />
                            <span className=''>{challenge.timeLeft}</span>
                        </div>
                    </div>

                    <div className="flex items-center mt-4 ml-auto">


                        {
                            post ? (
                                <button className="text-dark-navy/70 text-xs font-light hover:text-gray-900 transition-colors underline" onClick={() => open(<NewPostComponent />, { position: 'center' })}>
                                    Post
                                </button>
                            ) : (
                                <button className="text-dark-navy/70 text-xs font-light hover:text-gray-900 transition-colors underline" onClick={() => open(<ChallengeDetails />, { position: 'center' })}>
                                    View Details
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>

        </motion.div >
    )
}

export default ChallengeCard