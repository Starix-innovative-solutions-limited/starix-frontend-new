"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const challenges = [
  {
    title: "Fast-Moving Trends",
    desc: "Trends move fast. By the time you catch one it's already gone",
    icon: "/or-clock.webp",
    imgClass: "w-[110%] h-[100%] bottom-[-25%] left-[-10%]",
    titleClass: "top-8 max-w-[160px] left-6",
    descClass: "top-24  max-w-[115px] right-[4%] text-right"
  },
  {
    title: "Hard to Grow Audience",
    desc: "Hard to grow when you don't know what's working",
    icon: "/blue-seats.webp",
    imgClass: "w-[120%] h-[110%] bottom-[-12%] right-[-20%]",
    titleClass: "top-8 max-w-[150px] left-8",
    descClass: "top-10 right-[4%] text-right max-w-[120px]"
  },
  {
    title: "Brand Credibility",
    desc: "No way to prove you're worth the investment",
    icon: "/cracked.webp",
    imgClass: "w-[110%] h-[100%] md:h-[120%] bottom-[-15%] right-[-10%]",
    titleClass: "top-8 left-8",
    descClass: "top-18 left-8 max-w-[220px]"
  },
  {
    title: "Limited Opportunities",
    desc: "Opportunities exist. They're just not reaching you.",
    icon: "/gateway.webp",
    imgClass: "w-[125%] h-[100%] bottom-[-18%] right-[5%]",
    titleClass: "top-8 max-w-[150px] left-8",
    descClass: "top-28 right-[4%] text-right max-w-[200px]"
  },
];

const ChallengeCard = ({
  title,
  desc,
  icon,
  imgClass,
  titleClass,
  descClass,
  index,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[#F3F5FC] rounded-[24px] h-[400px] relative overflow-hidden"
  >
    {/* TITLE */}
    <h3
      className={`absolute z-10 text-[#040136] font-medium text-[28px] leading-tight tracking-tight ${titleClass}`}
    >
      {title}
    </h3>

    {/* DESCRIPTION */}
    <p
      className={`absolute z-10 text-[#747682] text-[16px] leading-snug ${descClass}`}
    >
      {desc}
    </p>

    {/* IMAGE */}
    <div
      className={`absolute ${imgClass} pointer-events-none transition-transform duration-500`}
    >
      <Image
        src={icon}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-contain object-bottom"
      />
    </div>
  </motion.div>
);

const StarixChallengesSection = () => {
  return (
    <section className="relative py-12 md:py-24 bg-white px-6">
      <div className="max-w-[1300px] mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-[#040136] text-[48px] md:text-[72px] font-medium leading-none tracking-tight">
            What’s been <br />
            holding <span className="text-[#FD6C1D]">you back..</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {challenges.map((item, i) => (
            <ChallengeCard key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StarixChallengesSection;