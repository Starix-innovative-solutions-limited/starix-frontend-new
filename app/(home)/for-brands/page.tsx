/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { PiWarningCircleLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import StarixSolutionsSection from "@/components/StarixSolutionsSection";
import KeyFeaturesSection from "@/components/KeyFeaturesSection";
import BrandHero from "@/components/BrandHero";
import ProblemsSection from "@/components/ProblemsSection";


const Page = () => {
  const problems = [
    "Poor UGC quality",
    "Hard to verify engagement",
    "Struggle to discover content",
    "No clear ROI from creator campaigns",
  ];

  const [activeProblem, setActiveProblem] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveProblem((prev) => (prev + 1) % problems.length);
  }, 2000); 

  return () => clearInterval(interval);
}, [problems.length]);


const mobileSliderRef = React.useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (!mobileSliderRef.current) return;

  const container = mobileSliderRef.current;
  const activeEl = container.children[activeProblem] as HTMLElement;

  if (!activeEl) return;

  const containerRect = container.getBoundingClientRect();
  const activeRect = activeEl.getBoundingClientRect();

  const offset =
    activeRect.left -
    containerRect.left -
    containerRect.width / 2 +
    activeRect.width / 2;

  container.scrollTo({
    left: container.scrollLeft + offset,
    behavior: "smooth",
  });
}, [activeProblem]);


  const router = useRouter();




 

const variants: Variants = {
  front: {
    scale: 0.78,
    x: 0,
    y: 0,
    zIndex: 4,
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  },
  mid: {
    scale: 0.86,
    x: 70,
    y: -55,
    zIndex: 3,
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  },
  back: {
    scale: 0.93,
    x: 140,
    y: -110,
    zIndex: 2,
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  },
  far: {
    scale: 1,
    x: 210,
    y: -170,
    zIndex: 1,
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  }
};

  const cards = [
  { id: "poor", src: "/poor.png" },
  { id: "uneasy", src: "/uneasy1.png" },
  { id: "creator", src: "/creator1.png" },
  { id: "purple", src: "/purple1.png" },
];

  const challengeSteps = [
    { id: 1, title: "Create a Challenge", description: "Set up your campaign with specific goals and guidelines" },
    { id: 2, title: "Fund Escrow", description: "Secure funds for winner payouts" },
    { id: 3, title: "Get Submissions", description: "Receive and review creator content" },
    { id: 4, title: "Approve Winners", description: "Select and reward top performers" },
  ];

  const brandFeatures = [
    {
      icon: "playButtons.svg",
      title: "Real-time Leaderboard",
      description: "Set campaign goals, budget, and duration.",
      gradient: "from-orange-100 via-pink-50 to-green-100",
    },
    {
      icon: "diamond.svg",
      title: "Content Insight",
      description: "Suggest hooks, captions, and tone that fit your brand voice.",
      gradient: "from-blue-100 via-indigo-50 to-purple-100",
    },
    {
      icon: "trophy.svg",
      title: "Content Performance",
      description: "Starix measures likes and comments automatically.",
      gradient: "from-red-100 via-orange-50 to-blue-100",
    },
  ];

  // derive card order from activeProblem
const order = React.useMemo(() => {
  return cards.map((_, i) => (activeProblem + i) % cards.length);
}, [activeProblem, cards.length]);

const variantMap = ["front", "mid", "back", "far"];

  const [openSection, setOpenSection] = useState(1);
  const toggleSection = (id: any) => setOpenSection(openSection === id ? null : id);

  return (
    <>
      <div
        className="min-w-screen overflow-hidden"
        style={{
          background: "linear-gradient(to right, #f0f4fa 38%, #dce6f5 58%, #c9d8ef 75%, #b8cce8 100%)",
        }}
      >
        <main className="relative ">
          {/* HERO - Fixed grid to prevent shrinking on tablet */}
          <BrandHero />
          

          
            <ProblemsSection />
            <StarixSolutionsSection />
            
          
        </main>

        

      </div>
    </>
  );
};

export default Page;