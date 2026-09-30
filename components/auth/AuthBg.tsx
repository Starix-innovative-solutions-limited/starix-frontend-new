/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiChevronDown } from "react-icons/hi2";
import { getSignupHref } from "@/lib/waitlist";

interface AuthProps {
  brand?: boolean;
}

const AuthBg = ({ brand }: AuthProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const colors = {
    creator: "#B4DFFE",
    brand: "#EFE6EE"
  };

  const config = {
    label: brand ? "For Brands" : "For Creators",
    labelStyles: brand 
      ? "border-[#A67BA1] text-[#A67BA1] bg-[#EFE6EE]" 
      : "border-[#054D81] text-[#054D81] bg-[#B4DFFE]",
    topAsset: "/stacked.svg", 
    mainAsset: brand ? "/bigribbon.svg" : "/bigstar.svg",
  };

  useEffect(() => {
    router.prefetch(getSignupHref());
  }, [router]);

  const handleSwitch = (type: "brand" | "creator") => {
    setIsOpen(false);
    router.push(getSignupHref(type));
  };

  return (
    <motion.div 
      initial={false}
      animate={{ backgroundColor: brand ? colors.brand : colors.creator }}
      transition={{ duration: 0.7 }}
      className="relative h-screen w-full overflow-hidden flex flex-col"
    >
      
      {/* LAYER 1: Decorative Top */}
      <div className="pointer-events-none absolute h-[70%] w-full">
        <Image src={config.topAsset} alt="" fill className="object-cover object-top" priority />
      </div>

      {/* LAYER 2: Content */}
      <div className="relative z-50 flex w-full flex-col items-center px-10 pt-32">
        
        {/* DROPDOWN WRAPPER */}
        <div className="relative mb-10">
          <motion.button 
            onClick={() => setIsOpen(!isOpen)}
            className={`
              flex items-center gap-2 px-4 py-1.5 border rounded-full text-[13px] 
              font-medium uppercase tracking-widest transition-all duration-300
              hover:shadow-md active:scale-95 z-50
              ${config.labelStyles}
            `}
          >
            {config.label}
            <HiChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[160px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-1 z-[100]"
              >
                <button
                  onClick={() => handleSwitch("creator")}
                  className="w-full text-left px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-[#054D81] hover:bg-[#B4DFFE55] rounded-xl transition-colors"
                >
                  For Creators
                </button>
                <button
                  onClick={() => handleSwitch("brand")}
                  className="w-full text-left px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-[#A67BA1] hover:bg-[#EFE6EE] rounded-xl transition-colors"
                >
                  For Brands
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.h1 
          key={`title-${brand}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="whitespace-nowrap text-center text-[80px] font-medium leading-[1.05] tracking-[-0.04em]"
          style={{ color: brand ? "#81056C4D" : "#054D814D" }}
        >
          Redefine your <br /> Creativity
        </motion.h1>
      </div>

      {/* LAYER 3: Main Visual Asset */}
      <div className="pointer-events-none absolute left-1/2 z-50 h-[110%] w-full -translate-x-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={brand ? "brand-asset" : "creator-asset"}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full" 
          >
            <Image src={config.mainAsset} alt="Main Visual" fill className="object-contain object-bottom" priority />
          </motion.div>
        </AnimatePresence>
      </div>
      
    </motion.div>
  );
};

export default AuthBg;