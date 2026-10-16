"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const paths = [
  {
    title: "Micro Creators and\nNiched Creatives",
    image: "/antenna.webp",
    bg: "#0061FD",
    titleColor: "#FFFFFF",
    imgClass: "bottom-[-4%] left-[-2%] w-[110%] max-w-none md:w-[88%] lg:bottom-[0%] lg:left-[-4%] lg:w-[120%]",
    rotate: -10,
    y: 40,
    z: 1,
  },
  {
    title: "Industry leaders\nGlobal Creators",
    image: "/starrr.webp",
    bg: "#B8FBE8",
    titleColor: "#040136",
    imgClass: "top-[30%] right-[-4%] w-[120%] max-w-none md:w-[88%] lg:top-[23%] lg:right-[0%] lg:w-[120%]",
    rotate: -7,
    y: 60,
    z: 2,
  },
  {
    title: "New Creators, and\nContent Enthusiasts",
    image: "/hearts.webp",
    bg: "#E1677E",
    titleColor: "#FFFFFF",
    imgClass: "top-[25%] right-[0%] w-[120%] max-w-none md:w-[86%] lg:top-[30%] lg:right-[0%] lg:w-[115%]",
    rotate: 2,
    y: 0,
    z: 5,
  },
  {
    title: "Trend Creators and\ntrusted Influencers",
    image: "/filmclose.webp",
    bg: "#B8FBE8",
    titleColor: "#040136",
    imgClass: "bottom-[-2%] right-[-4%] w-[100%] max-w-none md:w-[86%] lg:bottom-[0%] lg:right-[0%] lg:w-[110%]",
    rotate: 7,
    y: 52,
    z: 3,
  },
  {
    title: "Marketing Agencies\n& Creative Studios",
    image: "/chainsmokers.webp",
    bg: "#0061FD",
    titleColor: "#FFFFFF",
    imgClass: "top-[24%] right-[-26%] w-[130%] max-w-none md:w-[86%] lg:top-[30%] lg:right-[0%] lg:w-[110%]",
    rotate: 13,
    y: 22,
    z: 4,
  },
] as const;

const actions = [
  { label: "Find Challenges", href: "/challenges" },
  { label: "Join a Circle", href: "/creator-circles" },
  { label: "Follow Studio", href: "https://instagram.com/starixcreatives", external: true },
  { label: "Follow HQ", href: "https://instagram.com/starix.hq", external: true },
] as const;

const PEEK = 3;
const PEEK_STEP = 10;

type PathCardProps = (typeof paths)[number] & {
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
};

