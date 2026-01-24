/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export const CreatorCard = ({ image, title, description, buttonText, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col justify-between bg-white overflow-hidden hover:border hover:border-dark-navy rounded-3xl hover:shadow-xl transition-shadow duration-300 px-6 p-5"
    >
      <div className="flex flex-col gap-7">
        {/* ✅ Responsive image (no layout shift) */}
        <motion.div
          className="relative w-full aspect-[16/10] overflow-hidden rounded-3xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={`/${image}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
            priority={false}
          />
        </motion.div>

        <div className="flex flex-col gap-3">
          <h3 className="text-2xl text-dark-navy tracking-tight">{title}</h3>
          <p className="text-neut/60 font-light text-lg mb-2 flex-grow">{description}</p>
        </div>
      </div>

      {/* ✅ Link arrow -> /signup */}
      <Link
        href="/signup"
        className="ml-auto w-fit group flex items-center gap-2 text-dark-navy/70 text-base font-light transition-all duration-300 hover:gap-4"
      >
        <span className="border-b border-dark-navy/70 font-light">{buttonText}</span>
        <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

const Page = () => {
  const creators = [
    {
      image: "creatorCard1.png",
      title: "New Creators",
      description:
        "No followers? No problem. Build your creator portfolio day by day one and watch your Starix Score grow with every challenge you join.",
      buttonText: "Create Portfolio",
    },
    {
      image: "creatorCard2.png",
      title: "Micro Creators",
      description:
        "Get consistent access to paid challenges without pitching brands or waiting for collaborations to come to you. Your creativity speaks for itself here.",
      buttonText: "Create Consistency",
    },
    {
      image: "creatorCard3.png",
      title: "Trend Creators",
      description:
        "If you love jumping on trends, you're in the right place. Join fast-moving challenges designed for viral energy and high engagement.",
      buttonText: "Create Impact",
    },
    {
      image: "creatorCard1.png",
      title: "Mega Creators",
      description: "Create your own branded challenges, earn rewards, and ship impactful content at scale.",
      buttonText: "Create Influence",
    },
  ];

  const audienceChallenges = [
    { title: "Hard to Grow Audience", description: "Hard to grow without knowing what works in the industry" },
    { title: "Fast-Moving Trends", description: "Trends change quickly, making it hard to stay relevant" },
    { title: "Brand Credibility", description: "Struggling to appear professional to potential brand partners" },
    { title: "Limited Opportunities", description: "New creators often find it hard to get noticed or collaborate" },
  ];

  const solutions = [
    { id: 1, title: "Creator circle", description: "No followers? No problem. Build your creator portfolio from day one " },
    { id: 2, title: "Trend Radar", description: "No followers? No problem. Build your creator portfolio from day one " },
    { id: 3, title: "Starix score", description: "No followers? No problem. Build your creator portfolio from day one " },
    { id: 4, title: "Professional Dashboard", description: "No followers? No problem. Build your creator portfolio from day one " },
  ];

  return (
    <>
      <div className="bg-off-white">
        <main className="relative general-space min-h-screen overflow-x-hidden">
          <div className="grid grid-cols-1 md:items-center lg:grid-cols-2 mt-20 h-fit gap-10">
            <div className="flex flex-col gap-10 h-fit relative w-full">
              <div>
                <h3 className="font-semibold text-4xl md:text-5xl lg:text-6xl w-full leading-snug text-dark-navy grow">
                  Grow Smarter, <br />
                  Build Your Creator <br /> Identity
                </h3>
              </div>

              <p className="font-light text-2xl text-neut/60">
                Get discovered. Get opportunities. Improve faster. Earn more.
              </p>

              {/* ✅ Button hover invert + ✅ Link to /signup */}
              <Link
                href="/signup"
                className="
                  group
                  bg-dark-navy text-off-white
                  border border-dark-navy
                  py-2 px-5 md:p-4
                  rounded-full
                  w-fit
                  transition-all duration-300
                  hover:bg-white hover:text-dark-navy
                "
              >
                Join as a creator.
              </Link>

              <div
                className="
                  absolute inset-0 z-10
                  -top-3/12 -right-6/12 lg:-top-5/12 left-6/10
                  w-auto h-[20vh] md:min-h-[35vh] md:max-h-[40vh]
                  bg-no-repeat bg-contain
                  transition-transform duration-300
                "
                style={{ backgroundImage: `url('/star2.png')` }}
              />
            </div>

            {/* ✅ Responsive hero image */}
            <div
              className="grid place-items-center w-full"
              style={{
                background: "url(gridLayer.png)",
              }}
            >
              <Image
                src={"/creator-hero.png"}
                alt="creator hero"
                width={1200}
                height={1200}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="
                  w-full h-auto
                  max-w-[520px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[780px]
                  object-contain opacity-90
                "
                priority
              />
            </div>
          </div>

          <div className="flex flex-col py-20">
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-semibold text-dark-navy mb-6 text-center"
            >
              “ The Creator Problem”
            </motion.h1>

            <section className="py-10 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-12"
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6 grid md:grid-cols-4 gap-12"
                >
                  {audienceChallenges.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex flex-col items-center gap-3 text-gray-600"
                    >
                      <span className="bg-[#f3f5f7] rounded-full border border-gray-100 shadow-2xs p-4 mb-6 mx-auto">
                        <Image
                          src={`/creatorProblem${index + 1}.png`}
                          alt="creator problem"
                          width={1000}
                          height={1000}
                          className="w-12 h-auto"
                        />
                      </span>
                      <span className="text-2xl text-dark-navy tracking-tight text-center">{problem.title}</span>
                      <span className="text-neut/60 text-lg text-center">{problem.description}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </section>
          </div>
        </main>

        {/* Solutions Section */}
        <section className="bg-off-white">
          <div className="bg-primary-orange/5 general-space relative">
            <Image
              src={"/incident-ball-1.png"}
              alt="incident ball 1"
              width={100}
              height={100}
              className="absolute w-32 object-cover -top-1/12 left-0"
            />

            <Image
              src={"/incident-ball-2.png"}
              alt="incident ball 2"
              width={1000}
              height={1000}
              className="absolute w-52 object-scale-down right-0 -bottom-[10%]"
            />

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-semibold text-dark-navy mb-12 text-center"
              >
                Starix Solutions
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-off-white px-6 pt-6 pb-3 rounded-xl"
                  >
                    <div className="mb-4">
                      <Image
                        src={`/starixSolution${index > 2 ? 4 : index + 4}.png`}
                        alt="solution"
                        width={1000}
                        height={1000}
                        className="w-full h-auto"
                      />
                    </div>
                    <h3 className="font-normal text-2xl tracking-[-0.02rem] text-dark-navy mb-2">{solution.title}</h3>
                    <p className="text-neut/60 text-xl font-light mt-3">{solution.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-10"
              >
                {/* ✅ Hover invert + arrow invert */}
                <Link
                  href="/signup"
                  className="
                    group
                    mx-auto mt-14
                    bg-dark-navy text-white
                    border border-dark-navy
                    rounded-full px-5 py-3
                    flex-center gap-2 w-fit
                    transition-all duration-300
                    hover:bg-white hover:text-dark-navy
                  "
                >
                  <span>Join as a creator</span>
                  <Image
                    src={"/rightArrow.svg"}
                    alt="right-arrow"
                    width={100}
                    height={100}
                    className="w-5 transition-all duration-300 group-hover:invert"
                  />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="general-space">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4 text-center">
                Key Features For Creators On Starix
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
              <div className="md:col-span-3 bg-primary-orange grid grid-cols-1 md:grid-cols-10 rounded-3xl border border-gray-200 overflow-hidden">
                <div className="col-span-4 p-6 md:p-5 md:pl-20 flex flex-col gap-10 md:gap-20 justify-center">
                  <span className="bg-off-white/30 text-dark-navy px-2 py-1 text-base font-light w-fit">
                    CHALLENGE MARKETPLACE
                  </span>
                  <p className="text-off-white text-[28px] tracking-tight">
                    Created Challenge for
                    Thousands of Creators
                  </p>
                </div>

                <div className="bg-[#F3E3D9] md:col-span-6 md:pl-20 relative">
                  <Image
                    src={"/features1.png"}
                    alt="features"
                    width={1200}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              <div className="bg-[#1DD6C60D] rounded-3xl md:col-span-2 py-10 px-8 md:px-14 border border-gray-200">
                <div className="flex flex-col items-center justify-between h-full gap-8">
                  <Image src={"/playButtons.png"} alt="play buttons" width={100} height={100} className="w-20 mx-auto" />

                  <span className="bg-off-white text-dark-navy text-base font-light px-2 py-1">
                    CREATOR INCUBATOR
                  </span>

                  <p className="text-dark-navy text-[28px] tracking-tight text-center">
                    Tutorial + Mini <br /> Tasks Curated For You
                  </p>

                  <Image src={"/imageDash.png"} alt="image dash" width={1000} height={1000} className="w-full h-auto" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-20 mt-20">
              <div className="bg-primary-orange/20 rounded-3xl md:col-span-2 py-10 px-8 md:px-14 border border-gray-200">
                <div className="flex flex-col items-center justify-between h-full gap-8">
                  <Image src={"/heart.png"} alt="heart" width={100} height={100} className="w-20 mx-auto" />

                  <span className="bg-off-white text-dark-navy text-base font-light px-2 py-1">
                    CREATOR TAG
                  </span>

                  <p className="text-dark-navy text-[28px] tracking-tight text-center">
                    Get Discovered Even With <br /> Small Following
                  </p>

                  <Image src={"/imageDash.png"} alt="image dash" width={1000} height={1000} className="w-full h-auto" />
                </div>
              </div>

              <div className="md:col-span-3 bg-[#1DD6C6] grid grid-cols-1 md:grid-cols-10 rounded-3xl border border-gray-200 overflow-hidden">
                <div className="md:col-span-4 p-6 md:p-5 md:pl-20 flex flex-col gap-10 md:gap-20 justify-center">
                  <span className="bg-off-white/30 px-2 py-1 text-base text-white font-light w-fit">
                    CREATOR CV
                  </span>
                  <p className="text-off-white text-[28px] tracking-tight">
                    Your Professional Portfolio + Analytics
                  </p>
                </div>

                <div className="bg-[#F5F5F5] md:col-span-6 md:pl-20 relative">
                  <Image
                    src={"/features3.png"}
                    alt="features"
                    width={1200}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* We’re Made for Every Creator */}
        <section className="text-dark-navy py-16 general-space">
          <div className="flex flex-col gap-20">
            <div className="md:flex md:items-center md:justify-between max-md:space-y-5">
              <p className="text-3xl md:text-4xl text-dark-navy font-semibold tracking-tight max-md:text-center">
                We’re Made for Every Creator
              </p>
              <p className="max-w-md line-clamp-3 text-right font-extralight text-neut/60 text-xl md:text-2xl max-md:text-center">
                {"\""}From zero followers to your first thousand, We’ll help you grow your audience step by step.{"\""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {creators.map((creator, index) => (
                <CreatorCard
                  key={index}
                  image={creator.image}
                  title={creator.title}
                  description={creator.description}
                  buttonText={creator.buttonText}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
