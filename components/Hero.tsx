import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="general-space h-screen  overflow-y-hidden overflow-x-hidden ">
      <div className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-18 my-auto md:py-20">
        <div className="w-full flex flex-col gap-7">
          <h1 className="text-6xl max-md:text-4xl font-normal text-[#040136]">
            Empowering creators,
            Engaging brands
          </h1>
          <p className="text-2xl max-md:text-xl font-mono leading-relaxed text-[#6E6E6E99]">
            Starix connects brands with creators through fun,
            rewarding challenges that turn creativity into measurable impact

          </p>

          <div className="flex items-center md:mt-4 gap-4">
            <Link
              href={"/login"}
              className="bg-white  hover:bg-secondary-100 text-secondary-100 border border-secondary-100 btn "
            >
              Join as a Creator
            </Link>
            <Link
              href={"/login"}
              className="bg-secondary-100 hover:bg-secondary-100 text-white btn"
            >
              Join as a Brand
            </Link>
          </div>
        </div>

        <Image
          src="/hero-bg.png"
          alt="Hero Image"
          width={500}
          height={500} // half the height
          className="md:hidden absolute top-20 left-0  w-full z-0 blur-sm"
        />


        <div className="w-full flex items-center relative h-screen max-md:hidden">

          <div className="flex items-center z-10 relative bg-black  max-md:hidden" >
            <Image
              src="/hero1.png"
              alt="Hero Image"
              width={600}
              height={600} // half the height
              className=" absolute -left-52 w-3xl object-contain"
            />
            <Image
              src="/hero3.png"
              alt="Hero Image"
              width={200}
              height={200} // half the height
              className="absolute -left-32 w-xl object-contain"
            />
            <Image
              src="/hero2.png"
              alt="Hero Image"
              width={200}
              height={200}
              className="absolute  w-2xl object-contain"
            />
          </div>

          <Image
            src="/hero-bg.png"
            alt="Hero Image"
            width={500}
            height={500} // half the height
            className="max-md:hidden absolute top-20 left-0  w-full z-0 blur-[2px]"
          />

        </div>
      </div>

    </section>
  );
};

export default Hero;
