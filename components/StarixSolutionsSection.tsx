"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";

const solutions = [
  {
    title: "UGC Scoring Engine",
    desc: "An algorithm that grades the viral-readiness of user generated content",
    img: "/starixSolution1.png",
  },
  {
    title: "Verified Creator Profiles",
    desc: "To forecast the success of each post from validated creator analytics",
    img: "/starixSolution2.png",
  },
  {
    title: "Trend Intelligence",
    desc: "An influence bot to predict the viral trends and emerging creator insights",
    img: "/starixSolution33.png",
  },
  {
    title: "Challenge Dashboard",
    desc: "Gamified creator challenges with real-time tracking",
    img: "/starixSolution44.png",
  },
];

const StarixSolutionsSection = () => {
  const router = useRouter();

  return (
    <section className="py-20">
      <div className="max-w-[1500px] mx-auto">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            font-['Geist']
            font-[600]
            text-[32px]
            md:text-[48px]
            leading-[1.2]
            tracking-[-0.02em]
            text-center
            text-[#0B0F3C]
            mb-20
          "
        >
          Starix Solutions
        </motion.h2>

        {/* HORIZONTAL SCROLL CARDS */}
<motion.div
  className="
    flex
    gap-6
    overflow-x-auto
    pb-6
    scrollbar-hide
    cursor-grab
  "
  drag="x"
  dragConstraints={{ left: -1200, right: 0 }}
  whileTap={{ cursor: "grabbing" }}
>
  {solutions.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}

      className="
        bg-white
        rounded-[32px]
        px-6
        pt-6
        pb-10
        shadow-l
        flex
        flex-col
        justify-between

        min-w-[380px]        /* mobile */
        md:min-w-[420px]     /* tablet */
        lg:min-w-[460px]     /* desktop */
        xl:min-w-[350px]     /* large desktop */
      "
    >
      {/* IMAGE */}
      <div className="w-full mb-6 rounded-[20px] overflow-hidden bg-[#F6F7FB] p-4">
        <Image
          src={item.img}
          alt={item.title}
          width={900}
          height={700}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* TEXT */}
      <div>
        <h3
          className="
            font-['Geist']
            font-[500]
            text-[22px]
            text-dark-navy
            mb-3
          "
        >
          {item.title}
        </h3>

        <p
          className="
            font-['Geist']
            font-[300]          
            text-[18px]
            leading-[1.4]
            text-[#6E6E6E]
          "
        >
          {item.desc}
        </p>
      </div>
    </motion.div>
  ))}
</motion.div>

        

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-20"
        >
          <button
            onClick={() => router.push("/signup?role=brand")}
            className="
                inline-flex items-center justify-center
                w-[193px]
                h-[68px]
                gap-[6px]

                rounded-[40px]
                bg-dark-navy

                px-[18px] py-[6px]

                text-white
                text-[14px] xl:text-[16px]
                font-medium

                transition-all duration-200
                hover:opacity-95
                hover:shadow-lg
              "
          >
            Join as a Brand
            <HiOutlineArrowNarrowRight className="text-xl" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default StarixSolutionsSection;
