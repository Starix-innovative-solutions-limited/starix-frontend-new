/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import CreatorHeroWithSlider from "@/components/CreatorHeroWithSlider";
import StarixSolutionsAndFeatures from "@/components/StarixSolutionsAndFeatures";

export const CreatorCard = ({ image, title, description, buttonText, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col justify-between bg-white overflow-hidden rounded-3xl hover:shadow-xs transition-shadow duration-300 px-6 p-5"
    >
      <div className="flex flex-col gap-7">
        {/* ✅ Responsive image (no layout shift) */}
        <motion.div
          className="relative w-full aspect-[16/10] overflow-hidden rounded-3xl"
          
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
        className="ml-auto w-fit group flex items-center gap-2 text-dark-navy/70 text-base font-light "
      >
        <span className="border-b border-dark-navy/70 font-light">{buttonText}</span>
        <FiArrowRight className="text-xl " />
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
      <div className="bg-[#F5f5f5]">
        <CreatorHeroWithSlider />

        <StarixSolutionsAndFeatures />

        {/* We’re Made for Every Creator */}
        <section className="text-dark-navy py-16 general-space">
          <div className="flex flex-col gap-20">
            <div className="md:flex md:items-center md:justify-between max-md:space-y-5">
              <p className="font-geist font-[600]
            text-[34px]
            md:text-[48px] text-dark-navy tracking-tight max-md:text-center">
                We’re Made for Every Creator
              </p>
              <p className="max-w-md line-clamp-3 text-right font-extralight text-neut/60 text-xl md:text-2xl max-md:text-center">
                {"\""}From zero followers to your first thousand, We’ll help you grow your audience step by step.{"\""}
              </p>
            </div>

            <div className="relative overflow-hidden">
            <div
                className="
                flex gap-7
                overflow-x-auto
                snap-x snap-mandatory
                pb-6
                scrollbar-hide
                "
                style={{ maxWidth: "calc(4 * 360px)" }}
            >
                {creators.map((creator, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 snap-start h-[490px] w-[384px]"
                >
                    <CreatorCard
                    image={creator.image}
                    title={creator.title}
                    description={creator.description}
                    buttonText={creator.buttonText}
                    delay={index * 0.1}
                    />
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
