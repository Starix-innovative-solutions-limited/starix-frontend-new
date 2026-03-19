"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const challenges = [
  {
    title: "Hard to Grow Audience",
    desc: "Hard to grow when you don't know what's working.",
    icon: "/sits.svg", // Replace with your placeholder/asset
  },
  {
    title: "Fast-Moving Trends",
    desc: "Trends move fast. By the time you catch one, it's already gone.",
    icon: "/or-clock.svg",
  },
  {
    title: "Brand Credibility",
    desc: "No way to prove you're worth the investment.",
    icon: "/sits.svg",
  },
  {
    title: "Limited Opportunities",
    desc: "Opportunities exist. They're just not reaching you.",
    icon: "/sits.svg",
  },
];

const ChallengeCard = ({ title, desc, icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[#FFEBE0] rounded-[24px] p-3 flex flex-col items-start text-left h-full relative z-10"
  >
    {/* 3D ICON */}
    <div className="mb-8 w-[100px] h-[128px] relative">
      <Image
        src={icon}
        alt={title}
        fill
        className="object-contain"
      />
    </div>

    {/* TEXT CONTENT */}
    <h3 className="text-[#040136] max-w-[200px] font-normal text-[30px]  leading-tight">
      {title}
    </h3>
    <p className="text-[#203646B2] text-[20px] font-normal leading-relaxed">
      {desc}
    </p>
  </motion.div>
);

const StarixChallengesSection = () => {
  return (
    <section className="relative py-20 bg-white px-6">
      <div className="max-w-[1248px] mx-auto relative">
        
        {/* HEADER AREA */}
        <div className="mb-16">
          <h2 
            className="text-[#040136] text-[48px] md:text-[64px] font-light leading-[1.2] tracking-[-0.02em]"
            style={{ 
              fontFamily: "'Merriweather', serif", 
              fontWeight: 300 
            }}
          >
            What’s been holding <br />
            <span className="text-[#FD6C1D]">you back...</span>
          </h2>
        </div>

        {/* LARGE FLOATING BACKGROUND ASSET (The Orange "A" shape) */}
        <div className="absolute top-[-24%] right-[-12%] w-[641px] h-[600px] pointer-events-none z-0 ">
          <Image
            src="/candy-or.svg" // Replace with your "Group 1000005959" or similar asset
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* GRID OF CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {challenges.map((item, i) => (
            <ChallengeCard key={i} {...item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StarixChallengesSection;