const PathCard = ({
  title,
  image,
  bg,
  titleColor,
  imgClass,
  rotate,
  y,
  z,
  index,
  isActive,
  onHover,
}: PathCardProps) => {
  return (
    <motion.article
      initial={false}
      animate={{
        y: isActive ? y - 24 : y,
        rotate: isActive ? 0 : rotate,
        scale: isActive ? 1.04 : 1,
        zIndex: isActive ? 50 : z,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      className="relative h-[270px] w-[206px] shrink-0 overflow-hidden rounded-[26px] p-5 shadow-[0_16px_40px_rgba(4,1,54,0.06)] xl:h-[360px] xl:w-[268px] xl:p-6"
      style={{ backgroundColor: bg, transformOrigin: "bottom center" }}
    >
      <h3
        className="relative z-10 max-w-[200px] whitespace-pre-line font-['Geist'] text-[20px] leading-[1.15] font-medium tracking-[-0.03em] xl:text-[22px]"
        style={{ color: titleColor }}
      >
        {title}
      </h3>
      <img
        src={image}
        alt=""
        aria-hidden
        className={`pointer-events-none absolute z-0 h-auto select-none object-contain ${imgClass}`}
      />
    </motion.article>
  );
};

const ActionPills = ({
  className = "",
  large = false,
}: {
  className?: string;
  large?: boolean;
}) => (
  <div
    className={`grid grid-cols-2 ${
      large
        ? "w-full max-w-[300px] gap-2.5 md:max-w-[400px] md:gap-3.5"
        : "w-[300px] shrink-0 gap-2.5"
    } ${className}`}
  >
    {actions.map((action) => {
      const pillClass = large
        ? "inline-flex h-[46px] min-w-0 w-full items-center justify-center rounded-full border-[1.5px] border-[#0033FF] px-2 text-[13px] font-medium whitespace-nowrap text-[#0033FF] transition hover:bg-[#0033FF]/5 md:h-[52px] md:px-4 md:text-[16px]"
        : "inline-flex h-[40px] items-center justify-center rounded-full border border-[#0033FF] px-3 text-[13px] font-medium whitespace-nowrap text-[#0033FF] transition hover:bg-[#0033FF]/5 xl:h-[44px] xl:px-4 xl:text-[14px]";
      if ("external" in action && action.external) {
        return (
          <a
            key={action.label}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className={pillClass}
          >
            {action.label}
          </a>
        );
      }
      return (
        <Link key={action.label} href={action.href} className={pillClass}>
          {action.label}
        </Link>
      );
    })}
  </div>
);

const PathDeck = () => {
  const [active, setActive] = useState(2);
  const count = paths.length;

  const go = (dir: 1 | -1) => {
    setActive((current) => (current + dir + count) % count);
  };

  return (
    <div className="relative h-[380px] w-[min(100%,292px)] md:h-[560px] md:w-[460px]">
      {paths.map((item, index) => {
        const depth = (index - active + count) % count;
        const hidden = depth > PEEK;

        return (
          <motion.article
            key={item.title}
            initial={false}
            animate={{
              x: depth * PEEK_STEP,
              y: depth * PEEK_STEP,
              scale: 1 - depth * 0.012,
              zIndex: 20 - depth,
              opacity: hidden ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            drag={depth === 0 ? "x" : false}
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -48 || info.velocity.x < -400) go(1);
              else if (info.offset.x > 48 || info.velocity.x > 400) go(-1);
            }}
            onTap={depth === 0 ? () => go(1) : undefined}
            className="absolute top-0 left-0 h-[calc(100%-30px)] w-[calc(100%-30px)] cursor-grab overflow-hidden rounded-[28px] p-6 shadow-[0_18px_40px_rgba(4,1,54,0.08)] active:cursor-grabbing md:rounded-[32px] md:p-8"
            style={{
              backgroundColor: item.bg,
              pointerEvents: depth === 0 ? "auto" : "none",
            }}
            aria-hidden={depth !== 0}
            aria-label={
              depth === 0 ? `${item.title.replace(/\n/g, " ")}. Show next type` : undefined
            }
            role={depth === 0 ? "button" : undefined}
          >
            <h3
              className="relative z-10 max-w-[240px] whitespace-pre-line font-['Geist'] text-[22px] leading-[1.15] font-medium tracking-[-0.03em] md:max-w-[300px] md:text-[28px]"
              style={{ color: item.titleColor }}
            >
              {item.title}
            </h3>
            <img
              src={item.image}
              alt=""
              aria-hidden
              className={`pointer-events-none absolute z-0 h-auto select-none object-contain ${item.imgClass}`}
            />
          </motion.article>
        );
      })}
    </div>
  );
};

const CreatorPathSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="creator-path"
      className="overflow-hidden bg-white px-5 py-12 md:px-10 md:py-16 xl:px-16 xl:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="hidden lg:flex lg:items-start lg:justify-between lg:gap-10">
          <h2 className="max-w-[620px] font-['Geist'] text-[42px] leading-[1.08] font-medium tracking-[-0.04em] text-[#040136] xl:text-[52px]">
            Wherever you are,
            <br />
            there&apos;s a path forward
          </h2>
          <ActionPills />
        </div>

        <div className="flex w-full flex-col items-center overflow-x-hidden lg:hidden">
          <h2 className="w-full max-w-[320px] text-center font-['Geist'] text-[30px] leading-[1.1] font-medium tracking-[-0.04em] text-[#040136] md:max-w-[520px] md:text-[42px] md:leading-[1.08]">
            Wherever you are,
            <br />
            there&apos;s a path forward
          </h2>

          <div className="mt-8 flex w-full justify-center md:mt-10">
            <PathDeck />
          </div>

          <ActionPills large className="mt-8 md:mt-12" />
        </div>

        <div className="relative mx-auto mt-6 hidden h-[500px] lg:block xl:mt-8 xl:h-[520px]">
          <div className="absolute inset-0 flex items-start justify-center pt-2">
            {paths.map((item, index) => (
              <div key={item.title} className="-mx-8 xl:-mx-8">
                <PathCard
                  {...item}
                  index={index}
                  isActive={hovered === index}
                  onHover={setHovered}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorPathSection;
