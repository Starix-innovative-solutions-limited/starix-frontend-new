"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSignupHref } from "@/lib/waitlist";

const paths = [
  {
    title: "New Creators",
    desc: "No followers? No problem. Build your creator portfolio from day one and watch your Starix Score grow with every challenge you join.",
    icon: "/book.webp",
    bg: "bg-[#FFEDE3]",
    imgClass: "w-[88%] bottom-[-8%] left-[12%] md:left-[-6%]",
    rotate: -12,
    y: 42,
    z: 1,
  },
  {
    title: "Micro Creators",
    desc: "Get access to paid challenges without pitching brands or waiting for collaborations to come to you. Your creativity speaks for itself here.",
    icon: "/packer.webp",
    bg: "bg-[#E7F2FF]",
    imgClass: "w-[92%] bottom-[-5%] right-[-1%] md:right-[-18%]",
    rotate: -6,
    y: 14,
    z: 2,
  },
  {
    title: "Marketers & Circles",
    desc: "Get access to paid challenges without pitching brands or waiting for collaborations to come to you. Your creativity speaks for itself.",
    icon: "/Group.webp",
    bg: "bg-[#E7FFF4]",
    imgClass: "w-[80%] md:w-[100%] bottom-[4%] md:bottom-[-2%] left-[11%] md:left-[8%]" ,
    rotate: 0,
    y: -56,
    z: 5,
  },
  {
    title: "Trend Creators",
    desc: "If you love jumping on trends, you're in the right place. Join fast-moving challenges designed for viral energy and high engagement.",
    icon: "/flash.webp",
    bg: "bg-[#FFEDE3]",
    imgClass: "w-[95%] md:w-[80%] bottom-[-2%] right-[-1%] md:right-[-8%]",
    rotate: 6,
    y: 14,
    z: 3,
  },
  {
    title: "Mega Creators",
    desc: "Create your own branded challenges, earn rewards, and ship impactful content at scale. Collaborate with other creators and brands to amplify your influence.",
    icon: "/blustar.webp",
    bg: "bg-[#E7F2FF]",
    imgClass: "w-[95%] md:w-[86%] bottom-[-2%] right-[-1%] md:right-[-14%]",
    rotate: 12,
    y: 42,
    z: 4,
  },
];

type PathCardProps = (typeof paths)[number] & {
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onHover: (index: number | null) => void;
};

const PathCard = ({
  title,
  desc,
  icon,
  bg,
  imgClass,
  rotate,
  y,
  z,
  index,
  isActive,
  isDimmed,
  onHover,
}: PathCardProps) => {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 120, rotate }}
      animate={{
        opacity: isDimmed ? 0.7 : 1,
        y: isActive ? y - 32 : y,
        rotate: isActive ? 0 : rotate,
        scale: isActive ? 1.06 : 1,
        zIndex: isActive ? 50 : z,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 26, delay: index * 0.04 }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      onFocus={() => onHover(index)}
      onBlur={() => onHover(null)}
      className={`${bg} relative h-[340px] md:h-[360px] w-[320px] shrink-0 overflow-hidden rounded-[28px] p-7 text-left shadow-[0_18px_40px_rgba(15,23,42,0.08)]`}
      style={{ transformOrigin: "bottom center" }}
    >
      <div className="relative z-10">
        <h3 className="mb-2 font-['Geist'] text-[26px] font-normal leading-none tracking-[-0.03em] text-[#040136]">
          {title}
        </h3>
        <p className="max-w-[260px] font-['Geist'] text-[15px] font-normal leading-[1.35] tracking-[-0.02em] text-[#040136]/65">
          {desc}
        </p>
      </div>

      <div className={`pointer-events-none absolute ${imgClass} h-[58%]`}>
        <Image
          src={icon}
          alt=""
          fill
          sizes="220px"
          className="object-contain object-bottom"
        />
      </div>
    </motion.button>
  );
};

const CreatorPathSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="overflow-hidden bg-white px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[1400px] space-y-8 md:space-y-0">
        <h2 className="text-center font-['Geist'] text-[32px] font-medium leading-[1.08] tracking-[-0.03em] text-[#040136] md:text-[56px]">
          Wherever you are,
          <br />
          there’s a path forward
        </h2>

        <div className="flex flex-col items-center gap-6 md:hidden">
          {paths.map((item, index) => (
            <div
              key={item.title}
              className={`${item.bg} relative h-[360px] w-full max-w-[340px] overflow-hidden rounded-[28px] p-7`}
            >
              <h3 className="mb-2 text-[26px] font-normal text-[#040136]">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[#040136]/65">
                {item.desc}
              </p>
              <div className={`pointer-events-none absolute ${item.imgClass} h-[100%] md:h-[58%]`}>
                <Image
                  src={item.icon}
                  alt=""
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto hidden h-[500px] max-w-[1400px] md:block">
          <div className="absolute inset-0 flex items-end justify-center">
            {paths.map((item, index) => (
              <div
                key={item.title}
                className="-mx-[62px] first:ml-0 last:mr-0"
              >
                <PathCard
                  {...item}
                  index={index}
                  isActive={hovered === index}
                  isDimmed={hovered !== null && hovered !== index}
                  onHover={setHovered}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center md:mt-16">
          <Link
            href={getSignupHref("creator")}
            className="inline-flex items-center rounded-full bg-[#0033FF] p-3 text-[16px] font-semibold text-[#FAFAFA] transition hover:shadow-sm"
          >
            Start Earning
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreatorPathSection;
