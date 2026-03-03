/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { PiWarningCircleLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import StarixSolutionsSection from "@/components/StarixSolutionsSection";
import KeyFeaturesSection from "@/components/KeyFeaturesSection";


const Page = () => {
  const problems = [
    "Poor UGC quality",
    "Hard to verify engagement",
    "Struggle to discover content",
    "No clear ROI from creator campaigns",
  ];

  const [activeProblem, setActiveProblem] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveProblem((prev) => (prev + 1) % problems.length);
  }, 2000); 

  return () => clearInterval(interval);
}, [problems.length]);


const mobileSliderRef = React.useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (!mobileSliderRef.current) return;

  const container = mobileSliderRef.current;
  const activeEl = container.children[activeProblem] as HTMLElement;

  if (!activeEl) return;

  const containerRect = container.getBoundingClientRect();
  const activeRect = activeEl.getBoundingClientRect();

  const offset =
    activeRect.left -
    containerRect.left -
    containerRect.width / 2 +
    activeRect.width / 2;

  container.scrollTo({
    left: container.scrollLeft + offset,
    behavior: "smooth",
  });
}, [activeProblem]);


  const router = useRouter();




 

const variants: Variants = {
  front: {
    scale: 0.78,
    x: 0,
    y: 0,
    zIndex: 4,
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  },
  mid: {
    scale: 0.86,
    x: 70,
    y: -55,
    zIndex: 3,
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  },
  back: {
    scale: 0.93,
    x: 140,
    y: -110,
    zIndex: 2,
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  },
  far: {
    scale: 1,
    x: 210,
    y: -170,
    zIndex: 1,
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  }
};

  const cards = [
  { id: "poor", src: "/poor.png" },
  { id: "uneasy", src: "/uneasy1.png" },
  { id: "creator", src: "/creator1.png" },
  { id: "purple", src: "/purple1.png" },
];

  const challengeSteps = [
    { id: 1, title: "Create a Challenge", description: "Set up your campaign with specific goals and guidelines" },
    { id: 2, title: "Find Escrow", description: "Secure funds for winner payouts" },
    { id: 3, title: "Get Submissions", description: "Receive and review creator content" },
    { id: 4, title: "Approve Winners", description: "Select and reward top performers" },
  ];

  const brandFeatures = [
    {
      icon: "playButtons.svg",
      title: "Real-time Leaderboard",
      description: "Set campaign goals, budget, and duration.",
      gradient: "from-orange-100 via-pink-50 to-green-100",
    },
    {
      icon: "diamond.svg",
      title: "Content Insight",
      description: "Suggest hooks, captions, and tone that fit your brand voice.",
      gradient: "from-blue-100 via-indigo-50 to-purple-100",
    },
    {
      icon: "trophy.svg",
      title: "Content Performance",
      description: "Starix measures likes and comments automatically.",
      gradient: "from-red-100 via-orange-50 to-blue-100",
    },
  ];

  // derive card order from activeProblem
const order = React.useMemo(() => {
  return cards.map((_, i) => (activeProblem + i) % cards.length);
}, [activeProblem, cards.length]);

