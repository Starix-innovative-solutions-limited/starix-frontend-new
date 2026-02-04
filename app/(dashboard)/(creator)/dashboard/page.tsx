/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { variants } from "@/constant";
import { MdStarRate } from "react-icons/md";
import { FaFire, FaClock, FaChartLine, FaHashtag } from "react-icons/fa";
import PostCard from "@/components/(creator)/dashboard/PostCard";
import WeeklyLeaderboard from "@/components/(creator)/dashboard/WeeklyLeaderboard";
import { useAuthStore } from "@/store/useAuthStore";
import LinearGradientBorder from "@/components/ui/LinearGradientBorder";
import Link from "next/link";

const Page = () => {
  const { profile } = useAuthStore();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // ✅ Star level logic (0–100)
  const star = useMemo(() => {
    const raw = Number(profile?.reputation_score ?? 0);
    const pct = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0;

    // Names + colors that feel “creator journey”
    if (pct <= 15) return { label: "SPARK", color: "#9CA3AF", pct }; // gray
    if (pct <= 35) return { label: "RISING", color: "#22C55E", pct }; // green
    if (pct <= 60) return { label: "EMERGING", color: "#FD6C1D", pct }; // orange
    if (pct <= 85) return { label: "PRO", color: "#8B5CF6", pct }; // purple
    return { label: "ELITE", color: "#06B6D4", pct }; // cyan
  }, [profile?.reputation_score]);

  const statsCards = [
    {
      label: "Starix Score:",
      value: profile?.reputation_score ?? 0,
      valueSize: "text-3xl",
      image: "/star 2.svg",
    },
    {
      label: "Your Niche:",
      value: profile?.content_categories ? profile?.content_categories : "nil",
      valueSize: "text-lg",
      image: "/ball 2.svg",
    },
    {
      label: "Ongoing Challenges:",
      value: "10",
      valueSize: "text-3xl",
      image: "/trophy.svg",
    },
  ];

  const trendingInsights = [
    {
      icon: FaFire,
      category: "Hot Topic",
      text: "Short comedic skits up 34% this week!",
      gradient: "from-orange-100 via-pink-100 to-purple-100",
    },
    {
      icon: FaFire,
      category: "Catchy Hook",
      text: `"People don't talk about this enough..."`,
      gradient: "from-pink-100 via-purple-100 to-blue-100",
    },
    {
      icon: FaClock,
      category: "Posting Time",
      text: "7:30 PM, highest engagement predicted",
      gradient: "from-blue-100 via-cyan-100 to-teal-100",
    },
    {
      icon: FaFire,
      category: "Content Idea",
      text: "Create your routine POV video",
      gradient: "from-purple-100 via-pink-100 to-rose-100",
    },
    {
      icon: FaChartLine,
      category: "Top Engagement",
      text: "Mini product demos are generating 2.1x",
      gradient: "from-amber-100 via-orange-100 to-red-100",
    },
    {
      icon: FaHashtag,
      category: "Trending Hashtags",
      text: "#DayInMyLife #Creator #FYP",
      gradient: "from-cyan-100 via-blue-100 to-indigo-100",
    },
  ];

  // ✅ profile image fallback
  const profileImage =
    profile?.profile_picture ||
    profile?.avatar ||
    profile?.image ||
    "/avatar.svg"; // put a default avatar in /public/avatar.png

  return (
    <div className="min-h-screen w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className="mx-auto w-full"
      >
        {/* Header */}
        <motion.div
          variants={variants?.headerVariants}
          className="
            flex flex-col gap-4
            md:flex-row md:items-center md:justify-between
            mb-4 md:mb-8
          "
        >
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              w-fit
              flex items-center gap-2
              py-2 px-3
              text-xl md:text-2xl
              font-normal
              rounded-xl
              hover:bg-gray-100 transition-colors
              text-secondary-100
            "
          >
            Overview
          </motion.span>

          {/* Right header block */}
          <div
            className="
              w-full md:w-fit
              flex items-center
              justify-between
              gap-3 md:gap-5
              bg-white border border-gray-200 rounded-2xl
              px-3 py-3 md:py-2
            "
          >
          

            {/* Star badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex items-center justify-between
                md:justify-start
                gap-3
                px-4 py-2
                border border-gray-200
                text-secondary-100
                hover:bg-gray-100
                rounded-lg
                bg-[#FFF8F5]
              "
            >
              <div className="flex items-center gap-2">
                <MdStarRate size={24} color={star.color} />
                <motion.span className="text-sm tracking-wide">
                  {star.label} CREATOR
                </motion.span>
              </div>

              <span className="text-secondary-100/70 text-xs">
                Level {Math.round(star.pct)}
              </span>
            </motion.div>


            {/* Progress ring */}
            <div
              className="relative w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: `conic-gradient(${star.color} 0% ${star.pct}%, #e0e0e0 ${star.pct}% 100%)`,
              }}
              aria-label={`Progress ${Math.round(star.pct)} percent`}
            >
              <div className="w-10 h-10 p-2 rounded-full bg-white flex items-center justify-center">
                <span className="text-[10px] font-light text-gray-800">
                  {Math.round(star.pct)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Body */}
        <div className="w-full">
          {/* Stats Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 my-6 md:my-16"
          >
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                variants={item}
                className="
                  bg-white
                  border border-gray-100
                  rounded-[20px]
                  w-full
                  h-[100px]
                  md:w-[335px]
                 
                  px-4
                  shadow
                  hover:shadow-lg
                  transition-shadow
                  flex items-center justify-between
                "

              >
                <div className="space-y-2 min-w-0">
                  <p className="text-dark text-sm">{card.label}</p>
                  <span className={`font-normal text-secondary-100 ${card.valueSize} break-words`}>
                    {card.value}
                  </span>
                </div>

                <Image
                  src={card.image}
                  width={120}
                  height={82}
                  alt={card.label}
                  className="w-24 md:w-36 h-auto object-contain shrink-0"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mt-8 mb-12">
            {/* Trending */}
            <div className="lg:col-span-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                Trending in Your Niche
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-14">
                {trendingInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <LinearGradientBorder key={index}>
                      <div className="relative flex items-start gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] md:text-xs text-dark uppercase mb-1 bg-[#F5F5F5] p-1.5 border border-gray-100 shadow-2xs w-fit rounded-md">
                            {insight.category}
                          </p>

                          <div className="text-gray-800 font-medium flex items-start gap-2 mt-2">
                            <Icon className="text-orange-500 text-lg md:text-xl flex-shrink-0 mt-0.5" />
                            <span className="text-sm md:text-sm break-words">
                              {insight.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </LinearGradientBorder>
                  );
                })}
              </div>
            </div>

            {/* Top Creators */}
            <div className="w-full">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                Top Creators in Your Niche
              </h2>
              <WeeklyLeaderboard />
            </div>
          </div>

          {/* Active Challenges */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Active Challenges
              </h2>

              <Link
                href="/challenges"
                className="
                
                  text-[#040136]
                  px-4 py-2
                  rounded-full
                  font-semibold
                  transition-all duration-200
                  hover:opacity-90
                "
              >
                See All
              </Link>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((c) => <PostCard key={c} />)}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
