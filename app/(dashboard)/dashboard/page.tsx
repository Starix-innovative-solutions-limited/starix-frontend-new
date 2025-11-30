/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { variants } from "@/constant";
import { MdStarRate } from "react-icons/md";
import { FaFire, FaClock, FaChartLine, FaHashtag, FaHeart, FaComment, FaEye } from 'react-icons/fa';

const Page = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const statsCards = [
    {
      label: "Starix Score:",
      value: "150",
      valueSize: "text-3xl",
      image: "/star.png"
    },
    {
      label: "Your Niche:",
      value: "Fashion",
      valueSize: "text-lg",
      image: "/ball.png"
    },
    {
      label: "Ongoing Challenges:",
      value: "10",
      valueSize: "text-3xl",
      image: "/trophy.png"
    }
  ];

  const trendingInsights = [
    {
      icon: FaFire,
      category: "Hot Topic",
      text: "Short comedic skits up 34% this week!",
      gradient: "from-orange-100 via-pink-100 to-purple-100"
    },
    {
      icon: FaFire,
      category: "Catchy Hook",
      text: "\"People don't talk about this enough...\"",
      gradient: "from-pink-100 via-purple-100 to-blue-100"
    },
    {
      icon: FaClock,
      category: "Posting Time",
      text: "7:30 PM, highest engagement predicted",
      gradient: "from-blue-100 via-cyan-100 to-teal-100"
    },
    {
      icon: FaFire,
      category: "Content Idea",
      text: "Create your routine POV video",
      gradient: "from-purple-100 via-pink-100 to-rose-100"
    },
    {
      icon: FaChartLine,
      category: "Top Engagement",
      text: "Mini product demos are generating 2.1x",
      gradient: "from-amber-100 via-orange-100 to-red-100"
    },
    {
      icon: FaHashtag,
      category: "Trending Hashtags",
      text: "#DayInMyLife #Creator #FYP",
      gradient: "from-cyan-100 via-blue-100 to-indigo-100"
    }
  ];
  return (
    <div className="min-h-screen">

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className="mx-auto "
      >
        {/* Header */}
        <motion.div
          variants={variants?.headerVariants}
          className="flex max-md:flex-col md:justify-between md:items-center mb-3 md:mb-8 gap-3"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 py-2 text-4xl font-normal hover:bg-gray-100 transition-colors text-secondary-100 "
          >
            Overview
          </motion.span>
          <div className="flex items-center space-x-5 bg-white border border-gray-200 rounded-2xl px-3 py-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-4 px-4 py-1.5 border border-gray-200  text-secondary-100 hover:bg-gray-100 rounded-lg bg-[#FFF8F5]"
            >
              <MdStarRate size={24} color="#FD6C1D" />
              <motion.span className="text-sm">
                EMERGING CREATOR
              </motion.span>

            </motion.div>

            <span className="text-secondary-100/70">
              LEVEL 2
            </span>


            <div className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "conic-gradient(#ff6b35 0% 75%, #e0e0e0 75% 100%)" }}>
              <div className="w-9 h-9 p-2 rounded-full bg-white flex items-center justify-center">
                <span className="text-xs font-light text-gray-800">75%</span>
              </div>
            </div>

          </div>
        </motion.div>






        <div className="">

          {/* Stats Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 my-5 md:my-16"
          >



            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white border border-gray-100 rounded-2xl px-6 py-2 shadow hover:shadow-lg transition-shadow flex justify-between items-center"
              >

                <div className="space-y-4">
                  <p className="text-dark text-base mb-2">{card.label}</p>
                  <span className={`font-bold text-secondary-100 ${card.valueSize}`}>{card.value}</span>
                </div>

                {/* <div className={card.iconClass}></div> */}

                <Image src={card?.image} width={1000} height={1000} alt={card?.label} className="w-40 object-scale-down" />
              </motion.div>
            ))}


          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:mt-20 mb-12">
            {/* Trending in Your Niche */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 max-md:mb-10">Trending in Your Niche</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {trendingInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div key={index} className="p-[1px] rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      style={{
                        background: "linear-gradient(90deg, #FD6C1D 0%, #06FF89 50%, #040136 100%)",
                      }}>
                      <motion.div

                        className="bg-white rounded-xl p-5 shadow-md relative overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r opacity-30`}></div>
                        <div className="relative flex items-start gap-3">

                          <div>
                            <p className="text-xs text-dark uppercase mb-1 bg-[#F5F5F5] p-1.5 border border-gray-100 shadow-2xs w-fit">{insight.category}</p>
                            <div className="text-gray-800 font-medium flex items-center gap-2 mt-2">
                              <Icon className="text-orange-500 text-xl  flex-shrink-0" />
                              <span>{insight.text}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Top Creators */}
            <div className="max-md:mt-20 w-full ">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Creators in Your Niche</h2>
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
            </div>
          </div>

          {/* Active Challenges */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Active Challenges</h2>
              <button className="text-purple-600 hover:text-purple-700 font-semibold">See All</button>
            </div>

            <div className="grid  md:grid-cols-3 gap-6  my-10">
              {[1, 2, 3, 4, 5, 6].map((challenge) => (
                <motion.div
                  key={challenge}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <div className="relative">
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

                  <div className="p-4 flex items-center justify-between">
                    <p className="font-semibold text-gray-800 mb-3">Your Caption here</p>
                    <div className="flex items-center gap-4 text-dark">
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-red-400" />
                        <span className="text-sm">500</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaComment className="text-blue-400" />
                        <span className="text-sm">10</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </motion.div >
    </div >
  );
};

export default Page;
