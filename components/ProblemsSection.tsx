"use client";

import Image from "next/image";

const problems = [
  {
    title: "Content comes in. Most of it misses the mark.",
    icon: "/thumb.webp",
  },
  {
    title: "The right creators exist. Finding them is the problem.",
    icon: "/bar-chart.webp",
  },
  {
    title: "The right creators exist. Finding them is the problem.",
    icon: "/binocular.webp",
  },
  {
    title: "Money goes out. No clarity on what came back.",
    icon: "/wallet.webp",
  },
];

const ProblemsSection = () => {
  return (
    <section className="relative w-full bg-[#F9F9FB] overflow-hidden py-[120px] px-6">

      {/* BACKGROUND SHAPES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Top Right Shape */}
        <div className="absolute right-[60px] top-[40px] w-[388px] h-[425px] opacity-90">
          <Image
            src="/candy 1.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1300px] mx-auto">

        {/* TITLE */}
        <h2 
          className="font-geist text-[48px] md:text-[64px] font-normal leading-[100%] tracking-[-0.04em] text-[#040136] mb-[80px] max-w-[600px]"
        >
          What’s holding <br /> Brands Back..
        </h2>

        {/* CARDS */}
        <div className="flex flex-wrap justify-between items-end gap-6">

          {problems.map((item, index) => {
            const offsets = [
              "translate-y-0",
              "translate-y-0",
              "translate-y-0",
              "translate-y-0",
            ];

            return (
              <div
                key={index}
                className={`bg-[#C5E6FE] rounded-[28px] p-10 w-[278px] h-[321px] flex flex-col justify-between ${offsets[index]}`}
              >
                {/* ICON */}
                <div className="w-[120px] h-[100px] relative">
                  <Image
                    src={item.icon}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>

                {/* TEXT */}
                <p className="text-[#040136] text-[30px] leading-[1] font-normal tracking-[-0.04em] font-geist">
                  {item.title}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;