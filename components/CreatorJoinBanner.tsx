"use client";

import Image from "next/image";
import Link from "next/link";
import { Sarina } from "next/font/google";
import { getSignupHref } from "@/lib/waitlist";

const sarina = Sarina({
  subsets: ["latin"],
  weight: "400",
});

type CreatorJoinBannerProps = {
  variant?: "creator" | "brand" | "contact";
};

const CreatorJoinBanner = ({ variant = "creator" }: CreatorJoinBannerProps) => {
  const isBrand = variant === "brand";
  const isContact = variant === "contact";
  const isTallMobile = isBrand || isContact;
  const creatorHref = getSignupHref("creator");
  const brandHref = getSignupHref("brand");
  const href = isBrand ? brandHref : creatorHref;

  return (
    <section
      className={`relative w-full overflow-hidden ${
        isTallMobile
          ? "h-[100svh] min-h-[760px] md:h-[640px] md:min-h-0 lg:h-[484px] xl:h-[540px]"
          : "h-[740px] md:h-[640px] lg:h-[460px] xl:h-[520px]"
      }`}
    >
      <Image
        src="/dreamy.webp"
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
        <h2
          className={`mt-3 font-['Geist'] leading-[1.15] font-medium tracking-[-0.04em] text-white md:mt-4 md:max-w-[560px] md:text-[40px] md:leading-[1.12] lg:max-w-[780px] xl:max-w-[900px] xl:text-[56px] xl:leading-[1.08] ${
            isTallMobile
              ? "max-w-[400px] text-[clamp(34px,8.5vw,40px)] lg:text-[56px]"
              : "max-w-[310px] text-[34px] lg:text-[48px]"
          }`}
        >
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
          {isContact ? (
            <>
              <Link
                href={creatorHref}
                className="inline-flex h-[64px] min-w-[225px] items-center justify-center rounded-full bg-[#0033FF] px-8 text-[20px] font-medium text-white transition hover:brightness-110 md:hidden"
              >
                Download App
              </Link>
              <div className="hidden items-center gap-3.5 md:flex">
                <Link
                  href={brandHref}
                  className="inline-flex h-[48px] min-w-[140px] items-center justify-center rounded-full bg-[#0033FF] px-6 text-[15px] font-medium text-white transition hover:brightness-110"
                >
                  Join as Brand
                </Link>
                <Link
                  href={creatorHref}
                  className="inline-flex h-[48px] min-w-[140px] items-center justify-center rounded-full border border-white px-6 text-[15px] font-medium text-white transition hover:bg-white/10"
                >
                  Join as Creator
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link
                href={href}
                className={`inline-flex items-center justify-center rounded-full bg-[#0033FF] font-medium text-white transition hover:brightness-110 ${
                  isBrand
                    ? "h-[64px] min-w-[225px] px-8 text-[20px] md:h-[48px] md:min-w-[160px] md:px-6 md:text-[15px]"
                    : "h-[48px] min-w-[168px] px-7 text-[15px] md:min-w-[160px] md:px-6"
                }`}
              >
                {isBrand ? (
                  <>
                    <span className="md:hidden">Download App</span>
                    <span className="hidden md:inline">Create a Campaign</span>
                  </>
                ) : (
                  "Download App"
                )}
              </Link>
              {!isBrand && (
                <Link
                  href={href}
                  className="hidden h-[48px] min-w-[168px] items-center justify-center rounded-full border border-white px-7 text-[15px] font-medium text-white transition hover:bg-white/10 md:inline-flex md:min-w-[160px] md:px-6"
                >
                  Use Web Version
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreatorJoinBanner;
