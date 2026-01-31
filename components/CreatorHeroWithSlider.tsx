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
    <main className="relative general-space min-h-screen overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-10 relative">
          <h3
            className="
                font-geist font-[600]
                text-[40px] md:text-[64px]
                leading-[1.2]
                tracking-[-0.02em]
                text-dark-navy
                text-center md:text-left
            "
            >
            Grow Smarter, <br />
            Build Your Creator <br /> Identity
          </h3>


          <p
            className="
                font-geist font-[300]
                text-[20px]
                md:text-[28px]
                leading-[1]
                tracking-[0]
                text-neut/60
                max-w-xl
                text-center md:text-left
                mx-auto md:mx-0
            "
            >
            Get discovered. Get opportunities. Improve faster. Earn more.
          </p>



          <Link
            href="/signup"
            className="
                bg-dark-navy text-off-white
                py-4 px-8
                rounded-full
                w-full md:w-fit
                transition-all duration-300
                flex justify-center
                md:inline-flex md:justify-start
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
    md:left-0 md:translate-x-[20%]
    md:translate-y-0
    bg-no-repeat bg-contain
  "
  style={{ backgroundImage: "url('/star 2.svg')" }}
/>
        </div>

        {/* RIGHT SIDE – EXACT FIGMA STRUCTURE */}
        <div className="relative flex justify-center items-center">
            

          {/* Beige stacked background cards */}
          <div className="absolute -right-8 -top-6 w-[520px] h-[520px] rounded-[32px] bg-[#F4E9DE]" />
          <div className="absolute -right-2 -top-2 w-[520px] h-[520px] rounded-[32px] bg-[#FAF3ED]" />
        
          {/* LAYERS IMAGE – 40% larger than card */}
            <Image
            src="/layers.png"
            alt="decorative layers"
            width={1400}
            height={1400}
            className="absolute w-[750] h-[730] object-cover opacity-60 z-20"
            priority
            />

          {/* Main Image Card */}
          <div className="relative z-10 w-[520px] h-[520px] rounded-[28px] overflow-hidden shadow-xl">
            

        {/* Creator Image */}
        <Image
            src="/creator-hero1.png"
            alt="creator working"
            width={1200}        
            height={1200}
            className="absolute inset-0 w-full h-full object-cover opacity-90 z-10"
            priority
        />

  {/* Grid Overlay */}
  <div className="absolute inset-0 bg-[url('/layers.png')] opacity z-20" />



  {/* Slider */}
  <div className="absolute bottom-6 left-6 right-6 z-40 overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-4 bg-black/70 backdrop-blur-md rounded-xl px-4 py-3"
      >
        <Image
          src={testimonials[index].avatar}
          alt={testimonials[index].name}
          width={44}
          height={44}
          className="rounded-full"
        />
        <div className="text-sm text-off-white">
          <p className="opacity-90 leading-snug">“{testimonials[index].quote}”</p>
          <p className="mt-1 text-xs opacity-60">@{testimonials[index].name}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</div>

        </div>
        
      </div>

      
            

      {/* CREATOR PROBLEM SECTION */}
      <div className="flex flex-col py-20">
        <motion.h1
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="
            font-geist font-[600]
            text-[32px] md:text-[48px]
            tracking-[-0.02em]
            text-dark-navy
            mb-12
            text-center
          "
        >
          “The Creator Problem”
        </motion.h1>

        <section className="py-10 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-12 md:grid-cols-4"
          >
            {audienceChallenges.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <span className="bg-[#f3f5f7] rounded-full border border-gray-100 shadow-sm p-4 mb-4">
                  <Image
                    src={`/creatorProblem${index + 1}.svg`}
                    alt={problem.title}
                    width={90}
                    height={90}
                  />
                </span>

                <span className="font-geist font-[500] text-[26px] text-dark-navy">
                  {problem.title}
                </span>

                <span className="font-geist font-[300] text-[19px] text-neut/60">
                  {problem.description}
                </span>
                
              </motion.div>
            ))}
            
          </motion.div>

          

          
        </section>
      </div>
            
      
    </main>
  );
}