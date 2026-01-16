"use client"

import React from "react";
// import Image from "next/image";
import Link from "next/link";
// import useBreakpoint from "@/hooks/useBreakPoint";

const Hero = () => {
  // const { isMobile } = useBreakpoint()
  return (
    <section className="general-space  h-fit  overflow-y-hidden overflow-x-hidden pb-14">
      <div className="grid grid-cols-2 max-md:grid-cols-1 items-center justify-center gap-6 h-fit md:-mt-7 lg:-mt-10 ">
        <div className="w-full flex flex-col gap-7 max-md:mt-20">
          <h1 className="max-md:text-center md:text-5xl xl:text-6xl  leading-[1.25]  max-md:text-4xl font-semibold text-[#040136]">
            Empowering creators,
            Engaging brands
          </h1>
          <p className=" max-md:text-center font-geist font-light text-xl md:text-2xl tracking-normal  text-neut/50">
            Starix connects brands with creators through fun, <br className="max-md:hidden" />
            rewarding challenges that turn creativity into measurable impact

          </p>

          <div className="flex max-md:flex-col items-center md:mt-4 gap-4">
            <Link
              href={"/login"}
              className="bg-white max-md:w-full text-center hover:bg-off-white text-dark-navy border border-secondary-100 btn !rounded-full"
            >
              Join as a Creator
            </Link>
            <Link
              href={"/login"}
              className="bg-secondary-100 max-md:w-full text-center hover:bg-secondary-100 text-white btn !rounded-full"
            >
              Join as a Brand
            </Link>
          </div>
        </div>

        {/* <div className="relative w-full md:h-[80vh] "

        >
          <Image
            src="/hero-bg.png"
            alt="Hero Image"
            width={1000}
            height={1000} // half the height
            className=" absolute top-0 left-0  md:left-0  w-full z-0 "
          />

          <Image
            src="/hero-grid-img.svg"
            alt="Hero grid Image"
            width={1000}
            height={1000} // half the height
            className=" max-md:hidden md:absolute md:top-20 md:-left-48 object-cover"
          />

          <Image
            src="/hero-mobile.png"
            alt="Hero grid Image"
            width={1000}
            height={1000} // half the height
            className="md:hidden"
          />



        </div> */}


        <div className="relative w-full flex  items-center justify-between overflow-hidden h-fit max-h-[30vh] md:min-h-[90vh] md:pt-[58px] place-items-center group ">

          {/* Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('/hero-bg.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundPositionY: '17px'
            }}
          />

          {/* Badge */}
          <div
            className="
              md:absolute inset-0 z-0
              w-44 h-44

              md:top-1/10 md:-left-2/12
              
              md:w-auto md:min-h-[50vh] md:max-h-[60vh]
              bg-no-repeat bg-contain
              rotate-[12deg]
              transition-transform duration-300
              group-hover:rotate-[18deg]
            "
            style={{ backgroundImage: `url('/badge4x.png')` }}
          />

          {/* Rings */}
          <div
            className="
              md:absolute inset-0 z-10
              md:top-5/10 md:left-4/12
              w-44 h-44
              lg:w-44 lg:h-44
              bg-no-repeat bg-contain
            "
            style={{ backgroundImage: `url('/rings4x.png')` }}
          />

          {/* Star */}
          <div
            className="
            md:absolute inset-0 z-10
            md:top-7/12 md:left-6/12
            w-44 h-44
            md:w-auto  md:min-h-[40vh] md:max-h-[50vh]
            bg-no-repeat bg-contain
            rotate-[-8deg]
            transition-transform duration-300
            group-hover:rotate-[-18deg]
          "
            style={{ backgroundImage: `url('/star4x.png')` }}
          />



          {/* lg:h-53 lg:w-52 xl:w-96 xl:h-96 */}
          {/* top-2/12 xl:top-7/12   left-7/12 */}

        </div>




      </div>

    </section>
  );
};

export default Hero;
