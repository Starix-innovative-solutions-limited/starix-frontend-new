/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import CreatorHeroWithSlider from "@/components/CreatorHeroWithSlider";
import StarixSolutionsAndFeatures from "@/components/StarixSolutionsAndFeatures";
import CreatorBuilt from "@/components/CreatorBuilt";
import CreatorPathSection from "@/components/CreatorPathSection";


const Page = () => {

  return (
    <>
      <div className="bg-[#F5f5f5]">
        <CreatorHeroWithSlider />

        <StarixSolutionsAndFeatures />
        <CreatorBuilt />
        <CreatorPathSection />


      </div>
    </>
  );
};

export default Page;
