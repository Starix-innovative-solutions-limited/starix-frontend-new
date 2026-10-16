"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBarChart2, FiHeart, FiMessageCircle, FiRepeat, FiSearch, FiShare2 } from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";

const SLIDES = [
  {
    title: ["Consolidate", "Performance"],
    desc: "Find your people. Share what's working, and earn together from starix Challenges",
    bg: "#FF6A1E",
    art: "/tags.webp",
    artClass:
      "bottom-[-10%] left-1/2 w-[50%] max-w-none -translate-x-1/2 md:bottom-[-16%] md:left-auto md:right-[-8%] md:w-[48%] md:translate-x-0 lg:bottom-[-2%] lg:left-[-18%] lg:right-auto lg:w-[120%]",
  },
  {
    title: ["Automated", "Portfolio"],
    desc: "Find your people. Share what's working, and earn together from starix Challenges",
    bg: "#0033FF",
    art: "/scroll.webp",
    artClass:
      "bottom-[0%] right-[10%] w-[60%] max-w-none md:bottom-[-10%] md:right-[-4%] md:w-[46%] lg:bottom-[0%] lg:right-[0%] lg:w-[100%]",
  },
  {
    title: ["Create or", "join Circles"],
    desc: "Find your people. Share what's working, and earn together from starix Challenges",
    bg: "#FF6A1E",
    art: "/rings.webp",
    artClass:
      "bottom-[-10%] right-[-3%] w-[75%] max-w-none md:bottom-[-12%] md:right-[-4%] md:w-[50%] lg:bottom-[0%] lg:left-[5%] lg:right-auto lg:w-[100%]",
  },
] as const;

const SKELETON_ROWS = [
  "#F4A59A",
  "#7ED3C8",
  "#8FD99B",
  "#E6E6E6",
  "#E7A6D4",
  "#7ED3C8",
];

