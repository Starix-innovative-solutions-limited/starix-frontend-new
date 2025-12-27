/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { variants } from "@/constant";
import { MdStarRate } from "react-icons/md";
import { FaFire, FaClock, FaChartLine, FaHashtag } from 'react-icons/fa';
import PostCard from "@/components/(creator)/dashboard/PostCard";
import WeeklyLeaderboard from "@/components/(creator)/dashboard/WeeklyLeaderboard";
import { useAuthStore } from "@/store/useAuthStore";
import LinearGradientBorder from "@/components/ui/LinearGradientBorder";
// import { useGetChallenges } from "@/hooks/useChallenges";


const Page = () => {
  const { profile } = useAuthStore()
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

  // const { data: getChallenges } = useGetChallenges()

  const statsCards = [
    {
      label: "Starix Score:",
      value: profile?.reputation_score,
      valueSize: "text-3xl",
      image: "/star.png"
    },
    {
      label: "Your Niche:",
      value: profile?.content_categories ? profile?.content_categories : 'nil',
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

  // console.log("challenges ", getChallenges?.challenges)

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
            className="flex items-center gap-2 py-2 text-2xl font-normal hover:bg-gray-100 transition-colors text-secondary-100 "
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
              LEVEL {profile?.reputation_score}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-md:mt-20 mb-12">
            {/* Trending in Your Niche */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 max-md:mb-10">Trending in Your Niche</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {trendingInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (

                    <LinearGradientBorder key={index}>
                      <div className="relative flex items-start gap-3">

                        <div>
                          <p className="text-xs text-dark uppercase mb-1 bg-[#F5F5F5] p-1.5 border border-gray-100 shadow-2xs w-fit">{insight.category}</p>
                          <div className="text-gray-800 font-medium flex items-center gap-2 mt-2">
                            <Icon className="text-orange-500 text-xl  flex-shrink-0" />
                            <span>{insight.text}</span>
                          </div>
                        </div>
                      </div>
                    </LinearGradientBorder>
                  );
                })}
              </div>
            </div>

            {/* Top Creators */}
            <div className="max-md:mt-20 w-full ">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Creators in Your Niche</h2>
              <WeeklyLeaderboard />
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
                <PostCard key={challenge} />
              ))}
            </div>
          </div>

        </div>

      </motion.div >
    </div >
  );
};

export default Page;
