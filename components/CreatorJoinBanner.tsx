"use client";

import Image from "next/image";
import Link from "next/link";
import { Sarina } from "next/font/google";
import { getSignupHref } from "@/lib/waitlist";

const sarina = Sarina({
  subsets: ["latin"],
  weight: "400",
});

const CreatorJoinBanner = () => {
  const href = getSignupHref("creator");

  return (
    <section className="relative h-[740px] w-full overflow-hidden md:h-[640px] lg:h-[460px] xl:h-[520px]">
      <Image
        src="/dreams.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[46%_52%] scale-[1.28] origin-[center_42%] md:scale-100 md:object-[48%_48%] lg:object-center"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1100px] flex-col items-center px-6 pt-[120px] text-center md:px-10 md:pt-[96px] lg:justify-center lg:pt-0">
        <p
          className={`${sarina.className} text-[36px] leading-none text-white md:text-[40px] xl:text-[48px]`}
        >
          Join Now
        </p>
        <h2 className="mt-3 max-w-[310px] font-['Geist'] text-[34px] leading-[1.15] font-medium tracking-[-0.04em] text-white md:mt-4 md:max-w-[560px] md:text-[40px] md:leading-[1.12] lg:max-w-[780px] lg:text-[48px] xl:max-w-[900px] xl:text-[56px] xl:leading-[1.08]">
          <span className="md:hidden">
            Redefine Your
            <br />
            Creativity &amp; Brand
            <br />
            Story contents
          </span>
          <span className="hidden md:inline">
            Redefine Your Creativity
            <br />
            &amp; Brand Story contents
          </span>
        </h2>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-3.5 md:mt-9">
          <Link
            href={href}
            className="inline-flex h-[48px] min-w-[168px] items-center justify-center rounded-full bg-[#0033FF] px-7 text-[15px] font-medium text-white transition hover:brightness-110 md:h-[48px] md:min-w-[160px] md:px-6 md:text-[15px]"
          >
            Download App
          </Link>
          <Link
            href={href}
            className="hidden h-[48px] min-w-[168px] items-center justify-center rounded-full border border-white px-7 text-[15px] font-medium text-white transition hover:bg-white/10 md:inline-flex md:min-w-[160px] md:px-6"
          >
            Use Web Version
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreatorJoinBanner;