const CreatorBuilt = () => {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  return (
    <section className="bg-[#FFFFFF] px-5 py-12 md:px-10 md:py-16 xl:px-16 xl:py-20">
      <div className="mx-auto max-w-[1320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title.join(" ")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(240px,0.34fr)_minmax(0,1fr)] lg:gap-3.5 xl:gap-4"
          >
            <div
              className="relative h-[280px] overflow-hidden rounded-[28px] px-5 pt-6 text-white md:h-[380px] md:px-8 md:pt-8 lg:h-[380px] lg:rounded-[32px] xl:h-[420px] xl:px-8 xl:pt-9"
              style={{ backgroundColor: slide.bg }}
            >
              <h3 className="relative z-10 max-w-[280px] font-['Geist'] text-[28px] leading-[1.05] font-medium tracking-[-0.04em] md:max-w-[400px] md:text-[36px] lg:max-w-[240px] lg:text-[36px] xl:text-[44px] xl:leading-[1.02]">
                <span className="lg:hidden">{slide.title.join(" ")}</span>
                <span className="hidden lg:block">
                  {slide.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </h3>
              <p className="relative z-10 mt-2.5 max-w-[300px] text-[14px] leading-[1.35] font-medium text-white/90 md:mt-3 md:max-w-[360px] md:text-[15px] lg:max-w-[210px]">
                {slide.desc}
              </p>

              <div className="relative z-10 mt-4 flex items-center gap-1.5 md:mt-5">
                {SLIDES.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={item.title.join(" ")}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Show ${item.title.join(" ")}`}
                      className={`h-[7px] rounded-full transition-all ${
                        isActive
                          ? "w-[22px] bg-white"
                          : "w-[7px] bg-white/45 hover:bg-white/70"
                      }`}
                    />
                  );
                })}
              </div>

              <img
                src={slide.art}
                alt=""
                className={`pointer-events-none absolute z-0 h-auto object-contain ${slide.artClass}`}
              />
            </div>

            <div className="relative overflow-hidden rounded-[28px] lg:h-[380px] lg:rounded-[32px] xl:h-[420px]">
              <StudioBackdrop />
              <div className="relative z-10 flex items-center justify-center px-6 py-10 md:px-14 md:py-14 lg:absolute lg:inset-0 lg:px-8 lg:py-6 xl:px-12">
                {active === 0 && <PerformanceCard />}
                {active === 1 && <PortfolioCard />}
                {active === 2 && <CirclesCard />}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

function StudioBackdrop() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0278C8_0%,#0278C8_48%,#E45508_48%,#E45508_100%)]" />
      <div className="absolute top-[14%] left-[38%] h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_90px_50px_rgba(255,255,255,0.55)] md:h-[280px] md:w-[280px] lg:left-[42%]" />
      <div className="absolute top-[20%] left-[38%] h-[150px] w-[150px] -translate-x-1/2 rounded-full border-[10px] border-white/80 bg-white/90 md:h-[200px] md:w-[200px] lg:left-[42%]" />
      <div className="absolute top-[52%] left-[38%] h-[46%] w-[10px] -translate-x-1/2 rounded-full bg-[#1B1B1B] lg:left-[42%]" />
    </div>
  );
}

function PerformanceCard() {
  return (
    <div className="flex w-full max-w-[300px] flex-col items-center rounded-[28px] bg-white px-5 py-7 shadow-[0_24px_60px_rgba(16,24,40,0.16)] md:max-w-[380px] md:px-6 md:py-9 lg:max-w-[620px] lg:flex-row lg:gap-6 lg:px-7 lg:py-6">
      <RadarMark />
      <div className="mt-5 w-[168px] space-y-2.5 text-[13px] font-medium text-[#5B5F6A] md:mt-6 md:w-[190px] md:text-[14px] lg:mt-0 lg:w-auto lg:flex-1 lg:text-[13px]">
        <LegendRow color="#FF7A1A" label="YouTube" value="65" />
        <LegendRow color="#22C55E" label="Instagram" value="82" />
        <LegendRow color="#A855F7" label="TikTok" value="76" />
      </div>
      <div className="mt-6 lg:mt-0">
        <ScoreRing score={82} />
      </div>
    </div>
  );
}

function LegendRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: color }} />
        {label}
      </span>
      <span className="tabular-nums text-[#1E1F24]">{value}</span>
    </div>
  );
}

function RadarMark() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-[132px] w-[132px] shrink-0 md:h-[150px] md:w-[150px] lg:h-[118px] lg:w-[118px] xl:h-[140px] xl:w-[140px]"
    >
      <polygon
        points="80,18 132,48 132,112 80,142 28,112 28,48"
        fill="#F7F8FC"
        stroke="#E6E8F0"
      />
      <line x1="80" y1="18" x2="80" y2="142" stroke="#E6E8F0" />
      <line x1="28" y1="48" x2="132" y2="112" stroke="#E6E8F0" />
      <line x1="132" y1="48" x2="28" y2="112" stroke="#E6E8F0" />
      <polygon
        points="80,38 118,60 110,108 70,128 42,96 48,58"
        fill="rgba(255,122,26,0.12)"
        stroke="#FF7A1A"
        strokeWidth="2.5"
      />
      <polygon
        points="80,46 108,64 118,104 78,126 44,100 52,62"
        fill="rgba(34,197,94,0.10)"
        stroke="#22C55E"
        strokeWidth="2.5"
      />
      <polygon
        points="80,52 102,70 108,108 74,122 46,94 58,66"
        fill="rgba(168,85,247,0.10)"
        stroke="#A855F7"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function ScoreRing({ score }: { score: number }) {
  const size = 96;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative h-[96px] w-[96px] shrink-0 md:h-[108px] md:w-[108px] lg:h-[96px] lg:w-[96px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EAF2FF"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#245BFF"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src="/dashlogo.webp" alt="" className="h-3.5 w-3.5 object-contain" />
        <span className="text-[26px] leading-none font-semibold tracking-[-0.04em] text-[#245BFF] md:text-[28px]">
          {score}
        </span>
      </div>
    </div>
  );
}

function PortfolioCard() {
  return (
    <div className="w-full max-w-[300px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(16,24,40,0.16)] md:max-w-[420px] lg:max-w-[680px]">
      <div className="flex items-start justify-between gap-3 px-4 pt-4 md:px-5 md:pt-5 lg:px-6 lg:pt-6">
        <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
          <img src="/1.webp" alt="" className="h-7 w-7 rounded-full object-cover md:h-9 md:w-9" />
          <img src="/nivea.webp" alt="Nivea" className="h-7 w-7 rounded-full object-cover md:h-9 md:w-9" />
          <div className="min-w-0">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-[10px] font-semibold text-[#101828] md:text-[15px]">
                Jason Nivea
              </span>
              <span className="text-[10px] text-[#5B9FD8] md:text-[12px]">• </span>
              <GoCheckCircleFill className="shrink-0 text-[#12B76A]" size={10} />
            </div>
            <div className="mt-0.5 flex flex-wrap gap-x-2 text-[8px] text-[#5B9FD8] md:text-[12px]">
              <span>Beauty</span>
              <span className="hidden lg:inline">Family and lifestyle</span>
              <span>Fashion</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="h-[32px] shrink-0 rounded-full border border-[#D0D5DD] px-3 text-[11px] font-semibold text-[#101828] md:h-[36px] md:px-4 md:text-[12px]"
        >
          View Content
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 px-4 text-[11px] md:mt-4 md:px-5 md:text-[12px] lg:px-6">
        <span className="text-[#667085]">Ranked 29th Globally</span>
        <span className="rounded-full bg-[#EFF8FF] px-2.5 py-0.5 font-semibold text-[#175CD3]">
          Finalist
        </span>
      </div>

      <div className="mt-2.5 px-4 md:mt-3 md:px-5 lg:px-6">
        <h4 className="text-[13px] font-semibold text-[#101828] md:text-[15px]">
          UGC Creators Needed for Skincare Product set Launch
        </h4>
        <p className="mt-1 line-clamp-3 text-[11px] leading-[1.45] text-[#667085] md:text-[12px] lg:line-clamp-2">
          NIVEA is launching its new Radiance Boost Skincare Collection and is looking
          for authentic, engaging user-generated content that highlights real skin
          journeys, glow transformations, and everyday skincare routines.
        </p>
      </div>

      <div className="mt-3 px-4 pb-4 md:px-5 lg:px-6 lg:pb-5">
        <img
          src="/pink.webp"
          alt=""
          className="h-[180px] w-full rounded-[16px] object-cover md:h-[220px] lg:h-[132px] xl:h-[148px]"
        />
        <div className="mt-3 flex items-center gap-3.5 text-[11px] font-medium text-[#667085] md:gap-4 md:text-[12px]">
          <span className="flex items-center gap-1">
            <FiBarChart2 size={13} />
            24.3k
          </span>
          <span className="flex items-center gap-1">
            <FiHeart size={13} />
            15.6k
          </span>
          <span className="flex items-center gap-1">
            <FiMessageCircle size={13} />
            31k
          </span>
          <span className="flex items-center gap-1">
            <FiRepeat size={13} />
            964
          </span>
          <FiShare2 size={13} className="ml-auto" />
        </div>
      </div>
    </div>
  );
}

const CIRCLES = [
  {
    name: "InnovateTech San Francisco",
    logo: "/nvidia-circle.webp",
    role: "Member",
    roleClass: "bg-[#F5FBFF] text-[#3379A5]",
    extra: "+2",
  },
  {
    name: "Visionary Designs Tokyo",
    logo: "/tesla-circle.webp",
    role: "Member",
    roleClass: "bg-[#F5FBFF] text-[#3379A5]",
    extra: null as string | null,
  },
  {
    name: "CreativeCorp London",
    logo: "/fw-circle.webp",
    role: "Admin",
    roleClass: "bg-[#FFF0FD] text-[#D847FF]",
    extra: "+4",
  },
];

function CirclesCard() {
  return (
    <div className="w-full max-w-[300px] rounded-[28px] bg-white px-4 py-4 shadow-[0_24px_60px_rgba(16,24,40,0.16)] md:max-w-[420px] md:px-5 md:py-5 lg:max-w-[680px] lg:px-6 lg:py-6">
      <div className="mb-3 flex items-center justify-between gap-3 md:mb-4">
        <h4 className="text-[16px] font-semibold text-[#101828]">Your Circles</h4>
        <div className="flex items-center gap-2">
          <div className="relative hidden w-[170px] lg:block">
            <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-[#98A2B3]" size={14} />
            <input
              readOnly
              placeholder="Search your Circles"
              className="h-[34px] w-full rounded-full border border-[#E5E7EB] bg-white pr-3 pl-8 text-[11px] outline-none placeholder:text-[#98A2B3]"
            />
          </div>
          <button
            type="button"
            className="h-[32px] rounded-full bg-[#0033FF] px-3.5 text-[12px] font-semibold text-white md:h-[34px]"
          >
            Create New
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="divide-y divide-[#EFF0F3]">
          {SKELETON_ROWS.map((color, index) => (
            <div key={color + index} className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span
                  className="h-9 w-9 shrink-0 rounded-[10px] md:h-10 md:w-10"
                  style={{ backgroundColor: color }}
                />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="h-2.5 w-[72%] rounded-full bg-[#E8EAED]" />
                  <div className="h-2.5 w-[48%] rounded-full bg-[#EEF0F3]" />
                </div>
              </div>
              <div className="flex items-center rounded-full bg-[#E8F4FF] px-1.5 py-1">
                {["/1.webp", "/2.webp", "/3.webp"].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="-ml-1.5 h-5 w-5 rounded-full border-2 border-white object-cover first:ml-0 md:h-6 md:w-6"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            className="h-[32px] rounded-full border border-[#E5E7EB] px-4 text-[12px] font-medium text-[#101828]"
          >
            Previous
          </button>
          <div className="flex items-center gap-4 text-[13px]">
            <span className="font-semibold text-[#101828]">1</span>
            <span className="text-[#98A2B3]">2</span>
          </div>
          <button
            type="button"
            className="h-[32px] rounded-full border border-[#E5E7EB] px-4 text-[12px] font-medium text-[#101828]"
          >
            Next
          </button>
        </div>
      </div>

      <div className="hidden divide-y divide-[#EFF0F3] lg:block">
        {CIRCLES.map((circle) => (
          <div key={circle.name} className="flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <img src={circle.logo} alt="" className="h-10 w-10 rounded-[10px] object-cover" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-[#101828]">{circle.name}</p>
                <p className="text-[11px] text-[#667085]">
                  28 Active Challenges • Ranked 250k Globally
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex items-center -space-x-1.5">
                {["/1.webp", "/2.webp", "/3.webp"].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-6 w-6 rounded-full border-2 border-white object-cover"
                  />
                ))}
                {circle.extra && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#C9E9FF] text-[9px] font-semibold text-[#050E81]">
                    {circle.extra}
                  </span>
                )}
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${circle.roleClass}`}>
                {circle.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatorBuilt;
