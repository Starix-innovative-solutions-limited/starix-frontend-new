"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CgArrowLongRight } from "react-icons/cg";
import { motion } from "framer-motion";

interface AuthProps {
  brand?: boolean;
  creator?: boolean;
  showLabel?: boolean;
}

const ellipseLogos = [
  "/Ellipse 2.svg",
  "/Ellipse 3.svg",
  "/Ellipse 4.svg",
];

const frameLogo = "/Frame 53.svg";




const AuthBg = ({ brand, creator, showLabel }: AuthProps) => {

  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setExpanded(prev => !prev);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const logosToRender = expanded
  ? [...ellipseLogos, ...ellipseLogos, frameLogo] // 3 + 3 + 1 = 7
  : [...ellipseLogos, frameLogo];

  

  return (
    <div
      className={`
        ${brand ? "bg-primary-orange/5 border border-gray-100" : "bg-[#C9D4F5]"}
        max-md:hidden
        h-full
        rounded-3xl
        py-8
        px-2
        grid
      `}
    >
      {showLabel && (
        <span className="bg-[#fafafa] absolute ml-8 w-fit h-fit px-3 py-1.5 font-light text-dark-navy text-sm">
          FOR {brand ? "BRAND" : "CREATOR"}
        </span>
      )}

      <div className="my-auto flex flex-col gap-10">

        {/* DASH IMAGES */}
        <div className="mx-auto w-fit">
          <Image src="/dash-section11.svg" width={300} height={100} alt="" className="shadow-lg shadow-[#fbbea4]" />
          <Image
            src="/dash-section123.png"
            width={300}
            height={100}
            alt=""
            className="ml-20 -mt-40"
          />
        </div>

        {/* HEADING */}
        <h2 className="tracking-[-0.02em] text-dark-navy line-clamp-2 text-2xl text-center">
          {brand && (
            <span>
              Redefine your Brand <br /> Story!
            </span>
          )}
          {creator && <span>Redefine Your Creativity,</span>}
          {!brand && !creator && (
            <span>
              Build campaigns, Join <br /> challenges, Earn rewards.
            </span>
          )}
        </h2>

        {/* CTA ROW */}
<div className="flex flex-col gap-4">
  <motion.div
    layout
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className={`
      rounded-full
      px-5 py-3
      shadow-2xs
      flex items-center
      bg-[#A9BAEF6E]
      w-fit mx-auto
      overflow-hidden
      ${brand ? "bg-primary-orange/10" : ""}
    `}
  >
    {/* LOGOS */}
    <div className="flex items-center">
      {logosToRender.map((src, i) => (
        <motion.div
          key={i}
          layout
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative"
          style={{
            marginLeft:
              i === 0
                ? 0
                : expanded
                ? -6   // still stacked, just looser
                : -16, // tightly stacked
            zIndex: logosToRender.length - i
          }}
        >
          <Image src={src} alt="" width={36} height={36} />
        </motion.div>
      ))}
    </div>

    {/* TEXT */}
    <motion.span
      layout
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="italic text-orange-400 text-[24px] ml-3 whitespace-nowrap"
    >
      start here
    </motion.span>

    {/* ARROW */}
    <motion.div
      layout
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="ml-2"
    >
      <CgArrowLongRight className="text-orange-400" />
    </motion.div>
  </motion.div>
</div>

      </div>
    </div>
  );
};

export default AuthBg;
