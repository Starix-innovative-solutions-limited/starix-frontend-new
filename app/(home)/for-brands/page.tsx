/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Minus, Plus } from "lucide-react";
import { PiWarningCircleLight } from "react-icons/pi";
import { useRouter } from "next/navigation";


const Page = () => {
  const problems = [
    "Poor UGC quality",
    "Hard to verify engagement",
    "Struggle to discover content",
    "No clear ROI from creator campaigns",
  ];

  const [activeProblem, setActiveProblem] = useState<number>(0);

  const router = useRouter();


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
      icon: "playButtons.png",
      title: "Real-time Leaderboard",
      description: "Set campaign goals, budget, and duration.",
      gradient: "from-orange-100 via-pink-50 to-green-100",
    },
    {
      icon: "diamond.png",
      title: "Content Insight",
      description: "Suggest hooks, captions, and tone that fit your brand voice.",
      gradient: "from-blue-100 via-indigo-50 to-purple-100",
    },
    {
      icon: "trophy.png",
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
            <div className="flex items-center gap-6 md:gap-10 h-fit relative py-2">
              <div className="flex flex-col gap-6 md:gap-10m col-span-2">
                <h3 className="font-semibold text-4xl max-md:text-center lg:text-5xl xl:text-6xl w-full leading-snug text-dark-navy grow">
                  High‐Quality <br />
                  UGC, Powered by <br />
                  Real Data
                </h3>

                <p className="font-light text-xl md:text-2xl text-neut/60 max-md:text-center">
                  Run smarter creator challenges with verified creators and trend insight
                </p>

                {/* ✅ FIX #1: invert hover */}
                <button
                  onClick={() => router.push("/signup?role=brand")}
                  className="
                    bg-dark-navy text-off-white
                    border border-dark-navy
                    p-4 rounded-full
                    w-full md:w-fit
                    transition-all duration-300
                    hover:bg-white hover:text-dark-navy
                  "
                >
                  Join as a brand.
                </button>

              </div>

              <div
                className="
                  absolute inset-0 z-0
                  -top-3/12 -right-6/12 lg:-top-5/12 left-6/10
                  w-auto h-[30vh] md:min-h-[40vh] md:max-h-[50vh]
                  bg-no-repeat bg-contain
                  transition-transform duration-300
                "
                style={{ backgroundImage: `url('/hero1.png')` }}
              />
            </div>

            <Image src={"/brand-hero1.png"} alt="" width={1000} height={1000} />
          </div>

          <div className="flex flex-col py-20">
            {/* ✅ FIX #3: PROBLEM FOR BRANDS — match your 2nd UI */}
            {/* DESKTOP VERSION */}
            <section className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row items-center gap-12"
              >
                {/* LEFT IMAGE */}
                <div className="lg:w-1/2">
                  <Image
                    src={'/brand-problems.png'}
                    alt=""
                    width={800}
                    height={800}
                    className="object-scale-down"
                  />
                </div>

                {/* RIGHT LIST */}
                <div className="lg:w-1/2 flex flex-col gap-4">
                  <h1 className="text-4xl lg:text-5xl font-semibold text-dark-navy mb-6">
                    Problem For Brands
                  </h1>

                  <div className="space-y-3">
                    {problems.map((problem, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveProblem(index)}
                        className={`flex flex-col gap-1 tracking-tight ${
                          activeProblem === index ? 'text-dark-navy' : 'text-neut/60'
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <PiWarningCircleLight className="text-2xl" />
                          <span className="text-2xl">{problem}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* MOBILE VERSION */}
           
            <section className="md:hidden py-10">
              <div className="w-full flex flex-col items-center">
                <h1 className="text-3xl font-semibold text-dark-navy text-center">
                  Problem For Brands
                </h1>

                {/* Swipe Area */}
                <motion.div
                  className="mt-10 w-full"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > swipeConfidenceThreshold) {
                      // swipe right -> previous
                      paginate(-1);
                    } else if (info.offset.x < -swipeConfidenceThreshold) {
                      // swipe left -> next
                      paginate(1);
                    }
                  }}
                >
                  {/* Selector row (same look) */}
                  <div className="w-full flex items-center justify-center gap-4">
                    <div className="flex items-center gap-3 opacity-30">
                      <div className="w-10 h-10 rounded-full border border-neut/30 flex-center">
                        <PiWarningCircleLight className="text-xl" />
                      </div>
                      <span className="text-lg text-neut/60 truncate max-w-[120px]">
                        {problems[(activeProblem - 1 + problems.length) % problems.length]}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-dark-navy flex-center">
                        <PiWarningCircleLight className="text-xl text-dark-navy" />
                      </div>
                      <span className="text-xl font-medium text-dark-navy">
                        {problems[activeProblem]}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 opacity-30">
                      <div className="w-10 h-10 rounded-full border border-neut/30 flex-center">
                        <PiWarningCircleLight className="text-xl" />
                      </div>
                      <span className="text-lg text-neut/60 truncate max-w-[120px]">
                        {problems[(activeProblem + 1) % problems.length]}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Progress bars */}
                <div className="mt-6 flex gap-3">
                  {problems.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeProblem ? "w-20 bg-dark-navy" : "w-10 bg-neut/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Stacked cards image */}
                <div className="mt-14">
                  <Image
                    src="/brand-problems.png"
                    alt="brand problems"
                    width={600}
                    height={600}
                    className="w-full max-w-xs mx-auto"
                  />
                </div>

                {/* Optional hint (tiny) */}
                <p className="mt-4 text-sm text-neut/50">Swipe left or right</p>
              </div>
            </section>




            {/* Solutions Section */}
            <section className="bg-white py-16">
              <div className="flex flex-col gap-20">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold text-dark-navy text-center"
                >
                  Starix Solutions
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  {solutions.map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white py-6"
                    >
                      <div className="mb-4">
                        <Image
                          src={`/starixSolution${index > 2 ? 1 : index + 1}.png`}
                          alt="dash section"
                          width={1000}
                          height={1000}
                          className="md:max-w-4/5"
                        />
                      </div>
                      <h3 className="font-normal text-xl md:text-2xl text-dark-navy mb-2">{solution.title}</h3>
                      <p className="text-neut/60 text-base md:text-xl font-light">{solution.description}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  {/* ✅ FIX #1: invert hover */}
                  <motion.button
                    onClick={() => router.push("/signup?role=brand")}
                    className="
                      bg-dark-navy text-off-white
                      border border-dark-navy
                      p-4 rounded-full
                      w-fit flex-center gap-2 mx-auto
                      transition-all duration-300
                      hover:bg-white hover:text-dark-navy
                    "
                  >
                    <span>Join as a brand.</span>
                    <HiOutlineArrowNarrowRight />
                  </motion.button>

                </motion.div>
              </div>
            </section>

            {/* ✅ FIX #2: KEY FEATURES — match your 1st UI */}
            <section className="py-16">
              {/* Heading + arrow image (right) */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-4xl md:text-5xl font-semibold text-dark-navy leading-snug">
                    Key Features For Brands <br /> On Starix
                  </h2>
                </div>

                {/* swap this image if your arrow asset is different */}
                <div className="flex md:justify-end">
                  <Image
                    src="/arrow.png"
                    alt="arrow"
                    width={120}
                    height={120}
                    className="w-20 md:w-24 h-auto opacity-90"
                  />
                </div>
              </div>

              {/* Pills row (Challenge active like screenshot) */}
              <div className="flex gap-4 overflow-x-auto pb-2 mb-10">
                {featureTabs.map((tab) => {
                  const isActive = tab === activeTab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`
                        whitespace-nowrap
                        px-8 py-3 rounded-full
                        border
                        text-lg md:text-xl
                        transition-all duration-300
                        ${isActive ? "border-dark-navy text-dark-navy bg-white" : "border-neut/30 text-neut/50 bg-white"}
                      `}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Content card under tabs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-neut/10 shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left copy */}
                  <div className="p-8 md:p-10 flex flex-col gap-4">
                    <span className="inline-flex w-fit bg-off-white px-3 py-1 text-sm text-dark-navy/80 rounded-full">
                      {activeTab.toUpperCase()}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-medium text-dark-navy">
                      {activeTab === "Challenge"
                        ? "Create Challenges for Thousands of Creators"
                        : activeTab === "Guidance"
                        ? "Guide Submissions with Briefs & Direction"
                        : "Track Entries and Performance in One Place"}
                    </h3>

                    <p className="text-neut/60 text-lg md:text-xl font-light">
                      {activeTab === "Challenge"
                        ? "Launch structured UGC challenges, set rules, rewards, and timelines—then let creators compete."
                        : activeTab === "Guidance"
                        ? "Provide hooks, captions, tone and examples so creators stay aligned with your brand voice."
                        : "See submissions, engagement, and winners with clear performance visibility and ROI signals."}
                    </p>

                    <div className="mt-2">
                      <Image
                        src="/playButtons.png"
                        alt="feature icon"
                        width={100}
                        height={100}
                        className="w-16 h-auto"
                      />
                    </div>
                  </div>

                  {/* Right visual */}
                  <div className="bg-off-white/60 p-6 md:p-8 flex items-center justify-center">
                    <Image
                      src={"/keyFeaturesFram2.png"}
                      alt="key features"
                      width={1200}
                      height={1200}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </section>
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
              <Image src={"/howBrandsWork.png"} alt="hw brand" width={1000} height={1000} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl lg:text-5xl font-semibold mb-8 md:leading-snug">
                How Starix Challenge <br className="max-md:hidden" /> System Works
              </h2>

              <div className="w-full space-y-3 mt-20">
                {challengeSteps.map((item, index) => (
                  <div key={index} className="border-b border-secondary-100 overflow-hidden transition-all duration-200">
                    <div className="flex items-center">
                      <Image src={`/challengeStep${index + 1}.png`} alt="" width={100} height={100} className="w-6" />

                      <div className="grow">
                        <button
                          onClick={() => toggleSection(item.id)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                          type="button"
                        >
                          <span className="text-2xl text-secondary-100">{item.title}</span>
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
                    className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-1 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300`}
                  >
                    <div className="bg-white p-8 h-full w-full rounded-2xl">
                      <Image
                        src={`/${feature.icon}`}
                        width={100}
                        height={100}
                        alt={feature.icon}
                        className="w-16 h-auto"
                      />

                      <h3 className="text-[28px] font-normal text-dark-navy mb-3">{feature.title}</h3>
                      <p className="text-neut/60 font-light text-xl">{feature.description}</p>
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
