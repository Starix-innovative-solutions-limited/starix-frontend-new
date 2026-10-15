"use client";

import Link from "next/link";
import Image from "next/image";
import { getSignupHref } from "@/lib/waitlist";

const Copy = ({ compact = false }: { compact?: boolean }) => (
  <div className="relative z-20 mx-auto flex w-full max-w-[820px] flex-col items-center px-5 text-center">
    <h1
      className={`font-['Geist'] font-medium tracking-[-0.045em] text-[#040136] ${
        compact
          ? "text-[30px] leading-[1.08] md:text-[44px] md:leading-[1.06]"
          : "text-[52px] leading-[1.05] xl:text-[80px] xl:leading-[1.02]"
      }`}
    >
      Know who&apos;s worth it
      <br />
      before you spend
    </h1>
    <p
      className={`font-medium text-[#62636C] ${
        compact
          ? "mt-5 max-w-[260px] text-[15px] leading-[1.5] md:mt-6 md:max-w-[420px] md:text-[18px]"
          : "mt-6 max-w-[480px] text-[18px] leading-[1.45] xl:mt-7 xl:max-w-[520px] xl:text-[22px]"
      }`}
    >
      {compact ? (
        <>
          <span className="md:hidden">
            Find creators with proof.
            <br />
            Run campaigns with clarity.
            <br />
            Get content that works.
          </span>
          <span className="hidden md:inline">
            Find creators with proof. Run campaigns
            <br />
            with clarity. Get content that works.
          </span>
        </>
      ) : (
        <>
          Find creators with proof. Run campaigns
          <br />
          with clarity. Get content that works.
        </>
      )}
    </p>
    <Link
      href={getSignupHref("brand")}
      className={`inline-flex items-center justify-center rounded-full bg-[#0033FF] font-medium text-white transition hover:brightness-110 ${
        compact
          ? "mt-7 h-[46px] px-7 text-[15px] md:mt-8 md:h-[50px] md:px-8 md:text-[16px]"
          : "mt-8 h-[50px] px-8 text-[16px] xl:mt-9 xl:h-[56px] xl:px-9 xl:text-[17px]"
      }`}
    >
      Join as a Brand
    </Link>
  </div>
);

const BrandHero = () => {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#C6E6FF]">
      {/* Desktop / iPad landscape: Figma 2:1 stage pinned to the top of the fold */}
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
          <Copy />
        </div>
      </div>

      {/* Phone + iPad portrait */}
      <div className="flex min-h-[100svh] w-full flex-col lg:hidden">
        <div className="flex flex-1 flex-col items-center justify-center pt-28 pb-6 md:pt-32 md:pb-8">
          <Copy compact />
        </div>
        <div className="relative h-[46svh] min-h-[280px] w-full overflow-hidden md:h-[50svh] md:min-h-[380px]">
          <Image
            src="/leftcoin.webp"
            alt=""
            width={811}
            height={813}
            priority
            sizes="80vw"
            className="pointer-events-none absolute -bottom-[8%] -left-[20%] h-auto w-[80%] max-w-none select-none md:-left-[8%] md:w-[64%]"
          />
          <Image
            src="/rightcoin.webp"
            alt=""
            width={821}
            height={819}
            priority
            sizes="80vw"
            className="pointer-events-none absolute -bottom-[10%] -right-[22%] h-auto w-[84%] max-w-none select-none md:-right-[10%] md:w-[66%]"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandHero;
