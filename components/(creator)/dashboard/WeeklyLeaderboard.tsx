import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'


const WeeklyLeaderboard = () => {
  return (
    <div className="bg-white rounded-2xl p-4  md:p-6 shadow border border-gray-100 w-full">
                <div className="flex items-center gap-2 text-gray-500 border-b max-md:pt-2 py-5 border-[#6E6E6E33] justify-center-safe">
                  <Image src={'/badge.svg'} width={1000} height={1000} alt="try" className="w-8" />
                  <span className="text-base text-dark ">Weekly Leaderboard</span>
                </div>

                <div className="space-y-4 pt-4">
                  {[
                    { rank: '#12', badge: 'You' },
                    { rank: '#1', badge: null },
                    { rank: '#2', badge: null },
                    { rank: '#3', badge: null },
                    { rank: '#4', badge: null }
                  ].map((creator, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 ${creator.badge && "bg-[#FFF8F5]"} `}
                    >
                      <div className="flex items-center gap-2 md:gap-4">
                        <span className="text-dark font-semibold w-8">{creator.rank}</span>
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full"></div>
                        <span className="font-medium text-gray-800 max-md:text-sm">@Favvy</span>

                      </div>
                      <div className="flex items-center gap-4 md:gap-3">
                        {creator.badge && (
                          <span className="bg-[#FFDECC] text-orange-600 text-xs px-2 py-1 rounded-lg">{creator.badge}</span>
                        )}
                        <span className="text-2xl font-bold text-gray-800">1000</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
  )
}

export default WeeklyLeaderboard