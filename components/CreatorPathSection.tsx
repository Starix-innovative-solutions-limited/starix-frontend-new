"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const paths = [
  {
    title: "New Creators",
    desc: "No followers? No problem. Build your creator portfolio from day one and watch your Starix Score grow with every challenge you join.",
    icon: "/book.svg",
    bg: "bg-[#FEEADF]",
    imgClass: "w-[120%] bottom-[-5%] left-[-5%]",
    initialRotate: -20,
    initialY: 40,
    zIndex: 10,
  },
  {
    title: "Micro Creators",
    desc: "Get access to paid challenges without pitching brands or waiting for collaborations to come to you. Your creativity speaks for itself here.",
    icon: "/packer.svg",
    bg: "bg-[#C5E6FE]",
    imgClass: "w-[120%] bottom-[0%] right-[-25%]",
    initialRotate: -10,
    initialY: 10,
    zIndex: 20,
  },
  {
    title: "Trend Creators",
    desc: "If you love jumping on trends, you’re in the right place. Join fast-moving challenges designed for viral energy and high engagement.",
    icon: "/flash.svg",
    bg: "bg-[#FEEADF]",
    initialRotate: 10,
    initialY: 10,
    imgClass: "w-[110%] bottom-[0%] right-[-10%]",
    zIndex: 30,
  },
  {
    title: "Mega Creators",
    desc: "Create your own branded challenges, earn rewards, and ship impactful content at scale. Collaborate with other creators and brands to amplify your influence.",
    icon: "/blustar.svg",
    bg: "bg-[#C5E6FE]",
    imgClass: "w-[120%] bottom-[0%] right-[-20%]",
    initialRotate: 20,
    initialY: 40,
    zIndex: 40,
  },
];

const PathCard = ({ title, desc, icon, bg, imgClass, initialRotate, initialY, zIndex, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ 
      opacity: 1, 
      y: initialY, 
      rotate: initialRotate,
      zIndex: zIndex // This ensures the correct fanned stacking order
    }}
    whileHover={{ 
      rotate: 0, 
      y: 0, 
      scale: 1.05,
      zIndex: 100, // Pops to the very front when hovered
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    // Added border-4 border-white to make the "stack" clean
    className={`${bg} rounded-[32px] h-[345px] w-[20px] min-w-[290px] relative overflow-hidden p-6 shadow-lg cursor-pointer transition-shadow hover:shadow-lg `}
    style={{ transformOrigin: "bottom center" }}
  >
    {/* TEXT */}
    <div className="relative z-10">
      <h3 className="text-[#040136] text-[30px] font-normal mb-1 leading-tight">
        {title}
      </h3>
      <p className="text-[#040136]/70 max-w-[95%] text-[17px] leading-[1.5]">
        {desc}
      </p>
    </div>

    {/* IMAGE (BLEEDING) */}
    <div className={`absolute ${imgClass} h-[70%] pointer-events-none`}>
      <Image
        src={icon}
        alt={title}
        fill
        className="object-contain object-bottom"
      />
    </div>
  </motion.div>
);

const CreatorPathSection = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] px-6 overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-24 text-center">
          <h2 className="text-[#040136] text-[52px] md:text-[72px] font-medium leading-[1.05] tracking-tight">
            Wherever you are, <br />
            there’s a path forward
          </h2>
        </div>

        {/* FAN CONTAINER */}
        <div className="flex flex-col md:flex-row justify-center items-center perspective-[1000px]">
          {paths.map((item, i) => (
            // Added md:-mr-20 to pull cards closer together for the stacked look
            <div key={i} className="w-full md:w-auto md:-mr-20 last:mr-0">
              <PathCard {...item} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CreatorPathSection;