/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import LinearGradientBorder from "@/components/ui/LinearGradientBorder";
import { CiCreditCard2 } from "react-icons/ci";
import PostCard from "@/components/dashboard/PostCard";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useModal } from '@/hooks/useModal'
import CreateSkills from "@/components/dashboard/creator/CreateSkills";
import CreateProject from "@/components/dashboard/creator/CreateProject";
import { PiLinkSimpleHorizontalThin } from "react-icons/pi";



const Page = () => {

  const { open } = useModal()

  const challenges = [
    {
      category: "Portfolio Views",
      text: "150",
    },
    {
      category: "Total Posts",
      text: "150",
    },
    {
      category: "Top Platform",
      text: "Tiktok",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col  gap-10">

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
      // className="mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={variants?.headerVariants}
          className="flex justify-between items-start mb-8"
        >

          <div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 py-2 text-2xl  hover:bg-gray-100 transition-colors text-secondary-100 "
            >
              Portfolio
            </motion.span>
            <div className="flex-center gap-5">
              {
                ['/tiktok/Favour', '/youtube/Favour']?.map((item, i) => (
                  <span key={i} className="text-dark-navy/60 font-light rounded bg-[#f5f5f5] px-2 py-1 border border-gray-100 flex-center gap-2">
                    <PiLinkSimpleHorizontalThin size={22} /> <span>{item}</span>
                  </span>
                ))
              }

            </div>
          </div>



          <motion.div className="flex items-center gap-5">

            <button className="bg-[#F5F5F5] px-3 py-2 rounded-full flex items-center gap-2 text-secondary-100/70 border border-[#6E6E6E33] shadow-2xs">
              <Image src='/share.png' alt='' width={1000} height={1000} className="w-auto h-4" />
              <span className="text-sm">Share</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div variants={variants?.containerVariants} className="grid md:grid-cols-3 gap-3 md:gap-6">
          {
            challenges?.map((item: any, i: number) => (
              <LinearGradientBorder key={i}>
                <div className="flex items-start justify-between py-2 px-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-dark text-sm">
                      {item?.category}&nbsp;challenges
                    </span>
                    <p className="text-2xl text-secondary-100">
                      {item?.text}
                    </p>
                  </div>

                  <span>
                    <CiCreditCard2 className="text-secondary-100" />
                  </span>
                </div>
              </LinearGradientBorder>
            ))
          }
        </motion.div>

      </motion.div>




      <motion.div className="mt-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-secondary-100 ">Top skills</h2>
          <button className="text-secondary-100 border-[0.4px] border-secondary-100/40 flex items-center gap-1.5 px-3 py-2 rounded-full" onClick={() => open(<CreateSkills />)}>
            <FiEdit2 className="text-sm" />
            <span className="font-light text-secondary-100 text-sm"> Edit</span> </button>
        </div>

        <div className="flex gap-6  mt-10 bg-white rounded-2xl shadow p-10">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item) => (
              <button key={item} className="bg-white border-[0.4px] border-secondary-100 rounded-4xl text-secondary-100/60 px-3 py-1.5">
                Challenge
              </button>
            ))
          }
        </div>
      </motion.div>


      <div className="flex-between">

        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 py-2 text-2xl  hover:bg-gray-100 transition-colors text-secondary-100 "
        >
          Projects
        </motion.span>


        <motion.div className="flex items-center gap-5">
          <button className="bg-[#F5F5F5] py-2 px-3 rounded-full flex items-center gap-2 text-secondary-100/70 border border-[#6E6E6E33] shadow-2xs">
            <Image src='/SolarBold.png' alt='' width={1000} height={1000} className="w-auto h-3" />
            <span className="text-sm">Rearrange</span>
          </button>

          <button className="bg-[#F5F5F5] py-2 px-3 rounded-full flex items-center gap-2 text-secondary-100/70 border border-[#6E6E6E33] shadow-2xs" onClick={() => open(<CreateProject />)}>
            <HiOutlinePlusSm />
            <span className="text-sm">Create New</span>
          </button>

        </motion.div>
      </div>
      <div className="grid  md:grid-cols-3 gap-6  my-4">
        {[1, 2, 3, 4, 5, 6].map((challenge) => (
          <PostCard key={challenge} link={'/portfolio/work-details'} />
        ))}
      </div>

    </div>
  );
};

export default Page;
