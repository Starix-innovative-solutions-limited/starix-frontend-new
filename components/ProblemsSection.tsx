"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const problems = [
  {
    title: "Content comes in. Most of it misses the mark.",
    image: "/101.webp",
  },
  {
    title: "Numbers look good. No way to know if they're real",
    image: "/102.webp",
  },
  {
    title: "The right creators exist. Finding them is the problem.",
    image: "/103.webp",
  },
  {
    title: "Money goes out. No clarity on what came back.",
    image: "/104.webp",
  },
];

const ProblemsSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % problems.length),
      4000
    );
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-[80px] md:py-[120px]">
      <div className="mx-auto flex max-w-[1300px] flex-col items-center">
        <h2 className="text-center font-geist text-[36px] font-medium leading-[1.05] tracking-[-0.04em] text-[#040136] md:text-[56px] lg:text-[64px]">
          What&rsquo;s been holding
          <br />
          your brand back?
        </h2>

        <div className="mt-6 flex items-center gap-2 md:mt-8">
          {problems.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show problem ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === active ? "bg-[#0A3BFF]" : "bg-[#D5D6DD]"
              }`}
            />
          ))}
        </div>

        <div className="relative mt-6 w-full max-w-[780px] pb-[40px] md:mt-8">
          {/* stacked card edges */}
          <div className="absolute inset-x-[5%] bottom-[24px] h-[40px] rounded-[16px] border border-[#E6E7EC] bg-white shadow-[0_10px_30px_rgba(4,1,54,0.05)]" />
          <div className="absolute inset-x-[9%] bottom-[12px] h-[40px] rounded-[16px] border border-[#E6E7EC] bg-white" />
          <div className="absolute inset-x-[13%] bottom-0 h-[40px] rounded-[16px] border border-[#E6E7EC] bg-white" />

          <div className="relative grid rounded-[20px] border border-[#E6E7EC] bg-white shadow-[0_20px_50px_rgba(4,1,54,0.06)]">
            {problems.map((item, i) => (
              <div
                key={item.image}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 flex flex-col gap-6 p-5 transition-opacity duration-500 md:flex-row md:items-stretch md:justify-between md:p-7 ${
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="flex flex-col justify-between gap-4 md:gap-8 md:py-1">
                  <span className="font-geist text-[28px] leading-none tracking-[-0.03em] text-[#7C7E8C] md:text-[36px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-geist text-[22px] md:max-w-[320px] md:text-[28px] lg:text-[34px] leading-[1.15] tracking-[-0.03em] text-[#1A1A1F]">
                    {item.title}
                  </p>
                </div>
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[14px] md:aspect-[361/276] md:w-[300px] lg:w-[320px]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 320px, 90vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
