import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="general-space !pb-0 h-fit  overflow-y-hidden overflow-x-hidden ">
      <div className="grid grid-cols-2 max-md:grid-cols-1 items-center justify-center gap-6 h-fit md:-mt-7 lg:-mt-10 ">
        <div className="w-full flex flex-col gap-7 max-md:mt-20">
          <h1 className="max-md:text-center md:text-6xl  leading-[1.25]  max-md:text-4xl font-semibold text-[#040136]">
            Empowering creators,
            Engaging brands
          </h1>
          <p className=" max-md:text-center font-geist font-light text-xl md:text-[28px] tracking-normal  text-neut/50">
            Starix connects brands with creators through fun,
            rewarding challenges that turn creativity into measurable impact

          </p>

          <div className="flex max-md:flex-col items-center md:mt-4 gap-4">
            <Link
              href={"/login"}
              className="bg-white max-md:w-full text-center hover:bg-dark-navy hover:text-white text-dark-navy border border-secondary-100 btn !rounded-full"
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

        <div className="relative w-full md:h-[80vh]" style={
          {
            background: 'url(hero-bg.png)',
            backgroundRepeat: 'no-repeat',
          }
        }>
          {/* <Image
            src="/hero-bg.png"
            alt="Hero Image"
            width={500}
            height={500} // half the height
            className=" absolute top-0 left-0  md:left-0  w-full z-0 blur-[1.5px]"
          /> */}

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

          {/* <h3>fghjkl</h3> */}

        </div>




      </div>

    </section>
  );
};

export default Hero;
