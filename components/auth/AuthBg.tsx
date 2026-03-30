"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface AuthProps {
  brand?: boolean;
}

const AuthBg = ({ brand }: AuthProps) => {
  const colors = {
    creator: "#B4DFFE",
    brand: "#EFE6EE"
  };

  const config = {
    label: brand ? "For Brands" : "For Creators",
    labelStyles: brand 
      ? "border-[#A67BA1] text-[#A67BA1] bg-[#EFE6EE]" 
      : "border-[#054D81] text-[#054D81] bg-[#B4DFFE]",
    titleColor: brand ? "text-[#C48EBF]" : "text-[#7B96D4]",
    topAsset: "/stacked.svg", 
    mainAsset: brand ? "/bigribbon.svg" : "/bigstar.svg",
  };

  return (
    <motion.div 
      initial={false}
      animate={{ backgroundColor: brand ? colors.brand : colors.creator }}
      transition={{ duration: 0.7 }}
      // h-screen is vital here so absolute children have a reference height
      className="relative h-screen w-full overflow-hidden flex flex-col"
    >
      
      {/* LAYER 1: Top Decorative Shapes (stacked.svg) */}
      <div className="absolute w-full h-[70%]  pointer-events-none">
        <Image 
          src={config.topAsset} 
          alt="" 
          fill 
          className="object-cover object-top"
          priority
          // If images aren't showing, check if the console has 404s for these paths
        />
      </div>

      {/* LAYER 2: Floating Center Content */}
      <div className="relative z-30 flex flex-col items-center pt-32 px-10 pointer-events-none w-full">
        <motion.div 
          key={`label-${brand}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-10 px-2 py-1 border rounded-full text-[13px] font-medium uppercase tracking-widest transition-colors duration-500 ${config.labelStyles}`}
        >
          {config.label}
        </motion.div>

        <motion.h1 
          key={`title-${brand}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        
          className="font-medium leading-[1.05] text-center tracking-[-0.04em] whitespace-nowrap text-[80px] transition-colors duration-500"
          style={{ 
            color: brand ? "#81056C4D" : "#054D814D" // 4D is roughly 30% opacity
          }}
        >
          Redefine your <br /> Creativity
        </motion.h1>
      </div>

      
      {/* We use a large h percentage and absolute positioning to ensure it anchors to the bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full h-[110%] z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={brand ? "brand-asset" : "creator-asset"}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full" 
          >
            <Image 
              src={config.mainAsset} 
              alt="Main Visual" 
              fill 
              className="object-contain object-bottom"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
    </motion.div>
  );
};

export default AuthBg;