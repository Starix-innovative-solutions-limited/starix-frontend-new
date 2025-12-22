/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { variants } from '@/constant'
import { motion } from 'framer-motion'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { GoPlus } from 'react-icons/go'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { useModal } from '@/hooks/useModal'
import CircleChat from '@/components/(creator)/dashboard/creator/CircleChat'
import CreateWeeklyChallenge from '@/components/(creator)/dashboard/creator/CreateWeeklyChallenge'
import CreatePoll from '@/components/(creator)/dashboard/creator/CreatePoll'
import CircleMembers from '@/components/(creator)/dashboard/creator/CircleMembers'
import LeaveCircleModal from '@/components/(creator)/dashboard/LeaveCircleModal'
import CircleInfo from '@/components/(creator)/dashboard/creator/CircleInfo'



const page = () => {
  const { open } = useModal()

  const DropMenu = () => {
    return (
      <div className='bg-white px-4 pt-4 h-[100px] space-y-2 flex flex-col'>
        <button className='text-secondary-100 font-light ' onClick={() => open(<CircleMembers />)}>View members</button>
        <button className='text-[#FF0000]' onClick={() => open(<LeaveCircleModal />)} >Leave Circle</button>
      </div>
    )
  }
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
          className="flex max-md:flex-col justify-between md:items-center pb-6 mb-8 border-b border-dark/20  gap-3"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 py-2 text-2xl  hover:bg-gray-100 transition-colors text-secondary-100 "
          >
            <FaArrowLeft /> UpliftCreateVibes
          </motion.span>

          <div className='flex  gap-2 items-center'>
            <motion.button className='bg-[#fafafa] text-sm border border-dark  text-secondary-100/70 flex gap-1 items-center p-2 md:px-4 md:py-3 rounded-full hover:bg-secondary-200 hover:text-[#fafafa] transition-colors' onClick={() => open(<CreateWeeklyChallenge />)}>
              <GoPlus className='' />
              <span>Create weekly challenge</span>
            </motion.button>

            <motion.button className='bg-[#fafafa] text-sm border border-dark  text-secondary-100/70 flex gap-1 items-center p-2 md:px-4 md:py-3 rounded-full hover:bg-secondary-200 hover:text-[#fafafa] transition-colors' onClick={() => open(<CreatePoll />)}>
              <GoPlus className='' />
              <span >Create Poll</span>
            </motion.button>

            <motion.button className='bg-[#fafafa] text-sm border border-dark  text-secondary-100/70 flex gap-1 items-center p-3 rounded-full hover:bg-secondary-200 hover:text-[#fafafa] transition-colors' onClick={() => open(<DropMenu />, { position: 'top-right', modalClassName: 'top-20 right-10' })}>
              <IoEllipsisVerticalSharp />
            </motion.button>
          </div>
        </motion.div>


        <motion.div className='grid grid-cols-3 items-start'>
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