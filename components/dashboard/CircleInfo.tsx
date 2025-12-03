"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import Image from 'next/image';
import ViewVotes from './ViewVotes';
import { useModal } from '@/hooks/useModal';

export default function CircleInfo() {

  const {open} = useModal()
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const challenges = [
    { id: 1, user: '@favvy', message: 'Ask for feedback from another creator.', highlight: false },
    { id: 2, user: '@favvy', message: 'Ask for feedback from another creator.', highlight: true },
    { id: 3, user: '@favvy', message: 'Ask for feedback from another creator.', highlight: false },
  ];

  const pollOptions = [
    { id: 1, text: 'Option 1', votes: 0 },
    { id: 2, text: 'Option 2', votes: 0 },
  ];

  return (
    <div className="min-h-screen  px-6">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Weekly Challenge Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden pt-3"
        >
          {/* Header */}
          <div className="flex items-center gap-2 text-gray-500 border-b max-md:pt-2 py-5 border-[#6E6E6E33] justify-center-safe">
                  <Image src={'/badge.svg'} width={1000} height={1000} alt="try" className="w-8" />
                  <span className="text-base text-dark ">Weekly Leaderboard</span>
                </div>

          {/* Challenge Items */}
          <div className="p-4 space-y-5 mb-2">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-3 ml-2"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex-shrink-0 overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${challenge.user}`}
                    alt="avatar"
                    className="w-full h-full"
                  />
                </div>
                <div className="">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-secondary-100/70 font-light ">{challenge.user}</span>
                  </div>
                  
                </div>
                <div className={`px-3 py-2 rounded-lg text-xs font-light grow ${
                    challenge.highlight 
                      ? 'bg-[#FFDECC] text-[#1D0136]' 
                      : 'bg-gray-100 text-secondary-100'
                  }`}>
                    {challenge.message}
                  </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Creator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden pt-3"
        >
           <div className="flex items-center gap-2 text-gray-500 border-b max-md:pt-2 py-5 border-[#6E6E6E33] justify-center-safe">
                  <Image src={'/badge.svg'} width={1000} height={1000} alt="try" className="w-8" />
                  <span className="text-base text-dark ">Featured creator of the week.</span>
                </div>

          {/* Creator Profile */}
          <div className="m-6 bg-[#FFF8F5] rounded-2xl border border-gray-50 p-3 shadow-xs">
            <div className="flex items-start gap-4 ">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border border-secondary-100 p-1 overflow-hidden ring-2 ring-white">
                  <img
                    src="/profile.png"
                    alt="avatar"
                    className="w-full h-full"
                  />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -top-1 -right-1 bg-blue-400 rounded-full p-1"
                >
                  <FaTrophy className="w-3 h-3 text-white" />
                </motion.div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-base font-semibold text-secondary-100">@Favvy</h3>
                <p className="text-sm text-gray-500 mt-1">{'"'}Loves to help others to create! {'"'}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-white text-dark font-light text-xs rounded-full">
                  Fashion
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Poll Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden pt-3"
        >
           <div className="flex items-center gap-2 text-gray-500 border-b max-md:pt-2 py-5 border-[#6E6E6E33] justify-center-safe">
                  <Image src={'/badge.svg'} width={1000} height={1000} alt="try" className="w-7" />
                  <span className="text-base text-dark ">Poll Question.</span>
                </div>

          {/* Poll Content */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base text-secondary-100">Question/Poll Name</h4>
              <button className="text-sm text-secondary-100/70 hover:text-secondary-100 font-medium underline pb-1" onClick={() => open(<ViewVotes />)}>
                View Votes
              </button>
            </div>

            {/* Poll Options */}
            <div className="space-y-3">
              {pollOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedOption(option?.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                    selectedOption === option.id
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === option.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">{option.text}</span>
                  </div>
                  <span className="text-sm text-gray-400">{option.votes}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            195 • 7.74
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}