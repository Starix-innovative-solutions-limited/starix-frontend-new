"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const paths = [
  {
    title: "New Creators",
    desc: "No followers? No problem. Build your creator portfolio from day one and watch your Starix Score grow with every challenge you join.",
    icon: "/sits.svg", 
  },
  {
    title: "Micro Creators",
    desc: "Get consistent access to paid challenges without pitching brands or waiting for collaborations to come to you.",
    icon: "/or-clock.svg",
  },
  {
    title: "Trend Creators",
    desc: "If you love jumping on trends, you're in the right place. Join fast-moving challenges designed for viral energy and high engagement.",
    icon: "/sits.svg",
  },
  {
    title: "Mega Creators",
    desc: "Create with confidence. Your content can shine, and win, because Starix rewards quality, not audience size.",
    icon: "/sits.svg",
  },
];

const PathCard = ({ title, desc, icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[#FFEBE0] rounded-[24px] p-4 flex flex-col items-start text-left h-full relative z-10"
  >
    {/* 3D ICON */}
    <div className="mb-8 w-[100px] h-[100px] relative">
      <Image
        src={icon}
        alt={title}
        fill
        className="object-contain"
      />
    </div>

    {/* TEXT CONTENT */}
    <h3 className="text-[#040136] font-normal text-[24px] md:text-[30px] mb-2 leading-tight">
      {title}
    </h3>
    <p 
    className="text-[#203646B2] font-geist font-normal text-[20px] leading-[25px] tracking-[-0.03em]"
    style={{ fontFamily: 'Geist, sans-serif' }}
    >
    {desc}
    </p>
  </motion.div>
);

const CreatorPathSection = () => {
  return (
    <section className="relative py-24 bg-white px-6">
      <div className="max-w-[1248px] mx-auto relative">
        
        {/* CENTERED HEADER AREA */}
        <div className="mb-20 text-center">
          <h2 
            className="text-[#040136] text-[48px] md:text-[64px] font-light leading-[1.1] tracking-[-0.02em]"
            style={{ 
              fontFamily: "'Merriweather', serif", 
              fontWeight: 300 
            }}
          >
            Wherever you are, <br />
            there’s a path forward
          </h2>
        </div>

        

        {/* GRID OF CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {paths.map((item, i) => (
            <PathCard key={i} {...item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CreatorPathSection;