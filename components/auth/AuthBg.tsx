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
          <Image src="/dash-section1.svg" width={300} height={100} alt="" />
          <Image
            src="/dash-section2.svg"
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
          <div
            className={`
              bg-[#A9BAEF6E]
              rounded-full
              px-4 py-2
              shadow-2xs
              flex items-center gap-3
              w-fit mx-auto
              overflow-hidden
              ${brand ? "bg-primary-orange/10" : ""}
            `}
          >
            {/* LOGOS */}
            <motion.div
  className="flex items-center relative"
  animate={{ gap: expanded ? 8 : -6 }}
  transition={{ duration: 0.6, ease: "easeInOut" }}
>
  {logosToRender.map((src, i) => (
    <motion.div
      key={i}
      initial={{ scale: 0.9, opacity: 0.7 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: expanded ? i * 4 : 0,
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative"
    >
      <Image src={src} alt="" width={28} height={28} />
    </motion.div>
  ))}
</motion.div>


            {/* TEXT */}
            <span className="italic text-orange-400 ml-1 whitespace-nowrap">
              start here
            </span>

            {/* ARROW */}
            <CgArrowLongRight />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthBg;
