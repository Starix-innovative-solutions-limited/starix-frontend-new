'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ViewVotes = () => {
  const [votes] = useState({
    option1: [
      { id: 1, user: 'Favour', handle: '@favvy', date: '20 Oct, 2024', avatar: '👩🏽' },
      { id: 2, user: 'Favour', handle: '@favvy', date: '20 Oct, 2024', avatar: '👩🏽' },
    ],
    option2: [
      { id: 3, user: 'Favour', handle: '@favvy', date: '20 Oct, 2024', avatar: '👩🏽' },
      { id: 4, user: 'Favour', handle: '@favvy', date: '20 Oct, 2024', avatar: '👩🏽' },
    ]
  });

  const [hoveredOption, setHoveredOption] = useState<number | null > (null);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 md:min-w-xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=""
      >
        <h2 className="text-xl text-center font-medium text-secondary-100 mb-6">
          View Votes
        </h2>


        <h3 className="text-base font-normal text-secondary-100 my-8">Question Name</h3>

        {/* Option 1 */}
        <motion.div 
          className="mb-8"
          onHoverStart={() => setHoveredOption(1)}
          onHoverEnd={() => setHoveredOption(null)}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl  text-secondary-100 font-light">Option 1</h2>
            <motion.div 
              className="bg-[#FFDECC] text-secondary-100 px-2 py-1 rounded-lg border border-gray-100 text-xs font-light"
              animate={{ scale: hoveredOption === 1 ? 1.05 : 1 }}
            >
              {votes.option1.length * 5} Votes
            </motion.div>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {votes.option1.map((vote, index) => (
                <motion.div
                  key={vote.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                    <div className="flex items-center gap-3">
                     <Image src={'/profile.png'} alt='profile' width={100} height={100} className='w-10 h-10' />
                      <div>
                        <h3 className="font-normal text-base text-secondary-100">Favour</h3>
                        <p className="text-sm text-dark font-light -mt-1">@favvy</p>
                      </div>
                    </div>
                    <p className=" text-dark text-sm">Joined 20, Oct, 2024</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Option 2 */}
        <motion.div 
          className="mb-4"
          onHoverStart={() => setHoveredOption(2)}
          onHoverEnd={() => setHoveredOption(null)}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl  text-secondary-100 font-light">Option 2</h2>
            <motion.div 
              className="bg-[#EBEFFF] text-secondary-100 px-2 py-1 rounded-lg border border-gray-100 text-xs font-light"
              animate={{ scale: hoveredOption === 2 ? 1.05 : 1 }}
            >
              {votes.option2.length * 5} Votes
            </motion.div>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {votes.option2.map((vote, index) => (
                <motion.div
                  key={vote.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                     <Image src={'/profile.png'} alt='profile' width={100} height={100} className='w-10 h-10' />
                      <div>
                        <h3 className="font-normal text-base text-secondary-100">Favour</h3>
                        <p className="text-sm text-dark font-light -mt-1">@favvy</p>
                      </div>
                    </div>
                    <p className=" text-dark text-sm">Joined 20, Oct, 2024</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ViewVotes;