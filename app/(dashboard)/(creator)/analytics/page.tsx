/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { variants } from "@/constant";
import { motion } from "framer-motion";

import LinearGradientBorder from "@/components/ui/LinearGradientBorder";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import PostCard from "@/components/(creator)/dashboard/PostCard";
import EarningInsight from "@/components/(creator)/dashboard/creator/analytics/EarningInsight";
import { EngagementChart } from "@/components/(creator)/dashboard";

const Page = () => {

  return (
    <div className="min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className=" flex flex-col gap-7"
      >

        {/* Header */}
        <motion.div
          variants={variants?.headerVariants}
          className=" mb-5 md:mb-10"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gap-2 py-2 text-2xl font-normal hover:bg-gray-100 transition-colors text-secondary-100 "
          >
            Analytics
          </motion.span>
        </motion.div>

        <motion.div variants={variants?.containerVariants} className="space-y-10 md:space-y-16">
          <motion.div>
            <motion.div className=" grid md:grid-cols-3 gap-6">
              {
                [{
                  label: 'Total engagement',
                  text: '120'
                }, {
                  label: 'Top Performing Platform',
                  text: 'Tiktok'
                }, {
                  label: 'Avg Engagement Rate',
                  text: '10hr'
                },]?.map((item: any, i: number) => (
                  <LinearGradientBorder key={i} className="py-0.5 px-0.5">
                    <div className="flex items-start justify-between text-sm">
                      <div className="flex flex-col gap-3">
                        <span className="text-dark font-light text-base">{item?.label} :</span>
                        <p className={` text-secondary-100 font-normal !text-2xl ${i == 1 && 'bg-[#fafafa] w-fit px-2 py-1 !text-base'} `}>{item?.text}</p>
                      </div>
                      <TbBrandGoogleAnalytics className="text-xs text-secondary-100" />
                    </div>
                  </LinearGradientBorder>
                ))
              }
            </motion.div>
          </motion.div>


          <motion.div className="">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gap-2 py-2 text-2xl font-normal hover:bg-gray-100 transition-colors text-secondary-100 "
            >
              Posting Tracker
            </motion.span>

            <motion.div className=" mt-10 bg-white py-4 px-6 rounded-xl shadow flex max-md:flex-col md:justify-between w-full">
              <div className="flex gap-2 items-center">
                <span className="p-3 rounded-2xl bg-[#fafafa]">
                  <IoMdTime size={52} className="text-secondary-100/70" />
                </span>
                <div className="flex flex-col">
                  <p className="font-normal text-xl text-secondary-100">Best Posting Time</p>
                  <p className="text-base font-light text-secondary-100/70">Tuesdays, 6 PM</p>
                </div>
              </div>

              <div className="flex flex-col mt-4 gap-2 md:gap-8  justify-end ">
                <span className="bg-[#EBEFFF] -translate-y-3 px-2 py-0 text-xs max-md:w-fit flex items-center font-light h-fit text-secondary-100 rounded-md">
                  Based On Your Post Engagements
                </span>
                <span className="text-dark text-xs font-light flex items-center gap-2 -translate-x-3 ml-15">
                  <span className="w-3 h-3 rounded-full bg-dark" />
                  Avg engagement +42%
                </span>
              </div>
            </motion.div>

          </motion.div>

          <EngagementChart showLabel />

          <motion.div className="">
            <div className="flex items-center justify-between">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gap-2 py-2 text-2xl font-normal hover:bg-gray-100 transition-colors text-secondary-100 "
              >
                Post Insight
              </motion.span>

              <button className="rounded-2xl px-4 py-2 border-[0.4px]  border-dark flex items-center gap-2">
                <IoFilterOutline />
                <span className="text-dark font-light">Filter</span>

              </button>
            </div>

            <motion.div className=" mt-10 py-4  grid max-md:grid-cols-1 md:grid-cols-3 gap-10">
              {
                [1, 1, 1]?.map((item, i) => (
                  <PostCard key={i} link={'/analytics/post-insight'} />
                ))
              }
            </motion.div>

          </motion.div>


          <EarningInsight />

        </motion.div>

      </motion.div >
    </div >
  );
};

export default Page;
