"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSignupHref } from "@/lib/waitlist";

const testimonials = [
  {
    name: "John Doe",
    quote: "I stopped pitching. Brands started finding me.",
    avatar: "/1.svg",
  },
  {
    name: "Jane Smith",
    quote: "My approach shifted from selling to storytelling.",
    avatar: "/2.svg",
  },
  {
    name: "Emily Johnson",
    quote: "Engagement soared once I prioritized authenticity.",
    avatar: "/3.svg",
  },
  {
    name: "Michael Brown",
    quote: "I learned that connection beats promotion every time.",
    avatar: "/4.svg",
  },
  {
    name: "Sarah Williams",
    quote: "Collaborations feel natural now, never forced.",
    avatar: "/5.svg",
  },
];

function Ticker() {
  return (
    <div className="relative w-full bg-white/40 py-3 backdrop-blur-sm md:py-7">
      <div className="flex overflow-hidden">
        <motion.div
          className="flex items-center gap-6 whitespace-nowrap pl-5 md:gap-16 md:pl-8"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="flex min-w-max items-center gap-2.5 md:gap-3">
              <div
                className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-sm md:h-[60px] md:w-[60px] ${
                  i % 2 === 0 ? "bg-[#0052FF]" : "bg-[#FF5C00]"
                }`}
              >
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center text-left">
                <p className="text-[12px] leading-snug font-medium tracking-tight text-[#1E1F24] md:text-[14px]">
                  {t.quote}
                </p>
                <span className="mt-0.5 text-[11px] font-medium text-[#62636C] md:text-[12px]">
                  @{t.name.toLowerCase().replace(/\s+/g, "")}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function CreatorHero() {
  return (
    <section className="flex w-full flex-col items-center bg-[#FAFAFA] px-4 pt-[124px] pb-12 text-center font-['Geist'] text-[#0A0A1B] md:px-10 md:pt-24 md:pb-16 xl:px-6 xl:pt-32 xl:pb-20">
      <h1 className="max-w-[1200px] text-[32px] font-medium leading-[1.1] tracking-[-0.04em] text-[#040136] md:text-[48px] md:leading-[1.08] xl:text-[80px] xl:leading-[100%]">
        Your work should open doors.{" "}
        <br className="hidden xl:inline" />
        Not just{" "}
        <span className="whitespace-nowrap text-[#FD6C1D] md:whitespace-normal">
          follower count.
        </span>
      </h1>

      <p className="mt-4 max-w-[280px] text-[14px] leading-[1.45] font-medium text-[#6E6E6E] md:mt-5 md:max-w-[560px] md:text-[18px] md:leading-relaxed xl:max-w-2xl xl:text-[24px]">
        Find challenges that fit what you do.{" "}
        <br className="hidden md:inline" />
        Make content. Get paid.
      </p>

      <Link
        href={getSignupHref("creator")}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#FD6C1D] px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#e66a28] md:mt-8 md:px-6 md:py-3.5 md:text-[15px] xl:px-10 xl:py-4 xl:text-lg"
      >
        Join as a Creator
      </Link>

      <div className="relative mx-auto mt-8 w-full max-w-7xl overflow-hidden md:mt-20 xl:mt-28 xl:overflow-visible">
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/8]">
          <Image
            src="/masked.svg"
            alt=""
            width={1280}
            height={640}
            className="h-auto w-full"
            priority
          />

          <div className="pointer-events-none absolute top-[10%] left-1/2 z-0 flex w-full -translate-x-1/2 justify-center">
            <Image
              src="/Vectorsss.svg"
              alt=""
              width={1280}
              height={360}
              className="h-auto w-full object-contain"
              priority
            />
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[115%] w-full xl:h-[130%]">
            <Image
              src="/Mask.svg"
              alt="Creators"
              fill
              className="object-cover object-bottom"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
          </div>

          <div className="absolute bottom-0 left-0 z-30 hidden w-full overflow-hidden md:block">
            <Ticker />
          </div>
        </div>

        <div className="w-full overflow-hidden md:hidden">
          <Ticker />
        </div>
      </div>
    </section>
  );
}
