"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const solutions = [
  {
    title: "Creator Circles",
    description: "No followers? No problem. Build your creator portfolio from day one",
  },
  {
    title: "Trend Radar",
    description: "No followers? No problem. Build your creator portfolio from day one",
  },
  {
    title: "Starix Score",
    description: "No followers? No problem. Build your creator portfolio from day one",
  },
  {
    title: "Professional Portfolio",
    description: "No followers? No problem. Build your creator portfolio from day one",
  },
];

export default function StarixSolutionsAndFeatures() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#6e6e6e]mt-0 border-t-0">
  <div className="">   

        {/* Floating Bubble – Figma style */}
        <div
        className="
            absolute
            -top-50
            -left-2
            w-[240px] h-[240px]
            md:w-[280px] md:h-[280px]
            lg:w-[243px] lg:h-[335px]
            bg-no-repeat
            bg-contain
            pointer-events-none
            z-10
        "
        style={{ backgroundImage: "url('/bubble.svg')" }}
        />

      {/* ================= SOLUTIONS ================= */}
      <div className="px-6 md:px-20 py-1 flex flex-col gap-20 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            font-geist font-[600]
            text-[32px]
            md:text-[48px]
            tracking-[-0.02em]
            text-dark-navy
            text-center
        
            
          "
        >
          Starix Solutions
        </motion.h2>

        {/* SLIDER */}
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="
                bg-white rounded-3xl
                p-4
                flex-shrink-0
                snap-start
                w-[340px]
              "
            >
              <Image
                src={`/starixSolutions${index + 1}.png`}
                alt={solution.title}
                width={1200}
                height={1200}
                className="w-full h-auto mb-5"
              />

              <h3 className="font-geist font-[400] text-[28px] tracking-[-0.02em] text-dark-navy mb-3">
                {solution.title}
              </h3>

              <p className="font-geist font-[300] text-[20px] text-neut/60">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex pb-6 justify-center">
          <Link
            href="/signup"
            className="
                inline-flex items-center justify-center
                w-[193px]
                h-[68px]
                gap-[6px]

                rounded-[40px]
                bg-dark-navy

                px-[18px] py-[6px]

                text-white
                text-[14px] xl:text-[16px]
                font-medium

                transition-all duration-200
                hover:opacity-95
                hover:shadow-lg
              "
          >
            Join as a Creator
            <Image src="/rightArrow.svg" alt="arrow" width={20} height={20} />
          </Link>
        </div>

        <div
        className="
            absolute
            -bottom-30
            -right-5
            w-[220px] h-[220px]
            md:w-[260px] md:h-[260px]
            lg:w-[300px] lg:h-[300px]
            bg-no-repeat bg-contain
            pointer-events-none
            z-10
            hidden sm:block
        "
        style={{ backgroundImage: "url('/white bubble.svg')" }}
        />
      </div>

      </div>

      

      {/* ================= FEATURES ================= */}
      <div className="bg-white general-space py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            font-geist font-[600]
            text-[34px]
            md:text-[48px]
            tracking-[-0.02em]
            text-dark-navy
            text-center
            
          "
        >
          Key Features For Creators On Starix
        </motion.h2>

        {/* TOP ROW - REFRESHED STRUCTURE */}
<div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 mb-10">
  
  {/* BIG CARD: CHALLENGE MARKETPLACE */}
  <div className="bg-[#FF6D2C] rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-[45%_55%] min-h-[420px]">
    {/* Text Side */}
    <div className="p-10 md:p-14 flex flex-col justify-center items-start gap-8">
      <span className="bg-[#FAFAFA4D] backdrop-blur-md text-[#040136] px-4 py-1.5 rounded-md text-xs font-medium tracking-wider uppercase">
        CHALLENGE MARKETPLACE
      </span>

      <h2 className="font-geist font-[500] text-[28px] md:text-[28px] leading-[1.1] tracking-[-0.03em] text-white">
        Created Challenge for <br /> Thousands of Creators
      </h2>
    </div>

    {/* Image Side - Mockup Gallery */}
    <div className="relative bg-[#FDF1E9] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full scale-110 translate-x-4 ">
        <Image
          src="/frame1.png" // This should be your UI mockups image
          alt="Marketplace Mockups"
          fill
          className="object-contain object-right-bottom"
        />
      </div>
    </div>
  </div>

  {/* SMALL CARD: CREATOR CIRCLE */}
  <div className="bg-[#EEF2FF] rounded-[32px] p-10 flex flex-col items-center text-center justify-between overflow-hidden">
    <div className="flex flex-col items-center gap-6">
      <Image src="/Play buttons 1.svg" alt="icon" width={64} height={64} />

      <span className="bg-white text-dark-navy/60 px-4 py-1.5 rounded-md text-xs font-medium tracking-wider uppercase">
        CREATOR CIRCLE
      </span>

      <h2 className="font-geist font-[400] text-[25px] leading-tight text-dark-navy max-w-[280px]">
        Connect with Creators & Create a Community
      </h2>
    </div>

    {/* Dashboard Preview Image */}
    <div className="w-full mt-8 translate-y-6">
      <Image
        src="/imageDash11.png"
        alt="Circle Dashboard"
        width={500}
        height={300}
        className="w-full h-auto  rounded-t-xl shadow-2xl"
      />
    </div>
  </div>
</div>

        {/* BOTTOM ROW — CREATOR TOOLS */}
<div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
  
  {/* SMALL CARD: CREATOR TAG */}
  <div className="bg-[#FDF1E9] rounded-[32px] p-10 flex flex-col items-center text-center justify-between overflow-hidden">
    <div className="flex flex-col items-center gap-6">
      <Image src="/heart 1.svg" alt="heart icon" width={64} height={64} />

      <span className="bg-[#FAFAFA] bg-opacity-20 text-[#040136] px-4 py-1.5 rounded-md text-xs font-medium tracking-wider uppercase">
        CREATOR TAG
      </span>

      <h2 className="font-geist font-[400] text-[24px] leading-tight text-[#040136] max-w-[280px]">
        Get Discovered Even With  Small Following
      </h2>
    </div>

    {/* Profile Card Mockup - Partial reveal from bottom */}
    <div className="w-full mt-8 translate-y-8">
      <Image
        src="/imageDash12.png" 
        alt="Creator Profile Preview"
        width={500}
        height={400}
        className="w-full h-auto rounded-t-2xl shadow-xl"
      />
    </div>
  </div>

  {/* BIG CARD: CREATOR CV */}
  <div className="bg-[#040136] rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-[45%_55%] min-h-[420px]">
    {/* Text Side */}
    <div className="p-10 md:p-14 flex flex-col justify-center items-start gap-8">
      <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-md text-xs font-medium tracking-wider uppercase">
        CREATOR CV
      </span>

      <h2 className="font-geist font-[400] text-[32px] md:text-[28px] leading-[1.1] tracking-[-0.03em] text-white">
        Your Professional <br /> Portfolio + Analytics
      </h2>
    </div>

    {/* Analytics Dashboard Side - Full height background */}
    <div className="relative bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full scale-105 translate-x-4">
        <Image
          src="/frame22.png" 
          alt="Portfolio Analytics Dashboard"
          fill
          className="object-contain object-right-bottom"
        />
      </div>
    </div>
  </div>
</div>
      </div>
      

      
    </section>
  );
}
