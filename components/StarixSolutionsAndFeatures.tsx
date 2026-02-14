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
    <section className="relative bg-primary-orange/2">

        {/* Floating Bubble – Figma style */}
        <div
        className="
            absolute
            -top-30
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
      <div className="general-space relative py-32">
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
        <div className="flex gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="
                bg-white rounded-3xl
                px-6 pt-6 pb-10
                flex-shrink-0
                snap-start
                w-[340px]
              "
            >
              <Image
                src={`/starixSolution${index + 1}.png`}
                alt={solution.title}
                width={1200}
                height={1200}
                className="w-full h-auto mb-5"
              />

              <h3 className="font-geist font-[500] text-[28px] tracking-[-0.02em] text-dark-navy mb-3">
                {solution.title}
              </h3>

              <p className="font-geist font-[300] text-[20px] text-neut/60">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-20">
          <Link
            href="/signup"
            className="
              bg-dark-navy text-white
              rounded-full
              px-8 py-4
              flex items-center gap-2
              border border-dark-navy
              transition-all duration-300
              hover:bg-white hover:text-dark-navy
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

        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_35%] gap-10 mb-20">
          {/* BIG CARD */}
          <div className="bg-primary-orange rounded-3xl grid grid-cols-[37%_13%_50%] overflow-hidden">
            <div className="p-12 flex flex-col justify-center gap-10">
              <span className="bg-white/30 text-white px-3 py-1 text-sm w-fit">
                CHALLENGE MARKETPLACE
              </span>

              <p
                className="
                  font-geist
                  font-[400]
                  text-[28px]
                  leading-[1]
                  tracking-[-0.02em]
                  text-white
                  max-w-[260px]
                "
              >
                Created Challenge for <br /> Thousands of Creators
              </p>
            </div>

            <div />

            <div className="bg-[#F3E3D9]">
              <Image
                src="/frame1.png"
                alt="feature"
                width={1200}
                height={1200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* SMALL CARD */}
          <div className="bg-[#EBEFFF] rounded-3xl p-12 flex flex-col items-center justify-between">
            <Image src="/Play buttons 1.svg" alt="play" width={80} height={80} />

            <span className="bg-white px-3 py-1 text-sm">
              CREATOR INCUBATOR
            </span>

            <p className="font-geist font-[500] text-[28px] text-dark-navy text-center">
              Tutorial + Mini Tasks Curated For You
            </p>

            <Image
              src="/imageDash11.png"
              alt="dash"
              width={1200}
              height={1200}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-10">
          {/* SMALL CARD */}
          <div className="bg-[#F3E3D9] rounded-3xl p-12 flex flex-col items-center justify-between">
            <Image src="/heart 1.svg" alt="heart" width={80} height={80} />

            <span className="bg-white px-3 py-1 text-sm">
              CREATOR TAG
            </span>

            <p className="font-geist font-[500] text-[28px] text-dark-navy text-center">
              Get Discovered Even With Small Following
            </p>

            <Image
              src="/imageDash12.png"
              alt="dash"
              width={1200}
              height={1200}
              className="w-full h-auto"
            />
          </div>

          {/* BIG CARD */}
          <div className="bg-[#040136] rounded-3xl grid grid-cols-[37%_13%_50%] overflow-hidden">
            <div className="p-12 flex flex-col justify-center gap-10">
              <span className="bg-white/30 text-white px-3 py-2 text-sm w-fit">
                CREATOR CV
              </span>

              <p
                className="
                  font-geist
                  font-[400]
                  text-[28px]
                  leading-[1]
                  tracking-[-0.02em]
                  text-white
                  max-w-[260px]
                "
              >
                Your Professional Portfolio <br /> + Analytics
              </p>
            </div>

            <div />

            <div className="bg-[#F5F5F5]">
              <Image
                src="/frame22.png"
                alt="feature"
                width={1200}
                height={1200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          
        </div>
        
      </div>
      

      
    </section>
  );
}
