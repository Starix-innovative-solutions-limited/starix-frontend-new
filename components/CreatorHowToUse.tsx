"use client";

import Image from "next/image";

const steps = [
  {
    title: ["Discover", "Challenges"],
    desc: "Find challenges that fit what you already do. No pitching required.",
    image: "/trophy.webp",
    imageClass:
      "left-[30%] top-[10%] w-[60%] max-w-none rotate-[-6deg] md:left-[4%] md:top-[6%] md:w-[88%] xl:left-[10%] xl:top-[8%] xl:w-[78%]",
  },
  {
    title: ["Create", "Content"],
    desc: "Make the content your way. Submit when you're ready.",
    image: "/Play 2.webp",
    imageClass:
      "left-[35%] top-[18%] w-[58%] max-w-none rotate-[18deg] md:left-[8%] md:top-[10%] md:w-[84%] xl:left-[20%] xl:top-[15%] xl:w-[74%]",
  },
  {
    title: ["Earn", "Rewards"],
    desc: "Win and get paid. No invoices, no chasing, no waiting.",
    image: "/3d gem.webp",
    imageClass:
      "left-[34%] top-[20%] w-[50%] max-w-none rotate-[10deg] md:right-[0%] md:left-auto md:top-[8%] md:w-[68%] md:rotate-[-28deg] xl:right-[13%] xl:top-[15%] xl:w-[60%]",
  },
];

const CreatorHowToUse = () => {
  return (
    <section className="bg-white px-5 py-12 md:px-10 md:py-16 xl:px-16 xl:pt-[72px] xl:pb-20">
      <div className="mx-auto max-w-[1320px]">
        <span className="inline-flex rounded-full bg-[#FD6C1D1F] px-3 py-1 text-[11px] font-semibold tracking-[0.01em] text-[#FD6C1D] uppercase md:text-[13px] xl:text-[16px]">
          How to use Starix
        </span>

        <div className="mt-4 mb-7 flex flex-col gap-3 md:mt-5 md:mb-9 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 className="font-['Geist'] text-[28px] leading-[1.08] font-medium tracking-[-0.04em] text-[#040136] md:text-[42px] md:leading-[1.05] xl:text-[64px] xl:leading-[1.02]">
            Built for how you
            <br className="md:hidden" />{" "}
            <Image
              src="/Play 2.webp"
              alt=""
              width={90}
              height={58}
              className="inline-block h-[0.82em] w-auto translate-y-[2px] md:h-[0.9em] md:translate-y-[4px]"
            />{" "}
            actually work
          </h2>
          <p className="max-w-[250px] text-[14px] leading-[1.35] text-[#8B8D98] md:shrink-0 md:pb-2 md:text-right md:text-[20px]">
            No matter what niche
            <br />
            you create content for
          </p>
        </div>

        <div className="rounded-[28px] bg-[#FAE6DA] p-3 md:rounded-[32px] md:p-[14px] xl:p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-3 xl:grid-cols-[repeat(3,409.333px)] xl:justify-center xl:gap-5">
            {steps.map((step) => (
              <article
                key={step.title.join(" ")}
                className="relative flex h-[292px] min-h-[292px] flex-col overflow-hidden rounded-[22px] bg-white px-5 pt-6 pb-5 md:h-[300px] md:min-h-[300px] md:px-5 md:pt-6 md:pb-5 lg:h-[340px] lg:min-h-[340px] xl:h-[408px] xl:min-h-[408px] xl:w-[409.333px] xl:rounded-[24px] xl:px-8 xl:pt-8 xl:pb-8"
              >
                <img
                  src={step.image}
                  alt=""
                  className={`pointer-events-none absolute z-0 h-auto object-contain ${step.imageClass}`}
                />

                <div className="relative z-10 mt-auto">
                  <h3 className="max-w-[200px] font-['Geist'] text-[28px] leading-none font-normal tracking-[-0.04em] text-[#040136] md:text-[24px] lg:text-[28px] xl:text-[40px]">
                    {step.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-2 max-w-[195px] xl:max-w-[260px] font-['Geist'] text-[14px] leading-[1.4] tracking-[-0.03em] text-[#6E6E6E] md:text-[13px] lg:text-[15px] xl:text-[16px]">
                    {step.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorHowToUse;
