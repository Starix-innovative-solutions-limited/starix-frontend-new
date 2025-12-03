/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from 'react';
import CircleSection from '@/components/dashboard/creator/CircleSection';
import FeedCard from '@/components/dashboard/FeedCard';
import WeeklyLeaderboard from '@/components/dashboard/WeeklyLeaderboard';
import { variants } from '@/constant'
import { motion } from 'framer-motion'
import { GoPlus } from 'react-icons/go';

import { useModal } from '@/components/GlobalModal'

import CreateCircle from '@/components/dashboard/CreateCircle'


const page = () => {

  const { open } = useModal();
    const yourCircles = [
        {
          id: 1,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 20,
          joined: true
        },
        {
          id: 2,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 120,
          joined: true
        },
        {
          id: 3,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 120,
          joined: true
        }
      ];
    
      const trendingCircles = [
        {
          id: 4,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 20,
          joined: false
        },
        {
          id: 5,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 120,
          joined: false
        },
        {
          id: 6,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 120,
          joined: false
        },
        {
          id: 7,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 20,
          joined: false
        },
        {
          id: 8,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 120,
          joined: false
        },
        {
          id: 9,
          name: 'UpliftCreateVibes',
          description: 'Helps collaborate by sharing knowledge',
          members: 120,
          joined: true
        }
      ]

  return (
    <div className="min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className="mx-auto pb-20"
      >
         {/* Header */}
         <motion.div
          variants={variants?.headerVariants}
          className="flex justify-between items-center pb-6 mb-8 border-b border-dark/20 "
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 py-2 text-4xl  hover:bg-gray-100 transition-colors text-secondary-100 "
          >
            Creator Circle
          </motion.span>

          <motion.button className='bg-secondary-100 text-white flex gap-3 items-center p-2 md:px-4 md:py-3 rounded-full hover:bg-secondary-200 transition-colors' onClick={() => open(<CreateCircle />)}>
            <GoPlus className='max-md:text-2xl' />
          <span className='max-md:hidden'>Create Circle</span>
          </motion.button>
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col gap-10'
        >
          <CircleSection 
            title="Your Circle" 
            circles={yourCircles}
            showSeeAll={true}
          />
          
          <CircleSection 
            title="Trending Circles" 
            circles={trendingCircles}
            showSeeAll={true}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 mt-10">


          <div className='md:col-span-2 space-y-10'>
          <h2 className="text-[28px]  text-secondary-100 tracking-[-0.02em]">Creator Feed</h2>
            {
              [1,2,3,4,5,6,7,8,9].map((item) => (
                <FeedCard key={item} />
              ))
            }
          </div>

          <div className='space-y-10'>
          <h2 className="text-[28px]  text-secondary-100 tracking-[-0.02em]">Starix Leaderboard</h2>
            <WeeklyLeaderboard />
          </div>



        </div>

      </motion.div>
      </div>
  )
}

export default page