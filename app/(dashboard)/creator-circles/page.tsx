"use client";

import CircleSection from '@/components/dashboard/creator/CircleSection';
import { variants } from '@/constant'
import { motion } from 'framer-motion'
import { GoPlus } from 'react-icons/go';

const page = () => {

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
        className="mx-auto"
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
            Challenges
          </motion.span>

          <motion.button className='bg-secondary-100 text-white flex gap-3 items-center px-4 py-3 rounded-full hover:bg-secondary-200 transition-colors'>
            <GoPlus />
          <span>Create Circle</span>
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

      </motion.div>
      </div>
  )
}

export default page