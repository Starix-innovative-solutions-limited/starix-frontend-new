/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import LinearGradientBorder from "@/components/ui/LinearGradientBorder";
import { CiCreditCard2 } from "react-icons/ci";
import PostCard from "@/components/(creator)/dashboard/PostCard";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useModal } from '@/hooks/useModal'
import CreateSkills from "@/components/(creator)/dashboard/creator/CreateSkills";
import CreateProject from "@/components/(creator)/dashboard/creator/CreateProject";
import { PiLinkSimpleHorizontalThin } from "react-icons/pi";
import PostCard2 from "@/components/(creator)/dashboard/PostCard2";



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
    <div className="
      min-h-screen
      flex flex-col gap-10
      w-full
      max-w-[1400px]
      mx-auto
      px-4 sm:px-6 lg:px-8
    ">



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
          className="
          flex flex-col gap-4
          md:flex-row md:justify-between md:items-start
          mb-8
        "

        >

          <div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 py-2 text-2xl  hover:bg-gray-100 transition-colors text-secondary-100 "
            >
              Portfolio
            </motion.span>
            <div className="
              flex gap-3
              flex-wrap
              md:flex-nowrap
            ">

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

       <div
        className="
          grid grid-cols-4 gap-3
          mt-6
          bg-white
          rounded-2xl
          shadow
          p-4 sm:p-6 md:p-8

          md:flex md:flex-wrap
          md:justify-center
          md:gap-6
        "
      >



          {
            [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <button
                key={item}
                className="
                  w-full
                  bg-white
                  border-[0.4px] border-secondary-100
                  rounded-4xl
                  text-secondary-100/60
                  text-center
                  px-1.5 py-1.5
                  md:px-2 md:py-2
                  text-xs sm:text-sm md:text-base
                  md:w-auto
                "
              >
                Challenge
              </button>
            ))
          }

        </div>
      </motion.div>


      <div className="flex items-start justify-between flex-wrap gap-3">


        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 py-2 text-2xl  hover:bg-gray-100 transition-colors text-secondary-100 "
        >
          Projects
        </motion.span>


        <motion.div
          className="
            flex flex-wrap
            items-center
            gap-3
            w-full
            sm:w-auto
            justify-start
            sm:justify-end
          "
        >

          <button className="
  bg-[#F5F5F5]
  py-2 px-3
  sm:px-4
  rounded-full
  flex items-center gap-2
  text-secondary-100/70
  border border-[#6E6E6E33]
  shadow-2xs
  w-full sm:w-auto
  justify-center
  text-xs sm:text-sm
"
>
            <Image src='/SolarBold.png' alt='' width={1000} height={1000} className="w-auto h-3" />
            <span className="text-sm">Rearrange</span>
          </button>

          <button className="
  bg-[#F5F5F5]
  py-2 px-3
  sm:px-4
  rounded-full
  flex items-center gap-2
  text-secondary-100/70
  border border-[#6E6E6E33]
  shadow-2xs
  w-full sm:w-auto
  justify-center
  text-xs sm:text-sm
"
 onClick={() => open(<CreateProject />)}>
            <HiOutlinePlusSm />
            <span className="text-sm">Create New</span>
          </button>

        </motion.div>
      </div>
      <div className="grid w-full md:grid-cols-3 gap-6 my-4">

        {[1, 2, 3, 4, 5, 6].map((challenge) => (
          <PostCard2 key={challenge} link={'/portfolio/work-details'} />
        ))}
      </div>

    </div>
  );
};

export default Page;
