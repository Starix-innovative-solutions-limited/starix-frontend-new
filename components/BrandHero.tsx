"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const BrandHero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-[#C5E6FE] overflow-hidden p-6">
      
      

      {/* FLOATING 3D ASSETS */}
      {/* LEFT ASSET - Purple Scalloped Shape */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-[-24%] top-[-10%] w-[120%] h-[110%] z-10"
      >
        <Image
          src="/closeup.svg" // Replace with your purple glass/scallop asset
          alt="3D Decorative Asset"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* RIGHT ASSET - Blue Crystal/Gem */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute right-[-17%] top-[0%] w-[120%] h-[110%] z-10"
      >
        <Image
          src="/diamondssss.svg" // Replace with your blue crystal asset
          alt="3D Decorative Asset"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* MAIN CONTENT CENTERED */}
      <div className="relative z-20 text-center max-w-[900px]">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[#040136] text-[48px] md:text-[76px] lg:text-[76px] leading-[1.05] font-medium tracking-tight"
        >
          Know who's worth it <br /> 
          before you <span className="text-[#040136]">spend</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-8 text-[#62636C] text-[18px] md:text-[26px] max-w-[600px] font-medium mx-auto leading-relaxed"
        >
          Find creators with proof. Run campaigns with clarity. Get content that works.
        </motion.p>

        {/* BUTTONS */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/signup"
            className="w-full sm:w-auto px-10 py-4 rounded-full border-2 border-[#0033FF] text-[#0033FF] font-medium hover:shadow-sm transition-all text-[20px]"
          >
            Join as a Creator
          </Link>
          <Link
            href="/signup?role=brand"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#0033FF] text-white font-medium hover:shadow-sm transition-all shadow-lg text-[20px]"
          >
            Join as a Brand
          </Link>
        </motion.div>
      </div>

      
    </section>
  );
};

export default BrandHero;