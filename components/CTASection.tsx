"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSignupHref } from "@/lib/waitlist";

const CTASection = () => {
  const path = usePathname();
  const isForBrands = path === "/for-brands";
  const isForCreators = path === "/for-creators";

  if (path === "/contact" || path === "/for-creators") return null;

  const isHome = !isForBrands && !isForCreators;

  const watermarkConfig = isForBrands
    ? { width: "1200px", height: "400px", top: "450px", left: "10%", opacity: 0.4 }
    : isForCreators
    ? { width: "1500px", height: "500px", top: "100px", right: "-20px", opacity: 0.6 }
    : { width: "1407px", height: "434px", top: "180px", left: "-60px", opacity: 0.6 };

  return (
    <section className="flex w-full justify-center bg-white px-4 py-8 md:px-8 md:py-10 xl:px-10">
      <div
        className={`relative flex w-full max-w-[1340px] flex-col overflow-hidden rounded-[28px] shadow-2xl transition-all duration-500 md:rounded-[20px] ${
          isForCreators
            ? "min-h-[228px] items-start justify-center bg-[#001361] md:h-[400px] md:min-h-0"
            : isForBrands
            ? "min-h-[228px] items-start justify-center bg-[#020525] md:h-[400px] md:min-h-0"
            : "h-[700px] items-center bg-[#001361] pt-8 md:h-[560px] md:pt-14 xl:h-[604px] xl:pt-20"
        }`}
      >
        {isHome ? (
          <>
            <div className="pointer-events-none absolute bottom-[15%] left-1/2 z-[1] w-[125%] -translate-x-1/2 select-none opacity-45 md:hidden">
              <Image
                src="/foot.svg"
                alt=""
                width={1407}
                height={434}
                className="h-auto w-full object-contain brightness-0 invert"
              />
            </div>
            <div className="pointer-events-none absolute bottom-[-4%] left-1/2 z-[1] w-[125%] -translate-x-1/2 select-none opacity-45 md:hidden">
              <Image
                src="/foot.svg"
                alt=""
                width={1407}
                height={434}
                className="h-auto w-full object-contain brightness-0 invert"
              />
            </div>
            <div className="pointer-events-none absolute top-[38%] left-1/2 z-0 hidden w-[118%] -translate-x-1/2 select-none opacity-50 md:block xl:hidden">
              <Image
                src="/foot.svg"
                alt=""
                width={1407}
                height={434}
                className="h-auto w-full object-contain brightness-0 invert"
              />
            </div>
            <div
              className="pointer-events-none absolute z-0 hidden overflow-hidden select-none xl:block"
              style={{
                width: watermarkConfig.width,
                height: watermarkConfig.height,
                top: watermarkConfig.top,
                left: watermarkConfig.left,
                opacity: watermarkConfig.opacity,
              }}
            >
              <Image
                src="/foot.svg"
                alt=""
                width={1407}
                height={434}
                className="h-full w-full object-contain brightness-0 invert"
              />
            </div>
          </>
        ) : (
          <>
            <div
              className={`pointer-events-none absolute z-0 select-none opacity-35 md:opacity-45 xl:hidden ${
                isForBrands
                  ? "bottom-[-18%] left-[-8%] w-[160%] md:bottom-[-22%] md:w-[130%]"
                  : "top-[8%] right-[-18%] w-[170%] md:top-[4%] md:w-[140%]"
              }`}
            >
              <Image
                src="/foot.svg"
                alt=""
                width={1407}
                height={434}
                className="h-auto w-full object-contain brightness-0 invert"
              />
            </div>
            <div
              className="pointer-events-none absolute z-0 hidden overflow-hidden select-none xl:block"
              style={{
                width: watermarkConfig.width,
                height: watermarkConfig.height,
                top: watermarkConfig.top,
                left: watermarkConfig.left || "auto",
                right: watermarkConfig.right || "auto",
                opacity: watermarkConfig.opacity,
              }}
            >
              <Image
                src="/foot.svg"
                alt=""
                width={1407}
                height={434}
                className="h-full w-full object-contain brightness-0 invert"
              />
            </div>
          </>
        )}

        <div
          className={`relative z-10 flex w-full max-w-7xl flex-col ${
            isForBrands || isForCreators
              ? "items-start px-5 py-8 text-left md:px-12 md:py-0 md:pr-[280px] xl:px-20 xl:pr-[360px]"
              : "mx-auto items-center px-6 text-center md:px-12 xl:px-20"
          }`}
        >
          <h2
            className={`mb-7 font-['Geist'] tracking-[-0.04em] text-white md:mb-10 md:tracking-[-0.03em] ${
              isForBrands || isForCreators
                ? "text-[28px] leading-[1.15] font-light md:text-[40px] md:leading-[1.15] xl:text-[56px] xl:leading-[58px]"
                : "text-[36px] leading-[1.1] font-medium md:text-[40px] md:font-light md:leading-[1.15] xl:text-[56px]"
            }`}
          >
            {isForCreators || isForBrands ? (
              <>
                Your next <br /> opportunity is here.
              </>
            ) : (
              <>
                Redefine Your{" "}
                <br className="md:hidden" />
                Creativity &{" "}
                <br className="hidden md:inline" />
                <br className="md:hidden" />
                Brand Story{" "}
                <br className="md:hidden" />
                content<span className="hidden md:inline">s.</span>
              </>
            )}
          </h2>

          <div
            className={`flex w-full flex-col gap-3 md:mb-10 md:flex-row ${
              isForBrands || isForCreators
                ? "items-start justify-start"
                : "mb-8 items-center justify-center"
            }`}
          >
            {!isForBrands && (
              <Link
                href={getSignupHref("creator")}
                className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[16px] font-medium text-white transition-all duration-300 md:rounded-[40px] md:px-8 md:py-4 md:text-lg ${
                  isForCreators
                    ? "bg-[#FF6B00] shadow-sm hover:brightness-110"
                    : "border border-white hover:bg-white/10"
                }`}
              >
                Join as a Creator
              </Link>
            )}

            {!isForCreators && (
              <Link
                href={getSignupHref("brand")}
                className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[16px] font-semibold text-white transition-all duration-300 md:rounded-[40px] md:px-8 md:py-4 md:text-lg ${
                  isForBrands
                    ? "bg-[#0033FF] hover:bg-[#0041cc]"
                    : "bg-[#0033FF] shadow-sm md:bg-[#FF6B00] md:hover:brightness-110"
                }`}
              >
                Join as a Brand
              </Link>
            )}
          </div>

        </div>

        {(isForCreators || isForBrands) && (
          <div className="pointer-events-none absolute right-[6px] bottom-[4px] z-20 w-[112px] md:top-1/2 md:right-[28px] md:bottom-auto md:w-[210px] md:-translate-y-1/2 xl:right-[52px] xl:w-[303px]">
            <Image
              src="/candy 1.svg"
              alt=""
              width={606}
              height={515}
              className={`h-auto w-full object-contain ${
                isForBrands
                  ? "drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  : "drop-shadow-2xl"
              }`}
            />
          </div>
        )}

        {isHome && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[60%] overflow-hidden md:hidden">
              <Image
                src="/troph.svg"
                alt="3D Trophy"
                width={1340}
                height={604}
                className="absolute bottom-[-1%] left-[55%] h-auto w-[200%] max-w-none -translate-x-1/2 object-contain"
              />
            </div>
            <div className="pointer-events-none absolute top-[80%] left-1/2 z-20 hidden w-[88%] -translate-x-1/2 -translate-y-1/2 md:block xl:top-[85%] xl:w-[850px]">
              <Image
                src="/troph.svg"
                alt="3D Trophy"
                width={1340}
                height={604}
                className="h-auto w-full scale-110 object-contain xl:scale-150"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CTASection;
