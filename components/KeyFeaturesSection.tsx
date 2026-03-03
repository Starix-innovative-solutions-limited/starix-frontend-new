"use client";

import React, { useState, useRef } from "react";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";



const tabs = ["Challenge", "Guidance", "Entries", "Reward"];

const contentMap: Record<
  string,
  {
    tag: string;
    title: string;
    desc: string;
    img: string;
  }
> = {
  Challenge: {
    tag: "UGC COMMUNITY",
    title: "Create Challenge for Thousands of Creators",
    desc: "Launch structured UGC challenges, set rules, rewards, and timelines—then let creators compete.",
    img: "/keyFeaturesFram2.png",
  },
  Guidance: {
    tag: "CREATOR GUIDANCE",
    title: "Guide Submissions with Briefs & Direction",
    desc: "Provide hooks, captions, tone and examples so creators stay aligned with your brand voice.",
    img: "/keyFeaturesFram2.png",
  },
  Entries: {
    tag: "ENTRIES SYSTEM",
    title: "Track Entries and Performance in One Place",
    desc: "See submissions, engagement, and winners with clear performance visibility and ROI signals.",
    img: "/keyFeaturesFram2.png",
  },
  Reward: {
    tag: "REWARDS",
    title: "Reward Creators Seamlessly",
    desc: "Manage payouts, escrow, and creator rewards automatically with full transparency.",
    img: "/keyFeaturesFram2.png",
  },
};

const KeyFeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("Challenge");
  const pillsRef = React.useRef<HTMLDivElement | null>(null);
  const active = contentMap[activeTab];

  return (
    <section className="py-24">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* ================= HEADER ================= */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16">

  {/* LEFT TITLE + ARROW */}
  <div className="relative w-full">

    {/* MOBILE ROW */}
    <div className="flex w-full items-start justify-between lg:block">

      {/* TEXT 80% */}
      <div className="md:w-[80%] lg:w-auto">
        <h2
          className="
            font-['Geist']
            font-[600]
            text-[22px]
            md:text-[48px]
            leading-[1.15]
            tracking-[-0.02em]
            text-[#0B0F3C]
          "
        >
          Key Features For Brands
          <br className="lg:block" />
          On Starix
        </h2>
      </div>

      {/* ARROW 20% (MOBILE ONLY) */}
      <div className="w-[20%] flex justify-end lg:hidden">
        <div className="rotate-180">

          <motion.div
            className="w-[90px] h-[60px] flex flex-col items-center justify-center"
            animate={{ rotate: [0, 20, 20, 0, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            {/* TOP */}
            <motion.div
              animate={{ opacity: [1, 0.3, 0.3, 1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            >
              <Image src="/Arrow 1.png" alt="" width={90} height={64} />
            </motion.div>

            {/* BOTTOM */}
            <motion.div
              className="absolute top-[32px] left-[12px]"
              animate={{ opacity: [0.3, 1, 1, 0.3, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            >
              <Image src="/Arrow 1.png" alt="" width={70} height={48} />
            </motion.div>
          </motion.div>

        </div>
      </div>

    </div>

    {/* DESKTOP ARROW (UNCHANGED POSITION) */}
    <div className="hidden lg:block absolute top-[calc(50px-120%)] rotate-90">
      <motion.div
        className="w-[140px] h-[96px] flex flex-col items-center justify-center pointer-events-none"
        animate={{ rotate: [0, 20, 20, 0, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 0.3, 1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <Image src="/Arrow 1.png" alt="" width={150} height={106} />
        </motion.div>

        <motion.div
          className="absolute top-[50px] left-[20px]"
          animate={{ opacity: [0.3, 1, 1, 0.3, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <Image src="/Arrow 1.png" alt="" width={117} height={80} />
        </motion.div>
      </motion.div>
    </div>

  </div>

  {/* PILLS */}
<div
  ref={pillsRef}
  className="
    flex flex-nowrap lg:flex-nowrap
    gap-4
    overflow-x-auto lg:overflow-visible
    scroll-smooth lg:scroll-auto
    no-scrollbar
    pb-2
    w-full
  "
>


  {tabs.map((tab) => {
    const isActive = tab === activeTab;
    return (
      <button
        key={tab}
        data-tab={tab}
        onClick={(e) => {
          setActiveTab(tab);

          // ✅ SMART AUTO-SNAP (mobile only)
          if (window.innerWidth < 1024) {
            const container = pillsRef.current;
            const btn = e.currentTarget;

            if (container && btn) {
              const containerRect = container.getBoundingClientRect();
              const btnRect = btn.getBoundingClientRect();

              const offset =
                btnRect.left -
                containerRect.left -
                containerRect.width / 2 +
                btnRect.width / 2;

              container.scrollBy({
                left: offset,
                behavior: "smooth",
              });
            }
          }
        }}
        className={`
          whitespace-nowrap
          px-8 py-3 rounded-full border
          font-['Geist']
          text-lg
          transition-all duration-300
          ${
            isActive
              ? "border-[#1A1F6B] text-[#1A1F6B] bg-white"
              : "border-[#8B8B8B] text-[#8B8B8B] bg-transparent"
          }
        `}
      >
        {tab}
      </button>
    );
  })}
</div>


</div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[32px] overflow-hidden bg-white shadow-[0_0_60px_rgba(0,51,255,0.1)]"
          >
            <div className="grid grid-cols-[30%_70%] min-h-[520px]">

              {/* LEFT */}
              <div className="p-8 lg:p-14 flex flex-col justify-center gap-6">
                <span className="inline-block w-fit bg-[#F1F3FF] text-[#1A1F6B] px-4 py-2 rounded-full text-sm font-medium">
                  {active.tag}
                </span>

                <AnimatePresence mode="wait">
                  <motion.h3
                    key={active.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="font-['Geist'] font-[500] text-[32px] text-[#0B0F3C] leading-[1.2]"
                  >
                    {active.title}
                  </motion.h3>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.desc}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="font-['Geist'] font-[300] text-[16px] text-[#6B6F8D] leading-[1.6]"
                  >
                    {active.desc}
                  </motion.p>
                </AnimatePresence>

                <div className="mt-4">
                  <Image src="/playButtons.svg" alt="icon" width={80} height={80} className="w-16 h-auto" />
                </div>
              </div>

              {/* RIGHT */}
              <div className="bg-[#E0E0E099] flex items-center justify-center p-6 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.img}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image src={active.img} alt="feature" width={1600} height={1200} className="w-full ml-20 h-auto object-contain" />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[12px] overflow-hidden bg-white shadow-[0_0_60px_rgba(0, 51, 255, 0.1)]"
          >
            {/* TOP TEXT */}
            <div className="px-6 pt-10 pb-6 text-center">

              <span className="inline-block bg-[#F1F3FF] text-[#1A1F6B] px-4 py-2 rounded-full text-xs font-medium mb-6">
                {active.tag}
              </span>

              <AnimatePresence mode="wait">
                <motion.h3
                  key={active.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-['Geist'] font-[600] text-[26px] leading-[1.25] text-[#0B0F3C] mb-4"
                >
                  {active.title}
                </motion.h3>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={active.desc}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="font-['Geist'] font-[300] text-[15px] leading-[1.6] text-[#6B6F8D] px-2"
                >
                  {active.desc}
                </motion.p>
              </AnimatePresence>

              <div className="flex justify-center mt-6">
                <Image src="/playButtons.png" alt="icon" width={60} height={60} className="w-10 h-auto" />
              </div>
            </div>

            {/* IMAGE */}
            <div className="bg-[#F5F6FA] px-4 pt-6 pb-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.img}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex justify-center"
                >
                  <Image src={active.img} alt="feature" width={1200} height={900} className="w-full h-auto object-contain rounded-xl" />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default KeyFeaturesSection;
