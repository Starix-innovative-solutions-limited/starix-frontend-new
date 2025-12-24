/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion'
import React from 'react'
import { FaRegComment } from 'react-icons/fa'
import SubmitUrl from './creator/SubmitUrl'

import { useModal } from '../../GlobalModal'
import { variants } from '@/constant'
import SubmissionDetails from './creator/SubmissionDetails'
import { SlLike } from 'react-icons/sl'
import Dropdown from '../../ui/Dropdown'
import { MoreVertical } from 'lucide-react'
import { IoCopyOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PiEyeThin } from 'react-icons/pi'
interface PostProps {
    viewSubmitLink?: boolean,
    price?: string,
    isWin?: boolean,
    link?: any
}

const PostCard = ({ viewSubmitLink, isWin, price, link }: PostProps) => {
    const { open } = useModal();
    const router = useRouter()

    const openDetails = () => {
        if (link) { router.push(link) } else {
            open(<SubmissionDetails />)
        }
    }
    return (
        <motion.div
            whileHover={{ y: -8 }}
            variants={variants?.itemVariants}
            className="bg-white  overflow-hidden cursor-pointer h-fit min-w-[350px]"
        >
            <div className='relative' >
                {/* <img
                    src={`https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop`}

                    alt="Challenge"
                    className="w-full h-48 object-cover"
                    onClick={openDetails}
                /> */}

                <Image
                    src={'/post.png'}
                    alt='profile_pic'
                    width={1000}
                    height={1000}
                    className="w-full h-48 object-cover"
                    onClick={openDetails}
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full flex items-center gap-2">
                    <IoCopyOutline className='text-dark-navy' />
                    {/* <span className="text-sm font-semibold text-gray-600">3k</span> */}
                </div>
                {/* <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full"> */}
                <Dropdown
                    trigger={<MoreVertical className="h-5 w-5" />}
                    className="flex flex-col !absolute top-3 right-3"
                    align='right'
                >
                    <button className="dropdown-item text-sm">Edit</button>
                    <button className="dropdown-item text-sm">Hide</button>
                    <button className="dropdown-item text-sm">Share</button>
                    <button className="dropdown-item text-sm !text-red-700">Delete</button>
                </Dropdown>
                {/* </button> */}

                <div className="absolute bottom-3 left-3 bg-off-white/50 backdrop-blur-sm px-2 py-[[0.5] rounded-full flex items-center gap-2">
                    <PiEyeThin className='text-dark-navy/70' />
                    <span className="text-sm font-light text-dark-navy/70">3k</span>
                </div>



            </div>


            <div className='flex flex-between pb-4'>
                <div className="px-4 pt-4 flex flex-col">
                    <p className=" text-dark-navy text-xl mb-3" onClick={openDetails}>Your Caption here</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {/* <FaHeart className="text-red-400" /> */}
                            <SlLike className='text-dark-navy' />
                            <span className="text-sm font-light text-dark-navy">500</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaRegComment className="text-dark-navy" />
                            <span className="text-sm font-light text-dark-navy">10</span>
                        </div>
                    </div>
                </div>

                <div className='flex px-5 pb-4'>
                    {
                        viewSubmitLink && (
                            <button className="text-dark-navy/70 ml-auto text-sm font-light hover:text-gray-900 transition-colors underline" onClick={() => open(<SubmitUrl />, { position: 'center' })}>
                                Submit Link
                            </button>
                        )
                    }

                    {
                        isWin && price && (
                            <button className="text-primary-orange ml-auto text-sm font-light hover:text-gray-900 transition-colors underline" onClick={() => open(<SubmitUrl />, { position: 'center' })}>
                                {price}
                            </button>
                        )
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default PostCard