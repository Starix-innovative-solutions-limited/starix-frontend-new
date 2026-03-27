"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Create a Challenge",
    description: "Set your goals, budget, and timeline. The challenge goes live.",
    leftTitle: "Create a \n Challenge",
    bottomLeft: "Build campaigns \n with real creators",
    bottomRight: "that align \n with your \n brand story.",
    image: "/trophy-flo.svg", 
    bgColor: "#F5EFF4", 
    // INDIVIDUAL STYLING: Massive, centered, slightly lowered
    imgClass: "w-full h-full left-[15%]",
  },
  {
    title: "Fund Escrow",
    description: "Secure your budget in our protected escrow system. Funds are released when you're happy.",
    leftTitle: "Fund with \n Confidence",
    bottomLeft: "Funds held \n securely",
    bottomRight: "until winners \n are selected.",
    image: "/mbag.svg", 
    bgColor: "#F5EFF4",
    // INDIVIDUAL STYLING: Shifted right and slightly smaller to feel "heavy"
    imgClass: "w-[80%] h-[80%] translate-x-16 translate-y-16",
  },
  {
    title: "Get Submissions",
    description: "Watch as creators submit high-quality content tailored to your specific brief.",
    leftTitle: "Get Submissions",
    bottomLeft: "Creators \n submit content",
    bottomRight: "You \n review \n what \n comes in.",
    image: "/mailbox.svg", 
    bgColor: "#F5EFF4",
    // INDIVIDUAL STYLING: Centered with a slight "organic" tilt
    imgClass: "w-full h-full bottom-[5%] left-[7%]",
  },
  {
    title: "Approve Winners",
    description: "Select the best submissions, release payments, and start using your new brand assets.",
    leftTitle: "Approve \n Winners",
    bottomLeft: "Pick the best. \n They get paid.",
    bottomRight: "You get the \n  content.",
    image: "/torch.svg", 
    bgColor: "#F5EFF4",
    // INDIVIDUAL STYLING: Tall, reaching toward the top-right
    imgClass: "w-[100%] h-[100%] left-[10%] ",
  },
];

const BrandHowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-white px-6">
      {/* 70/30 Grid */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        
        {/* LEFT SIDE: DYNAMIC VISUAL CARD (70%) */}
        <div className="lg:col-span-7 relative h-[620px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 rounded-[48px] p-12 md:p-10 flex flex-col justify-between overflow-hidden"
              style={{ backgroundColor: steps[activeStep].bgColor }}
            >
              {/* TOP GHOST TEXT */}
              <h2 className="text-[#62636C]/60 text-[32px] md:text-[48px] leading-[1] font-normal tracking-tighter whitespace-pre-line">
                {steps[activeStep].leftTitle}
              </h2>

              {/* CENTER ASSET: Applying Individual Styling */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.1, duration: 0.6 }}
                   // This wrapper handles the individual sizing/pos
                   className={`relative ${steps[activeStep].imgClass} transition-all duration-700`}
                >
                  <Image
                    src={steps[activeStep].image}
                    alt="visual asset"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>

              {/* BOTTOM TEXT */}
              <div className="flex justify-between items-end z-10 w-full">
                <p className="text-[#62636C] text-[24px] md:text-[30px] leading-[1.1] font-normal whitespace-pre-line max-w-[400px]">
                  {steps[activeStep].bottomLeft}
                </p>
                <p className="text-[#62636C] text-[12px] md:text-[16px] text-right whitespace-pre-line leading-tight max-w-[200px]">
                  {steps[activeStep].bottomRight}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE: ACCORDION LIST (30%) */}
        <div className="lg:col-span-3 flex  rounded-xl flex-col">
          <h1 className="text-[#040136] text-[48px] md:text-[64px] font-medium mb-10 p-2 tracking-tight leading-none">
            How it works
          </h1>

          <div className="flex flex-col gap-3">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`group cursor-pointer rounded-[24px] transition-all duration-500 p-6 ${
                    isActive ? "" : "bg-[#FFF] hover:bg-[#F1F1F4]"
                  }`}
                  style={{ backgroundColor: isActive ? step.bgColor : undefined }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`text-[20px] md:text-[28px] font-medium tracking-tight transition-colors duration-300 ${
                      isActive ? "text-[#040136]" : "text-[#62636C]"
                    }`}>
                      {step.title}
                    </h3>
                    <div className={`text-[24px] font-light transition-colors ${
                      isActive ? "text-[#040136]" : "text-[#C4C4C4]"
                    }`}>
                      {isActive ? "−" : "+"}
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isActive ? "auto" : 0, 
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 10 : 0 
                    }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#62636C] text-[15px] leading-snug">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandHowItWorks;