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
    image: "/trophy-flo.webp", 
    bgColor: "#F5EFF4", 
    mobileImgClass: "bottom-[-3%] left-[4%] h-[67%] w-[92%] md:left-[17%] md:w-[66%]",
    // INDIVIDUAL STYLING: Massive, centered, slightly lowered
    imgClass: "left-[18%] top-[2%] h-full w-[72%]",
  },
  {
    title: "Fund Escrow",
    description: "Secure your budget in our protected escrow system. Funds are released when you're happy.",
    leftTitle: "Fund with \n Confidence",
    bottomLeft: "Funds held \n securely",
    bottomRight: "until winners \n are selected.",
    image: "/mbag.webp", 
    bgColor: "#F5EFF4",
    mobileImgClass: "bottom-[1%] left-[8%] h-[62%] w-[84%] md:left-[20%] md:w-[60%]",
    // INDIVIDUAL STYLING: Shifted right and slightly smaller to feel "heavy"
    imgClass: "left-[10%] top-[11%] h-[88%] w-[50%]",
  },
  {
    title: "Get Submissions",
    description: "Watch as creators submit high-quality content tailored to your specific brief.",
    leftTitle: "Get Submissions",
    bottomLeft: "Creators \n submit content",
    bottomRight: "You \n review \n what \n comes in.",
    image: "/mailbox.webp", 
    bgColor: "#F5EFF4",
    mobileImgClass: "bottom-[-1%] left-[5%] h-[64%] w-[90%] md:left-[18%] md:w-[64%]",
    // INDIVIDUAL STYLING: Centered with a slight "organic" tilt
    imgClass: "bottom-[1%] left-[10%] h-[94%] w-[75%]",
  },
  {
    title: "Approve Winners",
    description: "Select the best submissions, release payments, and start using your new brand assets.",
    leftTitle: "Approve \n Winners",
    bottomLeft: "Pick the best. \n They get paid.",
    bottomRight: "You get the \n  content.",
    image: "/torch.webp", 
    bgColor: "#F5EFF4",
    mobileImgClass: "bottom-[-3%] left-[8%] h-[68%] w-[86%] md:left-[20%] md:w-[60%]",
    // INDIVIDUAL STYLING: Tall, reaching toward the top-right
    imgClass: "bottom-[-4%] left-[17%] h-[96%] w-[70%]",
  },
];

const BrandHowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* PHONE + TABLET */}
      <section className="bg-white px-5 py-16 lg:hidden">
        <div className="mx-auto max-w-[820px] rounded-[26px] bg-[#F4F4F6] p-5 md:rounded-[36px] md:p-8">
          <h2 className="mb-5 font-geist text-[38px] font-medium leading-none tracking-[-0.04em] text-[#040136] md:mb-8 md:text-[56px]">
            How It Works
          </h2>

          <div className="flex flex-col gap-5">
            {steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  key={step.title}
                  className={`relative cursor-pointer overflow-hidden rounded-[20px] transition-[height,background-color] duration-500 md:rounded-[26px] ${
                    isActive
                      ? "aspect-[404/526] w-full bg-[#E9D7E7] md:aspect-auto md:h-[560px]"
                      : "h-[72px] bg-white md:h-[92px]"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="relative z-20 flex items-start justify-between px-5 pt-5 md:px-8 md:pt-7">
                    <h3
                      className={`max-w-[75%] font-geist font-medium tracking-[-0.035em] ${
                        isActive
                          ? "text-[25px] leading-[1.12] text-[#040136] md:text-[34px]"
                          : "text-[24px] leading-[1.25] text-[#7C7E87] md:text-[30px]"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className={`font-geist text-[30px] font-light leading-none ${
                        isActive ? "text-[#040136]" : "text-[#7C7E87]"
                      }`}
                    >
                      {isActive ? "−" : "+"}
                    </span>
                  </div>

                  {isActive && (
                    <>
                      <p className="relative z-20 mt-5 max-w-[330px] px-5 text-[15px] leading-[1.45] text-[#696A75] md:max-w-[500px] md:px-8 md:text-[18px]">
                        {step.description}
                      </p>

                      <div className={`pointer-events-none absolute ${step.mobileImgClass}`}>
                        <Image
                          src={step.image}
                          alt=""
                          fill
                          sizes="(max-width: 767px) 90vw, 520px"
                          className="object-contain object-bottom"
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-x-5 bottom-5 z-20 flex items-end justify-between md:inset-x-8 md:bottom-7">
                        <p className="whitespace-pre-line text-[14px] leading-[1.05] text-[#62636C] md:text-[18px]">
                          {step.bottomLeft}
                        </p>
                        <p className="whitespace-pre-line text-right text-[9px] leading-[1.15] text-[#62636C] md:text-[12px]">
                          {step.bottomRight}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESKTOP */}
      <section className="hidden bg-white px-6 py-24 lg:block">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)] items-stretch gap-6">
        
        {/* LEFT SIDE: DYNAMIC VISUAL CARD */}
        <div className="relative aspect-[1.645/1] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] p-5 xl:rounded-[36px] xl:p-7"
              style={{ backgroundColor: steps[activeStep].bgColor }}
            >
              {/* TOP GHOST TEXT */}
              <h2 className="whitespace-pre-line text-[32px] font-normal leading-[1.05] tracking-[-0.04em] text-[#62636C]/60 xl:text-[40px]">
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
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* BOTTOM TEXT */}
              <div className="flex justify-between items-end z-10 w-full">
                <p className="max-w-[400px] whitespace-pre-line text-[20px] font-normal leading-[1.15] text-[#62636C] xl:text-[25px]">
                  {steps[activeStep].bottomLeft}
                </p>
                <p className="max-w-[200px] whitespace-pre-line text-right text-[10px] leading-tight text-[#62636C] xl:text-[13px]">
                  {steps[activeStep].bottomRight}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE: ACCORDION LIST */}
        <div className="flex h-full flex-col rounded-[28px] bg-[#F4F4F6] p-4 xl:rounded-[36px] xl:p-5">
          <h2 className="mb-6 px-1 text-[44px] font-medium leading-none tracking-[-0.04em] text-[#040136] xl:mb-8 xl:text-[52px]">
            How It Works
          </h2>

          <div className="flex flex-1 flex-col justify-between gap-3">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`group flex min-h-[46px] cursor-pointer flex-col justify-center rounded-[16px] px-3 py-3 transition-all duration-500 xl:min-h-[54px] xl:px-4 ${
                    isActive ? "" : "bg-[#FFF] hover:bg-[#F1F1F4]"
                  }`}
                  style={{ backgroundColor: isActive ? "#E9D7E7" : undefined }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`text-[18px] font-medium tracking-[-0.03em] transition-colors duration-300 xl:text-[21px] ${
                      isActive ? "text-[#040136]" : "text-[#62636C]"
                    }`}>
                      {step.title}
                    </h3>
                    <div className={`text-[22px] font-light leading-none transition-colors ${
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
                    <p className="max-w-[250px] text-[11px] leading-[1.4] text-[#62636C] xl:text-[13px]">
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
    </>
  );
};

export default BrandHowItWorks;