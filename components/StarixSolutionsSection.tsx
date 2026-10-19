"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const solutions = [
  {
    title: ["Guide", "with Briefs"],
    desc: "Give creators direction. Hooks, tone, what to avoid. They handle the rest.",
    asset: "/float.webp",
    assetClass:
      "left-[40%] top-[8%] w-[54%] md:left-[60%] md:top-[6%] md:w-[30%] lg:left-[14%] lg:top-[6%] lg:w-[68%]",
  },
  {
    title: ["Create a", "Challenge"],
    desc: "Set your goals, budget, and timeline. The challenge goes live.",
    asset: "/brandflag.webp",
    assetClass:
      "left-[42%] top-[6%] w-[52%] md:left-[62%] md:top-[4%] md:w-[30%] lg:left-[22%] lg:top-[6%] lg:w-[64%]",
  },
  {
    title: ["Track &", "Reward"],
    desc: "Performance tracked automatically. Winners get paid. You get the content.",
    asset: "/branddiamond.webp",
    assetClass:
      "left-[36%] top-[10%] w-[60%] md:left-[58%] md:top-[12%] md:w-[36%] lg:left-[24%] lg:top-[12%] lg:w-[70%]",
  },
];

const StarixSolutionsSection = () => {
  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#DDE4FF] px-3 py-1 text-[12px] font-medium uppercase tracking-[0.02em] text-[#0A3BFF]">
              The Solution
            </span>
            <h2 className="mt-3 flex flex-wrap items-center gap-x-2 font-geist text-[24px] font-medium leading-[1.25] tracking-[-0.03em] text-[#040136] md:gap-x-3 md:text-[44px] md:leading-[1.1] md:tracking-[-0.04em] lg:text-[60px]">
              <span className="w-full lg:w-auto">
                Built to help<span className="lg:hidden"> you</span>
              </span>
              <Image
                src="/Play 2.webp"
                alt=""
                width={96}
                height={96}
                className="inline-block h-[0.9em] w-auto"
              />
              scale campaigns
            </h2>
          </div>
          <p className="max-w-[260px] text-[14px] leading-[1.4] text-[#6E6E78] md:max-w-none md:text-[16px] lg:mb-3 lg:text-right">
            No matter what industry or
            <br className="hidden lg:block" /> niche your brand exists in
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-[24px] bg-[#E3E8FB] p-4 md:gap-5 md:p-5 lg:grid-cols-3 lg:gap-5 lg:p-6">
          {solutions.map((item, i) => (
            <motion.div
              key={item.asset}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative flex aspect-[282/242] flex-col justify-end overflow-hidden rounded-[16px] bg-[#F4F5FF] p-5 md:aspect-[2.4/1] md:p-8 lg:aspect-square lg:p-6"
            >
              <div className={`pointer-events-none absolute ${item.assetClass}`}>
                <Image
                  src={item.asset}
                  alt=""
                  width={800}
                  height={800}
                  sizes="(min-width: 1024px) 280px, 60vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="relative z-10">
                <h3 className="font-geist text-[30px] font-normal leading-[1.05] tracking-[-0.03em] text-[#040136] md:text-[32px]">
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </h3>
                <p className="mt-3 max-w-[300px] text-[14px] leading-[1.45] text-[#6E6E78]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StarixSolutionsSection;
