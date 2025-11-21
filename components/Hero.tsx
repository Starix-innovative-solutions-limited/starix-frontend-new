import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-18 py-14 md:py-20 ">
      <div className="w-full flex flex-col gap-7">
        <h1 className="text-6xl max-md:text-4xl font-normal text-secondary-400">
          Ready to flex your creativity?
        </h1>
        <p className="text-2xl max-md:text-xl font-mono text-gray leading-relaxed text-[#444444]">
          Participate in fun challenges from brans and take your imagination to
          the next level. On Starix, creativity isn’t just for likes... it’s for
          prizes, recognition, and real growth.
        </p>
        <div className="flex items-center md:mt-4 gap-4">
          <Link
            href={"/login"}
            className="bg-white hover:bg-secondary-100 border border-secondary-300 text-secondary-500 btn "
          >
            Start creating
          </Link>
          <Link
            href={"/login"}
            className="bg-secondary-300 hover:bg-secondary-100 text-white btn"
          >
            Launch a challenge
          </Link>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Image
          src="/images/hero-img.png"
          alt="Hero Image"
          width={550}
          height={500}
          // priority
          className=""
        />
      </div>
    </section>
  );
};

export default Hero;
