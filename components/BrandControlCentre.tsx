"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { title: "Challenge Control Centre", image: "/ct1.webp" },
  { title: "Reactivate Successful Campaigns", image: "/ct2.webp" },
];

const BrandControlCentre = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className="w-full bg-white px-5 py-2 md:px-10 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="grid">
            {slides.map((s, i) => (
              <h2
                key={s.image}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 font-geist text-[24px] font-medium leading-[1.08] tracking-[-0.04em] text-[#1A1A1F] transition-opacity duration-500 md:max-w-[570px] md:text-[48px] lg:max-w-[650px] lg:text-[56px] ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                {s.title}
              </h2>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-8 lg:mt-0 lg:items-end lg:gap-5 lg:pt-2">
            <p className="max-w-[300px] text-[16px] leading-[1.3] text-[#62636C] md:text-[18px] lg:text-right">
              Find your people. Share what&rsquo;s working.
              <br className="hidden sm:block" />
              {" "}Rise together.
            </p>
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-[10px] rounded-full transition-all duration-300 ${
                    i === active ? "w-[34px] bg-[#6E9BFF]" : "w-[10px] bg-[#E3E4EA]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative grid overflow-hidden rounded-t-[24px] md:rounded-t-[32px]">
          {slides.map((s, i) => (
            <div
              key={s.image}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={s.image}
                alt={`${s.title} dashboard`}
                width={2680}
                height={1366}
                sizes="(min-width: 1280px) 1280px, 100vw"
                unoptimized
                className="h-auto w-[175%] max-w-none md:w-full"
                priority={i === 0}
              />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default BrandControlCentre;
