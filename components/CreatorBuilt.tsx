"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GoCheckCircleFill } from "react-icons/go";

const SLIDES = [
  {
    title: "Creator Tag",
    desc: "Find your people. Share what's working. Rise together.",
    leftImage: "/orangeee.svg",
    brand: {
      name: "Food Brand",
      timeAgo: "2d ago",
      tags: ["Food", "family and lifestyle"],
      photos: ["/Left Img.png", "/Right Img.png"],
    },
  },
  {
    title: "Challenge",
    desc: "Challenges that fit your niche. No pitching required.",
    leftImage: "/orangeee.svg",
    brand: {
      name: "Food Brand",
      timeAgo: "2d ago",
      tags: ["Food", "family and lifestyle"],
      photos: ["/Left Img.png", "/Right Img.png"],
    },
  },
  {
    title: "Creator CV",
    desc: "Brands find you by what you make, not how many follow you.",
    leftImage: "/orangeee.svg",
    brand: {
      name: "Food Brand",
      timeAgo: "2d ago",
      tags: ["Food", "family and lifestyle"],
      photos: ["/Left Img.png", "/Right Img.png"],
    },
  },
  {
    title: "Creator Circle",
    desc: "One place for your work, your numbers, your proof.",
    leftImage: "/orangeee.svg",
    brand: {
      name: "Food Brand",
      timeAgo: "2d ago",
      tags: ["Food", "family and lifestyle"],
      photos: ["/Left Img.png", "/Right Img.png"],
    },
  },
];

const CreatorBuilt = () => {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  return (
    <section className="bg-transparent px-6 py-25 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 md:mb-8 md:flex-row md:items-end md:gap-8 xl:mb-10 xl:items-center xl:gap-5">
          <h2 className="min-w-0 font-['Geist'] text-[32px] font-normal leading-[1.08] tracking-[-0.04em] text-[#040136] md:flex-1 md:text-[42px] md:leading-[1.05] xl:text-[clamp(34px,4.6vw,60px)] xl:leading-none">
            Built for how you{" "}
            <Image
              src="/buttons 3.webp"
              alt=""
              width={72}
              height={40}
              className="inline-block h-[1.3em] w-auto translate-y-[1px] md:h-[1.4em] md:translate-y-[2px] xl:h-[1.92em]"
            />{" "}
            actually work
          </h2>
          <p className="max-w-[280px] text-left text-[13px] font-normal leading-[1.3] text-[#8B8D98] md:max-w-[200px] md:shrink-0 md:text-right md:text-[15px] xl:max-w-[200px]">
            No matter what niche
            <br />
            you create content for
          </p>
        </div>

        <div className="overflow-hidden rounded-[32px] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid lg:h-[470px] lg:grid-cols-[38%_62%]"
            >
              <div className="relative h-[350px] overflow-hidden px-8 pt-10 md:px-12 md:pt-12 lg:h-full">
                <h3 className="font-['Geist'] text-[32px] font-normal leading-none tracking-[-0.03em] text-[#040136] md:text-[36px]">
                  {slide.title}
                </h3>
                <p className="mt-3 max-w-[230px] font-['Geist'] text-[15px] font-normal leading-[1.35] tracking-[-0.02em] text-[#8B8D98] md:text-[16px]">
                  {slide.desc}
                </p>

                <div className="mt-5 flex items-center gap-[6px]">
                  {SLIDES.map((item, index) => {
                    const isActive = index === active;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`Show ${item.title}`}
                        className={`h-[6px] rounded-full transition-all ${
                          isActive
                            ? "w-[26px] bg-[#0033FF]"
                            : "w-[6px] bg-[#D5D6DC] hover:bg-[#C4C4CC]"
                        }`}
                      />
                    );
                  })}
                </div>

                <Image
                  src={slide.leftImage}
                  alt=""
                  width={493}
                  height={394}
                  className="pointer-events-none absolute bottom-[1px] left-6 w-[340px] max-w-none md:left-10 md:w-[380px]"
                />
              </div>

              <div className="flex h-full flex-col border-t border-[#EDEDF1] lg:border-l lg:border-t-0">
                <div className="px-8 pt-10 md:px-12 md:pt-12">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#0033FF]">
                      <span className="h-[16px] w-[16px] rounded-[3px] bg-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[18px] font-medium leading-none text-[#040136]">
                          {slide.brand.name}
                        </span>
                        <GoCheckCircleFill className="text-[14px] text-[#0CC963]" />
                        <span className="text-[14px] leading-none text-[#B4B7C1]">
                          •
                        </span>
                        <span className="text-[14px] leading-none text-[#B4B7C1]">
                          {slide.brand.timeAgo}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-5 text-[14px] text-[#5B9FD8]">
                        {slide.brand.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 h-px w-full bg-[#EDEDF1]" />

                <div className="mt-auto grid grid-cols-2 gap-[6px]">
                  {slide.brand.photos.map((photo) => (
                    <Image
                      key={photo}
                      src={photo}
                      alt=""
                      width={720}
                      height={400}
                      className="h-[168px] w-full object-cover object-[center_20%] md:h-[188px]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CreatorBuilt;
