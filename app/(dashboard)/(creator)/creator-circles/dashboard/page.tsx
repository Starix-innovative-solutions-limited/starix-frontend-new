/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { variants } from '@/constant'
import { motion } from 'framer-motion'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { GoPlus } from 'react-icons/go'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { useModal } from '@/hooks/useModal'
import { useRouter } from 'next/navigation' // ✅ IMPORT ROUTER
import CircleChat from '@/components/(creator)/dashboard/creator/CircleChat'
import CreateWeeklyChallenge from '@/components/(creator)/dashboard/creator/CreateWeeklyChallenge'
import CreatePoll from '@/components/(creator)/dashboard/creator/CreatePoll'
import CircleMembers from '@/components/(creator)/dashboard/creator/CircleMembers'
import LeaveCircleModal from '@/components/(creator)/dashboard/LeaveCircleModal'
import CircleInfo from '@/components/(creator)/dashboard/creator/CircleInfo'

const page = () => {
  const { open, close } = useModal()
  const router = useRouter() // ✅ INITIALIZE ROUTER

  const DropMenu = () => {
    return (
      <div className="px-3 py-3 flex flex-col gap-2 items-start">
        <button
          className="w-full text-left text-secondary-100 font-light hover:bg-gray-50 p-2 rounded-lg transition-colors"
          onClick={() => {
            close(); // ✅ Close modal
            router.push('/creator-circles/creator-profile'); // ✅ NAVIGATE
          }}
        >
          View Profile
        </button>

        <button
          className="w-full text-left text-secondary-100 font-light hover:bg-gray-50 p-2 rounded-lg transition-colors"
          onClick={() => open(<CircleMembers />)}
        >
          View members
        </button>

        <button
          className="w-full text-left text-[#FF0000] font-light hover:bg-gray-50 p-2 rounded-lg transition-colors"
          onClick={() => open(<LeaveCircleModal />)}
        >
          Leave Circle
        </button>
      </div>
    );
  };

  return (
    <div className='min-h-screen'>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className="mx-auto pb-20"
      >
        {/* Header */}
        <motion.div
          variants={variants?.headerVariants}
          className="flex max-md:flex-col justify-between md:items-center pb-6 mb-8 border-b border-dark/20 gap-3"
        >
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 py-2 text-2xl text-secondary-100 cursor-pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft /> UpliftCreateVibes
          </motion.span>

          <div className='flex gap-2 items-center'>
            <motion.button className='bg-[#fafafa] text-sm border border-dark text-secondary-100/70 flex gap-1 items-center p-2 md:px-4 md:py-3 rounded-full hover:bg-secondary-200 hover:text-[#fafafa] transition-colors' onClick={() => open(<CreateWeeklyChallenge />)}>
              <GoPlus />
              <span>Create weekly challenge</span>
            </motion.button>

            <motion.button className='bg-[#fafafa] text-sm border border-dark text-secondary-100/70 flex gap-1 items-center p-2 md:px-4 md:py-3 rounded-full hover:bg-secondary-200 hover:text-[#fafafa] transition-colors' onClick={() => open(<CreatePoll />)}>
              <GoPlus />
              <span>Create Poll</span>
            </motion.button>

            <motion.button className='bg-[#fafafa] text-sm border border-dark text-secondary-100/70 flex gap-1 items-center p-3 rounded-full hover:bg-secondary-200 hover:text-[#fafafa] transition-colors' onClick={() => open(<DropMenu />, { position: 'top-right', modalClassName: 'top-20 right-10' })}>
              <IoEllipsisVerticalSharp />
            </motion.button>
          </div>
        </motion.div>

        <motion.div className='grid grid-cols-3 items-start gap-6'>
          <div className='col-span-2'>
            <CircleChat />
          </div>
          <CircleInfo />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default page