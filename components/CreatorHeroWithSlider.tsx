"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Briana",
    quote: "finally, a platform where creativity beats follower count",
    avatar: "/avatar 1.svg",
  },
  {
    name: "Alex",
    quote: "my work gets seen for what it is, not who I am",
    avatar: "/avatar 1.svg",
  },
  {
    name: "Jordan",
    quote: "opportunities found me instead of the other way around",
    avatar: "/avatar 1.svg",
  },
];

const audienceChallenges = [
  {
    title: "Hard to Grow Audience ",
    description: "Hard to grow without knowing what works in the industry.",
  },
  {
    title: "Fast-Moving Trends",
    description: "Trends change quickly, making it hard to stay relevant.",
  },
  {
    title: "Brand Credibility",
    description: "Struggling to appear professional to potential brand partners.",
  },
  {
    title: "Limited Opportunities",
    description: "New creators often find it hard to get noticed or collaborate.",
  },
];


export default function CreatorHeroWithSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative general-space overflow-x-hidden pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-10 relative">
          <h3 className="font-['Geist'] font-[600] text-[40px] md:text-[64px] leading-[1.2] tracking-[-0.02em] text-dark-navy">
            Grow Smarter, <br />
            Build Your Creator <br /> Identity
          </h3>


          <p
            className="
                font-geist font-[300]
                text-[28px]
                
                leading-[1]
                tracking-[0]
                text-[#6E6E6E]
                max-w-xl
                text-center md:text-left
                mx-auto md:mx-0
            "
            >
            Get discovered. Get opportunities. <br/>
            Improve faster. Earn more.
          </p>



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
                text-[16px] xl:text-[20px]
                font-medium

                transition-all duration-200
                hover:opacity-95
                hover:shadow-lg
              "
            >
            Join as a Creator
            </Link>


          {/* Floating Star */}
          <div
  className="
    absolute -top-50 left-1/2
    translate-x-[10%]
    translate-y-[40%]
    w-[300px] h-[200px]
    md:w-[455px] md:h-[342px]
    md:left-0 md:translate-x-[80%]
    md:translate-y-[0]
    bg-no-repeat bg-contain
  "
  style={{ backgroundImage: "url('/Star 2.svg')" }}
/>
        </div>

        {/* RIGHT SIDE – EXACT FIGMA STRUCTURE */}
<div className="relative flex justify-center items-center">
  {/* The Wrapper for the entire stack */}
  <div className="relative w-[520px] h-[520px]">
    
    {/* 1. BOTTOM-MOST BEIGE LAYER */}
    <div className="absolute -top-8 -right-8 w-full h-full rounded-[32px] bg-[#F4E9DE] z-0" />

    {/* 2. MIDDLE BEIGE LAYER */}
    <div className="absolute -top-4 -right-4 w-full h-full rounded-[32px] bg-[#FAF3ED] z-1" />

    {/* 3. THE LARGE DECORATIVE OVERLAY (Restored) */}
    {/* This is the part that was missing - enlarged to 40% bigger than the card */}
    <Image
      src="/layers.png"
      alt="decorative layers"
      width={1400}
      height={1400}
      className="absolute w-[750px] h-[730px] -left-[115px] -top-[105px] object-cover opacity-60 z-20 pointer-events-none"
      priority
    />

    {/* 4. MAIN IMAGE CARD */}
    <div className="relative z-30 w-full h-full rounded-[28px] overflow-hidden shadow-xl bg-white">
      {/* Creator Image */}
      <Image
        src="/creator-hero1.png"
        alt="creator working"
        fill
        className="object-cover opacity-90 z-10"
        priority
      />

      {/* Internal Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/layers.png')] opacity-20 z-20 pointer-events-none" />

      {/* Testimonial Slider */}
      <div className="absolute bottom-0 w-full z-40 overflow-hidden bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="relative flex w-full h-[100px] items-center">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div key={i} className="flex items-center gap-4 px-8 min-w-[350px] md:min-w-[400px]">
                <div className="relative w-11 h-11 shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="text-sm text-white whitespace-normal">
                  <p className="opacity-90 leading-snug font-geist font-light">“{testimonial.quote}”</p>
                  <p className="mt-1 text-xs opacity-60">@{testimonial.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</div>        
      </div>

      
            

      {/* CREATOR PROBLEM SECTION */}
<div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white pt-20 pb-0 mb-0">
    <div className="general-space"> 
      <motion.h1
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="
          font-geist font-[600]
          text-[32px] md:text-[48px]
          tracking-[-0.02em]
          text-dark-navy
          text-center
          mb-0 
        "
      >
        “The Creator Problem”
      </motion.h1>

      {/* 3. Adjust the inner section: Changed pb-0 and reduced pt */}
      <section className="pt-10 md:pt-16 pb-0">
        <motion.div
          className="grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {audienceChallenges.map((problem, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center gap-4 px-4"
            >
              <span className="bg-[#f3f5f7] rounded-full border border-gray-100 shadow-sm p-4 mb-4">
                <Image
                  src={`/creatorProblem${index + 1}.svg`}
                  alt={problem.title}
                  width={90}
                  height={90}
                />
              </span>

              <span className="font-geist font-[500] text-[22px] md:text-[26px] text-dark-navy">
                {problem.title}
              </span>

              <span className="font-geist font-[300] text-[16px] md:text-[19px] text-neut/60 max-w-[280px]">
                {problem.description}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  </div>
      
    </main>
  );
}