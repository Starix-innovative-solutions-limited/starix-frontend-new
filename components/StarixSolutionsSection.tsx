"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const solutions = [
  {
    title: "UGC Scoring Engine",
    desc: "Challenges that fit your niche. No pitching required. Challenges that fit your niche.",
    asset: "/handsss.svg",
    uiImg: "/recty.png",
    // Individual sizes for this asset
    assetWidth: "w-[400px]",
    assetHeight: "h-[401px]",
  },
  {
    title: "Verified Creator Profiles",
    desc: "Challenges that fit your niche. No pitching required. Challenges that fit your niche.",
    asset: "/people.svg",
    uiImg: "/recty.png",
    assetWidth: "w-[592px]",
    assetHeight: "h-[600px]",
  },
  {
    title: "Trend Intelligence",
    desc: "Challenges that fit your niche. No pitching required. Challenges that fit your niche.",
    asset: "/dish.svg",
    uiImg: "/recty.png",
    assetWidth: "w-[455px]",
    assetHeight: "h-[405px]",
  },
  {
    title: "Challenge Control Center",
    desc: "Challenges that fit your niche. No pitching required. Challenges that fit your niche.",
    asset: "/joystick.svg",
    uiImg: "/recty.png",
    assetWidth: "w-[400px]",
    assetHeight: "h-[420px]",
  },
];

const SolutionCard = ({ title, desc, asset, uiImg, index, assetWidth, assetHeight }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.08 }}
    className="relative w-full mb-6 last:mb-0 bg-[#ECF0FF] min-w-[900px] rounded-[28px] overflow-hidden"
  >
    {/* TOP SECTION: text left, 3D asset right */}
    <div className="relative flex items-start justify-between px-8 md:px-12 pt-10 pb-0">

      {/* TEXT */}
      <div className="flex flex-col z-10 max-w-[60%]">
        <h3
          className="text-[#040136] font-light leading-tight mb-3 text-[48px] tracking-[-0.01em]"
          style={{ fontFamily: "Geist" }}
        >
          {title}
        </h3>
        <p className="text-[#203646B2] font-normal leading-relaxed text-[32px] min-w-[900px]">
          {desc}
        </p>
      </div>

      {/* 3D ASSET — Now uses individual sizes from props */}
      <div 
        className={`absolute pointer-events-none z-[1] top-[-5px] right-[-10px] ${assetWidth} ${assetHeight}`}
      >
        <Image
          src={asset}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-contain object-right-top"
        />
      </div>
    </div>

    {/* DASHBOARD SCREENSHOT */}
    <div className="relative mx-6 mt-6 z-20 rounded-t-[14px] overflow-hidden">
      <Image
        src={uiImg}
        alt={`${title} dashboard`}
        width={1200}
        height={800}
        className="w-full h-auto object-top"
      />
    </div>
  </motion.div>
);

const StarixSolutionsSection = () => {
  return (
    <section className="py-24 bg-white px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">

        {/* HEADER */}
        <div className="flex flex-row justify-between items-start mb-12 gap-6">
          <h2 className="font-regular flex items-center gap-2 text-[#040136] leading-[1.1] tracking-tight text-[clamp(28px,4vw,64px)]">
            Built for how you
            <Image src="/idaya.svg" alt="" width={96} height={96} className="h-[1em] w-auto inline-block" />
            actually work
          </h2>

          <p className="text-[#6E6E6E] font-regular text-right text-[20px] self-center">
            No matter what niche <br/> of content you need
          </p>
        </div>

        {/* CARDS STACK */}
        <div className="flex flex-col gap-5">
          {solutions.map((item, i) => (
            <SolutionCard key={i} {...item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StarixSolutionsSection;