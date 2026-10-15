"use client";

import Image from "next/image";
import Link from "next/link";
import { Sarina } from "next/font/google";
import { getSignupHref } from "@/lib/waitlist";

const sarina = Sarina({
  subsets: ["latin"],
  weight: "400",
});

const CreatorEarnBanner = () => {
  return (
    <section className="relative h-[740px] w-full overflow-hidden md:h-[420px] lg:h-[480px] xl:h-[560px]">
      <Image
        src="/grass.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[36%_center] md:object-[center_42%]"
      />
      <div className="absolute inset-0 bg-[#0033FF33]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1320px] flex-col justify-start px-5 pt-14 md:justify-center md:px-10 md:pt-0 xl:px-16">
        <p
          className={`${sarina.className} text-[32px] leading-none font-normal tracking-[-0.04em] text-white md:text-[32px] xl:text-[40px]`}
        >
          But On Starix
        </p>
        <h2 className="mt-3 max-w-[340px] font-['Geist'] text-[30px] font-medium leading-[1.05] tracking-[-0.04em] text-white md:mt-3 md:max-w-[560px] md:text-[44px] lg:max-w-[640px] lg:text-[52px] xl:max-w-[920px] xl:text-[80px]">
          You can earn money
          <br />
          from challenges you
          <br />
          already join for fun
        </h2>

        <Link
          href={getSignupHref("creator")}
          className="mt-8 inline-flex w-fit items-center rounded-full bg-[#FD6C1D] p-3 text-[16px] font-medium text-white transition hover:brightness-105 md:mt-8 md:p-4 xl:p-4"
        >
          <span className="md:hidden">Download App</span>
          <span className="hidden md:inline">Find Challenges</span>
        </Link>
      </div>
    </section>
  );
};

export default CreatorEarnBanner;
