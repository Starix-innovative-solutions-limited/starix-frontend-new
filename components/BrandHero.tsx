"use client";

import Link from "next/link";
import Image from "next/image";
import { getSignupHref } from "@/lib/waitlist";

const DesktopCopy = () => (
  <div className="relative z-20 mx-auto flex w-full max-w-[820px] flex-col items-center px-5 text-center">
    <h1 className="font-['Geist'] text-[52px] leading-[1.05] font-medium tracking-[-0.045em] text-[#040136] xl:text-[80px] xl:leading-[1.02]">
      Know who&apos;s worth it
      <br />
      before you spend
    </h1>
    <p className="mt-6 max-w-[480px] text-[18px] leading-[1.45] font-medium text-[#62636C] xl:mt-7 xl:max-w-[520px] xl:text-[22px]">
      Find creators with proof. Run campaigns
      <br />
      with clarity. Get content that works.
    </p>
    <Link
      href={getSignupHref("brand")}
      className="mt-8 inline-flex h-[50px] items-center justify-center rounded-full bg-[#0033FF] px-8 text-[16px] font-medium text-white transition hover:brightness-110 xl:mt-9 xl:h-[56px] xl:px-9 xl:text-[17px]"
    >
      Join as a Brand
    </Link>
  </div>
);

const BrandHero = () => {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#C6E6FF]">
      {/* Desktop: locked Figma composition */}
      <div className="relative mx-auto hidden h-[min(100svh,50vw)] w-full min-h-[640px] lg:block xl:min-h-[720px]">
        <Image
          src="/leftcoin.webp"
          alt=""
          width={811}
          height={813}
          priority
          sizes="44vw"
          className="pointer-events-none absolute top-[40%] left-[-6%] z-0 h-auto w-[44%] select-none xl:left-[10%] xl:w-[25%]"
        />
        <Image
          src="/rightcoin.webp"
          alt=""
          width={821}
          height={819}
          priority
          sizes="46vw"
          className="pointer-events-none absolute top-[40%] right-[-8%] z-0 h-auto w-[46%] select-none xl:right-[10%] xl:w-[25%]"
        />
        <div className="relative z-20 flex h-full items-center justify-center pb-[4%]">
          <DesktopCopy />
        </div>
      </div>

      {/* Phone + iPad: Figma stack with coins near the bottom */}
      <div className="flex w-full flex-col items-center px-6 pt-[132px] pb-[72px] lg:hidden md:px-12 md:pt-[160px] md:pb-[96px]">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <Image
              src="/stamp.webp"
              alt=""
              width={362}
              height={364}
              priority
              sizes="(max-width: 767px) 120px, 168px"
              className="h-auto w-[116px] select-none md:w-[176px]"
            />
            <Image
              src="/dart.webp"
              alt=""
              width={346}
              height={348}
              priority
              sizes="(max-width: 767px) 124px, 176px"
              className="h-auto w-[112px] select-none md:w-[170px]"
            />
          </div>

          <h1 className="mt-12 max-w-[300px] text-center font-['Geist'] text-[38px] leading-[1.1] font-medium tracking-[-0.04em] text-[#040136] md:mt-14 md:max-w-[520px] md:text-[56px] md:leading-[1.06]">
            Know who&apos;s <br className="md:hidden" />
            worth it before <br className="md:hidden" />
            you spend
          </h1>

          <p className="mt-4 max-w-[260px] text-center text-[16px] leading-[1.45] text-[#7C7E8C] md:mt-5 md:max-w-[420px] md:text-[20px]">
            Find creators with proof. Run campaigns with clarity. Get content
            that works.
          </p>

          <Link
            href={getSignupHref("brand")}
            className="mt-8 inline-flex h-[52px] items-center justify-center rounded-full bg-[#0033FF] px-7 text-[16px] font-medium text-white transition hover:brightness-110 md:mt-10 md:h-[58px] md:px-10 md:text-[18px]"
          >
            Join as a Brand
          </Link>
        </div>

        <div className="mt-[68px] flex items-center justify-center gap-7 md:mt-[88px] md:gap-12">
          <Image
            src="/leftcoin.webp"
            alt=""
            width={811}
            height={813}
            priority
            sizes="(max-width: 767px) 148px, 220px"
            className="h-auto w-[112px] select-none md:w-[172px]"
          />
          <Image
            src="/rightcoin.webp"
            alt=""
            width={821}
            height={819}
            priority
            sizes="(max-width: 767px) 148px, 220px"
            className="h-auto w-[112px] select-none md:w-[172px]"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandHero;
