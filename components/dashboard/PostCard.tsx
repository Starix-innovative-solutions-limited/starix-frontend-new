import { motion } from 'framer-motion'
import React from 'react'
import { FaEye, FaRegComment } from 'react-icons/fa'
import SubmitUrl from './creator/SubmitUrl'

import { useModal } from '../GlobalModal'
import { variants } from '@/constant'
import SubmissionDetails from './creator/SubmissionDetails'
import { SlLike } from 'react-icons/sl'

interface PostProps {
    viewSubmitLink?: boolean,
    price?: string,
    isWin?: boolean
}

const PostCard = ({ viewSubmitLink, isWin, price }: PostProps) => {
    const { open } = useModal();

    const openDetails = () => {
        open(<SubmissionDetails />)
    }
    return (
        <motion.div
            whileHover={{ y: -8 }}
            variants={variants?.itemVariants}
            className="bg-white  overflow-hidden cursor-pointer h-fit"
        >
            <div className="relative" onClick={openDetails}>
                <img
                    src={`https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop`}

                    alt="Challenge"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <FaEye className="text-gray-600 text-sm" />
                    <span className="text-sm font-semibold text-gray-600">3k</span>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>

            <div className="px-4 pt-4 flex items-center justify-between">
                <p className=" text-secondary-100 text-xl mb-3" onClick={openDetails}>Your Caption here</p>
                <div className="flex items-center gap-4 text-dark">
                    <div className="flex items-center gap-1">
                        {/* <FaHeart className="text-red-400" /> */}
                        <SlLike className='text-secondary-100' />
                        <span className="text-sm font-light text-secondary-100">500</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaRegComment className="text-secondary-100" />
                        <span className="text-sm font-light text-secondary-100">10</span>
                    </div>
                </div>
            </div>

            <div className='flex px-5 pb-4'>
                {
                    viewSubmitLink && (
                        <button className="text-[#040136B2] ml-auto text-sm font-medium hover:text-gray-900 transition-colors underline" onClick={() => open(<SubmitUrl />, { position: 'center' })}>
                            Submit Link
                        </button>
                    )
                }

                {
                    isWin && price && (
                        <button className="text-[#040136B2] ml-auto text-sm font-medium hover:text-gray-900 transition-colors underline" onClick={() => open(<SubmitUrl />, { position: 'center' })}>
                            {price}
                        </button>
                    )
                }
            </div>
        </motion.div>
    )
}

export default PostCard