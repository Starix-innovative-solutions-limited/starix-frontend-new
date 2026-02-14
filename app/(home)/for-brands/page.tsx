/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Key, Minus, Plus } from "lucide-react";
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
  }, 2000); // 2.5 seconds per item

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
const [order, setOrder] = useState([0, 1, 2, 3]);

useEffect(() => {
  const interval = setInterval(() => {
    setOrder(prev => {
      const newOrder = [...prev];
      const last = newOrder.pop();   // rotate backwards
      newOrder.unshift(last!);
      return newOrder;
    });
  }, 3000);

  return () => clearInterval(interval);
}, []);

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



  const solutions = [
    {
      id: 1,
      title: "UGC Scoring Engine",
      description: "An algorithm that grades the viral-readiness of user generated content",
    },
    {
      id: 2,
      title: "Verified Creator Profiles",
      description: "To forecast the success of each post from validated creator analytics",
    },
    {
      id: 3,
      title: "Trend Intelligence",
      description: "An influence bot to predict the viral trends and emerging creator insights",
    },
    {
      id: 4,
      title: "Challenge Dashboard",
      description: "Gamified creator challenges with real-time tracking",
    },
  ];

  const cards = [
  { id: "poor", src: "/poor.png" },
  { id: "uneasy", src: "/uneasy1.png" },
  { id: "creator", src: "/creator1.png" },
  { id: "purple", src: "/purple1.png" },
];

  // ✅ Matches your reference UI pills
  const featureTabs = ["Challenge", "Guidance", "Entries"];
  const [activeTab, setActiveTab] = useState<string>(featureTabs[0]);

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

  const [openSection, setOpenSection] = useState(1);
  const toggleSection = (id: any) => setOpenSection(openSection === id ? null : id);

  // helpers for the Problem selector (carousel-like)
  const prevProblem = () => setActiveProblem((p) => (p === 0 ? problems.length - 1 : p - 1));
  const nextProblem = () => setActiveProblem((p) => (p === problems.length - 1 ? 0 : p + 1));

  const leftLabel = problems[(activeProblem - 1 + problems.length) % problems.length];
  const rightLabel = problems[(activeProblem + 1) % problems.length];

  const swipeConfidenceThreshold = 50;

  const paginate = (direction: 1 | -1) => {
    setActiveProblem((prev) => {
      const next = prev + direction;
      if (next < 0) return problems.length - 1;
      if (next >= problems.length) return 0;
      return next;
    });
  };


  return (
    <>
      <div className="bg-off-white overflow-hidden">
        <main className="relative general-space min-h-screen">
          {/* HERO */}
<div className="grid grid-cols-1 md:items-center gap-6 md:grid-cols-2 mt-20">

  {/* LEFT */}
  <div className="flex items-center gap-6 md:gap-10 h-fit relative py-2">

    {/* BADGE */}
    <div
      className="
        absolute
        z-[5]

        /* MOBILE POSITION */
        max-md:top-[-80px]
        max-md:right-[-120px]
        max-md:w-[250px]
        max-md:h-[250px]

        /* DESKTOP (ORIGINAL — UNTOUCHED) */
        md:top-[-260px]
        md:left-[300px]
        md:w-[510.73px]
        md:h-[472.86px]

        bg-no-repeat
        bg-contain
        transition-transform
        duration-300
        hover:-rotate-[-30deg]
      "
      style={{ backgroundImage: `url('/Badge 1.png')` }}
    />

    {/* TEXT BLOCK */}
    <div
      className="
        flex flex-col gap-6 md:gap-10m col-span-2
        md:-translate-y-[15%]
        max-md:text-center
        max-md:items-center
        relative z-[2]
      "
    >
      <h3
        className="
          font-['Geist']
          font-[600]
          text-[64px]
          max-md:text-[40px]
          leading-[1.2]
          tracking-[-0.02em]
          text-dark-navy
          w-full
          grow
        "
      >
        High‐Quality <br />
        UGC, Powered by <br />
        Real Data
      </h3>

      <p
        className="
          font-['Geist']
          py-4
          font-[300]
          text-[28px]
          max-md:text-[20px]
          leading-[1]
          tracking-[0]
          text-neut/60
        "
      >
        Run smarter creator challenges with verified creators and trend insight
      </p>

      <button
        onClick={() => router.push("/signup?role=brand")}
        className="
          bg-dark-navy text-off-white
          border border-dark-navy
          p-4 rounded-full
          w-full md:w-fit
          transition-all duration-300
          hover:bg-white hover:text-dark-navy
          max-md:w-full
        "
      >
        Join as a brand.
      </button>
    </div>

  </div>

  {/* RIGHT IMAGE — KEEP AS IS */}
  <Image src={"/brand-hero1.png"} alt="" width={1000} height={1000} />

</div>


          <div className="flex flex-col py-20">
            {/* ================= PROBLEM FOR BRANDS ================= */}
<section className="hidden md:block py-32">
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-[1400px] mx-auto grid grid-cols-2 gap-24 items-center">

    {/* LEFT — STACKED CARDS */}
    <div className="relative w-full h-[520px]">

      {/* STAR (FIXED ANCHOR) */}
      <div className="absolute z-[50] bottom-[0px] left-[0px] w-[72px] h-[72px] pointer-events-none">
        <Image src="/poor12.png" alt="star" width={72} height={72} className="w-full h-full object-contain" />
      </div>

      {/* STACK ORIGIN */}
      <div className="absolute top-[211px] left-[36px] w-[327px] h-[288px]">
        {order.map((cardIndex, position) => {
          const card = cards[cardIndex];
          const variantMap = ["front", "mid", "back", "far"];
          const variant = variantMap[position];

          return (
            <motion.div
              key={card.id}
              className="absolute w-[327px] h-[288px] rounded-[40px] overflow-hidden"
              variants={variants}
              animate={variant}
              initial={false}
              style={{ transformOrigin: "left bottom" }}
            >
              <Image src={card.src} alt="" fill className="object-cover" />
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* RIGHT — PROBLEM LIST */}
    <div className="flex flex-col h-full">

      <h2 className="font-['Geist'] font-[600] text-[56px] leading-[1.1] text-dark-navy mb-14">
        Problem For Brands
      </h2>

      <div className="relative h-full">

        {/* TIMELINE */}
        <div className="absolute left-[18px] top-[18px] bottom-[18px] w-[1px] bg-[#DADADA] overflow-hidden">
          <motion.div
            className="absolute left-0 w-[1px] bg-dark-navy"
            animate={{ height: `${((activeProblem + 1) / problems.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ top: 0 }}
          />
        </div>

        {problems.map((problem, index) => {
          const isActive = activeProblem === index;

          return (
            <div key={index} onClick={() => setActiveProblem(index)} className="flex items-start gap-6 cursor-pointer py-[18px]">

              {/* ICON */}
              <div className="relative flex flex-col items-center shrink-0">
                <div className={`w-[38px] h-[38px] min-w-[38px] min-h-[38px] rounded-full flex items-center justify-center border transition-all duration-300 bg-white z-10 ${isActive ? "border-dark-navy text-dark-navy" : "border-[#DADADA] text-[#B5B5B5]"}`}>
                  <PiWarningCircleLight className="text-[18px]" />
                </div>

                {index !== problems.length - 1 && (
                  <div className={`w-[1px] flex-1 mt-2 ${isActive ? "bg-dark-navy" : "bg-[#E5E5E5]"}`} />
                )}
              </div>

              {/* TEXT */}
              <div className="pt-[6px]">
                <span className={`font-['Geist'] font-[400] text-[28px] leading-[1.2] transition-colors duration-300 ${isActive ? "text-dark-navy" : "text-[#B5B5B5]"}`}>
                  {problem}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </motion.div>
</section>

{/* ================= MOBILE AUTO SLIDER ================= */}
<section className="md:hidden py-16">
  <div className="w-full">

    <h2 className="font-['Geist'] font-[600] text-[32px] leading-[1.2] tracking-[-0.02em] text-dark-navy text-center mb-8">
      Problem For Brands
    </h2>

    <div className="md:hidden w-full overflow-hidden">
      <div
        ref={mobileSliderRef}
        className="flex items-center gap-6 px-4 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
        style={{ scrollBehavior: "smooth", overscrollBehaviorX: "contain" }}
      >

      {problems.map((problem, index) => {
        const isActive = activeProblem === index;

        return (
          <div
            key={index}
            onClick={() => setActiveProblem(index)}
            className="
              flex items-center gap-3
              cursor-pointer
              min-w-fit
              py-3
              transition-all
              duration-500
            "
          >
            {/* ICON */}
            <div
              className={`
                w-[38px] h-[38px] min-w-[38px] min-h-[38px]
                rounded-full flex items-center justify-center
                border transition-all duration-300 bg-white shrink-0
                ${isActive ? "border-dark-navy text-dark-navy scale-110" : "border-[#DADADA] text-[#B5B5B5] scale-100"}
              `}
            >
              <PiWarningCircleLight className="text-[18px]" />
            </div>

            {/* TEXT */}
            <span
              className={`
                font-['Geist']
                font-[400]
                text-[16px]
                whitespace-nowrap
                transition-all duration-300
                ${isActive ? "text-dark-navy" : "text-[#B5B5B5]"}
              `}
            >
              {problem}
            </span>
          </div>
        );
      })}
      </div>
    </div>
  </div>
</section>





            
            <StarixSolutionsSection />

            <KeyFeaturesSection />


            
          </div>
        </main>

        {/* Challenge System Section */}
        <section className="bg-[#EBEFFF] text-dark-navy py-16 general-space">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image src={"/howBrands.png"} alt="hw brand" width={1000} height={1000} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-['Geist'] font-[600] text-[32px] md:text-[48px] leading-[1] md:leading-[1.2] tracking-[0] md:tracking-[-0.02em] text-dark-navy text-center md:text-left mb-2">
                How Starix Challenge <br className="hidden md:block" /> System Works
              </h2>



              <div className="w-full space-y-3 mt-20">
                {challengeSteps.map((item, index) => (
                  <div key={index} className="border-b border-secondary-100 overflow-hidden transition-all duration-200">
                    <div className="flex items-center">
                      <Image src={`/challengeStep${index + 1}.svg`} alt="" width={100} height={100} className="w-6" />

                      <div className="grow">
                        <button
                          onClick={() => toggleSection(item.id)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                          type="button"
                        >
                          <span className="font-['Geist'] font-[400] text-[28px] leading-[1] tracking-[-0.02em] text-secondary-100">
                          {item.title}
                        </span>

                          {openSection === item.id ? (
                            <Minus className="w-6 h-6 text-secondary-100 flex-shrink-0" />
                          ) : (
                            <Plus className="w-6 h-6 text-secondary-100 flex-shrink-0" />
                          )}
                        </button>

                        {openSection === item.id && (
                          <div className="px-6 pb-5 pt-1">
                            <p className="text-dark-navy/70 text-lg leading-relaxed">{item.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Brand analytics */}
        <section className="general-space">
          <div className="mt-10 bg-white py-14 rounded-2xl shadow grid max-md:px-6 px-8 border border-gray-100">
            <div className="flex max-md:flex-col items-center gap-6">
              <div className="bg-[#FAFAFA] py-1 text-dark-navy font-light text-base inline-block whitespace-nowrap">
                BRAND ANALYTICS.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            
  {brandFeatures.map((feature, index) => (
    <div
      key={index}
      className={`bg-gradient-to-br ${feature.gradient} rounded-[25px] p-[5px] shadow-sm border group-hover:opacity-100  border-gray-200 hover:shadow-md transition-shadow duration-300`}
      style={{ width: 340, height: 249 }}   // ✅ card size
    >
      <div
        className="bg-white relative w-full h-full rounded-[20px] pt-[90px] px-6 pb-6"

        
      >
        {/* ICON */}
        <Image
          src={`/${feature.icon}`}
          alt={feature.icon}
          width={73}
          height={70}
          className="absolute top-[18px] left-[35px] w-[73px] h-[70px] opacity-100"
        />

        {/* CONTENT */}
        <h3 className="text-[24px] font-normal text-dark-navy mb-2">
          {feature.title}
        </h3>

        <p className="text-neut/60 font-light text-[20px] leading-[1.2]">
          {feature.description}
        </p>
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
