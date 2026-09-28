"use client";

import Image from "next/image";
import Link from "next/link";
import { getSignupHref } from "@/lib/waitlist";

const CreatorEarnBanner = () => {
  return (
    <section className="bg-transparent px-6 pb-20 md:px-12 lg:px-16">
      <div className="relative mx-auto h-[320px] w-full max-w-[1320px] overflow-hidden rounded-[40px] md:h-[380px]">
        <Image
          src="/frontman.png"
          alt=""
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 1320px"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-[#0D297073]" />

        <div className="relative z-10 flex h-full max-w-[550px] flex-col justify-center px-8 md:px-14">
          <h2 className="font-['Geist'] text-[36px] font-normal leading-[1.05] tracking-[-0.04em] text-white md:text-[52px]">
            Earn money from
            <br />
            content you already
            <br />
            make for fun
          </h2>

          <Link
            href={getSignupHref("creator")}
            className="mt-7 inline-flex w-fit items-center rounded-full bg-[#FF8A00] px-5 py-2.5 text-[14px] font-medium text-white transition hover:brightness-110"
          >
            Find Challenges
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreatorEarnBanner;