const variantMap = ["front", "mid", "back", "far"];

  const [openSection, setOpenSection] = useState(1);
  const toggleSection = (id: any) => setOpenSection(openSection === id ? null : id);

  return (
    <>
      <div className="bg-[#f5f5f5] overflow-hidden">
        <main className="relative general-space min-h-screen">
          {/* HERO - Fixed grid to prevent shrinking on tablet */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-10 mt-20">
            <div className="flex flex-col gap-6 md:gap-10 h-fit relative py-2 max-lg:items-center max-lg:text-center">
              {/* BADGE */}
              <div
                className="absolute z-[5] max-md:top-[-80px] max-md:right-[-120px] max-md:w-[250px] max-md:h-[250px] md:top-[-260px] md:left-[300px] md:w-[510px] md:h-[472px] bg-no-repeat bg-contain transition-transform"
                style={{ backgroundImage: `url('/Badge 1.png')` }}
              />
              <h3 className="font-['Geist'] font-[600] text-[40px] md:text-[64px] leading-[1.2] tracking-[-0.02em] text-dark-navy">
                High‐Quality <br /> UGC, Powered by <br /> Real Data
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
                Run smarter creator challenges with verified creators and trend insight
              </p>
              <button
                onClick={() => router.push("/signup?role=brand")}
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
              ">
                Join as a brand
              </button>
            </div>
            <div className="relative w-full aspect-square md:aspect-auto">
              <Image src={"/brand-hero1.png"} alt="" width={1000} height={1000} className="w-full h-auto object-contain" />
            </div>
          </div>

          <div className="flex flex-col py-20">
            {/* PROBLEM SECTION */}
<div className="bg-white relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-0">
  <section className="hidden md:block py-32">
    <motion.div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(400px,_1fr)_1fr] gap-24 items-center">

      {/* LEFT SIDE */}
      <div className="relative w-full h-[520px]">
        <div className="absolute z-[50] bottom-0 left-0 w-[72px] h-[72px]">
          <Image
            src="/poor12.png"
            alt="star"
            width={72}
            height={72}
            className="object-contain"
          />
        </div>

        <div className="absolute top-[211px] left-0 w-full max-w-[327px]">
          {order.map((cardIndex, position) => (
            <motion.div
              key={cards[cardIndex].id}
              className="absolute w-full aspect-[327/288] rounded-[40px] overflow-hidden"
              variants={variants}
              animate={variantMap[position]}
              initial={false}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Image
                src={cards[cardIndex].src}
                alt=""
                fill
                className="object-cover w-[327px] h-[288px]"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col h-full">
        <h2 className="font-['Geist'] font-[600] text-[42px] md:text-[56px] leading-tight text-dark-navy mb-14">
          Problem For Brands
        </h2>

        <div className="relative h-full">
          {problems.map((problem, index) => {
            const isActive = activeProblem === index;
            const isLast = index === problems.length - 1;

            return (
              <div
                key={index}
                onClick={() => setActiveProblem(index)}
                className="relative flex items-start gap-6 cursor-pointer py-[18px]"
              >
                {/* CIRCLE + CONNECTOR */}
                <div className="relative flex flex-col items-center">
                  {/* Circle */}
                  <motion.div
                    className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border z-10 bg-white`}
                    animate={{
                      borderColor: isActive ? "#0B1B3F" : "#DADADA",
                      color: isActive ? "#0B1B3F" : "#B5B5B5"
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <PiWarningCircleLight size={18} />
                  </motion.div>

                  {/* Connector (not last) */}
                  {!isLast && (
                    <div className="relative w-[1px] h-[20px] mt-[6px] bg-[#DADADA] overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-dark-navy"
                        animate={{
                          height: activeProblem > index ? "100%" : "0%"
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>

                {/* Text */}
                <motion.span
                  className="font-['Geist'] text-[24px] md:text-[28px] leading-tight"
                  animate={{
                    color: isActive ? "#0B1B3F" : "#B5B5B5"
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {problem}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  </section>
</div>
            
            <StarixSolutionsSection />
            <KeyFeaturesSection />
          </div>
        </main>

        {/* CHALLENGE SYSTEM SECTION */}
        <section className="bg-[#EBEFFF] text-dark-navy py-16 general-space">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Image src={"/howBrands.png"} alt="how brand" width={1000} height={1000} className="w-full h-auto" />
            <div className="flex flex-col">
              <h2 className="font-['Geist'] font-[600] text-[32px] md:text-[48px] leading-tight text-dark-navy mb-10">
                How Starix Challenge <br className="hidden md:block" /> System Works
              </h2>
              <div className="w-full space-y-3">
                {challengeSteps.map((item, index) => (
                  <div key={index} className="border-b border-secondary-100">
                    <div className="flex items-center gap-4 py-4">
                      <Image src={`/challengeStep${index + 1}.svg`} alt="" width={32} height={32} />
                      <div className="grow">
                        <button onClick={() => toggleSection(item.id)} className="w-full flex items-center justify-between text-left">
                          <span className="text-[22px] md:text-[28px] font-normal">{item.title}</span>
                          {openSection === item.id ? <Minus /> : <Plus />}
                        </button>
                        {openSection === item.id && (
                          <p className="pt-4 pb-2 text-dark-navy/70 text-lg">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BRAND ANALYTICS - Fixed for Figma UI Alignment */}
<section className="general-space py-10">
  <div className="bg-white p-8 md:p-14 rounded-2xl shadow border border-gray-100">
    {/* FIX: Changed 'flex-row' to a grid with a fixed-width left column. 
      This prevents the label from 'shrinking' the card grid on smaller screens. 
    */}
    <div className="flex flex-col lg:grid lg:grid-cols-[180px_1fr] gap-10">
      
      {/* Label Badge - Now sits in its own fixed-width column */}
      <div className="h-full">
        <div className="bg-[#FAFAFA] text-dark-navy p-1 font-light translate-y-[120px] text-base tracking-normal uppercase inline-block whitespace-nowrap">
          BRAND ANALYTICS.
        </div>
      </div>

      {/* Cards Grid - Styling and Logic remain exactly as you provided */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {brandFeatures.map((feature, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${feature.gradient} p-[3px] rounded-[28px] h-full shadow-sm hover:shadow-md transition-shadow group`}
          >
            <div className="bg-white rounded-[24px] p-4 flex flex-col gap-4 h-full min-h-[250px]">
              <div className="relative w-20 h-20">
                <Image src={`/${feature.icon}`} alt="" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] font-medium text-dark-navy leading-tight">{feature.title}</h3>
              <p className="text-neut/60 text-[18px] leading-snug">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
      </div>
    </>
  );
};

export default Page;