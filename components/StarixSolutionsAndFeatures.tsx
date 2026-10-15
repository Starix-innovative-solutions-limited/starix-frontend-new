"use client";

import { useState } from "react";

const slides = [
  {
    id: "01",
    title: ["Fast-", "Moving", "Trends"],
    pillTitle: "Fast-Moving Trends",
    desc: "Find your people. Share what's working. Rise together.",
    image: "/clock it.webp",
    bg: "#FFF1E8",
    art: {
      width: "80%",
      top: "90%",
      left: "85%",
      rotate: "-20deg",
    },
    mobileArt: {
      width: "310%",
      top: "124%",
      left: "72%",
      rotate: "-10deg",
    },
  },
  {
    id: "02",
    title: ["Hard-", "to-Grow", "Audience"],
    pillTitle: "Hard-to-Grow Audience",
    desc: "Hard to grow when you don't know what's working",
    image: "/seaters.webp",
    bg: "#E8F4FF",
    art: {
      width: "60%",
      top: "90%",
      left: "80%",
      rotate: "4.67deg",
    },
    mobileArt: {
      width: "250%",
      top: "118%",
      left: "40%",
      rotate: "0deg",
    },
  },
  {
    id: "03",
    title: ["Low", "Brand", "Credibility"],
    pillTitle: "Low Brand Credibility",
    desc: "No way to prove you're worth the investment.",
    image: "/shield.webp",
    bg: "#FFF1E8",
    art: {
      width: "60%",
      top: "100%",
      left: "80%",
      rotate: "13.11deg",
    },
    mobileArt: {
      width: "210%",
      top: "112%",
      left: "48%",
      rotate: "8deg",
    },
  },
  {
    id: "04",
    title: ["Limited", "Access to", "Opportunity"],
    pillTitle: "Limited Access to Opportunity",
    desc: "Opportunities exist. They're just not reaching you.",
    image: "/gatekeep.webp",
    bg: "#E8F4FF",
    art: {
      width: "50%",
      top: "100%",
      left: "85%",
      rotate: "10deg",
    },
    mobileArt: {
      width: "185%",
      top: "122%",
      left: "50%",
      rotate: "-8deg",
    },
  },
] as const;

function SlideArt({
  slide,
  art,
}: {
  slide: (typeof slides)[number];
  art: (typeof slides)[number]["art"] | (typeof slides)[number]["mobileArt"];
}) {
  return (
    <img
      src={slide.image}
      alt=""
      className="pointer-events-none absolute max-w-none"
      style={{
        width: art.width,
        height: "auto",
        top: art.top,
        left: art.left,
        transform: `translate(-50%, -50%) rotate(${art.rotate})`,
        transformOrigin: "center center",
        zIndex: 0,
      }}
    />
  );
}

function SlideCard({ slide }: { slide: (typeof slides)[number] }) {
  return (
    <div
      className="relative min-w-0 flex-1 overflow-hidden rounded-[28px]"
      style={{ backgroundColor: slide.bg }}
    >
      <SlideArt slide={slide} art={slide.art} />

      <span className="absolute top-6 right-8 z-10 text-[24px] font-medium tracking-tight text-[#747682]">
        {slide.id}
      </span>

      <div className="relative z-10 max-w-[56%] px-8 pt-9 lg:max-w-[48%] xl:max-w-[42%] xl:px-10 xl:pt-10">
        <h3 className="text-[36px] leading-[0.92] font-medium tracking-[-0.05em] text-[#1E1F24] lg:text-[40px] xl:text-[60px]">
          {slide.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="mt-3 max-w-[250px] text-[20px] leading-[1.45] text-[#203646B2]">
          {slide.desc}
        </p>
      </div>
    </div>
  );
}

function MobileNumber({
  id,
  className,
}: {
  id: string;
  className: string;
}) {
  return (
    <span
      className={`pointer-events-none absolute right-5 z-30 w-8 text-right font-medium ${className}`}
    >
      {id}
    </span>
  );
}

function MobilePill({
  slide,
  onSelect,
}: {
  slide: (typeof slides)[number];
  onSelect: () => void;
}) {
  return (
    <div className="relative w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect();
          }
        }}
        className="flex h-[58px] w-full cursor-pointer items-center rounded-full bg-[#EFF0F3] px-5 pr-14"
        aria-label={`Show ${slide.pillTitle}`}
      >
        <span className="min-w-0 truncate text-[15px] font-medium tracking-[-0.02em] text-[#3D3F4A]">
          {slide.pillTitle}
        </span>
      </div>
      <MobileNumber
        id={slide.id}
        className="top-0 text-[16px] leading-[58px] text-[#8A8E99]"
      />
    </div>
  );
}

function MobileSlideCard({ slide }: { slide: (typeof slides)[number] }) {
  return (
    <div className="relative w-full">
      <div
        className="relative h-[540px] w-full overflow-hidden rounded-[24px]"
        style={{ backgroundColor: slide.bg }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <SlideArt slide={slide} art={slide.mobileArt} />
        </div>

        <div className="relative z-10 px-5 pt-6 pr-14">
          <h3 className="text-[34px] leading-[0.92] font-medium tracking-[-0.05em] text-[#1E1F24]">
            {slide.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="mt-3 max-w-[230px] text-[14px] leading-[1.4] text-[#8B8580]">
            {slide.desc}
          </p>
        </div>
      </div>
      <MobileNumber
        id={slide.id}
        className="top-[26px] text-[26px] leading-none text-[#747682]"
      />
    </div>
  );
}

const StarixChallengesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white px-5 py-12 md:px-10 md:py-20 xl:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="md:hidden">
          <h2 className="mb-7 text-center text-[28px] leading-[1.15] font-medium tracking-[-0.04em] text-[#040136]">
            So what&apos;s been
            <br />
            holding you back?
          </h2>

          <div className="flex w-full flex-col gap-[17px]">
            {slides.map((slide, index) =>
              index === activeIndex ? (
                <MobileSlideCard key={slide.id} slide={slide} />
              ) : (
                <MobilePill
                  key={slide.id}
                  slide={slide}
                  onSelect={() => setActiveIndex(index)}
                />
              )
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="mb-8 flex items-start justify-between gap-8">
            <h2 className="text-[36px] leading-[1.05] font-medium tracking-[-0.05em] text-[#111111] md:text-[48px] xl:text-[64px]">
              So what&apos;s been
              <br />
              holding <span className="text-[#F68A2F]">you</span> back?
            </h2>

            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => (current + 1) % slides.length)
              }
              aria-label="Show next challenge"
              className="mt-1 flex h-[72px] w-[150px] shrink-0 items-center justify-end overflow-visible"
            >
              <img
                src="/orange arrow.webp"
                alt=""
                className="max-w-none"
                style={{
                  width: 168,
                  height: "auto",
                  transform: "rotate(45deg)",
                }}
              />
            </button>
          </div>

          <div className="flex h-[380px] gap-4 lg:h-[320px] xl:h-[340px]">
            {slides.map((slide, index) =>
              index === activeIndex ? (
                <SlideCard key={slide.id} slide={slide} />
              ) : (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="flex h-full w-[64px] shrink-0 items-start justify-center rounded-[28px] bg-[#F0F1F4] pt-6 text-[24px] font-medium tracking-tight text-[#C5C9D3] lg:w-[72px] xl:w-[84px]"
                  aria-label={`Show ${slide.title.join(" ")}`}
                >
                  {slide.id}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StarixChallengesSection;
